import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, Database, Key, Table2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export type ColumnInfo = {
  name: string
  type: string
  notnull: boolean
  default_value: string | null
  pk: number
}

export type TableInfo = {
  name: string
  columns: Array<ColumnInfo>
}

type SchemaViewerProps = {
  tables: Array<TableInfo>
  isLoading?: boolean
}

export function SchemaViewer({ tables, isLoading }: SchemaViewerProps) {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set())

  // Auto-expand first 3 tables by default
  useEffect(() => {
    if (tables.length > 0 && expandedTables.size === 0) {
      setExpandedTables(new Set(tables.slice(0, 3).map((t) => t.name)))
    }
  }, [tables, expandedTables])

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) => {
      const next = new Set(prev)
      if (next.has(tableName)) {
        next.delete(tableName)
      } else {
        next.add(tableName)
      }
      return next
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Database className="w-8 h-8 mx-auto mb-2 animate-pulse" />
          <p className="text-sm">Loading schema...</p>
        </div>
      </div>
    )
  }

  if (tables.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No tables found</p>
          <p className="text-xs mt-1">Load data to see schema</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Database Schema</h3>
          <Badge variant="secondary" className="ml-auto">
            {tables.length} {tables.length === 1 ? 'table' : 'tables'}
          </Badge>
        </div>

        {tables.map((table) => (
          <Collapsible
            key={table.name}
            open={expandedTables.has(table.name)}
            onOpenChange={() => toggleTable(table.name)}
          >
            <CollapsibleTrigger className="flex items-center gap-2 w-full p-2 hover:bg-accent rounded-md transition-colors">
              {expandedTables.has(table.name) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <Table2 className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{table.name}</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {table.columns.length} cols
              </Badge>
            </CollapsibleTrigger>

            <CollapsibleContent className="ml-6 mt-1">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2 font-medium">Column</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Constraints</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns.map((column, idx) => (
                      <tr
                        key={column.name}
                        className={
                          idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                        }
                      >
                        <td className="p-2">
                          <div className="flex items-center gap-1">
                            {column.pk > 0 && (
                              <Key className="w-3 h-3 text-yellow-500" />
                            )}
                            <span className="font-mono text-xs">
                              {column.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {column.type}
                          </code>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-1 flex-wrap">
                            {column.pk > 0 && (
                              <Badge variant="default" className="text-xs">
                                PRIMARY KEY
                              </Badge>
                            )}
                            {column.notnull && column.pk === 0 && (
                              <Badge variant="secondary" className="text-xs">
                                NOT NULL
                              </Badge>
                            )}
                            {column.default_value && (
                              <Badge variant="outline" className="text-xs">
                                DEFAULT
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  )
}
