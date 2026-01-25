'use client'

import { createPlatePlugin } from 'platejs/react'

import { FixedToolbar } from '@/pages/text-editor/components/ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/pages/text-editor/components/ui/fixed-toolbar-buttons'

export const FixedToolbarKit = [
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
]
