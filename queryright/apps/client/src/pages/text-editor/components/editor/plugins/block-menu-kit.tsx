'use client'

import { BlockMenuPlugin } from '@platejs/selection/react'

import { BlockSelectionKit } from './block-selection-kit'
import { BlockContextMenu } from '@/pages/text-editor/components/ui/block-context-menu'

export const BlockMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
]
