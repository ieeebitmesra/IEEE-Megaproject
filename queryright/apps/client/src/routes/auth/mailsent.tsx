import { createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { createServerFn } from '@tanstack/react-start'
import { Suspense, lazy, useState, useEffect } from 'react'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { authClient } from '@/lib/auth-client'
import useUser from '@/hooks/use-user'
import { toast } from 'sonner'
import { env } from '@/env'
import { motion } from 'motion/react'
import { Hourglass } from 'lucide-react'
import { MailSentStateSchema } from '@repo/schema'

const Lottie = lazy(() => import('lottie-react'))

const EMAIL_BACKOFF_SCHEDULE = [
  0, 30, 120, 300, 3600, 7200, 14400, 28800, 57600, 86400, 604800,
]

const getLottieJson = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const filePath = resolve(process.cwd(), 'public/lottie/emailSent.json')
    const fileContent = await readFile(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Failed to read Lottie file on server:', error)
    return null
  }
})

const getBackoffStatus = createServerFn({ method: 'GET' })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    try {
      const BACKEND_URL = `${env.VITE_SERVER_URL}/api/auth`

      const res = await fetch(
        `${BACKEND_URL}/user/email-cooldown?email=${encodeURIComponent(email)}`,
      )

      if (!res.ok) return { remainingSeconds: 0, nextRetryCount: 0 }

      return (await res.json()) as {
        remainingSeconds: number
        nextRetryCount: number
      }
    } catch (e) {
      console.error('Failed to fetch backoff status:', e)
      return { remainingSeconds: 0, nextRetryCount: 0 }
    }
  })

export const Route = createFileRoute('/auth/mailsent')({
  component: EmailSent,
  beforeLoad: ({ location }) => {
    const result = MailSentStateSchema.safeParse(location.state)
    if (!result.success) {
      throw redirect({ to: '/' })
    }
    return { userEmail: result.data.email }
  },
  loader: async ({ context }) => {
    const [animationData, backoff] = await Promise.all([
      getLottieJson(),
      getBackoffStatus({ data: context.userEmail }),
    ])
    return { animationData, backoff }
  },
})

function EmailSent() {
  const { animationData, backoff } = Route.useLoaderData()
  const { userEmail } = Route.useRouteContext()
  const { user } = useUser()

  const [loading, setLoading] = useState(false)

  const [cooldown, setCooldown] = useState(backoff.remainingSeconds)
  const [currentRetryCount, setCurrentRetryCount] = useState(
    backoff.nextRetryCount,
  )

  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(
      () => setCooldown((prev) => Math.max(0, prev - 1)),
      1000,
    )
    return () => clearInterval(interval)
  }, [cooldown])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleEmailSend = async () => {
    setLoading(true)
    await authClient.sendVerificationEmail(
      {
        email: userEmail ?? user?.email,
      },
      {
        onRequest: () => setLoading(true),
        onError: (ctx) => {
          setLoading(false)
          toast.error(ctx.error.message || 'Error sending email')
        },
        onSuccess: () => {
          setLoading(false)
          toast.success('Email sent successfully. Check your inbox')
          const nextIndex = Math.min(
            currentRetryCount,
            EMAIL_BACKOFF_SCHEDULE.length - 1,
          )
          const nextWait = EMAIL_BACKOFF_SCHEDULE[nextIndex]

          setCooldown(nextWait)
          setCurrentRetryCount((prev) => prev + 1)
        },
      },
    )
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-background flex-col overflow-hidden">
      <div className="w-64 h-64">
        <Suspense
          fallback={
            <div className="w-full h-full bg-muted/20 animate-pulse rounded-full" />
          }
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </Suspense>
      </div>

      <div className="w-full h-1/3 flex justify-center items-center flex-col">
        <h1 className="text-3xl p-4 font-extrabold">Email sent successfully</h1>
        <h2 className="text-2xl p-2 font-semibold text-muted-foreground text-center">
          Please check your inbox for verification email
        </h2>
        <h2 className="text-md p-2 font-semibold text-accent-foreground/40 text-center">
          If you did not receive verification email, please check your spam
          folder
        </h2>
      </div>

      <div>
        <Button
          className="w-full h-10 bg-secondary text-primary hover:text-white/80 rounded-2xl cursor-pointer p-8 min-w-50"
          onClick={handleEmailSend}
          disabled={loading || cooldown > 0}
        >
          {loading ? (
            'Sending...'
          ) : cooldown > 0 ? (
            <>
              <div className="flex items-center gap-2 font-medium tabular-nums">
                <motion.div
                  animate={{ rotate: cooldown % 2 === 0 ? 0 : 180 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    mass: 1,
                  }}
                >
                  <Hourglass className="w-4 h-4" />
                </motion.div>

                <span>Resend in {formatTime(cooldown)}</span>
              </div>
            </>
          ) : (
            'Resend Email'
          )}
        </Button>
      </div>
    </div>
  )
}
