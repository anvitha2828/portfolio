// The journey map on the landing page. One ordered, scattered trail —
// x/y are percentages (0-100) within the map canvas. Each stop is a
// colored dot with a bold `label` and short `caption` right on the map.
// A stop with an `href` links straight to a case study/section; a stop
// with a `blurb` instead reveals that longer text in a popover on click.
//
// Positions are currently draggable in the browser for layout purposes —
// see JourneyMap.tsx. Once a layout is finalized, the dragged coordinates
// get baked back into the x/y values below and dragging is turned off.

export type MapSketch = "burruss" | "dc";
export type MapIcon =
  | "robot"
  | "ribbon"
  | "steering-wheel"
  | "padlock"
  | "lightbulb"
  | "shield";

export type MapStop = {
  id: string;
  label: string; // bold headline, always visible
  caption?: string; // short secondary line, always visible
  blurb?: string; // longer detail, shown in a popover for stops without an href
  href?: string; // navigates here instead of showing a blurb
  x: number;
  y: number;
  color: "coral" | "peach" | "sky" | "leaf" | "butter";
  photoSrc?: string; // e.g. "/images/journey/robotics.jpg" — unset shows a placeholder card in PhotoScroll
};

// Chronological order, top to bottom.
export const journeyStops: MapStop[] = [
  {
    id: "robotics",
    label: "FRC Team 612",
    caption: "World Championship, 2018",
    blurb:
      "CEO of my high school robotics team in 2018. Team 612 is dedicated to fostering a love of STEM in youth — our structure helped members build the skills to compete at the FRC World Championship, which we did in 2018.",
    x: 4,
    y: 68,
    color: "leaf",
  },
  {
    id: "virginia-tech",
    label: "Virginia Tech",
    caption: "B.S. Industrial & Systems Eng.",
    blurb:
      "B.S. in Industrial & Systems Engineering (2022), now pursuing an M.Eng. focused on Human Factors Engineering.",
    x: 17,
    y: 14,
    color: "coral",
  },
  {
    id: "clicker-band",
    label: "The Clicker Band",
    caption: "1st Place, SourceAmerica 2019",
    blurb:
      "Won 1st place at the SourceAmerica 2019 College Design Challenge. My team and I built the Clicker Band, an assistive device supporting fellow VT student Tucker Winfrey, who has a C4 spinal cord injury — it increased his computer efficiency by 35%.",
    x: 31,
    y: 70,
    color: "butter",
  },
  {
    id: "driving-research",
    label: "Driving Research",
    caption: "Published AR HUD study",
    href: "/portfolio/ar-hud-monotonous-driving",
    x: 46,
    y: 12,
    color: "sky",
  },
  {
    id: "abbott-capstone",
    label: "Abbott Capstone",
    caption: "Mixed-reality safety training",
    href: "/portfolio/abbott-loto-mixed-reality",
    x: 60,
    y: 74,
    color: "peach",
  },
  {
    id: "invents-studio",
    label: "InVenTs Studio",
    caption: "Graduate research assistant",
    blurb:
      "Graduate Assistant at the InVenTs Studio in Hoge Hall, working in the lab alongside my M.Eng. studies in Human Factors Engineering.",
    x: 74,
    y: 16,
    color: "leaf",
  },
  {
    id: "dc",
    label: "Washington, D.C.",
    caption: "Home base & running routes",
    blurb:
      "Home base for MITRE — and for my early-morning runs around the National Mall.",
    x: 87,
    y: 68,
    color: "sky",
  },
  {
    id: "mitre",
    label: "MITRE",
    caption: "National Security Accelerator",
    blurb:
      "Joined MITRE's National Security Accelerator Program (NSAP) — a competitive six-month rotation immersing early-career technologists in national security work, mentorship, and MITRE's innovation culture.",
    x: 98,
    y: 14,
    color: "coral",
  },
];

// The two full illustrations (Burruss Hall, Washington Monument) sit in
// the background as decorative art, independent of the VT/DC dots above —
// also draggable, also positioned by x/y percentage.
export type MapBackground = {
  id: string;
  sketch: MapSketch;
  x: number;
  y: number;
};

export const backgroundImages: MapBackground[] = [
  { id: "vt-illustration", sketch: "burruss", x: 17, y: 14 },
  { id: "dc-illustration", sketch: "dc", x: 87, y: 68 },
];

export type EasterEgg = {
  id: string;
  emoji: string;
  tooltip: string;
  x: number;
  y: number;
};

// Hidden, off-trail — not part of the sequence, just tucked into the scenery.
export const easterEggs: EasterEgg[] = [
  {
    id: "running",
    emoji: "🏃‍♀️",
    tooltip: "Also known to disappear for a run around DC.",
    x: 90,
    y: 82,
  },
  {
    id: "dog",
    emoji: "🐾",
    tooltip: "My dog insisted on being on this map somewhere.",
    x: 12,
    y: 12,
  },
];
