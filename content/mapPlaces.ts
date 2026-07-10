// The journey map on the landing page. One ordered, scattered trail —
// x/y are percentages (0-100) within the map canvas. Each stop is either
// a link (to an existing case study/section) or a map-only blurb shown
// in a popover on click. Add a `sketch` to give a stop a custom
// illustration instead of a plain dot (see BurrussHallSketch.tsx /
// WashingtonMonumentSketch.tsx for examples).

export type MapSketch = "burruss" | "dc";

export type MapStop = {
  id: string;
  label: string;
  blurb?: string; // shown in a popover for stops without an href
  href?: string; // navigates here instead of showing a blurb
  x: number;
  y: number;
  sketch?: MapSketch;
};

// Chronological order — the dotted trail connects these in sequence.
export const journeyStops: MapStop[] = [
  {
    id: "robotics",
    label: "FRC Team 612",
    blurb:
      "CEO of my high school robotics team in 2018. Team 612 is dedicated to fostering a love of STEM in youth — our structure helped members build the skills to compete at the FRC World Championship, which we did in 2018.",
    x: 6,
    y: 62,
  },
  {
    id: "virginia-tech",
    label: "Virginia Tech",
    blurb:
      "B.S. in Industrial & Systems Engineering (2022), now pursuing an M.Eng. focused on Human Factors Engineering.",
    x: 19,
    y: 20,
    sketch: "burruss",
  },
  {
    id: "clicker-band",
    label: "The Clicker Band",
    blurb:
      "Won 1st place at the SourceAmerica 2019 College Design Challenge. My team and I built the Clicker Band, an assistive device supporting fellow VT student Tucker Winfrey, who has a C4 spinal cord injury — it increased his computer efficiency by 35%.",
    x: 33,
    y: 60,
  },
  {
    id: "driving-research",
    label: "Driving Research",
    href: "/portfolio/ar-hud-monotonous-driving",
    x: 47,
    y: 18,
  },
  {
    id: "abbott-capstone",
    label: "Abbott Capstone",
    href: "/portfolio/abbott-loto-mixed-reality",
    x: 59,
    y: 58,
  },
  {
    id: "invents-studio",
    label: "InVenTs Studio",
    blurb:
      "Graduate Assistant at the InVenTs Studio in Hoge Hall, working in the lab alongside my M.Eng. studies in Human Factors Engineering.",
    x: 72,
    y: 18,
  },
  {
    id: "dc",
    label: "Washington, D.C.",
    blurb:
      "Home base for MITRE — and for my early-morning runs around the National Mall.",
    x: 85,
    y: 58,
    sketch: "dc",
  },
  {
    id: "mitre",
    label: "MITRE",
    blurb:
      "Joined MITRE's National Security Accelerator Program (NSAP) — a competitive six-month rotation immersing early-career technologists in national security work, mentorship, and MITRE's innovation culture.",
    x: 96,
    y: 20,
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
