// A tiny line-art runner — coral strokes directly on the page (no
// background), echoing the site's hand-drawn aesthetic. Stands in for the
// running-woman emoji easter egg on the map.
export function RunningFigureSketch({
  className = "",
}: {
  className?: string;
}) {
  const stroke = "#FF7A59";
  const sw = 3;

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Sketch of a person running"
    >
      <g
        stroke={stroke}
        strokeWidth={sw}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="8" r="3.2" fill={stroke} stroke="none" />
        <path d="M22 12 L17 19 L9 23" />
        <path d="M22 12 L27 17 L35 15" />
        <path d="M19 19 L13 33" />
        <path d="M19 19 L26 31" />
      </g>
    </svg>
  );
}
