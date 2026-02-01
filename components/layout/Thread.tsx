"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "motion/react"

interface ThreadProps {
  className?: string
}

export function Thread({ className }: ThreadProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  })
  
  // Smooth spring animation for the thread growth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Transform progress to scaleY
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])
  
  return (
    <div 
      ref={containerRef}
      className={`fixed left-1/2 top-0 bottom-0 -translate-x-1/2 z-0 pointer-events-none ${className}`}
    >
      {/* Background thread (full height, dim) */}
      <div className="absolute inset-0 w-[1px] bg-zinc-800/30" />
      
      {/* Animated thread (grows with scroll) */}
      <motion.div 
        className="absolute top-0 left-0 w-[1px] h-full bg-zinc-600 origin-top"
        style={{ scaleY }}
      />
      
      {/* Glow effect at the current position */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 size-2 rounded-full bg-zinc-500"
        style={{ 
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
          opacity: useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])
        }}
      >
        <div className="absolute inset-0 rounded-full bg-zinc-400 animate-ping opacity-20" />
      </motion.div>
    </div>
  )
}

// Section anchor component that connects to the thread
interface ThreadAnchorProps {
  children: React.ReactNode
  side?: "left" | "right"
  className?: string
}

export function ThreadAnchor({ children, side = "left", className }: ThreadAnchorProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const x = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.7, 1], 
    side === "left" ? [-20, 0, 0, -20] : [20, 0, 0, 20]
  )
  
  return (
    <motion.div 
      ref={ref}
      style={{ opacity, x }}
      className={`relative ${className}`}
    >
      {/* Connector line to the central thread */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-zinc-800/50 w-8 md:w-16 ${
          side === "left" ? "right-full mr-4" : "left-full ml-4"
        }`}
      />
      
      {/* Dot at connection point */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-zinc-700 ${
          side === "left" ? "right-full mr-4 translate-x-[-2rem] md:translate-x-[-4rem]" : "left-full ml-4 translate-x-[2rem] md:translate-x-[4rem]"
        }`}
      />
      
      {children}
    </motion.div>
  )
}

export default Thread
