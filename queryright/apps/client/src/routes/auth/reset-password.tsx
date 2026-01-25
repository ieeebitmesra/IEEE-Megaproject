import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye, EyeClosed, CheckCircle2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { env } from '@/env'
import { authClient } from '@/lib/auth-client'
import { ResetPasswordSchema } from '@repo/schema'

interface SecurityQuestion {
  id: string
  text: string
}

const getSecurityQuestions = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const res = await fetch(
        `${env.VITE_SERVER_URL}/api/auth/user/security-questions`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (!res.ok) throw new Error('Failed to fetch questions')
      return (await res.json()) as SecurityQuestion[]
    } catch (error) {
      console.error('SSR Fetch Error:', error)
      return []
    }
  },
)

export const Route = createFileRoute('/auth/reset-password')({
  component: ResetPasswordPage,
  loader: async () => {
    const questions = await getSecurityQuestions()
    if (!questions || questions.length === 0) {
      throw new Error('Could not load security questions')
    }
    return { questions }
  },
  validateSearch: z.object({
    token: z.string(),
  }),
  onError: () => {
    throw redirect({ to: '/' })
  },
})

function ResetPasswordPage() {
  const { questions } = Route.useLoaderData()
  const { token } = Route.useSearch()
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') setIsVisible(!isVisible)
    else setIsVisibleConfirm(!isVisibleConfirm)
  }

  const form = useForm({
    defaultValues: {
      questionId: '',
      answer: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: ResetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.resetPassword(
        {
          token,
          newPassword: `${value.password}?question="${value.questionId}"?ans="${value.answer}"`,
        },
        {
          onRequest: () => {
            setLoading(true)
          },
          onError: (ctx) => {
            setLoading(false)
            toast.error('Error updating password', {
              description:
                ctx.error.error || ctx.error.message || 'Something went wrong.',
              position: 'bottom-right',
            })
          },
          onSuccess: () => {
            setLoading(false)
            toast.success('Password Updated', {
              description: 'Your password has been changed successfully.',
              position: 'bottom-right',
            })
            setIsSuccess(true)
            navigate({ to: '/auth/login' })
          },
        },
      )
    },
  })

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md shadow-lg border-none animate-in fade-in zoom-in-95 duration-300">
          <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Password Reset!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your password has been updated successfully.
            </p>
            <Link className="w-full" to="/auth/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-muted/30 p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Reset Password
            </CardTitle>
            <CardDescription>
              Verify your identity and choose a new password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-5"
            >
              <FieldGroup className="gap-4">
                <form.Field
                  name="questionId"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} aria-invalid={isInvalid}>
                        <FieldLabel>Security Question</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(val) => field.handleChange(val)}
                        >
                          <SelectTrigger
                            className={cn(isInvalid && 'border-destructive')}
                          >
                            <SelectValue placeholder="Select a question" />
                          </SelectTrigger>
                          <SelectContent>
                            {questions.map((q) => (
                              <SelectItem key={q.id} value={q.id}>
                                {q.text}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="answer"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} aria-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Answer</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter your answer"
                          disabled={loading}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} aria-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          New Password
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Min 8 characters"
                            type={isVisible ? 'text' : 'password'}
                            disabled={loading}
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              variant="ghost"
                              type="button"
                              onClick={() => toggleVisibility('password')}
                              disabled={loading}
                              className="cursor-pointer"
                            >
                              <AnimatePresence mode="wait" initial={false}>
                                {isVisible ? (
                                  <motion.div
                                    key="eye-open"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                      duration: 0.15,
                                      type: 'spring',
                                      stiffness: 300,
                                      damping: 20,
                                    }}
                                  >
                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="eye-closed"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                      duration: 0.15,
                                      type: 'spring',
                                      stiffness: 300,
                                      damping: 20,
                                    }}
                                  >
                                    <EyeClosed className="h-5 w-5 text-muted-foreground" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} aria-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Retype password"
                            type={isVisibleConfirm ? 'text' : 'password'}
                            disabled={loading}
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              variant="ghost"
                              type="button"
                              onClick={() => toggleVisibility('confirm')}
                              disabled={loading}
                              className="cursor-pointer"
                            >
                              <AnimatePresence mode="wait" initial={false}>
                                {isVisibleConfirm ? (
                                  <motion.div
                                    key="eye-open"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                      duration: 0.15,
                                      type: 'spring',
                                      stiffness: 300,
                                      damping: 20,
                                    }}
                                  >
                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="eye-closed"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{
                                      duration: 0.15,
                                      type: 'spring',
                                      stiffness: 300,
                                      damping: 20,
                                    }}
                                  >
                                    <EyeClosed className="h-5 w-5 text-muted-foreground" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <Field>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={loading}
                  >
                    {loading ? 'Updating Password...' : 'Reset Password'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
