"use client";

import { Fragment, useEffect, useRef } from "react";

const RADIUS = 70; // px — letters within this distance from the cursor shift color
const HOVER_COLOR = "#FF7A59"; // coral

export type MagneticTextSegment = { text: string; italic?: boolean };

type Char = { ch: string; italic?: boolean };

// Flattens segments into one char array (dropping segment boundaries)
// then regroups by space into words, so word boundaries are found across
// segments correctly (e.g. one segment ending mid-word, italic or not).
function groupWords(segments: MagneticTextSegment[]): Char[][] {
  const chars: Char[] = segments.flatMap((seg) =>
    Array.from(seg.text).map((ch) => ({ ch, italic: seg.italic })),
  );
  const words: Char[][] = [[]];
  for (const c of chars) {
    if (c.ch === " ") words.push([]);
    else words[words.length - 1].push(c);
  }
  return words;
}

// Splits text into per-letter spans and shifts the color of whichever
// ones are near the cursor to the accent coral — a "motion colour text"
// effect. Pass `segments` (rather than a plain string) when part of the
// text needs its own styling, e.g. one italicized word. Each word's
// letters are grouped into a `whitespace-nowrap` box so the browser can
// only line-break *between* words, not between individual letter spans
// (which, left ungrouped, can break mid-word). Uses direct DOM writes on
// pointermove instead of React state, so moving the mouse never triggers
// a re-render.
export function MagneticText({
  segments,
  className = "",
}: {
  segments: MagneticTextSegment[];
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const letters = Array.from(
      container.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );

    function handleMove(e: PointerEvent) {
      for (const letter of letters) {
        const rect = letter.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        letter.style.color = dist < RADIUS ? HOVER_COLOR : "";
      }
    }
    function handleLeave() {
      for (const letter of letters) letter.style.color = "";
    }

    window.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, [segments]);

  const words = groupWords(segments);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {word.map((c, ci) =>
              c.italic ? (
                <em
                  key={ci}
                  data-letter
                  className="inline-block italic transition-colors duration-150"
                >
                  {c.ch}
                </em>
              ) : (
                <span
                  key={ci}
                  data-letter
                  className="inline-block transition-colors duration-150"
                >
                  {c.ch}
                </span>
              ),
            )}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
