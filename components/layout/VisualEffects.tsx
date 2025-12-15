"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoomBackground = dynamic(
  () => import('@/components/canvas/LoomBackground').then((mod) => mod.LoomBackground),
  { ssr: false }
)

const WovenScroll = dynamic(
  () => import('@/components/ui/woven-scroll').then((mod) => mod.WovenScroll),
  { ssr: false }
)

export function VisualEffects() {
  return (
    <div 
      style={{ 
        position: 'fixed', // Forces it out of the flow
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, // Sits at the back
        pointerEvents: 'none', // Allows clicking through to text
        overflow: 'hidden'
      }}
    >
      <Suspense fallback={null}>
        <LoomBackground />
      </Suspense>
      
      {/* Scroll line sits on top of background but behind text */}
      <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', zIndex: 1 }}>
        <Suspense fallback={null}>
          <WovenScroll />
        </Suspense>
      </div>
    </div>
  )
}