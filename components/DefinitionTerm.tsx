"use client";

import type { ReactNode } from "react";

// An inline term with a dotted underline — hover or focus it to see a
// short definition in a small tooltip. Use for jargon that not everyone
// reading the bio will know. On mobile it opens below the word (centered,
// width capped to the viewport) so it can't run off the left/right edge;
// from `sm` up there's room, so it reverts to sitting to the word's left.
export function DefinitionTerm({
  term,
  definition,
}: {
  term: ReactNode;
  definition: string;
}) {
  return (
    <span
      tabIndex={0}
      className="group relative inline-block cursor-help border-b border-dotted border-ink/40 text-ink outline-none"
    >
      {term}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-64 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl bg-ink/80 px-4 py-3 text-sm font-normal leading-snug text-cream opacity-0 shadow-soft transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100 sm:left-auto sm:right-full sm:top-1/2 sm:mt-0 sm:w-56 sm:-translate-x-0 sm:-translate-y-1/2 sm:mr-2"
      >
        {definition}
        <span
          className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-ink/80 sm:-right-1 sm:left-auto sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
