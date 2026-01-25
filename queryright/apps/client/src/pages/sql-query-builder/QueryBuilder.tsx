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
  Wand2,
} from 'lucide-react'
import TableNode from './TableNode'
import ColumnContextMenu from './ColumnContextMenu'
import QueryOptionsPanel from './QueryOptionsPanel'
import SelectedColumnsPanel from './SelectedColumnsPanel'
import SQLOutputPanel from './SQLOutputPanel'
import CTEBuilderPanel from './CTEBuilderPanel'
import type { OnMount } from '@monaco-editor/react'
import type {
  CTEDefinition,
  ColumnRef,
  QueryOptions,
  SchemaEdge,
  SubqueryDefinition,
} from '@/lib/sql-query-engine'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  generateComplexQuery,
  getLayoutedElements,
  parseSchema,
} from '@/lib/sql-query-engine'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/store/theme-store'

const DEFAULT_SCHEMA = `// 🏢 Employee Management System
// Define tables with [icon: name, color: #hex]

employees [icon: user, color: #10b981] {
  id string pk
  first_name string
  last_name string
  email string
  salary decimal
  hire_date date
  department_id string
  manager_id string
}

departments [icon: building, color: #3b82f6] {
  id string pk
  name string
  location string
  budget decimal
}

projects [icon: briefcase, color: #8b5cf6] {
  id string pk
  name string
  start_date date
  end_date date
  department_id string
  status string
}

salaries [icon: dollar-sign, color: #f59e0b] {
  id string pk
  employee_id string
  amount decimal
  effective_date date
  currency string
}

// 🔗 Define relationships: table.col > table.col
employees.department_id > departments.id
employees.manager_id > employees.id
projects.department_id > departments.id
salaries.employee_id > employees.id`

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

  const [ctes, setCTEs] = useState<Array<CTEDefinition>>([])
  const [subqueries, setSubqueries] = useState<Array<SubqueryDefinition>>([])

  const [generatedSQL, setGeneratedSQL] = useState('')
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    table: string
    column: string
    columnType: string
  } | null>(null)

  // Parse schema edges for SQL generation
  const schemaEdges: Array<SchemaEdge> = useMemo(() => {
    return edges.map((e) => ({
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle || '',
      targetHandle: e.targetHandle || '',
    }))
  }, [edges])

  // All columns for context menu dropdown
  const allColumns = useMemo(() => {
    return nodes.flatMap((node) =>
      node.data.columns.map((col: any) => ({
        table: node.data.label,
        column: col.name,
      })),
    )
  }, [nodes])

  // Merge query state into nodes
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
                    window: stateItem.window,
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

  // Parse and layout schema
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

  // Auto-layout handler
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

  // Get column type from nodes
  const getColumnType = useCallback(
    (table: string, column: string): string => {
      const node = nodes.find((n) => n.data.label === table)
      if (!node) return 'string'
      const col = node.data.columns.find((c: any) => c.name === column)
      return col?.type || 'string'
    },
    [nodes],
  )

  // Handle column actions from diagram
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

  // Generate SQL whenever state changes
  useEffect(() => {
    const optionsWithCTEs = {
      ...queryOptions,
      ctes: ctes.length > 0 ? ctes : undefined,
      subqueries: subqueries.length > 0 ? subqueries : undefined,
    }
    const sql = generateComplexQuery(queryState, schemaEdges, optionsWithCTEs)
    setGeneratedSQL(sql)
  }, [queryState, schemaEdges, queryOptions, ctes, subqueries])

  // Context menu handlers
  const handleUpdateColumn = useCallback(
    (updates: Partial<ColumnRef>) => {
      if (!contextMenu) return

      setQueryState((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.table === contextMenu.table && i.column === contextMenu.column,
        )

        if (idx === -1) {
          // Add column if not present
          return [
            ...prev,
            {
              table: contextMenu.table,
              column: contextMenu.column,
              ...updates,
            },
          ]
        }

        // Update existing
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

  // Update Monaco theme when theme changes
  useEffect(() => {
    if (monacoInstance && editorInstance) {
      monacoInstance.editor.setTheme(editorTheme)
    }
  }, [theme, editorTheme, monacoInstance, editorInstance])

  // Monaco Editor Mount Handler
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setMonacoInstance(monaco)
    setEditorInstance(editor)

    // Define custom themes
    monaco.editor.defineTheme('shadcn-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000',
      },
    })

    monaco.editor.defineTheme('shadcn-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000',
      },
    })

    // Set initial theme
    monaco.editor.setTheme(editorTheme)
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 border border-primary/20">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground leading-none text-base">
              Visual Query Builder
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Build SQL queries visually
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
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              {queryState.length} column{queryState.length !== 1 ? 's' : ''}{' '}
              selected
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ReactFlowProvider>
          <ResizablePanelGroup direction="horizontal">
            {/* LEFT: Schema Editor */}
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
                    lineNumbers: 'off',
                    folding: false,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    renderLineHighlight: 'none',
                    overviewRulerBorder: false,
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'hidden',
                      verticalScrollbarSize: 8,
                    },
                  }}
                  loading={<div className="h-full w-full bg-background" />}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle className="bg-border w-px hover:bg-primary/50 transition-colors" />

            {/* MIDDLE: Diagram */}
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
                className="bg-background"
                proOptions={{ hideAttribution: true }}
              >
                <Background color="hsl(var(--border))" gap={32} size={1} />
                <Controls className="bg-card! border-border! rounded-xl! overflow-hidden shadow-lg! [&>button]:bg-card! [&>button]:border-border! [&>button]:text-muted-foreground! [&>button:hover]:bg-secondary! [&>button:hover]:text-foreground!" />
                <Panel position="top-left" className="m-4!">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 bg-card/90 backdrop-blur-sm border border-border rounded-xl shadow-lg">
                    <MousePointer2 className="w-4 h-4 text-primary" />
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">Click</span>{' '}
                      to select •
                      <span className="text-foreground font-medium">
                        {' '}
                        Right-click
                      </span>{' '}
                      for options
                    </div>
                  </div>
                </Panel>
                <Panel position="top-right" className="m-4!">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAutoLayout}
                    className="gap-2 bg-card/90 backdrop-blur-sm border-border shadow-lg hover:bg-secondary"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Auto Layout
                  </Button>
                </Panel>
                <MiniMap
                  nodeColor={(node) =>
                    node.data?.styles?.color || 'hsl(var(--primary))'
                  }
                  maskColor="hsl(var(--background) / 0.8)"
                  className="bg-card/90! border border-border! rounded-xl! shadow-lg! overflow-hidden"
                  style={{ width: 150, height: 100 }}
                  pannable
                  zoomable
                />
              </ReactFlow>

              {/* Context Menu */}
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

            {/* RIGHT: Output & Config */}
            <ResizablePanel
              defaultSize={30}
              minSize={20}
              className="flex flex-col bg-card"
            >
              <Tabs defaultValue="output" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-11 px-2 shrink-0">
                  <TabsTrigger
                    value="output"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-3 gap-1.5"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    SQL
                  </TabsTrigger>
                  <TabsTrigger
                    value="columns"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-3 gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Columns
                    {queryState.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                        {queryState.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="options"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-3 gap-1.5"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                    Options
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-3 gap-1.5"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Advanced
                    {(ctes.length > 0 || subqueries.length > 0) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-qb-output/20 text-qb-output">
                        {ctes.length + subqueries.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="output"
                  className="flex-1 m-0 overflow-hidden"
                >
                  <SQLOutputPanel sql={generatedSQL} />
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

                <TabsContent
                  value="advanced"
                  className="flex-1 m-0 p-4 overflow-auto"
                >
                  <CTEBuilderPanel
                    ctes={ctes}
                    subqueries={subqueries}
                    onCTEsChange={setCTEs}
                    onSubqueriesChange={setSubqueries}
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
