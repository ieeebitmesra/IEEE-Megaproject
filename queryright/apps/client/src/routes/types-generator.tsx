import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import {
  Braces,
  Check,
  Copy,
  Database,
  FileJson,
  Loader2,
  RefreshCw,
  Settings2,
  Trash2,
} from 'lucide-react'
import type { OnMount } from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { sqlSuggestions } from '@/lib/sql-suggestions'
import { useTheme } from '@/store/theme-store'

export const Route = createFileRoute('/types-generator')({
  component: RouteComponent,
})

// --- Types & Constants ---

type InputMode = 'sql' | 'json'
type OutputFormat = 'typescript' | 'zod'

interface GeneratorConfig {
  casing: 'keep' | 'camel' | 'pascal'
  semicolons: boolean
  makeOptional: boolean
}

const DEFAULT_SQL = `-- Create your table here
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  age INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
);`

const DEFAULT_JSON = `{
  "id": 1,
  "user_name": "John Doe",
  "details": {
    "age": 30,
    "tags": ["admin", "editor"]
  }
}`

// --- Helper Functions ---

const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

const toPascalCase = (str: string) => {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

const applyCasing = (str: string, mode: 'keep' | 'camel' | 'pascal') => {
  if (mode === 'camel') return toCamelCase(str)
  if (mode === 'pascal') return toPascalCase(str)
  return str
}

// --- Parsers ---

/**
 * SQL to TypeScript Parser
 */
const parseSqlToTs = (sql: string, config: GeneratorConfig): string => {
  const lines = sql.split('\n')
  let output = ''
  let currentInterface = ''
  let fields: Array<string> = []

  const tableRegex = /CREATE\s+TABLE\s+(\w+)/i
  const columnRegex = /^\s*(\w+)\s+([A-Za-z0-9_()]+)/

  const flushInterface = () => {
    if (currentInterface && fields.length > 0) {
      output += `export interface ${toPascalCase(currentInterface)} {\n${fields.join('\n')}\n}\n\n`
      fields = []
      currentInterface = ''
    }
  }

  lines.forEach((line) => {
    const tableMatch = line.match(tableRegex)
    if (tableMatch) {
      flushInterface()
      currentInterface = tableMatch[1]
    } else if (currentInterface) {
      if (line.trim().startsWith(')')) {
        flushInterface()
        return
      }

      const colMatch = line.match(columnRegex)
      if (colMatch) {
        const rawName = colMatch[1]
        const rawType = colMatch[2].toUpperCase()

        let tsType = 'any'
        if (rawType.match(/INT|SERIAL|DECIMAL|NUMERIC|FLOAT|REAL|DOUBLE/))
          tsType = 'number'
        else if (rawType.match(/CHAR|TEXT|VARCHAR/)) tsType = 'string'
        else if (rawType.match(/BOOL/)) tsType = 'boolean'
        else if (rawType.match(/TIME|DATE/)) tsType = 'Date'

        const isNullable =
          !line.toUpperCase().includes('NOT NULL') &&
          !line.toUpperCase().includes('PRIMARY KEY')
        const optionalFlag = config.makeOptional || isNullable ? '?' : ''
        const nullUnion = !config.makeOptional && isNullable ? ' | null' : ''
        const finalName = applyCasing(
          rawName,
          config.casing === 'pascal' ? 'camel' : config.casing,
        )

        fields.push(
          `  ${finalName}${optionalFlag}: ${tsType}${nullUnion}${config.semicolons ? ';' : ''}`,
        )
      }
    }
  })

  flushInterface()
  return output || '// No valid CREATE TABLE statement found.'
}

/**
 * SQL to Zod Parser
 */
const parseSqlToZod = (sql: string, config: GeneratorConfig): string => {
  const lines = sql.split('\n')
  let output = `import { z } from "zod";\n\n`
  let currentSchema = ''
  let fields: Array<string> = []

  const tableRegex = /CREATE\s+TABLE\s+(\w+)/i
  const columnRegex = /^\s*(\w+)\s+([A-Za-z0-9_()]+)/

  const flushSchema = () => {
    if (currentSchema && fields.length > 0) {
      const schemaName = toPascalCase(currentSchema) + 'Schema'
      output += `export const ${schemaName} = z.object({\n${fields.join('\n')}\n});\n\n`
      output += `export type ${toPascalCase(currentSchema)} = z.infer<typeof ${schemaName}>;\n\n`
      fields = []
      currentSchema = ''
    }
  }

  lines.forEach((line) => {
    const tableMatch = line.match(tableRegex)
    if (tableMatch) {
      flushSchema()
      currentSchema = tableMatch[1]
    } else if (currentSchema) {
      if (line.trim().startsWith(')')) {
        flushSchema()
        return
      }

      const colMatch = line.match(columnRegex)
      if (colMatch) {
        const rawName = colMatch[1]
        const rawType = colMatch[2].toUpperCase()

        let zodType = 'z.any()'

        // String Types
        if (rawType.includes('CHAR') || rawType.includes('TEXT')) {
          zodType = 'z.string()'
          const lengthMatch = rawType.match(/\((\d+)\)/)
          if (lengthMatch) {
            zodType += `.max(${lengthMatch[1]})`
          }
        }
        // Number Types
        else if (rawType.match(/INT|SERIAL/)) {
          zodType = 'z.number().int()'
        } else if (rawType.match(/DECIMAL|NUMERIC|FLOAT|REAL|DOUBLE/)) {
          zodType = 'z.number()'
        }
        // Boolean
        else if (rawType.match(/BOOL/)) {
          zodType = 'z.boolean()'
        }
        // Date
        else if (rawType.match(/TIME|DATE/)) {
          zodType = 'z.date()'
        }

        const isNullable =
          !line.toUpperCase().includes('NOT NULL') &&
          !line.toUpperCase().includes('PRIMARY KEY')

        if (config.makeOptional) {
          zodType += '.optional()'
        } else if (isNullable) {
          zodType += '.nullable().optional()'
        }

        const finalName = applyCasing(
          rawName,
          config.casing === 'pascal' ? 'camel' : config.casing,
        )
        fields.push(`  ${finalName}: ${zodType},`)
      }
    }
  })

  flushSchema()
  return output === `import { z } from "zod";\n\n`
    ? '// No valid CREATE TABLE statement found.'
    : output
}

/**
 * JSON to TS Parser
 */
const parseJsonToTs = (jsonStr: string, config: GeneratorConfig): string => {
  try {
    const obj = JSON.parse(jsonStr)

    const generate = (obj: any, indentLevel = 1): string => {
      const indent = '  '.repeat(indentLevel)
      const lines = []

      for (const key in obj) {
        const value = obj[key]
        const newKey = applyCasing(
          key,
          config.casing === 'pascal' ? 'camel' : config.casing,
        )
        const optional = config.makeOptional ? '?' : ''
        let typeStr = 'any'

        if (Array.isArray(value)) {
          const firstItemType = value.length > 0 ? typeof value[0] : 'any'
          if (firstItemType === 'object' && value.length > 0) {
            typeStr = `{\n${generate(value[0], indentLevel + 1)}${indent}}[]`
          } else {
            typeStr = `${firstItemType}[]`
          }
        } else if (typeof value === 'object' && value !== null) {
          typeStr = `{\n${generate(value, indentLevel + 1)}${indent}}`
        } else {
          typeStr = typeof value
        }

        lines.push(
          `${indent}${newKey}${optional}: ${typeStr}${config.semicolons ? ';' : ''}`,
        )
      }
      return lines.join('\n')
    }

    return `export interface RootObject {\n${generate(obj)}\n}`
  } catch (e) {
    return '// Invalid JSON'
  }
}

/**
 * JSON to Zod Parser
 */
const parseJsonToZod = (jsonStr: string, config: GeneratorConfig): string => {
  try {
    const obj = JSON.parse(jsonStr)

    const generate = (obj: any, indentLevel = 1): string => {
      const indent = '  '.repeat(indentLevel)
      const lines = []

      for (const key in obj) {
        const value = obj[key]
        const newKey = applyCasing(
          key,
          config.casing === 'pascal' ? 'camel' : config.casing,
        )
        let zodType = 'z.any()'

        if (typeof value === 'string') zodType = 'z.string()'
        else if (typeof value === 'number') zodType = 'z.number()'
        else if (typeof value === 'boolean') zodType = 'z.boolean()'
        else if (Array.isArray(value)) zodType = 'z.array(z.any())'
        else if (typeof value === 'object' && value !== null) {
          zodType = `z.object({\n${generate(value, indentLevel + 1)}${indent}})`
        }

        if (config.makeOptional) zodType += '.optional()'

        lines.push(`${indent}${newKey}: ${zodType},`)
      }
      return lines.join('\n')
    }

    return `import { z } from "zod";\n\nexport const schema = z.object({\n${generate(obj)}\n});`
  } catch (e) {
    return '// Invalid JSON for Zod generation'
  }
}

// --- Main Component ---

export default function RouteComponent() {
  const [inputMode, setInputMode] = useState<InputMode>('sql')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('typescript')
  const [inputCode, setInputCode] = useState(DEFAULT_SQL)
  const [outputCode, setOutputCode] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isEditorMounted, setIsEditorMounted] = useState(false)

  const [monacoInstance, setMonacoInstance] = useState<any>(null)
  const [editorInstance, setEditorInstance] = useState<any>(null)

  // Get theme from store
  const theme = useTheme()
  const editorTheme = theme === 'dark' ? 'shadcn-dark' : 'shadcn-light'

  // Configuration State
  const [config, setConfig] = useState<GeneratorConfig>({
    casing: 'keep',
    semicolons: true,
    makeOptional: false,
  })

  // Handle Input Mode Switch
  const handleModeChange = (mode: InputMode) => {
    setInputMode(mode)
    setInputCode(mode === 'sql' ? DEFAULT_SQL : DEFAULT_JSON)
  }

  // Generate Effect
  useEffect(() => {
    let result = ''
    if (inputMode === 'sql') {
      if (outputFormat === 'typescript') {
        result = parseSqlToTs(inputCode, config)
      } else {
        result = parseSqlToZod(inputCode, config)
      }
    } else {
      // JSON Mode
      if (outputFormat === 'typescript') {
        result = parseJsonToTs(inputCode, config)
      } else {
        result = parseJsonToZod(inputCode, config)
      }
    }
    setOutputCode(result)
  }, [inputCode, inputMode, outputFormat, config])

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Update Monaco theme when theme changes
  useEffect(() => {
    if (monacoInstance && editorInstance) {
      monacoInstance.editor.setTheme(editorTheme)
    }
  }, [theme, editorTheme, monacoInstance, editorInstance])

  // Monaco Setup
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setIsEditorMounted(true)
    setMonacoInstance(monaco)
    setEditorInstance(editor)

    // Define TWO themes: one for light, one for dark
    monaco.editor.defineTheme('shadcn-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000', // Transparent
      },
    })

    monaco.editor.defineTheme('shadcn-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#00000000', // Transparent
      },
    })

    // Immediately set the correct theme
    monaco.editor.setTheme(editorTheme)

    // Language configuration (SQL)
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

    editor.updateOptions({
      fontSize: 14,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      renderLineHighlight: 'none',
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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background/95">
      {/* Header Bar */}
      <div className="border-b px-6 py-3 flex items-center justify-between bg-background shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Braces className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none">
              Types Generator
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Convert Database Schema & JSON to Interfaces
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tabs
            value={inputMode}
            onValueChange={(v) => handleModeChange(v as InputMode)}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sql" className="flex gap-2">
                <Database className="h-3 w-3" /> SQL
              </TabsTrigger>
              <TabsTrigger value="json" className="flex gap-2">
                <FileJson className="h-3 w-3" /> JSON
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] overflow-hidden">
        {/* LEFT COLUMN: Input (Monaco Editor) */}
        <div className="flex flex-col border-r h-full overflow-hidden bg-muted/5">
          <div className="px-4 py-2 bg-muted/10 border-b flex justify-between items-center text-xs font-mono text-muted-foreground border-zinc-800">
            <span>INPUT ({inputMode.toUpperCase()})</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:text-red-400"
              onClick={() => setInputCode('')}
              title="Clear"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 relative">
            {!isEditorMounted && (
              <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            <Editor
              height="100%"
              defaultLanguage={inputMode === 'sql' ? 'sql' : 'json'}
              language={inputMode === 'sql' ? 'sql' : 'json'}
              value={inputCode}
              onChange={(val) => setInputCode(val || '')}
              // Pass the dynamic theme state here
              theme={editorTheme}
              onMount={handleEditorDidMount}
              options={{
                padding: { top: 16, bottom: 16 },
              }}
              loading={<div className="h-full w-full bg-background" />}
              className="bg-transparent"
            />
          </div>
        </div>

        {/* MIDDLE COLUMN: Settings */}
        <div className="flex flex-col border-r bg-muted/10 h-full overflow-y-auto">
          <div className="px-4 py-3 border-b flex items-center gap-2 font-semibold text-sm">
            <Settings2 className="h-4 w-4" /> Configuration
          </div>

          <div className="p-4 flex flex-col gap-6">
            {/* Output Target */}
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold">
                Output Target
              </Label>
              <Select
                value={outputFormat}
                onValueChange={(v) => setOutputFormat(v as OutputFormat)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="typescript">
                    TypeScript Interface
                  </SelectItem>
                  <SelectItem value="zod">Zod Schema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Casing */}
            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground font-bold">
                Key Casing
              </Label>
              <Select
                value={config.casing}
                onValueChange={(v: any) =>
                  setConfig((prev) => ({ ...prev, casing: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keep">Keep Original</SelectItem>
                  <SelectItem value="camel">camelCase</SelectItem>
                  <SelectItem value="pascal">PascalCase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Toggles */}
            <div className="space-y-4 pt-2">
              <Label className="text-xs uppercase text-muted-foreground font-bold">
                Formatting
              </Label>

              <div className="flex items-center justify-between">
                <Label htmlFor="opt-semi" className="text-sm font-normal">
                  Semicolons
                </Label>
                <Switch
                  id="opt-semi"
                  checked={config.semicolons}
                  onCheckedChange={(c) =>
                    setConfig((prev) => ({ ...prev, semicolons: c }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="opt-optional" className="text-sm font-normal">
                  Make all Optional
                </Label>
                <Switch
                  id="opt-optional"
                  checked={config.makeOptional}
                  onCheckedChange={(c) =>
                    setConfig((prev) => ({ ...prev, makeOptional: c }))
                  }
                />
              </div>
            </div>

            <div className="pt-4 mt-auto">
              <Button
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 cursor-default"
                variant="ghost"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Auto-Generating...
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output (Read-only Textarea for easy selection) */}
        <div className="flex flex-col h-full overflow-hidden bg-muted/5">
          <div className="px-4 py-2 border-b flex justify-between items-center text-xs font-mono text-muted-foreground bg-background">
            <span>OUTPUT ({outputFormat === 'typescript' ? 'TS' : 'ZOD'})</span>
            <Button
              variant={isCopied ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'h-7 px-3 text-xs gap-2 transition-all',
                isCopied && 'bg-green-600 hover:bg-green-700 text-white',
              )}
              onClick={handleCopy}
            >
              {isCopied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {isCopied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <div className="relative flex-1">
            <Textarea
              className="absolute inset-0 w-full h-full resize-none border-none focus-visible:ring-0 rounded-none font-mono text-sm p-4 bg-transparent text-foreground"
              value={outputCode}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}
