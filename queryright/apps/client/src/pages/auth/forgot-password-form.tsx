import { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { Loader2, Mail, KeyRound, Timer } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { env } from '@/env'
import { FieldLabel, FieldError } from '@/components/ui/field'
import { ForgotPasswordSchema } from '@repo/schema'

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  }
  return `${minutes}m ${seconds}s`
}

interface ForgotPasswordDialogProps {
  DialogTrigger: React.ReactNode
}

export default function ForgotPasswordDialog({
  DialogTrigger: Trigger,
}: ForgotPasswordDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [cooldown, setCooldown] = useState(0)
  const [checkingCooldown, setCheckingCooldown] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: ForgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      if (cooldown > 0) return

      await authClient.requestPasswordReset(
        { email: value.email },
        {
          onRequest: () => setLoading(true),
          onError: (ctx) => {
            setLoading(false)
            toast.error(ctx.error.message || 'Failed to send reset email')
          },
          onSuccess: () => {
            setLoading(false)
            setIsOpen(false)
            toast.success('Reset password email sent successfully')
            setCooldown(6 * 60 * 60)
          },
        },
      )
    },
  })
  const checkCooldown = async (email: string) => {
    if (!email || !email.includes('@')) return

    setCheckingCooldown(true)
    try {
      const res = await fetch(
        `${env.VITE_SERVER_URL}/api/user/password-reset-cooldown?email=${encodeURIComponent(email)}`,
      )
      if (res.ok) {
        const data = await res.json()
        if (data.remainingSeconds > 0) {
          setCooldown(data.remainingSeconds)
        } else {
          setCooldown(0)
        }
      }
    } catch (error) {
      console.error('Failed to check cooldown', error)
    } finally {
      setCheckingCooldown(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-105 p-0 overflow-hidden bg-background border-none shadow-xl sm:rounded-2xl">
        <div className="p-8">
          <div className="mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
              <KeyRound className="w-6 h-6" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold">
                Forgot password?
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                No worries, we'll send you reset instructions.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.errors.length > 0
                return (
                  <div className="space-y-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className={cn(
                        'text-sm font-medium',
                        isInvalid && 'text-destructive',
                      )}
                    >
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={(e) => {
                          field.handleBlur()
                          checkCooldown(e.target.value)
                        }}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email"
                        className={cn(
                          'pl-10 h-11 rounded-xl bg-muted/30 border-input/60 focus:bg-background transition-all',
                          isInvalid &&
                            'border-destructive focus-visible:ring-destructive',
                        )}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                )
              }}
            />

            <Button
              type="submit"
              className="w-full h-11 rounded-xl font-semibold transition-all hover:scale-[1.01]"
              // Disable if loading, checking, or on cooldown
              disabled={loading || checkingCooldown || cooldown > 0}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : cooldown > 0 ? (
                // Show Timer State
                <div className="flex items-center gap-2 text-destructive-foreground">
                  <Timer className="w-4 h-4" />
                  <span className="tabular-nums">
                    Wait {formatTime(cooldown)}
                  </span>
                </div>
              ) : (
                'Reset password'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
