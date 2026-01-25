import { Check, Copy, Download, Wand2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { highlightSQL } from '@/lib/sql-query-engine'

interface SQLOutputPanelProps {
  sql: string
}

export default function SQLOutputPanel({ sql }: SQLOutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql)
    setCopied(true)
    toast.success('SQL copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([sql], { type: 'text/sql' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'query.sql'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('SQL file downloaded')
  }

  const isPlaceholder = sql.startsWith('--')

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">
            Generated SQL
          </span>
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
                <Check className="w-3.5 h-3.5 text-qb-filter" />
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
              <span className="text-xs">Download</span>
            </Button>
          </div>
        )}
      </div>

      {/* SQL Output */}
      <div className="flex-1 overflow-auto p-4">
        {isPlaceholder ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <Wand2 className="w-7 h-7 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium text-foreground mb-2">
              No query yet
            </div>
            <div className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
              Click on columns in the schema diagram to start building your
              query. Right-click for advanced options.
            </div>
          </div>
        ) : (
          <pre
            className="bg-secondary/50 border border-border rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightSQL(sql) }}
          />
        )}
      </div>

      {/* Query Stats */}
      {!isPlaceholder && (
        <div className="px-4 py-2 border-t border-border bg-secondary/20">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>{sql.split('\n').length} lines</span>
            <span>{sql.length} characters</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-qb-filter animate-pulse" />
              Optimized
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
