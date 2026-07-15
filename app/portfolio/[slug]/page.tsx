import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Compass, Layers, ListChecks, Map, Route, ShieldAlert, Users } from "lucide-react";
import { caseStudies, getCaseStudy, isVideoSrc } from "@/content/caseStudies";
import { site } from "@/lib/site";
import { CaseStudyGallery } from "@/components/CaseStudyGallery";
import { ClickToRevealImage } from "@/components/ClickToRevealImage";

// Maps a bullet's `icon` name (see CaseStudySection in content/caseStudies.ts)
// to its lucide-react component. Add an entry here whenever a new icon name
// is used in content.
const ICONS: Record<string, typeof Users> = {
  Users,
  Route,
  ShieldAlert,
  Map,
  Compass,
  Layers,
  ListChecks,
};

// Renders a bullet's text, supporting **this** as inline bold+italic
// emphasis and swapping `reveal.phrase` (verbatim substring, may fall
// inside or outside an emphasized run) for a click-to-reveal image
// trigger. Split on emphasis first, then look for the reveal phrase
// within each resulting segment, so the two features nest correctly
// regardless of which segment the phrase lands in.
function renderBulletText(
  text: string,
  reveal?: { phrase: string; src: string; caption?: string },
) {
  const segments = text
    .split(/\*\*(.+?)\*\*/g)
    .map((segment, i) => ({ text: segment, emphasis: i % 2 === 1 }));

  return segments.map((segment, i) => {
    const idx = reveal ? segment.text.indexOf(reveal.phrase) : -1;
    const inner =
      idx === -1 ? (
        segment.text
      ) : (
        <>
          {segment.text.slice(0, idx)}
          <ClickToRevealImage
            trigger={reveal!.phrase}
            src={reveal!.src}
            caption={reveal!.caption}
          />
          {segment.text.slice(idx + reveal!.phrase.length)}
        </>
      );
    return segment.emphasis ? (
      <strong key={i} className="my-3 block text-center">
        <em>{inner}</em>
      </strong>
    ) : (
      <Fragment key={i}>{inner}</Fragment>
    );
  });
}

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
    title: study
      ? `${study.title} — ${site.name}`
      : `Portfolio — ${site.name}`,
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
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-coral"
      >
        <span aria-hidden="true">←</span> Back to portfolio
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
                {study.context.map((paragraph, i) =>
                  typeof paragraph === "string" ? (
                    <p key={i}>{renderBold(paragraph)}</p>
                  ) : (
                    <p key={i} className="text-base">
                      <span className="font-semibold text-coral">
                        {paragraph.label}:
                      </span>{" "}
                      {paragraph.text}
                    </p>
                  )
                )}
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

      {/* Screenshots — horizontal scroll strip so the gallery doesn't eat
          vertical space; click any to open a full-screen,
          arrow-key/filmstrip-navigable lightbox */}
      <CaseStudyGallery
        featuredImages={study.featuredImages}
        gallery={study.gallery}
        alt={study.title}
      />

      {/* Deeper write-up — add sections in content/caseStudies.ts to fill this in */}
      {hasMore && (
        <div id="details" className="mx-auto mt-16 max-w-2xl space-y-8 scroll-mt-24">
          {study.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl font-bold text-ink">
                  {section.heading}
                </h2>
              )}
              {section.image && (
                <figure className={section.heading ? "mt-4" : undefined}>
                  {isVideoSrc(section.image.src) ? (
                    <video
                      src={section.image.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full rounded-2xl border border-ink/10 shadow-soft"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={section.image.src}
                      alt={section.image.caption ?? ""}
                      className="w-full rounded-2xl border border-ink/10 shadow-soft"
                    />
                  )}
                  {section.image.caption && (
                    <figcaption className="mt-2 text-center text-sm text-ink/60">
                      {section.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {section.bullets ? (
                <>
                  {section.bullets
                    .filter((bullet) => !bullet.label)
                    .map((bullet, j) => (
                      <p
                        key={j}
                        className="mt-3 text-sm italic leading-relaxed text-ink/70"
                      >
                        {bullet.text}
                      </p>
                    ))}
                  {(() => {
                    const labeled = section.bullets.filter((b) => b.label);
                    if (labeled.length === 0) return null;

                    // Bullets with an icon get the bigger, card-style
                    // treatment; without one they keep the plain
                    // bullet-dot list used everywhere else.
                    if (labeled.some((b) => b.icon)) {
                      return (
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {labeled.map((bullet, j) => {
                            const Icon = bullet.icon
                              ? ICONS[bullet.icon]
                              : undefined;
                            return (
                              <div
                                key={j}
                                className="group rounded-2xl bg-cream p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-chip hover:ring-2 hover:ring-coral/40"
                              >
                                {Icon && (
                                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10 transition-colors duration-300 group-hover:bg-coral/20">
                                    <Icon
                                      className="h-5 w-5 text-coral transition-transform duration-300 group-hover:animate-float"
                                      aria-hidden="true"
                                    />
                                  </span>
                                )}
                                <p className="font-display text-lg font-bold text-ink">
                                  {bullet.label}
                                </p>
                                <p className="mt-2 text-ink/70">
                                  {bullet.text}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <ul className="mt-3 space-y-3">
                        {labeled.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-lg leading-relaxed text-ink/80"
                          >
                            <span
                              className="mt-1 text-coral"
                              aria-hidden="true"
                            >
                              •
                            </span>
                            <span className="whitespace-pre-line">
                              <span className="font-semibold text-ink">
                                {bullet.label}:{" "}
                              </span>
                              {renderBulletText(bullet.text, bullet.imageReveal)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  })()}
                </>
              ) : section.body ? (
                <p className="mt-2 text-lg leading-relaxed text-ink/80">
                  {section.body}
                </p>
              ) : null}
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

// Lets content data mark specific words bold inline with **this** syntax,
// instead of only being able to bold a whole leading label.
function renderBold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
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
