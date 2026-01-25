import React, { useState } from 'react'
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Calculator,
  ChevronRight,
  Filter,
  Layers,
  Sigma,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import type {
  ColumnRef,
  FilterCondition,
  SortDirection,
  WindowConfig,
} from '@/lib/sql-query-engine'
import { cn } from '@/lib/utils'
import {
  AGGREGATE_FUNCTIONS,
  FILTER_OPERATORS,
  WINDOW_FUNCTIONS,
  generateId,
} from '@/lib/sql-query-engine'
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
  | 'window'
  | 'expression'

// Type validation helper
const getExpectedTypeLabel = (columnType: string): string => {
  const type = columnType.toLowerCase()
  if (
    [
      'int',
      'integer',
      'bigint',
      'smallint',
      'tinyint',
      'decimal',
      'numeric',
      'float',
      'double',
      'real',
      'number',
    ].some((t) => type.includes(t))
  ) {
    return 'number'
  }
  if (['date', 'datetime', 'timestamp', 'time'].some((t) => type.includes(t))) {
    return 'date'
  }
  if (['bool', 'boolean'].some((t) => type.includes(t))) {
    return 'boolean'
  }
  return 'text'
}

const validateValueForType = (
  value: string,
  columnType: string,
  operator: string,
): { valid: boolean; error?: string } => {
  // Skip validation for operators that don't need values
  if (['IS NULL', 'IS NOT NULL', 'EXISTS', 'NOT EXISTS'].includes(operator)) {
    return { valid: true }
  }

  // Skip validation for LIKE operators (pattern matching)
  if (['LIKE', 'NOT LIKE'].includes(operator)) {
    return { valid: true }
  }

  const expectedType = getExpectedTypeLabel(columnType)
  const trimmedValue = value.trim()

  // Empty value check
  if (!trimmedValue) {
    return { valid: false, error: 'Value is required' }
  }

  // Handle IN/NOT IN operators - validate each value
  if (['IN', 'NOT IN'].includes(operator)) {
    const values = trimmedValue.split(',').map((v) => v.trim())
    for (const v of values) {
      const result = validateSingleValue(v, expectedType, columnType)
      if (!result.valid) {
        return { valid: false, error: `Invalid value "${v}": ${result.error}` }
      }
    }
    return { valid: true }
  }

  return validateSingleValue(trimmedValue, expectedType, columnType)
}

const validateSingleValue = (
  value: string,
  expectedType: string,
  columnType: string,
): { valid: boolean; error?: string } => {
  switch (expectedType) {
    case 'number': {
      // Allow numeric values only
      if (!/^-?\d*\.?\d+$/.test(value)) {
        return {
          valid: false,
          error: `Expected a number for ${columnType} column`,
        }
      }
      return { valid: true }
    }
    case 'date': {
      // Allow various date formats
      const datePatterns = [
        /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
        /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
        /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
        /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/, // Datetime
      ]
      const isValidDate =
        datePatterns.some((p) => p.test(value)) || !isNaN(Date.parse(value))
      if (!isValidDate) {
        return {
          valid: false,
          error: `Expected a date (e.g., YYYY-MM-DD) for ${columnType} column`,
        }
      }
      return { valid: true }
    }
    case 'boolean': {
      const validBooleans = ['true', 'false', '1', '0', 'yes', 'no']
      if (!validBooleans.includes(value.toLowerCase())) {
        return {
          valid: false,
          error: `Expected true/false for ${columnType} column`,
        }
      }
      return { valid: true }
    }
    case 'text':
    default:
      // Text accepts anything
      return { valid: true }
  }
}

export default function ColumnContextMenu({
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
  const [filterOperator, setFilterOperator] = useState<string>(
    currentState?.filter?.operator || '=',
  )
  const [filterValue, setFilterValue] = useState<string>(
    currentState?.filter?.value || '',
  )
  const [filterValue2, setFilterValue2] = useState<string>(
    currentState?.filter?.value2 || '',
  )
  const [havingOperator, setHavingOperator] = useState<string>(
    currentState?.having?.operator || '=',
  )
  const [havingValue, setHavingValue] = useState<string>(
    currentState?.having?.value || '',
  )
  const [aliasValue, setAliasValue] = useState<string>(
    currentState?.alias || '',
  )

  // Window function state
  const [windowFunction, setWindowFunction] = useState<string>(
    currentState?.window?.function || 'ROW_NUMBER',
  )
  const [partitionBy, setPartitionBy] = useState<string>(
    currentState?.window?.partitionBy?.join(', ') || '',
  )
  const [orderByCol, setOrderByCol] = useState<string>(
    currentState?.window?.orderBy?.[0]?.column || '',
  )
  const [orderByDir, setOrderByDir] = useState<SortDirection>(
    currentState?.window?.orderBy?.[0]?.direction || 'ASC',
  )

  const selectedOp = FILTER_OPERATORS.find((op) => op.value === filterOperator)
  const selectedHavingOp = FILTER_OPERATORS.find(
    (op) => op.value === havingOperator,
  )

  const handleApplyFilter = () => {
    const op = FILTER_OPERATORS.find((o) => o.value === filterOperator)
    if (!op) return

    const filter: FilterCondition = {
      id: generateId(),
      operator: filterOperator as any,
      value: filterValue,
      value2: op.needsSecondValue ? filterValue2 : undefined,
    }
    onUpdate({ filter })
    onClose()
  }

  const handleApplyHaving = () => {
    const op = FILTER_OPERATORS.find((o) => o.value === havingOperator)
    if (!op) return

    const having: FilterCondition = {
      id: generateId(),
      operator: havingOperator as any,
      value: havingValue,
    }
    onUpdate({ having })
    onClose()
  }

  const handleApplyWindow = () => {
    const window: WindowConfig = {
      function: windowFunction as any,
      partitionBy: partitionBy
        ? partitionBy.split(',').map((s) => s.trim())
        : undefined,
      orderBy: orderByCol
        ? [{ column: orderByCol, direction: orderByDir }]
        : undefined,
    }
    onUpdate({ window, aggregate: undefined }) // Remove aggregate if window is set
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
      {/* Backdrop */}
      <div className="fixed inset-0 z-50" onClick={onClose} />

      {/* Main Menu */}
      <div
        className="w-72 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden animate-scale-in"
        style={menuStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-secondary/30">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Column
          </div>
          <div className="text-sm font-mono font-medium text-foreground truncate mt-0.5">
            <span className="text-muted-foreground">{table}.</span>
            <span className="text-primary">{column}</span>
          </div>
        </div>

        <ScrollArea className="max-h-[400px]">
          {submenu === 'none' && (
            <div className="p-1.5">
              {/* Aggregate */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('aggregate')}
              >
                <span className="flex items-center gap-2.5">
                  <Calculator className="w-4 h-4 text-qb-aggregate" />
                  <span>Aggregate</span>
                  {currentState?.aggregate && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-aggregate/20 text-qb-aggregate font-mono">
                      {currentState.aggregate}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Window Function */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('window')}
              >
                <span className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-qb-window" />
                  <span>Window Function</span>
                  {currentState?.window && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-window/20 text-qb-window font-mono">
                      {currentState.window.function}
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
                  <ArrowDownUp className="w-4 h-4 text-qb-sort" />
                  <span>Sort</span>
                  {currentState?.sort && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-sort/20 text-qb-sort font-mono">
                      {currentState.sort}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Filter (WHERE) */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setSubmenu('filter')}
              >
                <span className="flex items-center gap-2.5">
                  <Filter className="w-4 h-4 text-qb-filter" />
                  <span>Filter (WHERE)</span>
                  {currentState?.filter && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-filter/20 text-qb-filter font-mono">
                      {currentState.filter.operator}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* HAVING (only if aggregated) */}
              {currentState?.aggregate && (
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setSubmenu('having')}
                >
                  <span className="flex items-center gap-2.5">
                    <Sigma className="w-4 h-4 text-qb-output" />
                    <span>Filter (HAVING)</span>
                    {currentState.having && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-output/20 text-qb-output font-mono">
                        {currentState.having.operator}
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
                  <span className="text-sm">Column Alias</span>
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

              {/* Clear / Remove */}
              {currentState && (
                <button
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  onClick={() => {
                    onRemove()
                    onClose()
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Remove from Query
                </button>
              )}
            </div>
          )}

          {/* Aggregate Submenu */}
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

              {/* No Aggregate */}
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
                No Aggregate
              </button>

              {AGGREGATE_FUNCTIONS.map((fn) => (
                <button
                  key={fn.value}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors',
                    currentState?.aggregate === fn.value
                      ? 'bg-qb-aggregate/20 text-qb-aggregate'
                      : 'hover:bg-secondary',
                  )}
                  onClick={() => {
                    onUpdate({ aggregate: fn.value, window: undefined })
                    onClose()
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    {fn.label}
                  </span>
                  {fn.description && (
                    <span className="text-[10px] text-muted-foreground">
                      {fn.description}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Window Function Submenu */}
          {submenu === 'window' && (
            <div className="p-3 space-y-3">
              <button
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              {/* Clear Window */}
              {currentState?.window && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    onUpdate({ window: undefined })
                    onClose()
                  }}
                >
                  <X className="w-3.5 h-3.5 mr-2" />
                  Remove Window Function
                </Button>
              )}

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Function
                </label>
                <select
                  value={windowFunction}
                  onChange={(e) => setWindowFunction(e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {WINDOW_FUNCTIONS.map((fn) => (
                    <option key={fn.value} value={fn.value}>
                      {fn.label} - {fn.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Partition By
                </label>
                <Input
                  value={partitionBy}
                  onChange={(e) => setPartitionBy(e.target.value)}
                  placeholder="table.column, ..."
                  className="h-9 text-sm bg-background font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Order By
                </label>
                <div className="flex gap-2">
                  <Input
                    value={orderByCol}
                    onChange={(e) => setOrderByCol(e.target.value)}
                    placeholder="table.column"
                    className="h-9 text-sm bg-background font-mono flex-1"
                  />
                  <select
                    value={orderByDir}
                    onChange={(e) =>
                      setOrderByDir(e.target.value as SortDirection)
                    }
                    className="h-9 px-3 text-sm bg-background border border-border rounded-lg"
                  >
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                  </select>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full bg-qb-window hover:bg-qb-window/90"
                onClick={handleApplyWindow}
              >
                Apply Window Function
              </Button>
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
                    ? 'bg-qb-sort/20 text-qb-sort'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: 'ASC', sortOrder: Date.now() })
                  onClose()
                }}
              >
                <ArrowUp className="w-4 h-4" />
                Ascending (A → Z, 1 → 9)
              </button>

              <button
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors',
                  currentState?.sort === 'DESC'
                    ? 'bg-qb-sort/20 text-qb-sort'
                    : 'hover:bg-secondary',
                )}
                onClick={() => {
                  onUpdate({ sort: 'DESC', sortOrder: Date.now() })
                  onClose()
                }}
              >
                <ArrowDown className="w-4 h-4" />
                Descending (Z → A, 9 → 1)
              </button>
            </div>
          )}

          {/* Filter Submenu */}
          {submenu === 'filter' && (
            <div className="p-3 space-y-3">
              <button
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              {/* Column type indicator */}
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-secondary/50 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase">
                  Expected type:
                </span>
                <span className="text-xs font-mono text-primary">
                  {getExpectedTypeLabel(columnType)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({columnType})
                </span>
              </div>

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
                {selectedOp?.description && (
                  <p className="text-[10px] text-muted-foreground">
                    {selectedOp.description}
                  </p>
                )}
              </div>

              {selectedOp?.needsValue &&
                (() => {
                  const validation = validateValueForType(
                    filterValue,
                    columnType,
                    filterOperator,
                  )
                  return (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase">
                        Value
                      </label>
                      <Input
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder={
                          selectedOp.value === 'IN' ||
                          selectedOp.value === 'NOT IN'
                            ? 'val1, val2, val3...'
                            : selectedOp.value === 'LIKE'
                              ? '%pattern%'
                              : getExpectedTypeLabel(columnType) === 'number'
                                ? 'Enter a number...'
                                : getExpectedTypeLabel(columnType) === 'date'
                                  ? 'YYYY-MM-DD'
                                  : getExpectedTypeLabel(columnType) ===
                                      'boolean'
                                    ? 'true / false'
                                    : 'Enter value...'
                        }
                        className={cn(
                          'h-9 text-sm bg-background font-mono',
                          filterValue &&
                            !validation.valid &&
                            'border-destructive focus:ring-destructive',
                        )}
                      />
                      {filterValue && !validation.valid && (
                        <p className="text-[10px] text-destructive font-medium">
                          {validation.error}
                        </p>
                      )}
                    </div>
                  )
                })()}

              {selectedOp?.needsSecondValue &&
                (() => {
                  const validation2 = validateValueForType(
                    filterValue2,
                    columnType,
                    filterOperator,
                  )
                  return (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase">
                        Second Value
                      </label>
                      <Input
                        value={filterValue2}
                        onChange={(e) => setFilterValue2(e.target.value)}
                        placeholder={
                          getExpectedTypeLabel(columnType) === 'number'
                            ? 'Enter a number...'
                            : getExpectedTypeLabel(columnType) === 'date'
                              ? 'YYYY-MM-DD'
                              : 'Enter second value...'
                        }
                        className={cn(
                          'h-9 text-sm bg-background font-mono',
                          filterValue2 &&
                            !validation2.valid &&
                            'border-destructive focus:ring-destructive',
                        )}
                      />
                      {filterValue2 && !validation2.valid && (
                        <p className="text-[10px] text-destructive font-medium">
                          {validation2.error}
                        </p>
                      )}
                    </div>
                  )
                })()}

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
                  className="flex-1 bg-qb-filter hover:bg-qb-filter/90 text-white"
                  onClick={handleApplyFilter}
                  disabled={
                    (selectedOp?.needsValue && !filterValue) ||
                    (selectedOp?.needsValue &&
                      !validateValueForType(
                        filterValue,
                        columnType,
                        filterOperator,
                      ).valid) ||
                    (selectedOp?.needsSecondValue &&
                      !validateValueForType(
                        filterValue2,
                        columnType,
                        filterOperator,
                      ).valid)
                  }
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          )}

          {/* Having Submenu */}
          {submenu === 'having' && (
            <div className="p-3 space-y-3">
              <button
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-secondary rounded-lg transition-colors text-muted-foreground"
                onClick={() => setSubmenu('none')}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              {/* HAVING expects numeric values from aggregates */}
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-secondary/50 border border-border">
                <span className="text-[10px] text-muted-foreground uppercase">
                  Expected type:
                </span>
                <span className="text-xs font-mono text-primary">number</span>
                <span className="text-[10px] text-muted-foreground">
                  (aggregate result)
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground uppercase">
                  Operator
                </label>
                <select
                  value={havingOperator}
                  onChange={(e) => setHavingOperator(e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {FILTER_OPERATORS.filter((op) =>
                    ['=', '!=', '>', '<', '>=', '<='].includes(op.value),
                  ).map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedHavingOp?.needsValue &&
                (() => {
                  // HAVING always expects numbers (aggregate results)
                  const isValidNumber = /^-?\d*\.?\d+$/.test(havingValue.trim())
                  const hasValue = havingValue.trim().length > 0
                  return (
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground uppercase">
                        Value
                      </label>
                      <Input
                        value={havingValue}
                        onChange={(e) => setHavingValue(e.target.value)}
                        placeholder="Enter a number..."
                        className={cn(
                          'h-9 text-sm bg-background font-mono',
                          hasValue &&
                            !isValidNumber &&
                            'border-destructive focus:ring-destructive',
                        )}
                      />
                      {hasValue && !isValidNumber && (
                        <p className="text-[10px] text-destructive font-medium">
                          Expected a number for aggregate comparison
                        </p>
                      )}
                    </div>
                  )
                })()}

              <div className="flex gap-2 pt-1">
                {currentState?.having && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      onUpdate({ having: undefined })
                      onClose()
                    }}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 bg-qb-output hover:bg-qb-output/90"
                  onClick={handleApplyHaving}
                  disabled={
                    (selectedHavingOp?.needsValue && !havingValue) ||
                    (selectedHavingOp?.needsValue &&
                      !/^-?\d*\.?\d+$/.test(havingValue.trim()))
                  }
                >
                  Apply HAVING
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  )
}
