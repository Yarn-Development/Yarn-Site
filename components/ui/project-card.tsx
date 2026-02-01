"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Project {
  title: string
  description: string
  tags: string[]
  category: string
  status: "Live" | "Beta" | "Prototype" | "Venture Lab"
  stats?: string
  href?: string
  github?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const isVentureLab = project.status === "Venture Lab"
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-sm",
        "border border-zinc-800/50 bg-yarn-surface",
        "hover:border-zinc-700/80 transition-colors duration-150",
        isVentureLab && "opacity-80",
        className
      )}
    >
      {/* Status badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge 
          variant="outline" 
          className={cn(
            "rounded-sm text-[10px] font-mono uppercase border-zinc-800 bg-yarn-base/80",
            isVentureLab ? "text-zinc-600" : "text-zinc-400"
          )}
        >
          {project.status}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <span className="text-[10px] font-mono text-zinc-600 uppercase mb-3 block">
          {project.category}
        </span>
        
        {/* Title */}
        <h3 className={cn(
          "text-xl font-sans font-semibold mb-3 text-balance",
          "group-hover:text-white transition-colors duration-150",
          isVentureLab ? "text-zinc-500" : "text-zinc-200"
        )}>
          {project.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-zinc-500 mb-4 leading-relaxed line-clamp-3 text-pretty">
          {project.description}
        </p>
        
        {/* Stats */}
        {project.stats && (
          <div className="mb-4 py-2 px-3 rounded-sm bg-yarn-base border border-zinc-800/30">
            <span className="text-xs font-mono text-zinc-400 tabular-nums">
              {project.stats}
            </span>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 rounded-sm bg-zinc-900 border border-zinc-800/30"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-zinc-800/30">
          {project.href && (
            <a 
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors duration-150"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink className="size-3" />
              <span>View</span>
            </a>
          )}
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors duration-150"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="size-3" />
              <span>Source</span>
            </a>
          )}
          <ArrowUpRight className="size-4 text-zinc-700 ml-auto group-hover:text-zinc-400 transition-colors duration-150" />
        </div>
      </div>
    </motion.article>
  )
}

// Featured project card (larger, more prominent)
export function FeaturedProjectCard({ project, index, className }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "group relative overflow-hidden rounded-sm",
        "border border-zinc-800/50 bg-yarn-surface",
        "hover:border-zinc-700/80 transition-colors duration-150",
        className
      )}
    >
      {/* Visual area */}
      <div className="relative aspect-[16/9] bg-yarn-base overflow-hidden">
        {/* Abstract visual placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-150">
          <div className="w-full h-[1px] bg-zinc-500 rotate-12 transform scale-150" />
          <div className="absolute w-full h-[1px] bg-zinc-600 -rotate-12 transform scale-150" />
        </div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant="outline" 
            className="rounded-sm text-[10px] font-mono uppercase border-zinc-700 bg-yarn-base/90 text-zinc-300"
          >
            {project.status}
          </Badge>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-1 bg-yarn-base/90 rounded-sm border border-zinc-800/50">
            {project.category}
          </span>
        </div>
        
        {/* Stats overlay */}
        {project.stats && (
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-mono text-zinc-300 tabular-nums px-2 py-1 bg-yarn-base/90 rounded-sm border border-zinc-800/50">
              {project.stats}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-sans font-semibold text-zinc-100 mb-3 group-hover:text-white transition-colors duration-150 text-balance">
          {project.title}
        </h3>
        
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed text-pretty">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-[10px] font-mono text-zinc-500 px-2 py-1 rounded-sm bg-zinc-900 border border-zinc-800/50"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {project.href && (
            <a 
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-sans text-zinc-300 hover:text-white transition-colors duration-150"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink className="size-4" />
              <span>View Project</span>
            </a>
          )}
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-sans text-zinc-400 hover:text-white transition-colors duration-150"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="size-4" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
