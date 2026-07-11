// The journey card gallery on the landing page — one card per stop, in
// chronological order. A stop with an `href` links straight to a case
// study/section; a stop with a `blurb` instead reveals that longer text
// when its card is dragged open.

export type MapIcon =
  | "robot"
  | "ribbon"
  | "steering-wheel"
  | "padlock"
  | "lightbulb"
  | "shield";

export type MapStop = {
  id: string;
  label: string; // card title, shown over the photo
  caption?: string; // short secondary line, shown in the opened card
  blurb?: string; // longer detail, shown when the card is dragged open
  href?: string; // navigates here instead of / in addition to the blurb
  color: "coral" | "peach" | "sky" | "leaf" | "butter";
  icon: MapIcon; // small line-art glyph, used in the hero scatter
  photos?: string[]; // e.g. ["/images/journey/robotics-1.jpg"] — unset shows a placeholder card
};

// Chronological order, left to right.
export const journeyStops: MapStop[] = [
  {
    id: "robotics",
    label: "FRC Team 612",
    caption: "World Championship, 2018",
    blurb:
      "CEO of my high school robotics team in 2018. Team 612 is dedicated to fostering a love of STEM in youth — our structure helped members build the skills to compete at the FRC World Championship, which we did in 2018.",
    color: "leaf",
    icon: "robot",
  },
  {
    id: "clicker-band",
    label: "The Clicker Band",
    caption: "1st Place, SourceAmerica 2019",
    blurb:
      "Won 1st place at the SourceAmerica 2019 College Design Challenge. My team and I built the Clicker Band, an assistive device supporting fellow VT student Tucker Winfrey, who has a C4 spinal cord injury — it increased his computer efficiency by 35%.",
    color: "butter",
    icon: "ribbon",
  },
  {
    id: "driving-research",
    label: "Driving Research",
    caption: "Published AR HUD study",
    href: "/portfolio/ar-hud-monotonous-driving",
    color: "sky",
    icon: "steering-wheel",
  },
  {
    id: "abbott-capstone",
    label: "Abbott Capstone",
    caption: "Mixed-reality safety training",
    href: "/portfolio/abbott-loto-mixed-reality",
    color: "peach",
    icon: "padlock",
  },
  {
    id: "invents-studio",
    label: "InVenTs Studio",
    caption: "Graduate research assistant",
    blurb:
      "Graduate Assistant at the InVenTs Studio in Hoge Hall, working in the lab alongside my M.Eng. studies in Human Factors Engineering.",
    color: "leaf",
    icon: "lightbulb",
  },
  {
    id: "mitre",
    label: "MITRE",
    caption: "National Security Accelerator",
    blurb:
      "Joined MITRE's National Security Accelerator Program (NSAP) — a competitive six-month rotation immersing early-career technologists in national security work, mentorship, and MITRE's innovation culture.",
    color: "coral",
    icon: "shield",
  },
];
