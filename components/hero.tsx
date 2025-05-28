"use client";
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating Icons */}
          <div className="relative">
            <div className="absolute -top-8 left-1/4 animate-bounce">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="absolute -top-4 right-1/4 animate-bounce delay-300">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="absolute top-8 left-1/6 animate-bounce delay-500">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Weaving Technology
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Into Stories
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're a creative technology studio that turns innovative ideas into practical, impactful digital products.
            From AI-powered tools to educational platforms—we build solutions that solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
              onClick={() => scrollToSection('contact')}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => scrollToSection('projects')}
            >
              View Our Work
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Trusted by startups and educational institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-gray-400 font-semibold">University Partners</div>
              <div className="text-gray-400 font-semibold">EdTech Platforms</div>
              <div className="text-gray-400 font-semibold">AI Startups</div>
              <div className="text-gray-400 font-semibold">SaaS Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
