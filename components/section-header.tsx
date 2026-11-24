/**
 * Section opener used across the page: a small plain label in the left
 * columns and the section statement set large on the right.
 */
export function SectionHeader({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <header className="grid gap-4 md:grid-cols-12">
      <p className="text-sm text-ink-muted md:col-span-3 md:pt-3">{label}</p>
      <h2 id={id} className="text-display-l font-semibold md:col-span-9">
        {children}
      </h2>
    </header>
  )
}
