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
  Database,
  Layers,
  LayoutGrid,
  MousePointer2,
  RotateCcw,
  Settings2,
  Sparkles,
} from 'lucide-react'
import TableNode from '../sql-query-builder/TableNode'
import ColumnContextMenu from '../sql-query-builder/ColumnContextMenu'
import QueryOptionsPanel from '../sql-query-builder/QueryOptionsPanel'
import SelectedColumnsPanel from '../sql-query-builder/SelectedColumnsPanel'
import MongoOutputPanel from './MongoOutputPanel' // Note: Importing the modified component
import type {
  ColumnRef,
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useTheme } from '@/store/theme-store'

const DEFAULT_SCHEMA = `// 🍃 Employee Management System (MongoDB)
// Define Collections

employees [icon: user, color: #10b981] {
  _id objectId pk
  first_name string
  last_name string
  email string
  salary double
  hire_date date
  department_id objectId
}

departments [icon: building, color: #3b82f6] {
  _id objectId pk
  name string
  location string
  budget decimal
}

projects [icon: briefcase, color: #8b5cf6] {
  _id objectId pk
  name string
  start_date date
  department_id objectId
}

// 🍃 Define relationships ($lookup paths)
employees.department_id > departments._id
projects.department_id > departments._id`

const nodeTypes = { eraserTable: TableNode }

function QueryBuilderContent() {
  const [schemaCode, setSchemaCode] = useState(DEFAULT_SCHEMA)
  const [debouncedSchema] = useDebounce(schemaCode, 400)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [monacoInstance, setMonacoInstance] = useState<any>(null)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  const theme = useTheme()
  const editorTheme = theme === 'dark' ? 'shadcn-dark' : 'shadcn-light'

  const [queryState, setQueryState] = useState<Array<ColumnRef>>([])
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    distinct: false,
    limit: 100,
    offset: 0,
    joinType: 'INNER',
  })

  const [generatedSQL, setGeneratedSQL] = useState('')
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
              (q) => q.table === node.data.label && q.column === col.name,
            )
            return {
              ...col,
              state: stateItem
                ? {
                    selected: true,
                    aggregate: stateItem.aggregate,
                    sort: stateItem.sort,
                    sortOrder: stateItem.sortOrder,
                    filter: stateItem.filter,
                    filterGroup: stateItem.filterGroup,
                    having: stateItem.having,
                    alias: stateItem.alias,
                    expression: stateItem.expression,
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
      if (!node) return 'string'
      const col = node.data.columns.find((c: any) => c.name === column)
      return col?.type || 'string'
    },
    [nodes],
  )

  useEffect(() => {
    const handleAction = (e: CustomEvent) => {
      const { type, table, column, x, y, columnType } = e.detail

      if (type === 'toggle') {
        setQueryState((prev) => {
          const exists = prev.find(
            (i) => i.table === table && i.column === column,
          )
          if (exists) {
            return prev.filter((i) => i !== exists)
          }
          return [...prev, { table, column }]
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
    const sql = generateComplexQuery(queryState, schemaEdges, queryOptions)
    setGeneratedSQL(sql)
  }, [queryState, schemaEdges, queryOptions])

  const handleUpdateColumn = useCallback(
    (updates: Partial<ColumnRef>) => {
      if (!contextMenu) return

      setQueryState((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.table === contextMenu.table && i.column === contextMenu.column,
        )
        if (idx === -1) {
          return [
            ...prev,
            {
              table: contextMenu.table,
              column: contextMenu.column,
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
          !(i.table === contextMenu.table && i.column === contextMenu.column),
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
        (q) => q.table === contextMenu.table && q.column === contextMenu.column,
      )
    : undefined

  // Monaco Editor setup (same as before)
  useEffect(() => {
    if (monacoInstance && editorInstance) {
      monacoInstance.editor.setTheme(editorTheme)
    }
  }, [theme, editorTheme, monacoInstance, editorInstance])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setMonacoInstance(monaco)
    setEditorInstance(editor)
    monaco.editor.defineTheme('shadcn-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: { 'editor.background': '#00000000' },
    })
    monaco.editor.defineTheme('shadcn-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: { 'editor.background': '#00000000' },
    })
    monaco.editor.setTheme(editorTheme)
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20">
            <Database className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground leading-none text-base">
              Mongo Pipeline Builder
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Visual Aggregation Builder
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
            <Sparkles className="w-3.5 h-3.5 text-green-500" />
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
              defaultSize={18}
              minSize={12}
              className="flex flex-col"
            >
              <div className="h-11 px-4 flex items-center border-b border-border bg-card">
                <Columns className="w-4 h-4 text-primary mr-2" />
                <span className="text-xs font-medium text-foreground">
                  Schema
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
                  }}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-border w-px hover:bg-primary/50 transition-colors" />

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
                  style: { strokeWidth: 2, stroke: '#71717a' },
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
                    className="gap-2 bg-card/90 shadow-lg"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Auto Layout
                  </Button>
                </Panel>
                <MiniMap
                  nodeColor={(node) =>
                    node.data?.styles?.color || 'hsl(var(--primary))'
                  }
                  className="bg-card/90! border border-border!"
                />
              </ReactFlow>

              {contextMenu && (
                <ColumnContextMenu
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

            <ResizableHandle className="bg-border w-px hover:bg-primary/50 transition-colors" />

            {/* Output & Config */}
            <ResizablePanel
              defaultSize={30}
              minSize={20}
              className="flex flex-col bg-card"
            >
              <Tabs defaultValue="output" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-11 px-2 shrink-0">
                  <TabsTrigger
                    value="output"
                    className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 rounded-lg px-3 gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    Pipeline
                  </TabsTrigger>
                  <TabsTrigger
                    value="columns"
                    className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 rounded-lg px-3 gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Fields
                  </TabsTrigger>
                  <TabsTrigger
                    value="options"
                    className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 rounded-lg px-3 gap-1.5"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    Options
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="output"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <MongoOutputPanel sql={generatedSQL} />
                </TabsContent>

                <TabsContent
                  value="columns"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <ScrollArea className="h-full">
                    <SelectedColumnsPanel
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
                  <QueryOptionsPanel
                    options={queryOptions}
                    onChange={setQueryOptions}
                  />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ReactFlowProvider>
      </div>
    </div>
  )
}

export default function QueryBuilder() {
  return <QueryBuilderContent />
}
