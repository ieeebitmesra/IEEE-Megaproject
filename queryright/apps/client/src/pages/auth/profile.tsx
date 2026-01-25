import React, { useState } from 'react'
import {
  ExternalLink,
  Pencil,
  FileText,
  Shield,
  Smartphone,
  Globe,
  Bell,
  Key,
  Laptop,
  Twitter,
  Fingerprint,
  AlertTriangle,
  Save,
  X,
  DownloadCloud,
  CloudUpload,
  MapPin,
  ChevronsUpDown,
  Check,
  Building2,
  Link as LinkIcon,
  LogOut,
  Github,
  Linkedin,
  PhoneIcon,
  ComputerIcon,
  Monitor,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Passkey } from '@better-auth/passkey/client'
import { Account, Session } from 'better-auth/client'
import { User } from '@/lib/auth-client'
import { UAParser } from 'ua-parser-js'
import dayjs from 'dayjs'
// --- MOCK DATA ---
const locations = [
  { value: 'london-uk', label: 'London, United Kingdom' },
  { value: 'new-york-us', label: 'New York, USA' },
  { value: 'tokyo-jp', label: 'Tokyo, Japan' },
]

const institutions = [
  { value: 'harvard', label: 'Harvard University' },
  { value: 'mit', label: 'Massachusetts Institute of Technology' },
]

// --- REUSABLE AUTOCOMPLETE COMPONENT ---
interface SearchableSelectProps {
  options: { value: string; label: string }[]
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  icon?: React.ReactNode
}

function SearchableSelect({
  options,
  placeholder,
  value,
  onChange,
  icon,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal text-muted-foreground hover:text-foreground pl-3 text-left"
        >
          <div className="flex items-center gap-2 truncate">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {value
              ? options.find((framework) => framework.value === value)?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder?.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    const selectedOption = options.find(
                      (o) =>
                        o.label.toLowerCase() === currentValue.toLowerCase(),
                    )
                    onChange(
                      selectedOption ? selectedOption.value : currentValue,
                    )
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
type SessionWithLocation = Session & { location: string }
interface UserProps {
  user: User | null
  accounts: Account[] | null
  sessions: SessionWithLocation[] | null
  passkeys: Passkey[] | null
  currentSession: SessionWithLocation | null
}
export default function ProfileSettingsPage({
  userProps,
}: {
  userProps: UserProps
}) {
  const [isDirty, setIsDirty] = useState(true)
  const { user, accounts, sessions, passkeys, currentSession } = userProps
  const [location, setLocation] = useState('')
  const [institution, setInstitution] = useState('')
  const otherSessions =
    sessions?.filter((s) => s.token !== currentSession?.token) || []
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans pb-24">
      <div className="mx-auto max-w-7xl">
        {/* --- HEADER --- */}
        <header className="relative mb-12">
          <div className="h-48 w-full rounded-xl bg-linear-to-r from-indigo-200 via-indigo-300 to-indigo-500/50 relative">
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-4 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <div className="px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
              <Avatar className="h-32 w-32 rounded-full border-4 border-background shadow-sm">
                <AvatarImage src={user?.image ?? ''} alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {user?.displayUsername?.slice(0, 2).toUpperCase() ?? ''}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 w-full mt-2">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                      {user?.displayUsername ?? ''}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    >
                      Pro
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {user?.email ?? 'elementary221b@gmail.com'}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2 rounded-full">
                    <DownloadCloud className="h-4 w-4" /> Export Data
                  </Button>
                  <Button className="gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Profile <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Content (9 Cols) */}
          <div className="lg:col-span-9 space-y-8">
            {/* ========================================== */}
            {/* SECTION 1: PERSONAL INFO             */}
            {/* ========================================== */}

            {/* 1.1 Main Personal Info (Parent) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Personal Info
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update your photo and personal details.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input
                          defaultValue={user?.displayUsername ?? ''}
                          disabled
                          className="bg-muted/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user?.name ?? ''} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        defaultValue={user?.email ?? ''}
                        disabled
                        className="bg-muted/50"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 1.2 Nested: Bio Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2 md:pl-8 border-l-2 border-transparent hover:border-muted/50 transition-colors">
                <h3 className="text-base font-semibold text-foreground">
                  Bio Description
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This will be your main story. Keep it very, very long.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Textarea
                        className="min-h-30 resize-y bg-background font-normal"
                        placeholder="Write something about yourself..."
                        defaultValue={user?.description ?? ''}
                        maxLength={300}
                      />
                      <div className="flex justify-end">
                        <span className="text-xs text-muted-foreground">
                          300/300
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 1.3 Nested: Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2 md:pl-8 border-l-2 border-transparent hover:border-muted/50 transition-colors">
                <h3 className="text-base font-semibold text-foreground">
                  Additional Details
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Optional details like age, location, and institution.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          placeholder="e.g. 24"
                          min={13}
                          max={100}
                          defaultValue={user?.age}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select defaultValue={user?.gender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Non-binary</SelectItem>
                            <SelectItem value="prefer">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label>Location</Label>
                        <SearchableSelect
                          options={locations}
                          placeholder="Search city or country..."
                          value={location}
                          onChange={setLocation}
                          icon={<MapPin className="h-4 w-4" />}
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label>Institution</Label>
                        <SearchableSelect
                          options={institutions}
                          placeholder="Search university or company..."
                          value={institution}
                          onChange={setInstitution}
                          icon={<Building2 className="h-4 w-4" />}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 1.4 Nested: Social Profiles (MOVED HERE) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2 md:pl-8 border-l-2 border-transparent hover:border-muted/50 transition-colors">
                <h3 className="text-base font-semibold text-foreground">
                  Social Profiles
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Where can people find you online?
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter / X</Label>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Separator />

            {/* ========================================== */}
            {/* SECTION 2: ACCOUNT & SECURITY        */}
            {/* ========================================== */}

            {/* 2.1 Main Security: Login Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Account & Security
                  </h3>
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your credentials, sessions, and linked accounts.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Key className="h-4 w-4 text-muted-foreground" /> Change
                        Password
                      </h4>
                      <div className="grid gap-4">
                        <Input type="password" placeholder="Current Password" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input type="password" placeholder="New Password" />
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 2.2 Main Security: Connected Accounts (OAuth) - SAME PRIORITY */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Connected Accounts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Link your social accounts for easier login (OAuth).
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    {accounts?.map((account) => {
                      if (account.providerId === 'github') {
                        return (
                          <Button
                            variant="outline"
                            className="w-full gap-2 justify-start h-12"
                          >
                            <Github className="h-5 w-5" />
                            <span>
                              Connected as <strong>{}</strong>
                            </span>
                            <Badge
                              variant="secondary"
                              className="ml-auto text-green-600 bg-green-50"
                            >
                              Connected
                            </Badge>
                          </Button>
                        )
                      }
                      if (account.providerId === 'google') {
                        return (
                          <Button
                            variant="outline"
                            className="w-full gap-2 justify-start h-12"
                          >
                            <Globe className="h-5 w-5" />
                            <span>Connect with Google</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-auto"
                            >
                              Connect
                            </Button>
                          </Button>
                        )
                      }
                    })}
                    <Button
                      variant="outline"
                      className="w-full gap-2 justify-start h-12"
                    >
                      <Globe className="h-5 w-5" />
                      <span>Connect with Google</span>
                      {/* <Button variant="ghost" size="sm" className="ml-auto">Connect</Button> */}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 2.3 Main Security: Active Sessions - SAME PRIORITY */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Active Sessions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage devices where you are currently logged in.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {(() => {
                        const userAgentInfo = currentSession?.userAgent
                          ? new UAParser(currentSession.userAgent)
                          : null

                        const browser = userAgentInfo?.getBrowser()
                        const os = userAgentInfo?.getOS()
                        const device = userAgentInfo?.getDevice()
                        if (!currentSession) return null

                        return (
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                {device?.type === 'mobile' ? (
                                  <Smartphone className="h-5 w-5" />
                                ) : (
                                  <Monitor className="h-5 w-5" />
                                )}
                              </div>

                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none flex items-center gap-2 justify-around mb-2 ">
                                  {browser?.name} {os?.name} {device?.model}
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-xs text-muted-foreground">
                                    {currentSession.location}
                                  </span>
                                </p>

                                <p className="text-xs text-muted-foreground flex w-full gap-2 items-center">
                                  {currentSession.ipAddress} •
                                  <span className="flex flex-col">
                                    <span>
                                      Created at:{' '}
                                      {dayjs(currentSession.createdAt).format(
                                        'DD/MM/YYYY HH:mm:ss',
                                      )}
                                    </span>
                                    <span>
                                      Expires at:{' '}
                                      {dayjs(currentSession.expiresAt).format(
                                        'DD/MM/YYYY HH:mm:ss',
                                      )}
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>

                            <Badge
                              variant="outline"
                              className="text-green-600 bg-green-50 border-green-200"
                            >
                              Current
                            </Badge>
                          </div>
                        )
                      })()}
                      {otherSessions?.map((session) => {
                        const userAgentInfo = session.userAgent
                          ? new UAParser(session.userAgent)
                          : null
                        const browser = userAgentInfo?.getBrowser()
                        const os = userAgentInfo?.getOS()
                        const device = userAgentInfo?.getDevice()

                        return (
                          <div
                            key={session.id}
                            className="flex items-start justify-between"
                          >
                            <div className="flex gap-4">
                              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                {device?.type === 'mobile' ? (
                                  <Smartphone className="h-5 w-5" />
                                ) : (
                                  <Monitor className="h-5 w-5" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none flex items-center gap-2 justify-around mb-2 ">
                                  {browser?.name} {os?.name} {device?.model}{' '}
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-xs text-muted-foreground">
                                    {session.location}
                                  </span>
                                </p>
                                <p className="text-xs text-muted-foreground flex w-full gap-2 items-center justify-around">
                                  {session.ipAddress} •{' '}
                                  <span className="flex flex-col">
                                    <span>
                                      Created at:{' '}
                                      {dayjs(session.createdAt).format(
                                        'DD/MM/YYYY HH:mm:ss',
                                      )}
                                    </span>
                                    <span>
                                      Expires at:{' '}
                                      {dayjs(session.expiresAt).format(
                                        'DD/MM/YYYY HH:mm:ss',
                                      )}
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              className=" text-muted-foreground hover:text-red-600"
                            >
                              <LogOut className="h-3 w-3 mr-1" /> Revoke
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
              <div className="md:col-span-4 space-y-2 md:pl-8 border-l-2 border-indigo-100">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-500" />
                  Advanced Security
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Advanced protection for your account.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2 md:pl-12 border-l-2 border-transparent hover:border-muted/50 transition-colors">
                <h3 className="text-sm font-medium text-foreground">
                  Two-Factor Auth
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  You can authenticate using an authenticator app or backup
                  codes.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-start gap-8">
                      <div className="space-y-0.5">
                        <h4 className="font-medium text-sm">
                          {!user?.twoFactorEnabled ? 'Enable' : 'Disable'} 2FA
                        </h4>
                      </div>
                      <div className="grid gap-4 w-[60%] ">
                        <Input type="password" placeholder="Password" />
                      </div>
                      <Button variant="outline" size="sm" className=" p-2 ">
                        {!user?.twoFactorEnabled ? 'Enable' : 'Disable'} 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2 md:pl-12 border-l-2 border-transparent hover:border-muted/50 transition-colors">
                <h3 className="text-sm font-medium text-foreground">
                  Passkeys
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Biometric login (FaceID/TouchID).
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">
                            Biometric Login
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Add Passkey
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Notifications Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Notifications
                  </h3>
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your alert preferences.
                </p>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border shadow-sm">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Email Alerts
                      </h4>
                      <div className="flex items-center justify-between">
                        <Label className="font-normal">
                          Communication emails
                        </Label>
                        <Switch
                          defaultChecked
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 space-y-2">
                <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Danger Zone
                </h3>
              </div>
              <div className="md:col-span-8">
                <Card className="rounded-xl border border-red-200 bg-red-50/30 shadow-sm">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-red-900">
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-700/80">
                        Permanently remove your data.
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Right Actions Column */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              <Card className="border-l-4 border-l-blue-600 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Actions</CardTitle>
                  <CardDescription>
                    {isDirty
                      ? 'You have unsaved changes.'
                      : 'All changes saved.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2 font-medium shadow-sm transition-all hover:scale-[1.02]">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
