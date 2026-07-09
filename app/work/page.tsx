import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Work — ${site.name}`,
};

export default function WorkPage() {
  return (
    <section className="py-6">
      <h1 className="font-title text-5xl text-ink sm:text-6xl">Work</h1>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        A selection of case studies and projects. Click any card to dive in.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </section>
  );
}
