/** @format */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { experience } from "@/content/experience";
import { caseStudies } from "@/content/caseStudies";
import { StackedCaseStudies } from "@/components/StackedCaseStudies";
import { DefinitionTerm } from "@/components/DefinitionTerm";
import {
  MagneticText,
  type MagneticTextSegment,
} from "@/components/MagneticText";
import { FadeUp } from "@/components/FadeUp";

export default function HomePage() {
  return (
    <>
      <section
        id="top"
        className="relative w-screen py-16 sm:py-20"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Sparkle decorations — offset enough to clear the h1's own
              bounding box (icon height + top offset must stay negative),
              so they sit above the title instead of behind its letters. */}
          <Sparkle className="absolute -top-12 right-4 h-10 w-10 text-butter animate-float sm:-top-16 sm:right-12" />
          <Sparkle className="absolute -top-8 left-0 h-6 w-6 text-coral animate-float [animation-delay:1s] sm:-top-10 sm:left-6" />
          <Starburst className="absolute -top-14 left-24 h-8 w-8 text-butter animate-wiggle sm:-top-20 sm:left-40" />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            <MagneticText segments={[{ text: site.name }]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-6 max-w-lg font-title text-3xl leading-snug text-ink sm:text-4xl lg:text-5xl"
          >
            <MagneticText segments={taglineSegments(site.tagline)} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <Link
              href="#work"
              className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              See my Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Me — bio + work history. Edit content/experience.ts for the
          latter, not this markup. */}
      <section id="about" className="scroll-mt-24 py-6">
        {/* Intro — full width, centered, no columns */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeUp>
            <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
              About Me
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                I&apos;m a product manager with a background in{" "}
                <DefinitionTerm
                  term="systems engineering"
                  definition="Systems engineering is the discipline of designing and managing complex systems so all their interconnected parts work together effectively."
                />{" "}
                and human factors. I enjoy taking complex problems,
                understanding the people behind them, and working with
                cross-functional teams to build intuitive solutions.
              </p>
              <p>
                Want to reach out? Email me at{" "}
                <a
                  href="mailto:anvitha2828@gmail.com"
                  className="font-semibold text-coral underline decoration-solid underline-offset-4"
                >
                  anvitha2828@gmail.com
                </a>{" "}
                , check out my{" "}
                <a
                  href={site.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-coral underline decoration-wavy underline-offset-4"
                >
                  resume
                </a>
                , or connect with me on{" "}
                <a
                  href="https://www.linkedin.com/in/anvitha-nachi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-coral underline decoration-wavy underline-offset-4"
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <a
              href="#work"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
            >
              Jump to selected work ↓
            </a>
          </FadeUp>
        </div>

        {/* Work history (left) + what I bring to the table (right) */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Work history — edit content/experience.ts, not this markup */}
          <FadeUp>
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Where I&apos;ve Worked
            </h3>
            <div className="mt-6 divide-y divide-ink/10">
              {experience.map((role, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-8"
                >
                  <span className="w-full shrink-0 text-ink/50 sm:w-36">
                    {role.period}
                  </span>
                  <span className="text-lg text-ink">
                    <span className="font-semibold">{role.role}</span>{" "}
                    <span className="text-ink/60">@ {role.company}</span>
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* TODO: content to come */}
          <FadeUp delay={0.1}>
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              What I Bring to the Table
            </h3>
          </FadeUp>
        </div>
      </section>

      {/* Selected work — edit content/caseStudies.ts, not this markup.
          Each case study below is its own full-page, scroll-stacked
          section (see StackedCaseStudies.tsx) rather than a grid. */}
      <section id="work" className="mt-6 scroll-mt-24">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-3 max-w-xl text-lg text-ink/70">
            A selection of case studies and projects. Keep scrolling.
          </p>
        </FadeUp>
        <div className="h-6" aria-hidden="true" />
      </section>

      <StackedCaseStudies caseStudies={caseStudies} />
    </>
  );
}

// Splits the tagline into MagneticText segments, italicizing "feel"
// wherever it appears — echoing the reference typography (upright serif
// with one italicized word).
function taglineSegments(text: string): MagneticTextSegment[] {
  return text
    .split(/(\bfeel\b)/i)
    .filter(Boolean)
    .map((part) => ({ text: part, italic: /^feel$/i.test(part) }));
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c.6 4.2 1.4 7 3 8.6 1.6 1.6 4.4 2.4 9 3-4.6.6-7.4 1.4-9 3-1.6 1.6-2.4 4.4-3 8.6-.6-4.2-1.4-7-3-8.6-1.6-1.6-4.4-2.4-9-3 4.6-.6 7.4-1.4 9-3 1.6-1.6 2.4-4.4 3-8.6Z" />
    </svg>
  );
}

function Starburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M19.1 4.9l-4.2 4.2M9.1 14.9l-4.2 4.2" />
    </svg>
  );
}
