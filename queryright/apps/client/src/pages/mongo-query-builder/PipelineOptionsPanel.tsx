import {
  HardDrive,
  Leaf,
  Link2,
  Settings2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import type { QueryOptions } from '@/lib/mongo-query-engine'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { LOOKUP_TYPES, generateId } from '@/lib/mongo-query-engine'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'

interface PipelineOptionsPanelProps {
  options: QueryOptions
  onChange: (options: QueryOptions) => void
}

export default function PipelineOptionsPanel({
  options,
  onChange,
}: PipelineOptionsPanelProps) {
  const lookupType =
    options.lookupType ??
    (options.joinType === 'LEFT' ? 'preserveNull' : 'unwind')

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <Settings2 className="w-3.5 h-3.5" />
          Pipeline Options
        </div>

        {/* Distinct Toggle */}
        <div
          className={cn(
            'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
            options.distinct
              ? 'border-mongo bg-mongo/5 shadow-sm shadow-mongo/10'
              : 'border-border hover:border-muted-foreground/50',
          )}
          onClick={() => onChange({ ...options, distinct: !options.distinct })}
        >
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              <span>Distinct</span>
              <span className="text-[10px] font-mono text-muted-foreground">
                $group by all
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Remove duplicate documents
            </div>
          </div>
          {options.distinct ? (
            <ToggleRight className="w-7 h-7 text-mongo" />
          ) : (
            <ToggleLeft className="w-7 h-7 text-muted-foreground" />
          )}
        </div>

        {/* Lookup Type */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link2 className="w-3.5 h-3.5 text-mongo" />
            <Label className="text-xs text-muted-foreground uppercase">
              $lookup Behavior
            </Label>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {LOOKUP_TYPES.map((lt) => (
              <button
                key={lt.value}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  lookupType === lt.value
                    ? 'border-mongo bg-mongo/10 shadow-sm shadow-mongo/10'
                    : 'border-border hover:border-muted-foreground/50',
                )}
                onClick={() =>
                  onChange({
                    ...options,
                    lookupType: lt.value,
                    joinType: lt.value === 'preserveNull' ? 'LEFT' : 'INNER',
                  })
                }
              >
                <div
                  className={cn(
                    'text-sm font-mono font-semibold',
                    lookupType === lt.value ? 'text-mongo' : 'text-foreground',
                  )}
                >
                  {lt.label}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {lt.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Allow Disk Use */}
        <div
          className={cn(
            'flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer',
            options.allowDiskUse
              ? 'border-amber-500 bg-amber-500/5 shadow-sm shadow-amber-500/10'
              : 'border-border hover:border-muted-foreground/50',
          )}
          onClick={() =>
            onChange({ ...options, allowDiskUse: !options.allowDiskUse })
          }
        >
          <div>
            <div className="text-sm font-medium flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Allow Disk Use</span>
            </div>
            <div className="text-xs text-muted-foreground">
              For large aggregations exceeding RAM
            </div>
          </div>
          {options.allowDiskUse ? (
            <ToggleRight className="w-7 h-7 text-amber-500" />
          ) : (
            <ToggleLeft className="w-7 h-7 text-muted-foreground" />
          )}
        </div>

        {/* $limit and $skip */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground uppercase font-mono">
              $limit
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
            <Label className="text-xs text-muted-foreground uppercase font-mono">
              $skip
            </Label>
            <Input
              type="number"
              value={options.skip ?? options.offset ?? 0}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0
                onChange({ ...options, skip: val, offset: val })
              }}
              min={0}
              className="h-9 font-mono bg-background"
            />
          </div>
        </div>

        {/* $sample */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase font-mono">
            $sample size
          </Label>
          <Input
            type="number"
            value={options.sampleSize || ''}
            onChange={(e) =>
              onChange({
                ...options,
                sampleSize: parseInt(e.target.value) || undefined,
              })
            }
            placeholder="Random sample (optional)"
            min={0}
            className="h-9 font-mono bg-background"
          />
          <p className="text-[10px] text-muted-foreground">
            Randomly select N documents before processing
          </p>
        </div>

        {/* Custom $match */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
            <Label className="text-xs text-muted-foreground uppercase cursor-pointer font-mono">
              Custom $match (JSON)
            </Label>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Textarea
              value={options.customMatch || ''}
              onChange={(e) =>
                onChange({
                  ...options,
                  customMatch: e.target.value || undefined,
                })
              }
              placeholder='{"status": "active", "priority": {"$gt": 5}}'
              className="min-h-24 font-mono text-sm bg-background"
            />
            <p className="text-[10px] text-muted-foreground mt-1.5">
              Add custom MongoDB query conditions in JSON format
            </p>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Reference */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
            <Leaf className="w-3.5 h-3.5 text-mongo" />
            <Label className="text-xs text-muted-foreground uppercase cursor-pointer">
              Quick Reference
            </Label>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-3 rounded-lg bg-mongo/5 border border-mongo/20">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-muted-foreground">$eq</span>
                <span className="text-mongo">equals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$ne</span>
                <span className="text-mongo">not equals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$gt / $gte</span>
                <span className="text-mongo">greater than</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$lt / $lte</span>
                <span className="text-mongo">less than</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$in / $nin</span>
                <span className="text-mongo">in array</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$regex</span>
                <span className="text-mongo">pattern match</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">$exists</span>
                <span className="text-mongo">field exists</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </ScrollArea>
  )
}
