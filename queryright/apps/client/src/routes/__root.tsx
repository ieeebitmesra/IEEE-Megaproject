import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import Header from '../components/Header'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { getThemeServerFn } from '@/lib/theme'
import { MDXLayoutProvider } from '@/components/mdx-provider'
import { Toaster } from '@/components/ui/sonner'
import { storeServerFn } from '@/middlewares/store-middleware'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'QweryWrite - Practice Made Easy',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  }),
  beforeLoad: () => storeServerFn(),
  loader: () => getThemeServerFn(),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = Route.useLoaderData()
  return (
    <html className={theme} lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
        <script src="https://unpkg.com/mingo@7.1.0/dist/mingo.min.js" />
      </head>
      <body>
        <Header />
        <ThemeProvider theme={theme}>
          <MDXLayoutProvider>
            {children}
            <Toaster />
          </MDXLayoutProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
            formDevtoolsPlugin(),
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
