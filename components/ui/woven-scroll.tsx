"use client"

import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export function WovenScroll() {
  const { scrollYProgress } = useScroll()
  const [windowHeight, setWindowHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Smooth out the scroll value with snappier response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  // Track actual scroll position for dynamic weave animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <>
      {/* Left Side Weave */}
      <div 
        ref={containerRef}
        className="fixed left-0 md:left-4 top-0 bottom-0 w-[60px] z-40 pointer-events-none hidden md:block"
      >
        {/* Ambient glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent blur-xl" />
        
        <svg 
          width="60" 
          height="100%" 
          viewBox={`0 0 50 ${windowHeight}`}
          preserveAspectRatio="none"
          className="overflow-visible"
          style={{ height: windowHeight }}
        >
          <defs>
            {/* Enhanced cyan gradient with glow */}
            <linearGradient id="glow-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f2ff" stopOpacity="0" />
              <stop offset="30%" stopColor="#00f2ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00f2ff" stopOpacity="1" />
              <stop offset="70%" stopColor="#00f2ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
            </linearGradient>
            
            {/* Enhanced pink gradient with glow */}
            <linearGradient id="glow-pink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0" />
              <stop offset="30%" stopColor="#d946ef" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
              <stop offset="70%" stopColor="#d946ef" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>

            {/* Glow filters for enhanced visibility */}
            <filter id="cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="#00f2ff" floodOpacity="0.8" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="pink-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="#d946ef" floodOpacity="0.8" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Animated glow pulse */}
            <filter id="pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feFlood floodColor="#ffffff" floodOpacity="0.3" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background glow layer - cyan */}
          <motion.path
            d={generatePath(0, scrollY)}
            fill="none"
            stroke="#00f2ff"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            filter="url(#cyan-glow)"
            opacity={0.4}
          />

          {/* Background glow layer - pink */}
          <motion.path
            d={generatePath(Math.PI, scrollY)}
            fill="none"
            stroke="#d946ef"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            filter="url(#pink-glow)"
            opacity={0.4}
          />

          {/* Thread 1: Cyan (The Warp) - main stroke */}
          <motion.path
            d={generatePath(0, scrollY)}
            fill="none"
            stroke="url(#glow-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            filter="url(#cyan-glow)"
          />

          {/* Thread 2: Pink (The Weft) - main stroke */}
          <motion.path
            d={generatePath(Math.PI, scrollY)}
            fill="none"
            stroke="url(#glow-pink)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
            filter="url(#pink-glow)"
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

   
      {/* Floating particles along the weave path */}
      <div className="fixed left-2 md:left-6 top-0 bottom-0 w-[20px] z-50 pointer-events-none hidden md:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, #00f2ff 0%, transparent 70%)' 
                : 'radial-gradient(circle, #d946ef 0%, transparent 70%)',
              boxShadow: i % 2 === 0 
                ? '0 0 20px 5px rgba(0, 242, 255, 0.6)' 
                : '0 0 20px 5px rgba(217, 70, 239, 0.6)',
              top: `${(scrollY * 0.5 + i * 300) % windowHeight}px`,
              left: `${12 + Math.sin((scrollY * 0.01) + i) * 8}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  )
}