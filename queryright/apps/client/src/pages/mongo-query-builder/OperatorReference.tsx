import { useState } from 'react'
import {
  BookOpen,
  Braces,
  Calculator,
  Calendar,
  ChevronDown,
  ChevronRight,
  GitCompare,
  List,
  Type,
} from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ARITHMETIC_OPERATORS,
  ARRAY_OPERATORS,
  COMPARISON_OPERATORS,
  DATE_OPERATORS,
  LOGICAL_OPERATORS,
  STRING_OPERATORS,
} from '@/lib/mongo-query-engine'

export default function OperatorReference() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    arithmetic: false,
    string: false,
    date: false,
    comparison: false,
    logical: false,
    array: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const operatorCategories = [
    {
      id: 'arithmetic',
      label: 'Arithmetic',
      icon: Calculator,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      operators: ARITHMETIC_OPERATORS,
    },
    {
      id: 'string',
      label: 'String',
      icon: Type,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      operators: STRING_OPERATORS,
    },
    {
      id: 'date',
      label: 'Date',
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      operators: DATE_OPERATORS,
    },
    {
      id: 'comparison',
      label: 'Comparison',
      icon: GitCompare,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      operators: COMPARISON_OPERATORS,
    },
    {
      id: 'logical',
      label: 'Logical',
      icon: Braces,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      operators: LOGICAL_OPERATORS,
    },
    {
      id: 'array',
      label: 'Array',
      icon: List,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      operators: ARRAY_OPERATORS,
    },
  ]

  return (
    <ScrollArea className="h-screen">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Operator Reference
        </div>

        {operatorCategories.map((category) => (
          <Collapsible
            key={category.id}
            open={openSections[category.id]}
            onOpenChange={() => toggleSection(category.id)}
          >
            <div className="rounded-xl border border-border overflow-hidden">
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  {openSections[category.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <category.icon className={`w-4 h-4 ${category.color}`} />
                  <span className="font-medium text-sm">{category.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${category.bgColor} ${category.color}`}
                  >
                    {category.operators.length} operators
                  </span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-3 space-y-2">
                  {category.operators.map((op, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-card border border-border space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-sm font-medium ${category.color}`}
                        >
                          {op.value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {op.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {op.description}
                      </p>
                      <div className="mt-1.5 p-2 rounded bg-secondary/50 border border-border">
                        <code className="text-[10px] font-mono text-foreground/90">
                          {op.example}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}

        <div className="mt-6 p-3 rounded-lg bg-secondary/30 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 <span className="font-medium">Tip:</span> These operators can be
            used in computed fields, custom $match expressions, and aggregation
            pipelines. Click any example to see the syntax.
          </p>
        </div>
      </div>
    </ScrollArea>
  )
}
