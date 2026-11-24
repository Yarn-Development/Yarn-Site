import { SectionHeader } from "@/components/section-header"

const services = [
  {
    title: "Tools for teachers",
    body: "Assessment, marking and question generation that fit how a department already works, with LaTeX where maths needs it.",
    detail: "Nicolaou's Maths",
  },
  {
    title: "Generated learning materials",
    body: "Exam papers and practice sets generated to a specification, with difficulty set question by question and a teacher in control of the result.",
    detail: "QGenie",
  },
  {
    title: "Special educational needs",
    body: "Software for the plans behind children with extra support, built alongside the staff who write and review them.",
    detail: "Sendix MVP",
  },
  {
    title: "Data products",
    body: "Marketplaces and analytics that taught us to handle real data at scale, which every education product needs sooner or later.",
    detail: "ServStu, Statisfy",
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-36" aria-labelledby="services-heading">
      <div className="container">
        <SectionHeader id="services-heading" label="What we do">
          We build software for teachers, and the children they support.
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
                <p className="mt-3 text-sm text-ink-faint">See {service.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
