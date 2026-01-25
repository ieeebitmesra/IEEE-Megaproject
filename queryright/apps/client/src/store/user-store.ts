import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { StateStorage } from 'zustand/middleware'
import { decryptJSON, encryptJSON } from '@/lib/encrypt'
import type { User } from '@/lib/auth-client'

export type IUser = User

interface IStore {
  user: IUser | null
  hasHydrated: boolean
  setUser: (user: IUser) => void
  logout: () => void
  updateUser: (fields: Partial<IUser>) => void
  setHasHydrated: (state: boolean) => void
}

const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = localStorage.getItem(name)
    if (!value) return null
    try {
      // Decrypt data coming OUT of storage
      const decrypted = await decryptJSON(value)
      return JSON.stringify(decrypted)
    } catch (error) {
      console.error('Failed to decrypt storage', error)
      return null
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      // Encrypt data going INTO storage
      // value is a JSON stringified version of the state
      const parsed = JSON.parse(value)
      const encrypted = await encryptJSON(parsed)
      localStorage.setItem(name, encrypted)
    } catch (error) {
      console.error('Failed to encrypt storage', error)
    }
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name)
  },
}

export const useUserStore = create<IStore>()(
  persist(
    immer((set) => ({
      user: null,
      hasHydrated: false,

      setUser: (user) => {
        set((state) => {
          state.user = user
        })
      },

      logout: () => {
        set((state) => {
          state.user = null
        })
      },

      updateUser: (fields) => {
        set((state) => {
          if (state.user) {
            Object.assign(state.user, fields)
          }
        })
      },

      setHasHydrated: (status) => {
        set({ hasHydrated: status })
      },
    })),
    {
      name: 'User',
      storage: createJSONStorage(() => SecureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
