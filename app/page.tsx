"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { JourneyMap } from "@/components/JourneyMap";

export default function HomePage() {
  return (
    <>
      <section className="relative mx-auto max-w-2xl py-16 text-center sm:py-24">
      {/* Sparkle decorations */}
      <Sparkle className="absolute -top-4 right-6 h-10 w-10 text-butter animate-float sm:right-16" />
      <Sparkle className="absolute left-2 top-10 h-6 w-6 text-coral animate-float [animation-delay:1s] sm:left-10" />
      <Starburst className="absolute -top-2 left-16 h-8 w-8 text-butter animate-wiggle sm:left-32" />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl"
      >
        {site.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-auto mt-6 max-w-lg font-title text-3xl leading-snug text-ink sm:text-4xl"
      >
        {renderTagline(site.tagline)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-6"
      >
        <Link
          href="/portfolio"
          className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          See my Portfolio
        </Link>
        <a
          href={site.resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-ink/70 underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
        >
          Resume
        </a>
      </motion.div>
    </section>

    <JourneyMap />
    </>
  );
}

// Italicizes the word "feel" wherever it appears in the tagline, echoing
// the reference typography (upright serif with one italicized word).
function renderTagline(text: string) {
  return text.split(/(\bfeel\b)/i).map((part, i) =>
    /^feel$/i.test(part) ? (
      <em key={i} className="italic">
        {part}
      </em>
    ) : (
      part
    )
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c.6 4.2 1.4 7 3 8.6 1.6 1.6 4.4 2.4 9 3-4.6.6-7.4 1.4-9 3-1.6 1.6-2.4 4.4-3 8.6-.6-4.2-1.4-7-3-8.6-1.6-1.6-4.4-2.4-9-3 4.6-.6 7.4-1.4 9-3 1.6-1.6 2.4-4.4 3-8.6Z" />
    </svg>
  );
}

function Starburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2" />
    </svg>
  );
}
