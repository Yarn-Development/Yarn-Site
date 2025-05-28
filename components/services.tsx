import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code2, Lightbulb, GraduationCap, Users, Rocket } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Product Ideation & Prototyping",
    description: "Collaborating with clients and teams to turn raw ideas into validated MVPs with clear user value.",
    features: ["User Research", "MVP Development", "Market Validation", "Prototype Testing"],
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "Building scalable, secure, and modern applications using React, Node.js, Supabase, and cutting-edge technologies.",
    features: ["React & Next.js", "Node.js Backend", "Database Design", "API Development"],
  },
  {
    icon: Brain,
    title: "AI Integrations",
    description:
      "Leveraging GPT models, OCR, and data science tools to build smart and responsive features that enhance user experience.",
    features: ["LLM Integration", "OCR Solutions", "Data Analytics", "Smart Automation"],
  },
  {
    icon: GraduationCap,
    title: "Educational Technology",
    description:
      "Designing digital platforms that enhance teaching and learning through interactive assessments and AI-generated content.",
    features: ["Learning Platforms", "Assessment Tools", "Content Generation", "Progress Tracking"],
  },
  {
    icon: Users,
    title: "Client & Commission Work",
    description:
      "Delivering tailored software projects with structured payment plans, maintenance phases, and clear timelines.",
    features: ["Custom Solutions", "Project Management", "Ongoing Support", "Clear Deliverables"],
  },
  {
    icon: Rocket,
    title: "Startup Solutions",
    description:
      "Specialized services for startups including rapid prototyping, technical consulting, and scalable architecture design.",
    features: ["Rapid Prototyping", "Technical Consulting", "Scalable Architecture", "Growth Planning"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ideation to deployment, we provide comprehensive technology solutions that drive innovation and solve
            complex challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
