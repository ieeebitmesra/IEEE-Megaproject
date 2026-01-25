import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import Editor from '@monaco-editor/react'
import { useDebounce } from 'use-debounce'
import {
  Code2,
  Columns,
  Layers,
  LayoutGrid,
  Leaf,
  RotateCcw,
  Settings2,
  Sparkles,
  Workflow,
} from 'lucide-react'
import CollectionNode from './CollectionNode'
import FieldContextMenu from './FieldContextMenu'
import PipelineOptionsPanel from './PipelineOptionsPanel'
import SelectedFieldsPanel from './SelectedFieldsPanel'
import PipelineOutputPanel from './PipelineOutputPanel'
import CustomStagesPanel from './CustomStagesPanel'
import AdvancedStagesPanel from './AdvancedStagesPanel'
import OperatorReference from './OperatorReference'
import type {
  ColumnRef,
  CustomStages,
  QueryOptions,
  SchemaEdge,
} from '@/lib/mongo-query-engine'
import type { OnMount } from '@monaco-editor/react'
import {
  generateComplexQuery,
  getLayoutedElements,
  parseSchema,
} from '@/lib/mongo-query-engine'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useTheme } from '@/store/theme-store'

const DEFAULT_SCHEMA = `// 🍃 MongoDB Schema Designer
// Define your collections below

employees [icon: user, color: #10b981] {
  _id ObjectId pk
  first_name String
  last_name String
  email String
  salary Number
  hire_date Date
  department_id ObjectId
  skills Array
  is_active Boolean
}

departments [icon: building, color: #3b82f6] {
  _id ObjectId pk
  name String
  location String
  budget Number
  manager_id ObjectId
}

projects [icon: briefcase, color: #8b5cf6] {
  _id ObjectId pk
  name String
  start_date Date
  end_date Date
  status String
  department_id ObjectId
  team_size Number
}

// 🔗 Define relationships ($lookup paths)
employees.department_id > departments._id
projects.department_id > departments._id
departments.manager_id > employees._id`

const nodeTypes = { eraserTable: CollectionNode }

function MongoQueryBuilderContent() {
  const [schemaCode, setSchemaCode] = useState(DEFAULT_SCHEMA)
  const [debouncedSchema] = useDebounce(schemaCode, 400)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [monacoInstance, setMonacoInstance] = useState<any>(null)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  const theme = useTheme()
  const editorTheme = theme === 'dark' ? 'mongo-dark' : 'mongo-light'

  const [queryState, setQueryState] = useState<Array<ColumnRef>>([])
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    distinct: false,
    limit: 100,
    skip: 0,
    lookupType: 'unwind',
    customStages: {
      unwind: [],
      addFields: [],
      set: [],
      group: [],
      sort: [],
      computed: [],
    },
  })

  const [customStages, setCustomStages] = useState<CustomStages>({
    unwind: [],
    addFields: [],
    set: [],
    group: [],
    sort: [],
    computed: [],
  })

  const [generatedPipeline, setGeneratedPipeline] = useState('')
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    table: string
    column: string
    columnType: string
  } | null>(null)

  const schemaEdges: Array<SchemaEdge> = useMemo(() => {
    return edges.map((e) => ({
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle || '',
      targetHandle: e.targetHandle || '',
    }))
  }, [edges])

  const allColumns = useMemo(() => {
    return nodes.flatMap((node) =>
      node.data.columns.map((col: any) => ({
        table: node.data.label,
        column: col.name,
      })),
    )
  }, [nodes])

  const mergeQueryStateIntoNodes = useCallback(
    (rawNodes: Array<any>) => {
      return rawNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          columns: node.data.columns.map((col: any) => {
            const stateItem = queryState.find(
              (q) =>
                (q.table === node.data.label ||
                  q.collection === node.data.label) &&
                (q.column === col.name || q.field === col.name),
            )
            return {
              ...col,
              state: stateItem
                ? {
                    selected: true,
                    accumulator: stateItem.accumulator,
                    aggregate: stateItem.aggregate,
                    sort: stateItem.sort,
                    sortOrder: stateItem.sortOrder,
                    filter: stateItem.filter,
                    filterGroup: stateItem.filterGroup,
                    having: stateItem.having,
                    alias: stateItem.alias,
                  }
                : { selected: false },
            }
          }),
        },
      }))
    },
    [queryState],
  )

  useEffect(() => {
    const { nodes: rawNodes, edges: rawEdges } = parseSchema(debouncedSchema)
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      rawNodes,
      rawEdges,
    )
    const mergedNodes = mergeQueryStateIntoNodes(layoutedNodes)
    setNodes(mergedNodes)
    setEdges(layoutedEdges)
  }, [
    debouncedSchema,
    queryState,
    setNodes,
    setEdges,
    mergeQueryStateIntoNodes,
  ])

  const handleAutoLayout = useCallback(() => {
    const { nodes: rawNodes, edges: rawEdges } = parseSchema(schemaCode)
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      rawNodes,
      rawEdges,
    )
    const mergedNodes = mergeQueryStateIntoNodes(layoutedNodes)
    setNodes(mergedNodes)
    setEdges(layoutedEdges)
  }, [schemaCode, mergeQueryStateIntoNodes, setNodes, setEdges])

  const getColumnType = useCallback(
    (table: string, column: string): string => {
      const node = nodes.find((n) => n.data.label === table)
      if (!node) return 'String'
      const col = node.data.columns.find((c: any) => c.name === column)
      return col?.type || 'String'
    },
    [nodes],
  )

  useEffect(() => {
    const handleAction = (e: CustomEvent) => {
      const { type, table, column, x, y, columnType } = e.detail

      if (type === 'toggle') {
        setQueryState((prev) => {
          const exists = prev.find(
            (i) =>
              (i.table === table || i.collection === table) &&
              (i.column === column || i.field === column),
          )
          if (exists) {
            return prev.filter((i) => i !== exists)
          }
          return [...prev, { table, column, collection: table, field: column }]
        })
      }

      if (type === 'context') {
        setContextMenu({
          x,
          y,
          table,
          column,
          columnType: columnType || getColumnType(table, column),
        })
      }
    }

    window.addEventListener('column-action', handleAction as EventListener)
    return () => {
      window.removeEventListener('column-action', handleAction as EventListener)
    }
  }, [getColumnType])

  useEffect(() => {
    const optionsWithStages = { ...queryOptions, customStages }
    const pipeline = generateComplexQuery(
      queryState,
      schemaEdges,
      optionsWithStages,
    )
    setGeneratedPipeline(pipeline)
  }, [queryState, schemaEdges, queryOptions, customStages])

  // Available fields for autocomplete
  const availableFields = useMemo(() => {
    return nodes.flatMap((node) =>
      node.data.columns.map((col: any) => col.name),
    )
  }, [nodes])

  const handleUpdateColumn = useCallback(
    (updates: Partial<ColumnRef>) => {
      if (!contextMenu) return

      setQueryState((prev) => {
        const idx = prev.findIndex(
          (i) =>
            (i.table === contextMenu.table ||
              i.collection === contextMenu.table) &&
            (i.column === contextMenu.column || i.field === contextMenu.column),
        )
        if (idx === -1) {
          return [
            ...prev,
            {
              table: contextMenu.table,
              column: contextMenu.column,
              collection: contextMenu.table,
              field: contextMenu.column,
              ...updates,
            },
          ]
        }
        const newArr = [...prev]
        newArr[idx] = { ...newArr[idx], ...updates }
        return newArr
      })
    },
    [contextMenu],
  )

  const handleRemoveColumn = useCallback(() => {
    if (!contextMenu) return
    setQueryState((prev) =>
      prev.filter(
        (i) =>
          !(
            (i.table === contextMenu.table ||
              i.collection === contextMenu.table) &&
            (i.column === contextMenu.column || i.field === contextMenu.column)
          ),
      ),
    )
  }, [contextMenu])

  const handleColumnPanelClick = (
    table: string,
    column: string,
    x: number,
    y: number,
  ) => {
    setContextMenu({
      x,
      y,
      table,
      column,
      columnType: getColumnType(table, column),
    })
  }

  const handleClearAll = () => {
    setQueryState([])
  }

  const currentColumnState = contextMenu
    ? queryState.find(
        (q) =>
          (q.table === contextMenu.table ||
            q.collection === contextMenu.table) &&
          (q.column === contextMenu.column || q.field === contextMenu.column),
      )
    : undefined

  // Monaco Editor setup
  useEffect(() => {
    if (monacoInstance && editorInstance) {
      monacoInstance.editor.setTheme(editorTheme)
    }
  }, [theme, editorTheme, monacoInstance, editorInstance])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setMonacoInstance(monaco)
    setEditorInstance(editor)
    monaco.editor.defineTheme('mongo-light', {
      base: 'vs',
      inherit: true,
      rules: [{ token: 'comment', foreground: '6B7280', fontStyle: 'italic' }],
      colors: { 'editor.background': '#00000000' },
    })
    monaco.editor.defineTheme('mongo-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [{ token: 'comment', foreground: '6B7280', fontStyle: 'italic' }],
      colors: { 'editor.background': '#00000000' },
    })
    monaco.editor.setTheme(editorTheme)
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-mongo/20 to-emerald-500/20 border border-mongo/30">
            <Leaf className="w-5 h-5 text-mongo" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground leading-none text-base">
              MongoDB Query Builder
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Visual Aggregation Pipeline Designer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={queryState.length === 0}
            className="gap-2 h-8"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-mongo/10 border border-mongo/20">
            <Sparkles className="w-3.5 h-3.5 text-mongo" />
            <span className="text-xs text-muted-foreground font-medium">
              {queryState.length} field{queryState.length !== 1 ? 's' : ''}{' '}
              selected
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ReactFlowProvider>
          <ResizablePanelGroup direction="horizontal">
            {/* Schema Editor */}
            <ResizablePanel
              defaultSize={22}
              minSize={15}
              className="flex flex-col"
            >
              <div className="h-11 px-4 flex items-center justify-between border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <Columns className="w-4 h-4 text-mongo" />
                  <span className="text-xs font-medium text-foreground">
                    Schema Definition
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {nodes.length} collections
                </span>
              </div>
              <div className="flex-1 bg-background">
                <Editor
                  height="100%"
                  defaultLanguage="plaintext"
                  value={schemaCode}
                  onChange={(val) => setSchemaCode(val || '')}
                  theme={editorTheme}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: 'off',
                    folding: false,
                    renderLineHighlight: 'none',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-border w-px hover:bg-mongo/50 transition-colors" />

            {/* Diagram */}
            <ResizablePanel
              defaultSize={52}
              minSize={30}
              className="relative bg-background"
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true,
                  style: { strokeWidth: 2, stroke: '#10b981' },
                }}
                fitView
                minZoom={0.1}
                maxZoom={2}
                proOptions={{ hideAttribution: true }}
              >
                <Background color="hsl(var(--border))" gap={32} size={1} />
                <Controls className="bg-card! border-border! shadow-lg!" />
                <Panel position="top-right" className="m-4!">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAutoLayout}
                    className="gap-2 bg-card/90 shadow-lg border-mongo/20"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Auto Layout
                  </Button>
                </Panel>
                <MiniMap
                  nodeColor={(node) => node.data?.styles?.color || '#10b981'}
                  className="bg-card/90! border border-border"
                  maskColor="hsl(var(--background) / 0.8)"
                />
              </ReactFlow>

              {contextMenu && (
                <FieldContextMenu
                  x={contextMenu.x}
                  y={contextMenu.y}
                  table={contextMenu.table}
                  column={contextMenu.column}
                  columnType={contextMenu.columnType}
                  currentState={currentColumnState}
                  allColumns={allColumns}
                  onUpdate={handleUpdateColumn}
                  onRemove={handleRemoveColumn}
                  onClose={() => setContextMenu(null)}
                />
              )}
            </ResizablePanel>

            <ResizableHandle className="bg-border w-px hover:bg-mongo/50 transition-colors" />

            {/* Output & Config */}
            <ResizablePanel
              defaultSize={32}
              minSize={22}
              className="flex flex-col bg-card"
            >
              <Tabs defaultValue="output" className="flex-1 flex flex-col">
                <ScrollArea className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-11 px-1 shrink-0 ">
                    <TabsTrigger
                      value="output"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      Pipeline
                    </TabsTrigger>
                    <TabsTrigger
                      value="stages"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <Workflow className="w-3.5 h-3.5" />
                      Stages
                      {customStages.unwind.length +
                        customStages.addFields.length +
                        customStages.set.length >
                        0 && (
                        <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-mongo/20 text-mongo">
                          {customStages.unwind.length +
                            customStages.addFields.length +
                            customStages.set.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="advanced"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Advanced
                      {(customStages.group?.length || 0) +
                        (customStages.sort?.length || 0) +
                        (customStages.computed?.length || 0) >
                        0 && (
                        <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-violet-500/20 text-violet-500">
                          {(customStages.group?.length || 0) +
                            (customStages.sort?.length || 0) +
                            (customStages.computed?.length || 0)}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="fields"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Fields
                    </TabsTrigger>
                    <TabsTrigger
                      value="options"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      Options
                    </TabsTrigger>
                    <TabsTrigger
                      value="reference"
                      className="data-[state=active]:bg-mongo/10 data-[state=active]:text-mongo rounded-lg px-2.5 gap-1 text-xs"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      Reference
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar
                    orientation="horizontal"
                    className="bottom-0 h-0.5 w-0.5"
                  />
                </ScrollArea>
                <TabsContent
                  value="output"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <PipelineOutputPanel pipeline={generatedPipeline} />
                </TabsContent>

                <TabsContent
                  value="stages"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <CustomStagesPanel
                        stages={customStages}
                        onChange={setCustomStages}
                        availableFields={availableFields}
                      />
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="advanced"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <AdvancedStagesPanel
                        stages={customStages}
                        onChange={setCustomStages}
                        availableFields={availableFields}
                      />
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="fields"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <ScrollArea className="h-full">
                    <SelectedFieldsPanel
                      columns={queryState}
                      onChange={setQueryState}
                      onColumnClick={handleColumnPanelClick}
                    />
                  </ScrollArea>
                </TabsContent>

                <TabsContent
                  value="options"
                  className="flex-1 m-0 p-4 overflow-auto"
                >
                  <PipelineOptionsPanel
                    options={queryOptions}
                    onChange={setQueryOptions}
                  />
                </TabsContent>

                <TabsContent
                  value="reference"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <OperatorReference />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default function MongoQueryBuilder() {
  return <MongoQueryBuilderContent />
}
