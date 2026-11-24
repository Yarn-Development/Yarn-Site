"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled || menuOpen ? "border-line bg-bg" : "border-transparent bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={close}>
          <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
            <circle cx="12" cy="12" r="10.5" fill="var(--madder)" />
            <path
              d="M4.5 8.5c4.5.8 9.8 5.6 11.6 12.4M8.2 3.6c3.2 3.3 6.6 10 6.9 17.6M2.4 13.6c5.3-1.4 11.4.3 15.6 4.6M13 1.8c1.5 3.2 5.3 6.4 9.2 7.4"
              fill="none"
              stroke="var(--bg)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[1.0625rem] font-semibold tracking-tight">Yarn</span>
          <span className="sr-only">Development, home</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink">
              {l.label}
            </a>
          ))}
          <a href="/#contact" className="btn btn-solid h-9 px-4 text-sm">
            Start a project
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-sm md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        inert={!menuOpen}
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-bg px-5 pb-8 pt-2 transition-[opacity,transform] duration-200 ease-out md:hidden",
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul>
          {[...links, { label: "Contact", href: "/#contact" }].map((l) => (
            <li key={l.href} className="border-b border-line">
              <a href={l.href} onClick={close} className="block py-4 text-2xl font-medium tracking-tight">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
