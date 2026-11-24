"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * Sendix, explained by showing it. One child's plan: evidence arrives from the
 * places it already lives, threads link each piece to the outcome it speaks to,
 * and every outcome gets a plain status. It plays once when scrolled into view;
 * the step buttons jump to any stage. Colours inside the window follow the
 * Sendix brand (warm paper, forest green, sunflower), not the Yarn site.
 */

type Status = "Working" | "Partly working" | "Not working" | "Not enough evidence yet" | "Achieved"

const SOURCES = [
  { id: "salt", title: "Speech and language report", from: "Uploaded in March" },
  { id: "teacher", title: "Class teacher's notes", from: "Termly staff form" },
  { id: "parent", title: "Parent views", from: "Microsoft Forms" },
  { id: "mis", title: "Attendance and behaviour", from: "From the MIS" },
] as const

type SourceId = (typeof SOURCES)[number]["id"]

const OUTCOMES: { id: string; text: string; status: Status; sources: SourceId[] }[] = [
  {
    id: "talk",
    text: "Starts a conversation with a classmate at least twice a day.",
    status: "Working",
    sources: ["salt", "teacher", "parent"],
  },
  {
    id: "read",
    text: "Reads a short text and answers questions about it.",
    status: "Partly working",
    sources: ["teacher", "parent"],
  },
  {
    id: "move",
    text: "Moves between lessons calmly with one reminder.",
    status: "Not enough evidence yet",
    sources: ["mis"],
  },
]

const LEGEND: { status: Status; meaning: string }[] = [
  { status: "Working", meaning: "The evidence shows steady progress towards the outcome." },
  { status: "Partly working", meaning: "Some progress, with gaps worth talking through." },
  { status: "Not working", meaning: "Little progress so far, so the support should change." },
  { status: "Not enough evidence yet", meaning: "Too little to judge, and now you know what to gather." },
  { status: "Achieved", meaning: "The outcome is met. Time to set the next one." },
]

const STEPS = [
  {
    label: "Gather",
    caption: "Evidence comes from where it already lives: reports, staff notes, parent views and the school's MIS.",
  },
  {
    label: "Connect",
    caption: "Each piece is linked to the outcome it speaks to, so nothing is read on its own.",
  },
  {
    label: "Judge",
    caption: "Every outcome gets a plain status. A single thin thread means there isn't enough to judge yet, which is worth knowing before the meeting.",
  },
  {
    label: "Prepare",
    caption: "By the review, the evidence is already grouped under each outcome, ready to talk through with the family.",
  },
]

const STEP_MS = 2800

const PAPER = {
  bg: "#fbfaf5",
  sunk: "#f2f0e6",
  line: "#e2dfd2",
  ink: "#10241b",
  soft: "#3f5348",
  muted: "#56685e",
  leaf: "#1c6a44",
  sun: "#f2bb3a",
  sunSoft: "#fbf2d6",
  amber: "#b45309",
}

function StatusDot({ status }: { status: Status }) {
  const style: React.CSSProperties =
    status === "Working"
      ? { background: PAPER.leaf }
      : status === "Partly working"
        ? { background: PAPER.sun }
        : status === "Not working"
          ? { background: PAPER.amber }
          : status === "Achieved"
            ? { background: PAPER.bg, boxShadow: `inset 0 0 0 2.5px ${PAPER.leaf}` }
            : { background: "transparent", boxShadow: `inset 0 0 0 1.5px ${PAPER.muted}` }
  return <span className="inline-block size-2.5 shrink-0 rounded-full" style={style} aria-hidden="true" />
}

function threadColour(status: Status) {
  if (status === "Working" || status === "Achieved") return PAPER.leaf
  if (status === "Partly working") return PAPER.sun
  if (status === "Not working") return PAPER.amber
  return PAPER.muted
}

interface Thread {
  key: string
  d: string
  status: Status
  order: number
}

export function Sendix() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([])

  const section = useRef<HTMLDivElement>(null)
  const board = useRef<HTMLDivElement>(null)
  const sourceEls = useRef<Record<string, HTMLLIElement | null>>({})
  const outcomeEls = useRef<Record<string, HTMLLIElement | null>>({})

  // Reduced motion: show the finished state and never autoplay
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(STEPS.length - 1)
      setPlayed(true)
    }
  }, [])

  // Play once when the window is well into view
  useEffect(() => {
    const el = section.current
    if (!el || played) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true)
          setStep(0)
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [played])

  useEffect(() => {
    if (!playing) return
    if (step >= STEPS.length - 1) {
      setPlaying(false)
      return
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => window.clearTimeout(t)
  }, [playing, step])

  // Measure rows and draw a curve from each source to each outcome it feeds
  const measure = useCallback(() => {
    const root = board.current
    if (!root) return
    const box = root.getBoundingClientRect()
    const next: Thread[] = []
    let order = 0
    for (const outcome of OUTCOMES) {
      const to = outcomeEls.current[outcome.id]?.getBoundingClientRect()
      if (!to) continue
      for (const sourceId of outcome.sources) {
        const from = sourceEls.current[sourceId]?.getBoundingClientRect()
        if (!from) continue
        const x1 = from.right - box.left
        const y1 = from.top + from.height / 2 - box.top
        const x2 = to.left - box.left
        const y2 = to.top + to.height / 2 - box.top
        const mid = (x2 - x1) / 2
        next.push({
          key: `${sourceId}-${outcome.id}`,
          d: `M ${x1} ${y1} C ${x1 + mid} ${y1}, ${x2 - mid} ${y2}, ${x2} ${y2}`,
          status: outcome.status,
          order: order++,
        })
      }
    }
    setThreads(next)
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (board.current) ro.observe(board.current)
    return () => ro.disconnect()
  }, [measure])

  const jump = (i: number) => {
    setPlaying(false)
    setStep(i)
  }

  const replay = () => {
    setStep(0)
    setPlaying(true)
  }

  const connected = step >= 1
  const judged = step >= 2
  const prepared = step >= 3

  return (
    <section id="sendix" className="border-t border-line py-24 md:py-36" aria-labelledby="sendix-heading">
      <div className="container">
        <header className="grid gap-4 md:grid-cols-12">
          <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">What we&rsquo;re building now</p>
          <div className="md:col-span-9">
            <h2 id="sendix-heading" className="text-display-l font-semibold">
              Sendix: see whether every child&rsquo;s support is working.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              A teacher we built for asked a harder question than marking: is
              the support in a child&rsquo;s plan actually working, and can the
              school show it at the review? Sendix brings the evidence together
              and shows, outcome by outcome, whether each child is on track.
            </p>
          </div>
        </header>

        <div ref={section} className="mt-14 md:mt-20">
          {/* The product window */}
          <div
            className="overflow-hidden rounded-xl"
            style={{ background: PAPER.bg, color: PAPER.ink }}
            role="img"
            aria-label="A child's support plan in Sendix: four evidence sources linked to three outcomes. Starting conversations is working, reading is partly working, and moving between lessons has not enough evidence yet."
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-8" style={{ borderColor: PAPER.line }}>
              <div className="flex items-center gap-3">
                <span
                  className="flex size-9 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ background: PAPER.sunSoft, color: PAPER.ink }}
                  aria-hidden="true"
                >
                  AM
                </span>
                <div>
                  <p className="font-semibold leading-tight">A.M., Year 4</p>
                  <p className="text-sm" style={{ color: PAPER.muted }}>
                    Support plan, three outcomes
                  </p>
                </div>
              </div>
              <p className="text-sm" style={{ color: PAPER.soft }}>
                Annual review in 3 weeks
              </p>
            </div>

            <div ref={board} className="relative grid gap-10 px-5 py-8 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-24 md:py-10">
              {/* Threads (desktop only, where the columns sit side by side) */}
              <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden="true">
                {threads.map((t) => (
                  <path
                    key={t.key}
                    d={t.d}
                    pathLength={1}
                    fill="none"
                    strokeLinecap="round"
                    strokeWidth={judged ? 2 : 1.5}
                    stroke={judged ? threadColour(t.status) : PAPER.muted}
                    strokeOpacity={judged ? 0.85 : 0.45}
                    strokeDasharray="1 1"
                    style={{
                      strokeDashoffset: connected ? 0 : 1,
                      transition: `stroke-dashoffset 900ms var(--ease-in-out) ${connected ? t.order * 90 : 0}ms, stroke 300ms ease, stroke-opacity 300ms ease`,
                    }}
                  />
                ))}
              </svg>

              <div>
                <p className="mb-3 text-sm font-medium" style={{ color: PAPER.muted }}>
                  Evidence
                </p>
                <ul className="grid gap-2.5">
                  {SOURCES.map((s, i) => (
                    <li
                      key={s.id}
                      ref={(el) => {
                        sourceEls.current[s.id] = el
                      }}
                      className="relative rounded-lg border px-4 py-3 transition-[opacity,transform] duration-500 ease-out"
                      style={{
                        borderColor: PAPER.line,
                        background: "#fffefa",
                        opacity: played ? 1 : 0,
                        transform: played ? "none" : "translateY(8px)",
                        transitionDelay: `${i * 70}ms`,
                      }}
                    >
                      <p className="font-medium">{s.title}</p>
                      <p className="text-sm" style={{ color: PAPER.muted }}>
                        {s.from}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium" style={{ color: PAPER.muted }}>
                  Outcomes
                </p>
                <ul className="grid gap-2.5">
                  {OUTCOMES.map((o) => (
                    <li
                      key={o.id}
                      ref={(el) => {
                        outcomeEls.current[o.id] = el
                      }}
                      className="rounded-lg border px-4 py-3"
                      style={{ borderColor: PAPER.line, background: "#fffefa" }}
                    >
                      <p className="font-medium">{o.text}</p>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
                        <span
                          className="flex items-center gap-2 transition-opacity duration-300"
                          style={{ opacity: judged ? 1 : 0, color: PAPER.soft }}
                        >
                          <StatusDot status={o.status} />
                          {o.status}
                        </span>
                        <span style={{ color: PAPER.muted }}>
                          <span className="md:hidden">
                            From {o.sources.map((id) => SOURCES.find((s) => s.id === id)!.title.toLowerCase()).join(", ")}
                          </span>
                          <span className="hidden md:inline">
                            {o.sources.length} {o.sources.length === 1 ? "source" : "sources"}
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="flex items-center gap-3 border-t px-5 py-4 text-sm transition-[opacity,transform] duration-500 ease-out sm:px-8"
              style={{
                borderColor: PAPER.line,
                background: PAPER.sunk,
                opacity: prepared ? 1 : 0,
                transform: prepared ? "none" : "translateY(6px)",
              }}
            >
              <span className="flex size-6 items-center justify-center rounded-full" style={{ background: PAPER.leaf, color: "#fff" }} aria-hidden="true">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span>
                Ready for the review: evidence grouped under each outcome, with one gap to fill first.
              </span>
            </div>
          </div>

          {/* Steps: what you're looking at, one stage at a time */}
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <div className="flex flex-wrap gap-2 md:col-span-5" role="group" aria-label="Walk through how Sendix works">
              {STEPS.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => jump(i)}
                  aria-pressed={step === i}
                  className={cn(
                    "btn h-9 px-4 text-sm",
                    step === i ? "btn-solid" : "btn-quiet text-ink-muted",
                  )}
                >
                  <span className="tabular-nums text-ink-faint">{i + 1}</span> {s.label}
                </button>
              ))}
              {played && !playing && step === STEPS.length - 1 && (
                <button type="button" onClick={replay} className="link ml-2 self-center text-sm text-ink-muted">
                  Replay
                </button>
              )}
            </div>
            <p aria-live="polite" className="text-lg leading-relaxed md:col-span-7">
              {STEPS[step].caption}
            </p>
          </div>
        </div>

        {/* How to read a status: the part that teaches */}
        <div className="mt-20 grid gap-4 md:grid-cols-12">
          <h3 className="text-sm text-ink-muted md:col-span-3 md:pt-1">How to read a status</h3>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
            {LEGEND.map((l) => (
              <div key={l.status} className="border-t border-line pt-4">
                <dt className="flex items-center gap-2.5 font-medium">
                  <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full" style={{ background: PAPER.bg }}>
                    <StatusDot status={l.status} />
                  </span>
                  {l.status}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{l.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 md:pl-[25%]">
          <a href="https://sendix.ai" target="_blank" rel="noopener" className="btn btn-solid">
            Visit sendix.ai
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <p className="text-sm text-ink-muted">
            For schools, colleges and trusts. Connects to your MIS from day one.
          </p>
        </div>
      </div>
    </section>
  )
}
