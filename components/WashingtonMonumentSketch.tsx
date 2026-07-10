// A simplified line-art sketch of the Washington Monument — sky-blue
// strokes directly on the page (no background), matching
// BurrussHallSketch's hand-drawn treatment.
export function WashingtonMonumentSketch({
  className = "",
}: {
  className?: string;
}) {
  const stroke = "#5AA9CE";
  const sw = 3;

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label="Sketch of the Washington Monument"
    >

      {/* Obelisk */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M180 100 L200 50 L220 100 Z" />
        <path d="M180 100 L170 400 L230 400 L220 100 Z" />
        <line x1="188" y1="130" x2="178" y2="380" />
        <line x1="212" y1="130" x2="222" y2="380" />
      </g>

      {/* Base steps */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        <line x1="140" y1="400" x2="260" y2="400" />
        <line x1="120" y1="412" x2="280" y2="412" />
        <line x1="100" y1="424" x2="300" y2="424" />
      </g>

      {/* Flanking trees */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="60" cy="370" r="22" />
        <line x1="60" y1="392" x2="60" y2="415" />
        <circle cx="340" cy="365" r="24" />
        <line x1="340" y1="389" x2="340" y2="415" />
      </g>

      {/* A little flock of birds for scale/whimsy */}
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        <path d="M260 80 q6 -8 12 0" />
        <path d="M285 100 q6 -8 12 0" />
      </g>
    </svg>
  );
}
