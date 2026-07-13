// A simplified line-art sketch of a computer mouse — deepened "butter"
// gold strokes directly on the page (no background), echoing the site's
// hand-drawn aesthetic. Built from primitive shapes, matching
// BurrussHallSketch, WashingtonMonumentSketch, and RobotSketch (each
// sketch gets its own distinct but on-palette color).
export function MouseSketch({ className = "" }: { className?: string }) {
  const stroke = "#E8A63E";
  const sw = 3;

  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      role="img"
      aria-label="Sketch of a computer mouse"
    >
      {/* Body */}
      <path
        d="M100 40 C62 40 40 68 40 108 V222 C40 254 66 280 100 280 C134 280 160 254 160 222 V108 C160 68 138 40 100 40 Z"
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left/right click divider */}
      <line
        x1="100"
        y1="42"
        x2="100"
        y2="130"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* Scroll wheel */}
      <rect
        x="91"
        y="68"
        width="18"
        height="34"
        rx="9"
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
