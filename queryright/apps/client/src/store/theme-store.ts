import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { setThemeServerFn } from '@/lib/theme'

export type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  isInitialized: boolean
  setTheme: (theme: Theme) => Promise<void>
  initializeTheme: (initialTheme: Theme) => void
  toggleTheme: () => Promise<void>
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isInitialized: false,

      initializeTheme: (initialTheme: Theme) => {
        set({ theme: initialTheme, isInitialized: true })
        // Update DOM
        if (typeof document !== 'undefined') {
          document.documentElement.className = initialTheme
        }
      },

      setTheme: async (theme: Theme) => {
        // Update store
        set({ theme })

        // Update DOM immediately for instant visual feedback
        if (typeof document !== 'undefined') {
          document.documentElement.className = theme
        }

        // Persist to server
        try {
          await setThemeServerFn({ data: theme })
        } catch (error) {
          console.error('Failed to persist theme to server:', error)
        }
      },

      toggleTheme: async () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        await get().setTheme(newTheme)
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)

// Selector hooks for better performance
export const useTheme = () => useThemeStore((state) => state.theme)
export const useSetTheme = () => useThemeStore((state) => state.setTheme)
export const useToggleTheme = () => useThemeStore((state) => state.toggleTheme)
export const useIsThemeInitialized = () =>
  useThemeStore((state) => state.isInitialized)
