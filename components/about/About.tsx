"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_PARAGRAPHS, ABOUT_STATS, PROFILE } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { Avatar } from "./Avatar";
import { useCountUp } from "../hero/useCountUp";

function AboutStat({ stat, active }: { stat: (typeof ABOUT_STATS)[number]; active: boolean }) {
  const count = useCountUp(stat.value, { active });
  return (
    <div className="rounded-xl border border-hairline bg-surface/50 p-4 text-center">
      <div className="tnums text-2xl font-bold text-amber">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs text-muted">{stat.label}</div>
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <Section id="about" alt>
      <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
        {/* Portrait — small circular frame (swap shape via Avatar prop) */}
        <Reveal className="flex flex-col items-center gap-4 md:items-start">
          {/* PLACEHOLDER: real photo at /public/avatar/bahaa.jpg */}
          <Avatar src="/avatar/bahaa.jpg" alt={PROFILE.name} size={160} shape="circle" />
          <div className="text-center md:text-left">
            <div className="font-heading text-lg font-bold text-ink">{PROFILE.name}</div>
            <div className="text-sm text-teal">{PROFILE.role}</div>
            {/* <div className="text-xs text-muted">📍 {PROFILE.location}</div> */}
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="About Me" title={<>The strategist behind the growth</>} />
          <div className="space-y-4">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-muted sm:text-[1.05rem]">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Stat strip */}
          <div ref={ref} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <AboutStat key={s.label} stat={s} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
