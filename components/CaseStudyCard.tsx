"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/content/caseStudies";

const accentBg: Record<CaseStudy["accent"], string> = {
  coral: "bg-coral",
  sky: "bg-sky",
  leaf: "bg-leaf",
  butter: "bg-butter",
  peach: "bg-peach",
};

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -0.6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block overflow-hidden rounded-blob border border-ink/5 bg-white/70 shadow-soft"
      >
        <div
          className={`relative flex aspect-[16/10] items-center justify-center ${accentBg[study.accent]}`}
        >
          {study.cover ? (
            <Image
              src={study.cover}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 400px"
            />
          ) : (
            <span className="font-display text-2xl font-semibold text-ink/60">
              {study.title}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
            <span>{study.role}</span>
            <span aria-hidden="true">•</span>
            <span>{study.year}</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-coral">
            {study.title}
          </h3>
          <p className="mt-1 text-sm text-ink/70">{study.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-ink/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
