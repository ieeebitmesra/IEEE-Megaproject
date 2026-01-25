import React, { useState } from 'react'
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Calculator,
  ChevronRight,
  Filter,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import type { ColumnRef } from '@/lib/mongo-query-engine'
import { cn } from '@/lib/utils'
import {
  AGGREGATE_FUNCTIONS,
  FILTER_OPERATORS,
  generateId,
} from '@/lib/mongo-query-engine'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ContextMenuProps {
  x: number
  y: number
  table: string
  column: string
  columnType: string
  currentState?: ColumnRef
  allColumns?: Array<{ table: string; column: string }>
  onUpdate: (updates: Partial<ColumnRef>) => void
  onRemove: () => void
  onClose: () => void
}

type Submenu =
  | 'none'
  | 'aggregate'
  | 'sort'
  | 'filter'
  | 'having'
  | 'expression'

export default function ColumnContextMenu({
  x,
  y,
  table,
  column,
  currentState,
  onUpdate,
  onRemove,
  onClose,
}: ContextMenuProps) {
  const [submenu, setSubmenu] = useState<Submenu>('none')
  const [filterOperator, setFilterOperator] = useState<string>(
    currentState?.filter?.operator || '=',
  )
  const [filterValue, setFilterValue] = useState<string>(
    currentState?.filter?.value || '',
  )
  const [aliasValue, setAliasValue] = useState<string>(
    currentState?.alias || '',
  )

  const selectedOp = FILTER_OPERATORS.find((op) => op.value === filterOperator)

  const handleApplyFilter = () => {
    const filter: any = {
      id: generateId(),
      operator: filterOperator,
      value: filterValue,
    }
    onUpdate({ filter })
    onClose()
  }

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(y, window.innerHeight - 450),
    left: Math.min(x, window.innerWidth - 320),
    zIndex: 100,
  }

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />

      <div
        className="w-72 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden animate-scale-in"
        style={menuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-border bg-secondary/30">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Field
          </div>
          <div className="text-sm font-mono font-medium text-foreground truncate mt-0.5">
            <span className="text-muted-foreground">{table}.</span>
            <span className="text-primary">{column}</span>
          </div>
        </div>

        <ScrollArea className="max-h-100">
          {submenu === 'none' && (
            <div className="p-1.5">
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('aggregate')}
              >
                <span className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-orange-500" />
                  <span>Accumulator</span>
                  {currentState?.aggregate && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-500 font-mono">
                      {currentState.aggregate}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('sort')}
              >
                <span className="flex items-center gap-2.5">
                  <ArrowDownUp className="w-4 h-4 text-blue-500" />
                  <span>Sort</span>
                  {currentState?.sort && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-500 font-mono">
                      {currentState.sort}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('filter')}
              >
                <span className="flex items-center gap-2.5">
                  <Filter className="w-4 h-4 text-purple-500" />
                  <span>Filter ($match)</span>
                  {currentState?.filter && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-500 font-mono">
                      {currentState.filter.operator}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="h-px bg-border my-1.5 mx-2" />

              <div className="px-3 py-2.5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Field Alias</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={aliasValue}
                    onChange={(e) => setAliasValue(e.target.value)}
                    placeholder="Enter alias..."
                    className="h-8 text-sm bg-background font-mono"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 px-3"
                    onClick={() => {
                      onUpdate({ alias: aliasValue || undefined })
                      onClose()
                    }}
                  >
                    Set
                  </Button>
                </div>
              </div>

              <div className="h-px bg-border my-1.5 mx-2" />

              {currentState && (
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  onClick={() => {
                    onRemove()
                    onClose()
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Field
                </button>
              )}
            </div>
          )}

          {submenu === 'aggregate' && (
            <div className="p-1.5">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="h-px bg-border my-1.5 mx-2" />

              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors',
                  !currentState?.aggregate
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ aggregate: undefined, having: undefined })
                  onClose()
                }}
              >
                <X className="w-4 h-4" />
                No Accumulator
              </button>

              {AGGREGATE_FUNCTIONS.map((fn) => (
                <button
                  key={fn.value}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors',
                    currentState?.aggregate === fn.value
                      ? 'bg-orange-500/20 text-orange-500'
                      : 'hover:bg-secondary',
                  )}
                  onClick={() => {
                    onUpdate({ aggregate: fn.value as any })
                    onClose()
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    {fn.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {submenu === 'sort' && (
            <div className="p-1.5">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>
              <div className="h-px bg-border my-1.5 mx-2" />

              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors',
                  !currentState?.sort
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: undefined, sortOrder: undefined })
                  onClose()
                }}
              >
                <X className="w-4 h-4" />
                No Sorting
              </button>

              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors',
                  currentState?.sort === 'ASC'
                    ? 'bg-blue-500/20 text-blue-500'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: 'ASC', sortOrder: Date.now() })
                  onClose()
                }}
              >
                <ArrowUp className="w-4 h-4" />
                Ascending (1)
              </button>

              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors',
                  currentState?.sort === 'DESC'
                    ? 'bg-blue-500/20 text-blue-500'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: 'DESC', sortOrder: Date.now() })
                  onClose()
                }}
              >
                <ArrowDown className="w-4 h-4" />
                Descending (-1)
              </button>
            </div>
          )}

          {submenu === 'filter' && (
            <div className="p-3 space-y-3">
              <button
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Operator
                </label>
                <select
                  value={filterOperator}
                  onChange={(e) => setFilterOperator(e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {FILTER_OPERATORS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedOp?.needsValue && (
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase">
                    Value
                  </label>
                  <Input
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder="Enter value..."
                    className="h-9 text-sm bg-background font-mono"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-1">
                {currentState?.filter && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      onUpdate({ filter: undefined })
                      onClose()
                    }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={handleApplyFilter}
                  disabled={selectedOp?.needsValue && !filterValue}
                >
                  Apply $match
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  )
}
