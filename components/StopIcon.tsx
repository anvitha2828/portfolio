import type { MapIcon } from "@/content/mapPlaces";

const bgHex: Record<string, string> = {
  coral: "#FF7A59",
  peach: "#FFD8C2",
  sky: "#8ECae6",
  leaf: "#8AB17D",
  butter: "#FFE9A8",
};

// Simple line-art glyphs, white strokes on a colored tile — same
// treatment as BurrussHallSketch/WashingtonMonumentSketch, just smaller
// and simpler since these stand in for stops without a full illustration.
export function StopIcon({
  icon,
  color,
  className = "",
}: {
  icon: MapIcon;
  color: string;
  className?: string;
}) {
  const stroke = "#FFF8F3";
  const sw = 5;
  const fill = bgHex[color] ?? "#FF7A59";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect width="100" height="100" fill={fill} rx="18" />
      <g stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {icon === "robot" && (
          <>
            <rect x="28" y="34" width="44" height="34" rx="8" />
            <circle cx="41" cy="50" r="3" fill={stroke} stroke="none" />
            <circle cx="59" cy="50" r="3" fill={stroke} stroke="none" />
            <path d="M40 60 h20" />
            <line x1="50" y1="34" x2="50" y2="24" />
            <circle cx="50" cy="20" r="3" />
          </>
        )}

        {icon === "ribbon" && (
          <>
            <circle cx="50" cy="38" r="16" />
            <path d="M40 50 L33 74 L50 65 L67 74 L60 50" />
            <path d="M44 38 l4 4 l9 -9" />
          </>
        )}

        {icon === "steering-wheel" && (
          <>
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="5" />
            <line x1="50" y1="30" x2="50" y2="45" />
            <line x1="35" y1="60" x2="45" y2="53" />
            <line x1="65" y1="60" x2="55" y2="53" />
          </>
        )}

        {icon === "padlock" && (
          <>
            <rect x="30" y="48" width="40" height="30" rx="6" />
            <path d="M38 48 v-10 a12 12 0 0 1 24 0 v10" />
            <circle cx="50" cy="62" r="3" fill={stroke} stroke="none" />
          </>
        )}

        {icon === "lightbulb" && (
          <>
            <circle cx="50" cy="42" r="18" />
            <path d="M43 58 h14 v10 a7 7 0 0 1 -14 0 z" />
            <line x1="46" y1="72" x2="54" y2="72" />
          </>
        )}

        {icon === "shield" && (
          <>
            <path d="M50 22 L72 30 V50 C72 64 62 74 50 78 C38 74 28 64 28 50 V30 Z" />
            <path d="M41 50 l6 6 l12 -14" />
          </>
        )}
      </g>
    </svg>
  );
}
