import { createAuthClient } from 'better-auth/react'
import { passkeyClient } from '@better-auth/passkey/client'
import {
  inferAdditionalFields,
  jwtClient,
  oneTapClient,
  usernameClient,
} from 'better-auth/client/plugins'
import { env } from '@/env'
import { twoFactorClient } from 'better-auth/plugins'
import { betterAuthAdditionalFieldsConfig } from '@repo/schema'

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [
    inferAdditionalFields(betterAuthAdditionalFieldsConfig),
    twoFactorClient(),
    passkeyClient(),
    usernameClient(),
    jwtClient(),
    oneTapClient({
      clientId: 'YOUR_CLIENT_ID',
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {},
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
  ],
})
export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
export const { signIn, signOut, signUp, useSession } = authClient
