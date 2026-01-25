import {
  ArrowDownUp,
  Calculator,
  Filter,
  Layers,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import type { ColumnRef } from '@/lib/sql-query-engine'
import { cn } from '@/lib/utils'
import { AGGREGATE_FUNCTIONS } from '@/lib/sql-query-engine'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SelectedColumnsPanelProps {
  columns: Array<ColumnRef>
  onChange: (columns: Array<ColumnRef>) => void
  onColumnClick: (table: string, column: string, x: number, y: number) => void
}

export default function SelectedColumnsPanel({
  columns,
  onChange,
  onColumnClick,
}: SelectedColumnsPanelProps) {
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
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
          <Calculator className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="text-sm font-medium text-foreground mb-1">
          No columns selected
        </div>
        <div className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
          Click on columns in the diagram to add them to your query. Right-click
          for more options.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 p-3">
      {columns.map((col, idx) => (
        <div
          key={`${col.table}-${col.column}-${idx}`}
          className="group bg-card border border-border rounded-xl p-3 animate-slide-in hover:border-primary/30 transition-colors"
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
                <ArrowDownUp className="w-3 h-3 rotate-180" />
              </button>
              <button
                onClick={() => moveColumn(idx, idx + 1)}
                disabled={idx === columns.length - 1}
                className="p-0.5 rounded hover:bg-secondary disabled:opacity-20"
              >
                <ArrowDownUp className="w-3 h-3" />
              </button>
            </div>

            <div
              className="flex-1 min-w-0 cursor-pointer hover:text-primary transition-colors"
              onClick={(e) =>
                onColumnClick(col.table, col.column, e.clientX, e.clientY)
              }
            >
              <div className="font-mono text-[10px] text-muted-foreground truncate uppercase">
                {col.table}
              </div>
              <div className="font-mono text-sm font-semibold text-foreground truncate flex items-center gap-2">
                {col.column}
                {col.alias && (
                  <span className="text-xs text-primary font-normal flex items-center gap-1">
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
            {/* Aggregate Select */}
            <Select
              value={col.aggregate || (col.window ? 'WINDOW' : 'NONE')}
              onValueChange={(v) => {
                if (v === 'WINDOW') return // Window functions handled separately
                updateColumn(idx, {
                  aggregate: v === 'NONE' ? undefined : (v as any),
                  having: v === 'NONE' ? undefined : col.having,
                  window: undefined,
                })
              }}
            >
              <SelectTrigger
                className={cn(
                  'h-8 flex-1 text-xs',
                  col.aggregate
                    ? 'border-qb-aggregate/50 text-qb-aggregate'
                    : col.window
                      ? 'border-qb-window/50 text-qb-window'
                      : '',
                )}
              >
                <Calculator className="w-3 h-3 mr-1.5" />
                <SelectValue placeholder="No Function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NONE">No Aggregate</SelectItem>
                {AGGREGATE_FUNCTIONS.map((fn) => (
                  <SelectItem key={fn.value} value={fn.value}>
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
                'h-8 px-2.5',
                col.sort ? 'border-qb-sort/50 text-qb-sort bg-qb-sort/10' : '',
              )}
              onClick={() => {
                const nextSort = !col.sort
                  ? 'ASC'
                  : col.sort === 'ASC'
                    ? 'DESC'
                    : undefined
                updateColumn(idx, {
                  sort: nextSort,
                  sortOrder: nextSort ? Date.now() : undefined,
                })
              }}
            >
              <ArrowDownUp className="w-3 h-3 mr-1" />
              <span className="text-xs font-mono font-semibold">
                {col.sort || '—'}
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
              placeholder="Column alias..."
              className="h-7 text-xs font-mono bg-secondary/50 border-0"
            />
          </div>

          {/* Active Modifiers Display */}
          {(col.filter || col.having || col.window) && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
              {col.window && (
                <div className="inline-flex items-center gap-1 text-[10px] bg-qb-window/15 text-qb-window px-2 py-1 rounded-full">
                  <Layers className="w-2.5 h-2.5" />
                  <span className="font-mono">{col.window.function}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                    onClick={() => updateColumn(idx, { window: undefined })}
                  >
                    <X className="w-2.5 h-2.5" />
                  </Button>
                </div>
              )}
              {col.filter && (
                <div className="inline-flex items-center gap-1 text-[10px] bg-qb-filter/15 text-qb-filter px-2 py-1 rounded-full">
                  <Filter className="w-2.5 h-2.5" />
                  <span className="font-mono">
                    {col.filter.operator} {col.filter.value?.substring(0, 15)}
                    {(col.filter.value?.length || 0) > 15 ? '...' : ''}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                    onClick={() => updateColumn(idx, { filter: undefined })}
                  >
                    <X className="w-2.5 h-2.5" />
                  </Button>
                </div>
              )}
              {col.having && (
                <div className="inline-flex items-center gap-1 text-[10px] bg-qb-output/15 text-qb-output px-2 py-1 rounded-full">
                  <Filter className="w-2.5 h-2.5" />
                  <span className="font-mono">
                    HAVING {col.having.operator}{' '}
                    {col.having.value?.substring(0, 10)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20"
                    onClick={() => updateColumn(idx, { having: undefined })}
                  >
                    <X className="w-2.5 h-2.5" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
