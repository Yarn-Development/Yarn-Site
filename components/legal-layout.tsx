import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-yarn-base">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header with navigation */}
          <header className="mb-8">
            <Link href="/" aria-label="Back to home page">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-6 border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 rounded-sm transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-zinc-100 mb-2 font-sans">{title}</h1>
            <p className="text-zinc-500 font-mono text-sm">Last updated: {lastUpdated}</p>
          </header>
          
          {/* Main content */}
          <main>
            <article className="bg-yarn-surface border border-zinc-800/50 rounded-sm p-8 prose prose-lg max-w-none">
              {children}
            </article>
          </main>
          
          {/* Footer navigation */}
          <footer className="mt-8 pt-8 border-t border-zinc-800/50">
            <nav className="flex flex-wrap gap-6 text-sm font-mono text-zinc-500" aria-label="Legal pages">
              <Link 
                href="/privacy" 
                className="hover:text-zinc-300 transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-zinc-300 transition-colors duration-150"
              >
                Terms of Service
              </Link>
              <Link 
                href="/" 
                className="hover:text-zinc-300 transition-colors duration-150"
              >
                Home
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}
