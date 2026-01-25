import { useMemo } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

type JsonOutputProps = {
  data: Array<unknown> | null
  error: string | null
  isExecuting?: boolean
  title?: string
}

export function JsonOutput({
  data,
  error,
  isExecuting,
  title = 'Output',
}: JsonOutputProps) {
  const pretty = useMemo(() => {
    if (!data) return ''
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }, [data])

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex-1 min-h-0">
        {isExecuting ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Running...</span>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-destructive bg-destructive/10 border border-destructive/50 m-4 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Query Error</div>
              <div className="whitespace-pre-wrap">{error}</div>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <pre className="p-3 text-xs leading-relaxed">{pretty || '[]'}</pre>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
