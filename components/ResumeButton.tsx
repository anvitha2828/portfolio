"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { SpeechBubble } from "./SpeechBubble";

export function ResumeButton() {
  return (
    <div className="group relative">
      <motion.a
        href={site.resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12, rotate: 6 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open my resume"
        title="Open my resume"
        className="grid h-9 w-9 place-items-center rounded-full text-ink/70 transition-colors hover:bg-sky hover:text-ink"
      >
        {/* Document icon */}
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
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      </motion.a>

      <SpeechBubble className="top-11 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Open my resume
      </SpeechBubble>
    </div>
  );
}
