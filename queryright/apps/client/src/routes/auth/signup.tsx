import { createFileRoute } from '@tanstack/react-router'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { SignupForm } from '@/pages/auth/signup-form'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
  beforeLoad: ({ location }) => authMiddleware({ location }),
})

function RouteComponent() {
  return <SignupForm />
}
