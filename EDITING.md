# Editing this site

A quick reference for making changes without having to relearn the structure each time.

## The three layers

**Content** (edit often) → **Components** (edit rarely) → **Pages** (edit occasionally)

## 1. Content — where you'll spend most of your time

- **[lib/site.ts](lib/site.ts)** — single source of truth for your name, tagline, email,
  resume link, and the nav menu (labels + order). Change something here once and it
  updates everywhere it's used (nav, page titles, hero, etc.).
- **[content/caseStudies.ts](content/caseStudies.ts)** — a typed array, one object per
  project. Add a new entry and it automatically appears as a card on `/portfolio` and
  gets its own page at `/portfolio/<slug>`. You never touch page code to add a project.
  The detail page top is an editorial layout: `title` + `category`, then a
  `role` / `tools` / `timeline` sidebar next to `summary` (Description) and
  `context` (paragraphs). Anything you put in `sections` renders further down
  the page behind a "Read Case Study" button — leave it empty (`[]`) until
  you're ready to break a project out with more detail/pictures. Optional
  `links` (e.g. a published paper or live site) show as small underlined
  links under Context.
- **[content/experience.ts](content/experience.ts)** — a typed array of work-history
  entries (`period`, `role`, `company`), shown as the "Where I've Worked" list on
  `/portfolio`. Newest first.
- **[content/mapPlaces.ts](content/mapPlaces.ts)** — the stops on the "Journey" map at
  the bottom of the landing page. `journeyStops` is one ordered, scattered trail — each
  stop has an `x`/`y` position (0-100, percentage of the map canvas), a `label` (bold
  headline) and `caption` (short secondary line) that are always visible, and either an
  `href` (links straight to a case study/section) or a `blurb` (longer text shown in a
  popover on click). Give a stop a `sketch` ("burruss" or "dc") for a full custom
  illustration, or an `icon` (see `StopIcon.tsx` for the available glyphs) for a
  simpler colored-tile icon. `easterEggs` are separate, off-trail — small emoji with a
  hover tooltip, also positioned by `x`/`y`.

## 2. Components — reusable pieces

- **[components/NavChip.tsx](components/NavChip.tsx)** — the pill nav (home icon, links,
  active-state highlight, email icon). It reads its content from `lib/site.ts`, so only
  edit this file to change *how* the nav looks or behaves, not what's in it.
- **[components/CopyEmailButton.tsx](components/CopyEmailButton.tsx)** — the click-to-copy
  envelope icon.
- **[components/CaseStudyCard.tsx](components/CaseStudyCard.tsx)** — the card template
  used on the `/portfolio` grid. Edit this to change how every case-study card looks at once.
- **[components/JourneyMap.tsx](components/JourneyMap.tsx)** — the map section on the
  landing page. Reads from `content/mapPlaces.ts`; edit this file to change the layout
  itself (the wiggly connector path, marker/popover behavior, dot colors).
- **[components/BurrussHallSketch.tsx](components/BurrussHallSketch.tsx)** and
  **[components/WashingtonMonumentSketch.tsx](components/WashingtonMonumentSketch.tsx)**
  — the two full custom map illustrations, hand-built from SVG shapes (not traced images).
- **[components/StopIcon.tsx](components/StopIcon.tsx)** — simpler colored-tile glyphs
  (robot, ribbon, steering wheel, padlock, lightbulb, shield) for map stops that don't
  have a full illustration. Add a new glyph here to give a future stop its own icon.

## 3. Pages — actual routes

Next.js uses **file path = URL** (the App Router). Each folder in `app/` is a route:

| File | URL | What's there |
|---|---|---|
| `app/page.tsx` | `/` | Landing hero → the "Journey" map (`JourneyMap`) |
| `app/portfolio/page.tsx` | `/portfolio` | Single long-scroll page: bio → "Where I've Worked" → case-study grid. Edit the placeholder bio paragraphs directly; the rest pulls from `experience.ts` / `caseStudies.ts` |
| `app/portfolio/[slug]/page.tsx` | `/portfolio/anything` | Case-study detail template — rarely needs edits since content lives in `caseStudies.ts` |
| `app/layout.tsx` | (wraps everything) | Fonts + `<NavChip>`, shown on every page |

There's no separate About or Map page anymore — the bio/work history live at the top of
`/portfolio`, and the map lives at the bottom of `/`. The nav's "Map" link is an anchor
(`/#map`) that scrolls to it rather than a real route.

## Design tokens

**[tailwind.config.ts](tailwind.config.ts)** holds the whimsical palette (`coral`, `peach`,
`sky`, `leaf`, `butter`) and shape tokens (`rounded-blob`, `shadow-soft`). Pages use these
names as Tailwind classes (`bg-coral`, `rounded-blob`) instead of raw hex codes — change a
color once here and it updates sitewide.

## The efficient editing loop

1. `npm run dev`, keep `http://localhost:3000` open — everything hot-reloads as you save.
2. **Most content changes** = edit `lib/site.ts` or `content/caseStudies.ts`. No
   component/page code touched.
3. **Visual tweaks** (spacing, color, size) = find the Tailwind utility classes directly
   in the JSX (e.g. `text-6xl`, `mt-8`, `bg-coral`) and adjust in place — no separate CSS
   files to hunt through.
4. When happy:
   ```
   git add -A
   git commit -m "..."
   git push
   ```
   Vercel auto-deploys on every push to `main`.

**Rule of thumb:** content changes → `lib/site.ts` / `caseStudies.ts`. Layout/visual
changes → the relevant `app/*/page.tsx` file. Shared UI changes → `components/`.
