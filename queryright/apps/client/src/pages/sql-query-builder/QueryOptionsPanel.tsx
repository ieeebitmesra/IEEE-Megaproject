import {
  Layers,
  Link2,
  Settings2,
  ToggleLeft,
  ToggleRight,
  X,
} from 'lucide-react'
import type { QueryOptions, SetOperation } from '@/lib/sql-query-engine'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { JOIN_TYPES, SET_OPERATIONS, generateId } from '@/lib/sql-query-engine'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface QueryOptionsPanelProps {
  options: QueryOptions
  onChange: (options: QueryOptions) => void
}

export default function QueryOptionsPanel({
  options,
  onChange,
}: QueryOptionsPanelProps) {
  const addSetOperation = (type: SetOperation) => {
    const newOps = [
      ...(options.setOperations || []),
      { type, queryId: generateId() },
    ]
    onChange({ ...options, setOperations: newOps })
  }

  const removeSetOperation = (index: number) => {
    const newOps = (options.setOperations || []).filter((_, i) => i !== index)
    onChange({
      ...options,
      setOperations: newOps.length > 0 ? newOps : undefined,
    })
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Settings2 className="w-3.5 h-3.5" />
        Query Options
      </div>

      {/* DISTINCT Toggle */}
      <div
        className={cn(
          'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
          options.distinct
            ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
            : 'border-border hover:border-muted-foreground/50',
        )}
        onClick={() => onChange({ ...options, distinct: !options.distinct })}
      >
        <div>
          <div className="text-sm font-medium">DISTINCT</div>
          <div className="text-xs text-muted-foreground">
            Remove duplicate rows
          </div>
        </div>
        {options.distinct ? (
          <ToggleRight className="w-7 h-7 text-primary" />
        ) : (
          <ToggleLeft className="w-7 h-7 text-muted-foreground" />
        )}
      </div>

      {/* GROUP BY ALL Toggle */}
      <div
        className={cn(
          'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
          options.groupByAll
            ? 'border-qb-aggregate bg-qb-aggregate/5 shadow-sm shadow-qb-aggregate/10'
            : 'border-border hover:border-muted-foreground/50',
        )}
        onClick={() =>
          onChange({ ...options, groupByAll: !options.groupByAll })
        }
      >
        <div>
          <div className="text-sm font-medium">GROUP BY ALL</div>
          <div className="text-xs text-muted-foreground">
            Auto-group non-aggregated columns
          </div>
        </div>
        {options.groupByAll ? (
          <ToggleRight className="w-7 h-7 text-qb-aggregate" />
        ) : (
          <ToggleLeft className="w-7 h-7 text-muted-foreground" />
        )}
      </div>

      {/* JOIN Type */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link2 className="w-3.5 h-3.5 text-qb-join" />
          <Label className="text-xs text-muted-foreground uppercase">
            Join Type
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {JOIN_TYPES.map((jt) => (
            <button
              key={jt.value}
              className={cn(
                'p-2.5 rounded-xl border text-left transition-all',
                options.joinType === jt.value
                  ? 'border-qb-join bg-qb-join/10 shadow-sm shadow-qb-join/10'
                  : 'border-border hover:border-muted-foreground/50',
              )}
              onClick={() => onChange({ ...options, joinType: jt.value })}
            >
              <div
                className={cn(
                  'text-sm font-mono font-semibold',
                  options.joinType === jt.value
                    ? 'text-qb-join'
                    : 'text-foreground',
                )}
              >
                {jt.label}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                {jt.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* SET Operations */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <Layers className="w-3.5 h-3.5 text-qb-union" />
          <Label className="text-xs text-muted-foreground uppercase cursor-pointer">
            Set Operations
          </Label>
          <span className="text-xs text-muted-foreground">
            {options.setOperations?.length
              ? `(${options.setOperations.length})`
              : ''}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {SET_OPERATIONS.map((op) => (
              <button
                key={op.value}
                className="p-2 rounded-lg border border-border hover:border-qb-union/50 text-left transition-all"
                onClick={() => addSetOperation(op.value)}
              >
                <div className="text-xs font-mono font-medium">{op.label}</div>
                <div className="text-[9px] text-muted-foreground">
                  {op.description}
                </div>
              </button>
            ))}
          </div>

          {options.setOperations && options.setOperations.length > 0 && (
            <div className="space-y-1 mt-2">
              {options.setOperations.map((op, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-qb-union/10 border border-qb-union/20"
                >
                  <span className="text-xs font-mono text-qb-union">
                    {op.type}
                  </span>
                  <span className="flex-1 text-xs text-muted-foreground">
                    Query #{idx + 2}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-destructive/20"
                    onClick={() => removeSetOperation(idx)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* LIMIT & OFFSET */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase">
            Limit
          </Label>
          <Input
            type="number"
            value={options.limit}
            onChange={(e) =>
              onChange({ ...options, limit: parseInt(e.target.value) || 0 })
            }
            min={0}
            max={100000}
            className="h-9 font-mono bg-background"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase">
            Offset
          </Label>
          <Input
            type="number"
            value={options.offset}
            onChange={(e) =>
              onChange({ ...options, offset: parseInt(e.target.value) || 0 })
            }
            min={0}
            className="h-9 font-mono bg-background"
          />
        </div>
      </div>

      {/* Custom WHERE Clause */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
          <Label className="text-xs text-muted-foreground uppercase cursor-pointer">
            Custom WHERE Clause
          </Label>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Textarea
            value={options.customWhere || ''}
            onChange={(e) =>
              onChange({ ...options, customWhere: e.target.value || undefined })
            }
            placeholder="e.g., (status = 'active' OR priority > 5) AND created_at > '2024-01-01'"
            className="min-h-20 font-mono text-sm bg-background"
          />
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Write complex conditions with AND/OR groupings
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
