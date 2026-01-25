import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Database,
  Plus,
  X,
} from 'lucide-react'
import type { CTEDefinition, SubqueryDefinition } from '@/lib/sql-query-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Switch } from '@/components/ui/switch'
import { generateId } from '@/lib/sql-query-engine'

interface CTEBuilderPanelProps {
  ctes: Array<CTEDefinition>
  subqueries: Array<SubqueryDefinition>
  onCTEsChange: (ctes: Array<CTEDefinition>) => void
  onSubqueriesChange: (subqueries: Array<SubqueryDefinition>) => void
}

export default function CTEBuilderPanel({
  ctes,
  subqueries,
  onCTEsChange,
  onSubqueriesChange,
}: CTEBuilderPanelProps) {
  const [expandedCTEs, setExpandedCTEs] = useState<Set<string>>(new Set())
  const [expandedSubqueries, setExpandedSubqueries] = useState<Set<string>>(
    new Set(),
  )

  // CTE Management
  const addCTE = () => {
    const newCTE: CTEDefinition = {
      id: generateId(),
      name: `cte_${ctes.length + 1}`,
      columns: [],
      recursive: false,
    }
    onCTEsChange([...ctes, newCTE])
    setExpandedCTEs((prev) => new Set([...prev, newCTE.id]))
  }

  const updateCTE = (id: string, updates: Partial<CTEDefinition>) => {
    onCTEsChange(
      ctes.map((cte) => (cte.id === id ? { ...cte, ...updates } : cte)),
    )
  }

  const removeCTE = (id: string) => {
    onCTEsChange(ctes.filter((cte) => cte.id !== id))
  }

  const toggleCTEExpand = (id: string) => {
    setExpandedCTEs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Subquery Management
  const addSubquery = () => {
    const newSubquery: SubqueryDefinition = {
      id: generateId(),
      name: `subquery_${subqueries.length + 1}`,
      columns: [],
      asTable: false,
    }
    onSubqueriesChange([...subqueries, newSubquery])
    setExpandedSubqueries((prev) => new Set([...prev, newSubquery.id]))
  }

  const updateSubquery = (id: string, updates: Partial<SubqueryDefinition>) => {
    onSubqueriesChange(
      subqueries.map((sq) => (sq.id === id ? { ...sq, ...updates } : sq)),
    )
  }

  const removeSubquery = (id: string) => {
    onSubqueriesChange(subqueries.filter((sq) => sq.id !== id))
  }

  const toggleSubqueryExpand = (id: string) => {
    setExpandedSubqueries((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {/* CTEs Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-qb-output" />
            <Label className="text-xs text-muted-foreground uppercase">
              Common Table Expressions (CTEs)
            </Label>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={addCTE}
          >
            <Plus className="w-3 h-3" />
            Add CTE
          </Button>
        </div>

        {ctes.length === 0 ? (
          <div className="text-center py-6 text-xs text-muted-foreground border border-dashed border-border rounded-xl">
            No CTEs defined. CTEs help organize complex queries.
          </div>
        ) : (
          <div className="space-y-2">
            {ctes.map((cte) => (
              <div
                key={cte.id}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-3 py-2 bg-qb-output/5 cursor-pointer hover:bg-qb-output/10 transition-colors"
                  onClick={() => toggleCTEExpand(cte.id)}
                >
                  <div className="flex items-center gap-2">
                    {expandedCTEs.has(cte.id) ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-mono font-semibold text-qb-output">
                      {cte.name}
                    </span>
                    {cte.recursive && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-aggregate/20 text-qb-aggregate font-medium">
                        RECURSIVE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCTE(cte.id)
                      }}
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCTEs.has(cte.id) && (
                  <div className="p-3 space-y-3 border-t border-border">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        CTE Name
                      </Label>
                      <Input
                        value={cte.name}
                        onChange={(e) =>
                          updateCTE(cte.id, { name: e.target.value })
                        }
                        placeholder="my_cte"
                        className="h-8 font-mono bg-background"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs">Recursive CTE</Label>
                        <p className="text-[10px] text-muted-foreground">
                          Enable for hierarchical queries
                        </p>
                      </div>
                      <Switch
                        checked={cte.recursive || false}
                        onCheckedChange={(checked) =>
                          updateCTE(cte.id, { recursive: checked })
                        }
                      />
                    </div>

                    <div className="p-2 bg-secondary/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground">
                        Select columns in the main diagram to define the CTE
                        query. The CTE will be generated from the current column
                        selection.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subqueries Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-qb-window" />
            <Label className="text-xs text-muted-foreground uppercase">
              Subqueries
            </Label>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={addSubquery}
          >
            <Plus className="w-3 h-3" />
            Add Subquery
          </Button>
        </div>

        {subqueries.length === 0 ? (
          <div className="text-center py-6 text-xs text-muted-foreground border border-dashed border-border rounded-xl">
            No subqueries defined. Subqueries can be used in filters.
          </div>
        ) : (
          <div className="space-y-2">
            {subqueries.map((sq) => (
              <div
                key={sq.id}
                className="border border-border rounded-xl overflow-hidden bg-card"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-3 py-2 bg-qb-window/5 cursor-pointer hover:bg-qb-window/10 transition-colors"
                  onClick={() => toggleSubqueryExpand(sq.id)}
                >
                  <div className="flex items-center gap-2">
                    {expandedSubqueries.has(sq.id) ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-mono font-semibold text-qb-window">
                      {sq.name}
                    </span>
                    {sq.asTable && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-qb-join/20 text-qb-join font-medium">
                        AS TABLE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeSubquery(sq.id)
                      }}
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedSubqueries.has(sq.id) && (
                  <div className="p-3 space-y-3 border-t border-border">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Subquery Name
                      </Label>
                      <Input
                        value={sq.name}
                        onChange={(e) =>
                          updateSubquery(sq.id, { name: e.target.value })
                        }
                        placeholder="my_subquery"
                        className="h-8 font-mono bg-background"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs">Use as Derived Table</Label>
                        <p className="text-[10px] text-muted-foreground">
                          Join subquery as a table in FROM clause
                        </p>
                      </div>
                      <Switch
                        checked={sq.asTable || false}
                        onCheckedChange={(checked) =>
                          updateSubquery(sq.id, { asTable: checked })
                        }
                      />
                    </div>

                    <div className="p-2 bg-secondary/30 rounded-lg">
                      <p className="text-[10px] text-muted-foreground">
                        Use this subquery in filter conditions with IN, EXISTS,
                        or NOT EXISTS operators.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="p-4 bg-secondary/30 rounded-xl space-y-2 border border-border">
        <h4 className="text-xs font-semibold text-foreground">
          Query Optimization Tips
        </h4>
        <ul className="text-[11px] text-muted-foreground space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-qb-filter mt-1.5 shrink-0" />
            Use CTEs to break down complex queries into readable steps
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-qb-aggregate mt-1.5 shrink-0" />
            Add indexes on columns used in WHERE and JOIN conditions
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-qb-sort mt-1.5 shrink-0" />
            Limit result sets early with WHERE clauses
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-qb-window mt-1.5 shrink-0" />
            Use EXISTS instead of IN for better performance with large datasets
          </li>
        </ul>
      </div>
    </div>
  )
}
