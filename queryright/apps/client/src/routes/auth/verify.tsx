import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useState, Suspense, lazy, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { createServerFn } from '@tanstack/react-start'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { VerifySearchSchema } from '@repo/schema'

const Lottie = lazy(() => import('lottie-react'))

const getLottieAssets = createServerFn({ method: 'GET' }).handler(async () => {
  const readLottie = async (filename: string) => {
    try {
      const filePath = resolve(process.cwd(), `public/lottie/${filename}`)
      const fileContent = await readFile(filePath, 'utf-8')
      return JSON.parse(fileContent)
    } catch (error) {
      console.error(`Failed to read ${filename}:`, error)
      return null
    }
  }
  const [verifyData, errorData] = await Promise.all([
    readLottie('verify.json'),
    readLottie('error.json'),
  ])

  return { verifyData, errorData }
})

export const Route = createFileRoute('/auth/verify')({
  component: VerifyEmailPage,
  validateSearch: (search) => VerifySearchSchema.parse(search),
  onError: () => {
    throw redirect({ to: '/' })
  },
  loader: () => getLottieAssets(),
})

function VerifyEmailPage() {
  const { token } = Route.useSearch()
  const { verifyData, errorData } = Route.useLoaderData()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleVerify = async () => {
    setLoading(true)
    setIsError(false)

    await authClient.verifyEmail(
      {
        query: { token },
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: (ctx) => {
          setLoading(false)
          toast.success('Email verified successfully!')
          navigate({
            to: '/dashboard/$id',
            params: {
              id: ctx.data.user.id,
            },
          })
        },
        onError: (ctx) => {
          setLoading(false)
          setIsError(true)
          toast.error(ctx.error.message || 'Verification failed')
          toast.info('Redirecting to home page in 15 seconds...', {
            duration: 15000,
          })

          if (timerRef.current) clearTimeout(timerRef.current)

          timerRef.current = setTimeout(() => {
            navigate({ to: '/' })
          }, 15000)
        },
      },
    )
  }

  const headingText = isError ? 'Verification Failed' : 'Verify your email'
  const subText = isError
    ? 'Something went wrong. You will be redirected shortly.'
    : 'Click the button below to confirm your email address and activate your account.'
  const currentAnimation = isError ? errorData || verifyData : verifyData

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-background overflow-hidden flex-col">
      <div className="w-full max-w-md flex justify-center items-center flex-col gap-6 p-6">
        <div className="w-48 h-48">
          <Suspense
            fallback={
              <div className="w-full h-full bg-muted/20 animate-pulse rounded-full" />
            }
          >
            {currentAnimation && (
              <Lottie
                key={isError ? 'error' : 'verify'}
                animationData={currentAnimation}
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </Suspense>
        </div>

        <h2 className="text-3xl font-extrabold text-center transition-all">
          {headingText}
        </h2>

        <span className="text-muted-foreground text-center transition-all">
          {subText}
        </span>

        {!isError ? (
          <Button
            className="w-full max-w-xs h-12 bg-secondary text-primary hover:text-white/90 hover:bg-primary rounded-2xl cursor-pointer text-lg font-semibold transition-all"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              'Verify Email'
            )}
          </Button>
        ) : (
          <Link to="/">
            <Button className="w-full max-w-xs h-12 bg-secondary text-primary hover:text-white/90 hover:bg-primary rounded-2xl cursor-pointer text-lg font-semibold transition-all px-10 py-2">
              Go to Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
