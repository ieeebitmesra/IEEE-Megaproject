import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from './mdx-components'
import type { ReactNode } from 'react'

export function MDXLayoutProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}
