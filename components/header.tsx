"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Terminal } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Detect scroll to add background only when moving
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
      element.scrollIntoView({ behavior: 'smooth' })
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-black/50 backdrop-blur-md border-white/10 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
              { /* Yarn Logo Image */}
              <Image 
                src="/yarntp.svg" 
                alt="Yarn Development Logo" 
                width={48} 
                height={48} 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold text-white tracking-wide">Yarn Dev</span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Studio</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => scrollToSection(link.id)} 
                className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </button>
            ))}
            
            <Button
              size="sm"
              variant="outline"
              className="border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-950/30 hover:text-fuchsia-300 font-mono text-xs uppercase"
              onClick={() => scrollToSection('contact')}
            >
              Start Project
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-xl p-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button 
                  key={link.name}
                  onClick={() => scrollToSection(link.id)} 
                  className="text-left text-gray-300 hover:text-cyan-400 py-2 font-mono"
                >
                  {link.name}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">
                Let's Talk
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}