import { createFileRoute } from '@tanstack/react-router'
import RTE from '@/pages/text-editor/RTE'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
  // ssr: false,
})

function RouteComponent() {
  return <RTE />
}
