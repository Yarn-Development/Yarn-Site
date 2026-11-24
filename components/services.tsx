import { SectionHeader } from "@/components/section-header"

const services = [
  {
    title: "Tools for teachers",
    body: "Assessment, marking and question generation that fit how a department already works, with LaTeX where maths needs it.",
    detail: "Nicolaou's Maths, QGenie",
  },
  {
    title: "Evidence and progress",
    body: "Bringing records from many places into one clear view of how a pupil is doing, written so a family can follow it too.",
    detail: "Sendix",
  },
  {
    title: "Working with school data",
    body: "Connecting to the systems schools already use, from MIS data to Microsoft 365 folders and forms, so staff don't type anything twice.",
    detail: "Sendix",
  },
  {
    title: "AI that shows its working",
    body: "Language models used where they save staff time, with every suggestion traced back to the document it came from.",
    detail: "Sendix, QGenie, Statisfy",
  },
]

export function Services() {
  return (
    <section id="services" className="border-t border-line py-24 md:py-36" aria-labelledby="services-heading">
      <div className="container">
        <SectionHeader id="services-heading" label="What we build">
          Software that gives teachers time back and shows its evidence.
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
                <p className="mt-3 text-sm text-ink-faint">Seen in {service.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
