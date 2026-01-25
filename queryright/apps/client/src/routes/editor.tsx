import { createFileRoute } from '@tanstack/react-router'
import CodeEditor from '@/components/monaco-editor'

export const Route = createFileRoute('/editor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <CodeEditor />
    </div>
  )
}
