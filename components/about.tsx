const principles = [
  {
    title: "Remote, and async by default",
    body: "We write things down, so work keeps moving across time zones without a meeting for every decision.",
  },
  {
    title: "Shipped beats specified",
    body: "We measure progress in releases people can use, not in documents.",
  },
  {
    title: "Design and engineering together",
    body: "The people who design the interface also build it, so the details survive.",
  },
  {
    title: "Modern, not experimental",
    body: "Current tools, chosen because they will still be maintained in five years.",
  },
]

export function About() {
  return (
    <section id="about" className="border-t border-line bg-bg-raised py-24 md:py-36" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid gap-4 md:grid-cols-12">
          <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">About</p>
          <div className="md:col-span-9">
            <h2 id="about-heading" className="text-display-m font-medium">
              Yarn started from a simple idea: good software is woven, not just
              written. Lots of small threads, pulled together carefully, until
              they hold.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
              We work somewhere between a university lab and an enterprise team.
              We like ideas that are still raw and unstructured, and we turn them
              into applications that scale and stay maintainable after we hand
              them over.
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
