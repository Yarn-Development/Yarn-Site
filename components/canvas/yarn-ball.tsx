"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/*
 * A ball of yarn that winds itself up.
 *
 * The thread is one continuous curve. Each wrap is a great circle around an axis
 * that slowly precesses over the sphere, which is how a hand-wound ball builds up
 * its criss-cross surface. The radius grows along the thread, so drawing the tube
 * progressively (drawRange) reads as the ball being wound from a small core outward.
 * A loose tail runs from the newest wrap off the edge of the canvas.
 */

const WRAPS = 150
const POINTS_PER_WRAP = 48
const SEGMENTS = WRAPS * POINTS_PER_WRAP
const RADIAL = 5
const THREAD_RADIUS = 0.016
const WIND_SECONDS = 4.2
const TAIL_SEGMENTS = 48

const YARN_DEEP = new THREE.Color("#9e3119")
const YARN_MID = new THREE.Color("#d4512f")
const YARN_LIGHT = new THREE.Color("#ec7a52")

function windThread(): THREE.Vector3[] {
  const points: THREE.Vector3[] = []
  const axis = new THREE.Vector3()
  const u = new THREE.Vector3(1, 0, 0)
  const v = new THREE.Vector3()

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS
    // Sweep the axis evenly over the sphere: y follows a triangle wave (uniform
    // in height means uniform in area) while the azimuth keeps turning.
    const phase = (t * 3.3) % 1
    const y = 4 * Math.abs(phase - 0.5) - 1
    const ring = Math.sqrt(1 - y * y)
    const azimuth = t * Math.PI * 2 * 11.7
    axis.set(ring * Math.cos(azimuth), y, ring * Math.sin(azimuth))
    // Parallel-transport the reference vector so the wraps stay continuous
    u.addScaledVector(axis, -axis.dot(u)).normalize()
    v.crossVectors(axis, u)

    const theta = t * WRAPS * Math.PI * 2
    const radius = 0.14 + 0.86 * Math.pow(t, 0.5)
    const wobble = 1 + 0.018 * Math.sin(theta * 2.7 + i * 0.013)

    points.push(
      u
        .clone()
        .multiplyScalar(Math.cos(theta))
        .addScaledVector(v, Math.sin(theta))
        .multiplyScalar(radius * wobble),
    )
  }
  return points
}

function useWoundGeometry() {
  return useMemo(() => {
    const points = windThread()
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal")
    curve.arcLengthDivisions = SEGMENTS
    const geometry = new THREE.TubeGeometry(curve, SEGMENTS, THREAD_RADIUS, RADIAL, false)

    // Tonal variation: each wrap gets its own shade, and a twist stripe around
    // the tube gives the thread a plied look without any textures.
    const count = geometry.attributes.position.count
    const colours = new Float32Array(count * 3)
    const c = new THREE.Color()
    for (let i = 0; i <= SEGMENTS; i++) {
      const wrap = Math.floor(i / POINTS_PER_WRAP)
      const shade = 0.5 + 0.5 * Math.sin(wrap * 12.9898)
      for (let j = 0; j <= RADIAL; j++) {
        const ply = 0.5 + 0.5 * Math.sin((j / RADIAL) * Math.PI * 4 + i * 0.9)
        c.copy(YARN_DEEP).lerp(YARN_MID, 0.45 + shade * 0.4).lerp(YARN_LIGHT, ply * 0.22)
        const k = (i * (RADIAL + 1) + j) * 3
        colours[k] = c.r
        colours[k + 1] = c.g
        colours[k + 2] = c.b
      }
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3))
    geometry.setDrawRange(0, 0)

    return { geometry, points }
  }, [])
}

const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x)

interface BallProps {
  reducedMotion: boolean
  pointer: React.MutableRefObject<{ x: number; y: number }>
}

function Ball({ reducedMotion, pointer }: BallProps) {
  const { geometry, points } = useWoundGeometry()
  const { viewport, size } = useThree()

  const placement = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const tail = useRef<THREE.Mesh>(null)

  const elapsed = useRef(0)
  const lastSegment = useRef(-1)
  const tailKey = useRef("")
  const scratch = useMemo(
    () => ({
      end: new THREE.Vector3(),
      centre: new THREE.Vector3(),
      out: new THREE.Vector3(),
      mid: new THREE.Vector3(),
      anchor: new THREE.Vector3(),
    }),
    [],
  )

  const wide = size.width >= 768
  const scale = wide
    ? Math.min(viewport.height * 0.3, viewport.width * 0.17)
    : Math.min(viewport.width * 0.27, viewport.height * 0.17)
  const position: [number, number, number] = wide
    ? [viewport.width * 0.22, 0.05, 0]
    : [0, viewport.height * 0.2, 0]

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((_, rawDelta) => {
    if (!spin.current || !placement.current || !tail.current) return
    const delta = Math.min(rawDelta, 1 / 20)
    elapsed.current += delta

    const linear = reducedMotion ? 1 : Math.min(Math.max((elapsed.current - 0.15) / WIND_SECONDS, 0), 1)
    const progress = easeOutQuad(linear)
    const segment = Math.max(1, Math.floor(progress * SEGMENTS))

    if (segment !== lastSegment.current) {
      geometry.setDrawRange(0, segment * RADIAL * 6)
      lastSegment.current = segment
    }

    if (!reducedMotion) {
      // Spins fast while winding, settling into a slow idle turn
      spin.current.rotation.y += delta * (0.12 + 3.4 * Math.pow(1 - progress, 2))
      const tiltX = pointer.current.y * 0.25
      const tiltZ = -pointer.current.x * 0.15
      placement.current.rotation.x = THREE.MathUtils.damp(placement.current.rotation.x, tiltX, 3, delta)
      placement.current.rotation.z = THREE.MathUtils.damp(placement.current.rotation.z, tiltZ, 3, delta)
    } else {
      // Nothing moves with reduced motion, so only rebuild the tail on resize
      const key = `${viewport.width}x${viewport.height}`
      if (tailKey.current === key) return
      tailKey.current = key
    }

    // Tail: from the newest wrap, out and down off the right edge of the canvas
    const { end, centre, out, mid, anchor } = scratch
    placement.current.updateMatrixWorld()
    end.copy(points[segment])
    spin.current.localToWorld(end)
    spin.current.getWorldPosition(centre)
    out.copy(end).sub(centre).normalize().multiplyScalar(0.12 * scale).add(end)
    anchor.set(viewport.width / 2 + 0.4, position[1] - viewport.height * (wide ? 0.42 : 0.1), 0)
    mid.copy(out).lerp(anchor, 0.5)
    mid.y -= viewport.height * (wide ? 0.12 : 0.04)

    const tailCurve = new THREE.CatmullRomCurve3([end, out.clone(), mid.clone(), anchor.clone()])
    const next = new THREE.TubeGeometry(tailCurve, TAIL_SEGMENTS, THREAD_RADIUS * scale, RADIAL, false)
    tail.current.geometry.dispose()
    tail.current.geometry = next
  })

  return (
    <>
      <group ref={placement} position={position} scale={scale}>
        <group ref={spin} rotation={[0.3, 0, 0.15]}>
          <mesh geometry={geometry}>
            <meshStandardMaterial vertexColors roughness={0.82} metalness={0} />
          </mesh>
        </group>
      </group>
      <mesh ref={tail}>
        <meshStandardMaterial color={YARN_MID} roughness={0.82} metalness={0} />
      </mesh>
    </>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return reduced
}

export function YarnBall() {
  const wrapper = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const reducedMotion = usePrefersReducedMotion()

  // Only render frames while the hero is on screen
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Decorative tilt follows the mouse; skipped on touch screens
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <hemisphereLight args={["#fff4e6", "#2a1a12", 0.9]} />
        <directionalLight position={[-3, 4, 5]} intensity={2.4} color="#fff1e0" />
        <directionalLight position={[4, -2, -3]} intensity={1.4} color="#ffb08a" />
        <Ball reducedMotion={reducedMotion} pointer={pointer} />
      </Canvas>
    </div>
  )
}

export default YarnBall
