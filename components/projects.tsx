"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Terminal } from "lucide-react"

const projects = [
  {
    title: "Sendix",
    description: "AI-powered cold email platform with lead enrichment and GPT-4 personalization.",
    tags: ["GPT-4", "Supabase", "TypeScript"],
    category: "SaaS",
    status: "Live",
    stats: "99% Delivery Rate",
  },
  {
    title: "Statisfy",
    description: "Deep social media analytics using LLMs to interpret engagement metrics.",
    tags: ["OpenAI", "React", "Node.js"],
    category: "Analytics",
    status: "Beta",
    stats: "1M+ Rows Analyzed",
  },
  {
    title: "QGenie",
    description: "LaTeX-formatted exam generation for STEM subjects using generative AI.",
    tags: ["LaTeX", "MongoDB", "Express"],
    category: "EdTech",
    status: "Prototype",
    stats: "500+ Papers Generated",
  },
  // Add more as needed
]

export function Projects() {
  return (
    <section id="projects" className="py-32 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with "Terminal" style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-fuchsia-500 mb-2 font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>~/portfolio/selected-works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Selected Works
            </h2>
          </div>
          <Button variant="outline" onClick={() => window.open('https://github.com/Yarn-Development', '_blank')} className="mt-4 md:mt-0 border-white/20 hover:bg-white/5 hover:text-white font-mono text-xs uppercase tracking-wider">
            View GitHub Archive
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group border-0 bg-transparent"
            >
              {/* The "File Folder" Visual */}
              <div className="relative aspect-video mb-6 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-neutral-900 to-black group-hover:border-cyan-500/50 transition-colors">
                {/* Abstract Line Art / Placeholder for Screenshot */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                   <div className="w-full h-[1px] bg-cyan-500 rotate-45 transform scale-150" />
                   <div className="w-full h-[1px] bg-fuchsia-500 -rotate-45 transform scale-150" />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-black/50 backdrop-blur text-xs font-mono border-white/20 text-white">
                    {project.status}
                  </Badge>
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                   <p className="font-mono text-xs text-cyan-400">{project.stats}</p>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                     <Github className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" />
                     <ExternalLink className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" />
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-mono text-gray-500 border border-white/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}