import { Link, useNavigate } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { AiFillGithub } from 'react-icons/ai'
import { SiMongodb, SiPostgresql } from 'react-icons/si'
import { motion } from 'motion/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import useUser from '@/hooks/use-user'
import { authClient } from '@/lib/auth-client'
import { useUserStore } from '@/store/user-store'

export default function Header() {
  const repoApiLink =
    'https://api.github.com/repos/Kishan-Agarwal-28/qweryright'
  const { data: stars = 0 } = useQuery({
    queryKey: ['getGithubStars'],
    queryFn: async () => {
      const response = await axios.get(repoApiLink)
      return response.data.stargazers_count
    },
    staleTime: 1000 * 60 * 5,
  })
  const { user, loading } = useUser()
  const [logoutLoading, setLogoutLoading] = useState(false)
  const userStore = useUserStore.getState()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const { error, data } = await authClient.signOut({
      fetchOptions: {
        onError: () => {
          setLogoutLoading(false)
        },
        onSuccess: async () => {
          setLogoutLoading(false)
          await userStore.logout()
          navigate({
            to: '/auth/login',
          })
        },
        onRequest: () => {
          setLogoutLoading(true)
        },
      },
    })
    if (error || !data.success) {
      toast[error ? 'error' : 'success'](
        `${error ? 'Error logging out' : 'You have been logged out successfully'}`,
        {
          description: error?.message,
          position: 'bottom-right',
          classNames: {
            content: 'flex flex-col gap-2',
          },
          style: {
            '--border-radius': 'calc(var(--radius) + 4px)',
          } as React.CSSProperties,
        },
      )
    }
  }
  return (
    <nav className="flex items-center-safe justify-around z-50 sticky top-0  bg-background w-screen h-max border-b-2 p-2 border-primary/5 ">
      <Link to="/">
        <Image src="/logo-full.png" alt="Logo" width={150} height={100} />
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex-wrap items-center justify-around ">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Learning</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationContent
                mongoRoute="/learning/mongodb/what-are-aggregation-pipelines"
                sqlRoute="/learning/sql/introduction-to-databases"
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Editor</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationContent
                mongoRoute="/mongo-editor"
                sqlRoute="/editor"
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Practice</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationContent mongoRoute="." sqlRoute="." />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/query-optimizer">Query Optimizer</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>QueryBuilder</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationContent
                mongoRoute="/mongo/query-builder"
                sqlRoute="/sql/query-builder"
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/types-generator">Types Generator</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/query-typer">Query Typer</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <a
        href="https://github.com/Kishan-Agarwal-28/qweryright"
        target="_blank"
        className="cursor-pointer"
      >
        <Tooltip>
          <TooltipTrigger className="flex items-center-safe justify-around gap-2">
            <AiFillGithub className="text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out" />
            <span>{stars}</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>View on GitHub</p>
          </TooltipContent>
        </Tooltip>
      </a>
      <ButtonGroup className="gap-2">
        {loading ? (
          <Skeleton className="w-24 h-10 rounded-md" />
        ) : user ? (
          <>
            <Link
              to="/dashboard/$id"
              params={{
                id: user.id,
              }}
            >
              <Button className="bg-muted text-primary/95 cursor-pointer hover:bg-muted/50 rounded-md">
                Dashboard
              </Button>
            </Link>
            <Button
              className="bg-muted text-primary/95 cursor-pointer hover:bg-muted/50 rounded-md"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <Button className="bg-muted text-primary/95 cursor-pointer hover:bg-muted/50 rounded-md">
                Login
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="bg-muted text-primary/95 cursor-pointer hover:bg-muted/50 rounded-md">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </ButtonGroup>
      <AnimatedThemeToggler className="transition-all rounded-md p-1.5 hover:bg-primary/5 cursor-pointer" />
    </nav>
  )
}

function NavigationContent({
  mongoRoute,
  sqlRoute,
}: {
  mongoRoute: string
  sqlRoute: string
}) {
  return (
    <ul className="grid gap-3 p-4 sm:w-100 md:w-112.5 lg:w-125 grid-cols-1 sm:grid-cols-2">
      <li>
        <NavigationMenuLink asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              className="group from-muted/50 to-muted flex h-55 w-full flex-col justify-center items-center gap-4 rounded-md bg-linear-to-b p-6 no-underline outline-hidden transition-all duration-300 select-none focus:shadow-md hover:bg-[#00ED64] hover:shadow-lg"
              to={mongoRoute}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], y: -5 }}
                transition={{ duration: 0.5 }}
                className="text-[100px]"
              >
                <SiMongodb
                  className="text-[#00ED64] dark:group-hover:text-white  group-hover:text-zinc-800 transition-colors duration-300 w-25 h-25"
                  style={{ fontSize: '100px', width: '100px', height: '100px' }}
                />
              </motion.div>
              <p className="text-muted-foreground dark:group-hover:text-white group-hover:text-zinc-500 text-sm leading-tight text-center font-medium transition-colors duration-300">
                Learn MongoDB aggregation pipelines
              </p>
            </Link>
          </motion.div>
        </NavigationMenuLink>
      </li>
      <li>
        <NavigationMenuLink asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              className="group from-muted/50 to-muted flex h-55 w-full flex-col justify-center items-center gap-4 rounded-md bg-linear-to-b p-6 no-underline outline-hidden transition-all duration-300 select-none focus:shadow-md hover:bg-[#336791] hover:shadow-lg"
              to={sqlRoute}
            >
              <motion.div
                whileHover={{ rotate: [0, 10, -10, 10, 0], y: -5 }}
                transition={{ duration: 0.5 }}
                className="text-[100px]"
              >
                <SiPostgresql
                  className="text-[#336791] dark:group-hover:text-white group-hover:text-zinc-800 transition-colors duration-300 w-25 h-25"
                  style={{ fontSize: '100px', width: '100px', height: '100px' }}
                />
              </motion.div>
              <p className="text-muted-foreground dark:group-hover:text-white group-hover:text-zinc-500 text-sm leading-tight text-center font-medium transition-colors duration-300">
                Learn SQL queries
              </p>
            </Link>
          </motion.div>
        </NavigationMenuLink>
      </li>
    </ul>
  )
}
