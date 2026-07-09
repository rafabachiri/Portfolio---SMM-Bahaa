"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

// Lazy-load the heavy react-pdf viewer, client-only (it touches DOM APIs).
const CaseStudyPdfViewer = dynamic(() => import("./CaseStudyPdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-muted">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  ),
});

export function CaseStudiesSection() {
  return (
    <Section id="case-studies">
      <SectionHeading
        eyebrow="Case Studies"
        title={<>Proof in the <span className="text-gradient-amber">numbers</span></>}
        subtitle="Real decks, real results. Scroll through each case study below — or open it full-size."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {CASE_STUDIES.map((cs) => (
          <Reveal key={cs.id}>
            <div className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/50">
              {/* Header */}
              <div className="border-b border-hairline p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-base font-semibold text-ink">{cs.title}</h3>
                    <p className="text-xs text-muted">{cs.client}</p>
                  </div>
                  <a
                    href={cs.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg border border-hairline px-3 py-1.5 text-xs font-medium text-teal transition-colors hover:border-teal/60"
                  >
                    Open ↗
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cs.stats.map((s) => (
                    <span
                      key={s.label}
                      className="rounded-lg bg-navy-dark px-2.5 py-1 text-xs"
                    >
                      <span className="font-bold text-success tnums">{s.value}</span>{" "}
                      <span className="text-muted">{s.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Scrollable PDF panel */}
              <div className="h-[440px] bg-navy-dark/40 sm:h-[520px]">
                <CaseStudyPdfViewer file={cs.pdf} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
