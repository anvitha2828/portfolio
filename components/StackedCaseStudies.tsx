"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import type { CaseStudy } from "@/content/caseStudies";
import { imageSrc, isVideoSrc } from "@/content/caseStudies";

const CARD_HEIGHT_VH = 72;
const STEP_VH = 9; // vertical gap between each card's resting spot — this is how much of each earlier card's header stays peeking above the next
const START_TOP_VH = 4;
// The stacking reveal only uses the first 93% of this section's scroll —
// the rest is a pinned "hold" with nothing left to animate, so the last
// card is fully settled well before the page is released to continue
// scrolling past this section, instead of finishing at the exact instant
// it lets go.
const ANIMATION_END = 0.93;

function stickyHeightVh(total: number) {
  return START_TOP_VH + (total - 1) * STEP_VH + CARD_HEIGHT_VH + 2;
}

// A peeking card stack: one shared sticky viewport (not one `sticky` per
// card — see below for why) holds every card, each absolutely positioned
// and driven by the SAME scroll progress, animating into its own resting
// slot over its own slice of the timeline and then staying there —
// framer-motion's useTransform clamps output at the range's end value, so
// a card can't drift or get covered further no matter how much more you
// scroll after it settles.
//
// An earlier version gave each card its own `position: sticky`, but a
// sticky element only holds its "stuck" position for a scroll distance
// equal to its own height — far short of the whole reveal's length — so
// earlier cards would detach and keep scrolling once that budget ran out,
// which looked like the last card sliding over/covering them.
export function StackedCaseStudies({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = caseStudies.length;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${total * 90}vh` }}
    >
      <div
        className="sticky top-0 w-screen"
        style={{
          height: `${stickyHeightVh(total)}vh`,
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        {caseStudies.map((study, i) => (
          <StackedCard
            key={study.slug}
            study={study}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function StackedCard({
  study,
  index,
  total,
  progress,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const finalTopVh = START_TOP_VH + index * STEP_VH;

  // The first card is on screen immediately, no scroll needed. Every card
  // after it arrives one at a time — each gets its own equal slice of the
  // reveal window (arrivals spread across 0-ANIMATION_END), sliding up
  // from well below the visible sticky viewport (fully hidden, not just a
  // partial offset) into its resting slot, then staying there.
  const arrivals = Math.max(total - 1, 1);
  const rangeStart = index === 0 ? 0 : ((index - 1) / arrivals) * ANIMATION_END;
  const rangeEnd = index === 0 ? 0 : (index / arrivals) * ANIMATION_END;
  const offscreenTopVh = stickyHeightVh(total) + 20;

  const topVh = useTransform(
    progress,
    index === 0 ? [0, 1] : [rangeStart, rangeEnd],
    index === 0 ? [finalTopVh, finalTopVh] : [offscreenTopVh, finalTopVh],
  );
  const top = useMotionTemplate`${topVh}vh`;

  // Each card keeps subtly shrinking after it arrives, up through
  // ANIMATION_END, as later cards stack on top of it — giving the pile a
  // sense of receding depth. The last card is the exception: its arrival
  // slide already ends exactly at ANIMATION_END, leaving no room
  // afterward for a separate shrink phase — trying to add one squeezed it
  // into an instant snap. Instead it shrinks *during* its own slide-in
  // (same window), settling into both its position and its smaller scale
  // together, smoothly, by the time it arrives.
  const isLast = index === total - 1;
  const targetScale = Math.max(0.5, 1 - (total - index) * 0.06);
  const scale = useTransform(
    progress,
    isLast ? [rangeStart, rangeEnd] : [rangeEnd, ANIMATION_END],
    [1, targetScale],
  );

  // Up to 3 photos — one big image on narrow/phone screens, but on wider
  // screens there's room to show more at a smaller size instead of just
  // one blown-up crop, so each successive one only reveals at a wider
  // breakpoint (sm, then lg).
  const photos = [
    ...(study.featuredImages ?? []),
    ...(study.gallery ?? []),
  ].slice(0, 3);
  if (photos.length === 0 && study.cover) photos.push(study.cover);

  return (
    <motion.section
      style={{
        top,
        scale,
        height: `${CARD_HEIGHT_VH}vh`,
        zIndex: index + 1,
      }}
      className="absolute inset-x-0 mx-auto flex w-full max-w-[1600px] origin-top flex-col overflow-hidden rounded-[2.5rem] bg-cream shadow-[0_8px_30px_rgba(43,42,38,0.18)]"
    >
      {/* Kept the tighter top padding from the peek-visibility tweak (so
          the CTA stays high on the card), but restored category-then-title
          order — the category line is now bold/full-ink instead of the
          faded gray it used to be, so it stays prominent without needing
          to lead. */}
      <div className="mx-auto w-full max-w-5xl px-5 pb-6 pt-4 sm:px-8 sm:pt-5">
        <div className="relative">
          <div className="max-w-3xl">
            <p
              className="text-sm font-bold"
              style={{ color: study.accentColor ?? "#2B2A26" }}
            >
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
            style={{ backgroundColor: study.accentColor ?? "#2B2A26" }}
            className="absolute right-0 top-0 inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-semibold text-cream transition-transform hover:scale-105"
          >
            {study.ctaLabel ?? "View case study"}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Photos — a horizontally-scrolling filmstrip doesn't suit a
          shrinking, peeking card, so this truncates to a handful of
          cropped images instead: just one full-bleed on narrow/phone
          screens, with the 2nd and 3rd only revealing at wider
          breakpoints where there's room for them to sit smaller
          side-by-side rather than one photo blown up. */}
      <div className="relative flex min-h-0 flex-1 gap-1 bg-ink/[0.03]">
        {photos.length > 0 ? (
          photos.map((photo, i) => {
            const src = imageSrc(photo);
            const className = `h-full flex-1 object-contain ${
              i === 1 ? "hidden sm:block" : i === 2 ? "hidden lg:block" : ""
            }`;
            return isVideoSrc(src) ? (
              <video
                key={src}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className={className}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={study.title} className={className} />
            );
          })
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-3xl font-bold text-ink/20">
              {study.title}
            </span>
          </div>
        )}
      </div>
    </motion.section>
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
