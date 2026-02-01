"use client"

import { motion } from "motion/react"
import { FeaturedProjectCard, ProjectCard, type Project } from "@/components/ui/project-card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

// Project data with new hierarchy per specification
const projects: Project[] = [
  {
    title: "Nicolaou's Maths",
    description: "Comprehensive workflow automation for STEM education. Real-time assessment tools, LaTeX rendering, and intelligent question generation for mathematics instruction.",
    tags: ["Next.js", "LaTeX", "Real-time", "PostgreSQL"],
    category: "EdTech",
    status: "Live",
    stats: "1,000+ Assessments Generated",
    featured: true,
  },
  {
    title: "ServStu",
    description: "Complex marketplace architecture connecting service providers with clients. Multi-tenant system with real-time booking, payments, and analytics dashboards.",
    tags: ["React", "Node.js", "Stripe", "WebSockets"],
    category: "Marketplace",
    status: "Live",
    stats: "500+ Active Providers",
    featured: true,
  },
  {
    title: "Sendix",
    description: "AI-powered cold email platform with lead enrichment and GPT-4 personalization. High-stakes compliance for enterprise sales automation.",
    tags: ["GPT-4", "Supabase", "TypeScript", "Compliance"],
    category: "Venture Lab",
    status: "Venture Lab",
    stats: "99% Delivery Rate",
    featured: false,
  },
  {
    title: "Statisfy",
    description: "Deep social media analytics using LLMs to interpret engagement metrics and provide actionable insights for content creators.",
    tags: ["OpenAI", "React", "Node.js", "Analytics"],
    category: "Venture Lab",
    status: "Venture Lab",
    stats: "1M+ Rows Analyzed",
    featured: false,
  },
  {
    title: "QGenie",
    description: "LaTeX-formatted exam generation for STEM subjects using generative AI. Automated paper creation with difficulty calibration.",
    tags: ["LaTeX", "MongoDB", "Express", "AI"],
    category: "Venture Lab",
    status: "Venture Lab",
    stats: "500+ Papers Generated",
    featured: false,
  },
]

export function Projects() {
  const featuredProjects = projects.filter(p => p.featured)
  const ventureLabProjects = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 md:py-32 bg-yarn-base" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-zinc-700" />
            <span className="text-xs font-mono text-zinc-600 uppercase">Case Studies</span>
          </div>
          
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-sans font-bold text-white mb-4 text-balance">
            Selected <em className="font-serif text-zinc-400">Work</em>
          </h2>
          
          <p className="text-zinc-500 max-w-xl text-pretty">
            Process-first development. Each project represents a unique problem space 
            and our systematic approach to solving it.
          </p>
        </motion.div>

        {/* Featured Projects - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Venture Lab Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-[1px] bg-zinc-800" />
            <span className="text-xs font-mono text-zinc-600 uppercase">Venture Lab</span>
          </div>
          
          <p className="text-sm text-zinc-600 max-w-lg text-pretty">
            Experimental projects and high-stakes ventures. These represent our R&D efforts 
            in emerging technology spaces.
          </p>
        </motion.div>

        {/* Venture Lab Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ventureLabProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <Button 
            variant="outline" 
            className="border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 rounded-sm font-mono text-xs uppercase transition-colors duration-150"
            onClick={() => window.open('https://github.com/Yarn-Development', '_blank')}
          >
            <Github className="size-4 mr-2" />
            View All on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
