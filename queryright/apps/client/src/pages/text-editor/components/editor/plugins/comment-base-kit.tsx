import { BaseCommentPlugin } from '@platejs/comment'

import { CommentLeafStatic } from '@/pages/text-editor/components/ui/comment-node-static'

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
]
