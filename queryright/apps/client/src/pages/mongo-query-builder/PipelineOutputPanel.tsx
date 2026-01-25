import { Check, Copy, Download, FileJson, Leaf } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { highlightMQL } from '@/lib/mongo-query-engine'
import { ScrollArea } from '@/components/ui/scroll-area'

interface PipelineOutputPanelProps {
  pipeline: string
}

export default function PipelineOutputPanel({
  pipeline,
}: PipelineOutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pipeline)
    setCopied(true)
    toast.success('Pipeline copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([pipeline], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'aggregation-pipeline.js'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Pipeline downloaded')
  }

  const handleDownloadJSON = () => {
    // Extract just the pipeline array from the db.collection.aggregate() call
    const match = pipeline.match(/\.aggregate\(([\s\S]*)\)$/)
    if (match) {
      const blob = new Blob([match[1]], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pipeline.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Pipeline JSON downloaded')
    }
  }

  const isPlaceholder = pipeline.startsWith('//')
  const stageCount = (pipeline.match(/\{\s*"\$/g) || []).length
  const lineCount = pipeline.split('\n').length

  return (
    <ScrollArea className="h-screen">
      <div className="h-full flex flex-col bg-card">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-mongo/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-mongo/20">
              <Leaf className="w-4 h-4 text-mongo" />
            </div>
            <div>
              <span className="text-xs font-semibold text-foreground">
                Aggregation Pipeline
              </span>
              {!isPlaceholder && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{stageCount} stages</span>
                  <span>•</span>
                  <span>{lineCount} lines</span>
                </div>
              )}
            </div>
          </div>
          {!isPlaceholder && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-mongo" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5"
                onClick={handleDownload}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="text-xs hidden sm:inline">JS</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1.5"
                onClick={handleDownloadJSON}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span className="text-xs hidden sm:inline">JSON</span>
              </Button>
            </div>
          )}
        </div>

        {/* Output */}

        <div className="flex-1 overflow-auto p-4">
          {isPlaceholder ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-mongo/10 flex items-center justify-center mb-4 border border-mongo/20">
                <Leaf className="w-8 h-8 text-mongo/60" />
              </div>
              <div className="text-sm font-medium text-foreground mb-2">
                No Pipeline Yet
              </div>
              <div className="text-xs text-muted-foreground max-w-60 leading-relaxed">
                Click on fields in your collections to start building your
                MongoDB aggregation pipeline.
              </div>
            </div>
          ) : (
            <div
              className="bg-background/50 border border-border rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre-wrap "
              dangerouslySetInnerHTML={{ __html: highlightMQL(pipeline) }}
            />
          )}
        </div>

        {/* Footer Status */}
        {!isPlaceholder && (
          <div className="px-4 py-2 border-t border-border bg-secondary/20">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>{pipeline.length} chars</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mongo animate-pulse" />
                  Valid MongoDB Query
                </span>
              </div>
              <span className="font-mono text-mongo/70">
                MongoDB Shell / Compass
              </span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
