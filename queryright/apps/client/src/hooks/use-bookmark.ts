import { useApiGet, useApiPost } from '@/hooks/api-hooks'
import { useQueryClient } from '@tanstack/react-query'
import {
  addLocalBookmark,
  deleteLocalBookmark,
  addPendingBookmarkSync,
  generateTempBookmarkId,
} from '@/utils/bookmark-storage'

export function useBookmark(courseId: string, initialIsBookmarked?: boolean) {
  const queryClient = useQueryClient()

  // Get bookmarks from API with offline-first approach
  const { data: bookmarksData } = useApiGet({
    key: ['bookmarks'] as const,
    path: '/api/content/bookmarks',
    staleTime: 0,
    initialData:
      initialIsBookmarked !== undefined
        ? { bookmarks: initialIsBookmarked ? [{ id: 'temp', courseId }] : [] }
        : undefined,
  })

  const bookmarks = bookmarksData?.bookmarks || []
  // Always compute from current cache data, not from initialIsBookmarked
  const isBookmarked = bookmarks.some((b: any) => b.courseId === courseId)

  const addBookmarkMutation = useApiPost({
    type: 'post',
    key: ['add-bookmark'] as const,
    path: '/api/content/bookmarks',
  })

  const deleteBookmarkMutation = useApiPost({
    type: 'delete',
    key: ['delete-bookmark'] as const,
    path: '/api/content/bookmarks',
  })

  const toggleBookmark = async () => {
    // Optimistic update
    const previousBookmarks = queryClient.getQueryData(['bookmarks'])

    if (isBookmarked) {
      // Optimistically remove bookmark
      const tempId = generateTempBookmarkId()

      queryClient.setQueryData(['bookmarks'], (old: any) => {
        if (!old) return { bookmarks: [] }
        return {
          ...old,
          bookmarks: old.bookmarks.filter((b: any) => b.courseId !== courseId),
        }
      })

      deleteLocalBookmark(courseId)

      if (navigator.onLine) {
        try {
          await deleteBookmarkMutation.mutateAsync({ courseId })
          // Invalidate to refetch fresh data
          queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
        } catch (error) {
          console.error('Error removing bookmark from server:', error)
          // Rollback on error
          queryClient.setQueryData(['bookmarks'], previousBookmarks)
          addLocalBookmark({ id: tempId, courseId })

          // Add to pending sync queue
          addPendingBookmarkSync({
            id: `delete_bookmark_${courseId}_${Date.now()}`,
            type: 'delete',
            courseId,
            timestamp: Date.now(),
          })
        }
      } else {
        // Offline: add to pending sync queue
        addPendingBookmarkSync({
          id: `delete_bookmark_${courseId}_${Date.now()}`,
          type: 'delete',
          courseId,
          timestamp: Date.now(),
        })
      }
    } else {
      // Optimistically add bookmark
      const tempId = generateTempBookmarkId()
      const newBookmark = { id: tempId, courseId }

      queryClient.setQueryData(['bookmarks'], (old: any) => {
        if (!old) return { bookmarks: [newBookmark] }
        return {
          ...old,
          bookmarks: [...old.bookmarks, newBookmark],
        }
      })

      addLocalBookmark(newBookmark)

      if (navigator.onLine) {
        try {
          const result = await addBookmarkMutation.mutateAsync({ courseId })

          // Update with real ID from server
          deleteLocalBookmark(courseId)
          addLocalBookmark({ id: result.bookmark.id, courseId })

          // Update query cache with real ID
          queryClient.setQueryData(['bookmarks'], (old: any) => {
            if (!old)
              return { bookmarks: [{ id: result.bookmark.id, courseId }] }
            return {
              ...old,
              bookmarks: old.bookmarks.map((b: any) =>
                b.id === tempId ? { id: result.bookmark.id, courseId } : b,
              ),
            }
          })

          // Invalidate to refetch fresh data
          queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
        } catch (error) {
          console.error('Error adding bookmark to server:', error)
          // Rollback on error
          queryClient.setQueryData(['bookmarks'], previousBookmarks)
          deleteLocalBookmark(courseId)

          // Add to pending sync queue
          addPendingBookmarkSync({
            id: tempId,
            type: 'create',
            courseId,
            timestamp: Date.now(),
          })
          // Re-add to localStorage for offline queue
          addLocalBookmark(newBookmark)
        }
      } else {
        // Offline: add to pending sync queue
        addPendingBookmarkSync({
          id: tempId,
          type: 'create',
          courseId,
          timestamp: Date.now(),
        })
      }
    }
  }

  return {
    isBookmarked,
    toggleBookmark,
    isLoading:
      addBookmarkMutation.isPending || deleteBookmarkMutation.isPending,
  }
}
