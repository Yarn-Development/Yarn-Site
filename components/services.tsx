"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code2, Lightbulb, GraduationCap, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description: "Next.js, Supabase, and Vercel architecture. We build scalable, type-safe applications with modern tooling.",
    tags: ["React", "PostgreSQL", "TypeScript"],
    colSpan: "lg:col-span-2",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "LLM implementation & RAG pipelines for intelligent applications.",
    tags: ["OpenAI", "Vector DBs"],
    colSpan: "lg:col-span-1",
  },
  {
    icon: GraduationCap,
    title: "EdTech Platforms",
    description: "Specialized learning environments with real-time assessment tools.",
    tags: ["LMS", "Real-time"],
    colSpan: "lg:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy",
    description: "From napkin sketch to validated MVP. We bridge creative spark and technical execution.",
    tags: ["Prototyping", "Discovery"],
    colSpan: "lg:col-span-2",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-yarn-base" aria-labelledby="services-heading">
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
            <span className="text-xs font-mono text-zinc-600 uppercase">Capabilities</span>
          </div>
          
          <h2 id="services-heading" className="text-3xl md:text-4xl font-sans font-bold text-white mb-4 text-balance">
            Technical <em className="font-serif text-zinc-400">Expertise</em>
          </h2>
          
          <p className="text-zinc-500 max-w-xl text-pretty">
            Rigorous engineering meets creative problem-solving. We specialize in 
            complex systems that scale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={service.colSpan}
            >
              <Card className="group h-full border-zinc-800/50 bg-yarn-surface hover:border-zinc-700/80 transition-colors duration-150 rounded-sm">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-10 rounded-sm bg-yarn-base flex items-center justify-center border border-zinc-800/50 group-hover:border-zinc-700 transition-colors duration-150">
                      <service.icon className="size-5 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-150" />
                    </div>
                    <ArrowUpRight className="size-4 text-zinc-800 group-hover:text-zinc-500 transition-colors duration-150" />
                  </div>
                  <CardTitle className="text-lg font-sans font-semibold text-zinc-200 group-hover:text-white transition-colors duration-150 text-balance">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-zinc-500 leading-relaxed text-pretty">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 rounded-sm bg-yarn-base border border-zinc-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
