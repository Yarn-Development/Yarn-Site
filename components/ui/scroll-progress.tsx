"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  // Smooth out the scroll animation so it feels like liquid/thread
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* The Guide Line (Faint background line) */}
      <div className="fixed left-6 top-0 bottom-0 w-[1px] bg-white/10 z-40 hidden md:block" />
      
      {/* The Active Thread (Glowing Line) */}
      <motion.div
        className="fixed left-6 top-0 w-[2px] bg-gradient-to-b from-cyan-500 to-fuchsia-500 origin-top z-50 hidden md:block shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        style={{ scaleY, height: "100%" }}
      />
    </>
  )
}