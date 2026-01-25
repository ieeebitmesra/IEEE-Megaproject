import { env } from '@/env'
import CryptoJS from 'crypto-js'

const secretKey = env.VITE_STORE_SECRET

export function encryptJSON(data: object) {
  const plaintext = JSON.stringify(data)

  const encrypted = CryptoJS.AES.encrypt(plaintext, secretKey).toString()
  return encrypted
}

export function decryptJSON(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)

  const decryptedText = bytes.toString(CryptoJS.enc.Utf8)

  if (!decryptedText) {
    throw new Error('Decryption failed')
  }
  return JSON.parse(decryptedText)
}
