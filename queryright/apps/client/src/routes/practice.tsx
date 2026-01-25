import { createFileRoute } from '@tanstack/react-router'
import DatabaseQueryEditor from '@/pages/practice'

export const Route = createFileRoute('/practice')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DatabaseQueryEditor />
}
