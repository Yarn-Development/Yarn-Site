export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-serif font-bold text-white">Yarn Development</h3>
            <p className="text-xs font-mono text-gray-500 mt-2">
              © {new Date().getFullYear()} // All systems operational.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-mono text-gray-400">
            <a href="https://github.com/Yarn-Development" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/company/yarndev" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="mailto:admin@yarndev.co.uk" className="hover:text-cyan-400 transition-colors">Email</a>
          </div>

        </div>
      </div>
    </footer>
  )
}