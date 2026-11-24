import { useId } from "react"
import Image from "next/image"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

/**
 * A project shown as a yarn-shop swatch: a plain-weave sample in the project's
 * thread colour, with a paper label carrying the name and the headline number.
 */
export function Swatch({
  project,
  index,
  className,
}: {
  project: Project
  index: number
  className?: string
}) {
  const id = `weave-${project.slug}-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  return (
    <figure className={cn("relative h-full w-full overflow-hidden bg-bg-sunken", className)}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            {/* warp, underneath */}
            <rect x="1.5" y="0" width="8" height="22" fill={project.colour} />
            <rect x="12.5" y="0" width="8" height="22" fill={project.colour} />
            {/* weft */}
            <rect x="0" y="1.5" width="22" height="8" fill={project.colour} style={{ filter: "brightness(0.62)" }} />
            <rect x="0" y="12.5" width="22" height="8" fill={project.colour} style={{ filter: "brightness(0.62)" }} />
            {/* warp, over: alternating cells make it a plain weave */}
            <rect x="1.5" y="0" width="8" height="11" fill={project.colour} />
            <rect x="12.5" y="11" width="8" height="11" fill={project.colour} />
          </pattern>
          <radialGradient id={`${id}-light`} cx="30%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <rect width="100%" height="100%" fill={`url(#${id}-light)`} />
      </svg>

      <figcaption className="absolute inset-x-4 bottom-4 rounded-md bg-[#ede7db] p-5 text-[#1a1814] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] sm:inset-x-5 sm:bottom-5">
        <span className="absolute right-5 top-5 size-2.5 rounded-full bg-bg-sunken" aria-hidden="true" />
        <p className="text-xs tabular-nums text-[#6b6458]">
          No. {String(index + 1).padStart(2, "0")} · {project.status}
        </p>

        <div className="mt-4 flex h-10 items-center">
          {project.logo ? (
            <Image
              src={project.logo.src}
              alt={project.name}
              width={project.logo.width}
              height={project.logo.height}
              className="h-full w-auto max-w-[70%] object-contain object-left mix-blend-multiply"
            />
          ) : (
            <span className="text-2xl font-semibold tracking-tight">{project.name}</span>
          )}
        </div>

        <div className="mt-5 border-t border-[#cfc6b6] pt-4">
          <p className="text-4xl font-semibold tabular-nums tracking-tight">{project.stat.value}</p>
          <p className="mt-1 text-sm text-[#6b6458]">{project.stat.label}</p>
        </div>
      </figcaption>
    </figure>
  )
}
