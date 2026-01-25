// liveblocks-provider.ts
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import type * as Y from 'yjs'
import type { Awareness } from 'y-protocols/awareness'
import type { Room } from '@liveblocks/client'

export class LiveblocksUnifiedProvider {
  public awareness: Awareness
  public document: Y.Doc
  public type = 'liveblocks'
  private provider: LiveblocksYjsProvider
  private _isConnected = false
  private _isSynced = false

  constructor(room: Room, doc: Y.Doc, awareness: Awareness) {
    this.document = doc
    this.awareness = awareness
    this.provider = new LiveblocksYjsProvider(room, doc)

    // Listen to sync events
    this.provider.on('sync', (synced: boolean) => {
      this._isSynced = synced
      this._isConnected = synced
    })

    this.provider.on('status', ({ status }: { status: string }) => {
      this._isConnected = status === 'connected'
    })
  }

  connect(): void {
    this.provider.connect()
  }

  disconnect(): void {
    this.provider.disconnect()
  }

  destroy(): void {
    this.provider.destroy()
  }

  get isConnected(): boolean {
    return this._isConnected
  }

  get isSynced(): boolean {
    return this._isSynced
  }
}
