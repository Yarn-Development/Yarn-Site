const principles = [
  {
    title: "Teachers shape it",
    body: "Every product so far started with a question from someone in a school.",
  },
  {
    title: "Plain words",
    body: "If a parent or a new member of staff can't follow a screen, it isn't finished.",
  },
  {
    title: "Show the evidence",
    body: "A status or a suggestion always links back to where it came from.",
  },
  {
    title: "Stay with it",
    body: "We keep improving what we've built, and hand it over properly when it outgrows us.",
  },
]

export function About() {
  return (
    <section id="about" className="border-t border-line bg-bg-raised py-24 md:py-36" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid gap-4 md:grid-cols-12">
          <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">About Yarn</p>
          <div className="md:col-span-9">
            <h2 id="about-heading" className="text-display-m font-medium">
              Good software is woven, not just written. Lots of small threads,
              pulled together carefully, until they hold.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Yarn started in 2021 building maths tools for a single teacher.
              Since then most of our work has stayed in education, and each
              project has come from a question someone in a school asked us.
            </p>
          </div>
        </div>

        <dl className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-line-strong pt-5">
              <dt className="font-medium">{p.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
