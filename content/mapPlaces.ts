// The journey map on the landing page. Each stop is either a link (to an
// existing case study/section) or a map-only blurb shown in a popover.
// Edit freely — reorder, add stops, or turn a blurb-only stop into a full
// case study later by giving it a matching content/caseStudies.ts entry
// and an `href` here.

export type MapStop = {
  id: string;
  label: string;
  blurb?: string; // shown in a popover for stops without an href
  href?: string; // navigates here instead of showing a blurb
};

// Before Virginia Tech
export const journeyBefore: MapStop = {
  id: "robotics",
  label: "FRC Team 612",
  blurb:
    "CEO of my high school robotics team in 2018. Team 612 is dedicated to fostering a love of STEM in youth — our structure helped members build the skills to compete at the FRC World Championship, which we did in 2018.",
};

// The Virginia Tech hub itself
export const vtHub: MapStop = {
  id: "virginia-tech",
  label: "Virginia Tech",
  blurb:
    "B.S. in Industrial & Systems Engineering (2022), now pursuing an M.Eng. focused on Human Factors Engineering.",
};

// Projects/roles clustered around the Virginia Tech hub
export const vtStops: MapStop[] = [
  {
    id: "clicker-band",
    label: "The Clicker Band",
    blurb:
      "Won 1st place at the SourceAmerica 2019 College Design Challenge. My team and I built the Clicker Band, an assistive device supporting fellow VT student Tucker Winfrey, who has a C4 spinal cord injury — it increased his computer efficiency by 35%.",
  },
  {
    id: "driving-research",
    label: "Driving Research",
    href: "/portfolio/ar-hud-monotonous-driving",
  },
  {
    id: "abbott-capstone",
    label: "Abbott Capstone",
    href: "/portfolio/abbott-loto-mixed-reality",
  },
  {
    id: "invents-studio",
    label: "InVenTs Studio",
    blurb:
      "Graduate Assistant at the InVenTs Studio in Hoge Hall, working in the lab alongside my M.Eng. studies in Human Factors Engineering.",
  },
];

// After Virginia Tech
export const journeyAfter: MapStop = {
  id: "mitre",
  label: "MITRE",
  blurb:
    "Joined MITRE's National Security Accelerator Program (NSAP) — a competitive six-month rotation immersing early-career technologists in national security work, mentorship, and MITRE's innovation culture.",
};

export type EasterEgg = {
  id: string;
  emoji: string;
  tooltip: string;
};

export const easterEggs: EasterEgg[] = [
  {
    id: "running",
    emoji: "🏃‍♀️",
    tooltip: "Also known to disappear for a run around DC.",
  },
  {
    id: "dog",
    emoji: "🐾",
    tooltip: "My dog insisted on being on this map somewhere.",
  },
];
