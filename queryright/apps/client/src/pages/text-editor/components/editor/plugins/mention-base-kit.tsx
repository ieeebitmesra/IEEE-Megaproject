import { BaseMentionPlugin } from '@platejs/mention'

import { MentionElementStatic } from '@/pages/text-editor/components/ui/mention-node-static'

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
]
