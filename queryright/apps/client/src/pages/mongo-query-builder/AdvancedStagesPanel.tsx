import { useState } from 'react'
import {
  ArrowUpDown,
  Calculator,
  ChevronDown,
  ChevronRight,
  Code2,
  Group,
  Plus,
  Trash2,
} from 'lucide-react'
import type {
  ComputedField,
  CustomStages,
  GroupStage,
  SortStage,
} from '@/lib/mongo-query-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AGGREGATE_FUNCTIONS,
  ARITHMETIC_OPERATORS,
  STRING_OPERATORS,
  generateId,
} from '@/lib/mongo-query-engine'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AdvancedStagesPanelProps {
  stages: CustomStages
  onChange: (stages: CustomStages) => void
  availableFields: Array<string>
}

export default function AdvancedStagesPanel({
  stages,
  onChange,
  availableFields,
}: AdvancedStagesPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    group: true,
    sort: true,
    computed: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // $group handlers
  const addGroupStage = () => {
    const newStage: GroupStage = {
      id: generateId(),
      groupBy: [],
      accumulators: [],
    }
    onChange({ ...stages, group: [...(stages.group || []), newStage] })
  }

  const updateGroupStage = (id: string, updates: Partial<GroupStage>) => {
    onChange({
      ...stages,
      group: (stages.group || []).map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })
  }

  const removeGroupStage = (id: string) => {
    onChange({
      ...stages,
      group: (stages.group || []).filter((s) => s.id !== id),
    })
  }

  const addGroupByField = (stageId: string, field: string) => {
    const stage = stages.group?.find((s) => s.id === stageId)
    if (stage && !stage.groupBy.includes(field)) {
      updateGroupStage(stageId, { groupBy: [...stage.groupBy, field] })
    }
  }

  const removeGroupByField = (stageId: string, fieldIndex: number) => {
    const stage = stages.group?.find((s) => s.id === stageId)
    if (stage) {
      updateGroupStage(stageId, {
        groupBy: stage.groupBy.filter((_, i) => i !== fieldIndex),
      })
    }
  }

  const addAccumulator = (stageId: string) => {
    const stage = stages.group?.find((s) => s.id === stageId)
    if (stage) {
      updateGroupStage(stageId, {
        accumulators: [
          ...stage.accumulators,
          { name: '', operator: '$sum', field: '' },
        ],
      })
    }
  }

  const updateAccumulator = (
    stageId: string,
    accIndex: number,
    updates: any,
  ) => {
    const stage = stages.group?.find((s) => s.id === stageId)
    if (stage) {
      const newAccumulators = stage.accumulators.map((acc, i) =>
        i === accIndex ? { ...acc, ...updates } : acc,
      )
      updateGroupStage(stageId, { accumulators: newAccumulators })
    }
  }

  const removeAccumulator = (stageId: string, accIndex: number) => {
    const stage = stages.group?.find((s) => s.id === stageId)
    if (stage) {
      updateGroupStage(stageId, {
        accumulators: stage.accumulators.filter((_, i) => i !== accIndex),
      })
    }
  }

  // $sort handlers
  const addSortStage = () => {
    const newStage: SortStage = {
      id: generateId(),
      sorts: [{ field: '', direction: 1 }],
    }
    onChange({ ...stages, sort: [...(stages.sort || []), newStage] })
  }

  const updateSortStage = (id: string, updates: Partial<SortStage>) => {
    onChange({
      ...stages,
      sort: (stages.sort || []).map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })
  }

  const removeSortStage = (id: string) => {
    onChange({
      ...stages,
      sort: (stages.sort || []).filter((s) => s.id !== id),
    })
  }

  const addSortField = (stageId: string) => {
    const stage = stages.sort?.find((s) => s.id === stageId)
    if (stage) {
      updateSortStage(stageId, {
        sorts: [...stage.sorts, { field: '', direction: 1 }],
      })
    }
  }

  const updateSortField = (
    stageId: string,
    sortIndex: number,
    updates: any,
  ) => {
    const stage = stages.sort?.find((s) => s.id === stageId)
    if (stage) {
      const newSorts = stage.sorts.map((sort, i) =>
        i === sortIndex ? { ...sort, ...updates } : sort,
      )
      updateSortStage(stageId, { sorts: newSorts })
    }
  }

  const removeSortField = (stageId: string, sortIndex: number) => {
    const stage = stages.sort?.find((s) => s.id === stageId)
    if (stage) {
      updateSortStage(stageId, {
        sorts: stage.sorts.filter((_, i) => i !== sortIndex),
      })
    }
  }

  // Computed field handlers
  const addComputedField = () => {
    const newField: ComputedField = {
      id: generateId(),
      name: '',
      expression: '',
      expressionType: 'custom',
    }
    onChange({ ...stages, computed: [...(stages.computed || []), newField] })
  }

  const updateComputedField = (id: string, updates: Partial<ComputedField>) => {
    onChange({
      ...stages,
      computed: (stages.computed || []).map((f) =>
        f.id === id ? { ...f, ...updates } : f,
      ),
    })
  }

  const removeComputedField = (id: string) => {
    onChange({
      ...stages,
      computed: (stages.computed || []).filter((f) => f.id !== id),
    })
  }

  const totalStages =
    (stages.group?.length || 0) +
    (stages.sort?.length || 0) +
    (stages.computed?.length || 0)

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            Advanced Stages
          </div>
          {totalStages > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-500 font-medium">
              {totalStages} stage{totalStages !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* $group Section */}
        <Collapsible
          open={openSections.group}
          onOpenChange={() => toggleSection('group')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.group ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-emerald-500">
                  $group
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Group & aggregate
                </span>
              </div>
              <div className="flex items-center gap-2">
                {(stages.group?.length || 0) > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">
                    {stages.group?.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addGroupStage()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {!stages.group || stages.group.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add a $group stage
                  </p>
                ) : (
                  stages.group.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Group className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-xs font-mono text-muted-foreground">
                            $group #{idx + 1}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeGroupStage(stage.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Group By Fields */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Group By (_id)
                        </Label>
                        <div className="space-y-2">
                          {stage.groupBy.map((field, fieldIdx) => (
                            <div key={fieldIdx} className="flex gap-2">
                              <Input
                                value={field}
                                onChange={(e) => {
                                  const newGroupBy = [...stage.groupBy]
                                  newGroupBy[fieldIdx] = e.target.value
                                  updateGroupStage(stage.id, {
                                    groupBy: newGroupBy,
                                  })
                                }}
                                placeholder="field_name"
                                className="flex-1 font-mono text-sm"
                                list={`group-fields-${stage.id}`}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-destructive/20 hover:text-destructive"
                                onClick={() =>
                                  removeGroupByField(stage.id, fieldIdx)
                                }
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs"
                            onClick={() => addGroupByField(stage.id, '')}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Group Field
                          </Button>
                        </div>
                        <datalist id={`group-fields-${stage.id}`}>
                          {availableFields.map((f) => (
                            <option key={f} value={f} />
                          ))}
                        </datalist>
                      </div>

                      {/* Accumulators */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Accumulators
                        </Label>
                        <div className="space-y-2">
                          {stage.accumulators.map((acc, accIdx) => (
                            <div
                              key={accIdx}
                              className="grid grid-cols-12 gap-2"
                            >
                              <Input
                                value={acc.name}
                                onChange={(e) =>
                                  updateAccumulator(stage.id, accIdx, {
                                    name: e.target.value,
                                  })
                                }
                                placeholder="output_name"
                                className="col-span-4 font-mono text-sm h-8"
                              />
                              <Select
                                value={acc.operator}
                                onValueChange={(v) =>
                                  updateAccumulator(stage.id, accIdx, {
                                    operator: v,
                                  })
                                }
                              >
                                <SelectTrigger className="col-span-3 h-8 text-xs font-mono">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {AGGREGATE_FUNCTIONS.map((fn) => (
                                    <SelectItem
                                      key={fn.value}
                                      value={fn.value}
                                      className="font-mono text-xs"
                                    >
                                      {fn.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Input
                                value={acc.field}
                                onChange={(e) =>
                                  updateAccumulator(stage.id, accIdx, {
                                    field: e.target.value,
                                  })
                                }
                                placeholder="field"
                                className="col-span-4 font-mono text-sm h-8"
                                list={`acc-fields-${stage.id}`}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="col-span-1 h-8 w-full p-0 hover:bg-destructive/20 hover:text-destructive"
                                onClick={() =>
                                  removeAccumulator(stage.id, accIdx)
                                }
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs"
                            onClick={() => addAccumulator(stage.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Accumulator
                          </Button>
                        </div>
                        <datalist id={`acc-fields-${stage.id}`}>
                          {availableFields.map((f) => (
                            <option key={f} value={f} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* $sort Section */}
        <Collapsible
          open={openSections.sort}
          onOpenChange={() => toggleSection('sort')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.sort ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-sky-500">
                  $sort
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Multi-field sorting
                </span>
              </div>
              <div className="flex items-center gap-2">
                {(stages.sort?.length || 0) > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-500">
                    {stages.sort?.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addSortStage()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {!stages.sort || stages.sort.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add a $sort stage
                  </p>
                ) : (
                  stages.sort.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="w-3.5 h-3.5 text-sky-500" />
                          <span className="text-xs font-mono text-muted-foreground">
                            $sort #{idx + 1}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeSortStage(stage.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {stage.sorts.map((sort, sortIdx) => (
                          <div
                            key={sortIdx}
                            className="grid grid-cols-12 gap-2"
                          >
                            <Input
                              value={sort.field}
                              onChange={(e) =>
                                updateSortField(stage.id, sortIdx, {
                                  field: e.target.value,
                                })
                              }
                              placeholder="field_name"
                              className="col-span-8 font-mono text-sm h-9"
                              list={`sort-fields-${stage.id}`}
                            />
                            <Select
                              value={String(sort.direction)}
                              onValueChange={(v) =>
                                updateSortField(stage.id, sortIdx, {
                                  direction: parseInt(v) as 1 | -1,
                                })
                              }
                            >
                              <SelectTrigger className="col-span-3 h-9 text-xs font-mono">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="1"
                                  className="font-mono text-xs"
                                >
                                  1 (asc)
                                </SelectItem>
                                <SelectItem
                                  value="-1"
                                  className="font-mono text-xs"
                                >
                                  -1 (desc)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="col-span-1 h-9 w-full p-0 hover:bg-destructive/20 hover:text-destructive"
                              onClick={() => removeSortField(stage.id, sortIdx)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-8 text-xs"
                          onClick={() => addSortField(stage.id)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Sort Field
                        </Button>
                      </div>
                      <datalist id={`sort-fields-${stage.id}`}>
                        {availableFields.map((f) => (
                          <option key={f} value={f} />
                        ))}
                      </datalist>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Computed Fields Section */}
        <Collapsible
          open={openSections.computed}
          onOpenChange={() => toggleSection('computed')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.computed ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-violet-500">
                  Computed Fields
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Expressions & formulas
                </span>
              </div>
              <div className="flex items-center gap-2">
                {(stages.computed?.length || 0) > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-500">
                    {stages.computed?.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addComputedField()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {!stages.computed || stages.computed.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add a computed field
                  </p>
                ) : (
                  stages.computed.map((field, idx) => (
                    <div
                      key={field.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-3.5 h-3.5 text-violet-500" />
                          <span className="text-xs font-mono text-muted-foreground">
                            Field #{idx + 1}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeComputedField(field.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Field Name
                        </Label>
                        <Input
                          value={field.name}
                          onChange={(e) =>
                            updateComputedField(field.id, {
                              name: e.target.value,
                            })
                          }
                          placeholder="computed_field_name"
                          className="font-mono text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Expression Type
                        </Label>
                        <Tabs
                          value={field.expressionType}
                          onValueChange={(v: any) =>
                            updateComputedField(field.id, { expressionType: v })
                          }
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-3 h-8">
                            <TabsTrigger value="arithmetic" className="text-xs">
                              Math
                            </TabsTrigger>
                            <TabsTrigger value="string" className="text-xs">
                              String
                            </TabsTrigger>
                            <TabsTrigger value="custom" className="text-xs">
                              Custom
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent
                            value="arithmetic"
                            className="space-y-2 mt-3"
                          >
                            <Select
                              onValueChange={(v) =>
                                updateComputedField(field.id, { expression: v })
                              }
                            >
                              <SelectTrigger className="h-9 text-xs font-mono">
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                {ARITHMETIC_OPERATORS.map((op) => (
                                  <SelectItem
                                    key={op.value}
                                    value={op.example}
                                    className="font-mono text-xs"
                                  >
                                    {op.label} - {op.description}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TabsContent>

                          <TabsContent
                            value="string"
                            className="space-y-2 mt-3"
                          >
                            <Select
                              onValueChange={(v) =>
                                updateComputedField(field.id, { expression: v })
                              }
                            >
                              <SelectTrigger className="h-9 text-xs font-mono">
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                {STRING_OPERATORS.map((op) => (
                                  <SelectItem
                                    key={op.value}
                                    value={op.example}
                                    className="font-mono text-xs"
                                  >
                                    {op.label} - {op.description}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TabsContent>

                          <TabsContent value="custom" className="mt-3">
                            {/* Keep existing custom expression field */}
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          MongoDB Expression (JSON)
                        </Label>
                        <Textarea
                          value={field.expression}
                          onChange={(e) =>
                            updateComputedField(field.id, {
                              expression: e.target.value,
                            })
                          }
                          placeholder='{ "$add": ["$field1", "$field2"] }'
                          className="min-h-20 font-mono text-xs"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Enter valid MongoDB expression. Example:{' '}
                          {`{ "$multiply": ["$price", 1.1] }`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </ScrollArea>
  )
}
