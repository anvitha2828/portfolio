// The journey map on the landing page. One ordered, scattered trail —
// x/y are percentages (0-100) within the map canvas. Each stop shows an
// icon, a bold `label`, and a short `caption` right on the map. A stop
// with an `href` links straight to a case study/section; a stop with a
// `blurb` instead reveals that longer text in a popover on click.

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
  sketch?: MapSketch; // a full custom illustration instead of `icon`
  icon?: MapIcon; // a simple glyph on a colored tile
};

// Chronological order — the road connects these in sequence.
export const journeyStops: MapStop[] = [
  {
    id: "robotics",
    label: "FRC Team 612",
    caption: "World Championship, 2018",
    blurb:
      "CEO of my high school robotics team in 2018. Team 612 is dedicated to fostering a love of STEM in youth — our structure helped members build the skills to compete at the FRC World Championship, which we did in 2018.",
    x: 6,
    y: 62,
    color: "leaf",
    icon: "robot",
  },
  {
    id: "virginia-tech",
    label: "Virginia Tech",
    caption: "B.S. Industrial & Systems Eng.",
    blurb:
      "B.S. in Industrial & Systems Engineering (2022), now pursuing an M.Eng. focused on Human Factors Engineering.",
    x: 19,
    y: 20,
    color: "coral",
    sketch: "burruss",
  },
  {
    id: "clicker-band",
    label: "The Clicker Band",
    caption: "1st Place, SourceAmerica 2019",
    blurb:
      "Won 1st place at the SourceAmerica 2019 College Design Challenge. My team and I built the Clicker Band, an assistive device supporting fellow VT student Tucker Winfrey, who has a C4 spinal cord injury — it increased his computer efficiency by 35%.",
    x: 33,
    y: 60,
    color: "butter",
    icon: "ribbon",
  },
  {
    id: "driving-research",
    label: "Driving Research",
    caption: "Published AR HUD study",
    href: "/portfolio/ar-hud-monotonous-driving",
    x: 47,
    y: 18,
    color: "sky",
    icon: "steering-wheel",
  },
  {
    id: "abbott-capstone",
    label: "Abbott Capstone",
    caption: "Mixed-reality safety training",
    href: "/portfolio/abbott-loto-mixed-reality",
    x: 59,
    y: 58,
    color: "peach",
    icon: "padlock",
  },
  {
    id: "invents-studio",
    label: "InVenTs Studio",
    caption: "Graduate research assistant",
    blurb:
      "Graduate Assistant at the InVenTs Studio in Hoge Hall, working in the lab alongside my M.Eng. studies in Human Factors Engineering.",
    x: 72,
    y: 18,
    color: "leaf",
    icon: "lightbulb",
  },
  {
    id: "dc",
    label: "Washington, D.C.",
    caption: "Home base & running routes",
    blurb:
      "Home base for MITRE — and for my early-morning runs around the National Mall.",
    x: 85,
    y: 58,
    color: "sky",
    sketch: "dc",
  },
  {
    id: "mitre",
    label: "MITRE",
    caption: "National Security Accelerator",
    blurb:
      "Joined MITRE's National Security Accelerator Program (NSAP) — a competitive six-month rotation immersing early-career technologists in national security work, mentorship, and MITRE's innovation culture.",
    x: 96,
    y: 20,
    color: "coral",
    icon: "shield",
  },
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
