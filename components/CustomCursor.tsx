/** @format */

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

// A pill that trails centered on the real cursor (which stays visible —
// this doesn't replace it) while hovering any element marked with
// data-cursor-label="...". Its background picks up that element's
// data-cursor-color (each portfolio card's accentColor), so the pill
// matches whichever project is under the mouse. Desktop/mouse only —
// skipped on touch devices, where there's no hover state to react to.
export function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#2B2A26");
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.6 });
  const springY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement).closest?.(
        "[data-cursor-label]",
      );
      setLabel(target?.getAttribute("data-cursor-label") ?? null);
      if (target) {
        setColor(target.getAttribute("data-cursor-color") ?? "#2B2A26");
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden sm:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <AnimatePresence>
        {label && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, backgroundColor: color }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-semibold text-cream shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            {label}
            <ArrowRight />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
