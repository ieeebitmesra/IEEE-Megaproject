'use client'

import { TogglePlugin } from '@platejs/toggle/react'

import { IndentKit } from '@/pages/text-editor/components/editor/plugins/indent-kit'
import { ToggleElement } from '@/pages/text-editor/components/ui/toggle-node'

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
]
