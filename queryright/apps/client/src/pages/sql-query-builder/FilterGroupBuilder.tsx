import { useState } from 'react'
import { Brackets, ChevronDown, ChevronRight, Plus, X } from 'lucide-react'
import type {
  FilterCondition,
  FilterGroup,
  FilterOperator,
  LogicalOperator,
} from '@/lib/sql-query-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { FILTER_OPERATORS, generateId } from '@/lib/sql-query-engine'
import { cn } from '@/lib/utils'

interface FilterGroupBuilderProps {
  group: FilterGroup
  columnType: string
  allColumns: Array<{ table: string; column: string }>
  onChange: (group: FilterGroup) => void
  onRemove?: () => void
  depth?: number
}

export default function FilterGroupBuilder({
  group,
  columnType,
  allColumns,
  onChange,
  onRemove,
  depth = 0,
}: FilterGroupBuilderProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const updateLogicalOperator = (op: LogicalOperator) => {
    onChange({ ...group, logicalOperator: op })
  }

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: generateId(),
      operator: '=',
      value: '',
      logicalOperator: 'AND',
    }
    onChange({
      ...group,
      conditions: [...group.conditions, newCondition],
    })
  }

  const updateCondition = (idx: number, updates: Partial<FilterCondition>) => {
    const newConditions = [...group.conditions]
    newConditions[idx] = { ...newConditions[idx], ...updates }
    onChange({ ...group, conditions: newConditions })
  }

  const removeCondition = (idx: number) => {
    onChange({
      ...group,
      conditions: group.conditions.filter((_, i) => i !== idx),
    })
  }

  const addNestedGroup = () => {
    const newGroup: FilterGroup = {
      id: generateId(),
      conditions: [
        { id: generateId(), operator: '=', value: '', logicalOperator: 'AND' },
      ],
      logicalOperator: 'AND',
    }
    onChange({
      ...group,
      groups: [...(group.groups || []), newGroup],
    })
  }

  const updateNestedGroup = (idx: number, nestedGroup: FilterGroup) => {
    const newGroups = [...(group.groups || [])]
    newGroups[idx] = nestedGroup
    onChange({ ...group, groups: newGroups })
  }

  const removeNestedGroup = (idx: number) => {
    onChange({
      ...group,
      groups: (group.groups || []).filter((_, i) => i !== idx),
    })
  }

  const getBorderColor = () => {
    if (depth === 0) return 'border-qb-filter/50'
    if (depth === 1) return 'border-qb-aggregate/50'
    return 'border-qb-sort/50'
  }

  const getBgColor = () => {
    if (depth === 0) return 'bg-qb-filter/5'
    if (depth === 1) return 'bg-qb-aggregate/5'
    return 'bg-qb-sort/5'
  }

  return (
    <div
      className={cn(
        'rounded-xl border p-3 space-y-3',
        getBorderColor(),
        getBgColor(),
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-secondary"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <Brackets className="w-4 h-4 text-qb-filter" />
          <span className="text-xs font-medium">Filter Group</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Logical Operator Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(['AND', 'OR'] as Array<LogicalOperator>).map((op) => (
              <button
                key={op}
                className={cn(
                  'px-2.5 py-1 text-[10px] font-semibold transition-colors',
                  group.logicalOperator === op
                    ? op === 'AND'
                      ? 'bg-qb-filter text-white'
                      : 'bg-qb-sort text-white'
                    : 'bg-background hover:bg-secondary text-muted-foreground',
                )}
                onClick={() => updateLogicalOperator(op)}
              >
                {op}
              </button>
            ))}
          </div>

          {onRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
              onClick={onRemove}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Conditions */}
          <div className="space-y-2">
            {group.conditions.map((cond, idx) => (
              <FilterConditionRow
                key={cond.id}
                condition={cond}
                columnType={columnType}
                isFirst={idx === 0}
                groupOperator={group.logicalOperator}
                onUpdate={(updates) => updateCondition(idx, updates)}
                onRemove={() => removeCondition(idx)}
                canRemove={group.conditions.length > 1}
              />
            ))}
          </div>

          {/* Nested Groups */}
          {group.groups && group.groups.length > 0 && (
            <div className="space-y-2 ml-4">
              {group.groups.map((nestedGroup, idx) => (
                <FilterGroupBuilder
                  key={nestedGroup.id}
                  group={nestedGroup}
                  columnType={columnType}
                  allColumns={allColumns}
                  onChange={(g) => updateNestedGroup(idx, g)}
                  onRemove={() => removeNestedGroup(idx)}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-xs"
              onClick={addCondition}
            >
              <Plus className="w-3 h-3" />
              Add Condition
            </Button>
            {depth < 2 && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={addNestedGroup}
              >
                <Brackets className="w-3 h-3" />
                Add Group
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

interface FilterConditionRowProps {
  condition: FilterCondition
  columnType: string
  isFirst: boolean
  groupOperator: LogicalOperator
  onUpdate: (updates: Partial<FilterCondition>) => void
  onRemove: () => void
  canRemove: boolean
}

function FilterConditionRow({
  condition,
  columnType: _columnType,
  isFirst,
  groupOperator,
  onUpdate,
  onRemove,
  canRemove,
}: FilterConditionRowProps) {
  const selectedOp = FILTER_OPERATORS.find(
    (op) => op.value === condition.operator,
  )

  return (
    <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg border border-border">
      {/* Logical operator display */}
      {!isFirst && (
        <span
          className={cn(
            'text-[10px] font-bold w-8 text-center',
            groupOperator === 'AND' ? 'text-qb-filter' : 'text-qb-sort',
          )}
        >
          {groupOperator}
        </span>
      )}
      {isFirst && <span className="w-8" />}

      {/* Operator */}
      <select
        value={condition.operator}
        onChange={(e) =>
          onUpdate({ operator: e.target.value as FilterOperator })
        }
        className="h-7 px-2 text-xs bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {FILTER_OPERATORS.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {/* Value */}
      {selectedOp?.needsValue && (
        <Input
          value={condition.value}
          onChange={(e) => onUpdate({ value: e.target.value })}
          placeholder="value..."
          className="h-7 flex-1 text-xs font-mono bg-background"
        />
      )}

      {/* Second Value (for BETWEEN) */}
      {selectedOp?.needsSecondValue && (
        <>
          <span className="text-[10px] text-muted-foreground">AND</span>
          <Input
            value={condition.value2 || ''}
            onChange={(e) => onUpdate({ value2: e.target.value })}
            placeholder="value..."
            className="h-7 flex-1 text-xs font-mono bg-background"
          />
        </>
      )}

      {/* Remove button */}
      {canRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
          onClick={onRemove}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}
