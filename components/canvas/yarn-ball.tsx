"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/*
 * A ball of wool yarn that winds itself up.
 *
 * The thread is one continuous curve wound the way a real hand-wound ball is made:
 * ribbons of ~6 wraps lying snugly side-by-side around an axis, then a smooth
 * hand-turn onto a new crossing axis. The radius grows from a small core outward
 * with an ease-out profile so ~16 outer ribbons overlap densely across the surface,
 * hiding the core completely.
 *
 * Surface realism comes from four pieces working together:
 *   1. Custom tube geometry with a gently flattened, softly 3-ply-contoured
 *      cross-section and baked radial + inward-facing self-occlusion in vertex colours.
 *   2. Seamless procedural worsted wool textures (soft 3-ply twist, spun-fibre
 *      micro-relief normal map, heathered albedo detail, matte roughness map) paired
 *      with MeshPhysicalMaterial Charlie sheen for a velvety wool halo.
 *   3. Progressive stray wool fibres (LineSegments) sprouting at shallow tangent
 *      angles along the strands, revealed in lockstep with the winding animation and
 *      lit with soft rim back-scattering so the silhouette reads fuzzy, not plastic.
 *   4. A recessed dark wool-textured core tucked behind the outer overlapping ribbons
 *      so even deep inter-band crevices read as shadowed wool rather than empty void.
 */

const BANDS = 28
const WRAPS_PER_BAND = 6
const WRAPS = BANDS * WRAPS_PER_BAND // 168 wraps
const POINTS_PER_WRAP = 44
const SEGMENTS = WRAPS * POINTS_PER_WRAP // 7392 segments
const RADIAL = 9 // divisible by 3 so the soft 3-ply contour aligns seamlessly
const THREAD_RADIUS = 0.034
const TWIST_PER_UNIT = 2.3 // lofty worsted knitting-wool pitch (~24° helix)
const WIND_SECONDS = 4.2
const TAIL_SEGMENTS = 56
const TAIL_FUZZ_COUNT = 120

// Warm madder-dyed wool palette calibrated to read as #d4512f under ACESFilmic
const YARN_SHADOW = new THREE.Color("#6e1c0e")
const YARN_DEEP = new THREE.Color("#b8361b")
const YARN_MID = new THREE.Color("#df5732")
const YARN_LIGHT = new THREE.Color("#f28258")
const YARN_SHEEN = new THREE.Color("#ffc4a2")

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

function fract(x: number): number {
  return x - Math.floor(x)
}

// Deterministic hash in [0, 1) for procedural wool noise and fibre placement
function hash1(n: number): number {
  return fract(Math.sin(n * 127.1 + 311.7) * 43758.5453123)
}

function hash2(ix: number, iy: number, seed: number): number {
  const n = Math.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43758.5453123
  return n - Math.floor(n)
}

// Seamless periodic 2D value noise on [0, px) x [0, py)
function tileNoise(x: number, y: number, px: number, py: number, seed: number): number {
  const fx = ((x % px) + px) % px
  const fy = ((y % py) + py) % py
  const x0 = Math.floor(fx)
  const y0 = Math.floor(fy)
  const x1 = (x0 + 1) % px
  const y1 = (y0 + 1) % py
  const tx = fx - x0
  const ty = fy - y0
  const sx = tx * tx * (3 - 2 * tx)
  const sy = ty * ty * (3 - 2 * ty)

  const n00 = hash2(x0, y0, seed)
  const n10 = hash2(x1, y0, seed)
  const n01 = hash2(x0, y1, seed)
  const n11 = hash2(x1, y1, seed)
  const nx0 = n00 + (n10 - n00) * sx
  const nx1 = n01 + (n11 - n01) * sx
  return nx0 + (nx1 - nx0) * sy
}

/*
 * Generate seamless tileable worsted wool textures (albedo detail, tangent normal, roughness).
 * u runs along the thread (1 repeat = 1 full 360° twist of all 3 plies).
 * v wraps around the tube circumference (0..1).
 */
function createWoolTextures() {
  const size = 256
  const height = new Float32Array(size * size)
  const mapData = new Uint8Array(size * size * 4)
  const normalData = new Uint8Array(size * size * 4)
  const roughData = new Uint8Array(size * size * 4)

  // First pass: soft lofted 3-ply wool height field, heathered albedo detail, and matte roughness
  for (let y = 0; y < size; y++) {
    const v = y / size
    for (let x = 0; x < size; x++) {
      const u = x / size

      // Soft 3-ply helical phase, periodic in both u and v
      const plyCoord = 3 * v - 3 * u
      const p = fract(plyCoord)
      // Broad, pillowy ply crown so the yarn reads as fluffy spun wool, not tight rope
      const plyCrown = Math.pow(Math.sin(Math.PI * p), 0.38)

      // Coordinates aligned along the spun wool fibres inside each ply
      const s = v - u
      const w = u + v
      const crimp = 0.02 * Math.sin(w * Math.PI * 6 + s * Math.PI * 4)
      const f1 = tileNoise((s + crimp) * 46, w * 5, 46, 5, 1.3)
      const f2 = tileNoise((s - crimp * 0.6) * 92, w * 10, 92, 10, 7.1)
      // Fluffy cross-fibres bridging gently across ply creases
      const fCross = tileNoise((2 * v - u) * 28, (u + 2 * v) * 7, 28, 7, 13.7)
      // Soft wool fleece mottling
      const loft = tileNoise(u * 12, v * 12, 12, 12, 23.4)

      const softPly = plyCrown * 0.8 + fCross * 0.2
      const h = softPly * 0.42 + f1 * 0.3 + f2 * 0.15 + fCross * 0.08 + loft * 0.05
      const idx = y * size + x
      height[idx] = h

      // Albedo detail (multiplied with vertex colours):
      // Gentle ply-crease shading + natural madder-dyed wool heathering
      const grooveAO = 0.78 + 0.22 * Math.pow(plyCrown, 0.5)
      const fibreTone = 0.92 + f1 * 0.12 + f2 * 0.07 + (loft - 0.5) * 0.06
      const warmShift = (loft - 0.5) * 0.055 + (f1 - 0.5) * 0.045
      const r = Math.min(255, Math.max(0, Math.round(grooveAO * (fibreTone + warmShift) * 255)))
      const g = Math.min(255, Math.max(0, Math.round(grooveAO * (fibreTone - warmShift * 0.28) * 255)))
      const b = Math.min(255, Math.max(0, Math.round(grooveAO * (fibreTone - warmShift * 0.55) * 255)))

      const k = idx * 4
      mapData[k] = r
      mapData[k + 1] = g
      mapData[k + 2] = b
      mapData[k + 3] = 255

      // Matte wool roughness everywhere so Charlie sheen carries the velvety edge glow
      const rough = Math.min(1, Math.max(0.89, 0.99 - plyCrown * 0.05 - f1 * 0.04))
      const rByte = Math.round(rough * 255)
      roughData[k] = rByte
      roughData[k + 1] = rByte
      roughData[k + 2] = rByte
      roughData[k + 3] = 255
    }
  }

  // Second pass: Sobel gradient -> soft tactile wool normal map
  const strength = 2.25
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size
    const yp = (y + 1) % size
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size
      const xp = (x + 1) % size

      const tl = height[ym * size + xm]
      const t = height[ym * size + x]
      const tr = height[ym * size + xp]
      const l = height[y * size + xm]
      const r = height[y * size + xp]
      const bl = height[yp * size + xm]
      const b = height[yp * size + x]
      const br = height[yp * size + xp]

      const dx = tr + 2 * r + br - (tl + 2 * l + bl)
      const dy = bl + 2 * b + br - (tl + 2 * t + tr)

      let nx = -dx * strength
      let ny = -dy * strength
      let nz = 1
      const invLen = 1 / Math.hypot(nx, ny, nz)
      nx *= invLen
      ny *= invLen
      nz *= invLen

      const k = (y * size + x) * 4
      normalData[k] = Math.round((nx * 0.5 + 0.5) * 255)
      normalData[k + 1] = Math.round((ny * 0.5 + 0.5) * 255)
      normalData[k + 2] = Math.round((nz * 0.5 + 0.5) * 255)
      normalData[k + 3] = 255
    }
  }

  const configure = (tex: THREE.DataTexture, isColor: boolean) => {
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.magFilter = THREE.LinearFilter
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.generateMipmaps = true
    tex.anisotropy = 4
    if (isColor) tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
    return tex
  }

  const map = configure(new THREE.DataTexture(mapData, size, size), true)
  const normalMap = configure(new THREE.DataTexture(normalData, size, size), false)
  const roughnessMap = configure(new THREE.DataTexture(roughData, size, size), false)
  return { map, normalMap, roughnessMap }
}

// Gentle low-frequency handmade lumpiness shared across all layers at direction (dx, dy, dz)
// so strands hug the same cozy organic silhouette instead of floating off in hoops.
function organicBallRadius(dx: number, dy: number, dz: number): number {
  return (
    1 +
    0.022 * Math.sin(dx * 2.5 + dy * 1.9) * Math.cos(dz * 2.1) +
    0.014 * Math.cos(dy * 3.0 - dx * 2.2 + dz * 1.5)
  )
}

function windThread(): { points: THREE.Vector3[]; radii: Float32Array; bandOf: Uint16Array } {
  // Quasi-uniform spherical sequence of ribbon axes: golden angle in azimuth + golden ratio
  // in elevation covers all orientations evenly while consecutive bands cross at ~50-75°.
  const bandAxes: THREE.Vector3[] = []
  const bandDriftAxes: THREE.Vector3[] = []
  const bandWidths: number[] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let b = 0; b <= BANDS; b++) {
    const u = fract(b * 0.61803398875 + 0.19)
    const y = 0.06 + u * 0.88
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const az = b * goldenAngle
    const ax = new THREE.Vector3(ring * Math.cos(az), y, ring * Math.sin(az)).normalize()
    // Orient along the shorter arc (<90°) from the previous axis so turns stay gentle
    if (b > 0 && ax.dot(bandAxes[b - 1]) < 0) ax.negate()
    bandAxes.push(ax)

    const drift = new THREE.Vector3(hash1(b * 5.3) - 0.5, hash1(b * 7.1) - 0.5, hash1(b * 9.7) - 0.5)
    drift.addScaledVector(ax, -drift.dot(ax)).normalize()
    bandDriftAxes.push(drift)

    // Half-width tuned to ~5 snug side-by-side strands (spacing ~0.068 vs 0.078 flattened width)
    // so strands touch edge-to-edge with rich coverage across every ribbon.
    bandWidths.push(0.155 + 0.04 * hash1(b * 3.7 + 1.1))
  }

  const points: THREE.Vector3[] = new Array(SEGMENTS + 1)
  const radii = new Float32Array(SEGMENTS + 1)
  const targetR = new Float32Array(SEGMENTS + 1)
  const bandOf = new Uint16Array(SEGMENTS + 1)

  const axis = bandAxes[0].clone()
  const u = new THREE.Vector3(1, 0, 0)
  u.addScaledVector(axis, -axis.dot(u)).normalize()
  const v = new THREE.Vector3()
  const dir = new THREE.Vector3()

  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS
    const bandPos = t * BANDS
    const b = Math.min(BANDS - 1, Math.floor(bandPos))
    const local = bandPos - b
    bandOf[i] = b

    // Alternate lateral sweep direction (-w->+w, then +w->-w) so band transitions don't snap back
    const signCur = b % 2 === 0 ? 1 : -1
    const signNext = (b + 1) % 2 === 0 ? 1 : -1
    const wCur = bandWidths[b] * signCur
    const wNext = bandWidths[b + 1] * signNext

    // Within a band: side-by-side wraps sweep across the ribbon; over the final ~1.0 wrap
    // (local in [0.83, 1.0]), smoothly rotate the ball in hand onto the next crossing axis.
    const transStart = 0.83
    let h: number
    if (local < transStart) {
      const f = local / transStart
      axis.copy(bandAxes[b]).addScaledVector(bandDriftAxes[b], (f - 0.5) * 0.06).normalize()
      h = -wCur + f * (2 * wCur) + 0.008 * Math.sin(f * Math.PI * 4 + b * 2.1)
    } else {
      const blend = smoothstep(transStart, 1, local)
      axis.copy(bandAxes[b]).lerp(bandAxes[b + 1], blend).normalize()
      h = THREE.MathUtils.lerp(wCur, -wNext, blend)
    }

    // Parallel-transport the reference vector so wraps stay twist-free across turns
    u.addScaledVector(axis, -axis.dot(u)).normalize()
    v.crossVectors(axis, u)

    const theta = t * WRAPS * Math.PI * 2
    const latCos = Math.sqrt(Math.max(0.05, 1 - h * h))
    const ct = Math.cos(theta) * latCos
    const st = Math.sin(theta) * latCos

    dir
      .set(
        u.x * ct + v.x * st + axis.x * h,
        u.y * ct + v.y * st + axis.y * h,
        u.z * ct + v.z * st + axis.z * h,
      )
      .normalize()

    // Ease-out radial growth: core builds fast, then ~18 outer ribbons pack densely
    // between r = 0.84 and r = 1.00 so lower wool layers fill every crevice between ribbons.
    const rBase = 0.16 + 0.84 * (1 - Math.pow(1 - t, 2.85))
    const seat = 1 + 0.004 * Math.sin(theta * 3.1 + b * 1.7)
    const r = rBase * organicBallRadius(dir.x, dir.y, dir.z) * seat

    radii[i] = rBase
    targetR[i] = r
    points[i] = dir.clone().multiplyScalar(r)
  }

  // Two light curvature-smoothing passes projected back onto targetR eliminate any tight
  // transition kinks without flattening the crisp ribbon geometry.
  const tmp = new Array<THREE.Vector3>(SEGMENTS + 1)
  for (let i = 0; i <= SEGMENTS; i++) tmp[i] = new THREE.Vector3()
  for (let pass = 0; pass < 2; pass++) {
    tmp[0].copy(points[0])
    tmp[SEGMENTS].copy(points[SEGMENTS])
    for (let i = 1; i < SEGMENTS; i++) {
      tmp[i]
        .copy(points[i])
        .multiplyScalar(0.5)
        .addScaledVector(points[i - 1], 0.25)
        .addScaledVector(points[i + 1], 0.25)
        .normalize()
        .multiplyScalar(targetR[i])
    }
    for (let i = 1; i < SEGMENTS; i++) points[i].copy(tmp[i])
  }

  // Rotate the wound ball so the final wrap terminates cleanly on the right-front equator,
  // ensuring the loose tail peels off horizontally instead of climbing over the top pole.
  const endDir = points[SEGMENTS].clone().normalize()
  const desiredEnd = new THREE.Vector3(0.9, -0.14, 0.41).normalize()
  const alignQuat = new THREE.Quaternion().setFromUnitVectors(endDir, desiredEnd)
  for (let i = 0; i <= SEGMENTS; i++) points[i].applyQuaternion(alignQuat)

  return { points, radii, bandOf }
}

// Custom shader for stray wool fuzz hairs: soft root-to-tip fade with warm backlit rim glow
const FUZZ_VERTEX_SHADER = /* glsl */ `
  attribute float aTip;
  attribute vec3 aSurfNormal;
  varying vec3 vColor;
  varying float vTip;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;

  void main() {
    vColor = color;
    vTip = aTip;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * aSurfNormal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const FUZZ_FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vTip;
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);
    float ndv = abs(dot(N, V));
    // Grazing silhouette halo: wispy hairs catch backlight strongest around the ball's outline
    float rim = pow(1.0 - ndv, 1.35);

    vec3 keyDir = normalize(vec3(-3.2, 4.0, 3.5));
    vec3 rimDir = normalize(vec3(3.6, 2.4, -3.2));
    float keyLit = max(dot(N, keyDir), 0.0) * 0.72 + 0.28;
    float backLit = pow(max(dot(N, rimDir) * 0.5 + 0.5, 0.0), 1.3) * rim * 1.3;

    // Fine wool fibres scatter warm translucent madder/peach light toward the wispy tip
    vec3 tipTint = mix(vColor, vec3(0.98, 0.67, 0.49), 0.4 * vTip + 0.34 * rim);
    vec3 col = tipTint * (keyLit + backLit);

    float alpha = (1.0 - vTip * 0.8) * (0.16 + 0.54 * rim) * (0.6 + 0.4 * keyLit);
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.68));
  }
`

function useWoundBall() {
  return useMemo(() => {
    const { points, radii, bandOf } = windThread()
    const textures = createWoolTextures()

    // Cumulative arc length for stretch-free ply twist UVs
    const arcLen = new Float32Array(SEGMENTS + 1)
    for (let i = 1; i <= SEGMENTS; i++) {
      arcLen[i] = arcLen[i - 1] + points[i].distanceTo(points[i - 1])
    }

    const ringVerts = RADIAL + 1
    const vertCount = (SEGMENTS + 1) * ringVerts
    const positions = new Float32Array(vertCount * 3)
    const normals = new Float32Array(vertCount * 3)
    const uvs = new Float32Array(vertCount * 2)
    const colours = new Float32Array(vertCount * 3)
    const indices = new Uint32Array(SEGMENTS * RADIAL * 6)

    // Pre-pass: allocate exact typed arrays for stray wool fibres concentrated on outer layers
    const hairCounts = new Uint8Array(SEGMENTS + 1)
    let totalHairs = 0
    for (let i = 1; i < SEGMENTS; i++) {
      const t = i / SEGMENTS
      if (t < 0.34) continue
      const h = hash1(i * 1.91 + 0.37)
      let count = 0
      if (t > 0.6) {
        count = h < 0.5 ? 3 : 2
      } else if (t > 0.46) {
        count = h < 0.7 ? 1 : 0
      } else {
        count = h < 0.35 ? 1 : 0
      }
      hairCounts[i] = count
      totalHairs += count
    }

    // Each curly 2-segment hair uses 3 vertices and 4 line indices (0->1, 1->2)
    const fuzzPositions = new Float32Array(totalHairs * 3 * 3)
    const fuzzColors = new Float32Array(totalHairs * 3 * 3)
    const fuzzTips = new Float32Array(totalHairs * 3)
    const fuzzNormals = new Float32Array(totalHairs * 3 * 3)
    const fuzzIndices = new Uint32Array(totalHairs * 4)
    const hairIndexEnd = new Uint32Array(SEGMENTS + 1)

    const T = new THREE.Vector3()
    const R = new THREE.Vector3()
    const B = new THREE.Vector3()
    const N = new THREE.Vector3()
    const vertNorm = new THREE.Vector3()
    const col = new THREE.Color()
    const baseCol = new THREE.Color()

    let hairCursor = 0

    for (let i = 0; i <= SEGMENTS; i++) {
      const p = points[i]
      const prev = points[Math.max(0, i - 1)]
      const next = points[Math.min(SEGMENTS, i + 1)]

      T.subVectors(next, prev).normalize()
      R.copy(p).normalize()
      B.crossVectors(T, R)
      if (B.lengthSq() < 1e-6) B.set(1, 0, 0)
      else B.normalize()
      N.crossVectors(B, T).normalize()

      const uCoord = arcLen[i] * TWIST_PER_UNIT
      const wrap = Math.floor(i / POINTS_PER_WRAP)
      const band = bandOf[i]

      // Natural hand-dyed madder wool richness across bands and along the skein
      const dyeDrift = 0.5 + 0.5 * Math.sin(arcLen[i] * 0.07 + 0.7)
      const bandTone = 0.5 + 0.5 * Math.sin(band * 2.13 + 0.4)
      const wrapShade = 0.5 + 0.5 * Math.sin(wrap * 12.9898 + band * 1.37)
      baseCol
        .copy(YARN_DEEP)
        .lerp(YARN_MID, 0.48 + dyeDrift * 0.28 + bandTone * 0.24)
        .lerp(YARN_LIGHT, wrapShade * dyeDrift * 0.2)

      // Radial depth ambient occlusion: deeper ribbons recede into rich warm shadow
      const rLen = p.length()
      const radialAO = 0.28 + 0.72 * smoothstep(0.7, 0.99, rLen)

      // Subtle organic wool slub (soft loft variation along the thread)
      const slub =
        1 +
        0.065 * Math.sin(arcLen[i] * 2.1 + band * 0.9) +
        0.04 * Math.sin(arcLen[i] * 5.7)

      for (let j = 0; j <= RADIAL; j++) {
        const vCoord = j / RADIAL
        const angle = vCoord * Math.PI * 2
        const ca = Math.cos(angle)
        const sa = Math.sin(angle)

        // Subtle 3-ply silhouette contour aligned in phase with the procedural texture (3v - 3u)
        const plyPhase = fract(3 * vCoord - 3 * uCoord)
        const plyCrown = Math.pow(Math.sin(Math.PI * plyPhase), 0.45)
        const plyScale = 0.96 + 0.065 * plyCrown

        // Soft wool flattens gently against the ball under tension so adjacent wraps kiss cleanly
        const radOut = THREAD_RADIUS * 0.84 * slub * plyScale
        const radSide = THREAD_RADIUS * 1.15 * slub * plyScale

        const ox = N.x * ca * radOut + B.x * sa * radSide
        const oy = N.y * ca * radOut + B.y * sa * radSide
        const oz = N.z * ca * radOut + B.z * sa * radSide

        const vi = i * ringVerts + j
        const v3 = vi * 3
        positions[v3] = p.x + ox
        positions[v3 + 1] = p.y + oy
        positions[v3 + 2] = p.z + oz

        // Smooth ellipse normal (fine fibre & ply relief comes from the normal map)
        vertNorm
          .set(
            N.x * (ca * 1.16) + B.x * (sa * 0.85),
            N.y * (ca * 1.16) + B.y * (sa * 0.85),
            N.z * (ca * 1.16) + B.z * (sa * 0.85),
          )
          .normalize()
        normals[v3] = vertNorm.x
        normals[v3 + 1] = vertNorm.y
        normals[v3 + 2] = vertNorm.z

        const v2 = vi * 2
        uvs[v2] = uCoord
        uvs[v2 + 1] = vCoord

        // Directional self-occlusion: underside nestled into the ball sits in warm shadow
        const sideAO = 0.44 + 0.56 * smoothstep(-0.85, 0.5, ca)
        const ao = radialAO * sideAO
        col.copy(YARN_SHADOW).lerp(baseCol, smoothstep(0.16, 0.92, ao))
        const lum = 0.44 + 0.56 * ao
        colours[v3] = col.r * lum
        colours[v3 + 1] = col.g * lum
        colours[v3 + 2] = col.b * lum
      }

      // Emit delicate curly wool wisps rooted on the exposed outer arc of each strand
      const hc = hairCounts[i]
      for (let hIdx = 0; hIdx < hc; hIdx++) {
        const seed = i * 13.37 + hIdx * 7.91
        const r1 = hash1(seed)
        const r2 = hash1(seed + 1.7)
        const r3 = hash1(seed + 3.1)
        const r4 = hash1(seed + 5.3)

        const rootAngle = (r1 - 0.5) * 2.4
        const ca = Math.cos(rootAngle)
        const sa = Math.sin(rootAngle)
        const rx = p.x + N.x * (ca * THREAD_RADIUS * 0.78) + B.x * (sa * THREAD_RADIUS * 1.05)
        const ry = p.y + N.y * (ca * THREAD_RADIUS * 0.78) + B.y * (sa * THREAD_RADIUS * 1.05)
        const rz = p.z + N.z * (ca * THREAD_RADIUS * 0.78) + B.z * (sa * THREAD_RADIUS * 1.05)

        const len = 0.026 + r2 * 0.05
        const dirSign = r3 < 0.5 ? 1 : -1
        const sideSpread = (r4 - 0.5) * 1.25
        const lift = 0.45 + r2 * 0.45

        const mx = rx + (T.x * dirSign * 0.74 + N.x * lift * 0.66 + B.x * sideSpread * 0.45) * (len * 0.55)
        const my = ry + (T.y * dirSign * 0.74 + N.y * lift * 0.66 + B.y * sideSpread * 0.45) * (len * 0.55)
        const mz = rz + (T.z * dirSign * 0.74 + N.z * lift * 0.66 + B.z * sideSpread * 0.45) * (len * 0.55)

        const curlSign = hash1(seed + 8.9) < 0.5 ? 1 : -1
        const tx =
          mx +
          (T.x * dirSign * 0.46 + N.x * (lift * 0.98) + B.x * (sideSpread + curlSign * 0.5)) * (len * 0.55)
        const ty =
          my +
          (T.y * dirSign * 0.46 + N.y * (lift * 0.98) + B.y * (sideSpread + curlSign * 0.5)) * (len * 0.55)
        const tz =
          mz +
          (T.z * dirSign * 0.46 + N.z * (lift * 0.98) + B.z * (sideSpread + curlSign * 0.5)) * (len * 0.55)

        const baseV = hairCursor * 3
        const pOff = baseV * 3
        fuzzPositions[pOff] = rx
        fuzzPositions[pOff + 1] = ry
        fuzzPositions[pOff + 2] = rz
        fuzzPositions[pOff + 3] = mx
        fuzzPositions[pOff + 4] = my
        fuzzPositions[pOff + 5] = mz
        fuzzPositions[pOff + 6] = tx
        fuzzPositions[pOff + 7] = ty
        fuzzPositions[pOff + 8] = tz

        fuzzTips[baseV] = 0
        fuzzTips[baseV + 1] = 0.5
        fuzzTips[baseV + 2] = 1

        const hairLum = 0.58 + 0.42 * radialAO
        const hr = baseCol.r * hairLum
        const hg = baseCol.g * hairLum
        const hb = baseCol.b * hairLum
        for (let k = 0; k < 3; k++) {
          const cOff = (baseV + k) * 3
          fuzzColors[cOff] = hr
          fuzzColors[cOff + 1] = hg
          fuzzColors[cOff + 2] = hb
          fuzzNormals[cOff] = R.x
          fuzzNormals[cOff + 1] = R.y
          fuzzNormals[cOff + 2] = R.z
        }

        const iOff = hairCursor * 4
        fuzzIndices[iOff] = baseV
        fuzzIndices[iOff + 1] = baseV + 1
        fuzzIndices[iOff + 2] = baseV + 1
        fuzzIndices[iOff + 3] = baseV + 2
        hairCursor++
      }
      hairIndexEnd[i] = hairCursor * 4
    }

    // Build outward-facing triangle indices for each segment ring
    let idxPtr = 0
    for (let i = 0; i < SEGMENTS; i++) {
      const rowA = i * ringVerts
      const rowB = (i + 1) * ringVerts
      for (let j = 0; j < RADIAL; j++) {
        const a = rowA + j
        const b = rowB + j
        const c = rowB + j + 1
        const d = rowA + j + 1
        indices[idxPtr++] = a
        indices[idxPtr++] = d
        indices[idxPtr++] = b
        indices[idxPtr++] = b
        indices[idxPtr++] = d
        indices[idxPtr++] = c
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3))
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2))
    geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3))
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    geometry.computeBoundingSphere()
    geometry.setDrawRange(0, 0)

    const fuzzGeometry = new THREE.BufferGeometry()
    fuzzGeometry.setAttribute("position", new THREE.BufferAttribute(fuzzPositions, 3))
    fuzzGeometry.setAttribute("color", new THREE.BufferAttribute(fuzzColors, 3))
    fuzzGeometry.setAttribute("aTip", new THREE.BufferAttribute(fuzzTips, 1))
    fuzzGeometry.setAttribute("aSurfNormal", new THREE.BufferAttribute(fuzzNormals, 3))
    fuzzGeometry.setIndex(new THREE.BufferAttribute(fuzzIndices, 1))
    fuzzGeometry.computeBoundingSphere()
    fuzzGeometry.setDrawRange(0, 0)

    const fuzzMaterial = new THREE.ShaderMaterial({
      vertexShader: FUZZ_VERTEX_SHADER,
      fragmentShader: FUZZ_FRAGMENT_SHADER,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    })

    // Pre-allocated tail tube geometry (updated in-place each frame with zero allocation)
    const tailVertCount = (TAIL_SEGMENTS + 1) * ringVerts
    const tailPos = new Float32Array(tailVertCount * 3)
    const tailNorm = new Float32Array(tailVertCount * 3)
    const tailUV = new Float32Array(tailVertCount * 2)
    const tailIdx = new Uint32Array(TAIL_SEGMENTS * RADIAL * 6)
    let tPtr = 0
    for (let i = 0; i < TAIL_SEGMENTS; i++) {
      const rowA = i * ringVerts
      const rowB = (i + 1) * ringVerts
      for (let j = 0; j < RADIAL; j++) {
        const a = rowA + j
        const b = rowB + j
        const c = rowB + j + 1
        const d = rowA + j + 1
        tailIdx[tPtr++] = a
        tailIdx[tPtr++] = d
        tailIdx[tPtr++] = b
        tailIdx[tPtr++] = b
        tailIdx[tPtr++] = d
        tailIdx[tPtr++] = c
      }
    }
    const tailGeometry = new THREE.BufferGeometry()
    tailGeometry.setAttribute("position", new THREE.BufferAttribute(tailPos, 3))
    tailGeometry.setAttribute("normal", new THREE.BufferAttribute(tailNorm, 3))
    tailGeometry.setAttribute("uv", new THREE.BufferAttribute(tailUV, 2))
    tailGeometry.setIndex(new THREE.BufferAttribute(tailIdx, 1))

    // Pre-allocated stray fibres along the loose tail
    const tailFuzzPos = new Float32Array(TAIL_FUZZ_COUNT * 3 * 3)
    const tailFuzzCol = new Float32Array(TAIL_FUZZ_COUNT * 3 * 3)
    const tailFuzzTip = new Float32Array(TAIL_FUZZ_COUNT * 3)
    const tailFuzzNorm = new Float32Array(TAIL_FUZZ_COUNT * 3 * 3)
    const tailFuzzIdx = new Uint32Array(TAIL_FUZZ_COUNT * 4)
    const tailFuzzSeeds = new Float32Array(TAIL_FUZZ_COUNT * 4)
    for (let h = 0; h < TAIL_FUZZ_COUNT; h++) {
      const bv = h * 3
      tailFuzzTip[bv] = 0
      tailFuzzTip[bv + 1] = 0.5
      tailFuzzTip[bv + 2] = 1
      for (let k = 0; k < 3; k++) {
        const co = (bv + k) * 3
        tailFuzzCol[co] = YARN_MID.r
        tailFuzzCol[co + 1] = YARN_MID.g
        tailFuzzCol[co + 2] = YARN_MID.b
      }
      const io = h * 4
      tailFuzzIdx[io] = bv
      tailFuzzIdx[io + 1] = bv + 1
      tailFuzzIdx[io + 2] = bv + 1
      tailFuzzIdx[io + 3] = bv + 2
      tailFuzzSeeds[h * 4] = hash1(h * 11.3 + 2.1)
      tailFuzzSeeds[h * 4 + 1] = hash1(h * 17.7 + 4.3)
      tailFuzzSeeds[h * 4 + 2] = hash1(h * 23.1 + 6.7)
      tailFuzzSeeds[h * 4 + 3] = hash1(h * 31.9 + 9.1)
    }
    const tailFuzzGeometry = new THREE.BufferGeometry()
    tailFuzzGeometry.setAttribute("position", new THREE.BufferAttribute(tailFuzzPos, 3))
    tailFuzzGeometry.setAttribute("color", new THREE.BufferAttribute(tailFuzzCol, 3))
    tailFuzzGeometry.setAttribute("aTip", new THREE.BufferAttribute(tailFuzzTip, 1))
    tailFuzzGeometry.setAttribute("aSurfNormal", new THREE.BufferAttribute(tailFuzzNorm, 3))
    tailFuzzGeometry.setIndex(new THREE.BufferAttribute(tailFuzzIdx, 1))

    const normalScale = new THREE.Vector2(0.85, 0.85)

    return {
      geometry,
      fuzzGeometry,
      fuzzMaterial,
      tailGeometry,
      tailFuzzGeometry,
      tailFuzzSeeds,
      textures,
      normalScale,
      points,
      radii,
      hairIndexEnd,
    }
  }, [])
}

const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x)

// Cubic Hermite evaluation in-place on 4 Catmull-Rom control points (zero allocation)
function sampleCatmullRom(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  u: number,
  out: THREE.Vector3,
) {
  const seg = u * 3
  const i = Math.min(2, Math.floor(seg))
  const t = seg - i
  const t2 = t * t
  const t3 = t2 * t

  let a: THREE.Vector3
  let b: THREE.Vector3
  let c: THREE.Vector3
  let d: THREE.Vector3
  if (i === 0) {
    a = p0
    b = p0
    c = p1
    d = p2
  } else if (i === 1) {
    a = p0
    b = p1
    c = p2
    d = p3
  } else {
    a = p1
    b = p2
    c = p3
    d = p3
  }

  out.set(
    0.5 *
      (2 * b.x +
        (-a.x + c.x) * t +
        (2 * a.x - 5 * b.x + 4 * c.x - d.x) * t2 +
        (-a.x + 3 * b.x - 3 * c.x + d.x) * t3),
    0.5 *
      (2 * b.y +
        (-a.y + c.y) * t +
        (2 * a.y - 5 * b.y + 4 * c.y - d.y) * t2 +
        (-a.y + 3 * b.y - 3 * c.y + d.y) * t3),
    0.5 *
      (2 * b.z +
        (-a.z + c.z) * t +
        (2 * a.z - 5 * b.z + 4 * c.z - d.z) * t2 +
        (-a.z + 3 * b.z - 3 * c.z + d.z) * t3),
  )
}

interface BallProps {
  reducedMotion: boolean
  pointer: React.MutableRefObject<{ x: number; y: number }>
}

function Ball({ reducedMotion, pointer }: BallProps) {
  const {
    geometry,
    fuzzGeometry,
    fuzzMaterial,
    tailGeometry,
    tailFuzzGeometry,
    tailFuzzSeeds,
    textures,
    normalScale,
    points,
    radii,
    hairIndexEnd,
  } = useWoundBall()
  const { viewport, size } = useThree()

  const placement = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const tail = useRef<THREE.Mesh>(null)

  const elapsed = useRef(0)
  const lastSegment = useRef(-1)
  const tailKey = useRef("")

  // Reusable scratch objects so useFrame stays allocation-free
  const scratch = useMemo(() => {
    const tailPts: THREE.Vector3[] = []
    for (let i = 0; i <= TAIL_SEGMENTS; i++) tailPts.push(new THREE.Vector3())
    return {
      end: new THREE.Vector3(),
      prevEnd: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      toAnchor: new THREE.Vector3(),
      centre: new THREE.Vector3(),
      out: new THREE.Vector3(),
      mid: new THREE.Vector3(),
      anchor: new THREE.Vector3(),
      tailPts,
      tVec: new THREE.Vector3(),
      nVec: new THREE.Vector3(),
      bVec: new THREE.Vector3(),
      upHint: new THREE.Vector3(0, 0, 1),
    }
  }, [])

  const wide = size.width >= 768
  const scale = wide
    ? Math.min(viewport.height * 0.3, viewport.width * 0.17)
    : Math.min(viewport.width * 0.27, viewport.height * 0.17)
  const position: [number, number, number] = wide
    ? [viewport.width * 0.22, 0.05, 0]
    : [0, viewport.height * 0.2, 0]

  useEffect(() => {
    if (spin.current) {
      spin.current.rotation.set(0.3, reducedMotion ? 0 : -3.9, 0.15)
    }
  }, [reducedMotion])

  useEffect(
    () => () => {
      geometry.dispose()
      fuzzGeometry.dispose()
      fuzzMaterial.dispose()
      tailGeometry.dispose()
      tailFuzzGeometry.dispose()
      textures.map.dispose()
      textures.normalMap.dispose()
      textures.roughnessMap.dispose()
    },
    [geometry, fuzzGeometry, fuzzMaterial, tailGeometry, tailFuzzGeometry, textures],
  )

  useFrame((_, rawDelta) => {
    if (!spin.current || !placement.current || !tail.current || !core.current) return
    const delta = Math.min(rawDelta, 1 / 20)
    elapsed.current += delta

    const linear = reducedMotion ? 1 : Math.min(Math.max((elapsed.current - 0.15) / WIND_SECONDS, 0), 1)
    const progress = easeOutQuad(linear)
    const segment = Math.max(1, Math.floor(progress * SEGMENTS))

    if (segment !== lastSegment.current) {
      geometry.setDrawRange(0, segment * RADIAL * 6)
      fuzzGeometry.setDrawRange(0, hairIndexEnd[segment])
      // Keep the dark matte wool core hidden mid-winding so early crisscrossing ribbons stay
      // open and authentic, then tuck it smoothly behind the outer ~17 ribbons near completion.
      const coreReveal = smoothstep(0.55, 0.92, progress)
      const coreR = Math.max(0.0001, (radii[segment] - 0.145) * coreReveal)
      core.current.visible = coreReveal > 0.01 && coreR > 0.02
      core.current.scale.setScalar(coreR)
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

    // Tail: peels tangentially off the newest wrap, drapes smoothly outside the ball if the
    // exit point orbits around, and trails off the right edge of the canvas.
    const { end, prevEnd, tan, toAnchor, centre, out, mid, anchor, tailPts, tVec, nVec, bVec, upHint } =
      scratch
    placement.current.updateMatrixWorld()
    end.copy(points[segment])
    prevEnd.copy(points[Math.max(0, segment - 1)])
    spin.current.localToWorld(end)
    spin.current.localToWorld(prevEnd)
    spin.current.getWorldPosition(centre)

    anchor.set(viewport.width / 2 + 0.4, position[1] - viewport.height * (wide ? 0.42 : 0.1), 0)
    toAnchor.subVectors(anchor, end).normalize()

    // Project anchor direction tangent to the sphere at `end` so the tail leaves flush with the wool
    tVec.copy(end).sub(centre).normalize()
    tan.copy(toAnchor).addScaledVector(tVec, -toAnchor.dot(tVec))
    if (tan.lengthSq() > 1e-6) tan.normalize()
    else {
      tan.subVectors(end, prevEnd)
      if (tan.lengthSq() > 1e-8) tan.normalize()
      else tan.set(1, -0.5, 0).normalize()
    }

    const rScale = Math.max(0.25, radii[segment])
    out
      .copy(end)
      .addScaledVector(tan, 0.16 * rScale * scale)
      .addScaledVector(tVec, 0.02 * rScale * scale)

    mid.copy(out).lerp(anchor, 0.5)
    mid.y -= viewport.height * (wide ? 0.12 : 0.04)

    const clearance = (radii[segment] * 1.03 + THREAD_RADIUS * 1.05) * scale
    for (let i = 0; i <= TAIL_SEGMENTS; i++) {
      const pt = tailPts[i]
      sampleCatmullRom(end, out, mid, anchor, i / TAIL_SEGMENTS, pt)
      if (i > 0) {
        tVec.subVectors(pt, centre)
        const dist = tVec.length()
        if (dist < clearance && dist > 1e-5) {
          pt.copy(centre).addScaledVector(tVec, clearance / dist)
        }
      }
    }

    // Light in-place smoothing removes any inflection kink where the tail separates from the ball
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 1; i < TAIL_SEGMENTS; i++) {
        const prev = tailPts[i - 1]
        const cur = tailPts[i]
        const next = tailPts[i + 1]
        cur.set(
          prev.x * 0.25 + cur.x * 0.5 + next.x * 0.25,
          prev.y * 0.25 + cur.y * 0.5 + next.y * 0.25,
          prev.z * 0.25 + cur.z * 0.5 + next.z * 0.25,
        )
        if (pass < 2) {
          tVec.subVectors(cur, centre)
          const dist = tVec.length()
          if (dist < clearance && dist > 1e-5) {
            cur.copy(centre).addScaledVector(tVec, clearance / dist)
          }
        }
      }
    }

    // Rebuild tail tube vertices in-place with matching 3-ply contour and arc-length UVs
    const posAttr = tailGeometry.attributes.position as THREE.BufferAttribute
    const normAttr = tailGeometry.attributes.normal as THREE.BufferAttribute
    const uvAttr = tailGeometry.attributes.uv as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array
    const normArr = normAttr.array as Float32Array
    const uvArr = uvAttr.array as Float32Array

    const ringVerts = RADIAL + 1
    const tailR = THREAD_RADIUS * scale
    const twistRate = TWIST_PER_UNIT / Math.max(0.001, scale)
    let arc = 0

    tVec.subVectors(tailPts[1], tailPts[0]).normalize()
    nVec.copy(upHint).addScaledVector(tVec, -tVec.dot(upHint))
    if (nVec.lengthSq() < 1e-6) nVec.set(0, 1, 0)
    else nVec.normalize()

    const fuzzPosAttr = tailFuzzGeometry.attributes.position as THREE.BufferAttribute
    const fuzzNormAttr = tailFuzzGeometry.attributes.aSurfNormal as THREE.BufferAttribute
    const fuzzPosArr = fuzzPosAttr.array as Float32Array
    const fuzzNormArr = fuzzNormAttr.array as Float32Array
    let fuzzIdx = 0

    for (let i = 0; i <= TAIL_SEGMENTS; i++) {
      const p = tailPts[i]
      if (i > 0) arc += p.distanceTo(tailPts[i - 1])

      const prevP = tailPts[Math.max(0, i - 1)]
      const nextP = tailPts[Math.min(TAIL_SEGMENTS, i + 1)]
      tVec.subVectors(nextP, prevP).normalize()
      nVec.addScaledVector(tVec, -tVec.dot(nVec)).normalize()
      bVec.crossVectors(tVec, nVec).normalize()

      const uCoord = arc * twistRate
      const slub = 1 + 0.05 * Math.sin(arc * 6.5)

      for (let j = 0; j <= RADIAL; j++) {
        const vCoord = j / RADIAL
        const angle = vCoord * Math.PI * 2
        const ca = Math.cos(angle)
        const sa = Math.sin(angle)

        const plyPhase = fract(3 * vCoord - 3 * uCoord)
        const plyCrown = Math.pow(Math.sin(Math.PI * plyPhase), 0.45)
        const r = tailR * slub * (0.96 + 0.065 * plyCrown)

        const nx = nVec.x * ca + bVec.x * sa
        const ny = nVec.y * ca + bVec.y * sa
        const nz = nVec.z * ca + bVec.z * sa

        const vi = i * ringVerts + j
        const v3 = vi * 3
        posArr[v3] = p.x + nx * r
        posArr[v3 + 1] = p.y + ny * r
        posArr[v3 + 2] = p.z + nz * r

        normArr[v3] = nx
        normArr[v3 + 1] = ny
        normArr[v3 + 2] = nz

        const v2 = vi * 2
        uvArr[v2] = uCoord
        uvArr[v2 + 1] = vCoord
      }

      // Distribute stray wool hairs along the tail using pre-baked deterministic seeds
      while (fuzzIdx < TAIL_FUZZ_COUNT && (fuzzIdx + 0.5) / TAIL_FUZZ_COUNT <= i / TAIL_SEGMENTS) {
        const s0 = tailFuzzSeeds[fuzzIdx * 4]
        const s1 = tailFuzzSeeds[fuzzIdx * 4 + 1]
        const s2 = tailFuzzSeeds[fuzzIdx * 4 + 2]
        const s3 = tailFuzzSeeds[fuzzIdx * 4 + 3]

        const ang = s0 * Math.PI * 2
        const ca = Math.cos(ang)
        const sa = Math.sin(ang)
        const nx = nVec.x * ca + bVec.x * sa
        const ny = nVec.y * ca + bVec.y * sa
        const nz = nVec.z * ca + bVec.z * sa

        const rx = p.x + nx * tailR * 0.85
        const ry = p.y + ny * tailR * 0.85
        const rz = p.z + nz * tailR * 0.85

        const len = (0.024 + s1 * 0.038) * scale
        const dirSign = s2 < 0.5 ? 1 : -1
        const side = (s3 - 0.5) * 0.85

        const mx = rx + (tVec.x * dirSign * 0.72 + nx * 0.65 + bVec.x * side * 0.4) * (len * 0.55)
        const my = ry + (tVec.y * dirSign * 0.72 + ny * 0.65 + bVec.y * side * 0.4) * (len * 0.55)
        const mz = rz + (tVec.z * dirSign * 0.72 + nz * 0.65 + bVec.z * side * 0.4) * (len * 0.55)

        const tx = mx + (tVec.x * dirSign * 0.45 + nx * 0.92 + bVec.x * side * 0.8) * (len * 0.52)
        const ty = my + (tVec.y * dirSign * 0.45 + ny * 0.92 + bVec.y * side * 0.8) * (len * 0.52)
        const tz = mz + (tVec.z * dirSign * 0.45 + nz * 0.92 + bVec.z * side * 0.8) * (len * 0.52)

        const pOff = fuzzIdx * 9
        fuzzPosArr[pOff] = rx
        fuzzPosArr[pOff + 1] = ry
        fuzzPosArr[pOff + 2] = rz
        fuzzPosArr[pOff + 3] = mx
        fuzzPosArr[pOff + 4] = my
        fuzzPosArr[pOff + 5] = mz
        fuzzPosArr[pOff + 6] = tx
        fuzzPosArr[pOff + 7] = ty
        fuzzPosArr[pOff + 8] = tz

        for (let k = 0; k < 3; k++) {
          const nOff = pOff + k * 3
          fuzzNormArr[nOff] = nx
          fuzzNormArr[nOff + 1] = ny
          fuzzNormArr[nOff + 2] = nz
        }
        fuzzIdx++
      }
    }

    posAttr.needsUpdate = true
    normAttr.needsUpdate = true
    uvAttr.needsUpdate = true
    tailGeometry.computeBoundingSphere()

    fuzzPosAttr.needsUpdate = true
    fuzzNormAttr.needsUpdate = true
    tailFuzzGeometry.computeBoundingSphere()
  })

  return (
    <>
      <group ref={placement} position={position} scale={scale}>
        <group ref={spin}>
          {/* Recessed dark wool core: hides only the deepest sub-surface crevices */}
          <mesh ref={core} visible={false} scale={0.001}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial
              color="#6b1f0f"
              emissive="#1e0602"
              map={textures.map}
              roughness={1}
              metalness={0}
            />
          </mesh>

          <mesh geometry={geometry}>
            <meshPhysicalMaterial
              vertexColors
              map={textures.map}
              normalMap={textures.normalMap}
              normalScale={normalScale}
              roughnessMap={textures.roughnessMap}
              roughness={1}
              metalness={0}
              sheen={1}
              sheenRoughness={0.6}
              sheenColor={YARN_SHEEN}
            />
          </mesh>

          <lineSegments geometry={fuzzGeometry} material={fuzzMaterial} />
        </group>
      </group>

      <mesh ref={tail} geometry={tailGeometry}>
        <meshPhysicalMaterial
          color={YARN_MID}
          map={textures.map}
          normalMap={textures.normalMap}
          normalScale={normalScale}
          roughnessMap={textures.roughnessMap}
          roughness={1}
          metalness={0}
          sheen={1}
          sheenRoughness={0.6}
          sheenColor={YARN_SHEEN}
        />
      </mesh>
      <lineSegments geometry={tailFuzzGeometry} material={fuzzMaterial} />
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
        {/* Warm studio wool lighting: soft ivory key, rich apricot rim for fuzz halo, warm bounce */}
        <hemisphereLight args={["#ffecda", "#220f0a", 0.78]} />
        <directionalLight position={[-3.2, 4.0, 3.5]} intensity={2.75} color="#fff2e0" />
        <directionalLight position={[3.6, 2.4, -3.2]} intensity={2.35} color="#ffbc94" />
        <directionalLight position={[-2.5, -3.2, 2.0]} intensity={0.55} color="#9e4024" />
        <Ball reducedMotion={reducedMotion} pointer={pointer} />
      </Canvas>
    </div>
  )
}

export default YarnBall
