import { SectionHeader } from "@/components/section-header"

const services = [
  {
    title: "Full-stack product builds",
    body: "Web platforms on Next.js, Supabase and Vercel, typed end to end, with the boring parts (auth, billing, background jobs) done properly.",
    tools: "React, TypeScript, PostgreSQL",
  },
  {
    title: "AI features",
    body: "Retrieval pipelines, model integrations and evaluation, scoped so the feature is useful on day one and cheap enough to keep running.",
    tools: "OpenAI, vector search, evals",
  },
  {
    title: "Learning platforms",
    body: "Tools for teachers and students: assessment, question generation, LaTeX rendering and real-time classroom features.",
    tools: "LMS integrations, real-time",
  },
  {
    title: "Product strategy",
    body: "For ideas that are still loose. We work out what to build first, prototype it, and test it with real users before committing to the full build.",
    tools: "Discovery, prototyping",
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-36" aria-labelledby="services-heading">
      <div className="container">
        <SectionHeader id="services-heading" label="What we do">
          We take a product from first sketch to something people rely on.
        </SectionHeader>

        <ol className="mt-14 grid gap-x-10 md:mt-20 md:grid-cols-12">
          {services.map((service, i) => (
            <li
              key={service.title}
              className="grid gap-3 border-t border-line py-8 md:col-span-9 md:col-start-4 md:grid-cols-9 md:gap-6"
            >
              <span className="text-sm tabular-nums text-ink-faint md:col-span-1 md:pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-medium tracking-tight md:col-span-3">{service.title}</h3>
              <div className="md:col-span-5">
                <p className="leading-relaxed text-ink-muted">{service.body}</p>
                <p className="mt-3 text-sm text-ink-faint">{service.tools}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
