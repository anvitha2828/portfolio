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
  ctaLabel?: string; // button text on the /portfolio scroll-stack card — defaults to "View case study"
  cover?: string; // e.g. "/images/project-a.jpg" (optional — falls back to a muted title tile)
  featuredImages?: string[]; // 1-2 hero screenshots, shown large, full-width, in order
  gallery?: string[]; // additional screenshots, shown smaller in a grid below the featured images
  links?: { label: string; href: string }[]; // e.g. published paper, live site — shown under Context
  // Optional deeper write-up, rendered further down the page below the
  // "Read Case Study" button. Leave empty until you're ready to break it out.
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    // TODO: keep expanding this write-up — how you go from an ambiguous
    // problem to a shipped solution, the frameworks/principles you lean
    // on, and how you work with engineers, designers, and stakeholders
    // along the way.
    slug: "my-process",
    title: "Systems Engineering Meets Product Management",
    category: "How I Work",
    summary: "The Systems Lens 🤝 The Product Lens",
    context: [
      "As a consultant, I manage a portfolio of distinct projects across multiple government sponsors. Their mission needs, technical maturity levels, and operational goals vary wildly.",
      "I look at every challenge through two distinct lenses: the Systems Lens (macro strategy) and the Product Lens (micro delivery).",
    ],
    role: ["Systems Engineer"],
    tools: [
      "CAMEO (SysML)",
      "Visio",
      "Requirements Writing/Tracking",
      "Formal Risk Analysis",
      "User Research",
      "User Interviews",
      "User Personas",
      "Wireframing",
      "Sketch",
      "Material UI",
      "Jira",
    ],
    timeline: "",
    ctaLabel: "View More",
    featuredImages: [
      "/images/Systems_Engineering_Process_II.svg.webp",
      "/images/missionengineeringbreakdown.png",
    ],
    sections: [
      {
        heading: "Lens 1: The Systems Lens (Macro Strategy)",
        bullets: [
          {
            text: "How I align sponsors, map complex operational landscapes, and design the overarching strategy. My first step is always to zoom out and look at the whole system.",
          },
          {
            label: "Sponsor Alignment & Discovery",
            text: "I sit down with users and stakeholders for direct interviews to untangle their daily operational realities and map out their true constraints.",
          },
          {
            label: "Visio/CAMEO Mission Threads",
            text: "I draw out end-to-end user journeys showing exactly how data, people, and technology interact in the real world. By formally tracing these requirements, I ensure the technical handoff is completely seamless.",
          },
          {
            label: "Systemic Risk Analysis",
            text: "I run formal assessments early to call out technical and programmatic roadblocks before they disrupt the timeline or budget.",
          },
          {
            label: "Strategic Capability Plans",
            text: "For high-level organizational initiatives, I translate complex regulations, staffing hurdles, and technical constraints into straightforward, step-by-step strategy documents that help sponsors stand up new units or capabilities.",
          },
        ],
      },
      {
        heading: "Lens 2: The Product Lens (Micro Delivery)",
        bullets: [
          {
            text: "How I translate technical complexity and build intuitive tools. My job is to act as the translation layer - converting deep technical complexity into clean, low-cognitive-load products.",
          },
          {
            label: "Sketch & Adobe XD Mockups",
            text: "I design clean user interfaces that highlight critical status alerts while hiding unnecessary data clutter. I purposefully design UI elements that explain why a technical system is giving a certain output, which builds immediate user trust.",
          },
          {
            label: "Frontend Code Sandboxes",
            text: "I work with developers to build clickable, interactive software prototypes. Testing a live mockup with users saves weeks of engineering time by fixing design flaws before production.",
          },
          {
            label: "Jira Backlogs & User Stories",
            text: "I translate high-level sponsor goals into bite-sized, actionable technical user stories in Jira, running the day-to-day cycles with dev and data science teams.",
          },
          {
            label: "Training & Implementation Roadmaps",
            text: "A product is only successful if it is adopted. I design user enablement playbooks to make onboarding seamless for the workforce, actively bridging the gap from high-level strategy documents to concrete implementation plans.",
          },
        ],
      },
    ],
  },
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
    links: [
      {
        label: "View Live Site",
        href: "https://rooted-rosy-iota.vercel.app/#",
      },
    ],
    featuredImages: [
      "/images/full_view.png",
      "/images/full_visualizedview.png",
    ],
    gallery: [
      "/images/immediate_family.png",
      "/images/details_window.png",
      "/images/image_crop.png",
    ],
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
    featuredImages: ["/images/semiauto_setup.png", "/images/ar_hud.jpg"],
    gallery: [
      "/images/trust_autoagent.jpg",
      "/images/trust_autoagent2.jpg",
      "/images/lettertask.png",
      "/images/metrics.png",
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
    cover: "/images/abbott.jpg",
    featuredImages: ["/images/abbott.jpg"],
    gallery: ["/images/hololens.png"],
    sections: [],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
