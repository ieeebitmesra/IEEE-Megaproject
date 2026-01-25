'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Plate, createPlateEditor } from 'platejs/react'
import { YjsPlugin } from '@platejs/yjs/react'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'
import { Editor, EditorContainer } from '../ui/editor'
import { useRoom, useSelf } from './liveblocks.config'
import { EditorKit } from './editor-kit'

export function PlateEditor() {
  const room = useRoom()
  const userInfo = useSelf((me) => me.info)
  const [isReady, setIsReady] = useState(false)
  const [isSynced, setIsSynced] = useState(false)
  const initRef = useRef(false)
  const providerRef = useRef<LiveblocksYjsProvider | null>(null)
  const ydocRef = useRef<Y.Doc | null>(null)
  const awarenessRef = useRef<Awareness | null>(null)

  // Create editor instance once
  const editor = useMemo(() => {
    if (!room) return null

    // Create Yjs instances
    const ydoc = new Y.Doc()
    const awareness = new Awareness(ydoc)

    ydocRef.current = ydoc
    awarenessRef.current = awareness

    // Set user info
    if (userInfo) {
      awareness.setLocalStateField('user', {
        name: userInfo.name || 'Anonymous',
        color: userInfo.color || '#3b82f6',
      })
    }

    // Create Liveblocks provider
    const provider = new LiveblocksYjsProvider(room, ydoc)
    providerRef.current = provider

    // Listen to provider events
    provider.on('sync', (synced: boolean) => {
      console.log('🔄 Provider sync:', synced)
      setIsSynced(synced)
    })

    provider.on('status', ({ status }: { status: string }) => {
      console.log('📡 Provider status:', status)
    })

    // Create provider wrapper
    const providerWrapper = {
      awareness,
      document: ydoc,
      type: 'liveblocks',
      connect: () => {
        console.log('🔌 Connecting provider...')
        provider.connect()
      },
      disconnect: () => {
        console.log('🔌 Disconnecting provider...')
        provider.disconnect()
      },
      destroy: () => {
        console.log('💥 Destroying provider...')
        provider.destroy()
      },
      get isConnected() {
        return provider.synced
      },
      get isSynced() {
        return provider.synced
      },
    }

    // Create editor
    const plateEditor = createPlateEditor({
      plugins: [
        ...EditorKit,
        YjsPlugin.configure({
          options: {
            cursors: {
              data: {
                name: userInfo?.name || 'Anonymous',
                color: userInfo?.color || '#3b82f6',
              },
            },
            ydoc,
            awareness,
            providers: [providerWrapper],
            onConnect: ({ type }) => {
              console.log('✅ YjsPlugin connected:', type)
            },
            onSyncChange: ({ type, isSynced }) => {
              console.log('🔄 YjsPlugin sync change:', type, isSynced)
            },
          },
        }),
      ],
      skipInitialization: true,
    })

    console.log('✅ Editor created')
    return plateEditor
  }, [room])

  // Initialize collaboration
  useEffect(() => {
    if (!editor || !room || initRef.current) return

    console.log('🚀 Initializing collaboration...')
    initRef.current = true

    const init = async () => {
      try {
        await editor.getApi(YjsPlugin).yjs.init({
          id: room.id,
          value: [
            {
              type: 'p',
              children: [{ text: 'Start typing...' }],
            },
          ],
          autoConnect: true, // This will call provider.connect()
        })

        console.log('✅ Yjs initialized, waiting for sync...')
        setIsReady(true)
      } catch (error) {
        console.error('❌ Init error:', error)
        initRef.current = false
      }
    }

    init()

    return () => {
      console.log('🧹 Cleanup')
      if (providerRef.current) {
        providerRef.current.destroy()
        providerRef.current = null
      }
      if (editor) {
        try {
          editor.getApi(YjsPlugin)?.yjs.destroy()
        } catch (e) {
          console.warn('Cleanup error:', e)
        }
      }
      initRef.current = false
      setIsReady(false)
      setIsSynced(false)
    }
  }, [editor, room])

  // Update user info when it changes
  useEffect(() => {
    if (!awarenessRef.current || !userInfo) return

    awarenessRef.current.setLocalStateField('user', {
      name: userInfo.name || 'Anonymous',
      color: userInfo.color || '#3b82f6',
    })
  }, [userInfo])

  if (!room || !editor) {
    return <div style={{ padding: '20px' }}>Loading editor...</div>
  }

  return (
    <div>
      {/* Status indicator */}
      <div
        style={{
          padding: '10px',
          background: isSynced ? '#d4edda' : '#fff3cd',
          borderBottom: '1px solid #ccc',
          fontSize: '12px',
        }}
      >
        {isSynced ? '🟢 Connected & Synced' : '🟡 Connecting...'}
      </div>

      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>
      </Plate>
    </div>
  )
}
