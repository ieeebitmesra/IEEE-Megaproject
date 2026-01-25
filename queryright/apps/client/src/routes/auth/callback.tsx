import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@/lib/auth-client'
import { getCookies } from '@/utils/get-cookies'
import { useUserStore } from '@/store/user-store'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/auth/callback')({
  component: OAuthCallback,
  beforeLoad: async ({ location }) => {
    await authMiddleware({ location })
    console.log('OAuth callback route accessed with location:', location)
    try {
      const cookies = await getCookies()
      const { data, error } = await authClient.getSession({
        fetchOptions: {
          headers: {
            cookie: cookies || '',
          },
        },
      })
      if (error || !data) {
        console.error('OAuth callback error:', error)
        throw redirect({
          to: '/auth/login',
          search: {
            error: 'auth_failed',
          },
        })
      }
      return data.user
    } catch (err) {
      if (err instanceof Response) {
        throw err
      }
      console.error('OAuth callback error:', err)
      throw redirect({
        to: '/auth/login',
        search: {
          error: 'unexpected_error',
        },
      })
    }
  },
})

function OAuthCallback() {
  const userData = Route.useRouteContext()
  const userStore = useUserStore()
  const navigate = Route.useNavigate()
  useEffect(() => {
    if (userData) {
      userStore.setUser(userData)
      const timer = setTimeout(() => {
        navigate({ to: '/dashboard/$id', params: { id: userData.id } })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [userData, userStore, navigate])

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50/50 p-4 dark:bg-gray-900/50">
      <Card className="w-full max-w-md shadow-lg border-opacity-50 animate-in fade-in zoom-in duration-300">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-xl font-medium tracking-tight">
            Verifying your account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pt-4">
          {/* Animated Status Icon */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>

          <div className="w-full space-y-4 px-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground animate-pulse">
            Setting up your workspace...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
