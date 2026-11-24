export type ProjectStatus = "Live" | "Venture Lab" | "Retired"

export interface Project {
  slug: string
  name: string
  sector: string
  status: ProjectStatus
  summary: string
  /** One line on what this project taught us, shown in the opened row */
  lesson?: string
  stack: string[]
  stat?: { value: string; label: string }
  /** Thread colour used for the project's swatch */
  colour: string
  logo?: { src: string; width: number; height: number }
  href?: string
  github?: string
}

/*
 * Ordered as a path: the education work that led to Sendix first,
 * then the rest of the studio's work.
 */
export const projects: Project[] = [
  {
    slug: "nicolaous-maths",
    name: "Nicolaou's Maths",
    sector: "EdTech",
    status: "Live",
    summary:
      "Our first product, built for one maths teacher: real-time assessment, LaTeX rendering and question generation, so lessons go on teaching rather than formatting papers.",
    lesson: "Teachers will adopt a tool the week it saves them an evening.",
    stack: ["Next.js", "PostgreSQL", "LaTeX", "Real-time"],
    stat: { value: "1,000+", label: "assessments generated" },
    colour: "#d4512f",
  },
  {
    slug: "qgenie",
    name: "QGenie",
    sector: "EdTech",
    status: "Venture Lab",
    summary:
      "Generates LaTeX-formatted exam papers for STEM subjects, with difficulty calibrated per question rather than per paper.",
    lesson: "Generated work is only useful when a teacher can see why it was made that way.",
    stack: ["Express", "MongoDB", "LaTeX"],
    stat: { value: "500+", label: "papers generated" },
    colour: "#d9a441",
    logo: { src: "/logos/qgenie.png", width: 1200, height: 562 },
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
    slug: "sendix-legacy",
    name: "Sendix Legacy",
    sector: "Sales automation",
    status: "Retired",
    summary:
      "The first product to carry the Sendix name: cold email with lead enrichment and personalisation. The name has since moved to our tool for schools.",
    stack: ["Supabase", "TypeScript", "GPT-4"],
    stat: { value: "99%", label: "delivery rate" },
    colour: "#5a7bb5",
    logo: { src: "/logos/sendix.png", width: 309, height: 62 },
  },
]
