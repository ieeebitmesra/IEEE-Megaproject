import { useCallback, useEffect, useState } from 'react'
import { Stats } from './stats'
import { ModeSelector } from './mode-selector'
import { QueryDisplay } from './query-display'
import { Results } from './results'
import type { Difficulty, QueryType } from './data/queries'
import { useTypingTest } from '@/hooks/useTypingTest'
import { useTheme } from '@/store/theme-store'

export const TypingTest = () => {
  const theme = useTheme()
  const [queryType, setQueryType] = useState<QueryType>('sql')
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [timerDuration, setTimerDuration] = useState(30)
  const [isFocused, setIsFocused] = useState(false)

  const {
    fullText,
    charStates,
    currentCharIndex,
    isActive,
    isComplete,
    stats,
    timeLeft,
    wpmHistory,
    handleKeyDown,
    restart,
  } = useTypingTest(queryType, difficulty, timerDuration)

  const handleRestart = useCallback(() => {
    restart()
    setIsFocused(true)
  }, [restart])

  // Handle global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        handleRestart()
      }
      if (e.key === 'Escape') {
        handleRestart()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleRestart])

  // Handle mode changes
  const handleQueryTypeChange = (type: QueryType) => {
    setQueryType(type)
  }

  const handleDifficultyChange = (diff: Difficulty | 'all') => {
    setDifficulty(diff)
  }

  const handleTimerChange = (duration: number) => {
    setTimerDuration(duration)
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      <ModeSelector
        queryType={queryType}
        setQueryType={handleQueryTypeChange}
        difficulty={difficulty}
        setDifficulty={handleDifficultyChange}
        timerDuration={timerDuration}
        setTimerDuration={handleTimerChange}
        disabled={isActive}
      />

      {!isComplete && (
        <Stats
          wpm={stats.wpm}
          cpm={stats.cpm}
          accuracy={stats.accuracy}
          errors={stats.errors}
          timeLeft={timeLeft}
          showTime={true}
        />
      )}

      {isComplete ? (
        <Results
          stats={stats}
          timerDuration={timerDuration}
          onRestart={handleRestart}
          wpmHistory={wpmHistory}
          theme={theme}
        />
      ) : (
        <>
          <QueryDisplay
            text={fullText}
            charStates={charStates}
            currentIndex={currentCharIndex}
            onKeyDown={handleKeyDown}
            isComplete={isComplete}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <p className="text-sm text-muted-foreground text-center">
            Press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
              Tab
            </kbd>{' '}
            or{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
              Esc
            </kbd>{' '}
            to restart •{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">
              Enter
            </kbd>{' '}
            for newlines
          </p>
        </>
      )}
    </div>
  )
}
