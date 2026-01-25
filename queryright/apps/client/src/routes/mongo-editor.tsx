import { createFileRoute } from '@tanstack/react-router'
import MongoEditor from '@/components/mongo-editor'

export const Route = createFileRoute('/mongo-editor')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  return (
    <div className="h-[calc(100vh-64px)]">
      {/* assume header height padding */}
      <MongoEditor />
    </div>
  )
}
