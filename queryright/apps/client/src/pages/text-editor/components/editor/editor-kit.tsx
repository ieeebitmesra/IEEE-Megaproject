'use client'

import { TrailingBlockPlugin } from 'platejs'
import { useEditorRef } from 'platejs/react'
import type { Value } from 'platejs'
import type { TPlateEditor } from 'platejs/react'

import { AlignKit } from '@/pages/text-editor/components/editor/plugins/align-kit'
import { AutoformatKit } from '@/pages/text-editor/components/editor/plugins/autoformat-kit'
import { BasicBlocksKit } from '@/pages/text-editor/components/editor/plugins/basic-blocks-kit'
import { BasicMarksKit } from '@/pages/text-editor/components/editor/plugins/basic-marks-kit'
import { BlockMenuKit } from '@/pages/text-editor/components/editor/plugins/block-menu-kit'
import { BlockPlaceholderKit } from '@/pages/text-editor/components/editor/plugins/block-placeholder-kit'
import { CalloutKit } from '@/pages/text-editor/components/editor/plugins/callout-kit'
import { CodeBlockKit } from '@/pages/text-editor/components/editor/plugins/code-block-kit'
import { ColumnKit } from '@/pages/text-editor/components/editor/plugins/column-kit'
import { CommentKit } from '@/pages/text-editor/components/editor/plugins/comment-kit'
import { CursorOverlayKit } from '@/pages/text-editor/components/editor/plugins/cursor-overlay-kit'
import { DiscussionKit } from '@/pages/text-editor/components/editor/plugins/discussion-kit'
import { DndKit } from '@/pages/text-editor/components/editor/plugins/dnd-kit'
import { DocxKit } from '@/pages/text-editor/components/editor/plugins/docx-kit'
import { EmojiKit } from '@/pages/text-editor/components/editor/plugins/emoji-kit'
import { ExitBreakKit } from '@/pages/text-editor/components/editor/plugins/exit-break-kit'
import { FixedToolbarKit } from '@/pages/text-editor/components/editor/plugins/fixed-toolbar-kit'
import { FloatingToolbarKit } from '@/pages/text-editor/components/editor/plugins/floating-toolbar-kit'
import { FontKit } from '@/pages/text-editor/components/editor/plugins/font-kit'
import { LineHeightKit } from '@/pages/text-editor/components/editor/plugins/line-height-kit'
import { LinkKit } from '@/pages/text-editor/components/editor/plugins/link-kit'
import { ListKit } from '@/pages/text-editor/components/editor/plugins/list-kit'
import { MarkdownKit } from '@/pages/text-editor/components/editor/plugins/markdown-kit'
import { MathKit } from '@/pages/text-editor/components/editor/plugins/math-kit'
import { MediaKit } from '@/pages/text-editor/components/editor/plugins/media-kit'
import { MentionKit } from '@/pages/text-editor/components/editor/plugins/mention-kit'
import { SlashKit } from '@/pages/text-editor/components/editor/plugins/slash-kit'
import { SuggestionKit } from '@/pages/text-editor/components/editor/plugins/suggestion-kit'
import { TableKit } from '@/pages/text-editor/components/editor/plugins/table-kit'
import { TocKit } from '@/pages/text-editor/components/editor/plugins/toc-kit'
import { ToggleKit } from '@/pages/text-editor/components/editor/plugins/toggle-kit'

export const EditorKit = [
  ...BasicBlocksKit,
  ...CodeBlockKit,
  ...TableKit,
  ...ToggleKit,
  ...TocKit,
  ...MediaKit,
  ...CalloutKit,
  ...ColumnKit,
  ...MathKit,
  ...LinkKit,
  ...MentionKit,

  // Marks
  ...BasicMarksKit,
  ...FontKit,

  // Block Style
  ...ListKit,
  ...AlignKit,
  ...LineHeightKit,

  // Collaboration
  ...DiscussionKit,
  ...CommentKit,
  ...SuggestionKit,

  // Editing
  ...SlashKit,
  ...AutoformatKit,
  ...CursorOverlayKit,
  ...BlockMenuKit,
  ...DndKit,
  ...EmojiKit,
  ...ExitBreakKit,
  TrailingBlockPlugin,

  // Parsers
  ...DocxKit,
  ...MarkdownKit,

  // UI
  ...BlockPlaceholderKit,
  ...FixedToolbarKit,
  ...FloatingToolbarKit,
]

export type MyEditor = TPlateEditor<Value, (typeof EditorKit)[number]>

export const useEditor = () => useEditorRef<MyEditor>()
