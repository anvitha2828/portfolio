/** @format */

// Your work / case studies live here.
// Add, remove, or reorder entries — the Portfolio page and detail pages update automatically.
// Drop cover images into /public/images and reference them as "/images/your-file.jpg".

export type CaseStudySection = {
  heading: string;
  body?: string; // plain paragraph text
  bullets?: { label?: string; text: string }[]; // use instead of `body` for a bullet list
};

export type CaseStudy = {
  slug: string; // URL: /portfolio/<slug>
  title: string;
  category?: string; // e.g. "Concept Project" — shown under the title
  summary: string; // one-line "Description"
  context: string[]; // one paragraph per array item — the longer "Context" blurb
  role: string[]; // e.g. ["Product Manager", "Designer"] — sidebar list
  tools: string[]; // e.g. ["Figma", "React"] — sidebar list
  timeline: string; // e.g. "2026" or "February 2026"
  cover?: string; // e.g. "/images/project-a.jpg" (optional — falls back to a muted title tile)
  links?: { label: string; href: string }[]; // e.g. published paper, live site — shown under Context
  // Optional deeper write-up, rendered further down the page below the
  // "Read Case Study" button. Leave empty until you're ready to break it out.
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "roots-family-tree-builder",
    title: "Rooted",
    category: "Family Tree Builder",
    summary: "A web app for building, sharing, and exploring family trees.",
    context: [
      "Existing family-tree tools are either clunky, locked behind paywalls, or make it hard to actually see and share how a family connects.",
      "I built a fast, visual tree editor with cloud sync, Google sign-in, email-based sharing (view or edit), photos, and two ways to view the same data — a structured tree and a force-directed network map.",
    ],
    role: ["Product Manager", "Designer", "Engineer"],
    tools: [
      "React",
      "TypeScript",
      "React Flow",
      "vis-network",
      "Supabase",
      "Cloudinary",
      "Vercel",
    ],
    timeline: "2026",
    sections: [],
  },
  {
    slug: "ar-hud-monotonous-driving",
    title: "AR Driving Research",
    category: "Published Research",
    summary:
      "A user study on how secondary tasks on an augmented-reality head-up display affect driver workload and performance during monotonous driving.",
    context: [
      "Drivers frequently engage with secondary in-vehicle displays even though driving is already a complex, multitask activity — and emerging tech like augmented-reality head-up displays (AR HUDs) opens new opportunities to make that secondary-task engagement safer. Adapting NHTSA's driver distraction guidelines, I helped design a study with 24 gender-balanced participants who performed AR HUD tasks of varying duration while driving in a monotonous environment on a medium-fidelity driving simulator.",
      "A mixed-methods analysis evaluated perceived workload (NASA-TLX) alongside lateral and longitudinal driving performance. Drivers subjectively rated the AR HUD tasks as more cognitively demanding and distracting than driving alone — yet those same tasks improved objective driving performance, and task duration had no measurable effect either way. The findings suggest AR HUDs have real potential to improve driver alertness and vigilance on monotonous drives, rather than simply adding risk.",
    ],
    role: ["Co-Author", "Study Design", "Data Collection", "Data Analysis"],
    tools: [
      "Driving Simulator",
      "AR HUD",
      "NASA-TLX",
      "Mixed-Methods Analysis",
    ],
    timeline: "2021",
    links: [
      {
        label: "Read the paper",
        href: "https://par.nsf.gov/servlets/purl/10283675",
      },
    ],
    sections: [],
  },
  {
    slug: "abbott-loto-mixed-reality",
    title: "Mixed Reality LOTO Training",
    category: "Senior Design Project",
    summary:
      "A HoloLens mixed-reality training solution for Abbott Nutrition's lock-out tag-out safety procedures.",
    context: [
      "Abbott Nutrition trains employees on lock-out tag-out (LOTO) — a safety procedure that restricts and labels equipment during maintenance — using a physical training cart fitted with the same valves and switches found on the production floor. As part of a four-person Virginia Tech senior design team advised by Dr. Joe Gabbard, I helped research and design a mixed-reality alternative built on Microsoft Guides and the HoloLens to make that training more immersive and effective.",
      "The solution was projected to improve safety and employee knowledge retention while supporting Abbott's broader digital transformation goals — with an estimated $387,820 in impact over three years, combining $176,000 in reduced injury costs, $117,320 from streamlined training processes, and $94,500 from accelerated digital transformation.",
    ],
    role: ["User Research", "Training Design"],
    tools: ["Microsoft Guides", "HoloLens", "Mixed Reality"],
    timeline: "2021 - 2022",
    links: [
      {
        label: "View Project",
        href: "https://www.ise.vt.edu/academics/undergrad/seniordesign-program/Team2-Abbott.html",
      },
    ],
    sections: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
