import { createFileRoute } from '@tanstack/react-router'
import TermsOfServiceContent from '../../public/terms-of-service.mdx'
import { mdxComponents } from '@/components/mdx-components'

// Import the MDX file

export const Route = createFileRoute('/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="mdx-content space-y-6 text-foreground">
          <TermsOfServiceContent components={mdxComponents} />
        </article>
      </div>
    </div>
  )
}
