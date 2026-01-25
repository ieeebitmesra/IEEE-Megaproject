import type { SavedHighlight } from '@repo/schema'

const HIGHLIGHTS_KEY = 'highlights'
const PENDING_SYNC_KEY = 'highlights_pending_sync'

export interface PendingSyncOperation {
  id: string
  type: 'create' | 'delete'
  data?: any
  timestamp: number
}

// Get all highlights from localStorage
export function getLocalHighlights(courseId: string): SavedHighlight[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(`${HIGHLIGHTS_KEY}_${courseId}`)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to get highlights from localStorage:', error)
    return []
  }
}

// Save highlights to localStorage
export function setLocalHighlights(
  courseId: string,
  highlights: SavedHighlight[],
): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(
      `${HIGHLIGHTS_KEY}_${courseId}`,
      JSON.stringify(highlights),
    )
  } catch (error) {
    console.error('Failed to save highlights to localStorage:', error)
  }
}

// Add a new highlight to localStorage
export function addLocalHighlight(
  courseId: string,
  highlight: SavedHighlight,
): void {
  const highlights = getLocalHighlights(courseId)
  const updated = [...highlights, highlight]
  setLocalHighlights(courseId, updated)
}

// Update a highlight in localStorage
export function updateLocalHighlight(
  courseId: string,
  id: string,
  updates: Partial<SavedHighlight>,
): void {
  const highlights = getLocalHighlights(courseId)
  const updated = highlights.map((h) =>
    h.id === id ? { ...h, ...updates } : h,
  )
  setLocalHighlights(courseId, updated)
}

// Delete a highlight from localStorage
export function deleteLocalHighlight(courseId: string, id: string): void {
  const highlights = getLocalHighlights(courseId)
  const updated = highlights.filter((h) => h.id !== id)
  setLocalHighlights(courseId, updated)
}

// Get pending sync operations
export function getPendingSyncOperations(
  courseId: string,
): PendingSyncOperation[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(`${PENDING_SYNC_KEY}_${courseId}`)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to get pending sync operations:', error)
    return []
  }
}

// Add a pending sync operation
export function addPendingSyncOperation(
  courseId: string,
  operation: PendingSyncOperation,
): void {
  if (typeof window === 'undefined') return

  try {
    const pending = getPendingSyncOperations(courseId)
    pending.push(operation)
    localStorage.setItem(
      `${PENDING_SYNC_KEY}_${courseId}`,
      JSON.stringify(pending),
    )
  } catch (error) {
    console.error('Failed to add pending sync operation:', error)
  }
}

// Remove a pending sync operation
export function removePendingSyncOperation(
  courseId: string,
  operationId: string,
): void {
  if (typeof window === 'undefined') return

  try {
    const pending = getPendingSyncOperations(courseId)
    const updated = pending.filter((op) => op.id !== operationId)
    localStorage.setItem(
      `${PENDING_SYNC_KEY}_${courseId}`,
      JSON.stringify(updated),
    )
  } catch (error) {
    console.error('Failed to remove pending sync operation:', error)
  }
}

// Clear all pending sync operations
export function clearPendingSyncOperations(courseId: string): void {
  try {
    localStorage.removeItem(`${PENDING_SYNC_KEY}_${courseId}`)
  } catch (error) {
    console.error('Failed to clear pending sync operations:', error)
  }
}

// Generate a temporary ID for offline operations
export function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Check if an ID is temporary
export function isTempId(id: string): boolean {
  return id.startsWith('temp_')
}
