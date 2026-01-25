import React, { useEffect, useRef, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { Bookmark, Share2 } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useBookmark } from '@/hooks/use-bookmark'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ShareContent } from '@/components/bottom-dock'
import { cn } from '@/lib/utils'

dayjs.extend(relativeTime)

interface PageHeaderProps {
  contentRef: React.RefObject<HTMLDivElement>
  className?: string
  initialIsBookmarked?: boolean
}

export function PageHeader({
  contentRef,
  className,
  initialIsBookmarked,
}: PageHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams({ strict: false })
  const courseId = params.courseId as string

  // Bookmark hook
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark(
    courseId,
    initialIsBookmarked,
  )

  // --- Breadcrumb Logic ---
  const [isEditingPath, setIsEditingPath] = useState(false)
  const [pathInput, setPathInput] = useState(location.pathname)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPathInput(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (isEditingPath && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingPath])

  // Handle manual edits (Editor Mode)
  const handlePathSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingPath(false)

      let targetPath = pathInput.trim()

      // Remove trailing slash for consistent matching
      if (targetPath.endsWith('/') && targetPath.length > 1) {
        targetPath = targetPath.slice(0, -1)
      }

      navigate({ to: targetPath })
    }
  }

  const pathSegments = location.pathname.split('/').filter(Boolean)

  // --- Reading Time Logic ---
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    const calculateReadingTime = () => {
      if (contentRef.current) {
        const text = contentRef.current.innerText
        const wpm = 200
        const words = text.trim().split(/\s+/).length
        const time = Math.ceil(words / wpm)
        setReadingTime(time)
      }
    }

    calculateReadingTime()

    const observer = new MutationObserver(calculateReadingTime)
    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      })
    }

    return () => observer.disconnect()
  }, [location.pathname, contentRef])

  // --- Share Popover State ---
  const [isShareOpen, setIsShareOpen] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col gap-6 pb-8 border-b border-border/40',
        className,
      )}
    >
      {/* Row 1: Breadcrumbs / Input */}
      <div onDoubleClick={() => setIsEditingPath(true)} className="w-full">
        {isEditingPath ? (
          <Input
            ref={inputRef}
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
            onKeyDown={handlePathSubmit}
            onBlur={() => setIsEditingPath(false)}
            className="h-8 bg-muted/50 font-mono text-sm"
          />
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1

                // 1. Construct "Raw" path
                const rawPath = `/${pathSegments.slice(0, index + 1).join('/')}`

                // 2. Calculate "Safe" path (View Mode)
                // const safePath = getSafePath(rawPath, pathSegments);

                const formattedSegment = segment
                  .replace(/-/g, ' ')
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())

                return (
                  <React.Fragment key={rawPath}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={rawPath}>{formattedSegment}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      {/* Row 2: User Profile & Meta Data */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Author & Stats */}
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src="//ui-avatars.com/api/?name=QRight&background=222244&rounded=true&format=png&size=128&color=ffffff"
              alt="Author"
              crossOrigin="anonymous"
            />
            <AvatarFallback>QR</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              QueryRight
            </span>
            <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
              <span>{dayjs('2025-12-25').fromNow()}</span>
              <span className="hidden sm:inline text-muted-foreground/50">
                —
              </span>
              <span>December 25, 2025</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="font-medium text-foreground">
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            {/* Bookmark */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={toggleBookmark}
                  disabled={isLoading}
                >
                  <Bookmark
                    className={cn(
                      'h-5 w-5',
                      isBookmarked && 'fill-current text-primary',
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              </TooltipContent>
            </Tooltip>

            {/* Share */}
            <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>

              <PopoverContent
                align="end"
                className="w-auto p-0 border-none bg-transparent shadow-none"
              >
                <ShareContent
                  url={
                    typeof window !== 'undefined' ? window.location.href : ''
                  }
                  meta={{
                    title:
                      typeof document !== 'undefined'
                        ? document.title
                        : 'Course Lesson',
                    description: 'Check this course out!',
                  }}
                  close={() => setIsShareOpen(false)}
                />
              </PopoverContent>
            </Popover>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
