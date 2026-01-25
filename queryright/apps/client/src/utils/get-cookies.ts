import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

export const getCookies = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const cookie = request.headers.get('cookie')
    return cookie
  },
)
