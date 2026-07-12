// A simplified line-art sketch of a friendly boxy robot — coral strokes
// directly on the page (no background), echoing the site's hand-drawn
// aesthetic. Built from primitive shapes, matching BurrussHallSketch and
// WashingtonMonumentSketch.
export function RobotSketch({ className = "" }: { className?: string }) {
  const stroke = "#FF7A59";
  const sw = 3;

  return (
    <svg
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label="Sketch of a robot"
    >
      {/* Antenna */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="150" y1="30" x2="150" y2="55" />
        <circle cx="150" cy="20" r="10" />
      </g>

      {/* Head */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="95" y="55" width="110" height="85" rx="20" />
        <circle cx="125" cy="95" r="10" />
        <circle cx="175" cy="95" r="10" />
        <path d="M125 118 h50" />
      </g>

      {/* Neck */}
      <line
        x1="150"
        y1="140"
        x2="150"
        y2="158"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* Body */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="80" y="158" width="140" height="130" rx="18" />
        <circle cx="150" cy="205" r="16" />
        <circle cx="150" cy="205" r="6" />
        <line x1="105" y1="250" x2="135" y2="250" />
        <line x1="165" y1="250" x2="195" y2="250" />
      </g>

      {/* Arms */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M80 180 h-30 v50" />
        <circle cx="50" cy="238" r="12" />
        <path d="M220 180 h30 v50" />
        <circle cx="250" cy="238" r="12" />
      </g>

      {/* Legs */}
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="120" y1="288" x2="120" y2="345" />
        <line x1="180" y1="288" x2="180" y2="345" />
        <rect x="98" y="345" width="44" height="20" rx="8" />
        <rect x="158" y="345" width="44" height="20" rx="8" />
      </g>
    </svg>
  );
}
