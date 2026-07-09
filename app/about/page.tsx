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

      <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
        {/* Photo slot — drop a headshot into /public/images/headshot.jpg */}
        <div className="relative aspect-square w-full overflow-hidden rounded-blob border border-ink/5 bg-peach shadow-soft">
          {/* Replace the placeholder below with your real image:
              <Image src="/images/headshot.jpg" alt="Anvitha" fill className="object-cover" /> */}
          <div className="grid h-full w-full place-items-center font-display text-lg text-ink/50">
            Your photo
          </div>
        </div>

        {/* Bio — replace the placeholder paragraphs with your real bio */}
        <div className="space-y-4 text-lg leading-relaxed text-ink/80">
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
      </div>
    </section>
  );
}
