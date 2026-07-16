/** @format */

// Your work / case studies live here.
// Add, remove, or reorder entries — the Portfolio page and detail pages update automatically.
// Drop cover images into /public/images and reference them as "/images/your-file.jpg".

export type CaseStudySection = {
  heading?: string; // omit for a section that's just an inline image (e.g. a GIF between write-up sections)
  body?: string; // plain paragraph text
  // "split" renders `bullets` side-by-side (left/right) inside a single
  // full-width card, instead of the default plain bullet-dot list — use
  // for a "here's the data, here's what it means" pairing.
  layout?: "split";
  bullets?: {
    label?: string;
    text: string;
    icon?: string; // lucide-react icon name, e.g. "Compass" — swaps out the default "•" (see ICONS map in app/portfolio/[slug]/page.tsx)
    imageReveal?: {
      phrase: string; // must appear verbatim inside `text` — that substring becomes a click-to-reveal trigger
      src: string;
      caption?: string;
    };
  }[]; // use instead of `body` for a bullet list
  image?: { src: string; caption?: string }; // inline photo/GIF, shown below the heading
};

// A photo is either a plain path (no caption) or an object with a caption —
// e.g. "/images/shot.png" or { src: "/images/shot.png", caption: "..." }.
// Set `small: true` to render a featured image at the smaller gallery
// size instead of the default large hero size. Set `hideFromGallery: true`
// when the same clip already appears inline in a section further down —
// it still counts as the card's cover photo, it just won't also show up
// (duplicated) in the detail page's gallery scroll/lightbox.
export type GalleryImage =
  | string
  | {
      src: string;
      caption?: string;
      small?: boolean;
      hideFromGallery?: boolean;
    };

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

export function imageHideFromGallery(image: GalleryImage): boolean {
  return typeof image === "string" ? false : (image.hideFromGallery ?? false);
}

// GIF-replacement clips (.mp4/.webm) render as a looping muted <video>
// instead of an <img> wherever photos are shown.
export function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm)$/i.test(src);
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
            icon: "Users",
          },
          {
            label: "User Journeys",
            text: "I draw out end-to-end user journeys showing exactly how data, people, and technology interact in the real world.",
            icon: "Route",
          },
          {
            label: "Risk Analysis",
            text: "I run formal risk assessments in order to identify, prioritize, and mitigate potential threats.",
            icon: "ShieldAlert",
          },
          {
            label: "Roadmaps",
            text: "I translate high-level strategies into clear, operational roadmaps designed for the entire enterprise: keeping leaders aligned, daily users empowered, and support teams fully equipped.",
            icon: "Map",
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
            text: "I keep a clear picture of the end user front and center throughout the entire process. Personas aren't just a design exercise, they are a critical communication tool that I use to guide teams to make informed decisions about the product's direction.",
            icon: "Compass",
          },
          {
            label: "Iterative Prototyping",
            text: "I design clean interfaces that explain why a complex system gave a specific output to build immediate user trust. I then live-test mockups to get rapid feedback, using real user data to guide our next design iterations.",
            icon: "Layers",
          },
          {
            label: "Task Prioritization & Backlogs",
            text: "I translate requirements into actionable tasks while maintaining a clean backlog for the team. I make sure we prioritize the most important work today without losing track of great ideas for tomorrow.",
            icon: "ListChecks",
          },
        ],
      },
      {
        heading: "My Value Add",
        bullets: [
          {
            label: "No Telephone Game",
            text: "Everyone stays aligned on the same product vision. Using clear personas, defined requirements, and a shared roadmap ensures developers and stakeholders are always on the same page.",
          },
          {
            label: "Early Validation",
            text: "Testing concepts early with mockups and prototypes keeps stakeholders in the loop and ensures we build the right thing before writing code.",
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
      "An interactive web app that reimagines genealogy by making family tree creation as fast and as visual as sketching on paper",
    ctaLabel: "View Case Study",
    accentColor: "#4F9D6E",
    context: [
      "I saw a great opportunity to build this tool after sitting down with my grandparents to hear stories about their siblings and cousins. Trying to visualize all those complex, winding relationships on a flat piece of paper made me realize how fun it would be to bring that dynamic family history to life in real time.",
      "My goal was to create a collaborative tool where anyone could sit down and immediately start building a tree with zero learning curve. I wanted to skip the tedious process of filling out forms and defining rigid relationships. Instead, you can start with just one person and watch the tree grow naturally as you sketch it out.",
      "To make exploring these stories easily, I built a few different ways to look at the data:",
      {
        label: "Standard Tree View",
        text: "A clean, structured layout.",
      },
      {
        label: "Dynamic Network Map",
        text: "Uses physics-based animations for a big-picture, interactive exploration of the family.",
      },
      {
        label: "Branch Isolation Feature",
        text: "Lets you filter out the noise and focus on just one specific family branch at a time.",
      },
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
        src: "/images/standard.mp4",
        caption: "Phase 1: Standard Tree View",
        hideFromGallery: true,
      },
      {
        src: "/images/dynamic.mp4",
        caption: "Phase 2: Force-Directed Map",
        hideFromGallery: true,
      },
      {
        src: "/images/adding_tabs.mp4",
        caption: "Creating family specific tabs",
        hideFromGallery: true,
      },
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
        heading: "Product Scoping & Sequencing",
        bullets: [
          {
            label: "The Phase 1",
            text: `Standard Tree + Ghost Connectors 
                  I put all my early energy into the data-entry experience. Before anyone can enjoy exploring a network of information, they need an easy, intuitive way to actually build it. 
                  **Think about how we talk about family: you might say, "my sister's husband's parents." I wanted the app to work exactly like that train of thought.**
                  You should be able to just click, chain relationships together, and add people to the tree on the fly. That's why I started by building the ghost-node connector—to make adding new connections feel that natural.`,
            imageReveal: {
              phrase: "ghost-node connector",
              src: "/images/ghost_node.png",
              caption: "Adding relationships — 'ghost node' example",
            },
          },
          {
            label: "The Phase 2",
            text: `Dynamic View
            Once the creation flow felt seamless, I introduced the dual-view. Alongside the structured tree view for hierarchy, I built a force-directed network map.
            The goal was to give users that "wow" moment when they step back and see a complex family tree come to life as a dynamic and connected web.`,
          },
          {
            label: "The Trade-off",
            text: `Delay Feature
            I intentionally delayed interactive physics animations until basic creation mechanics were locked. A beautifully animating canvas means nothing if users struggle to input their data.`,
          },
        ],
      },
      {
        image: {
          src: "/images/standard.mp4",
          caption: "Phase 1: Standard Tree View",
        },
      },
      {
        image: {
          src: "/images/dynamic.mp4",
          caption: "Phase 2: Force-Directed Map",
        },
      },
      {
        heading: "Feature Breakdown",
        bullets: [
          {
            label: "Standard Tree View",
            text: "A clean, structured layout for a clear top-down read of hierarchy and lineage.",
          },
          {
            label: "Ghost-Node Interface",
            text: "Eliminated the need to use traditional sidebar forms. Clicking an active node triggers ghost nodes directly on the canvas, enabling users to spawn relatives with a single click.",
          },
          {
            label: "Force-Directed Map",
            text: "Utilized physics-based properties to make navigating massive networks tactile. Dragging family nodes pulls, stretches, and bounces connected branches dynamically in real-time.",
          },
          {
            label: "The Excel View Tab",
            text: "Implemented a toggleable spreadsheet panel at the bottom, allowing users to group, search, and isolate specific branches (e.g., dad's side) to manage visual noise.",
          },
        ],
      },
      {
        image: {
          src: "/images/adding_tabs.mp4",
          caption: "Creating family specific tabs",
        },
      },
      {
        heading: "Target Metrics",
        bullets: [
          {
            text: "These metrics were informed by my desire for any user to be able to access this tool and immediately start building.",
          },
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
    ],
  },
  {
    slug: "ar-hud-monotonous-driving",
    title: "AR HUD Driving Research",
    category: "Published Research",
    summary:
      "Challenging industry assumptions in Augmented Reality (AR) Heads-up Display (HUD) design",
    ctaLabel: "View Research",
    accentColor: "#4A90C2",
    context: [
      "When I think about in-vehicle displays, I usually assume they’re a hazard. It's another distraction pulling our eyes off the road. But as we look toward future tech like Augmented Reality (AR) and Heads-up Displays (HUDs), I wanted to flip that assumption on its head and answer a different question: Could AR HUDs actually make us better drivers?",
      "This is especially crucial during long, monotonous drives. When drivers are understimulated they can often feel drowsy or tired which are massive safety concerns. To see if AR could actually help keep drivers engaged and improve their performance, I ran a formal user study. We put participants in a driving simulator to test how interacting with a low-cognitive-load AR task affected their driving performance.",
    ],
    role: ["Author", "Researcher"],
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
        src: "/images/study_summary.png",
        caption: "Study summary",
        hideFromGallery: true,
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
            label: "The Challenge",
            text: "In high-stakes environments like driving, the default design rule is usually 'less is more.' The assumption is that throwing any new digital information at a user just adds distraction.",
          },
        ],
      },
      {
        image: {
          src: "/images/study_summary.png",
          caption: "Study summary",
        },
      },
      {
        heading: "How We Ran the Study",
        bullets: [
          {
            label: "The Methodology",
            text: "Adapted federal NHTSA distraction guidelines and designed a controlled, mixed-methods user study.",
          },
          {
            label: "The Test Group",
            text: "Built a balanced testing pool of 22 participants.",
          },
          {
            label: "The Environment",
            text: "Used a medium-fidelity driving simulator to track driving behavior (lane keeping, following distances).",
          },
          {
            label: "The Metrics",
            text: "Combined vehicle driving data with subjective workload ratings using NASA-TLX the industry-standard NASA-TLX index to measure perceived cognitive workload.",
          },
        ],
      },
      {
        heading: "Key Takeaways",
      },
      {
        heading: "1. What users say isn't always what they do",
        layout: "split",
        bullets: [
          {
            label: "Data",
            text: "Interestingly, drivers reported that the AR HUD felt more demanding than driving without it. But the simulator's driving data told a completely different story. Driver's actual performance significantly improved when the AR tasks were active.",
          },
          {
            label: "Finding",
            text: "Users are not always the best at self-reporting cognitive workload. When you are validating novel tech, qualitative feedback only tells half the story. You have to back up what users say with hard data.",
          },
        ],
      },
      {
        heading: `2. Fight "drowsiness" with small interactions`,
        layout: "split",
        bullets: [
          {
            label: "Data",
            text: "On long, monotonous drives, a driver's attention naturally bottoms out. By strategically introducing quick, low-effort AR tasks, we essentially broke up the boredom. This kept drivers alert, stabilized their reaction times, and prevented them from tuning out.",
          },
          {
            label: "Finding",
            text: "In high-consequence, low-stimulation environments, a totally silent interface isn't always the safest choice. We can strategically use interactions to gently pull users back into the loop and keep them attentive.",
          },
        ],
      },
      {
        heading: "3. Design for cognitive load, not time-on-task",
        layout: "split",
        bullets: [
          {
            label: "Data",
            text: "We tested secondary tasks of varying durations, fully expecting longer tasks to degrade focus. Surprisingly, the length of the task had no measurable impact on driving performance.",
          },
          {
            label: "Finding",
            text: `When building features for complex systems, don't just obsess over "time-on-task." If the information is layered correctly, users can interact with it longer without a drop in performance`,
          },
        ],
      },
      {
        heading: "My Value Add",
        bullets: [
          {
            label: "Mindset",
            text: "This project highlights my approach to early product discovery. I anchor my strategy in rigorous testing, using standardized benchmarks (NHTSA, NASA-TLX), and challenging baseline assumptions.",
          },
        ],
      },
    ],
  },
  {
    slug: "abbott-loto-mixed-reality",
    title: "Mixed Reality Safety Training",
    category: "Senior Design Project",
    summary:
      "An immersive mixed-reality (MR) training workflow on the Microsoft HoloLens that eliminates the physical dangers and costly operational downtime of heavy machinery safety training.",
    ctaLabel: "View Capstone",
    accentColor: "#C9932E",
    context: [
      "When you’re training factory operators on Lock-out/Tag-out (LOTO), the process of shutting down heavy machinery when you perform maintenance or inspections, you’re stuck in a classic lose-lose situation. Training operators on the actual factory floor is incredibly dangerous, but shutting down active assembly lines to train them safely costs the company a fortune in downtime.",
      "To work around this, Abbott Nutrition uses a mobile training cart with dummy valves. It was safe, but it was totally unrealistic. It couldn't replicate the actual scale, layout, or stressful environment of the real factory floor, leaving operators unprepared.",
      "I teamed up with three other VT engineers to build an immersive, mixed-reality alternative using Microsoft Guides and the HoloLens. As the Workflow and User Testing Lead, I designed the spatial training logic and ran hands-on tests with actual operators. We were able to bring the factory floor to any location, giving trainees critical & life-saving context without needing operational downtime.",
    ],
    role: ["User Researcher", "UX Designer"],
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
        heading: "Overcoming Adoption Inertia",
        bullets: [
          {
            label: "Constraint",
            text: "Plant operators are used to physical, tactile hardware. If the HoloLens felt like a clunky and technical, they would be unlikely to use it.",
          },
        ],
      },
      {
        layout: "split",
        bullets: [
          {
            label: "Strategy",
            text: "Instead of just mimicking the training hardware, the HoloLens overlay pulled up real world examples, holographic indicators, hazard warnings, and guidance when the worker looked at the machinery.",
          },
          {
            label: "Result",
            text: "By turning the headset into a tool that actually made their jobs easier rather than a forced compliance exercise, we shifted operator perception.",
          },
        ],
      },
      {
        heading: "Key Features",
        bullets: [
          {
            label: "Spatial Step-by-Step Guides",
            text: "An intuitive HoloLens workflow that overlays digital checkpoints directly onto the physicalhardware, guiding operators through the LOTO sequence.",
          },
          {
            label: "Context-Aware Visuals",
            text: "Instead of text-heavy instructions, the system anchors markers (like arrows and indicators) directly onto the machinery, keeping the operator’s eyes on the hardware.",
          },
          {
            label: "Seamless Interface",
            text: "Refined through iterative user testing to ensure the interface is accessible to employees of all digital literacy levels.",
          },
        ],
      },
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
