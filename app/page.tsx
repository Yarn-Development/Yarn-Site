"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Thread } from "@/components/layout/Thread"

export default function HomePage() {
  return (
    <div className="relative min-h-dvh selection:bg-zinc-700 selection:text-white">
      {/* Central vertical thread with scroll progress */}
      <Thread className="hidden md:block" />
      
      {/* Main content */}
      <Header />
      
      <main id="main-content" role="main">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}
