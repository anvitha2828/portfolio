// A tiny line-art paw print — coral strokes directly on the page (no
// background), echoing the site's hand-drawn aesthetic. Stands in for the
// dog emoji easter egg on the map.
export function PawPrintSketch({ className = "" }: { className?: string }) {
  const stroke = "#FF7A59";
  const sw = 2.4;

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Sketch of a paw print"
    >
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round">
        <ellipse cx="20" cy="27" rx="9" ry="7" />
        <ellipse cx="8" cy="15" rx="3.1" ry="4" />
        <ellipse cx="17.5" cy="8.5" rx="3.1" ry="4.1" />
        <ellipse cx="27.5" cy="9" rx="3.1" ry="4.1" />
        <ellipse cx="33" cy="17.5" rx="2.9" ry="3.9" />
      </g>
    </svg>
  );
}
