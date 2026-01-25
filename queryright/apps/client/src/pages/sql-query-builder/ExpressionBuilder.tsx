import { useState } from 'react'
import { Brackets, ChevronRight, Code2, Plus, X } from 'lucide-react'
import type {
  CaseWhen,
  Expression,
  SortDirection,
  WindowConfig,
} from '@/lib/sql-query-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WINDOW_FUNCTIONS, generateId } from '@/lib/sql-query-engine'
import { cn } from '@/lib/utils'

interface ExpressionBuilderProps {
  currentExpression?: Expression
  allColumns: Array<{ table: string; column: string }>
  onApply: (expression: Expression) => void
  onClose: () => void
}

type ExpressionTab = 'custom' | 'case' | 'window'

export default function ExpressionBuilder({
  currentExpression,
  allColumns,
  onApply,
  onClose,
}: ExpressionBuilderProps) {
  const [activeTab, setActiveTab] = useState<ExpressionTab>(
    currentExpression?.type === 'case'
      ? 'case'
      : currentExpression?.type === 'window'
        ? 'window'
        : 'custom',
  )

  const [name, setName] = useState(currentExpression?.name || '')
  const [customExpr, setCustomExpr] = useState(
    currentExpression?.expression || '',
  )

  // CASE/WHEN state
  const [caseConditions, setCaseConditions] = useState<
    Array<{ when: string; then: string }>
  >(currentExpression?.caseWhen?.conditions || [{ when: '', then: '' }])
  const [elseValue, setElseValue] = useState(
    currentExpression?.caseWhen?.elseValue || '',
  )

  // Window function state
  const [windowFn, setWindowFn] = useState<string>(
    currentExpression?.window?.function || 'ROW_NUMBER',
  )
  const [partitionBy, setPartitionBy] = useState(
    currentExpression?.window?.partitionBy?.join(', ') || '',
  )
  const [orderByCol, setOrderByCol] = useState(
    currentExpression?.window?.orderBy?.[0]?.column || '',
  )
  const [orderByDir, setOrderByDir] = useState<SortDirection>(
    currentExpression?.window?.orderBy?.[0]?.direction || 'ASC',
  )
  const [frameStart, setFrameStart] = useState(
    currentExpression?.window?.frameStart || '',
  )
  const [frameEnd, setFrameEnd] = useState(
    currentExpression?.window?.frameEnd || '',
  )

  const addCaseCondition = () => {
    setCaseConditions([...caseConditions, { when: '', then: '' }])
  }

  const removeCaseCondition = (idx: number) => {
    setCaseConditions(caseConditions.filter((_, i) => i !== idx))
  }

  const updateCaseCondition = (
    idx: number,
    field: 'when' | 'then',
    value: string,
  ) => {
    const newConditions = [...caseConditions]
    newConditions[idx] = { ...newConditions[idx], [field]: value }
    setCaseConditions(newConditions)
  }

  const handleApply = () => {
    let expression: Expression

    switch (activeTab) {
      case 'case':
        const caseWhen: CaseWhen = {
          id: generateId(),
          conditions: caseConditions.filter((c) => c.when && c.then),
          elseValue: elseValue || undefined,
        }
        expression = {
          id: currentExpression?.id || generateId(),
          name: name || 'case_expression',
          expression: '', // Will be generated from caseWhen
          type: 'case',
          caseWhen,
        }
        break

      case 'window':
        const window: WindowConfig = {
          function: windowFn as any,
          partitionBy: partitionBy
            ? partitionBy.split(',').map((s) => s.trim())
            : undefined,
          orderBy: orderByCol
            ? [{ column: orderByCol, direction: orderByDir }]
            : undefined,
          frameStart: frameStart || undefined,
          frameEnd: frameEnd || undefined,
        }
        expression = {
          id: currentExpression?.id || generateId(),
          name: name || `${windowFn.toLowerCase()}_result`,
          expression: '',
          type: 'window',
          window,
        }
        break

      default:
        expression = {
          id: currentExpression?.id || generateId(),
          name: name || 'custom_expression',
          expression: customExpr,
          type: 'custom',
        }
    }

    onApply(expression)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div
        className="w-[600px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Expression Builder
              </h2>
              <p className="text-xs text-muted-foreground">
                Create custom SQL expressions
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-secondary/20">
          {[
            { id: 'custom', label: 'Custom SQL', icon: Code2 },
            { id: 'case', label: 'CASE/WHEN', icon: Brackets },
            { id: 'window', label: 'Window Function', icon: ChevronRight },
          ].map((tab) => (
            <button
              key={tab.id}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setActiveTab(tab.id as ExpressionTab)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[400px]">
          <div className="p-6 space-y-4">
            {/* Name field (common to all) */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase">
                Column Alias
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="result_column"
                className="h-9 font-mono bg-background"
              />
            </div>

            {/* Custom SQL Tab */}
            {activeTab === 'custom' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    SQL Expression
                  </Label>
                  <Textarea
                    value={customExpr}
                    onChange={(e) => setCustomExpr(e.target.value)}
                    placeholder="e.g., CONCAT(first_name, ' ', last_name) or salary * 1.1"
                    className="min-h-24 font-mono text-sm bg-background"
                  />
                </div>

                {/* Column reference helper */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Available Columns
                  </Label>
                  <div className="flex flex-wrap gap-1.5 p-3 bg-secondary/50 rounded-lg max-h-32 overflow-y-auto">
                    {allColumns.map((col, idx) => (
                      <button
                        key={idx}
                        className="text-[11px] px-2 py-1 bg-background border border-border rounded-md hover:border-primary hover:text-primary transition-colors font-mono"
                        onClick={() =>
                          setCustomExpr(
                            (prev) => prev + `${col.table}.${col.column}`,
                          )
                        }
                      >
                        {col.table}.{col.column}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SQL Functions helper */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Common Functions
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'CONCAT()',
                      'COALESCE()',
                      'NULLIF()',
                      'CAST()',
                      'UPPER()',
                      'LOWER()',
                      'TRIM()',
                      'SUBSTRING()',
                      'DATE()',
                      'NOW()',
                      'EXTRACT()',
                      'DATE_TRUNC()',
                      'ROUND()',
                      'ABS()',
                      'FLOOR()',
                      'CEIL()',
                    ].map((fn) => (
                      <button
                        key={fn}
                        className="text-[11px] px-2 py-1 bg-qb-aggregate/10 text-qb-aggregate border border-qb-aggregate/20 rounded-md hover:bg-qb-aggregate/20 transition-colors font-mono"
                        onClick={() => setCustomExpr((prev) => prev + fn)}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CASE/WHEN Tab */}
            {activeTab === 'case' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground uppercase">
                      Conditions
                    </Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1.5"
                      onClick={addCaseCondition}
                    >
                      <Plus className="w-3 h-3" />
                      Add Condition
                    </Button>
                  </div>

                  {caseConditions.map((cond, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 items-start p-3 bg-secondary/30 rounded-lg border border-border"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-qb-filter font-semibold uppercase w-12">
                            WHEN
                          </span>
                          <Input
                            value={cond.when}
                            onChange={(e) =>
                              updateCaseCondition(idx, 'when', e.target.value)
                            }
                            placeholder="condition (e.g., salary > 50000)"
                            className="h-8 font-mono text-sm bg-background"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-qb-aggregate font-semibold uppercase w-12">
                            THEN
                          </span>
                          <Input
                            value={cond.then}
                            onChange={(e) =>
                              updateCaseCondition(idx, 'then', e.target.value)
                            }
                            placeholder="result value (e.g., 'Senior')"
                            className="h-8 font-mono text-sm bg-background"
                          />
                        </div>
                      </div>
                      {caseConditions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => removeCaseCondition(idx)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-xs text-qb-sort font-semibold uppercase w-12">
                    ELSE
                  </span>
                  <Input
                    value={elseValue}
                    onChange={(e) => setElseValue(e.target.value)}
                    placeholder="default value (optional)"
                    className="h-8 font-mono text-sm bg-background"
                  />
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Preview
                  </Label>
                  <pre className="p-3 bg-secondary/50 rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
                    CASE{'\n'}
                    {caseConditions
                      .filter((c) => c.when && c.then)
                      .map(
                        (c, _i) =>
                          `  WHEN ${c.when || '...'} THEN ${c.then || '...'}\n`,
                      )
                      .join('')}
                    {elseValue && `  ELSE ${elseValue}\n`}
                    END{name && ` AS ${name}`}
                  </pre>
                </div>
              </div>
            )}

            {/* Window Function Tab */}
            {activeTab === 'window' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Window Function
                  </Label>
                  <select
                    value={windowFn}
                    onChange={(e) => setWindowFn(e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono"
                  >
                    {WINDOW_FUNCTIONS.map((fn) => (
                      <option key={fn.value} value={fn.value}>
                        {fn.label} - {fn.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    PARTITION BY
                  </Label>
                  <Input
                    value={partitionBy}
                    onChange={(e) => setPartitionBy(e.target.value)}
                    placeholder="e.g., department_id, location"
                    className="h-9 font-mono bg-background"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Comma-separated column references
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    ORDER BY
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={orderByCol}
                      onChange={(e) => setOrderByCol(e.target.value)}
                      placeholder="e.g., salary"
                      className="h-9 font-mono bg-background flex-1"
                    />
                    <select
                      value={orderByDir}
                      onChange={(e) =>
                        setOrderByDir(e.target.value as SortDirection)
                      }
                      className="h-9 px-3 text-sm bg-background border border-border rounded-lg font-mono"
                    >
                      <option value="ASC">ASC</option>
                      <option value="DESC">DESC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">
                      Frame Start
                    </Label>
                    <select
                      value={frameStart}
                      onChange={(e) => setFrameStart(e.target.value)}
                      className="w-full h-9 px-3 bg-background border border-border rounded-lg text-xs"
                    >
                      <option value="">Default</option>
                      <option value="UNBOUNDED PRECEDING">
                        UNBOUNDED PRECEDING
                      </option>
                      <option value="CURRENT ROW">CURRENT ROW</option>
                      <option value="1 PRECEDING">1 PRECEDING</option>
                      <option value="2 PRECEDING">2 PRECEDING</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">
                      Frame End
                    </Label>
                    <select
                      value={frameEnd}
                      onChange={(e) => setFrameEnd(e.target.value)}
                      className="w-full h-9 px-3 bg-background border border-border rounded-lg text-xs"
                    >
                      <option value="">Default</option>
                      <option value="CURRENT ROW">CURRENT ROW</option>
                      <option value="UNBOUNDED FOLLOWING">
                        UNBOUNDED FOLLOWING
                      </option>
                      <option value="1 FOLLOWING">1 FOLLOWING</option>
                      <option value="2 FOLLOWING">2 FOLLOWING</option>
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Preview
                  </Label>
                  <pre className="p-3 bg-secondary/50 rounded-lg text-xs font-mono text-muted-foreground overflow-x-auto">
                    {windowFn}() OVER ({'\n'}
                    {partitionBy && `  PARTITION BY ${partitionBy}\n`}
                    {orderByCol && `  ORDER BY ${orderByCol} ${orderByDir}\n`}
                    {(frameStart || frameEnd) &&
                      `  ROWS BETWEEN ${frameStart || 'UNBOUNDED PRECEDING'} AND ${frameEnd || 'CURRENT ROW'}\n`}
                    ){name && ` AS ${name}`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="bg-primary hover:bg-primary/90"
          >
            Apply Expression
          </Button>
        </div>
      </div>
    </div>
  )
}
