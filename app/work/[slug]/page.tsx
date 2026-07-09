import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/lib/site";

// Pre-render a static page for every case study.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return {
    title: study ? `${study.title} — ${site.name}` : `Work — ${site.name}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const hasMore = study.sections.length > 0;

  return (
    <article className="py-6">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-coral"
      >
        <span aria-hidden="true">←</span> Back to work
      </Link>

      {/* Title block */}
      <div className="mt-6">
        <h1 className="font-display text-5xl font-bold text-ink sm:text-6xl">
          {study.title}
        </h1>
        {study.category && (
          <p className="mt-2 text-xl text-ink/40">{study.category}</p>
        )}
      </div>

      <hr className="mt-8 border-ink/10" />

      {/* Meta sidebar + description/context */}
      <div className="mt-10 grid gap-10 sm:grid-cols-[180px_1fr] sm:gap-14">
        <div className="space-y-8">
          <Meta label="My Role" items={study.role} />
          <Meta label="Tools" items={study.tools} />
          <Meta label="Timeline" items={[study.timeline]} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Description
          </p>
          <p className="mt-2 text-lg leading-relaxed text-ink/80">
            {study.summary}
          </p>

          {study.context.length > 0 && (
            <>
              <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-ink/40">
                Context
              </p>
              <div className="mt-2 space-y-4 text-lg leading-relaxed text-ink/80">
                {study.context.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </>
          )}

          {study.links && study.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral underline decoration-1 underline-offset-4 transition-colors hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}

          {hasMore && (
            <a
              href="#details"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Read Case Study
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Deeper write-up — add sections in content/caseStudies.ts to fill this in */}
      {hasMore && (
        <div id="details" className="mx-auto mt-16 max-w-2xl space-y-8 scroll-mt-24">
          {study.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-2xl font-bold text-ink">
                {section.heading}
              </h2>
              {section.bullets ? (
                <ul className="mt-3 space-y-3">
                  {section.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-lg leading-relaxed text-ink/80"
                    >
                      <span className="mt-1 text-coral" aria-hidden="true">
                        •
                      </span>
                      <span>
                        {bullet.label && (
                          <span className="font-semibold text-ink">
                            {bullet.label}:{" "}
                          </span>
                        )}
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-lg leading-relaxed text-ink/80">
                  {section.body}
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </article>
  );
}

function Meta({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
        {label}
      </p>
      <ul className="mt-2 space-y-1 text-ink/80">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
