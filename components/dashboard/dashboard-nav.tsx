"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
  X,
  BookMarked,
  UserCircle,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function DashboardNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Communities", href: "/communities", icon: <Users className="h-5 w-5" /> },
    { name: "Courses", href: "/courses", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Study Groups", href: "/study-groups", icon: <BookMarked className="h-5 w-5" /> },
    { name: "Schedule", href: "/schedule", icon: <Calendar className="h-5 w-5" /> },
    { name: "Messages", href: "/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "AI Assistant", href: "/ai-assistant", icon: <Sparkles className="h-5 w-5" /> },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "bg-background py-3",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 mr-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg">
              V
            </div>
            <span className="text-lg font-bold hidden sm:inline-block">Varsity</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="icon"
                className={cn(
                  pathname === item.href
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/70 hover:text-foreground",
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button (Mobile) */}
          <Button variant="ghost" size="icon" className="md:hidden" asChild aria-label="Search">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {/* Search Icon (Desktop) */}
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600 text-white text-xs">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                  <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-foreground/70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-3 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                  <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-foreground/70">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-500">
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-foreground/10">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className={cn(
                  "justify-start",
                  pathname === item.href
                    ? "bg-foreground/10 text-foreground font-medium"
                    : "text-foreground/70 hover:text-foreground",
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
            <DropdownMenuSeparator className="my-2" />
            <Button variant="ghost" size="sm" className="justify-start" asChild>
              <Link href="/profile" className="flex items-center gap-3">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="justify-start" asChild>
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
