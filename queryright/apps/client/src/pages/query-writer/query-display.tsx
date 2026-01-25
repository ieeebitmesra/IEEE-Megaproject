import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface QueryDisplayProps {
  text: string
  charStates: Array<'correct' | 'incorrect' | 'pending'>
  currentIndex: number
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  isComplete: boolean
  isFocused: boolean
  onFocus: () => void
  onBlur: () => void
}

export const QueryDisplay = ({
  text,
  charStates,
  currentIndex,
  onKeyDown,
  isComplete,
  isFocused,
  onFocus,
  onBlur,
}: QueryDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFocused && containerRef.current) {
      containerRef.current.focus()
    }
  }, [isFocused])

  const renderChar = (char: string, index: number) => {
    const state = charStates[index]
    const isCurrent = index === currentIndex
    const isNewline = char === '\n'

    if (isNewline) {
      return (
        <span key={index} className="relative">
          {isCurrent && !isComplete && (
            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary caret-blink" />
          )}
          <br />
        </span>
      )
    }

    return (
      <span
        key={index}
        className={cn(
          'relative transition-colors-fast',
          state === 'correct' && 'text-success',
          state === 'incorrect' &&
            'text-destructive bg-destructive/20 rounded-sm',
          state === 'pending' && 'text-muted-foreground',
        )}
      >
        {isCurrent && !isComplete && (
          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary caret-blink" />
        )}
        {char}
      </span>
    )
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        'relative p-6 md:p-8 rounded-xl bg-card border-2 transition-all duration-200 outline-none cursor-text',
        isFocused ? 'border-primary/50 typing-focus' : 'border-border',
        isComplete && 'opacity-75',
      )}
    >
      {!isFocused && !isComplete && (
        <div className="absolute inset-0 bg-card/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
          <p className="text-muted-foreground text-lg p-8">
            Click here or press any key to start typing
          </p>
        </div>
      )}

      <pre className="font-mono text-base md:text-lg leading-relaxed whitespace-pre-wrap">
        <code>{text.split('').map(renderChar)}</code>
      </pre>
    </div>
  )
}
