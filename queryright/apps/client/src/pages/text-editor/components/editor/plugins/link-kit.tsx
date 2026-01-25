'use client'

import { LinkPlugin } from '@platejs/link/react'

import { LinkElement } from '@/pages/text-editor/components/ui/link-node'
import { LinkFloatingToolbar } from '@/pages/text-editor/components/ui/link-toolbar'

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
]
