import React, { useState } from 'react'
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  ChevronRight,
  Filter,
  Sigma,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import type {
  AggregateFunction,
  ColumnRef,
  FilterOperator,
} from '@/lib/mongo-query-engine'
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
  | 'accumulator'
  | 'sort'
  | 'match'
  | 'postMatch'
  | 'expression'

export default function FieldContextMenu({
  x,
  y,
  table,
  column,
  columnType,
  currentState,
  onUpdate,
  onRemove,
  onClose,
}: ContextMenuProps) {
  const [submenu, setSubmenu] = useState<Submenu>('none')
  const [filterOperator, setFilterOperator] = useState<FilterOperator>(
    currentState?.filter?.operator || currentState?.match?.operator || '$eq',
  )
  const [filterValue, setFilterValue] = useState<string>(
    currentState?.filter?.value || currentState?.match?.value || '',
  )
  const [aliasValue, setAliasValue] = useState<string>(
    currentState?.alias || '',
  )
  const [havingOperator, setHavingOperator] = useState<FilterOperator>(
    currentState?.having?.operator ||
      currentState?.postMatch?.operator ||
      '$gt',
  )
  const [havingValue, setHavingValue] = useState<string>(
    currentState?.having?.value || currentState?.postMatch?.value || '',
  )

  const selectedOp = FILTER_OPERATORS.find((op) => op.value === filterOperator)
  const selectedHavingOp = FILTER_OPERATORS.find(
    (op) => op.value === havingOperator,
  )

  const handleApplyFilter = () => {
    const filter: any = {
      id: generateId(),
      operator: filterOperator,
      value: filterValue,
    }
    onUpdate({ filter, match: filter })
    onClose()
  }

  const handleApplyHaving = () => {
    const having: any = {
      id: generateId(),
      operator: havingOperator,
      value: havingValue,
    }
    onUpdate({ having, postMatch: having })
    onClose()
  }

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(y, window.innerHeight - 500),
    left: Math.min(x, window.innerWidth - 340),
    zIndex: 100,
  }

  const currentAccumulator =
    currentState?.accumulator || currentState?.aggregate

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose} />

      <div
        className="w-80 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden animate-scale-in"
        style={menuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-border bg-mongo/5">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Field
          </div>
          <div className="text-sm font-mono font-medium text-foreground truncate mt-0.5">
            <span className="text-muted-foreground">{table}.</span>
            <span className="text-mongo">{column}</span>
            <span className="text-xs text-muted-foreground ml-2">
              ({columnType})
            </span>
          </div>
        </div>

        <ScrollArea className="max-h-112.5">
          {submenu === 'none' && (
            <div className="p-1.5">
              {/* Accumulator */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('accumulator')}
              >
                <span className="flex items-center gap-2.5">
                  <Sigma className="w-4 h-4 text-amber-500" />
                  <span>Accumulator</span>
                  {currentAccumulator && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-mono">
                      {currentAccumulator}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Sort */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('sort')}
              >
                <span className="flex items-center gap-2.5">
                  <ArrowDownUp className="w-4 h-4 text-sky-500" />
                  <span>$sort</span>
                  {currentState?.sort && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-500 font-mono">
                      {currentState.sort === 1 ? 'asc (1)' : 'desc (-1)'}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Match (Filter) */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('match')}
              >
                <span className="flex items-center gap-2.5">
                  <Filter className="w-4 h-4 text-violet-500" />
                  <span>$match</span>
                  {(currentState?.filter || currentState?.match) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-500 font-mono">
                      {currentState?.filter?.operator ||
                        currentState?.match?.operator}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Post-Match (Having) - Only show if accumulator is set */}
              {currentAccumulator && (
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setSubmenu('postMatch')}
                >
                  <span className="flex items-center gap-2.5">
                    <Filter className="w-4 h-4 text-rose-500" />
                    <span>Post-$group $match</span>
                    {(currentState?.having || currentState?.postMatch) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-500 font-mono">
                        {currentState?.having?.operator ||
                          currentState?.postMatch?.operator}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              )}

              <div className="h-px bg-border my-1.5 mx-2" />

              {/* Alias */}
              <div className="px-3 py-2.5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Output Field Name</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={aliasValue}
                    onChange={(e) => setAliasValue(e.target.value)}
                    placeholder="Rename field..."
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

              {/* Remove */}
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

          {/* Accumulator Submenu */}
          {submenu === 'accumulator' && (
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
                  !currentAccumulator
                    ? 'bg-mongo/10 text-mongo'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({
                    accumulator: undefined,
                    aggregate: undefined,
                    having: undefined,
                    postMatch: undefined,
                  })
                  onClose()
                }}
              >
                <X className="w-4 h-4" />
                No Accumulator (projection only)
              </button>

              {AGGREGATE_FUNCTIONS.map((fn) => (
                <button
                  key={fn.value}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors',
                    currentAccumulator === fn.value
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'hover:bg-secondary',
                  )}
                  onClick={() => {
                    onUpdate({
                      accumulator: fn.value,
                      aggregate: fn.value,
                    })
                    onClose()
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Sigma className="w-4 h-4" />
                    <span className="font-mono">{fn.label}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {fn.description}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Sort Submenu */}
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
                    ? 'bg-mongo/10 text-mongo'
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
                  'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors',
                  currentState?.sort === 1
                    ? 'bg-sky-500/20 text-sky-500'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: 1, sortOrder: Date.now() })
                  onClose()
                }}
              >
                <span className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4" />
                  Ascending
                </span>
                <span className="font-mono text-xs">1</span>
              </button>

              <button
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors',
                  currentState?.sort === -1
                    ? 'bg-sky-500/20 text-sky-500'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: -1, sortOrder: Date.now() })
                  onClose()
                }}
              >
                <span className="flex items-center gap-2">
                  <ArrowDown className="w-4 h-4" />
                  Descending
                </span>
                <span className="font-mono text-xs">-1</span>
              </button>
            </div>
          )}

          {/* Match (Filter) Submenu */}
          {submenu === 'match' && (
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
                  onChange={(e) =>
                    setFilterOperator(e.target.value as FilterOperator)
                  }
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-mongo font-mono"
                >
                  {FILTER_OPERATORS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.mongoLabel} — {op.label}
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
                    placeholder={
                      filterOperator === '$in' || filterOperator === '$nin'
                        ? 'value1, value2, value3'
                        : 'Enter value...'
                    }
                    className="h-9 text-sm bg-background font-mono"
                  />
                  {(filterOperator === '$in' ||
                    filterOperator === '$nin' ||
                    filterOperator === '$all') && (
                    <p className="text-[10px] text-muted-foreground">
                      Comma-separated values
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                {(currentState?.filter || currentState?.match) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      onUpdate({ filter: undefined, match: undefined })
                      onClose()
                    }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 bg-violet-500 hover:bg-violet-600 text-white"
                  onClick={handleApplyFilter}
                  disabled={selectedOp?.needsValue && !filterValue}
                >
                  Apply $match
                </Button>
              </div>
            </div>
          )}

          {/* Post-Match (Having) Submenu */}
          {submenu === 'postMatch' && (
            <div className="p-3 space-y-3">
              <button
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                <p className="text-xs text-rose-400">
                  This filter applies after $group stage on the accumulated
                  result
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Operator
                </label>
                <select
                  value={havingOperator}
                  onChange={(e) =>
                    setHavingOperator(e.target.value as FilterOperator)
                  }
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                >
                  {FILTER_OPERATORS.filter((op) => op.needsValue).map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.mongoLabel} — {op.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedHavingOp?.needsValue && (
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground uppercase">
                    Value
                  </label>
                  <Input
                    value={havingValue}
                    onChange={(e) => setHavingValue(e.target.value)}
                    placeholder="Enter value..."
                    className="h-9 text-sm bg-background font-mono"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-1">
                {(currentState?.having || currentState?.postMatch) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      onUpdate({ having: undefined, postMatch: undefined })
                      onClose()
                    }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={handleApplyHaving}
                  disabled={!havingValue}
                >
                  Apply Post-$match
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  )
}
