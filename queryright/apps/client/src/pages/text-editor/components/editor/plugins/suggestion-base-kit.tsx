import { BaseSuggestionPlugin } from '@platejs/suggestion'

import { SuggestionLeafStatic } from '@/pages/text-editor/components/ui/suggestion-node-static'

export const BaseSuggestionKit = [
  BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
]
