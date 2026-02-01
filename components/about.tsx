"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Zap, Target, Cpu } from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Remote Collective",
    description: "Async workflows delivering across time zones.",
  },
  {
    icon: Target,
    title: "Outcome Oriented",
    description: "We don't just write code; we ship products.",
  },
  {
    icon: Zap,
    title: "Design Led",
    description: "Engineering that respects the pixel.",
  },
  {
    icon: Cpu,
    title: "Modern Stack",
    description: "Bleeding edge tech, stable execution.",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-yarn-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-zinc-700" />
              <span className="text-xs font-mono text-zinc-600 uppercase">About Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-6 text-balance">
              Who <em className="font-serif text-zinc-400">We</em> Are
            </h2>
            
            <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed text-pretty">
              <p>
                Yarn Development is a creative technology studio founded on a simple premise: 
                <em className="font-serif text-zinc-300"> great software is woven, not just written.</em>
              </p>
              <p>
                We bridge the gap between "University Innovation" and "Enterprise Reliability." 
                Our team specializes in taking raw, unstructured ideas and spinning them into 
                functional, scalable applications.
              </p>
              <p className="text-zinc-500">
                Next.js. Supabase. Vercel. AI. We work with modern tools 
                to build products that matter.
              </p>
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-zinc-800/50 bg-yarn-base hover:border-zinc-700/80 transition-colors duration-150 rounded-sm">
                  <CardContent className="p-5">
                    <value.icon className="size-6 text-zinc-600 mb-4" />
                    <h3 className="text-sm font-sans font-semibold text-zinc-200 mb-2 text-balance">
                      {value.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed text-pretty">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
