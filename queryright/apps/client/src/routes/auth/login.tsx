import { createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { LoginForm } from '@/pages/auth/login-form'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
  beforeLoad: ({ location }) => authMiddleware({ location }),
})

function RouteComponent() {
  return <LoginForm />
}
