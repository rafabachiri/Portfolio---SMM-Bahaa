"use client";

import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { Section, SectionHeading } from "../ui/Section";

// Recharts is heavy + below the fold — lazy-load, client-only.
const AnalyticsCharts = dynamic(() => import("./AnalyticsCharts"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center text-muted">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  ),
});

export function AnalyticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  // Mount the charts only once scrolled near, so their entry animations play in view.
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="analytics" alt>
      <SectionHeading
        eyebrow="Analytics"
        title={<>The numbers, <span className="text-gradient-amber">visualized</span></>}
        subtitle="A live-style analytics dashboard — the kind of reporting you'll get every week."
      />
      <div ref={ref} className="min-h-[400px]">
        {inView && <AnalyticsCharts />}
      </div>
    </Section>
  );
}
