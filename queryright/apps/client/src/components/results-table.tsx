import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

type ResultsTableProps = {
  results: Array<unknown> | null
  error: string | null
  isExecuting: boolean
}

export function ResultsTable({
  results,
  error,
  isExecuting,
}: ResultsTableProps) {
  if (isExecuting) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Executing query...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-destructive mb-1">Query Error</h4>
            <p className="text-sm text-destructive/90 font-mono">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Execute a query to see results</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="p-4">
        <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-green-500 mb-1">Success</h4>
            <p className="text-sm text-muted-foreground">
              Query executed successfully. No results returned.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Get columns from first row
  const firstRow = results[0]
  const columns =
    firstRow && typeof firstRow === 'object' && !Array.isArray(firstRow)
      ? Object.keys(firstRow)
      : []

  if (columns.length === 0) {
    return (
      <div className="p-4">
        <div className="text-sm text-muted-foreground">
          Results returned but no columns detected.
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Query Results</h3>
          <Badge variant="secondary">
            {results.length} {results.length === 1 ? 'row' : 'rows'}
          </Badge>
        </div>
        <Badge variant="outline">
          {columns.length} {columns.length === 1 ? 'column' : 'columns'}
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-muted sticky top-0 z-10">
              <tr>
                <th className="text-left p-3 font-semibold border-b border-r bg-muted/80 w-12">
                  #
                </th>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="text-left p-3 font-semibold border-b border-r bg-muted/80 whitespace-nowrap"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`hover:bg-accent/50 transition-colors ${
                    rowIdx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                  }`}
                >
                  <td className="p-3 border-b border-r text-muted-foreground font-mono text-xs">
                    {rowIdx + 1}
                  </td>
                  {columns.map((column) => {
                    const value = (row as Record<string, unknown>)[column]
                    const displayValue =
                      value === null
                        ? 'NULL'
                        : value === undefined
                          ? 'undefined'
                          : typeof value === 'object'
                            ? JSON.stringify(value)
                            : String(value)

                    const isNull = value === null || value === undefined

                    return (
                      <td
                        key={column}
                        className={`p-3 border-b border-r font-mono text-xs ${
                          isNull ? 'text-muted-foreground italic' : ''
                        }`}
                        title={displayValue}
                      >
                        {displayValue}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  )
}
