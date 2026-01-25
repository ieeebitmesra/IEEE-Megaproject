import { BaseCalloutPlugin } from '@platejs/callout'

import { CalloutElementStatic } from '@/pages/text-editor/components/ui/callout-node-static'

export const BaseCalloutKit = [
  BaseCalloutPlugin.withComponent(CalloutElementStatic),
]
