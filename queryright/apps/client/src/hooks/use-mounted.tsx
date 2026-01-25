import { useEffect, useState } from 'react'

/**
 * Hook to check if component is mounted on client side
 * Useful for preventing SSR issues with browser-only APIs
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
