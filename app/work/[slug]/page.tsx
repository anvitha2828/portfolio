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

const accentBg: Record<string, string> = {
  coral: "bg-coral",
  sky: "bg-sky",
  leaf: "bg-leaf",
  butter: "bg-butter",
  peach: "bg-peach",
};

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

      <header className="mt-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          <span>{study.role}</span>
          <span aria-hidden="true">•</span>
          <span>{study.year}</span>
        </div>
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink/70">{study.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-ink/60 shadow-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Cover */}
      <div
        className={`relative mt-8 flex aspect-[16/8] items-center justify-center overflow-hidden rounded-blob ${accentBg[study.accent] ?? "bg-peach"}`}
      >
        {study.cover ? (
          <Image
            src={study.cover}
            alt={study.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        ) : (
          <span className="font-display text-2xl font-semibold text-ink/50">
            Cover image
          </span>
        )}
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
