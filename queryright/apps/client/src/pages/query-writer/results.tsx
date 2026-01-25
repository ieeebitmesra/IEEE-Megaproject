import { RotateCcw } from 'lucide-react'
import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from 'recharts'
import type { ChartConfig } from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Stats {
  wpm: number
  accuracy: number
  correctChars: number
  errors: number
}

interface WpmDataPoint {
  second: number
  wpm: number
  raw: number
  errors: number
}

interface ResultsProps {
  stats: Stats
  timerDuration: number
  onRestart: () => void
  wpmHistory: Array<WpmDataPoint>
  theme: 'light' | 'dark'
}

const chartConfig = {
  wpm: {
    label: 'WPM',
    color: 'var(--chart-1)',
  },
  raw: {
    label: 'Raw',
    color: 'var(--chart-2)',
  },
  errors: {
    label: 'Errors',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig

export const Results = ({
  stats,
  timerDuration,
  onRestart,
  wpmHistory,
  theme,
}: ResultsProps) => {
  const getWpmRating = (wpm: number) => {
    if (wpm >= 80) return { text: 'Excellent!', color: 'text-success' }
    if (wpm >= 60) return { text: 'Great!', color: 'text-primary' }
    if (wpm >= 40) return { text: 'Good', color: 'text-foreground' }
    if (wpm >= 20)
      return { text: 'Keep Practicing', color: 'text-muted-foreground' }
    return { text: 'Getting Started', color: 'text-muted-foreground' }
  }

  const rating = getWpmRating(stats.wpm)

  // Find error spikes for marking on the chart
  const errorPoints = wpmHistory.filter((point, index) => {
    if (index === 0) return point.errors > 0
    return point.errors > wpmHistory[index - 1].errors
  })

  // Calculate consistency (lower std deviation = higher consistency)
  const calculateConsistency = () => {
    if (wpmHistory.length < 2) return 100
    const wpmValues = wpmHistory.map((p) => p.wpm)
    const avg = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length
    const variance =
      wpmValues.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) /
      wpmValues.length
    const stdDev = Math.sqrt(variance)
    // Convert to percentage (lower deviation = higher consistency)
    const consistency = Math.max(0, Math.round(100 - (stdDev / avg) * 100))
    return consistency
  }

  const consistency = calculateConsistency()

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {/* Main Stats Row */}
      <div className="flex items-start gap-8 w-full">
        {/* WPM and Accuracy */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-muted-foreground text-sm">wpm</p>
            <h2 className="text-5xl font-bold text-primary">{stats.wpm}</h2>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">acc</p>
            <h3 className="text-4xl font-bold text-primary">
              {stats.accuracy}%
            </h3>
          </div>
          <div className="mt-2">
            <p className={`text-lg font-semibold ${rating.color}`}>
              {rating.text}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 h-48">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
              data={wpmHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
                vertical={false}
              />
              <XAxis
                dataKey="second"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: `${theme == 'light' ? '#fff' : '#000'}`,
                  fontSize: 12,
                }}
              />
              <YAxis
                className="text-muted-foreground"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: `${theme == 'light' ? '#fff' : '#000'}`,
                  fontSize: 12,
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) => `Second ${value}`}
                    className="text-foreground"
                  />
                }
              />
              {/* Raw WPM line (lighter) */}
              <Line
                type="monotone"
                dataKey="raw"
                stroke="var(--color-raw)"
                strokeWidth={2}
                dot={false}
                name="Raw"
              />
              {/* Actual WPM line */}
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="var(--color-wpm)"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props
                  const isError = errorPoints.some(
                    (point) => point.second === payload.second,
                  )

                  if (isError) {
                    return (
                      <Dot
                        key={payload.second}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill="var(--color-errors)"
                        stroke="var(--color-errors)"
                      />
                    )
                  }
                  return null
                }}
                name="WPM"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full text-center">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            test type
          </div>
          <div className="text-sm text-primary">time {timerDuration}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            raw
          </div>
          <div className="text-2xl font-bold text-foreground">
            {wpmHistory.length > 0
              ? wpmHistory[wpmHistory.length - 1]?.raw || 0
              : 0}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            characters
          </div>
          <div className="text-2xl font-bold text-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="text-2xl">
                  {' '}
                  {stats.correctChars}/{stats.errors}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>correct /incorrect</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            consistency
          </div>
          <div className="text-2xl font-bold text-foreground">
            {consistency}%
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            time
          </div>
          <div className="text-2xl font-bold text-foreground">
            {timerDuration}s
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <Button onClick={onRestart} size="lg" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>

        <p className="text-sm text-muted-foreground">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
            Tab
          </kbd>{' '}
          or{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
            Esc
          </kbd>{' '}
          to restart
        </p>
      </div>
    </div>
  )
}
