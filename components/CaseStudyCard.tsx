"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/content/caseStudies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <Link
        href={`/work/${study.slug}`}
        className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-blob border border-ink/5 bg-ink/[0.03] p-6 transition-colors hover:bg-ink/[0.05] sm:p-7"
      >
        {/* Visual area — replace with cover art, or a custom interactive
            preview per project later (see CaseStudyCard.tsx). */}
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          {study.cover ? (
            <Image
              src={study.cover}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 400px"
            />
          ) : (
            <span className="font-display text-2xl font-bold text-ink/30 sm:text-3xl">
              {study.title}
            </span>
          )}
        </div>

        {/* Link affordance */}
        <span
          aria-hidden="true"
          className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/50 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
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
