import { BaseColumnItemPlugin, BaseColumnPlugin } from '@platejs/layout'

import {
  ColumnElementStatic,
  ColumnGroupElementStatic,
} from '@/pages/text-editor/components/ui/column-node-static'

export const BaseColumnKit = [
  BaseColumnPlugin.withComponent(ColumnGroupElementStatic),
  BaseColumnItemPlugin.withComponent(ColumnElementStatic),
]
