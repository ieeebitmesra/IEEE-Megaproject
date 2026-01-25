import { redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/user-store'

export const authMiddleware = createIsomorphicFn()
  .server(async ({ location }) => {
    let user = null

    try {
      const request = getRequest()
      const cookie = request.headers.get('cookie')

      const { data } = await authClient.getSession({
        fetchOptions: {
          headers: {
            cookie: cookie || '',
          },
        },
      })
      user = data?.user || null
    } catch (error) {
      console.error('Server Auth Error:', error)
      user = null
    }

    const pathName = location.pathname
    const isAuthPath =
      pathName.startsWith('/auth/login') || pathName.startsWith('/auth/signup')
    if (!user && !isAuthPath) {
      throw redirect({
        to: '/auth/signup',
      })
    }
    if (user && isAuthPath) {
      throw redirect({
        to: '/',
      })
    }

    return { user }
  })
  .client(async ({ location }) => {
    let user = null

    try {
      const { data } = await authClient.getSession()
      user = data?.user || null
    } catch (error) {
      console.warn('Client Auth Fetch Failed, checking store...', error)

      try {
        const userState = useUserStore.getState()
        user = userState.user || null
      } catch (storeError) {
        user = null
      }
    }

    const pathName = location.pathname
    const isAuthPath =
      pathName.startsWith('/auth/login') || pathName.startsWith('/auth/signup')

    if (!user && !isAuthPath) {
      throw redirect({
        to: '/auth/signup',
      })
    }

    if (user && isAuthPath) {
      throw redirect({
        to: '/',
      })
    }

    return { user }
  })
