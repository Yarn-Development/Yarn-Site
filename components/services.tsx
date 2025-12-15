"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code2, Lightbulb, GraduationCap, Users, Rocket, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    description: "Next.js, Supabase, and Vercel architecture. We build scalable, type-safe applications that perform.",
    tags: ["React", "PostgreSQL", "TypeScript"],
    colSpan: "md:col-span-2", // Bento: Wide Item
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "LLM implementation & RAG pipelines.",
    tags: ["OpenAI", "Vector DBs"],
    colSpan: "md:col-span-1", // Bento: Small Item
  },
  {
    icon: GraduationCap,
    title: "EdTech Platforms",
    description: "Specialized learning environments with real-time assessment tools.",
    tags: ["LMS", "Real-time"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy",
    description: "From napkin sketch to validated MVP. We bridge the gap between creative spark and technical execution.",
    tags: ["Prototyping", "Discovery"],
    colSpan: "md:col-span-2",
  },
]

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 border-l-2 border-fuchsia-500 pl-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-400 font-mono max-w-2xl">
            Technical rigour meets creative fluidity.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-md hover:border-fuchsia-500/50 transition-colors duration-500",
                service.colSpan
              )}
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-fuchsia-500/50 transition-colors">
                    <service.icon className="w-5 h-5 text-gray-300 group-hover:text-fuchsia-400" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-fuchsia-500 transition-colors" />
                </div>
                <CardTitle className="text-2xl font-serif text-white group-hover:text-fuchsia-50 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/50">
                      {`// ${tag}`}
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