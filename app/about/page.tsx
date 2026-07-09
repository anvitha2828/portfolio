import type { Metadata } from "next";
import { site } from "@/lib/site";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
};

export default function AboutPage() {
  return (
    <section className="py-6">
      <h1 className="font-title text-5xl text-ink sm:text-6xl">About me</h1>

      {/* Bio — replace the placeholder paragraphs with your real bio */}
      <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
        <p>
          {/* TODO: your intro */}
          This is a placeholder bio. Tell your story here — who you are, what
          you care about, and the kind of work that lights you up.
        </p>
        <p>
          Add a second paragraph about your background, interests, or how you
          got here. Keep it warm and personal — this is the whimsical corner
          of the site.
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

      {/* Work history — edit content/experience.ts, not this markup */}
      <div className="mt-14 max-w-2xl">
        <h2 className="font-title text-3xl text-ink sm:text-4xl">
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
  );
}
