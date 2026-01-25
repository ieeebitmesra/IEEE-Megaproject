import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicyContent from '../../public/privacy-policy.mdx'
import { mdxComponents } from '@/components/mdx-components'

export const Route = createFileRoute('/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="mdx-content space-y-6 text-foreground">
          <PrivacyPolicyContent components={mdxComponents} />
        </article>
      </div>
    </div>
  )
}
