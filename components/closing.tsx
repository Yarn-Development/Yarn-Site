import { ArrowUpRight } from "lucide-react"

/**
 * The page ends where the story does: on Sendix.
 */
export function Closing() {
  return (
    <section className="border-t border-line py-24 md:py-32" aria-labelledby="closing-heading">
      <div className="container grid gap-8 md:grid-cols-12">
        <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">Where it&rsquo;s all heading</p>
        <div className="md:col-span-9">
          <h2 id="closing-heading" className="text-display-l font-semibold">
            Every child who needs extra support should have a plan that&rsquo;s
            working, and the evidence to show it.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Sendix shows schools whether each child&rsquo;s support is working,
            and gets the evidence ready for every review.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://sendix.ai" target="_blank" rel="noopener" className="btn btn-solid">
              Visit sendix.ai
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#sendix" className="btn btn-quiet">
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
