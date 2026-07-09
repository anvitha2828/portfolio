"use client";

import { motion } from "framer-motion";

// Placeholder for the "Map" — a creative, spatial view of side projects,
// case studies, and work experience. We'll workshop and build this out later.
export default function MapPage() {
  return (
    <section className="py-6">
      <h1 className="font-title text-5xl text-ink sm:text-6xl">
        Map <span className="align-middle text-2xl">🗺️</span>
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        A different way to look at my background — side projects, case studies,
        and work experiences laid out visually, so you can wander instead of
        scroll.
      </p>

      {/* Playful "coming soon" canvas with floating placeholder nodes */}
      <div className="relative mt-10 h-[380px] overflow-hidden rounded-blob border border-dashed border-ink/20 bg-white/50">
        {[
          { label: "Side project", x: "12%", y: "24%", color: "bg-coral", delay: 0 },
          { label: "Case study", x: "62%", y: "18%", color: "bg-sky", delay: 0.4 },
          { label: "Experience", x: "38%", y: "58%", color: "bg-leaf", delay: 0.8 },
          { label: "Experiment", x: "78%", y: "62%", color: "bg-butter", delay: 1.2 },
        ].map((node) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: node.delay },
              scale: { delay: node.delay, type: "spring", stiffness: 200 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: node.delay },
            }}
            style={{ left: node.x, top: node.y }}
            className={`absolute flex flex-col items-center gap-2`}
          >
            <span className={`h-4 w-4 rounded-full ${node.color} shadow-soft`} />
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink/60 shadow-soft">
              {node.label}
            </span>
          </motion.div>
        ))}

        <div className="absolute inset-0 grid place-items-center">
          <span className="rounded-full bg-ink px-5 py-2 font-display font-semibold text-cream shadow-soft">
            Coming soon ✨
          </span>
        </div>
      </div>

      <p className="mt-5 text-sm text-ink/50">
        This page is an intentional placeholder — we&apos;ll design the
        interactive map together.
      </p>
    </section>
  );
}
