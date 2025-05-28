import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Zap, Target } from "lucide-react"

const values = [
  {
    icon: Users,
    title: "Collaborative & Remote-first",
    description:
      "Our team works collaboratively using modern dev tools and async workflows, delivering across different time zones and university schedules.",
  },
  {
    icon: Target,
    title: "Agile & Outcome-Oriented",
    description:
      "We prioritize iterative development, regular client check-ins, and clear deliverables to ensure projects meet goals on time and within scope.",
  },
  {
    icon: Zap,
    title: "Design-led Development",
    description:
      "We believe great user experience starts with thoughtful design—our builds often start with Figma prototypes and user-centric feedback loops.",
  },
  {
    icon: Globe,
    title: "Innovation-Focused",
    description:
      "We stay at the forefront of technology trends, constantly exploring new tools and methodologies to deliver cutting-edge solutions.",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Yarn Development</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're a creative technology studio founded by university students with a passion for turning innovative
              ideas into practical, impactful digital products. Our core philosophy is to weave technology into stories
              that solve real-world problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              To bridge the gap between innovative ideas and practical solutions, creating digital products that not
              only meet technical requirements but also tell compelling stories and solve meaningful problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
