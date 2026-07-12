"use client";

import type { ReactNode } from "react";

// An inline term with a dotted underline — hover or focus it to see a
// short definition in a small tooltip to the left of the word. Use for
// jargon that not everyone reading the bio will know.
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
        className="pointer-events-none absolute right-full top-1/2 z-30 mr-2 w-56 -translate-y-1/2 rounded-2xl bg-ink/80 px-4 py-3 text-sm font-normal leading-snug text-cream opacity-0 shadow-soft transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100"
      >
        {definition}
        <span
          className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-ink/80"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
