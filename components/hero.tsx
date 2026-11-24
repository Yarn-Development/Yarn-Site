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
            <span className="block">We build</span>
            <span className="block">software for</span>
            <span className="block text-ink-muted">education.</span>
          </h1>
        </div>

        <div className="rise mt-8 max-w-md" style={{ animationDelay: "220ms" }}>
          <p className="text-lg leading-relaxed text-ink-muted">
            Yarn has built tools for teachers since 2021, from maths
            assessment to exam generation. Our newest, Sendix, shows schools
            whether each child&rsquo;s support is working.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#sendix" className="btn btn-solid">
              See how Sendix works
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-quiet">
              Work with us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
