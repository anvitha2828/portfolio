"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Fallback for browsers/contexts where the Clipboard API is blocked.
      const el = document.createElement("textarea");
      el.value = site.email;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={copyEmail}
        whileHover={{ scale: 1.12, rotate: -6 }}
        whileTap={{ scale: 0.92 }}
        aria-label={`Copy email address ${site.email}`}
        title="Copy my email"
        className="grid h-9 w-9 place-items-center rounded-full text-ink/70 transition-colors hover:bg-peach hover:text-ink"
      >
        {/* Envelope icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="m3 6 9 7 9-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="pointer-events-none absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream shadow-soft"
          >
            Copied! ✨
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
