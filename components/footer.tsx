export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-yarn-base py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-sans font-semibold text-zinc-100 text-balance">
              Yarn Development
            </h3>
            <p className="text-xs font-mono text-zinc-600 mt-2">
              © {new Date().getFullYear()} // All systems operational.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-8 text-sm font-mono text-zinc-500" aria-label="Footer navigation">
            <a 
              href="https://github.com/Yarn-Development" 
              className="hover:text-zinc-300 transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/company/yarndev" 
              className="hover:text-zinc-300 transition-colors duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:admin@yarndev.co.uk" 
              className="hover:text-zinc-300 transition-colors duration-150"
            >
              Email
            </a>
          </nav>

        </div>
      </div>
    </footer>
  )
}
