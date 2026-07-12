import type { Metadata } from "next";
import { site } from "@/lib/site";
import { experience } from "@/content/experience";
import { caseStudies } from "@/content/caseStudies";
import { StackedCaseStudies } from "@/components/StackedCaseStudies";
import { DefinitionTerm } from "@/components/DefinitionTerm";

export const metadata: Metadata = {
  title: `Portfolio — ${site.name}`,
};

export default function PortfolioPage() {
  return (
    <div className="py-6">
      <section>
        <h1 className="font-display text-5xl font-bold text-ink sm:text-6xl">
          Portfolio
        </h1>
      </section>

      <section className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              I&apos;m a product manager with a background in{" "}
              <DefinitionTerm
                term="systems engineering"
                definition="Systems engineering is the discipline of designing and managing complex systems so all their interconnected parts work together effectively."
              />{" "}
              and human factors. I enjoy taking complex problems,
              understanding the people behind them, and working with
              cross-functional teams to build solutions that are intuitive
              and useful.
            </p>
            <p>
              This portfolio highlights projects where I&apos;ve led
              research, defined product direction, collaborated with
              engineers and designers, and made decisions grounded in user
              needs.
            </p>
            <p>
              Want to reach out? Grab my email from the ✉️ icon in the nav,
              or check out my{" "}
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-coral underline decoration-wavy underline-offset-4"
              >
                resume
              </a>
              .
            </p>
          </div>

          <a
            href="#work"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
          >
            Jump to selected work ↓
          </a>
        </div>

        {/* Work history — edit content/experience.ts, not this markup */}
        <div>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Where I&apos;ve Worked
          </h2>
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
        </div>
      </section>

      {/* Selected work — edit content/caseStudies.ts, not this markup.
          Each case study below is its own full-page, scroll-stacked
          section (see StackedCaseStudies.tsx) rather than a grid. */}
      <section id="work" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-3 max-w-xl text-lg text-ink/70">
          A selection of case studies and projects. Keep scrolling.
        </p>
      </section>

      <StackedCaseStudies caseStudies={caseStudies} />
    </div>
  );
}
