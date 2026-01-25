'use client'

import * as React from 'react'

import { MessageSquareTextIcon } from 'lucide-react'
import { useEditorRef } from 'platejs/react'

import { ToolbarButton } from './toolbar'
import { commentPlugin } from '@/pages/text-editor/components/editor/plugins/comment-kit'

export function CommentToolbarButton() {
  const editor = useEditorRef()

  return (
    <ToolbarButton
      onClick={() => {
        editor.getTransforms(commentPlugin).comment.setDraft()
      }}
      data-plate-prevent-overlay
      tooltip="Comment"
    >
      <MessageSquareTextIcon />
    </ToolbarButton>
  )
}
