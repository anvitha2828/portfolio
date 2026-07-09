import type { ReactNode } from "react";

// A little coral instructional hint — drop it near any interactive element
// to nudge people on how to use it. Positioned with a `top-*` offset by the
// caller; the tail always points up into the element above it.
export function SpeechBubble({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-coral px-3 py-1.5 text-xs font-semibold text-cream shadow-soft ${className}`}
    >
      <span
        className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-coral"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
