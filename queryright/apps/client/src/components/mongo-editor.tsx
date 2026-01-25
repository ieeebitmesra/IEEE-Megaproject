import Editor from '@monaco-editor/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Database, Loader2, Play, RotateCcw } from 'lucide-react'
import type { OnMount } from '@monaco-editor/react'
import type { editor, languages } from 'monaco-editor'
import { useMounted } from '@/hooks/use-mounted'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useTheme } from '@/store/theme-store'
import { JsonOutput } from '@/components/json-output'
import { MongoDataLoader } from '@/components/mongo-data-loader'
import { sampleMongoData } from '@/lib/sample-mongo'
import {
  executeAggregateJSON,
  executeFindJSON,
  getMongoSchemaJSON,
  listCollections,
  loadCustomMongoDataFromJSON,
  loadDefaultMongoData,
  resetMongo,
} from '@/lib/mingo'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mongoSuggestions } from '@/lib/mongo-suggestions'

type Mode = 'find' | 'aggregate'

export default function MongoEditor() {
  const isMounted = useMounted()
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const [mode, setMode] = useState<Mode>('find')
  const [collections, setCollections] = useState<Array<string>>([])
  const [collection, setCollection] = useState<string>('')
  const [results, setResults] = useState<Array<unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [schemaJSON, setSchemaJSON] = useState<any>({ collections: [] })
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

  const defaultText = useMemo(
    () => (mode === 'find' ? DEFAULT_FIND : DEFAULT_AGGREGATE),
    [mode],
  )
  const schemaPretty = useMemo(
    () => JSON.stringify(schemaJSON, null, 2),
    [schemaJSON],
  )

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
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
    // Shortcut
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
      handleExecute(),
    )

    // Register MongoDB suggestions
    const disposable = monaco.languages.registerCompletionItemProvider('json', {
      triggerCharacters: ['$'],
      provideCompletionItems: (model, position) => {
        const lineContent = model.getLineContent(position.lineNumber)
        const textBeforeCursor = lineContent.substring(0, position.column - 1)

        // Find the start of the current word (including $ sign)
        const match = textBeforeCursor.match(/(\$[a-zA-Z0-9_]*)$/)
        const wordStart = match
          ? textBeforeCursor.length - match[1].length
          : position.column - 1
        const prefix = match ? match[1].toLowerCase() : ''

        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: wordStart + 1,
          endColumn: position.column,
        }

        // Filter suggestions based on what user has typed
        const filtered = prefix
          ? mongoSuggestions.filter((sug) =>
              sug.label.toLowerCase().startsWith(prefix),
            )
          : mongoSuggestions

        const suggestions: Array<languages.CompletionItem> = filtered.map(
          (sug) => ({
            label: sug.label,
            kind: sug.kind,
            insertText: sug.insertText,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: { value: sug.documentation },
            detail: sug.detail,
            range: range,
            sortText: sug.label,
          }),
        )
        return { suggestions }
      },
    })

    return () => disposable?.dispose()
  }

  const refreshCollectionsAndSchema = async () => {
    setIsLoadingSchema(true)
    try {
      const names = await listCollections()
      setCollections(names)
      if (names.length && !names.includes(collection)) {
        setCollection(names[0])
      }
      const schema = await getMongoSchemaJSON()
      setSchemaJSON(schema)
    } finally {
      setIsLoadingSchema(false)
    }
  }

  const handleLoadDefault = async () => {
    try {
      await resetMongo()
      await loadDefaultMongoData(sampleMongoData)
      await refreshCollectionsAndSchema()
      setDataLoaded(true)
      setActiveTab('schema')
    } catch (error) {
      console.error('Error loading default data:', error)
      throw error // Re-throw so MongoDataLoader can handle it
    }
  }

  const handleLoadCustom = async (jsonText: string) => {
    try {
      await resetMongo()
      await loadCustomMongoDataFromJSON(jsonText)
      await refreshCollectionsAndSchema()
      setDataLoaded(true)
      setActiveTab('schema')
    } catch (error) {
      console.error('Error loading custom data:', error)
      throw error // Re-throw so MongoDataLoader can handle it
    }
  }

  const handleExecute = async () => {
    if (!editorRef.current) return
    const text = editorRef.current.getValue().trim()
    if (!collection) {
      setError('Please select a collection')
      setActiveTab('output')
      return
    }
    if (!text) {
      setError('Please enter a JSON query')
      setActiveTab('output')
      return
    }

    setIsExecuting(true)
    setError(null)
    setResults(null)
    try {
      const data =
        mode === 'find'
          ? await executeFindJSON(collection, text)
          : await executeAggregateJSON(collection, text)
      setResults(data)
      setActiveTab('output')
      // If documents changed, refresh schema lightly
      await refreshCollectionsAndSchema()
    } catch (e: any) {
      setError(e?.message || 'Query failed')
      setActiveTab('output')
    } finally {
      setIsExecuting(false)
    }
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(defaultText)
    }
    setResults(null)
    setError(null)
  }

  // Only render on client side to avoid SSR issues with IndexedDB/crypto
  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  // Check if required browser APIs are available
  if (typeof window !== 'undefined' && (!window.crypto || !window.indexedDB)) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <Database className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold mb-2">Browser Not Supported</h2>
          <p className="text-muted-foreground">
            MongoDB Editor requires IndexedDB and Web Crypto API. Please use a
            modern browser like Chrome, Firefox, or Edge.
          </p>
        </div>
      </div>
    )
  }

  if (!dataLoaded) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">
              Welcome to MongoDB Editor
            </h2>
            <p className="text-muted-foreground">
              Choose a data source to get started
            </p>
          </div>
          <MongoDataLoader
            onLoadDefault={handleLoadDefault}
            onLoadCustom={handleLoadCustom}
            isLoading={false}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col">
      {/* Toolbar */}
      <div className="p-3 border-b flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="find">find()</SelectItem>
              <SelectItem value="aggregate">aggregate()</SelectItem>
            </SelectContent>
          </Select>

          <Select value={collection} onValueChange={setCollection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.length === 0 ? (
                <SelectItem value="none" disabled>
                  No collections
                </SelectItem>
              ) : (
                collections.map((c) => {
                  const collectionSchema = schemaJSON.collections.find(
                    (col: any) => col.name === c,
                  )
                  const count = collectionSchema?.count ?? 0
                  return (
                    <SelectItem key={c} value={c}>
                      {c} ({count} docs)
                    </SelectItem>
                  )
                })
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleExecute}
          disabled={isExecuting}
          size="sm"
          className="gap-2 ml-auto"
        >
          {isExecuting ? (
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
          disabled={isExecuting}
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
        {!isMobile ? (
          <ResizablePanelGroup
            id="mongo-desktop-panels"
            direction="horizontal"
            className="h-full"
          >
            {/* Left - Schema JSON */}
            <ResizablePanel
              id="mongo-desktop-schema"
              defaultSize={25}
              minSize={15}
              maxSize={40}
            >
              <div className="h-full border-r flex flex-col">
                <div className="p-3 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Database Schema</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={refreshCollectionsAndSchema}
                    disabled={isLoadingSchema}
                  >
                    {isLoadingSchema ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="flex-1 overflow-auto bg-muted/30">
                  {isLoadingSchema ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : schemaJSON.collections.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No collections found</p>
                    </div>
                  ) : (
                    <div className="p-3">
                      {schemaJSON.collections.map((col: any) => (
                        <div
                          key={col.name}
                          className="mb-4 p-3 bg-background rounded-md border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">
                              {col.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {col.count} docs
                            </span>
                          </div>
                          {col.fields && col.fields.length > 0 ? (
                            <div className="space-y-1">
                              {col.fields.map((field: any) => (
                                <div
                                  key={field.name}
                                  className="flex items-center justify-between text-xs"
                                >
                                  <span className="font-mono text-muted-foreground">
                                    {field.name}
                                  </span>
                                  <span className="text-xs px-1.5 py-0.5 bg-muted rounded">
                                    {field.types.join(' | ')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No fields
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Editor */}
            <ResizablePanel
              id="mongo-desktop-editor"
              defaultSize={45}
              minSize={30}
            >
              <Editor
                height="100%"
                defaultLanguage="json"
                language="json"
                defaultValue={defaultText}
                theme={editorTheme}
                onMount={handleEditorDidMount}
              />
            </ResizablePanel>

            <ResizableHandle />

            {/* Right - Output JSON */}
            <ResizablePanel
              id="mongo-desktop-output"
              defaultSize={30}
              minSize={20}
            >
              <JsonOutput
                data={results}
                error={error}
                isExecuting={isExecuting}
                title="Query Output (JSON)"
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <ResizablePanelGroup
            id="mongo-mobile-panels"
            direction="vertical"
            className="h-full"
          >
            <ResizablePanel
              id="mongo-mobile-editor"
              defaultSize={55}
              minSize={35}
              maxSize={70}
            >
              <Editor
                height="100%"
                defaultLanguage="json"
                language="json"
                defaultValue={defaultText}
                theme={editorTheme}
                onMount={handleEditorDidMount}
                options={{ minimap: { enabled: false }, fontSize: 12 }}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel
              id="mongo-mobile-tabs"
              defaultSize={45}
              minSize={30}
              maxSize={65}
            >
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
                          onClick={refreshCollectionsAndSchema}
                          disabled={isLoadingSchema}
                        >
                          {isLoadingSchema ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <RotateCcw className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <div className="flex-1 overflow-auto bg-muted/30">
                        {isLoadingSchema ? (
                          <div className="flex items-center justify-center h-32">
                            <Loader2 className="w-6 h-6 animate-spin" />
                          </div>
                        ) : schemaJSON.collections.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground text-sm">
                            <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No collections found</p>
                          </div>
                        ) : (
                          <div className="p-2">
                            {schemaJSON.collections.map((col: any) => (
                              <div
                                key={col.name}
                                className="mb-3 p-2 bg-background rounded-md border"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-xs">
                                    {col.name}
                                  </h4>
                                  <span className="text-xs text-muted-foreground">
                                    {col.count}
                                  </span>
                                </div>
                                {col.fields && col.fields.length > 0 ? (
                                  <div className="space-y-1">
                                    {col.fields.map((field: any) => (
                                      <div
                                        key={field.name}
                                        className="flex items-center justify-between text-xs"
                                      >
                                        <span className="font-mono text-muted-foreground truncate flex-1">
                                          {field.name}
                                        </span>
                                        <span className="text-xs px-1 py-0.5 bg-muted rounded ml-2">
                                          {field.types.join('|')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-xs text-muted-foreground">
                                    Empty
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="output" className="h-full m-0">
                    <JsonOutput
                      data={results}
                      error={error}
                      isExecuting={isExecuting}
                      title="Query Output (JSON)"
                    />
                  </TabsContent>
                  <TabsContent value="data" className="h-full m-0">
                    <div className="p-4 overflow-auto h-full">
                      <MongoDataLoader
                        onLoadDefault={handleLoadDefault}
                        onLoadCustom={handleLoadCustom}
                        isLoading={false}
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

const DEFAULT_FIND = `{
  // find() JSON spec
  // All fields are optional. Example:
  "filter": { "price": { "$gt": 10 } },
  "projection": { "_id": 0, "title": 1, "price": 1 },
  "sort": { "price": -1 },
  "skip": 0,
  "limit": 10
}`

const DEFAULT_AGGREGATE = `[
  { "$match": { "price": { "$gt": 10 } } },
  { "$group": { "_id": "$author_id", "avgPrice": { "$avg": "$price" }, "count": { "$sum": 1 } } },
  { "$project": { "_id": 0, "author_id": "$_id", "avgPrice": 1, "count": 1 } },
  { "$sort": { "avgPrice": -1 } },
  { "$limit": 10 }
]`
