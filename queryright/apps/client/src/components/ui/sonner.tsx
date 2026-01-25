'use client'

import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  ShieldAlert,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import type { ToasterProps } from 'sonner'

const IconBubble = ({
  icon: Icon,
  bgColor,
  iconColor,
  className,
}: {
  icon: React.ElementType
  bgColor: string
  iconColor: string
  className?: string
}) => (
  <div
    className={`flex h-8 w-8 min-w-8 shrink-0 items-center justify-center rounded-full ${className}`}
    style={{ backgroundColor: bgColor }}
  >
    <Icon className="size-4" style={{ color: iconColor }} />
  </div>
)

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: (
          <IconBubble
            icon={CheckCircle2}
            bgColor="#BEE2C8"
            iconColor="#166534"
          />
        ),
        info: <IconBubble icon={Info} bgColor="#B3DFF0" iconColor="#0c4a6e" />,
        warning: (
          <IconBubble
            icon={AlertCircle}
            bgColor="#FCEFA1"
            iconColor="#78350f"
          />
        ),
        error: (
          <IconBubble
            icon={ShieldAlert}
            bgColor="#F4C2C7"
            iconColor="#991b1b"
          />
        ),
        loading: (
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: `
            group toast 
            group-[.toaster]:bg-white 
            group-[.toaster]:text-gray-900 
            group-[.toaster]:border 
            group-[.toaster]:shadow-lg
            group-[.toaster]:p-4
            [&>div]:gap-3
            [&>div]:items-start
            [&>div[data-content]]:ml-3
            [&>div[data-icon]]:h-full
            [&>div[data-icon]]:flex
            [&>div[data-icon]]:items-center
            [&>div[data-icon]]:justify-center
            flex
            items-center
            justify-start
            data-[type=success]:!bg-emerald-50 data-[type=success]:!border-emerald-300 data-[type=success]:!text-emerald-900
            data-[type=error]:!bg-red-50 data-[type=error]:!border-red-300 data-[type=error]:!text-red-900
            data-[type=info]:!bg-blue-50 data-[type=info]:!border-blue-300 data-[type=info]:!text-blue-900
            data-[type=warning]:!bg-amber-50 data-[type=warning]:!border-amber-300 data-[type=warning]:!text-amber-900
          `,
          title: `
            font-semibold
            group-[.toast]:text-gray-900
            group-[.toast[data-type=success]]:!text-emerald-900
            group-[.toast[data-type=error]]:!text-red-900
            group-[.toast[data-type=info]]:!text-blue-900
            group-[.toast[data-type=warning]]:!text-amber-900
          `,
          description: `
            text-sm mt-1
            group-[.toast]:text-gray-700
            group-[.toast[data-type=success]]:!text-emerald-800
            group-[.toast[data-type=error]]:!text-red-800
            group-[.toast[data-type=info]]:!text-blue-800
            group-[.toast[data-type=warning]]:!text-amber-800
          `,
          actionButton: 'bg-gray-900 text-white hover:bg-gray-800',
          cancelButton: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
