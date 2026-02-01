"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useInView } from "motion/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Dynamic import for Three.js component (performance optimization)
const YarnSphere = dynamic(
  () => import("@/components/canvas/YarnSphere").then((mod) => mod.YarnSphere),
  { ssr: false }
)

// Staggered text animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// Animated word component
function AnimatedWord({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span 
      variants={wordVariants}
      className={className}
    >
      {children}
    </motion.span>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-yarn-base"
      aria-label="Welcome to Yarn Development"
    >
      {/* Yarn Sphere Background */}
      <YarnSphere />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Fade mask at bottom */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, #030303 100%)',
        }}
      />

      {/* Content Grid - 12 columns */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Main content - spans 8 columns on large screens, centered */}
          <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-center">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-zinc-800/50 bg-yarn-surface text-xs font-mono text-zinc-500 uppercase">
                Creative Technology Studio
              </span>
            </motion.div>

            {/* Main Headline with staggered reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 text-balance leading-[1.1]"
            >
              <AnimatedWord>Software</AnimatedWord>{" "}
              <AnimatedWord>is</AnimatedWord>{" "}
              <AnimatedWord className="font-serif italic text-zinc-400">woven</AnimatedWord>
              <motion.span variants={wordVariants}>,</motion.span>
              <br className="hidden sm:block" />{" "}
              <AnimatedWord>not</AnimatedWord>{" "}
              <AnimatedWord>just</AnimatedWord>{" "}
              <AnimatedWord>written</AnimatedWord>
              <motion.span variants={wordVariants}>.</motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-base sm:text-lg text-white mb-12 max-w-2xl mx-auto font-body leading-relaxed text-pretty"
            >
              We transform ambitious ideas into scalable, engineered digital products. 
              Full-stack development with the precision of craft.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-white text-zinc-900 hover:bg-zinc-200 transition-colors duration-150 text-sm px-6 h-11 font-sans font-medium rounded-sm"
                onClick={() => scrollToSection("contact")}
              >
                Start a Project
                <ArrowRight className="ml-2 size-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 h-11 px-6 font-sans text-sm rounded-sm transition-colors duration-150"
                onClick={() => scrollToSection("projects")}
              >
                View Our Work
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-zinc-600 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-zinc-700"
          />
        </div>
      </motion.div>
    </section>
  )
}
