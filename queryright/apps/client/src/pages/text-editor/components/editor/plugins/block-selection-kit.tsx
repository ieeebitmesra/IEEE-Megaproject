'use client'

import { BlockSelectionPlugin } from '@platejs/selection/react'
import { KEYS, getPluginTypes } from 'platejs'

import { BlockSelection } from '@/pages/text-editor/components/ui/block-selection'

export const BlockSelectionKit = [
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      enableContextMenu: true,
      isSelectable: (element) =>
        !getPluginTypes(editor, [KEYS.column, KEYS.codeLine, KEYS.td]).includes(
          element.type,
        ),
    },
    render: {
      belowRootNodes: (props) => {
        if (!props.attributes.className?.includes('slate-selectable'))
          return null

        return <BlockSelection {...(props as any)} />
      },
    },
  })),
]
