"use client"

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Constants for the yarn sphere
const SEGMENT_COUNT = 1200
const SPHERE_RADIUS = 2.5
const CONNECTION_DISTANCE = 0.8

interface YarnLinesProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>
}

function YarnLines({ mousePosition }: YarnLinesProps) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Vector3[]>([])
  const velocitiesRef = useRef<THREE.Vector3[]>([])
  
  // Generate initial points on a sphere surface
  const { positions, indices } = useMemo(() => {
    const points: THREE.Vector3[] = []
    const vels: THREE.Vector3[] = []
    
    // Fibonacci sphere distribution for even point spacing
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle
    
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const y = 1 - (i / (SEGMENT_COUNT - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      
      points.push(new THREE.Vector3(
        x * SPHERE_RADIUS,
        y * SPHERE_RADIUS,
        z * SPHERE_RADIUS
      ))
      
      // Random velocities for organic movement
      vels.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      ))
    }
    
    pointsRef.current = points
    velocitiesRef.current = vels
    
    // Create line connections between nearby points
    const lineIndices: number[] = []
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j])
        if (dist < CONNECTION_DISTANCE) {
          lineIndices.push(i, j)
        }
      }
    }
    
    // Create position array for BufferGeometry
    const posArray = new Float32Array(lineIndices.length * 3)
    for (let i = 0; i < lineIndices.length; i++) {
      const point = points[lineIndices[i]]
      posArray[i * 3] = point.x
      posArray[i * 3 + 1] = point.y
      posArray[i * 3 + 2] = point.z
    }
    
    return { positions: posArray, indices: lineIndices }
  }, [])
  
  // Animation frame
  useFrame(({ clock }) => {
    if (!linesRef.current) return
    
    const time = clock.getElapsedTime()
    const geometry = linesRef.current.geometry
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
    
    // Slow rotation
    linesRef.current.rotation.y = time * 0.05
    linesRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
    
    // Mouse-based elastic distortion
    const mouseX = mousePosition.current.x
    const mouseY = mousePosition.current.y
    
    // Update point positions with subtle oscillation
    for (let i = 0; i < pointsRef.current.length; i++) {
      const point = pointsRef.current[i]
      const vel = velocitiesRef.current[i]
      
      // Subtle breathing effect
      const breathe = 1 + Math.sin(time * 0.5 + i * 0.01) * 0.02
      
      // Mouse influence (elastic distortion)
      const mouseInfluence = new THREE.Vector3(
        mouseX * 0.3,
        -mouseY * 0.3,
        0
      )
      
      // Calculate distance from mouse influence point
      const distToMouse = point.distanceTo(mouseInfluence.multiplyScalar(SPHERE_RADIUS))
      const mouseEffect = Math.max(0, 1 - distToMouse / (SPHERE_RADIUS * 2)) * 0.15
      
      // Apply subtle movement
      point.x += vel.x + mouseEffect * mouseX * 0.01
      point.y += vel.y + mouseEffect * -mouseY * 0.01
      point.z += vel.z
      
      // Keep points on sphere surface (with breathing)
      point.normalize().multiplyScalar(SPHERE_RADIUS * breathe)
    }
    
    // Update line positions
    for (let i = 0; i < indices.length; i++) {
      const point = pointsRef.current[indices[i]]
      positionAttribute.setXYZ(i, point.x, point.y, point.z)
    }
    
    positionAttribute.needsUpdate = true
  })
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={indices.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.15}
        linewidth={1}
      />
    </lineSegments>
  )
}

function Scene() {
  const mousePosition = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.current.x = (e.clientX / size.width) * 2 - 1
      mousePosition.current.y = (e.clientY / size.height) * 2 - 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size])
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <YarnLines mousePosition={mousePosition} />
    </>
  )
}

export function YarnSphere() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default YarnSphere
