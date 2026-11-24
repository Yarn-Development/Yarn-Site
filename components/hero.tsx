"use client"

import dynamic from "next/dynamic"
import { ArrowDown } from "lucide-react"

const YarnBall = dynamic(() => import("@/components/canvas/yarn-ball").then((m) => m.YarnBall), {
  ssr: false,
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="rise absolute inset-0" style={{ animationDuration: "1200ms" }}>
        <YarnBall />
      </div>

      <div className="container relative flex flex-col justify-end pb-10 pt-28 md:justify-center md:pb-16">
        <div className="rise" style={{ animationDelay: "120ms" }}>
          <h1 id="hero-heading" className="text-display-xl font-semibold">
            <span className="block">Software is</span>
            <span className="block">woven, not just</span>
            <span className="block text-ink-muted">written.</span>
          </h1>
        </div>

        <div className="rise mt-8 max-w-md" style={{ animationDelay: "220ms" }}>
          <p className="text-lg leading-relaxed text-ink-muted">
            Yarn Development is a small UK studio that has spent five years
            building software for education: maths assessment, exam
            generation and tools for special educational needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-solid">
              See the work
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-quiet">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
