// Your work / case studies live here.
// Add, remove, or reorder entries — the Work index and detail pages update automatically.
// Drop cover images into /public/images and reference them as "/images/your-file.jpg".

export type CaseStudySection = {
  heading: string;
  body?: string; // plain paragraph text
  bullets?: { label?: string; text: string }[]; // use instead of `body` for a bullet list
};

export type CaseStudy = {
  slug: string; // URL: /work/<slug>
  title: string;
  summary: string; // shown on the Work index card
  role: string; // e.g. "Product Designer"
  year: string; // e.g. "2024"
  tags: string[]; // e.g. ["Research", "UI"]
  cover?: string; // e.g. "/images/project-a.jpg" (optional — falls back to a colored tile)
  accent: "coral" | "sky" | "leaf" | "butter" | "peach"; // whimsical tile color
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "roots-family-tree-builder",
    title: "Roots — Family Tree Builder",
    summary:
      "A fast, visual family-tree editor with cloud sync and sharing — two ways to explore the same data: a structured tree and a force-directed network map.",
    role: "Solo PM, Designer & Engineer",
    year: "2026",
    tags: ["0→1 Product", "Solo Build", "Full-Stack"],
    accent: "leaf",
    sections: [
      {
        heading: "One-line summary",
        body: "Roots — a web app for building, sharing, and exploring family trees.",
      },
      {
        heading: "TL;DR",
        bullets: [
          {
            label: "Problem",
            text: "Existing family-tree tools are either clunky, locked behind paywalls, or make it hard to actually see and share how a family connects.",
          },
          {
            label: "What I built",
            text: "A fast, visual tree editor with cloud sync, Google sign-in, email-based sharing (view or edit), photos, and two ways to view the same data — a structured tree and a force-directed network map.",
          },
          {
            label: "My role",
            text: "Sole PM + designer + engineer. I set the direction, prioritized the backlog, and shipped. Solo project — I owned product, design, and engineering end to end.",
          },
          {
            label: "Stack",
            text: "React + TypeScript, React Flow (tree canvas), vis-network (overview), Supabase (auth, database, sharing), Cloudinary (photos), Vercel (hosting).",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
