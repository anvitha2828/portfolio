import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
};

export default function AboutPage() {
  return (
    <section className="py-6">
      <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
        About me
      </h1>

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
    </section>
  );
}
