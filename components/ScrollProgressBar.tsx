"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin bar at the very top of the viewport, fills left-to-right with how
// far down the page you've scrolled. No label, no tooltip — just the bar.
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-coral"
      style={{ scaleX }}
    />
  );
}
