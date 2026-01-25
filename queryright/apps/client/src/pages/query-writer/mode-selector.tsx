import { Clock, Database, Layers } from 'lucide-react'
import type { Difficulty, QueryType } from './data/queries'
import { cn } from '@/lib/utils'

interface ModeSelectorProps {
  queryType: QueryType
  setQueryType: (type: QueryType) => void
  difficulty: Difficulty | 'all'
  setDifficulty: (difficulty: Difficulty | 'all') => void
  timerDuration: number
  setTimerDuration: (duration: number) => void
  disabled?: boolean
}

const timerOptions = [15, 30, 60, 120]
const difficultyOptions: Array<Difficulty | 'all'> = [
  'all',
  'basic',
  'intermediate',
  'advanced',
]

export const ModeSelector = ({
  queryType,
  setQueryType,
  difficulty,
  setDifficulty,
  timerDuration,
  setTimerDuration,
  disabled,
}: ModeSelectorProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-lg bg-card border border-border">
      {/* Query Type */}
      <div className="flex items-center gap-1 px-2">
        <button
          onClick={() => setQueryType('sql')}
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors',
            queryType === 'sql'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Database className="w-4 h-4" />
          SQL
        </button>
        <button
          onClick={() => setQueryType('mongodb')}
          disabled={disabled}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors',
            queryType === 'mongodb'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
        >
          <Layers className="w-4 h-4" />
          MongoDB
        </button>
      </div>

      <div className="w-px h-6 bg-border" />

      {/* Difficulty */}
      <div className="flex items-center gap-1 px-2">
        {difficultyOptions.map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficulty(diff)}
            disabled={disabled}
            className={cn(
              'px-3 py-1.5 rounded text-sm font-medium transition-colors capitalize',
              difficulty === diff
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="w-px h-6 bg-border" />

      {/* Timer */}
      <div className="flex items-center gap-1 px-2">
        <Clock className="w-4 h-4 text-muted-foreground mr-1" />
        {timerOptions.map((time) => (
          <button
            key={time}
            onClick={() => setTimerDuration(time)}
            disabled={disabled}
            className={cn(
              'px-3 py-1.5 rounded text-sm font-medium transition-colors',
              timerDuration === time
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}
