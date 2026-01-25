import { useEffect, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  getPendingBookmarkSync,
  removePendingBookmarkSync,
  getLocalBookmarks,
  setLocalBookmarks,
} from '@/utils/bookmark-storage'

export function useBookmarkSync(onSyncComplete?: () => void) {
  const queryClient = useQueryClient()

  const syncPendingOperations = useCallback(async () => {
    if (!navigator.onLine) return

    const pending = getPendingBookmarkSync()
    if (pending.length === 0) return

    console.log(`Syncing ${pending.length} pending bookmark operations`)

    for (const operation of pending) {
      try {
        if (operation.type === 'create') {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/content/bookmarks`,
            {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ courseId: operation.courseId }),
            },
          )

          if (response.ok) {
            const result = await response.json()
            // Update localStorage with the real ID from server
            const localBookmarks = getLocalBookmarks()
            const updated = localBookmarks.map((b) =>
              b.id === operation.id ? { ...b, id: result.bookmark.id } : b,
            )
            setLocalBookmarks(updated)
            removePendingBookmarkSync(operation.id)
          }
        } else if (operation.type === 'delete') {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/content/bookmarks`,
            {
              method: 'DELETE',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ courseId: operation.courseId }),
            },
          )

          if (response.ok) {
            removePendingBookmarkSync(operation.id)
          }
        }
      } catch (error) {
        console.error('Failed to sync bookmark operation:', operation, error)
      }
    }

    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ['bookmarks'] })

    if (onSyncComplete) {
      onSyncComplete()
    }
  }, [queryClient, onSyncComplete])

  // Sync when coming online
  useEffect(() => {
    const handleOnline = () => {
      console.log('Device is online, syncing pending bookmark operations...')
      syncPendingOperations()
    }

    window.addEventListener('online', handleOnline)

    // Also sync immediately if already online
    if (navigator.onLine) {
      syncPendingOperations()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [syncPendingOperations])

  return { syncPendingOperations }
}
