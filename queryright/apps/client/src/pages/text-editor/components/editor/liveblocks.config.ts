// liveblocks.config.ts
import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

const client = createClient({
  publicApiKey:
    'pk_dev_Wg39_VcSqHhi4AxZbkEfx_v0UwSrLghUQy2Qv9XbcdUC7u5AG3lEMqtgtxlIeFEy',
  // Or use authEndpoint for secure authentication:
  // authEndpoint: "/api/liveblocks-auth",
})

type UserInfo = {
  name: string
  color: string
}

export const {
  RoomProvider,
  useRoom,
  useSelf,
  useOthers,
  useMyPresence,
  useUpdateMyPresence,
} = createRoomContext<{
  presence: {}
  storage: {}
  userMeta: {
    info: UserInfo
  }
}>(client)
