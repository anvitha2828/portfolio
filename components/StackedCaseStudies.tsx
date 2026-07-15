"use client";

import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { AutoScrollGallery } from "./AutoScrollGallery";

// A full-viewport-height "card" per case study, stacked in document flow.
// Each one is `sticky top-0 h-screen`, so as you scroll it pins in place —
// filling the page — until the next card (right below it in the flow)
// scrolls up and, being later in the DOM, paints over it and takes its
// place as the new pinned card. No JS scroll listeners needed; it's a
// well-known CSS-only trick (stacked `position: sticky` sections all
// sharing the same `top`).
export function StackedCaseStudies({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  return (
    <>
      {caseStudies.map((study) => (
        <StackedCard key={study.slug} study={study} />
      ))}
    </>
  );
}

function StackedCard({ study }: { study: CaseStudy }) {
  const images = [
    ...(study.featuredImages ?? []),
    ...(study.gallery ?? []),
  ];
  if (images.length === 0 && study.cover) images.push(study.cover);

  return (
    // No separate inset "gutter" layer — the section itself is the rounded
    // card. At rest (fully pinned, filling the viewport) the top corners
    // sit exactly at the viewport edge and are invisible, same as the
    // shadow. Both only become visible naturally while this card is still
    // mid-scroll, sliding up over the previous one, which is exactly when
    // we want the curve+shadow to read as "a new page being pulled up."
    <section
      className="sticky top-0 flex h-screen w-screen flex-col overflow-hidden rounded-t-[2.5rem] bg-cream shadow-[0_2px_10px_rgba(43,42,38,0.15)]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-5 pb-6 pt-8 sm:px-8 sm:pt-10">
        <div className="relative">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-ink/50">
              {study.category ?? "Case Study"}
              {study.timeline ? ` — ${study.timeline}` : ""}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {study.title}
            </h2>
            <p className="mt-3 text-lg text-ink/70">{study.summary}</p>
            {study.role.length > 0 && (
              <p className="mt-3 text-ink/60">{study.role.join(" • ")}</p>
            )}
          </div>

          <Link
            href={`/portfolio/${study.slug}`}
            className="absolute right-0 top-0 inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream transition-transform hover:scale-105"
          >
            {study.ctaLabel ?? "View case study"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Background tint stays full window width for the "sticky page"
          look, but the photos themselves are capped to the same max-w-5xl
          column as the text above — otherwise they'd spread edge-to-edge
          on ultra-wide screens, same issue as the hero sketches. */}
      <div className="relative min-h-0 flex-1 bg-ink/[0.03]">
        <div className="mx-auto h-full max-w-5xl">
          {images.length > 0 ? (
            <AutoScrollGallery images={images} alt={study.title} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-3xl font-bold text-ink/20">
                {study.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
