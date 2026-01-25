import { useEffect, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  getPendingSyncOperations,
  removePendingSyncOperation,
  getLocalHighlights,
  setLocalHighlights,
} from '@/utils/highlights-storage'

export function useHighlightSync(
  courseId: string,
  onSyncComplete?: () => void,
) {
  const queryClient = useQueryClient()

  const syncPendingOperations = useCallback(async () => {
    if (!navigator.onLine) return

    const pending = getPendingSyncOperations(courseId)
    if (pending.length === 0) return

    console.log(`Syncing ${pending.length} pending operations for ${courseId}`)

    for (const operation of pending) {
      try {
        if (operation.type === 'create') {
          // Sync create operation
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/content/highlights`,
            {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(operation.data),
            },
          )

          if (response.ok) {
            const result = await response.json()
            // Update localStorage with the real ID from server
            const localHighlights = getLocalHighlights(courseId)
            const updated = localHighlights.map((h) =>
              h.id === operation.id ? { ...h, id: result.id } : h,
            )
            setLocalHighlights(courseId, updated)
            removePendingSyncOperation(courseId, operation.id)
          }
        } else if (operation.type === 'delete') {
          // Sync delete operation
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'}/api/content/highlights`,
            {
              method: 'DELETE',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: operation.data.id }),
            },
          )

          if (response.ok) {
            removePendingSyncOperation(courseId, operation.id)
          }
        }
      } catch (error) {
        console.error('Failed to sync operation:', operation, error)
      }
    }

    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ['highlights', courseId] })

    if (onSyncComplete) {
      onSyncComplete()
    }
  }, [courseId, queryClient, onSyncComplete])

  // Sync when coming online
  useEffect(() => {
    const handleOnline = () => {
      console.log('Device is online, syncing pending operations...')
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
