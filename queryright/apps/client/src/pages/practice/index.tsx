import { useRef, useState } from 'react'
import { Database, Play, RotateCcw, Send, Table } from 'lucide-react'
import { Editor } from '@monaco-editor/react'
import type { OnMount } from '@monaco-editor/react'
import type { TableInfo } from '@/components/schema-viewer'
import type { editor } from 'monaco-editor'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import DisplayEditor from '@/pages/text-editor/components/editor/plate-static-editor'
import { useTheme } from '@/store/theme-store'
import { sqlSuggestions } from '@/lib/sql-suggestions'
import { executeSQL, getDatabaseSchema } from '@/lib/pglite'
import { SchemaViewer } from '@/components/schema-viewer'

export default function DatabaseQueryEditor() {
  const theme = useTheme()
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs-light'
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  //   const problem = {
  //     title: "1. Find Top Earning Employees",
  //     difficulty: "Easy",
  //     description: "Write a SQL query to find all employees in the Engineering department, ordered by their salary in descending order. Return employee_id, name, department, and salary.",
  //     examples: [
  //       {
  //         input: "Table: employees",
  //         output: "employee_id | name | department | salary",
  //         explanation: "Return all Engineering employees sorted by salary from highest to lowest."
  //       }
  //     ],
  //     constraints: [
  //       "1 ≤ employees.length ≤ 10⁴",
  //       "Valid department names: 'Engineering', 'Sales', 'Marketing', 'HR'",
  //       "salary is a positive integer"
  //     ]
  //   };

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Executing query...\n\n')

    setTimeout(() => {
      setOutput(`Query executed successfully!

+-------------+---------------+-------------+---------+
| employee_id | name          | department  | salary  |
+-------------+---------------+-------------+---------+
| 1           | Alice Johnson | Engineering | 95000   |
| 4           | David Brown   | Engineering | 92000   |
| 2           | Bob Smith     | Engineering | 87000   |
+-------------+---------------+-------------+---------+

3 rows returned
Execution time: 0.042s`)
      setIsRunning(false)
    }, 1200)
  }

  const handleSubmit = () => {
    setIsRunning(true)
    setOutput('Running all test cases...\n\n')

    setTimeout(() => {
      setOutput(`All test cases passed! ✓

Test Case 1: Passed ✓
Test Case 2: Passed ✓
Test Case 3: Passed ✓

Runtime: 42 ms (Beats 91.23%)
Memory: 2.1 MB

Your solution is correct!`)
      setIsRunning(false)
    }, 1800)
  }
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
  const handleExecute = async () => {
    if (!editorRef.current) return

    let sql = ''

    const allText = editorRef.current.getValue()

    const lines = allText.split('\n')
    const sqlLines: Array<string> = []
    let inStatement = false

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine || trimmedLine.startsWith('--')) {
        continue
      }

      sqlLines.push(line)
      inStatement = true

      if (trimmedLine.endsWith(';')) {
        break
      }
    }

    sql = sqlLines.join('\n').trim()

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

  return (
    <div className="h-screen flex flex-col w-full">
      {' '}
      {/* Ensure full width */}
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        {' '}
        {/* Added w-full h-full */}
        {/* Left Panel - Problem Description */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col border-r">
            {' '}
            {/* Removed w-1/2, used h-full */}
            <Tabs
              defaultValue="description"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="w-full justify-start rounded-none border-b h-12 px-4 shrink-0">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="schema">
                  <Table className="w-4 h-4 mr-2" />
                  Schema
                </TabsTrigger>
                <TabsTrigger value="data">
                  <Database className="w-4 h-4 mr-2" />
                  Data
                </TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="description" className="p-6 space-y-6 m-0">
                  <DisplayEditor />
                </TabsContent>

                <TabsContent value="schema" className="p-6 space-y-6 m-0">
                  <SchemaViewer tables={schema} isLoading={isLoadingSchema} />
                </TabsContent>

                <TabsContent
                  value="data"
                  className="p-6 space-y-6 m-0"
                ></TabsContent>

                <TabsContent value="solutions" className="p-6 m-0">
                  <p className="text-muted-foreground">
                    Solutions will appear here...
                  </p>
                </TabsContent>

                <TabsContent value="submissions" className="p-6 m-0">
                  <p className="text-muted-foreground">
                    Your submissions will appear here...
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-muted hover:bg-accent transition-colors w-1" />
        {/* Right Panel - Query Editor & Output */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* Top - Code Editor */}
              <ResizablePanel defaultSize={70} minSize={20}>
                <div className="h-full flex flex-col">
                  <div className="border-b px-4 py-2 flex items-center justify-between shrink-0 bg-background">
                    <Button
                      variant="outline"
                      onClick={handleRun}
                      disabled={isRunning}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run
                    </Button>
                    <Button onClick={handleSubmit} disabled={isRunning}>
                      <Send className="w-4 h-4 mr-2" />
                      Submit
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log('Reset clicked')}
                      disabled={isRunning}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="sql"
                      language="sql"
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
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle className="bg-muted hover:bg-accent transition-colors h-1" />

              {/* Bottom - Output */}
              <ResizablePanel defaultSize={30} minSize={10}>
                <div className="px-4 py-2 border-b text-sm font-semibold bg-muted/50 shrink-0">
                  Query Results
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {output || 'Run your query to see results...'}
                  </pre>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
