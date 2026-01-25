import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'

import {
  Check,
  Copy,
  Eraser,
  Play,
  RefreshCw,
  Sparkles,
  Terminal,
} from 'lucide-react'

// Import Shadcn Components
import { optimizeQueryFn } from '../utils/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Import Server Function

export const Route = createFileRoute('/query-optimizer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<'sql' | 'mongodb'>('sql')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleOptimize = async () => {
    if (!input) return
    setIsOptimizing(true)

    try {
      // Direct Server RPC Call
      const result = await optimizeQueryFn({ data: { query: input, language } })
      setOutput(result)
    } catch (err) {
      console.error(err)
      setOutput('-- Error connecting to server function')
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:flex-row gap-6 p-4 lg:p-6 max-w-[1800px] mx-auto w-full">
      {/* --- Left Pane: Input --- */}
      <Card className="flex-1 flex flex-col shadow-sm border-muted">
        <CardHeader className="pb-3 border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              Input Query
            </CardTitle>
            <div className="flex items-center gap-2">
              <Tabs
                value={language}
                onValueChange={(v) => setLanguage(v as any)}
                className="w-[180px]"
              >
                <TabsList className="grid w-full grid-cols-2 h-8">
                  <TabsTrigger value="sql" className="text-xs">
                    SQL
                  </TabsTrigger>
                  <TabsTrigger value="mongodb" className="text-xs">
                    MongoDB
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setInput('')
                  setOutput('')
                }}
                disabled={!input}
                className="h-8 w-8"
              >
                <Eraser className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste your ${language.toUpperCase()} query here...`}
            className="w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none p-6 font-mono text-sm leading-relaxed bg-transparent"
            spellCheck={false}
          />
        </CardContent>

        <Separator />

        <CardFooter className="py-4 bg-muted/20 flex justify-end">
          <Button
            onClick={handleOptimize}
            disabled={!input || isOptimizing}
            className="shadow-lg shadow-primary/20"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />{' '}
                Optimizing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 fill-current" /> Run Optimization
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* --- Right Pane: Output --- */}
      <Card className="flex-1 flex flex-col shadow-sm border-muted overflow-hidden bg-card">
        <CardHeader className="pb-3 border-b border-white/10 bg-[#252526]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-sm font-medium text-gray-200">
                Result
              </CardTitle>
              {output && (
                <Badge
                  variant="secondary"
                  className="bg-green-500/10 text-green-400 border-green-500/20 px-2 py-0 text-[10px] h-5"
                >
                  Optimized
                </Badge>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
              className="h-7 text-xs text-gray-400 hover:text-white hover:bg-white/10"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 relative overflow-hidden flex flex-col">
          {output ? (
            <div className="flex-1 overflow-auto custom-scrollbar">
              <Textarea>{output}</Textarea>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 gap-4">
              <Sparkles className="w-12 h-12 opacity-20" />
              <p className="text-sm font-medium">Ready to optimize</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
