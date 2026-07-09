import Link from "next/link";
import Image from "next/image";
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

  return (
    <article className="py-6">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-coral"
      >
        <span aria-hidden="true">←</span> Back to work
      </Link>

      {/* Minimal hero — muted tile with the title inside, matching the Work grid.
          Everything below this is yours to break out and make fun. */}
      <div className="relative mt-6 flex aspect-[21/9] items-center justify-center overflow-hidden rounded-blob border border-ink/5 bg-ink/[0.03] p-10 text-center">
        {study.cover ? (
          <>
            <h1 className="sr-only">{study.title}</h1>
            <Image
              src={study.cover}
              alt={study.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </>
        ) : (
          <h1 className="font-display text-3xl font-semibold text-ink/30 sm:text-5xl">
            {study.title}
          </h1>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
          {study.role} • {study.year}
        </span>
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-ink/[0.04] px-2.5 py-0.5 text-xs font-semibold text-ink/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Body sections */}
      <div className="mx-auto mt-10 max-w-2xl space-y-8">
        {study.sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {section.heading}
            </h2>
            {section.bullets ? (
              <ul className="mt-3 space-y-3">
                {section.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-lg leading-relaxed text-ink/80">
                    <span className="mt-1 text-coral" aria-hidden="true">•</span>
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
    </article>
  );
}
