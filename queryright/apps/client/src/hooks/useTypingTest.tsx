import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  Difficulty,
  Query,
  QueryType,
} from '@/pages/query-writer/data/queries'
import { getQueriesForTimer } from '@/pages/query-writer/data/queries'

export interface Stats {
  wpm: number
  cpm: number
  accuracy: number
  errors: number
  correctChars: number
  totalChars: number
}

export interface WpmDataPoint {
  second: number
  wpm: number
  errors: number
  raw: number
}

export interface TypingTestState {
  queries: Array<Query>
  currentCharIndex: number
  userInput: string
  isActive: boolean
  isComplete: boolean
  startTime: number | null
  endTime: number | null
  stats: Stats
  charStates: Array<'correct' | 'incorrect' | 'pending'>
  timeLeft: number
  timerDuration: number
  wpmHistory: Array<WpmDataPoint>
}

const initialStats: Stats = {
  wpm: 0,
  cpm: 0,
  accuracy: 0,
  errors: 0,
  correctChars: 0,
  totalChars: 0,
}

// Helper to count leading whitespace after a newline
const getLeadingWhitespaceLength = (
  text: string,
  startIndex: number,
): number => {
  let count = 0
  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === ' ' || text[i] === '\t') {
      count++
    } else {
      break
    }
  }
  return count
}

export const useTypingTest = (
  queryType: QueryType,
  difficulty: Difficulty | 'all',
  timerDuration: number,
) => {
  const [state, setState] = useState<TypingTestState>({
    queries: [],
    currentCharIndex: 0,
    userInput: '',
    isActive: false,
    isComplete: false,
    startTime: null,
    endTime: null,
    stats: initialStats,
    charStates: [],
    timeLeft: timerDuration,
    timerDuration,
    wpmHistory: [],
  })

  const timerRef = useRef<number | null>(null)
  const wpmHistoryRef = useRef<Array<WpmDataPoint>>([])
  const lastSecondRef = useRef<number>(0)

  const getCurrentQuery = useCallback((): string => {
    if (state.queries.length === 0) return ''
    return state.queries.map((q) => q.text).join('\n\n')
  }, [state.queries])

  const initializeTest = useCallback(() => {
    const difficultyFilter = difficulty === 'all' ? undefined : difficulty
    const queries = getQueriesForTimer(
      queryType,
      timerDuration,
      difficultyFilter,
    )
    const fullText = queries.map((q) => q.text).join('\n\n')

    wpmHistoryRef.current = []
    lastSecondRef.current = 0

    setState({
      queries,
      currentCharIndex: 0,
      userInput: '',
      isActive: false,
      isComplete: false,
      startTime: null,
      endTime: null,
      stats: initialStats,
      charStates: Array(fullText.length).fill('pending'),
      timeLeft: timerDuration,
      timerDuration,
      wpmHistory: [],
    })

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [queryType, difficulty, timerDuration])

  useEffect(() => {
    initializeTest()
  }, [initializeTest])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const calculateStats = useCallback(
    (
      charStates: Array<'correct' | 'incorrect' | 'pending'>,
      startTime: number | null,
      currentTime: number,
    ): Stats => {
      const correctChars = charStates.filter((s) => s === 'correct').length
      const incorrectChars = charStates.filter((s) => s === 'incorrect').length
      const totalTyped = correctChars + incorrectChars

      const elapsedMinutes = startTime
        ? (currentTime - startTime) / 1000 / 60
        : 0

      const wpm =
        elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0
      const cpm =
        elapsedMinutes > 0 ? Math.round(correctChars / elapsedMinutes) : 0
      const accuracy =
        totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100

      return {
        wpm,
        cpm,
        accuracy,
        errors: incorrectChars,
        correctChars,
        totalChars: totalTyped,
      }
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (state.isComplete) return

      const fullText = getCurrentQuery()
      if (!fullText) return

      // Start timer on first keypress
      if (!state.isActive && e.key.length === 1) {
        const now = Date.now()
        setState((prev) => ({
          ...prev,
          isActive: true,
          startTime: now,
        }))

        timerRef.current = window.setInterval(() => {
          setState((prev) => {
            const newTimeLeft = prev.timeLeft - 1
            const elapsedSeconds = prev.timerDuration - newTimeLeft

            // Record WPM data point each second
            if (prev.startTime) {
              const correctChars = prev.charStates.filter(
                (s) => s === 'correct',
              ).length
              const incorrectChars = prev.charStates.filter(
                (s) => s === 'incorrect',
              ).length
              const totalTyped = correctChars + incorrectChars
              const elapsedMinutes = elapsedSeconds / 60
              const wpm =
                elapsedMinutes > 0
                  ? Math.round(correctChars / 5 / elapsedMinutes)
                  : 0
              const raw =
                elapsedMinutes > 0
                  ? Math.round(totalTyped / 5 / elapsedMinutes)
                  : 0

              wpmHistoryRef.current.push({
                second: elapsedSeconds,
                wpm,
                errors: incorrectChars,
                raw,
              })
            }

            if (newTimeLeft <= 0) {
              if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
              }
              return {
                ...prev,
                timeLeft: 0,
                isComplete: true,
                isActive: false,
                endTime: Date.now(),
                wpmHistory: [...wpmHistoryRef.current],
              }
            }
            return { ...prev, timeLeft: newTimeLeft }
          })
        }, 1000)
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        if (state.currentCharIndex > 0) {
          setState((prev) => {
            const newCharStates = [...prev.charStates]
            newCharStates[prev.currentCharIndex - 1] = 'pending'
            const newStats = calculateStats(
              newCharStates,
              prev.startTime,
              Date.now(),
            )
            return {
              ...prev,
              currentCharIndex: prev.currentCharIndex - 1,
              userInput: prev.userInput.slice(0, -1),
              charStates: newCharStates,
              stats: newStats,
            }
          })
        }
        return
      }

      if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault()
        if (e.key === 'Tab' && e.shiftKey) {
          return
        }
        if (e.key === 'Escape' || (e.key === 'Tab' && state.isActive)) {
          initializeTest()
        }
        return
      }

      // Handle Enter key as newline - auto-skip indentation
      if (e.key === 'Enter') {
        e.preventDefault()
        const expectedChar = fullText[state.currentCharIndex]
        if (expectedChar === '\n') {
          setState((prev) => {
            const newCharStates = [...prev.charStates]
            let newIndex = prev.currentCharIndex + 1

            // Mark the newline as correct
            newCharStates[prev.currentCharIndex] = 'correct'

            // Auto-skip leading whitespace on the new line
            const whitespaceLength = getLeadingWhitespaceLength(
              fullText,
              newIndex,
            )
            for (let i = 0; i < whitespaceLength; i++) {
              newCharStates[newIndex + i] = 'correct'
            }
            newIndex += whitespaceLength

            const newStats = calculateStats(
              newCharStates,
              prev.startTime,
              Date.now(),
            )
            const isComplete = newIndex >= fullText.length

            if (isComplete && timerRef.current) {
              clearInterval(timerRef.current)
              timerRef.current = null
            }

            return {
              ...prev,
              currentCharIndex: newIndex,
              userInput: prev.userInput + '\n' + ' '.repeat(whitespaceLength),
              charStates: newCharStates,
              stats: newStats,
              isComplete,
              isActive: !isComplete,
              endTime: isComplete ? Date.now() : null,
              wpmHistory: isComplete
                ? [...wpmHistoryRef.current]
                : prev.wpmHistory,
            }
          })
        }
        return
      }

      // Only process printable characters
      if (e.key.length !== 1) return

      e.preventDefault()

      const expectedChar = fullText[state.currentCharIndex]
      const isCorrect = e.key === expectedChar

      setState((prev) => {
        const newCharStates = [...prev.charStates]
        newCharStates[prev.currentCharIndex] = isCorrect
          ? 'correct'
          : 'incorrect'
        const newStats = calculateStats(
          newCharStates,
          prev.startTime,
          Date.now(),
        )
        const isComplete = prev.currentCharIndex + 1 >= fullText.length

        if (isComplete && timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }

        return {
          ...prev,
          currentCharIndex: prev.currentCharIndex + 1,
          userInput: prev.userInput + e.key,
          charStates: newCharStates,
          stats: newStats,
          isComplete,
          isActive: !isComplete,
          endTime: isComplete ? Date.now() : null,
          wpmHistory: isComplete ? [...wpmHistoryRef.current] : prev.wpmHistory,
        }
      })
    },
    [
      state.isComplete,
      state.isActive,
      state.currentCharIndex,
      getCurrentQuery,
      calculateStats,
      initializeTest,
    ],
  )

  return {
    ...state,
    fullText: getCurrentQuery(),
    handleKeyDown,
    restart: initializeTest,
  }
}
