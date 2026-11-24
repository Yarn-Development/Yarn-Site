# Yarn design system

The site should feel like a small studio's own work: warm, quiet and specific.
Each rule below replaces a default that made the old site look generated.

## Colour

Tokens live in `app/globals.css` and are exposed to Tailwind in `tailwind.config.ts`.

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#0f0e0c` | Page background. A warm, undyed-wool dark, not neutral black. |
| `bg-raised` | `#171512` | One step up, used for the About band. |
| `bg-sunken` | `#0a0908` | Behind swatches. |
| `line` / `line-strong` | `#2a2722` / `#3b372f` | Hairlines and field borders. |
| `ink` | `#ede7db` | Primary text. |
| `ink-muted` | `#a39b8d` | Body copy and secondary text (about 7:1 on `bg`). |
| `ink-faint` | `#756d61` | Index numbers and metadata only. Never for sentences. |
| `madder` | `#d4512f` | The single accent: the hero yarn, focus rings, selection, errors. |

Project swatches each have their own thread colour (in `lib/projects.ts`). Those
colours appear only inside swatches, never in UI chrome.

The Sendix product window (`components/sendix.tsx`) is the one place that uses
another palette: Sendix's own warm paper, forest green (`#1c6a44`) and sunflower
(`#f2bb3a`), so it reads as a window into that product. Status colours there
follow the Sendix app: green for Working and Achieved, sunflower for Partly
working, amber for Not working (never red), and a hollow dot for Not enough
evidence yet.

## Story

The page is ordered as an argument: we build software for education (hero),
here is what we are building now and how to read it (Sendix), here is the work
that led to it (index, education projects first), what we build, who we are, and
it closes on Sendix's vision. Sendix copy follows the Sendix claim rules: no
invented numbers or customers, "connects to your MIS from day one", no
compliance language, initials only for children.

## Type

One family, Schibsted Grotesk, for everything. Hierarchy comes from size, weight
and colour. There is no serif accent word and no monospace eyebrow labels.

- `text-display-xl`: hero headline only.
- `text-display-l`: section statements.
- `text-display-m`: project names and the About statement.
- Body: `text-lg` at `leading-relaxed` in `ink-muted`.
- Labels: plain sentence-case `text-sm` in `ink-muted`. No uppercase tracking.
- Numbers: `tabular-nums`.

## Layout

A 12-column grid inside `container`. Every section opens the same way
(`SectionHeader`): a small label in columns 1 to 3 and the statement in 4 to 12.
Sections are separated by a single hairline rather than by cards or backgrounds.
Lists (work, services, principles) use hairline rows instead of bento cards and
icon tiles.

## Motion

Based on Emil Kowalski's design engineering guidelines.

- Easing tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` for things
  arriving and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` for things
  moving on screen. Tailwind: `ease-out`, `ease-in-out`.
- Buttons scale to `0.97` on press (160ms).
- Hover styles only apply on devices that can hover (`hoverOnlyWhenSupported`).
- Section content uses one `rise` entrance (opacity and 10px of translate, run on
  the compositor). No per-word staggers, no scroll-linked effects.
- UI transitions stay at or under 300ms. The exceptions are the swatch frame
  slide (700ms, ease-in-out, because it is the showpiece) and the hero winding.
- `prefers-reduced-motion`: entrances become fades, the swatch frame jumps, and
  the hero ball renders already wound with no spin or tilt.

## Components

- `.btn` with `.btn-solid` (one per view) or `.btn-quiet`.
- `.link`: underlined inline link.
- `.field` and `.field-select`: form controls. Always paired with a visible `<label>`.
- `Swatch`: a project as a woven sample with a paper label (number, status, logo
  or name, headline figure).
- `YarnBall` (`components/canvas/yarn-ball.tsx`): the hero scene. A single
  continuous thread wound around a precessing axis, drawn progressively.
