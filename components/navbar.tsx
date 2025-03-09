// components/navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  BarChart3Icon,
  BriefcaseIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'lucide-react'

const routes = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <BarChart3Icon className="w-4 h-4" />,
  },
  {
    name: 'Job Hunt',
    path: '/job-hunt',
    icon: <BriefcaseIcon className="w-4 h-4" />,
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      // Update scroll position
      setLastScrollY(currentScrollY)

      // Apply scrolled style when scrolled down
      setIsScrolled(currentScrollY > 10)
    }

    // Add throttled scroll event listener for performance
    let scrollTimer: any
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll()
          scrollTimer = null
        }, 100)
      }
    }

    window.addEventListener('scroll', throttledScroll)
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      clearTimeout(scrollTimer)
    }
  }, [lastScrollY])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm'
          : 'bg-transparent',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-tr 
              from-primary to-accent flex items-center 
              justify-center text-white font-bold"
            >
              DF
            </div>
            <span className="text-xl font-bold gradient-heading">
              DeGi Folio
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === route.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                )}
              >
                <span className="flex items-center gap-1.5">
                  {route.icon}
                  {route.name}
                </span>
              </Link>
            ))}

            <div className="ml-6 flex items-center gap-3">
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <GithubIcon className="w-4 h-4" />
              </button>
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <TwitterIcon className="w-4 h-4" />
              </button>
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <LinkedinIcon className="w-4 h-4" />
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              className="w-8 h-8 rounded-full border border-border
                flex items-center justify-center text-foreground hover:bg-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-4 h-4" />
              ) : (
                <MenuIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-md font-medium',
                  pathname === route.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.icon}
                <span>{route.name}</span>
              </Link>
            ))}

            <div className="flex gap-3 pt-3 border-t">
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <GithubIcon className="w-4 h-4" />
              </button>
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <TwitterIcon className="w-4 h-4" />
              </button>
              <button className="rounded-full w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary">
                <LinkedinIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
