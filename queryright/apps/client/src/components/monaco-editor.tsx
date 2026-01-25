import Editor from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { Database, Loader2, Play, RotateCcw } from 'lucide-react'
import type { OnMount } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import type { TableInfo } from '@/components/schema-viewer'
import {
  executeSQL,
  getDatabaseSchema,
  initializeDatabase,
  loadCustomData,
  loadDefaultData,
  resetDatabase,
} from '@/lib/pglite'
import { Button } from '@/components/ui/button'
import { sqlSuggestions } from '@/lib/sql-suggestions'
import { useTheme } from '@/store/theme-store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SchemaViewer } from '@/components/schema-viewer'
import { ResultsTable } from '@/components/results-table'
import { DataLoader } from '@/components/data-loader'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

function CodeEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const [results, setResults] = useState<Array<unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [schema, setSchema] = useState<Array<TableInfo>>([])
  const [isLoadingSchema, setIsLoadingSchema] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState<'schema' | 'output' | 'data'>(
    'data',
  )
  const [isMobile, setIsMobile] = useState(false)
  const theme = useTheme()
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize database on mount (lazy - doesn't create OPFS yet)
  useEffect(() => {
    // Just set as not initializing, don't actually initialize the database
    // Database will initialize when user loads data
    setIsInitializing(false)
  }, [])

  // Refresh schema
  const refreshSchema = async () => {
    setIsLoadingSchema(true)
    try {
      const tables = await getDatabaseSchema()
      setSchema(tables)
    } catch (err) {
      console.error('Failed to load schema:', err)
    } finally {
      setIsLoadingSchema(false)
    }
  }

  // Handle loading default data
  const handleLoadDefault = async () => {
    // Initialize and reset database first to clear any existing data
    await initializeDatabase()
    await resetDatabase()
    await loadDefaultData()
    await refreshSchema()
    setDataLoaded(true)
    setActiveTab('schema')
  }

  // Handle loading custom data
  const handleLoadCustom = async (sql: string) => {
    // Initialize and reset database first to clear any existing data
    await initializeDatabase()
    await resetDatabase()
    await loadCustomData(sql)
    await refreshSchema()
    setDataLoaded(true)
    setActiveTab('schema')
  }

  // Refresh schema when data is loaded
  useEffect(() => {
    if (dataLoaded) {
      refreshSchema()
    }
  }, [dataLoaded])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor

    // Configure SQL language features
    monaco.languages.setLanguageConfiguration('sql', {
      comments: {
        lineComment: '--',
        blockComment: ['/*', '*/'],
      },
      brackets: [
        ['(', ')'],
        ['[', ']'],
      ],
      autoClosingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      wordPattern: /[a-zA-Z_]\w*/,
    })

    // Add SQL keywords and snippets
    monaco.languages.registerCompletionItemProvider('sql', {
      triggerCharacters: [' ', '.', '(', ','],

      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }

        // Map the imported suggestions to Monaco's format
        const suggestions = sqlSuggestions.map((suggestion) => ({
          label: suggestion.label,
          kind: suggestion.kind,
          insertText: suggestion.insertText,
          insertTextRules: suggestion.insertTextRules,
          documentation: suggestion.detail
            ? `${suggestion.documentation}\n\n${suggestion.detail}`
            : suggestion.documentation,
          range,
        }))

        return { suggestions }
      },
    })

    // Add keyboard shortcut for execution (Ctrl+Enter or Cmd+Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleExecute()
    })

    // Set editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
      fontLigatures: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true,
      },
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showWords: true,
      },
    })
  }

  const handleExecute = async () => {
    if (!editorRef.current) return

    // Get selected text if there's a selection, otherwise get the current line or all text
    const selection = editorRef.current.getSelection()
    let sql = ''

    if (selection && !selection.isEmpty()) {
      // Execute only selected text
      sql = editorRef.current.getModel()?.getValueInRange(selection) || ''
    } else {
      // Get all text and try to find the first complete SQL statement
      const allText = editorRef.current.getValue()

      // Remove comments and get the first SQL statement
      const lines = allText.split('\n')
      const sqlLines: Array<string> = []
      let inStatement = false

      for (const line of lines) {
        const trimmedLine = line.trim()
        // Skip empty lines and comment-only lines
        if (!trimmedLine || trimmedLine.startsWith('--')) {
          continue
        }

        sqlLines.push(line)
        inStatement = true

        // If we hit a semicolon, we have a complete statement
        if (trimmedLine.endsWith(';')) {
          break
        }
      }

      sql = sqlLines.join('\n').trim()
    }

    if (!sql) {
      setError('Please enter a SQL query')
      return
    }

    setIsExecuting(true)
    setError(null)
    setResults(null)

    try {
      console.log('Executing SQL:', sql)
      const result = await executeSQL(sql)
      console.log('Query results received:', result, 'Length:', result?.length)
      setResults(result)
      setActiveTab('output')

      // Refresh schema if data modification query
      const upperSQL = sql.toUpperCase()
      if (
        upperSQL.includes('CREATE') ||
        upperSQL.includes('DROP') ||
        upperSQL.includes('ALTER') ||
        upperSQL.includes('INSERT') ||
        upperSQL.includes('UPDATE') ||
        upperSQL.includes('DELETE')
      ) {
        await refreshSchema()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setActiveTab('output')
      console.error('Query error:', err)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(DEFAULT_SQL)
    }
    setResults(null)
    setError(null)
  }

  if (!dataLoaded) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">
              Welcome to SQL Practice Editor
            </h2>
            <p className="text-muted-foreground">
              Choose a data source to get started with your SQL queries
            </p>
          </div>
          <DataLoader
            onLoadDefault={handleLoadDefault}
            onLoadCustom={handleLoadCustom}
            isLoading={isInitializing}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center gap-2 shrink-0">
        <Button
          onClick={handleExecute}
          disabled={isExecuting || isInitializing}
          size="sm"
          className="gap-2"
        >
          {isInitializing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {isMobile ? 'Run' : 'Run (Ctrl+Enter)'}
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          disabled={isExecuting || isInitializing}
          size="sm"
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {!isMobile && 'Reset'}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {/* Desktop Layout */}
        {!isMobile ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Sidebar - Schema */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full border-r">
                <div className="p-3 border-b flex items-center justify-between">
                  <h3 className="font-semibold">Database Schema</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={refreshSchema}
                    disabled={isLoadingSchema}
                  >
                    {isLoadingSchema ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <SchemaViewer tables={schema} isLoading={isLoadingSchema} />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Main Editor Area */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Editor
                height="100%"
                defaultLanguage="sql"
                language="sql"
                defaultValue={DEFAULT_SQL}
                theme={editorTheme}
                onMount={handleEditorDidMount}
                options={{
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  automaticLayout: true,
                }}
              />
            </ResizablePanel>

            <ResizableHandle />

            {/* Right Panel - Output */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full border-l">
                <div className="p-3 border-b">
                  <h3 className="font-semibold">Query Output</h3>
                </div>
                <ResultsTable
                  results={results}
                  error={error}
                  isExecuting={isExecuting}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          /* Mobile Layout */
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Editor */}
            <ResizablePanel defaultSize={55} minSize={35} maxSize={70}>
              <Editor
                height="100%"
                defaultLanguage="sql"
                language="sql"
                defaultValue={DEFAULT_SQL}
                theme={editorTheme}
                onMount={handleEditorDidMount}
                options={{
                  selectOnLineNumbers: true,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  automaticLayout: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                }}
              />
            </ResizablePanel>

            <ResizableHandle />

            {/* Bottom Tabs - Schema and Output */}
            <ResizablePanel defaultSize={45} minSize={30} maxSize={65}>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as typeof activeTab)}
                className="h-full flex flex-col"
              >
                <TabsList className="w-full rounded-none border-b shrink-0">
                  <TabsTrigger value="schema" className="flex-1">
                    Schema
                  </TabsTrigger>
                  <TabsTrigger value="output" className="flex-1">
                    Output
                  </TabsTrigger>
                  <TabsTrigger value="data" className="flex-1">
                    Data
                  </TabsTrigger>
                </TabsList>
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="schema" className="h-full m-0">
                    <div className="h-full flex flex-col">
                      <div className="p-2 border-b flex items-center justify-between shrink-0">
                        <h3 className="font-semibold text-sm">
                          Database Schema
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={refreshSchema}
                          disabled={isLoadingSchema}
                        >
                          {isLoadingSchema ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <RotateCcw className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <SchemaViewer
                        tables={schema}
                        isLoading={isLoadingSchema}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="output" className="h-full m-0">
                    <ResultsTable
                      results={results}
                      error={error}
                      isExecuting={isExecuting}
                    />
                  </TabsContent>
                  <TabsContent value="data" className="h-full m-0">
                    <div className="p-4 overflow-auto h-full">
                      <DataLoader
                        onLoadDefault={handleLoadDefault}
                        onLoadCustom={handleLoadCustom}
                        isLoading={isInitializing}
                      />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  )
}

const DEFAULT_SQL = `-- Welcome to SQL Practice! 📚
-- Press Ctrl+Enter to execute any query
-- Database: Online Bookstore

-- Try these example queries:

-- 1. Get all books with their authors
SELECT b.title, a.name as author, b.price, b.publication_year
FROM books b
JOIN authors a ON b.author_id = a.author_id
ORDER BY b.title
LIMIT 10;

-- 2. Find top-rated books
-- SELECT b.title, a.name as author, AVG(r.rating) as avg_rating, COUNT(r.review_id) as review_count
-- FROM books b
-- JOIN authors a ON b.author_id = a.author_id
-- LEFT JOIN reviews r ON b.book_id = r.book_id
-- GROUP BY b.book_id, b.title, a.name
-- HAVING COUNT(r.review_id) > 0
-- ORDER BY avg_rating DESC
-- LIMIT 5;

-- 3. Customer order history
-- SELECT c.first_name, c.last_name, COUNT(o.order_id) as total_orders, SUM(o.total_amount) as total_spent
-- FROM customers c
-- LEFT JOIN orders o ON c.customer_id = o.customer_id
-- GROUP BY c.customer_id, c.first_name, c.last_name
-- ORDER BY total_spent DESC;

-- Available tables: authors, books, categories, customers, orders, order_items, reviews`

export default CodeEditor
