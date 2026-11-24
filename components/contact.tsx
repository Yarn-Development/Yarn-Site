"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const PROJECT_TYPES = ["Software for a school or trust", "An education product", "Something else"]

type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      form.reset()
      setStatus("sent")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="border-t border-line py-24 md:py-36" aria-labelledby="contact-heading">
      <div className="container grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-sm text-ink-muted">Contact</p>
          <h2 id="contact-heading" className="mt-4 text-display-l font-semibold">
            Tell us what you&rsquo;re making.
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-muted">
            A few lines is enough to start. If you would rather write directly,
            email{" "}
            <a href="mailto:admin@yarndev.co.uk" className="link text-ink">
              admin@yarndev.co.uk
            </a>
            .
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {status === "sent" ? (
            <div role="status" className="rise rounded-lg border border-line p-8">
              <p className="text-xl font-medium">Thanks, that&rsquo;s with us.</p>
              <p className="mt-2 text-ink-muted">We&rsquo;ll reply by email soon.</p>
              <button type="button" className="link mt-6 text-sm text-ink-muted" onClick={() => setStatus("idle")}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input id="name" name="name" required autoComplete="name" className="field" />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                </Field>
              </div>
              <Field label="Company" htmlFor="company" optional>
                <input id="company" name="company" autoComplete="organization" className="field" />
              </Field>
              <Field label="What kind of project?" htmlFor="projectType">
                <select id="projectType" name="projectType" defaultValue={PROJECT_TYPES[0]} className="field field-select">
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} className="bg-bg-raised">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="About the project" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  placeholder="What you want to build, who it's for, and any timing we should know about."
                  className="field resize-y"
                />
              </Field>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                  {status !== "sending" && <ArrowRight className="size-4" aria-hidden="true" />}
                </button>
                <p aria-live="polite" className="text-sm text-madder">
                  {status === "error" && "That didn't send. Please try again, or email us directly."}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm text-ink-muted">
        {label}
        {optional && <span className="text-ink-faint"> (optional)</span>}
      </label>
      {children}
    </div>
  )
}
