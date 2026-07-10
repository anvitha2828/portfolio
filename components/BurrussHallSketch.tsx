// A simplified line-art sketch of Virginia Tech's Burruss Hall — coral
// strokes directly on the page (no background), echoing the site's
// hand-drawn aesthetic. Original illustration (not traced from a photo),
// built from primitive shapes rather than a freehand path for
// maintainability.
export function BurrussHallSketch({ className = "" }: { className?: string }) {
  const stroke = "#FF7A59";
  const sw = 3;

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label="Sketch of Burruss Hall at Virginia Tech"
    >

      {/* Left tower */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 70 h20 v-18 h10 v18 h20 v20 h-50 z" />
        <rect x="95" y="90" width="60" height="110" />
        <line x1="125" y1="90" x2="125" y2="200" />
        <path d="M112 130 q13 -16 26 0 v30 h-26 z" />
      </g>

      {/* Right tower */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M250 70 h20 v-18 h10 v18 h20 v20 h-50 z" />
        <rect x="245" y="90" width="60" height="110" />
        <line x1="275" y1="90" x2="275" y2="200" />
        <path d="M262 130 q13 -16 26 0 v30 h-26 z" />
      </g>

      {/* Center connector between towers */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M155 130 h90" />
        <path d="M170 200 v-70 h60 v70" />
      </g>

      {/* Main facade */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="40" y="200" width="320" height="180" />
        <line x1="40" y1="230" x2="360" y2="230" />

        {/* Window arches along the facade */}
        {[70, 130, 270, 330].map((x) => (
          <path key={x} d={`M${x} 280 q15 -20 30 0 v40 h-30 z`} />
        ))}

        {/* Central arched entrance */}
        <path d="M170 380 v-60 q30 -35 60 0 v60 z" />
        <path d="M155 380 h90" />
      </g>

      {/* Entrance steps */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        <line x1="150" y1="390" x2="250" y2="390" />
        <line x1="145" y1="400" x2="255" y2="400" />
        <line x1="140" y1="410" x2="260" y2="410" />
      </g>

      {/* Left bushy tree */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="45" cy="345" r="24" />
        <circle cx="30" cy="365" r="20" />
        <circle cx="62" cy="368" r="20" />
        <line x1="45" y1="385" x2="45" y2="410" />
      </g>

      {/* Right pair of round trees */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="330" cy="370" r="18" />
        <line x1="330" y1="388" x2="330" y2="408" />
        <circle cx="365" cy="365" r="16" />
        <line x1="365" y1="381" x2="365" y2="405" />
      </g>
    </svg>
  );
}
