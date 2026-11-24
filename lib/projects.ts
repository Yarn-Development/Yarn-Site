export type ProjectStatus = "Live" | "Venture Lab"

export interface Project {
  slug: string
  name: string
  sector: string
  status: ProjectStatus
  summary: string
  stack: string[]
  stat: { value: string; label: string }
  /** Thread colour used for the project's swatch */
  colour: string
  logo?: { src: string; width: number; height: number }
  href?: string
  github?: string
}

export const projects: Project[] = [
  {
    slug: "nicolaous-maths",
    name: "Nicolaou's Maths",
    sector: "EdTech",
    status: "Live",
    summary:
      "Workflow automation for maths teaching: real-time assessment, LaTeX rendering and question generation, so teachers spend their time teaching rather than formatting papers.",
    stack: ["Next.js", "PostgreSQL", "LaTeX", "Real-time"],
    stat: { value: "1,000+", label: "assessments generated" },
    colour: "#d4512f",
  },
  {
    slug: "servstu",
    name: "ServStu",
    sector: "Marketplace",
    status: "Live",
    summary:
      "A multi-tenant marketplace connecting service providers with clients, with real-time booking, payments and analytics dashboards for each provider.",
    stack: ["React", "Node.js", "Stripe", "WebSockets"],
    stat: { value: "500+", label: "active providers" },
    colour: "#7d9a5b",
  },
  {
    slug: "sendix",
    name: "Sendix",
    sector: "Sales automation",
    status: "Venture Lab",
    summary:
      "Cold email with lead enrichment and model-written personalisation, built around the compliance requirements enterprise sales teams actually have.",
    stack: ["Supabase", "TypeScript", "GPT-4"],
    stat: { value: "99%", label: "delivery rate" },
    colour: "#5a7bb5",
    logo: { src: "/logos/sendix.png", width: 309, height: 62 },
  },
  {
    slug: "statisfy",
    name: "Statisfy",
    sector: "Social analytics",
    status: "Venture Lab",
    summary:
      "Social media analytics that uses language models to explain engagement numbers and turn them into concrete next steps for creators.",
    stack: ["React", "Node.js", "OpenAI"],
    stat: { value: "1M+", label: "rows analysed" },
    colour: "#9a7bb0",
    logo: { src: "/logos/statisfy.png", width: 1200, height: 321 },
  },
  {
    slug: "qgenie",
    name: "QGenie",
    sector: "EdTech",
    status: "Venture Lab",
    summary:
      "Generates LaTeX-formatted exam papers for STEM subjects, with difficulty calibrated per question rather than per paper.",
    stack: ["Express", "MongoDB", "LaTeX"],
    stat: { value: "500+", label: "papers generated" },
    colour: "#d9a441",
    logo: { src: "/logos/qgenie.png", width: 1200, height: 562 },
  },
]
