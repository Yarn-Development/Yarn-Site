import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-yarn-base py-12" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-sans font-semibold text-zinc-100 text-balance">
                Yarn Development
              </h3>
              <p className="text-xs font-mono text-zinc-600 mt-2">
                Software is woven, not just written.
              </p>
            </div>

            {/* Social Links */}
            <nav className="flex gap-8 text-sm font-mono text-zinc-500" aria-label="Social media links">
              <a 
                href="https://github.com/Yarn-Development" 
                className="hover:text-zinc-300 transition-colors duration-150"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yarn Development GitHub"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/company/yarndev" 
                className="hover:text-zinc-300 transition-colors duration-150"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yarn Development LinkedIn"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:admin@yarndev.co.uk" 
                className="hover:text-zinc-300 transition-colors duration-150"
                aria-label="Email Yarn Development"
              >
                Email
              </a>
            </nav>
          </div>

          {/* Bottom bar with legal links and copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800/30">
            
            {/* Legal Links */}
            <nav className="flex gap-6 text-xs font-mono text-zinc-600" aria-label="Legal pages">
              <Link 
                href="/privacy" 
                className="hover:text-zinc-400 transition-colors duration-150"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="hover:text-zinc-400 transition-colors duration-150"
              >
                Terms of Service
              </Link>
            </nav>

            {/* Copyright */}
            <p className="text-xs font-mono text-zinc-600">
              © {new Date().getFullYear()} Yarn Development. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
