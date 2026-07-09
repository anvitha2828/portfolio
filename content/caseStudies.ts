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
  category?: string; // e.g. "Concept Project" — shown under the title
  summary: string; // one-line "Description"
  context: string[]; // one paragraph per array item — the longer "Context" blurb
  role: string[]; // e.g. ["Product Manager", "Designer"] — sidebar list
  tools: string[]; // e.g. ["Figma", "React"] — sidebar list
  timeline: string; // e.g. "2026" or "February 2026"
  cover?: string; // e.g. "/images/project-a.jpg" (optional — falls back to a muted title tile)
  // Optional deeper write-up, rendered further down the page below the
  // "Read Case Study" button. Leave empty until you're ready to break it out.
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "roots-family-tree-builder",
    title: "Roots",
    category: "Family Tree Builder",
    summary:
      "A web app for building, sharing, and exploring family trees.",
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
