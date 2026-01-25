import { createMiddleware, createServerFn } from '@tanstack/react-start'
import { authClient } from '../lib/auth-client'
import { useUserStore } from '@/store/user-store'

const storeMiddleware = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const userStore = useUserStore.getState()
    if (userStore.user) {
      return next()
    }
    try {
      const { data } = await authClient.getSession()
      if (data?.user) {
        await userStore.setUser(data.user)
      }
    } catch (error) {
      console.error('Error fetching session in middleware:', error)
    }
    return next()
  },
)
export const storeServerFn = createServerFn()
  .middleware([storeMiddleware])
  .handler(async () => {
    return 'done'
  })
