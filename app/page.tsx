"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center py-10 text-center sm:py-20">
      {/* Floating whimsical accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute left-[8%] top-[22%] h-16 w-16 rounded-blob bg-peach/60 animate-float" />
        <span className="absolute right-[10%] top-[30%] h-12 w-12 rounded-full bg-sky/50 animate-float [animation-delay:1s]" />
        <span className="absolute bottom-[18%] left-[16%] h-10 w-10 rounded-blob bg-butter/70 animate-float [animation-delay:2s]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold text-ink/60 shadow-soft"
      >
        👋 Hi, welcome to my corner of the internet
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="font-display text-5xl font-bold leading-tight text-ink sm:text-7xl"
      >
        I&apos;m {site.name}.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-5 max-w-xl text-lg text-ink/70 sm:text-xl"
      >
        {site.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/work"
          className="rounded-full bg-coral px-6 py-3 font-semibold text-cream shadow-soft transition-transform hover:scale-105"
        >
          See my work
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-ink/10 bg-white/70 px-6 py-3 font-semibold text-ink shadow-soft transition-transform hover:scale-105"
        >
          About me
        </Link>
      </motion.div>
    </section>
  );
}
