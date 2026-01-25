'use client'

import { CaptionPlugin } from '@platejs/caption/react'
import { ImagePlugin, PlaceholderPlugin } from '@platejs/media/react'
import { KEYS } from 'platejs'

import { ImageElement } from '@/pages/text-editor/components/ui/media-image-node'
import { PlaceholderElement } from '@/pages/text-editor/components/ui/media-placeholder-node'
import { MediaPreviewDialog } from '@/pages/text-editor/components/ui/media-preview-dialog'
import { MediaUploadToast } from '@/pages/text-editor/components/ui/media-upload-toast'

export const MediaKit = [
  ImagePlugin.configure({
    options: { disableUploadInsert: true },
    render: { afterEditable: MediaPreviewDialog, node: ImageElement },
  }),

  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: MediaUploadToast, node: PlaceholderElement },
  }),
  CaptionPlugin.configure({
    options: {
      query: {
        allow: [KEYS.img],
      },
    },
  }),
]
