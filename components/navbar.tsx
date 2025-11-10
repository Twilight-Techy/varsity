"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl">
            V
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Varsity
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-foreground/80 hover:text-blue-500 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("communities")}
            className="text-foreground/80 hover:text-blue-500 transition-colors"
          >
            Communities
          </button>
          <button
            onClick={() => scrollToSection("ai-assistant")}
            className="text-foreground/80 hover:text-blue-500 transition-colors"
          >
            AI Assistant
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-foreground/80 hover:text-blue-500 transition-colors"
          >
            Testimonials
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10" asChild>
            <Link href="/auth/login">Log In</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div className="grid gap-6 px-2 py-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <GraduationCap className="h-6 w-6" />
                  <span>Varsity</span>
                </Link>
                <div className="grid gap-3">
                  <button
                    onClick={() => scrollToSection("features")}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection("communities")}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    Communities
                  </button>
                  <button
                    onClick={() => scrollToSection("ai-assistant")}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    AI Assistant
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors text-left"
                  >
                    Testimonials
                  </button>
                </div>
              </div>

              {/* Login/Signup buttons at the bottom */}
              <div className="grid gap-2 px-2 py-4 border-t">
                <Button asChild variant="outline">
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
