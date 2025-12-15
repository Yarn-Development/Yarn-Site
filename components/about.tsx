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
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Who We Are
            </h2>
            <div className="space-y-6 text-gray-400 font-mono text-sm md:text-base leading-relaxed">
              <p>
                Yarn Development is a creative technology studio founded on a simple premise: 
                <span className="text-cyan-400"> great software is woven, not just written.</span>
              </p>
              <p>
                We bridge the gap between "University Innovation" and "Enterprise Reliability." 
                Our team specializes in taking raw, unstructured ideas and spinning them into 
                functional, scalable applications using Next.js, AI, and Cloud Architecture.
              </p>
            </div>
          </div>

          {/* Grid of Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:border-cyan-500/30 transition-colors backdrop-blur-sm">
                <CardContent className="p-6">
                  <value.icon className="w-8 h-8 text-fuchsia-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2 font-serif">{value.title}</h3>
                  <p className="text-sm text-gray-500 font-mono">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}