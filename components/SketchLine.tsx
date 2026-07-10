// A gently wavy hand-drawn-looking divider line, used instead of a hard
// rectangular border. `preserveAspectRatio="none"` lets it stretch to
// fill its container while keeping the squiggle proportions.
export function SketchLine({
  orientation,
  className = "",
}: {
  orientation: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "horizontal") {
    return (
      <svg
        viewBox="0 0 400 8"
        preserveAspectRatio="none"
        className={`h-2 w-full text-ink/20 ${className}`}
        aria-hidden="true"
      >
        <path
          d="M0,4 Q50,1 100,4 T200,4 T300,4 T400,4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 8 300"
      preserveAspectRatio="none"
      className={`h-full w-2 text-ink/20 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4,0 Q1,50 4,100 T4,200 T4,300"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
