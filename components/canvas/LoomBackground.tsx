"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Stars } from '@react-three/drei'
import * as THREE from 'three'

// 1. The Individual "Thread" Component
function Thread({ color, ...props }: { color: string; [key: string]: any }) {
  // Create a random curved path for the thread
  const points = useMemo(() => {
    const p = []
    // Create a jagged, "unspooling" line shape
    for (let i = 0; i < 10; i++) {
      p.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 2, // X randomness
          i * 0.5 - 2.5,             // Y spread (vertical)
          (Math.random() - 0.5) * 2  // Z randomness
        )
      )
    }
    // Smooth the points into a curve
    return new THREE.CatmullRomCurve3(p).getPoints(50)
  }, [])

  return (
    <group {...props}>
      <Line
        points={points}       // The points on the line
        color={color}         // Cyan or Fuchsia
        lineWidth={1.5}       // Thickness
        opacity={0.5}         // Transparency
        transparent
      />
    </group>
  )
}

// 2. The Group of Threads (The Loom)
function ThreadsGroup() {
  const groupRef = useRef<THREE.Group>(null)

  // Animation Loop: Rotates the whole system slowly
  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      // Gentle constant rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
      
      // Subtle interaction: Mouse tilts the loom slightly
      // We use 'lerp' (linear interpolation) for smooth movement
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.2, 
        0.1
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.x * 0.2, 
        0.1
      )
    }
  })

  // Generate 40 random threads
  const threads = useMemo(() => {
    return new Array(40).fill(0).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15, // Wide X spread
        (Math.random() - 0.5) * 10, // Tall Y spread
        (Math.random() - 0.5) * 10  // Deep Z spread
      ] as [number, number, number],
      // Alternate between your brand colors
      color: i % 2 === 0 ? "#00f2ff" : "#d946ef", // Cyan & Fuchsia
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {threads.map((data, i) => (
        <Float 
          key={i} 
          speed={1}       // Animation speed
          rotationIntensity={1} // Rotation intensity
          floatIntensity={2}    // Floating range
        >
          <Thread position={data.position} rotation={data.rotation} color={data.color} />
        </Float>
      ))}
    </group>
  )
}

// 3. The Main Exported Component
export function LoomBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* A. The 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Handle High-DPI screens
      >
        {/* Fog to fade threads into the distance (Depth) */}
        <fog attach="fog" args={['black', 5, 20]} />
        
        <ThreadsGroup />
        
        {/* Background Stars for depth */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {/* B. The Noise Overlay (Texture) */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* C. The Vignette (Focus attention to center) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-60" />
    </div>
  )
}