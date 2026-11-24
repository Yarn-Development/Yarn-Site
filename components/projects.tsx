"use client"

import { useState } from "react"
import { ArrowUpRight, Plus } from "lucide-react"
import { projects } from "@/lib/projects"
import { Swatch } from "@/components/swatch"
import { SectionHeader } from "@/components/section-header"
import { cn } from "@/lib/utils"

/*
 * Work is an index, not a card grid. Hovering or focusing a row slides the
 * matching swatch into the sticky frame on the left; clicking a row opens its
 * notes in place. On small screens the swatch moves inside the opened row.
 */
export function Projects() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="work" className="border-t border-line py-24 md:py-36" aria-labelledby="work-heading">
      <div className="container">
        <SectionHeader id="work-heading" label="Selected work">
          Five products, from classroom tools to sales automation.
        </SectionHeader>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          {/* Sticky swatch frame (desktop) */}
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-28">
              <div className="aspect-[4/5] overflow-hidden rounded-lg">
                <div
                  className="flex h-full flex-col transition-transform duration-700 ease-in-out motion-reduce:transition-none"
                  style={{ transform: `translateY(-${active * 100}%)` }}
                >
                  {projects.map((project, i) => (
                    <div key={project.slug} className="h-full shrink-0" aria-hidden={i !== active}>
                      <Swatch project={project} index={i} />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 flex justify-between text-sm tabular-nums text-ink-faint" aria-hidden="true">
                <span>{projects[active].sector}</span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>

          {/* Index */}
          <ol className="group/list md:col-span-7">
            {projects.map((project, i) => {
              const isOpen = open === project.slug
              const panelId = `work-${project.slug}`
              return (
                <li key={project.slug} className="group/row border-b border-line first:border-t">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => {
                        setActive(i)
                        setOpen(isOpen ? null : project.slug)
                      }}
                      className="grid w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-6 text-left md:py-7"
                    >
                      <span className="text-sm tabular-nums text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-display-m font-medium transition-colors duration-200",
                          "group-hover/list:text-ink-faint group-hover/row:!text-ink",
                        )}
                      >
                        {project.name}
                      </span>
                      <span className="flex items-center gap-4 text-sm text-ink-muted">
                        <span className="hidden sm:inline">{project.sector}</span>
                        <Plus
                          className={cn(
                            "size-4 transition-transform duration-200 ease-out",
                            isOpen && "rotate-45",
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-label={project.name}
                    inert={!isOpen}
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-10 sm:pl-[3.25rem]">
                        <div className="mb-8 aspect-[4/5] max-w-xs overflow-hidden rounded-lg md:hidden">
                          <Swatch project={project} index={i} />
                        </div>

                        <p className="max-w-prose text-lg leading-relaxed text-ink-muted">{project.summary}</p>

                        <dl className="mt-8 grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
                          <div>
                            <dt className="text-ink-faint">Status</dt>
                            <dd className="mt-1">{project.status}</dd>
                          </div>
                          <div>
                            <dt className="text-ink-faint">Result</dt>
                            <dd className="mt-1 tabular-nums">
                              {project.stat.value} {project.stat.label}
                            </dd>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <dt className="text-ink-faint">Built with</dt>
                            <dd className="mt-1">{project.stack.join(", ")}</dd>
                          </div>
                        </dl>

                        {(project.href || project.github) && (
                          <div className="mt-8 flex gap-6 text-sm">
                            {project.href && (
                              <a href={project.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                                Visit site <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              </a>
                            )}
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                                Source <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <p className="mt-12 text-sm text-ink-muted md:text-right">
          More of our open-source work is on{" "}
          <a href="https://github.com/Yarn-Development" target="_blank" rel="noopener noreferrer" className="link text-ink">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  )
}
