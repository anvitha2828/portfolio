/** @format */

// Your work / case studies live here.
// Add, remove, or reorder entries — the Portfolio page and detail pages update automatically.
// Drop cover images into /public/images and reference them as "/images/your-file.jpg".

export type CaseStudySection = {
  heading: string;
  body?: string; // plain paragraph text
  bullets?: { label?: string; text: string }[]; // use instead of `body` for a bullet list
};

// A photo is either a plain path (no caption) or an object with a caption —
// e.g. "/images/shot.png" or { src: "/images/shot.png", caption: "..." }.
// Set `small: true` to render a featured image at the smaller gallery
// size instead of the default large hero size.
export type GalleryImage =
  | string
  | { src: string; caption?: string; small?: boolean };

// A context paragraph is either a plain string, or an object with a
// `label` — e.g. a project name — highlighted in the accent color at the
// start of the paragraph.
export type ContextItem = string | { label: string; text: string };

export type CaseStudy = {
  slug: string; // URL: /portfolio/<slug>
  title: string;
  category?: string; // e.g. "Concept Project" — shown under the title
  summary: string; // one-line "Description"
  context: ContextItem[]; // one paragraph per array item — the longer "Context" blurb
  role: string[]; // e.g. ["Product Manager", "Designer"] — sidebar list
  tools: string[]; // e.g. ["Figma", "React"] — sidebar list
  timeline: string; // e.g. "2026" or "February 2026"
  ctaLabel?: string; // button text on the /portfolio scroll-stack card — defaults to "View case study"
  accentColor?: string; // hex color for the scroll-stack card's category label + CTA button — defaults to ink
  cover?: string; // e.g. "/images/project-a.jpg" (optional — falls back to a muted title tile)
  featuredImages?: GalleryImage[]; // 1-2 hero screenshots, shown large, full-width, in order
  gallery?: GalleryImage[]; // additional screenshots, shown smaller in a grid below the featured images
  links?: { label: string; href: string }[]; // e.g. published paper, live site — shown under Context
  // Optional deeper write-up, rendered further down the page below the
  // "Read Case Study" button. Leave empty until you're ready to break it out.
  sections: CaseStudySection[];
};

export function imageSrc(image: GalleryImage): string {
  return typeof image === "string" ? image : image.src;
}

export function imageCaption(image: GalleryImage): string | undefined {
  return typeof image === "string" ? undefined : image.caption;
}

export function imageIsSmall(image: GalleryImage): boolean {
  return typeof image === "string" ? false : (image.small ?? false);
}

export const caseStudies: CaseStudy[] = [
  {
    // TODO: keep expanding this write-up — how you go from an ambiguous
    // problem to a shipped solution, the frameworks/principles you lean
    // on, and how you work with engineers, designers, and stakeholders
    // along the way.
    slug: "my-process",
    title: "Product Management meets Systems Engineering",
    category: "How I Work",
    summary:
      "Product Lens 🤝 Systems Lens: Solving complex problems with products people actually use.",
    context: [
      "As a consultant, I work on many distinct projects across multiple government sponsors. Their mission needs, technical maturity levels, and operational goals vary wildly.",
      "I look at every challenge through two lenses: the **Systems Lens** and the **Product Lens**. For me, this is about bridging a massive gap: taking highly complex, technically impressive engineering and translating it so real users and organizations are actually ready to adopt it.",
    ],
    role: ["Product Manager", "Systems Engineer"],
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
    timeline: "2023 - Present",
    ctaLabel: "View Process",
    accentColor: "#FF7A59",
    featuredImages: [
      {
        src: "/images/Systems_Engineering_Process_II.svg.webp",
        caption: "V Model (Verification and Validation Model)",
        small: true,
      },
      {
        src: "/images/missionengineeringbreakdown.png",
        caption: "Mission engineering guide breakdown of mission thread",
      },
    ],
    sections: [
      {
        heading: "Here are examples of efforts I've supported:",
        bullets: [
          {
            label: "Anomaly Detection Tool",
            text: "Owned product definition and delivery of an ML-enabled prototype by driving UX design, wireframing, defining data requirements, and aligning data science and development teams.",
          },
          {
            label: "Model-Based Systems Engineering",
            text: "Modeled mission-specific end-to-end user journeys to map events, ownership, data flows, and timing dependencies needed to achieve target operational outcomes.",
          },
          {
            label: "Autonomy Strategy",
            text: "Delivered an enterprise-level strategy by translating extensive field research into organizational, technical, and operational decision-making.",
          },
        ],
      },
      {
        heading: "The Systems Lens",
        bullets: [
          {
            text: "My first step is always to zoom out and look at the whole system.",
          },
          {
            label: "Customer Alignment & Discovery",
            text: "I sit down with users and stakeholders for direct interviews to untangle their daily operational realities and map out their true constraints.",
          },
          {
            label: "User Journeys",
            text: "I draw out end-to-end user journeys showing exactly how data, people, and technology interact in the real world.",
          },
          {
            label: "Risk Analysis",
            text: "I run formal risk assessments in order to identify, prioritize, and mitigate potential threats.",
          },
          {
            label: "Roadmaps",
            text: "I translate high-level strategies into clear, operational roadmaps designed for the entire enterprise: keeping leaders aligned, daily users empowered, and support teams fully equipped.",
          },
        ],
      },
      {
        heading: "The Product Lens",
        bullets: [
          {
            text: "I act as the translation layer: converting deep technical complexity into clean & easy to use products.",
          },
          {
            label: "Personas as a North Star",
            text: "I keep a clear picture of the end user front and center throughout the entire process. Personas aren't just a design exercise, they are a critical communication tool I use to guide multi-disciplinary teams make well-informed decisions about the product's direction.",
          },
          {
            label: "Iterative Prototyping",
            text: "I design clean interfaces that explain why a complex system gave a specific output to build immediate user trust. I then live-test these mockups to get rapid feedback, using real user data to guide our next design iterations.",
          },
          {
            label: "Task Prioritization & Backlogs",
            text: "I translate requirements into actionable tasks while maintaining a clean backlog for the team. I make sure we prioritize the most important work today without losing track of great ideas for tomorrow.",
          },
        ],
      },
      {
        heading: "My Value Add",
        bullets: [
          {
            label: "No Telephone Game",
            text: "Everyone stays aligned on the same product vision. Using clear personas, sharp requirements, and a shared roadmap ensures developers and stakeholders are always on the same page.",
          },
          {
            label: "Early Validation",
            text: "Testing concepts early with mockups and prototypes keeps sponsors in the loop and ensures we build the right thing before writing code.",
          },
          {
            label: "Beyond Just Software",
            text: "Users don't just get a tool; they get a complete implementation plan mapping out the real-world impact on users, leadership, and technical support.",
          },
        ],
      },
    ],
  },
  {
    slug: "roots-family-tree-builder",
    title: "Family Tree Builder: Rooted",
    category: "Web App",
    summary:
      "An interactive web app that reimagines genealogy by making family tree creation as fast and visual as sketching on paper",
    ctaLabel: "View Case Study",
    accentColor: "#4F9D6E",
    context: [
      "I built a collaborative, zero-learning-curve editor for family trees that allows users to quickly add, remove, and visualize relationships.",
      "To eliminate data-entry friction, I prioritized a rapid 'ghost-node' creation flow before implementing two distinct ways to interact with the data: a structured tree view for clarity, and a physics-based, force-directed network map for dynamic exploration.",
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
      {
        src: "/images/full_view.png",
        caption: "Full Rooted UI tree building view",
      },
      {
        src: "/images/full_visualizedview.png",
        caption: "Full Rooted UI visualization view",
      },
    ],
    gallery: [
      {
        src: "/images/immediate_family.png",
        caption: "View of immediate family",
      },
      { src: "/images/details_window.png", caption: "Person details window" },
      {
        src: "/images/ghost_node.png",
        caption: "Adding relationships — 'ghost node' example",
      },
      { src: "/images/image_crop.png", caption: "Cropping image upload UI" },
    ],
    sections: [
      {
        heading: "Target Metrics",
        bullets: [
          {
            label: "Activation Speed",
            text: "Minimizing the time elapsed from initial sign-in to a user anchoring their first parent, child, or partner relationship node.",
          },
          {
            label: "Task Completion Rate",
            text: "The percentage of active user sessions that successfully build out a 3-generation branch in a single session without dropping off.",
          },
        ],
      },
      {
        heading: "Product Scoping & Sequencing",
        bullets: [
          {
            label: "The Phase 1 Priority",
            text: "Focused entirely on the data-input UX. Before users can enjoy exploring a massive network, they need an effortless way to build it. I funneled all initial development into the 'ghost-node' connector.",
          },
          {
            label: "The Phase 2 Milestones",
            text: "Only after the creation flow was seamless did I introduce the dual-view interaction engine: a structured tree view for hierarchy, and a force-directed network map for dynamic playground exploration.",
          },
          {
            label: "The Strategic Trade-off",
            text: "I intentionally delayed interactive physics animations until basic creation mechanics were locked. A beautifully animating canvas means nothing if users struggle to input their data.",
          },
        ],
      },
      {
        heading: "Feature Breakdown",
        bullets: [
          {
            label: "Ghost-Node Interface",
            text: "Eliminated traditional sidebar forms. Clicking an active node triggers instant contextual connectors directly on the canvas, enabling users to spawn relatives with a single click.",
          },
          {
            label: "Force-Directed Map",
            text: "Utilized physics-based properties to make navigating massive networks tactile. Dragging family nodes pulls, stretches, and bounces connected branches dynamically in real-time.",
          },
          {
            label: "The Excel View Tab",
            text: "Implemented a toggleable spreadsheet panel at the bottom, allowing users to group, search, and isolate specific branches (e.g., maternal lineage) to manage visual noise.",
          },
        ],
      },
      {
        heading: "PM Lessons Learned",
        bullets: [
          {
            label: "Execution Insight",
            text: "Product management is about sequencing. Prioritizing the high-utility creation flow before high-delight physics animations ensured the product was fundamentally functional before it was visually impressive.",
          },
        ],
      },
    ],
  },
  {
    slug: "ar-hud-monotonous-driving",
    title: "AR HUD Driving Research",
    category: "Published Research",
    summary:
      "Challenging industry assumptions in Augmented Reality (AR) HUD design",
    ctaLabel: "View Research",
    accentColor: "#4A90C2",
    context: [
      "Before an enterprise invests in bleeding-edge capabilities like Augmented Reality (AR), product leaders have to validate how humans will actually interact with it in high-consequence environments.",
      "To challenge industry assumptions around driver distraction, I led a formal, mixed-methods user study utilizing a driving simulator to analyze how low-cognitive-load AR tasks impact human performance—establishing a data-backed foundation for future AR interface design.",
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
    featuredImages: [
      {
        src: "/images/semiauto_setup.png",
        caption: "Semiautonomous driving simulator and screen view",
      },
      {
        src: "/images/ar_hud.jpg",
        caption: "Semiautonomous vehicle driving simulator",
      },
    ],
    gallery: [
      {
        src: "/images/lettertask.png",
        caption: "Low cognitive load letter task",
      },
      { src: "/images/metrics.png", caption: "NASA-TLX metrics tracked" },
    ],
    sections: [
      {
        heading: "Validating Emerging Tech Through User Research",
        bullets: [
          {
            label: "The Problem",
            text: "When designing software for complex environments (like driving or tactical operations), the default assumption is that adding information equals adding distraction. As Augmented Reality Head-Up Displays (AR HUDs) emerge, I wanted to test this assumption: Can low-cognitive-load AR tasks actually improve user focus during monotonous, low-stimulation tasks?",
          },
        ],
      },
      {
        heading: "The Research Framework",
        bullets: [
          {
            label: "The Methodology",
            text: "To gather rigorous data, I adapted federal NHTSA distraction guidelines and designed a controlled, mixed-methods user study.",
          },
          {
            label: "The Test Group",
            text: "Built a balanced testing pool of 24 participants.",
          },
          {
            label: "The Environment",
            text: "Leveraged a medium-fidelity simulator to track precise lateral and longitudinal telemetry.",
          },
          {
            label: "The Metrics",
            text: "Combined objective vehicle data with subjective user feedback using the industry-standard NASA-TLX index to measure perceived cognitive workload.",
          },
        ],
      },
      {
        heading: "1. Look Beyond Subjective Feedback",
        bullets: [
          {
            label: "The Data",
            text: "Participants subjectively reported that the AR HUD felt more cognitively demanding and distracting than just driving alone. However, the hard telemetry data proved their actual performance improved when the AR tasks were present.",
          },
          {
            label: "The Product Strategy",
            text: "Users aren't always accurate judges of their own performance. When evaluating complex tech, you cannot rely solely on qualitative feedback—you have to validate what users say against hard behavioral telemetry.",
          },
        ],
      },
      {
        heading: "2. Combat User Fatigue with Micro-Interactions",
        bullets: [
          {
            label: "The Data",
            text: "In boring, low-stimulation environments, user focus naturally drops off. Strategically injecting low-cognitive-load AR tasks actively broke up the boredom, keeping drivers alert and stabilizing their reaction times.",
          },
          {
            label: "The Product Strategy",
            text: "In high-consequence, monotonous environments, an entirely silent interface isn't always the ideal state. Designers can strategically use micro-interactions as an alertness mechanism to keep users locked into the loop.",
          },
        ],
      },
      {
        heading: "3. Focus on Cognitive Load, Not Time-on-Task",
        bullets: [
          {
            label: "The Data",
            text: "We tested secondary tasks of varying lengths, assuming longer tasks would degrade focus over time. Surprisingly, task duration had zero measurable impact on user performance.",
          },
          {
            label: "The Product Strategy",
            text: "When launching features for complex systems, time-on-task is secondary to cognitive architecture. If the interface is built correctly to minimize cognitive clutter, users can stay engaged longer without performance drops.",
          },
        ],
      },
      {
        heading: "The Takeaway",
        bullets: [
          {
            label: "The Impact",
            text: "This project highlights my approach to early product discovery. I anchor my strategy in rigorous testing, using standardized benchmarks (NHTSA, NASA-TLX), and challenging baseline assumptions.",
          },
        ],
      },
    ],
  },
  {
    slug: "abbott-loto-mixed-reality",
    title: "Mixed Reality LOTO Training",
    category: "Senior Design Project",
    summary:
      "An immersive mixed-reality (MR) training workflow on the Microsoft HoloLens that eliminates the dangers and operational downtime of heavy machinery safety training.",
    ctaLabel: "View Capstone",
    accentColor: "#C9932E",
    context: [
      "Abbott Nutrition trains employees on lock-out tag-out (LOTO), a safety procedure that restricts and labels equipment during maintenance. Traditionally, training on the actual production floor is highly hazardous for trainees and forces costly operational shutdowns. To mitigate this risk, Abbott utilized a mobile training cart fitted with physical valves, but this workaround completely lacked the visual layout, scale, and environmental stressors of the real factory floor.",
      "To bridge this gap, I worked within a 4-person Virginia Tech senior design team advised by Dr. Joe Gabbard to research and design a mixed-reality alternative built on Microsoft Guides. As the Workflow and User Testing Lead, I managed the end-to-end design of the spatial training logic and validated it through operator testing. The resulting solution simulates high-fidelity floor context without the safety risks.",
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
    featuredImages: [
      {
        src: "/images/abbott.jpg",
        caption: "Mixed reality safety training poster",
      },
    ],
    gallery: [
      {
        src: "/images/hololens.png",
        caption: "HoloLens augmented reality view with Microsoft Guides",
      },
    ],
    sections: [
      {
        heading: "Success Metrics",
        bullets: [
          {
            label: "Time-to-Compliance",
            text: "Accelerate the time it takes an operator to successfully complete the LOTO checklist without a safety infraction.",
          },
          {
            label: "Cognitive Error Rate",
            text: "Minimize the number of visual or procedural missteps during critical equipment isolation sequences.",
          },
        ],
      },
      {
        heading: "Overcoming Adoption Inertia",
        bullets: [
          {
            label: "Constraint",
            text: "Plant operators are accustomed to physical hardware; if the HoloLens felt like a technical gimmick or added unnecessary administrative steps, it would be rejected on the factory floor.",
          },
          {
            label: "The Strategy",
            text: "I designed the workflow to leverage 'holographic context' to provide explicit, new value that a physical cart could not. Instead of just mimicking the training hardware, the HoloLens overlay pulled up real world examples, hazard warnings, and guidance when the worker looked at the machinery.",
          },
          {
            label: "The Result",
            text: "By turning the headset into an asset that gave workers clear operational advantages rather than a rigid digital checklist, we shifted operator perception from a forced compliance tool to an new interactive training opportunity.",
          },
        ],
      },
      {
        heading: "Key Features",
        bullets: [
          {
            label: "Spatial Step-by-Step Guides",
            text: "An intuitive HoloLens workflow that overlays digital checkpoints directly onto the hardware, guiding operators flawlessly through the physical LOTO sequence.",
          },
          {
            label: "Context-Aware Visuals",
            text: "Instead of text-heavy instructions, the system anchors clean spatial markers (like arrows and indicators) directly onto the machinery, keeping the operator’s eyes on the hardware.",
          },
          {
            label: "Low Cognitive-Load Interface",
            text: "Defined through iterative user testing to ensure the interface is highly accessible to frontline workers of all digital literacy levels.",
          },
        ],
      },
      {
        heading: "Financial Impact",
        bullets: [
          {
            label: "$387.820 Projected 3-Year Savings",
            text: "",
          },
          {
            label: "$176,000",
            text: "saved via reduced workplace injury costs.",
          },
          {
            label: "$117,320",
            text: "saved by streamlining and accelerating the training lifecycle.",
          },
          {
            label: "$94,500",
            text: "generated by directly advancing Abbott's corporate digital transformation metrics.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
