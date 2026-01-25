import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Code,
  Layers,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import type {
  AddFieldsStage,
  CustomStages,
  SetStage,
  UnwindStage,
} from '@/lib/mongo-query-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { generateId } from '@/lib/mongo-query-engine'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CustomStagesPanelProps {
  stages: CustomStages
  onChange: (stages: CustomStages) => void
  availableFields: Array<string>
}

export default function CustomStagesPanel({
  stages,
  onChange,
  availableFields,
}: CustomStagesPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    unwind: true,
    addFields: true,
    set: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // $unwind handlers
  const addUnwindStage = () => {
    const newStage: UnwindStage = {
      id: generateId(),
      path: '',
      preserveNullAndEmptyArrays: false,
      includeArrayIndex: '',
    }
    onChange({ ...stages, unwind: [...stages.unwind, newStage] })
  }

  const updateUnwindStage = (id: string, updates: Partial<UnwindStage>) => {
    onChange({
      ...stages,
      unwind: stages.unwind.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })
  }

  const removeUnwindStage = (id: string) => {
    onChange({ ...stages, unwind: stages.unwind.filter((s) => s.id !== id) })
  }

  // $addFields handlers
  const addAddFieldsStage = () => {
    const newStage: AddFieldsStage = {
      id: generateId(),
      fields: [{ name: '', expression: '' }],
    }
    onChange({ ...stages, addFields: [...stages.addFields, newStage] })
  }

  const updateAddFieldsStage = (
    id: string,
    updates: Partial<AddFieldsStage>,
  ) => {
    onChange({
      ...stages,
      addFields: stages.addFields.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    })
  }

  const removeAddFieldsStage = (id: string) => {
    onChange({
      ...stages,
      addFields: stages.addFields.filter((s) => s.id !== id),
    })
  }

  const addFieldToAddFields = (stageId: string) => {
    const stage = stages.addFields.find((s) => s.id === stageId)
    if (stage) {
      updateAddFieldsStage(stageId, {
        fields: [...stage.fields, { name: '', expression: '' }],
      })
    }
  }

  const removeFieldFromAddFields = (stageId: string, fieldIndex: number) => {
    const stage = stages.addFields.find((s) => s.id === stageId)
    if (stage) {
      updateAddFieldsStage(stageId, {
        fields: stage.fields.filter((_, i) => i !== fieldIndex),
      })
    }
  }

  // $set handlers
  const addSetStage = () => {
    const newStage: SetStage = {
      id: generateId(),
      fields: [{ name: '', value: '' }],
    }
    onChange({ ...stages, set: [...stages.set, newStage] })
  }

  const updateSetStage = (id: string, updates: Partial<SetStage>) => {
    onChange({
      ...stages,
      set: stages.set.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })
  }

  const removeSetStage = (id: string) => {
    onChange({ ...stages, set: stages.set.filter((s) => s.id !== id) })
  }

  const addFieldToSet = (stageId: string) => {
    const stage = stages.set.find((s) => s.id === stageId)
    if (stage) {
      updateSetStage(stageId, {
        fields: [...stage.fields, { name: '', value: '' }],
      })
    }
  }

  const removeFieldFromSet = (stageId: string, fieldIndex: number) => {
    const stage = stages.set.find((s) => s.id === stageId)
    if (stage) {
      updateSetStage(stageId, {
        fields: stage.fields.filter((_, i) => i !== fieldIndex),
      })
    }
  }

  const totalStages =
    stages.unwind.length + stages.addFields.length + stages.set.length

  return (
    <ScrollArea className="h-screen">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Custom Stages
          </div>
          {totalStages > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-mongo/20 text-mongo font-medium">
              {totalStages} stage{totalStages !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* $unwind Section */}
        <Collapsible
          open={openSections.unwind}
          onOpenChange={() => toggleSection('unwind')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.unwind ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-amber-500">
                  $unwind
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Deconstruct arrays
                </span>
              </div>
              <div className="flex items-center gap-2">
                {stages.unwind.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
                    {stages.unwind.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addUnwindStage()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {stages.unwind.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add an $unwind stage
                  </p>
                ) : (
                  stages.unwind.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">
                          $unwind #{idx + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeUnwindStage(stage.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Array Field Path
                        </Label>
                        <div className="flex gap-2">
                          <span className="flex items-center px-2 bg-secondary rounded-l-md border-r-0 border border-border text-muted-foreground font-mono text-sm">
                            $
                          </span>
                          <Input
                            value={stage.path.replace(/^\$/, '')}
                            onChange={(e) =>
                              updateUnwindStage(stage.id, {
                                path: e.target.value,
                              })
                            }
                            placeholder="skills"
                            className="flex-1 font-mono text-sm rounded-l-none"
                            list={`fields-${stage.id}`}
                          />
                          <datalist id={`fields-${stage.id}`}>
                            {availableFields.map((f) => (
                              <option key={f} value={f} />
                            ))}
                          </datalist>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-muted-foreground">
                          Preserve null/empty arrays
                        </Label>
                        <Switch
                          checked={stage.preserveNullAndEmptyArrays}
                          onCheckedChange={(checked) =>
                            updateUnwindStage(stage.id, {
                              preserveNullAndEmptyArrays: checked,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Include array index as (optional)
                        </Label>
                        <Input
                          value={stage.includeArrayIndex || ''}
                          onChange={(e) =>
                            updateUnwindStage(stage.id, {
                              includeArrayIndex: e.target.value || undefined,
                            })
                          }
                          placeholder="arrayIndex"
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* $addFields Section */}
        <Collapsible
          open={openSections.addFields}
          onOpenChange={() => toggleSection('addFields')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.addFields ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-sky-500">
                  $addFields
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Add computed fields
                </span>
              </div>
              <div className="flex items-center gap-2">
                {stages.addFields.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-500">
                    {stages.addFields.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addAddFieldsStage()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {stages.addFields.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add an $addFields stage
                  </p>
                ) : (
                  stages.addFields.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">
                          $addFields #{idx + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeAddFieldsStage(stage.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      {stage.fields.map((field, fieldIdx) => (
                        <div key={fieldIdx} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-1">
                            <Input
                              value={field.name}
                              onChange={(e) => {
                                const newFields = [...stage.fields]
                                newFields[fieldIdx] = {
                                  ...field,
                                  name: e.target.value,
                                }
                                updateAddFieldsStage(stage.id, {
                                  fields: newFields,
                                })
                              }}
                              placeholder="fieldName"
                              className="font-mono text-sm"
                            />
                          </div>
                          <span className="text-muted-foreground mt-2">:</span>
                          <div className="flex-1 space-y-1">
                            <Input
                              value={field.expression}
                              onChange={(e) => {
                                const newFields = [...stage.fields]
                                newFields[fieldIdx] = {
                                  ...field,
                                  expression: e.target.value,
                                }
                                updateAddFieldsStage(stage.id, {
                                  fields: newFields,
                                })
                              }}
                              placeholder='$field or {"$concat": [...]}'
                              className="font-mono text-sm"
                            />
                          </div>
                          {stage.fields.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 mt-0.5 hover:bg-destructive/20 hover:text-destructive"
                              onClick={() =>
                                removeFieldFromAddFields(stage.id, fieldIdx)
                              }
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-7 text-xs"
                        onClick={() => addFieldToAddFields(stage.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Field
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* $set Section */}
        <Collapsible
          open={openSections.set}
          onOpenChange={() => toggleSection('set')}
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                {openSections.set ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-mono text-sm font-medium text-violet-500">
                  $set
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Set field values
                </span>
              </div>
              <div className="flex items-center gap-2">
                {stages.set.length > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-500">
                    {stages.set.length}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    addSetStage()
                  }}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3">
                {stages.set.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Click + to add a $set stage
                  </p>
                ) : (
                  stages.set.map((stage, idx) => (
                    <div
                      key={stage.id}
                      className="p-3 rounded-lg bg-card border border-border space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-muted-foreground">
                          $set #{idx + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeSetStage(stage.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>

                      {stage.fields.map((field, fieldIdx) => (
                        <div key={fieldIdx} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-1">
                            <Input
                              value={field.name}
                              onChange={(e) => {
                                const newFields = [...stage.fields]
                                newFields[fieldIdx] = {
                                  ...field,
                                  name: e.target.value,
                                }
                                updateSetStage(stage.id, { fields: newFields })
                              }}
                              placeholder="fieldName"
                              className="font-mono text-sm"
                            />
                          </div>
                          <span className="text-muted-foreground mt-2">:</span>
                          <div className="flex-1 space-y-1">
                            <Input
                              value={field.value}
                              onChange={(e) => {
                                const newFields = [...stage.fields]
                                newFields[fieldIdx] = {
                                  ...field,
                                  value: e.target.value,
                                }
                                updateSetStage(stage.id, { fields: newFields })
                              }}
                              placeholder='"value" or $otherField'
                              className="font-mono text-sm"
                            />
                          </div>
                          {stage.fields.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 mt-0.5 hover:bg-destructive/20 hover:text-destructive"
                              onClick={() =>
                                removeFieldFromSet(stage.id, fieldIdx)
                              }
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-7 text-xs"
                        onClick={() => addFieldToSet(stage.id)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Field
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Quick Reference */}
        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-3.5 h-3.5 text-mongo" />
            <span className="text-xs font-medium text-muted-foreground">
              Expression Examples
            </span>
          </div>
          <div className="space-y-1.5 text-[10px] font-mono text-muted-foreground">
            <div className="flex justify-between">
              <span>Field reference:</span>
              <span className="text-mongo">$fieldName</span>
            </div>
            <div className="flex justify-between">
              <span>Concatenate:</span>
              <span className="text-mongo">{`{"$concat": ["$a", " ", "$b"]}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Multiply:</span>
              <span className="text-mongo">{`{"$multiply": ["$price", "$qty"]}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Conditional:</span>
              <span className="text-mongo">{`{"$cond": [...]}`}</span>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
