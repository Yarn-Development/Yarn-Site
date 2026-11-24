import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="container pb-24 pt-32 md:pt-40">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">Last updated {lastUpdated}</p>
          <div className="md:col-span-8">
            <h1 className="text-display-l font-semibold">{title}</h1>
            <article className="prose mt-12 max-w-[68ch]">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
