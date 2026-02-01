"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Work", id: "projects" },
  ]

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-150",
        isScrolled 
          ? "bg-yarn-base/90 border-b border-zinc-800/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollToSection("hero")}
          >
            <div className="size-9 bg-yarn-surface border border-zinc-800/50 rounded-sm flex items-center justify-center group-hover:border-zinc-700 transition-colors duration-150">
              <Image 
                src="/yarntp.svg" 
                alt="Yarn Development" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-sans font-semibold text-white">Yarn</span>
              <span className="text-[10px] font-mono text-zinc-600 uppercase">Development</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => scrollToSection(link.id)} 
                className="text-sm font-sans text-zinc-500 hover:text-white transition-colors duration-150"
              >
                {link.name}
              </button>
            ))}
            
            <Button
              size="sm"
              className="bg-white text-zinc-900 hover:bg-zinc-200 font-sans text-xs rounded-sm h-8 px-4 transition-colors duration-150"
              onClick={() => scrollToSection("contact")}
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white transition-colors duration-150" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-yarn-base border-b border-zinc-800/50 p-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => scrollToSection(link.id)} 
                  className="text-left text-zinc-400 hover:text-white py-3 font-sans text-sm border-b border-zinc-800/30 last:border-0 transition-colors duration-150"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("contact")} 
                className="w-full bg-white text-zinc-900 hover:bg-zinc-200 mt-4 rounded-sm transition-colors duration-150"
              >
                Get in Touch
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
