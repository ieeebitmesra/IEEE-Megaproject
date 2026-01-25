// import { createFileRoute } from '@tanstack/react-router'
// import { authMiddleware } from '@/middlewares/auth-middleware'

// export const Route = createFileRoute('/dashboard/$id')({
//   component: RouteComponent,
//   // loader: ({ location }) => authMiddleware({ location }),
// })

// // function RouteComponent() {
// //   return <div>Hello "/dashboard"!</div>
// // }
// import React, { useMemo, useEffect, useState } from 'react';
// import {
//   Settings, Layout, Users, Tag, Folder, FileText, Zap, Link as LinkIcon,
//   User, Bell, ShieldCheck, Key, Keyboard, ChevronLeft, ChevronRight, Clock,
//   CheckCircle2, Search
// } from 'lucide-react';

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";

// // --- UPDATED COMPONENT: ImmersiveGridBackground ---
// // Now uses theme variables (bg-background, stroke-border, etc.)
// const ImmersiveGridBackground = ({
//   className,
//   gridSize = 50,
//   glowOpacity = 0.3
// }: {
//   className?: string;
//   gridSize?: number;
//   glowOpacity?: number;
// }) => {
//   const [hoveredCell, setHoveredCell] = useState<string | null>(null);

//   const staticHighlights = useMemo(() => {
//     return Array.from({ length: 20 }).map(() => ({
//       x: Math.floor(Math.random() * 20),
//       y: Math.floor(Math.random() * 10),
//       opacity: Math.random() * 0.15 + 0.05,
//       delay: Math.random() * 2,
//     }));
//   }, []);

//   return (
//     <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", className)}>
//       {/* 1. The Fade Mask - Uses bg-background to blend with parent theme */}
//       <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_90%)] z-10" />

//       {/* 2. The Grid Container */}
//       <div
//         className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"
//         style={{ opacity: 0.6 }}
//       >
//         <svg
//           className="absolute w-full h-full stroke-border/60 dark:stroke-border/40"
//           width="100%"
//           height="100%"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <pattern
//               id="grid-pattern"
//               width={gridSize}
//               height={gridSize}
//               patternUnits="userSpaceOnUse"
//             >
//               <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" strokeWidth="1" />
//             </pattern>
//           </defs>

//           {/* Base Grid Lines */}
//           <rect width="100%" height="100%" fill="url(#grid-pattern)" />

//           {/* Static Random Filled Squares - Uses fill-foreground for theme adaptability */}
//           {staticHighlights.map((sq, i) => (
//             <rect
//               key={i}
//               x={sq.x * gridSize}
//               y={sq.y * gridSize}
//               width={gridSize - 1}
//               height={gridSize - 1}
//               className="fill-foreground animate-pulse border-0 stroke-0"
//               fillOpacity={sq.opacity}
//               style={{ animationDuration: `${3 + sq.delay}s` }}
//             />
//           ))}
//         </svg>
//       </div>

//       {/* 3. Subtle Ambient Glow Blob - Uses bg-primary */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
//     </div>
//   );
// };

// export default function RouteComponent() {
//   return (
//     <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden">

//       {/* --- Sidebar --- */}
//       <aside className="w-[280px] flex-shrink-0 border-r border-border bg-muted/10 flex flex-col">
//         <div className="p-4 flex items-center gap-4">
//           <div className="flex gap-1.5">
//             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
//             <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
//             <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
//           </div>
//           <div className="ml-auto flex gap-1 text-muted-foreground">
//             <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="h-4 w-4" /></Button>
//             <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="h-4 w-4" /></Button>
//           </div>
//         </div>

//         <ScrollArea className="flex-1 px-3">
//           <div className="space-y-6 py-2">
//             <div>
//               <h3 className="px-4 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Settings</h3>
//               <div className="space-y-1">
//                 <NavButton icon={<Layout className="mr-2 h-4 w-4" />} label="Workspace" />
//                 <NavButton icon={<Settings className="mr-2 h-4 w-4" />} label="Overview" />
//                 <NavButton icon={<Users className="mr-2 h-4 w-4" />} label="Members" />
//                 <NavButton icon={<Tag className="mr-2 h-4 w-4" />} label="Label" />
//                 <NavButton icon={<Folder className="mr-2 h-4 w-4" />} label="Projects" />
//                 <NavButton icon={<FileText className="mr-2 h-4 w-4" />} label="Templates" />
//                 <NavButton icon={<Zap className="mr-2 h-4 w-4" />} label="Initiatives" />
//                 <NavButton icon={<LinkIcon className="mr-2 h-4 w-4" />} label="Integrations" />
//               </div>
//             </div>
//             <div>
//               <div className="flex items-center justify-between px-4 mb-2">
//                  <h3 className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">My Account</h3>
//               </div>
//               <div className="space-y-1">
//                 <NavButton icon={<User className="mr-2 h-4 w-4" />} label="Profile" isActive />
//                 <NavButton icon={<Bell className="mr-2 h-4 w-4" />} label="Notifications" />
//                 <NavButton icon={<ShieldCheck className="mr-2 h-4 w-4" />} label="Security & Access" />
//                 <NavButton icon={<Key className="mr-2 h-4 w-4" />} label="API Keys" />
//                 <NavButton icon={<Keyboard className="mr-2 h-4 w-4" />} label="Keyboard shortcuts" />
//               </div>
//             </div>
//           </div>
//         </ScrollArea>
//       </aside>

//       {/* --- Main Content --- */}
//       <main className="flex-1 overflow-y-auto bg-background relative">
//         <div className="max-w-6xl mx-auto p-8">

//           {/* Breadcrumb */}
//           <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//             <span className="hover:text-foreground cursor-pointer transition-colors">My Account</span>
//             <span className="text-border">/</span>
//             <div className="flex items-center gap-2 text-foreground">
//                <User className="h-3.5 w-3.5" />
//                <span>Profile</span>
//             </div>
//           </div>

//           {/* --- HERO SECTION --- */}
//           <div className="relative mb-8 rounded-xl border border-border bg-card/50 overflow-hidden min-h-[300px] flex flex-col items-center justify-center">

//             {/* The Immersive Background */}
//             <ImmersiveGridBackground gridSize={40} />

//             {/* Content (Z-Index to stay above grid) */}
//             <div className="relative z-20 flex flex-col items-center justify-center text-center p-8">
//               <div className="relative mb-4 group">
//                  {/* Glow effect behind avatar */}
//                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />

//                  <Avatar className="h-24 w-24 border-2 border-border shadow-2xl relative">
//                   <AvatarImage src="https://github.com/shadcn.png" alt="Liam Smith" />
//                   <AvatarFallback className="bg-muted text-muted-foreground">LS</AvatarFallback>
//                 </Avatar>

//                 {/* Verified Badge - Kept blue/white for visibility, or use primary */}
//                 <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-4 border-background shadow-sm" title="Verified">
//                     <CheckCircle2 size={14} fill="currentColor" className="text-white" />
//                 </div>
//               </div>

//               <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">Liam Smith</h1>
//               <p className="text-sm text-muted-foreground font-medium">wilson@example.com</p>
//             </div>
//           </div>

//           {/* Details Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

//             <SettingsCard title="Personal details">
//               <SettingsRow label="Full name" value="Samuel Wilson" />
//               <SettingsRow label="Date of Birth" value="January 1, 1987" />
//               <SettingsRow label="Gender" value="Male" />
//               <SettingsRow label="Nationality" value="American" />
//               <SettingsRow label="Address" value={<span className="flex items-center gap-2 justify-end"><span className="text-lg">🇺🇸</span> California, USA</span>} />
//               <SettingsRow label="Phone Number" value="(213) 555-1234" />
//               <SettingsRow label="Email" value="wilson@example.com" />
//             </SettingsCard>

//             <SettingsCard title="Account Details">
//               <SettingsRow label="Display Name" value="s_wilson_168920" />
//               <SettingsRow label="Account Created" value="March 20, 2020" />
//               <SettingsRow label="Last Login" value="August 22, 2024" />
//               <SettingsRow label="Membership Status" value={<span className="text-foreground">Premium Member</span>} />
//               <SettingsRow label="Account Verification" value={<Badge variant="secondary" className="text-green-600 bg-green-500/10 hover:bg-green-500/20 border-green-500/20">Verified</Badge>} />
//               <SettingsRow label="Language Preference" value="English" />
//               <SettingsRow label="Time Zone" value="GMT-5 (Eastern Time)" />
//             </SettingsCard>

//             <SettingsCard title="Security Settings">
//               <SettingsRow label="Password Last Changed" value="July 15, 2024" />
//               <SettingsRow label="Two-Factor Authentication" value={<Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Enabled</Badge>} />
//               <SettingsRow label="Security Questions Set" value="Yes" />
//               <SettingsRow label="Login Notifications" value={<Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Enabled</Badge>} />
//               <SettingsRow label="Connected Devices" value="3 Devices" />
//               <SettingsRow label="Recent Account Activity" value={<span className="text-green-600 dark:text-green-400">No Suspicious Activity</span>} />
//             </SettingsCard>

//             <SettingsCard title="Preferences">
//               <SettingsRow label="Email Notifications" value={<Badge variant="outline">Subscribed</Badge>} />
//               <SettingsRow label="SMS Alerts" value={<Badge variant="outline">Enabled</Badge>} />
//               <SettingsRow label="Content Preferences" value="Technology, Design" />
//               <SettingsRow label="Default Dashboard View" value="Compact Mode" />
//               <SettingsRow label="Dark Mode" value="Auto" />
//               <SettingsRow label="Language for Content" value="English" />
//             </SettingsCard>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* --- Helper Components --- */

// function NavButton({ icon, label, isActive }: { icon: React.ReactNode, label: string, isActive?: boolean }) {
//   return (
//     <Button
//       variant={isActive ? "secondary" : "ghost"}
//       className={cn(
//         "w-full justify-start font-normal h-9 mb-1 transition-all duration-200",
//         isActive
//           ? "shadow-sm"
//           : "text-muted-foreground hover:text-foreground"
//       )}
//     >
//       {icon}
//       {label}
//     </Button>
//   );
// }

// function SettingsCard({ title, children }: { title: string, children: React.ReactNode }) {
//   return (
//     <Card className="bg-card/50 backdrop-blur-sm border-border shadow-sm">
//       <CardHeader className="pb-3 pt-5 px-6 border-b border-border/50">
//         <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div className="flex flex-col">
//           {children}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function SettingsRow({ label, value }: { label: string, value: React.ReactNode }) {
//   return (
//     <div className="flex items-center justify-between py-3.5 px-6 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors group">
//       <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">{label}</span>
//       <span className="text-sm text-foreground/80 font-medium text-right truncate max-w-[200px]">{value}</span>
//     </div>
//   );
// }

import { authClient } from '@/lib/auth-client'
import { authMiddleware } from '@/middlewares/auth-middleware'
import ProfilePage from '@/pages/auth/profile'
import { getCookies } from '@/utils/get-cookies'
import { createFileRoute } from '@tanstack/react-router'
import { Session } from 'better-auth'

// Type-safe GeoJS response
type GeoJsRecord = {
  accuracy: number
  area_code: string
  region: string
  asn: number
  continent_code: string
  country: string
  country_code: string
  country_code3: string
  ip: string
  latitude: string
  longitude: string
  organization: string
  organization_name: string
}

function isGeoJsRecord(value: unknown): value is GeoJsRecord {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.ip === 'string' &&
    typeof v.country === 'string' &&
    typeof v.country_code === 'string' &&
    typeof v.country_code3 === 'string' &&
    typeof v.latitude === 'string' &&
    typeof v.longitude === 'string'
  )
}

function parseGeoJsResponse(json: unknown): GeoJsRecord[] {
  if (Array.isArray(json)) return json.filter(isGeoJsRecord)
  return isGeoJsRecord(json) ? [json] : []
}

type SessionWithLocation = Session & { location: string }

export const Route = createFileRoute('/dashboard/$id')({
  component: RouteComponent,
  loader: async ({ location }) => {
    const authResult = await authMiddleware({ location })
    const cookie = await getCookies()
    const [accounts, sessions, passkeys, currentSession] = await Promise.all([
      authClient.listAccounts({
        fetchOptions: {
          headers: {
            cookie: cookie ?? '',
          },
        },
      }),
      authClient.listSessions({
        fetchOptions: {
          headers: {
            cookie: cookie ?? '',
          },
        },
      }),
      authClient.passkey.listUserPasskeys({
        fetchOptions: {
          headers: {
            cookie: cookie ?? '',
          },
        },
      }),
      authClient.getSession({
        fetchOptions: {
          headers: {
            cookie: cookie ?? '',
          },
        },
      }),
    ])

    let enrichedSessions: SessionWithLocation[] = (sessions.data ?? []).map(
      (s) => ({
        ...s,
        location: 'Unknown Location',
      }),
    )
    let enrichedCurrentSession: SessionWithLocation | null = currentSession.data
      ?.session
      ? { ...currentSession.data.session, location: 'Unknown Location' }
      : null

    const allIps = [
      ...(sessions.data?.map((s) => s.ipAddress) || []),
      currentSession.data?.session?.ipAddress,
    ].filter(Boolean) as string[]

    const uniqueIps = Array.from(new Set(allIps))

    if (uniqueIps.length > 0) {
      try {
        const ipQuery = uniqueIps.join(',')
        const geoResponse = await fetch(
          `https://get.geojs.io/v1/ip/geo.json?ip=${ipQuery}`,
        )

        const geoDataRaw: unknown = await geoResponse.json()
        const geoDataArray = parseGeoJsResponse(geoDataRaw)

        const geoMap = new Map<string, string>()
        for (const geo of geoDataArray) {
          const location = `${geo.country},${geo.region}` || 'Unknown Location'
          geoMap.set(geo.ip, location)
        }

        enrichedSessions = enrichedSessions.map((session) => ({
          ...session,
          location: session.ipAddress
            ? (geoMap.get(session.ipAddress) ?? 'Unknown Location')
            : 'Unknown Location',
        }))

        if (enrichedCurrentSession && enrichedCurrentSession.ipAddress) {
          enrichedCurrentSession = {
            ...enrichedCurrentSession,
            location:
              geoMap.get(enrichedCurrentSession.ipAddress) ??
              'Unknown Location',
          }
        }
      } catch (error) {
        console.error('Failed to fetch geolocation data:', error)
        enrichedSessions = enrichedSessions.map((s) => ({
          ...s,
          location: 'Unknown Location',
        }))
        if (enrichedCurrentSession) {
          enrichedCurrentSession = {
            ...enrichedCurrentSession,
            location: 'Unknown Location',
          }
        }
      }
    }

    return {
      user: authResult?.user,
      accounts: accounts.data,
      sessions: enrichedSessions,
      passkeys: passkeys.data,
      currentSession: enrichedCurrentSession,
    }
  },
})

function RouteComponent() {
  const { user, accounts, sessions, passkeys, currentSession } =
    Route.useLoaderData()
  return (
    <ProfilePage
      userProps={{
        user,
        accounts,
        sessions,
        passkeys,
        currentSession,
      }}
    />
  )
}
