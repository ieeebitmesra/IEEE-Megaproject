import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Eye, EyeClosed } from 'lucide-react'
import { RiGithubLine, RiGoogleLine } from 'react-icons/ri'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Image } from '@unpic/react'
import { HistoryState, Link, useNavigate } from '@tanstack/react-router'
import { SignupSchema } from '@repo/schema'
import type z from 'zod'
import { authClient } from '@/lib/auth-client'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user-store'
import { env } from '@/env'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const userStore = useUserStore()
  const toggleVisibility = (id: 1 | 2) => {
    if (id === 1) {
      setIsVisible(!isVisible)
    } else {
      setIsVisible2(!isVisible2)
    }
  }
  const form = useForm({
    validators: {
      onChange: SignupSchema,
    },
    onSubmit: async ({ value }: { value: z.infer<typeof SignupSchema> }) => {
      const { data, error } = await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          username: value.username,
          name: value.name,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(value.username)}&background=random&color=fff`,
          callbackURL: '/auth/mailsent',
        },
        {
          onRequest: () => {
            setLoading(true)
          },
          onError: () => {
            setLoading(false)
          },
          onSuccess: (ctx) => {
            setLoading(false)
            form.reset()
            userStore.setUser(ctx.data.user)
            navigate({
              to: '/auth/mailsent',
              state: {
                fromApp: true,
                email: value.email,
              } as HistoryState,
            })
          },
        },
      )
      toast[error ? 'error' : 'success'](
        `${error ? 'Error creating account' : 'Welcome ' + data?.user.name} `,
        {
          description: error?.message,
          position: 'bottom-right',
          classNames: {
            content: 'flex flex-col gap-2',
          },
          style: {
            '--border-radius': 'calc(var(--radius) + 4px)',
          } as React.CSSProperties,
        },
      )
    },
  })
  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    const { error } = await authClient.signIn.social(
      {
        provider,
        callbackURL: `${env.VITE_PUBLIC_URL}/auth/callback`,
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onError: () => {
          setLoading(false)
        },
        onSuccess: () => {
          setLoading(false)
        },
      },
    )
    toast[error ? 'error' : 'success'](
      `${error ? 'Error logging in' : 'Welcome Back '} `,
      {
        description: error?.message,
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius) + 4px)',
        } as React.CSSProperties,
      },
    )
  }

  return (
    <div className="w-full flex items-center justify-center h-screen mx-auto ">
      <div className="max-w-4xl w-full">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                id="signup-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
                className="p-6 md:p-8"
              >
                <FieldGroup className="gap-3">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-balance">
                      Create your account to get started with your journey.
                    </p>
                  </div>
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field
                          data-invalid={isInvalid}
                          aria-invalid={isInvalid}
                        >
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <Input
                            disabled={loading}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Enter your name"
                            type="text"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
                  <form.Field
                    name="username"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field
                          data-invalid={isInvalid}
                          aria-invalid={isInvalid}
                        >
                          <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                          <Input
                            disabled={loading}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Enter your username"
                            type="text"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field
                          data-invalid={isInvalid}
                          aria-invalid={isInvalid}
                        >
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            disabled={loading}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Enter you email"
                            type="email"
                            required
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
                        <Field
                          data-invalid={isInvalid}
                          aria-invalid={isInvalid}
                        >
                          <div className="flex items-center">
                            <FieldLabel htmlFor={field.name}>
                              Password
                            </FieldLabel>
                          </div>
                          <InputGroup>
                            <InputGroupInput
                              disabled={loading}
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="Enter your password"
                              type={isVisible ? 'text' : 'password'}
                              required
                            />
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                variant="ghost"
                                className="cursor-pointer"
                                type="button"
                                onClick={() => toggleVisibility(1)}
                                disabled={loading}
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
                    name="confirm_password"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field
                          data-invalid={isInvalid}
                          aria-invalid={isInvalid}
                        >
                          <div className="flex items-center">
                            <FieldLabel htmlFor={field.name}>
                              Confirm Password
                            </FieldLabel>
                          </div>
                          <InputGroup>
                            <InputGroupInput
                              disabled={loading}
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="Confirm your password"
                              type={isVisible2 ? 'text' : 'password'}
                              required
                            />
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                variant="ghost"
                                className="cursor-pointer"
                                type="button"
                                onClick={() => toggleVisibility(2)}
                                disabled={loading}
                              >
                                <AnimatePresence mode="wait" initial={false}>
                                  {isVisible2 ? (
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
                    <Button type="submit" form="signup-form">
                      Create Account
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <Field className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer hover:scale-105 transition-transform duration-100 ease-in-out"
                      disabled={loading}
                      onClick={() => handleSocialSignUp('google')}
                    >
                      <RiGoogleLine />
                      <span className="sr-only">SignUp with Google</span>
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer  hover:scale-105 transition-transform duration-100 ease-in-out"
                      disabled={loading}
                      onClick={() => handleSocialSignUp('github')}
                    >
                      <RiGithubLine />
                      <span className="sr-only">SignUp with GitHub</span>
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    Already have an account?{' '}
                    <Link
                      to="/auth/login"
                      className="text-primary hover:underline"
                    >
                      Login
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  alt="3D icon"
                  layout="fullWidth"
                  loading="eager"
                  src="/3dicon.png"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{' '}
            <Link to="/terms-of-service">Terms of Service</Link> and{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </FieldDescription>
        </div>
      </div>
    </div>
  )
}
