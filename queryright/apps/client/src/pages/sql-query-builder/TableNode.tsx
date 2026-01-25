import React, { memo, useMemo, useState } from 'react'
import { Handle, Position } from 'reactflow'
import {
  ArrowDownUp,
  Award,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckSquare,
  Clock,
  CreditCard,
  Database,
  DollarSign,
  FileText,
  Filter,
  Heart,
  Key,
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Tag,
  User,
  Users,
  X,
} from 'lucide-react'
import type { NodeProps } from 'reactflow'
import type { ParsedColumn } from '@/lib/sql-query-engine'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const iconMap: Record<string, React.ElementType> = {
  user: User,
  users: Users,
  layers: Layers,
  'dollar-sign': DollarSign,
  star: Star,
  calendar: Calendar,
  'book-open': BookOpen,
  'check-square': CheckSquare,
  database: Database,
  package: Package,
  cart: ShoppingCart,
  'shopping-cart': ShoppingCart,
  file: FileText,
  settings: Settings,
  mail: Mail,
  tag: Tag,
  boxes: Boxes,
  building: Building2,
  'credit-card': CreditCard,
  'map-pin': MapPin,
  phone: Phone,
  clock: Clock,
  briefcase: Briefcase,
  award: Award,
  heart: Heart,
}

interface TableNodeData {
  label: string
  columns: Array<ParsedColumn>
  styles?: {
    color?: string
    icon?: string
  }
}

export default memo(function TableNode({ data }: NodeProps<TableNodeData>) {
  const [searchQuery, setSearchQuery] = useState('')
  const Icon = iconMap[data.styles?.icon || 'database'] || Database
  const headerColor = data.styles?.color || 'hsl(var(--primary))'

  const handleAction = (
    e: React.MouseEvent,
    type: string,
    colName: string,
    colType?: string,
  ) => {
    e.stopPropagation()
    window.dispatchEvent(
      new CustomEvent('column-action', {
        detail: {
          type,
          table: data.label,
          column: colName,
          columnType: colType,
          x: e.clientX,
          y: e.clientY,
        },
      }),
    )
  }

  const selectedCount = data.columns.filter((c) => c.state?.selected).length
  const showSearch = data.columns.length > 8

  const filteredColumns = useMemo(() => {
    if (!searchQuery.trim()) return data.columns
    const q = searchQuery.toLowerCase()
    return data.columns.filter(
      (col) =>
        col.name.toLowerCase().includes(q) ||
        col.type.toLowerCase().includes(q),
    )
  }, [data.columns, searchQuery])

  return (
    <div className="min-w-[300px] bg-card rounded-xl border border-border shadow-2xl overflow-hidden font-mono text-sm animate-fade-in">
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-3 border-b border-border"
        style={{
          background: `linear-gradient(135deg, ${headerColor}15 0%, transparent 100%)`,
          borderTop: `3px solid ${headerColor}`,
        }}
      >
        <div
          className="p-2 rounded-lg ring-1 ring-inset ring-border/50"
          style={{
            background: `${headerColor}20`,
            color: headerColor,
          }}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-foreground tracking-tight text-base">
            {data.label}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-muted-foreground">
              {data.columns.length} columns
            </span>
            {selectedCount > 0 && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  background: `${headerColor}20`,
                  color: headerColor,
                }}
              >
                {selectedCount} selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="px-3 py-2 border-b border-border bg-secondary/30">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search columns..."
              className="h-7 pl-7 pr-7 text-xs bg-background border-border focus-visible:ring-1 focus-visible:ring-primary"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
            {searchQuery && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSearchQuery('')
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-[10px] text-muted-foreground mt-1">
              {filteredColumns.length} of {data.columns.length} columns
            </div>
          )}
        </div>
      )}

      {/* Columns */}
      <div className="py-1 flex flex-col max-h-[400px] overflow-y-auto">
        {filteredColumns.map((col: ParsedColumn) => {
          const state = col.state || ({} as NonNullable<ParsedColumn['state']>)
          const isSelected = state.selected ?? false
          const hasModifiers =
            state.aggregate ||
            state.sort ||
            state.filter ||
            state.filterGroup ||
            state.having ||
            state.window

          return (
            <div
              key={col.name}
              className={cn(
                'group relative flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150',
                isSelected
                  ? 'bg-primary/10 border-l-2 border-l-primary'
                  : 'hover:bg-secondary/50 border-l-2 border-l-transparent',
              )}
              onClick={(e) => handleAction(e, 'toggle', col.name, col.type)}
              onContextMenu={(e) => {
                e.preventDefault()
                handleAction(e, 'context', col.name, col.type)
              }}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={col.name}
                className="w-2.5! h-2.5! bg-primary! border-2! border-background! opacity-0 group-hover:opacity-100 transition-opacity -ml-5!"
              />

              <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                {/* Selection Indicator */}
                <div
                  className={cn(
                    'w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-all duration-150',
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground/30 group-hover:border-muted-foreground/60',
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-2.5 h-2.5 text-primary-foreground"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 2.28L4 8.56 1.72 6.28a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'truncate transition-colors',
                        isSelected
                          ? 'text-foreground font-medium'
                          : 'text-muted-foreground',
                      )}
                    >
                      {col.name}
                    </span>
                    {col.isPk && (
                      <Key className="w-3.5 h-3.5 text-qb-join shrink-0" />
                    )}
                  </div>

                  {/* State Badges */}
                  {hasModifiers && (
                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      {state.aggregate && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-aggregate/20 text-qb-aggregate px-1.5 py-0.5 rounded-md font-medium">
                          <Calculator className="w-2.5 h-2.5" />
                          {state.aggregate}
                        </span>
                      )}
                      {state.window && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-window/20 text-qb-window px-1.5 py-0.5 rounded-md font-medium">
                          {state.window.function}
                        </span>
                      )}
                      {state.sort && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-sort/20 text-qb-sort px-1.5 py-0.5 rounded-md font-medium">
                          <ArrowDownUp className="w-2.5 h-2.5" />
                          {state.sort}
                        </span>
                      )}
                      {(state.filter || state.filterGroup) && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-filter/20 text-qb-filter px-1.5 py-0.5 rounded-md font-medium">
                          <Filter className="w-2.5 h-2.5" />
                          WHERE
                        </span>
                      )}
                      {state.having && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] bg-qb-output/20 text-qb-output px-1.5 py-0.5 rounded-md font-medium">
                          <Filter className="w-2.5 h-2.5" />
                          HAVING
                        </span>
                      )}
                      {state.alias && (
                        <span className="inline-flex items-center text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-md font-medium">
                          AS {state.alias}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <span
                className={cn(
                  'text-[10px] font-medium shrink-0 ml-2 uppercase px-1.5 py-0.5 rounded',
                  'bg-secondary text-muted-foreground',
                )}
              >
                {col.type}
              </span>

              <Handle
                type="source"
                position={Position.Right}
                id={col.name}
                className="w-2.5! h-2.5! bg-primary! border-2! border-background! opacity-0 group-hover:opacity-100 transition-opacity -mr-5!"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
})
