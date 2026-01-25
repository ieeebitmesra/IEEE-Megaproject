import React, { useEffect, useRef, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

// --- Types ---
export interface HighlightData {
  id: string
  range: {
    startContainerPath: Array<number>
    startOffset: number
    endContainerPath: Array<number>
    endOffset: number
  }
  text: string
  color: 'yellow' | 'green' | 'blue' | 'purple' | 'red' | string
}

interface TextHighlighterProps {
  children: React.ReactNode
  savedHighlights: Array<HighlightData>
  onSaveHighlight: (highlight: Omit<HighlightData, 'id'>) => Promise<string>
  onDeleteHighlight: (id: string) => Promise<void>
}

// --- Preset Configuration ---
const PRESET_COLORS = {
  yellow: {
    bg: 'bg-yellow-200 dark:bg-yellow-900/60',
    hover: 'hover:bg-yellow-300',
    hex: '#fef08a',
  },
  green: {
    bg: 'bg-green-200 dark:bg-green-900/60',
    hover: 'hover:bg-green-300',
    hex: '#bbf7d0',
  },
  blue: {
    bg: 'bg-blue-200 dark:bg-blue-900/60',
    hover: 'hover:bg-blue-300',
    hex: '#bfdbfe',
  },
  purple: {
    bg: 'bg-purple-200 dark:bg-purple-900/60',
    hover: 'hover:bg-purple-300',
    hex: '#e9d5ff',
  },
  red: {
    bg: 'bg-red-200 dark:bg-red-900/60',
    hover: 'hover:bg-red-300',
    hex: '#fecaca',
  },
}

export function TextHighlighter({
  children,
  savedHighlights,
  onSaveHighlight,
  onDeleteHighlight,
}: TextHighlighterProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const colorInputRef = useRef<HTMLInputElement>(null)

  // UI State
  const [toolbarPosition, setToolbarPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [currentSelection, setCurrentSelection] = useState<Range | null>(null)
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(
    null,
  )
  const [deleteTooltipPos, setDeleteTooltipPos] = useState<{
    x: number
    y: number
  } | null>(null)

  // --- Helpers ---
  const getNodePath = (node: Node, root: HTMLElement): Array<number> => {
    const path: Array<number> = []
    let current = node
    while (current !== root && current.parentNode) {
      const parent = current.parentNode
      const index = Array.from(parent.childNodes).indexOf(current as ChildNode)
      path.unshift(index)
      current = parent
    }
    return path
  }

  const getNodeFromPath = (
    path: Array<number>,
    root: HTMLElement,
  ): Node | null => {
    let current: Node = root
    for (let i = 0; i < path.length; i++) {
      const index = path[i]
      if (!current.childNodes[index]) {
        return null
      }
      current = current.childNodes[index]
    }
    return current
  }

  // --- 1. Global Event Listener for Selection ---
  // We use useEffect to attach to 'document' so we catch the mouseUp event
  // even if the user drags the mouse OUTSIDE the component (common in bottom-to-top selection).
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      const selection = window.getSelection()

      // Clear Delete Tooltip if clicking elsewhere
      // (Logic moved here from the old onMouseUp)
      if (!selection?.isCollapsed) {
        setActiveHighlightId(null)
        setDeleteTooltipPos(null)
      }

      // Basic Validation
      if (!selection || selection.isCollapsed || !rootRef.current) {
        setToolbarPosition(null)
        setCurrentSelection(null)
        return
      }

      // **CRITICAL CHECK**: Ensure the selection is actually inside OUR component.
      // We check if the 'anchorNode' (where drag started) is inside our root.
      if (!rootRef.current.contains(selection.anchorNode)) {
        // Selection started outside this text block, ignore it.
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const rootRect = rootRef.current.getBoundingClientRect()

      // Calculate Position
      // If bottom-to-top selection, the 'rect' is still correct (normalized).
      setToolbarPosition({
        x: rect.left - rootRect.left + rect.width / 2,
        y: rect.top - rootRect.top - 10, // 10px padding above text
      })
      setCurrentSelection(range)
    }

    // Attach to document
    document.addEventListener('mouseup', handleDocumentMouseUp)

    // Cleanup
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp)
    }
  }, []) // Empty dependency array = runs once on mount

  // --- 2. Existing Handlers ---

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement

    // Check if clicked element is a mark or has a mark parent
    let markElement: HTMLElement | null = null
    if (target.tagName === 'MARK' && target.dataset.highlightId) {
      markElement = target
    } else {
      // Check if parent is a mark
      markElement = target.closest(
        'mark[data-highlight-id]',
      ) as HTMLElement | null
    }

    if (markElement && markElement.dataset.highlightId) {
      e.stopPropagation()
      const id = markElement.dataset.highlightId
      const rect = markElement.getBoundingClientRect()
      const rootRect = rootRef.current!.getBoundingClientRect()

      setActiveHighlightId(id)
      setDeleteTooltipPos({
        x: rect.left - rootRect.left + rect.width / 2,
        y: rect.top - rootRect.top - 10,
      })

      setToolbarPosition(null)
      setCurrentSelection(null)
      window.getSelection()?.removeAllRanges()
    } else {
      setActiveHighlightId(null)
      setDeleteTooltipPos(null)
    }
  }

  const applyHighlight = async (colorValue: string, isCustom = false) => {
    if (!currentSelection || !rootRef.current) return

    const range = currentSelection
    const highlightPayload = {
      text: range.toString(),
      color: colorValue,
      range: {
        startContainerPath: getNodePath(range.startContainer, rootRef.current),
        startOffset: range.startOffset,
        endContainerPath: getNodePath(range.endContainer, rootRef.current),
        endOffset: range.endOffset,
      },
    }

    const tempId = Math.random().toString(36).substring(7)
    wrapRangeWithHighlight(range, tempId, colorValue)

    await onSaveHighlight(highlightPayload)

    window.getSelection()?.removeAllRanges()
    setToolbarPosition(null)
    setCurrentSelection(null)
  }

  const deleteHighlight = async () => {
    if (!activeHighlightId || !rootRef.current) return
    const mark = rootRef.current.querySelector(
      `mark[data-highlight-id="${activeHighlightId}"]`,
    )

    if (mark && mark.parentNode) {
      const parent = mark.parentNode
      while (mark.firstChild) parent.insertBefore(mark.firstChild, mark)
      parent.removeChild(mark)
      parent.normalize()
    }

    await onDeleteHighlight(activeHighlightId)
    setActiveHighlightId(null)
    setDeleteTooltipPos(null)
  }

  const wrapRangeWithHighlight = (range: Range, id: string, color: string) => {
    try {
      const newNode = document.createElement('mark')
      newNode.dataset.highlightId = id

      if (color in PRESET_COLORS) {
        const preset = PRESET_COLORS[color as keyof typeof PRESET_COLORS]
        newNode.className = `rounded-sm px-0.5 cursor-pointer transition-colors text-inherit ${preset.bg} ${preset.hover}`
      } else {
        newNode.className = `rounded-sm px-0.5 cursor-pointer transition-colors text-inherit hover:brightness-95`
        newNode.style.backgroundColor = color
      }

      // Try simple surroundContents first
      try {
        range.surroundContents(newNode)
        return
      } catch (e) {
        // If surroundContents fails, use extractContents approach for complex selections
        const fragment = range.extractContents()
        newNode.appendChild(fragment)
        range.insertNode(newNode)
      }
    } catch (e) {
      console.warn('Failed to wrap highlight:', e)
    }
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyHighlight(e.target.value, true)
  }

  // --- Hydration ---
  useEffect(() => {
    if (savedHighlights.length === 0) {
      return
    }

    // If rootRef is not ready yet, wait a bit for the DOM to settle
    if (!rootRef.current) {
      const timer = setTimeout(() => {
        if (rootRef.current && savedHighlights.length > 0) {
          applyHighlights()
        }
      }, 100)
      return () => clearTimeout(timer)
    }

    applyHighlights()

    function applyHighlights() {
      if (!rootRef.current) return

      savedHighlights.forEach((h) => {
        if (
          rootRef.current?.querySelector(`mark[data-highlight-id="${h.id}"]`)
        ) {
          return
        }

        try {
          const startNode = getNodeFromPath(
            h.range.startContainerPath,
            rootRef.current!,
          )
          const endNode = getNodeFromPath(
            h.range.endContainerPath,
            rootRef.current!,
          )

          if (startNode && endNode) {
            const range = document.createRange()

            try {
              range.setStart(startNode, h.range.startOffset)
              range.setEnd(endNode, h.range.endOffset)

              if (startNode.parentElement?.tagName !== 'MARK') {
                wrapRangeWithHighlight(range, h.id, h.color)
              }
            } catch (rangeError) {
              console.warn(
                'Failed to create range for highlight:',
                h.id,
                rangeError,
              )
            }
          } else {
            console.warn('Could not find nodes for highlight:', h.id, {
              startPath: h.range.startContainerPath,
              endPath: h.range.endContainerPath,
              startNode,
              endNode,
            })
          }
        } catch (e) {
          console.warn('Failed to render highlight:', h.id, e)
        }
      })
    }
  }, [savedHighlights])

  return (
    <div className="relative">
      <div ref={rootRef} onClick={handleContainerClick}>
        {children}
      </div>
      {/* 1. Toolbar */}
      {toolbarPosition && (
        <div
          className="absolute z-50 transform -translate-x-1/2 -translate-y-full pb-2 flex gap-1.5 p-2 bg-popover border shadow-xl rounded-full animate-in fade-in zoom-in duration-200 items-center"
          style={{ left: toolbarPosition.x, top: toolbarPosition.y }}
          onMouseDown={(e) => e.stopPropagation()} // Prevent clicking toolbar from closing it
        >
          {Object.entries(PRESET_COLORS).map(([name, config]) => (
            <button
              key={name}
              onMouseDown={(e) => {
                e.preventDefault()
                applyHighlight(name)
              }} // Use onMouseDown to prevent losing focus
              className={`w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform ${config.bg.split(' ')[0]}`}
              title={`Highlight ${name}`}
            />
          ))}

          <div className="w-px h-4 bg-border mx-0.5" />

          <div className="relative group">
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                colorInputRef.current?.click()
              }}
              className="w-6 h-6 rounded-full border border-dashed border-gray-400 flex items-center justify-center hover:bg-muted hover:scale-110 transition-transform"
              title="Custom Color"
            >
              <Plus className="w-3 h-3 text-muted-foreground" />
            </button>
            <input
              ref={colorInputRef}
              type="color"
              className="absolute opacity-0 w-0 h-0"
              onChange={handleCustomColorChange}
            />
          </div>
        </div>
      )}

      {/* 2. Delete Tooltip */}
      {deleteTooltipPos && activeHighlightId && (
        <div
          className="absolute z-50 transform -translate-x-1/2 -translate-y-full pb-2"
          style={{ left: deleteTooltipPos.x, top: deleteTooltipPos.y }}
        >
          <Button
            size="sm"
            variant="destructive"
            onClick={deleteHighlight}
            className="shadow-lg h-8 px-3 rounded-full animate-in fade-in zoom-in duration-200"
          >
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}
