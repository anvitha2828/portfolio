"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="grid items-center gap-12 py-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      {/* Text column */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 max-w-md text-lg text-ink/70 sm:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/work"
            className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Check out my Work
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
      </div>

      {/* Photo column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative mx-auto w-full max-w-sm lg:max-w-none"
      >
        {/* Sparkle decorations */}
        <Sparkle className="absolute -top-6 right-10 h-10 w-10 text-butter animate-float" />
        <Sparkle className="absolute right-0 top-16 h-6 w-6 text-coral animate-float [animation-delay:1s]" />
        <Starburst className="absolute -top-4 right-24 h-8 w-8 text-butter animate-wiggle" />

        {/* Photo frame — drop a headshot into /public/images and swap the placeholder below */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-blob border border-ink/5 bg-ink/10 shadow-soft">
          {/* Replace with: <Image src="/images/headshot.jpg" alt={site.name} fill className="object-cover" /> */}
          <div className="grid h-full w-full place-items-center font-display text-lg text-ink/40">
            Your photo
          </div>
        </div>
      </motion.div>
    </section>
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
