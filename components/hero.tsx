"use client";
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Ambient Glow Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">
              Creative Technology Studio
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
            Weaving Ideas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Into Reality
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-mono leading-relaxed">
            A full-stack development collective turning innovative concepts into 
            scalable, engineered digital products.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-cyan-400 hover:text-black transition-all duration-300 text-base px-8 h-14 font-mono uppercase tracking-wide"
              onClick={() => scrollToSection('contact')}
            >
              Initiate Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-14 px-8 font-mono uppercase tracking-wide backdrop-blur-sm"
              onClick={() => scrollToSection('projects')}
            >
              Explore Archive
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}