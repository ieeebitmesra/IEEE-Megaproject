import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useBookmark } from '@/hooks/use-bookmark'

// --- UI Icons (Lucide React) ---
import {
  AlignLeft,
  ArrowUp,
  Bookmark,
  CornerDownRight,
  Hash,
  List,
  Mail,
  MoreHorizontal,
  Search,
  Share2,
  X,
} from 'lucide-react'

// --- Brand Icons (React Icons - FontAwesome) ---
import {
  FaBlogger,
  FaFacebook,
  FaGetPocket,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaSkype,
  FaTelegram,
  FaTumblr,
  FaTwitter,
  FaViber,
  FaWhatsapp,
} from 'react-icons/fa'

import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

// --- Types ---
interface TocItem {
  id: string
  text: string
  level: number
}

interface PageSearchItem {
  id: string
  text: string
  type: 'heading' | 'text'
}

interface BottomDockProps {
  containerId: string
  initialIsBookmarked?: boolean
}

interface MetaData {
  title: string
  description: string
}

// --- Sub-Components ---

const TocContent = ({
  items,
  onItemClick,
  close,
}: {
  items: Array<TocItem>
  onItemClick: (id: string) => void
  close: () => void
}) => (
  <div className="w-[320px] bg-popover rounded-xl">
    <div className="flex items-center justify-between px-4 py-3 shrink-0 border-b">
      <h4 className="font-semibold text-sm">Table of Contents</h4>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={close}>
        <X className="h-4 w-4" />
      </Button>
    </div>
    <ScrollArea className="h-[50vh] w-full p-2">
      <div className="flex flex-col gap-1 pb-2">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground p-4 text-center">
            No headings found.
          </p>
        ) : (
          items.map((item, idx) => (
            <Button
              key={`${item.id}-${idx}`}
              variant="ghost"
              className={cn(
                'h-auto justify-start py-2 text-sm font-normal w-full text-left whitespace-normal',
                item.level === 2 && 'pl-4 text-muted-foreground',
                item.level === 3 && 'pl-8 text-muted-foreground opacity-80',
              )}
              onClick={() => {
                onItemClick(item.id)
                close()
              }}
            >
              <span className="mr-2 text-xs opacity-50 shrink-0 mt-0.5">
                {item.level === 1 ? '•' : '-'}
              </span>
              <span className="leading-tight">{item.text}</span>
            </Button>
          ))
        )}
      </div>
    </ScrollArea>
  </div>
)

export const ShareContent = ({
  url,
  meta,
  close,
}: {
  url: string
  meta: MetaData
  close: () => void
}) => {
  // Manual Handlers
  const handleEmailShare = () => {
    const subject = encodeURIComponent(meta.title || 'Check this out')
    const body = encodeURIComponent(
      `${meta.description}\n\nRead more here: ${url}`,
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
    close()
  }

  const handleBloggerShare = () => {
    window.open(
      `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(url)}&n=${encodeURIComponent(meta.title)}`,
      '_blank',
    )
    close()
  }

  const handleSkypeShare = () => {
    window.open(
      `https://web.skype.com/share?url=${encodeURIComponent(url)}`,
      '_blank',
    )
    close()
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: meta.title,
          text: meta.description,
          url: url,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      navigator.clipboard.writeText(url)
    }
    close()
  }

  const btnClass =
    'flex flex-col items-center gap-2 group w-full focus:outline-none'
  const iconWrapperClass =
    'flex h-10 w-10 items-center justify-center rounded-lg bg-transparent transition-transform group-hover:scale-110'
  const iconClass = 'h-6 w-6 fill-current'
  const uiIconClass = 'h-6 w-6' // Lucide icons don't always use fill the same way
  const textClass =
    'text-[10px] text-muted-foreground group-hover:text-foreground'

  return (
    <div className="w-[350px] bg-popover rounded-xl">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
        <h4 className="font-medium text-sm">Share</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={close}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-y-4 gap-x-2 p-4">
        <button className={btnClass} onClick={handleBloggerShare}>
          <div className={iconWrapperClass}>
            <FaBlogger className={iconClass} />
          </div>
          <span className={textClass}>Blogger</span>
        </button>

        <button className={btnClass} onClick={handleEmailShare}>
          <div className={iconWrapperClass}>
            <Mail className={uiIconClass} />
          </div>
          <span className={textClass}>Email</span>
        </button>

        <FacebookShareButton url={url} className={btnClass} onClick={close}>
          <div className={iconWrapperClass}>
            <FaFacebook className={iconClass} />
          </div>
          <span className={textClass}>Facebook</span>
        </FacebookShareButton>

        <LinkedinShareButton
          url={url}
          title={meta.title}
          summary={meta.description}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaLinkedin className={iconClass} />
          </div>
          <span className={textClass}>LinkedIn</span>
        </LinkedinShareButton>

        <PinterestShareButton
          url={url}
          media={url}
          description={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaPinterest className={iconClass} />
          </div>
          <span className={textClass}>Pinterest</span>
        </PinterestShareButton>

        <PocketShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaGetPocket className={iconClass} />
          </div>
          <span className={textClass}>Pocket</span>
        </PocketShareButton>

        <RedditShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaReddit className={iconClass} />
          </div>
          <span className={textClass}>Reddit</span>
        </RedditShareButton>

        <button className={btnClass} onClick={handleSkypeShare}>
          <div className={iconWrapperClass}>
            <FaSkype className={iconClass} />
          </div>
          <span className={textClass}>Skype</span>
        </button>

        <TelegramShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaTelegram className={iconClass} />
          </div>
          <span className={textClass}>Telegram</span>
        </TelegramShareButton>

        <TumblrShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaTumblr className={iconClass} />
          </div>
          <span className={textClass}>Tumblr</span>
        </TumblrShareButton>

        <TwitterShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaTwitter className={iconClass} />
          </div>
          <span className={textClass}>Twitter</span>
        </TwitterShareButton>

        <ViberShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaViber className={iconClass} />
          </div>
          <span className={textClass}>Viber</span>
        </ViberShareButton>

        <WhatsappShareButton
          url={url}
          title={meta.title}
          className={btnClass}
          onClick={close}
        >
          <div className={iconWrapperClass}>
            <FaWhatsapp className={iconClass} />
          </div>
          <span className={textClass}>WhatsApp</span>
        </WhatsappShareButton>

        <button className={btnClass} onClick={handleNativeShare}>
          <div className={iconWrapperClass}>
            <MoreHorizontal className={uiIconClass} />
          </div>
          <span className={textClass}>More</span>
        </button>
      </div>
    </div>
  )
}

const ScrollProgressButton = ({
  containerId,
  onClick,
}: {
  containerId: string
  onClick: () => void
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollHeight <= clientHeight) {
        setProgress(0)
        return
      }
      const scrolled = scrollTop / (scrollHeight - clientHeight)
      setProgress(Math.min(100, Math.max(0, scrolled * 100)))
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerId])

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative h-10 w-10 flex items-center justify-center cursor-pointer">
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 transform"
        viewBox="0 0 40 40"
      >
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-100 ease-out"
        />
      </svg>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8 hover:bg-transparent z-10 cursor-pointer"
        onClick={onClick}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}

// --- Main Component ---

export default function BottomDock({
  containerId,
  initialIsBookmarked,
}: BottomDockProps) {
  const params = useParams({ strict: false })
  const courseId = params.courseId as string

  // Bookmark hook
  const { isBookmarked, toggleBookmark, isLoading } = useBookmark(
    courseId,
    initialIsBookmarked,
  )

  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [tocItems, setTocItems] = useState<Array<TocItem>>([])
  const [searchableItems, setSearchableItems] = useState<Array<PageSearchItem>>(
    [],
  )
  const [metaData, setMetaData] = useState<MetaData>({
    title: '',
    description: '',
  })
  const [openSearch, setOpenSearch] = useState(false)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenSearch((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Scan Content
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById(containerId)
      if (!container) return

      const headings = container.querySelectorAll('h1, h2, h3')
      const tItems: Array<TocItem> = Array.from(headings).map(
        (heading, index) => {
          if (!heading.id) {
            heading.id = `heading-${index}`
          }
          return {
            id: heading.id,
            text: heading.textContent || 'Untitled',
            level: parseInt(heading.tagName[1]),
          }
        },
      )
      setTocItems(tItems)

      const contentElements = container.querySelectorAll('h1, h2, h3, p, li')
      const sItems: Array<PageSearchItem> = Array.from(contentElements)
        .map((el, index) => {
          if (!el.id) {
            el.id = `content-search-${index}`
          }
          const isHeading = ['H1', 'H2', 'H3'].includes(el.tagName)
          const itemType: PageSearchItem['type'] = isHeading
            ? 'heading'
            : 'text'
          return {
            id: el.id,
            text: el.textContent || '',
            type: itemType,
          }
        })
        .filter((item) => item.text.trim().length > 0)

      setSearchableItems(sItems)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentUrl, containerId])

  // Fetch Meta Data
  useEffect(() => {
    if (typeof document === 'undefined') return
    const title = document.title || 'Course Lesson'
    const descMeta = document.querySelector('meta[name="description"]')
    const ogDescMeta = document.querySelector('meta[property="og:description"]')
    const description =
      descMeta?.getAttribute('content') ||
      ogDescMeta?.getAttribute('content') ||
      ''
    setMetaData({ title, description })
  }, [currentUrl])

  const handleScrollToTop = () => {
    const container = document.getElementById(containerId)
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleTocClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSearchSelect = (id: string) => {
    setOpenSearch(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const toggle = (key: string) =>
    setOpenPopover(openPopover === key ? null : key)

  return (
    <>
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Search text in this lesson..." />
        <CommandList>
          <CommandEmpty>No text found on this page.</CommandEmpty>
          <CommandGroup heading="On This Page">
            {searchableItems.map((item) => (
              <CommandItem
                key={item.id}
                value={item.text}
                onSelect={() => handleSearchSelect(item.id)}
                className="cursor-pointer py-3"
              >
                {item.type === 'heading' ? (
                  <Hash className="mr-2 h-4 w-4 shrink-0 opacity-70" />
                ) : (
                  <AlignLeft className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                )}
                <span className="truncate">{item.text}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpenSearch(false)
                handleScrollToTop()
              }}
            >
              <CornerDownRight className="mr-2 h-4 w-4" />
              <span>Scroll to Top</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-md p-1.5 shadow-lg shadow-black/5  dark:border-zinc-800">
          <TooltipProvider delayDuration={100}>
            {/* TOC */}
            <Popover
              open={openPopover === 'toc'}
              onOpenChange={(open) => !open && setOpenPopover(null)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10 hover:bg-muted"
                      onClick={() => toggle('toc')}
                    >
                      <List className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>
                  Table of Contents
                </TooltipContent>
              </Tooltip>
              <PopoverContent
                side="top"
                className="mb-2 p-0 rounded-xl overflow-hidden w-auto border-none shadow-none bg-transparent"
                align="start"
                collisionPadding={10}
              >
                <TocContent
                  items={tocItems}
                  onItemClick={handleTocClick}
                  close={() => setOpenPopover(null)}
                />
              </PopoverContent>
            </Popover>

            {/* Search */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 hover:bg-muted"
                  onClick={() => setOpenSearch(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                Search{' '}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-1">
                  ⌘K
                </kbd>
              </TooltipContent>
            </Tooltip>

            {/* Bookmark Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 hover:bg-muted"
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
              <TooltipContent sideOffset={10}>
                {isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            {/* Share */}
            <Popover
              open={openPopover === 'share'}
              onOpenChange={(open) => !open && setOpenPopover(null)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10 hover:bg-muted"
                      onClick={() => toggle('share')}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>Share</TooltipContent>
              </Tooltip>
              <PopoverContent
                side="top"
                className="mb-2 p-0 rounded-xl overflow-hidden w-auto border-none shadow-none bg-transparent"
                align="center"
              >
                <ShareContent
                  url={currentUrl}
                  meta={metaData}
                  close={() => setOpenPopover(null)}
                />
              </PopoverContent>
            </Popover>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            {/* Scroll */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ScrollProgressButton
                    containerId={containerId}
                    onClick={handleScrollToTop}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>Scroll to Top</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  )
}
