/** @format */

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Wraps a word/phrase in body text so clicking it pops up an image —
// anchored to the right of the text on desktop (there's room), but
// centered over the whole page on mobile (there isn't). Click the
// backdrop (or the trigger again) to close.
export function ClickToRevealImage({
  trigger,
  src,
  caption,
}: {
  trigger: string;
  src: string;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-b border-dotted border-coral text-coral outline-none"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/40 sm:bg-transparent"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              className="fixed left-1/2 top-1/2 z-50 w-[min(90vw,20rem)] -translate-x-1/2 -translate-y-1/2 sm:absolute sm:left-full sm:top-1/2 sm:ml-4 sm:w-72 sm:translate-x-0 sm:-translate-y-1/2"
            >
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={caption ?? trigger} className="w-full" />
                {caption && (
                  <p className="px-4 py-3 text-sm text-ink/70">{caption}</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
