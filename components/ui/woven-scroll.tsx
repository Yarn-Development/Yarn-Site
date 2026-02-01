"use client"

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react"
import { useEffect, useState, useRef } from "react"

export function WovenScroll() {
  const { scrollYProgress } = useScroll()
  const [windowHeight, setWindowHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Smooth out the scroll value with snappier response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // Track actual scroll position for dynamic weave animation
  useEffect(() => {
    if (prefersReducedMotion) return
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prefersReducedMotion])

  // Calculate height for the SVG
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(document.body.scrollHeight)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // Generate the "Braid" paths with dynamic scroll-based animation
  const generatePath = (offset: number, scrollOffset: number = 0) => {
    const frequency = 0.015 // How tight the weave is
    const amplitude = 18 // Width of the weave swing
    const steps = windowHeight / 4 // Higher resolution
    
    let path = `M 25 0` // Start center (assuming 50px wide SVG)
    
    for (let i = 0; i <= steps; i++) {
      const y = i * 4
      // Add scroll-based phase shift for dynamic weaving effect
      const dynamicPhase = scrollOffset * 0.003
      const x = 25 + Math.sin(y * frequency + offset + dynamicPhase) * amplitude
      path += ` L ${x} ${y}`
    }
    
    return path
  }

  // Only render if we have height calculated
  if (windowHeight === 0) return null

  // For reduced motion, show a simplified static version
  if (prefersReducedMotion) {
    return (
      <div 
        ref={containerRef}
        className="fixed left-0 md:left-4 top-0 bottom-0 w-[60px] z-40 pointer-events-none hidden md:block"
      >
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-cyan-500/50" />
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-fuchsia-500/50" />
      </div>
    )
  }

  return (
    <>
      {/* Left Side Weave */}
      <div 
        ref={containerRef}
        className="fixed left-0 md:left-4 top-0 bottom-0 w-[60px] z-40 pointer-events-none hidden md:block"
      >
        
        <svg 
          width="60" 
          height="100%" 
          viewBox={`0 0 50 ${windowHeight}`}
          preserveAspectRatio="none"
          className="overflow-visible"
          style={{ height: windowHeight }}
        >
          <defs>
            {/* Enhanced cyan gradient */}
            <linearGradient id="glow-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#00f2ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00f2ff" stopOpacity="1" />
              <stop offset="70%" stopColor="#00f2ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
            </linearGradient>
            
            {/* Enhanced pink gradient */}
            <linearGradient id="glow-pink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0" />
              <stop offset="30%" stopColor="#d946ef" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
              <stop offset="70%" stopColor="#d946ef" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Thread 1: Cyan (The Warp) - main stroke */}
          <motion.path
            d={generatePath(0, scrollY)}
            fill="none"
            stroke="url(#glow-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />

          {/* Thread 2: Pink (The Weft) - main stroke */}
          <motion.path
            d={generatePath(Math.PI, scrollY)}
            fill="none"
            stroke="url(#glow-pink)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />

          {/* Bright core lines */}
          <motion.path
            d={generatePath(0, scrollY)}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            opacity={0.6}
          />

          <motion.path
            d={generatePath(Math.PI, scrollY)}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            opacity={0.6}
          />
        </svg>
      </div>
    </>
  )
}