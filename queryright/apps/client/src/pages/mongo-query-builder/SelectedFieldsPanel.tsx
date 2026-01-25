import {
  ArrowDownUp,
  Filter,
  GripVertical,
  Sigma,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import type { AggregateFunction, ColumnRef } from '@/lib/mongo-query-engine'
import { cn } from '@/lib/utils'
import { AGGREGATE_FUNCTIONS } from '@/lib/mongo-query-engine'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SelectedFieldsPanelProps {
  columns: Array<ColumnRef>
  onChange: (columns: Array<ColumnRef>) => void
  onColumnClick: (table: string, column: string, x: number, y: number) => void
}

export default function SelectedFieldsPanel({
  columns,
  onChange,
  onColumnClick,
}: SelectedFieldsPanelProps) {
  const updateColumn = (index: number, updates: Partial<ColumnRef>) => {
    const newCols = [...columns]
    newCols[index] = { ...newCols[index], ...updates }
    onChange(newCols)
  }

  const removeColumn = (index: number) => {
    onChange(columns.filter((_, i) => i !== index))
  }

  const moveColumn = (from: number, to: number) => {
    if (to < 0 || to >= columns.length) return
    const newCols = [...columns]
    const [moved] = newCols.splice(from, 1)
    newCols.splice(to, 0, moved)
    onChange(newCols)
  }

  if (columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-mongo/10 flex items-center justify-center mb-4 border border-mongo/20">
          <Sigma className="w-6 h-6 text-mongo/60" />
        </div>
        <div className="text-sm font-medium text-foreground mb-1">
          No Fields Selected
        </div>
        <div className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
          Click on fields in your collections to add them to the $project stage.
          Right-click for more options.
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-2 p-3">
        {columns.map((col, idx) => {
          const collection = col.collection || col.table || ''
          const field = col.field || col.column || ''
          const accumulator = col.accumulator || col.aggregate

          return (
            <div
              key={`${collection}-${field}-${idx}`}
              className="group bg-card border border-border rounded-xl p-3 animate-slide-in hover:border-mongo/30 transition-colors"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Header Row */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveColumn(idx, idx - 1)}
                    disabled={idx === 0}
                    className="p-0.5 rounded hover:bg-secondary disabled:opacity-20"
                  >
                    <GripVertical className="w-3 h-3 rotate-90" />
                  </button>
                  <button
                    onClick={() => moveColumn(idx, idx + 1)}
                    disabled={idx === columns.length - 1}
                    className="p-0.5 rounded hover:bg-secondary disabled:opacity-20"
                  >
                    <GripVertical className="w-3 h-3 rotate-90" />
                  </button>
                </div>

                <div
                  className="flex-1 min-w-0 cursor-pointer hover:text-mongo transition-colors"
                  onClick={(e) =>
                    onColumnClick(collection, field, e.clientX, e.clientY)
                  }
                >
                  <div className="font-mono text-[10px] text-muted-foreground truncate uppercase">
                    {collection}
                  </div>
                  <div className="font-mono text-sm font-semibold text-foreground truncate flex items-center gap-2">
                    {field}
                    {col.alias && (
                      <span className="text-xs text-mongo font-normal flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {col.alias}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => removeColumn(idx)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Controls Row */}
              <div className="flex items-center gap-2">
                {/* Accumulator Select */}
                <Select
                  value={accumulator || 'NONE'}
                  onValueChange={(v) => {
                    const newAccum =
                      v === 'NONE' ? undefined : (v as AggregateFunction)
                    updateColumn(idx, {
                      accumulator: newAccum,
                      aggregate: newAccum,
                      having: v === 'NONE' ? undefined : col.having,
                      postMatch: v === 'NONE' ? undefined : col.postMatch,
                    })
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      'h-8 flex-1 text-xs font-mono',
                      accumulator ? 'border-amber-500/50 text-amber-500' : '',
                    )}
                  >
                    <Sigma className="w-3 h-3 mr-1.5" />
                    <SelectValue placeholder="No Accumulator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">No Accumulator</SelectItem>
                    {AGGREGATE_FUNCTIONS.map((fn) => (
                      <SelectItem
                        key={fn.value}
                        value={fn.value}
                        className="font-mono"
                      >
                        {fn.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'h-8 px-2.5 font-mono',
                    col.sort
                      ? 'border-sky-500/50 text-sky-500 bg-sky-500/10'
                      : '',
                  )}
                  onClick={() => {
                    const nextSort = !col.sort
                      ? 1
                      : col.sort === 1
                        ? -1
                        : undefined
                    updateColumn(idx, {
                      sort: nextSort,
                      sortOrder: nextSort ? Date.now() : undefined,
                    })
                  }}
                >
                  <ArrowDownUp className="w-3 h-3 mr-1" />
                  <span className="text-xs font-semibold">
                    {col.sort === 1 ? '1 ↑' : col.sort === -1 ? '-1 ↓' : '—'}
                  </span>
                </Button>
              </div>

              {/* Alias Input */}
              <div className="mt-2">
                <Input
                  value={col.alias || ''}
                  onChange={(e) =>
                    updateColumn(idx, { alias: e.target.value || undefined })
                  }
                  placeholder="Output field name..."
                  className="h-7 text-xs font-mono bg-secondary/50 border-0"
                />
              </div>

              {/* Active Modifiers Display */}
              {(col.filter || col.match || col.having || col.postMatch) && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
                  {(col.filter || col.match) && (
                    <div className="inline-flex items-center gap-1 text-[10px] bg-violet-500/15 text-violet-500 px-2 py-1 rounded-full">
                      <Filter className="w-2.5 h-2.5" />
                      <span className="font-mono">
                        {col.filter?.operator || col.match?.operator}{' '}
                        {(col.filter?.value || col.match?.value)?.substring(
                          0,
                          15,
                        )}
                        {((col.filter?.value || col.match?.value)?.length ||
                          0) > 15
                          ? '...'
                          : ''}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                        onClick={() =>
                          updateColumn(idx, {
                            filter: undefined,
                            match: undefined,
                          })
                        }
                      >
                        <X className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  )}
                  {(col.having || col.postMatch) && (
                    <div className="inline-flex items-center gap-1 text-[10px] bg-rose-500/15 text-rose-500 px-2 py-1 rounded-full">
                      <Filter className="w-2.5 h-2.5" />
                      <span className="font-mono">
                        post: {col.having?.operator || col.postMatch?.operator}{' '}
                        {(col.having?.value || col.postMatch?.value)?.substring(
                          0,
                          10,
                        )}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                        onClick={() =>
                          updateColumn(idx, {
                            having: undefined,
                            postMatch: undefined,
                          })
                        }
                      >
                        <X className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
