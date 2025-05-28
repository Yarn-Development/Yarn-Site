"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <img
              src="/yarntp.png"
              alt="Yarn Logo"
              className="w-10 h-10 object-contain"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))" }}
              />
            </div>
            <span className="text-xl font-bold text-gray-900">Yarn Development</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => scrollToSection('services')}
            >
              Get Started
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => scrollToSection('contact')}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => scrollToSection('services')}
                >
                  Get Started
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => scrollToSection('contact')}
                >
                  Let's Talk
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
