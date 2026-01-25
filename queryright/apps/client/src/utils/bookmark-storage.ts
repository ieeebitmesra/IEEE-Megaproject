const BOOKMARKS_KEY = 'bookmarks'
const PENDING_BOOKMARK_SYNC_KEY = 'bookmarks_pending_sync'

export interface BookmarkData {
  id: string
  courseId: string
  userId?: string
}

export interface PendingBookmarkSync {
  id: string
  type: 'create' | 'delete'
  courseId: string
  timestamp: number
}

// Get all bookmarks from localStorage
export function getLocalBookmarks(): BookmarkData[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to get bookmarks from localStorage:', error)
    return []
  }
}

// Save bookmarks to localStorage
export function setLocalBookmarks(bookmarks: BookmarkData[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Failed to save bookmarks to localStorage:', error)
  }
}

// Check if a course is bookmarked
export function isBookmarked(courseId: string): boolean {
  const bookmarks = getLocalBookmarks()
  return bookmarks.some((b) => b.courseId === courseId)
}

// Add a bookmark to localStorage
export function addLocalBookmark(bookmark: BookmarkData): void {
  const bookmarks = getLocalBookmarks()
  // Avoid duplicates
  if (!bookmarks.some((b) => b.courseId === bookmark.courseId)) {
    bookmarks.push(bookmark)
    setLocalBookmarks(bookmarks)
  }
}

// Delete a bookmark from localStorage
export function deleteLocalBookmark(courseId: string): void {
  const bookmarks = getLocalBookmarks()
  const updated = bookmarks.filter((b) => b.courseId !== courseId)
  setLocalBookmarks(updated)
}

// Get pending sync operations
export function getPendingBookmarkSync(): PendingBookmarkSync[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(PENDING_BOOKMARK_SYNC_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to get pending bookmark sync:', error)
    return []
  }
}

// Add a pending sync operation
export function addPendingBookmarkSync(operation: PendingBookmarkSync): void {
  if (typeof window === 'undefined') return

  try {
    const pending = getPendingBookmarkSync()
    pending.push(operation)
    localStorage.setItem(PENDING_BOOKMARK_SYNC_KEY, JSON.stringify(pending))
  } catch (error) {
    console.error('Failed to add pending bookmark sync:', error)
  }
}

// Remove a pending sync operation
export function removePendingBookmarkSync(operationId: string): void {
  if (typeof window === 'undefined') return

  try {
    const pending = getPendingBookmarkSync()
    const updated = pending.filter((op) => op.id !== operationId)
    localStorage.setItem(PENDING_BOOKMARK_SYNC_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to remove pending bookmark sync:', error)
  }
}

// Generate a temporary ID for offline operations
export function generateTempBookmarkId(): string {
  return `temp_bookmark_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
