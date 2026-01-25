'use client'

import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { Eye, EyeClosed, Key } from 'lucide-react'
import { RiGithubLine, RiGoogleLine } from 'react-icons/ri'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Image } from '@unpic/react'
import { Link, useNavigate } from '@tanstack/react-router'
import { LoginSchema } from '@repo/schema'
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
import { Checkbox } from '@/components/ui/checkbox'
import { LoaderOne } from '@/components/ui/loader'
import { useUserStore } from '@/store/user-store'
import ForgotPasswordDialog from './forgot-password-form'
import { env } from '@/env'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState(false)
  const userStore = useUserStore()
  const toggleVisibility = () => setIsVisible((prev) => !prev)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      remember_me: true,
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }: { value: z.infer<typeof LoginSchema> }) => {
      if (value.username !== '') {
        const { data, error } = await authClient.signIn.username(
          {
            username: value.username,
            password: value.password,
            rememberMe: value.remember_me,
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
              userStore.setUser(ctx.data.user)
              navigate({
                to: '/dashboard/$id',
                params: {
                  id: ctx.data.user.id,
                },
              })
            },
          },
        )
        toast[error ? 'error' : 'success'](
          `${error ? 'Error logging in' : 'Welcome Back ' + data?.user.name} `,
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
      if (value.email !== '') {
        const { data, error } = await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
            rememberMe: value.remember_me,
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
                to: '/dashboard/$id',
                params: {
                  id: ctx.data.user.id,
                },
              })
            },
          },
        )
        toast[error ? 'error' : 'success'](
          `${error ? 'Error logging in' : 'Welcome Back ' + data?.user.name} `,
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
    },
  })

  const handleSocialLogin = async (provider: 'google' | 'github') => {
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
  const handlePassKeyLogin = async () => {
    const { data, error } = await authClient.signIn.passkey({
      autoFill: true,
      fetchOptions: {
        onError() {
          setLoading(false)
        },
        onRequest() {
          setLoading(true)
        },
        onSuccess(ctx) {
          setLoading(false)
          userStore.setUser(ctx.data.user)
          navigate({
            to: '/dashboard/$id',
            params: {
              id: ctx.data.user.id,
            },
          })
        },
      },
    })
    toast[error ? 'error' : 'success'](
      `${error ? 'Error logging in' : 'Welcome Back ' + data?.user.name} `,
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
    <div className="w-full flex items-center justify-center h-screen mx-auto">
      <div className="max-w-4xl w-full">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                id="login-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
                className="p-6 md:p-8"
              >
                <FieldGroup className="gap-3">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your account to continue.
                    </p>
                  </div>
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
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      )
                    }}
                  />
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    OR
                  </FieldSeparator>
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
                            <ForgotPasswordDialog
                              DialogTrigger={
                                <span className="ml-auto text-sm underline-offset-2 hover:underline">
                                  Forgot your password?
                                </span>
                              }
                            />
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
                                onClick={toggleVisibility}
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
                    name="remember_me"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <FieldGroup data-slot="checkbox-group">
                          <Field
                            orientation="horizontal"
                            data-invalid={isInvalid}
                          >
                            <Checkbox
                              id="remember_me"
                              name={field.name}
                              checked={!!field.state.value}
                              onCheckedChange={(checked) =>
                                field.handleChange(checked === true)
                              }
                            />
                            <FieldLabel
                              htmlFor="remember_me"
                              className="font-normal"
                            >
                              Remember me
                            </FieldLabel>
                          </Field>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </FieldGroup>
                      )
                    }}
                  />
                  <Field>
                    <Button
                      type="submit"
                      form="login-form"
                      disabled={loading}
                      className="flex items-center-safe justify-center mx-auto my-auto"
                    >
                      {loading ? <LoaderOne /> : 'Login'}
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <Field>
                    <Button
                      variant="secondary"
                      className="gap-2 w-full grid-cols-2"
                      type="button"
                      onClick={handlePassKeyLogin}
                    >
                      <Key size={16} />
                      Sign-in with Passkey
                    </Button>
                  </Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer hover:scale-105 transition-transform duration-100 ease-in-out"
                      onClick={() => handleSocialLogin('google')}
                      disabled={loading}
                    >
                      <RiGoogleLine />
                      <span className="sr-only">Login with Google</span>
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer  hover:scale-105 transition-transform duration-100 ease-in-out"
                      onClick={() => handleSocialLogin('github')}
                      disabled={loading}
                    >
                      <RiGithubLine />
                      <span className="sr-only">Login with GitHub</span>
                    </Button>
                  </Field>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{' '}
                    <Link
                      to="/auth/signup"
                      className="text-primary hover:underline"
                    >
                      Sign up
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
