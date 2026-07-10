import type { Metadata } from "next";
import { site } from "@/lib/site";
import { experience } from "@/content/experience";
import { caseStudies } from "@/content/caseStudies";
import { CaseStudyCard } from "@/components/CaseStudyCard";

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

        {/* Bio — replace the placeholder paragraphs with your real bio */}
        <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
          <p>
            {/* TODO: your intro */}
            This is a placeholder bio. Tell your story here — who you are,
            what you care about, and the kind of work that lights you up.
          </p>
          <p>
            Add a second paragraph about your background, interests, or how
            you got here. Keep it warm and personal — this is the whimsical
            corner of the site.
          </p>
          <p>
            Want to reach out? Grab my email from the ✉️ icon in the nav, or
            check out my{" "}
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
      </section>

      {/* Work history — edit content/experience.ts, not this markup */}
      <section className="mt-16 max-w-2xl">
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
      </section>

      {/* Selected work — edit content/caseStudies.ts, not this markup */}
      <section id="work" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Selected Work
        </h2>
        <p className="mt-3 max-w-xl text-lg text-ink/70">
          A selection of case studies and projects. Click any card to dive in.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
