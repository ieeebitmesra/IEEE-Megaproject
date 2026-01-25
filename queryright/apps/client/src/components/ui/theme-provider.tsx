import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import type { Theme } from '@/store/theme-store'
import { useThemeStore } from '@/store/theme-store'

type Props = PropsWithChildren<{ theme: Theme }>

export function ThemeProvider({ children, theme }: Props) {
  const initializeTheme = useThemeStore((state) => state.initializeTheme)
  const isInitialized = useThemeStore((state) => state.isInitialized)

  useEffect(() => {
    // Initialize store with server-provided theme on mount
    if (!isInitialized) {
      initializeTheme(theme)
    }
  }, [theme, initializeTheme, isInitialized])

  return <>{children}</>
}

// Re-export hooks from store for backward compatibility
export {
  useTheme,
  useSetTheme as useSetTheme,
  useToggleTheme,
} from '@/store/theme-store'
