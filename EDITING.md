# Editing this site

A quick reference for making changes without having to relearn the structure each time.

## The three layers

**Content** (edit often) → **Components** (edit rarely) → **Pages** (edit occasionally)

## 1. Content — where you'll spend most of your time

- **[lib/site.ts](lib/site.ts)** — single source of truth for your name, tagline, email,
  resume link, and the nav menu (labels + order). Change something here once and it
  updates everywhere it's used (nav, page titles, hero, etc.).
- **[content/caseStudies.ts](content/caseStudies.ts)** — a typed array, one object per
  project. Add a new entry and it automatically appears as a card on `/work` and gets
  its own page at `/work/<slug>`. You never touch page code to add a project.
- **[content/experience.ts](content/experience.ts)** — a typed array of work-history
  entries (`period`, `role`, `company`), shown as the "Where I've Worked" list on
  `/about`. Newest first.

## 2. Components — reusable pieces

- **[components/NavChip.tsx](components/NavChip.tsx)** — the pill nav (home icon, links,
  active-state highlight, email icon). It reads its content from `lib/site.ts`, so only
  edit this file to change *how* the nav looks or behaves, not what's in it.
- **[components/CopyEmailButton.tsx](components/CopyEmailButton.tsx)** — the click-to-copy
  envelope icon.
- **[components/CaseStudyCard.tsx](components/CaseStudyCard.tsx)** — the card template
  used on the `/work` grid. Edit this to change how every case-study card looks at once.

## 3. Pages — actual routes

Next.js uses **file path = URL** (the App Router). Each folder in `app/` is a route:

| File | URL | What's there |
|---|---|---|
| `app/page.tsx` | `/` | Landing hero |
| `app/about/page.tsx` | `/about` | Bio — edit the placeholder paragraphs directly |
| `app/work/page.tsx` | `/work` | Grid — pulls from `caseStudies.ts`, rarely needs edits |
| `app/work/[slug]/page.tsx` | `/work/anything` | Case-study detail template — rarely needs edits since content lives in `caseStudies.ts` |
| `app/map/page.tsx` | `/map` | Placeholder — to be designed later |
| `app/layout.tsx` | (wraps everything) | Fonts + `<NavChip>`, shown on every page |

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
