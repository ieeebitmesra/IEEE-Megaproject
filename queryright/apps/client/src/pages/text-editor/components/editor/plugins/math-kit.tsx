'use client'

import { EquationPlugin, InlineEquationPlugin } from '@platejs/math/react'

import {
  EquationElement,
  InlineEquationElement,
} from '@/pages/text-editor/components/ui/equation-node'

export const MathKit = [
  InlineEquationPlugin.withComponent(InlineEquationElement),
  EquationPlugin.withComponent(EquationElement),
]
