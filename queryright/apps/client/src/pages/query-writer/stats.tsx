import { cn } from '@/lib/utils'

interface StatsProps {
  wpm: number
  cpm: number
  accuracy: number
  errors: number
  timeLeft?: number
  showTime?: boolean
  className?: string
}

export const Stats = ({
  wpm,
  cpm,
  accuracy,
  errors,
  timeLeft,
  showTime = true,
  className,
}: StatsProps) => {
  return (
    <div className={cn('flex items-center gap-8 font-mono', className)}>
      {showTime && timeLeft !== undefined && (
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{timeLeft}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Time
          </div>
        </div>
      )}
      <div className="text-center">
        <div className="text-3xl font-bold text-foreground">{wpm}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          WPM
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-foreground">{cpm}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          CPM
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-foreground">{accuracy}%</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          ACC
        </div>
      </div>
      <div className="text-center">
        <div
          className={cn(
            'text-3xl font-bold',
            errors > 0 ? 'text-destructive' : 'text-foreground',
          )}
        >
          {errors}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Errors
        </div>
      </div>
    </div>
  )
}
