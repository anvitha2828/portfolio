"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Fades content in while sliding it up slightly as it scrolls into view —
// triggers once per element (won't re-play if you scroll back past it).
// `delay` staggers a group of these relative to each other.
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
