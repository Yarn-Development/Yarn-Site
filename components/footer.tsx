import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-line py-12 md:py-16">
      <div className="container grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-lg font-semibold tracking-tight">Yarn Development</p>
          <p className="mt-1 text-ink-muted">Software is woven, not just written.</p>
        </div>

        <nav aria-label="Elsewhere" className="text-sm md:col-span-3">
          <ul className="grid gap-2">
            <li>
              <a href="https://github.com/Yarn-Development" target="_blank" rel="noopener noreferrer" className="text-ink-muted transition-colors duration-200 hover:text-ink">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/yarndev" target="_blank" rel="noopener noreferrer" className="text-ink-muted transition-colors duration-200 hover:text-ink">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:admin@yarndev.co.uk" className="text-ink-muted transition-colors duration-200 hover:text-ink">
                admin@yarndev.co.uk
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal" className="text-sm md:col-span-3">
          <ul className="grid gap-2">
            <li>
              <Link href="/privacy" className="text-ink-muted transition-colors duration-200 hover:text-ink">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-ink-muted transition-colors duration-200 hover:text-ink">
                Terms of service
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-sm text-ink-faint md:col-span-12">
          © {new Date().getFullYear()} Yarn Development. Made in the UK.
        </p>
      </div>
    </footer>
  )
}
