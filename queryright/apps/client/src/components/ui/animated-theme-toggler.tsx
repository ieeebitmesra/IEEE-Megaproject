import { useCallback, useEffect, useRef } from 'react'
import { TbCircleHalf2 } from 'react-icons/tb'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'
import { useTheme, useToggleTheme } from '@/store/theme-store'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const theme = useTheme()
  const toggleThemeStore = useToggleTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isDark = theme === 'dark'

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleThemeStore()
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }, [toggleThemeStore, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      <TbCircleHalf2 size={18} />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
