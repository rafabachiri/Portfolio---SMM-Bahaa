"use client";

import { motion } from "framer-motion";
import { PLATFORMS, SKILLS, TOOLS } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal, RevealGroup } from "../ui/Reveal";
import { BrandLogo } from "../ui/BrandLogo";

function PlatformsRow() {
  return (
    <div className="flex flex-wrap gap-3">
      {PLATFORMS.map((p) => (
        <motion.span
          key={p.name}
          whileHover={{ y: -3 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-2 text-sm font-medium text-ink"
        >
          <BrandLogo name={p.name} className="h-5 w-5" />
          {p.name}
        </motion.span>
      ))}
    </div>
  );
}

function ToolsMarquee() {
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const row = [...TOOLS, ...TOOLS];
  return (
    <div className="marquee-mask overflow-hidden">
      <div className="flex w-max animate-marquee gap-3">
        {row.map((t, i) => (
          <span
            key={`${t.name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-hairline bg-surface/50 px-4 py-2.5 text-sm text-ink"
          >
            <BrandLogo name={t.name} className="h-5 w-5" />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsTags() {
  return (
    <RevealGroup className="flex flex-wrap gap-2.5" stagger={0.04}>
      {SKILLS.map((s) => (
        <motion.span
          key={s}
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
          }}
          className="rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 text-sm font-medium text-teal"
        >
          {s}
        </motion.span>
      ))}
    </RevealGroup>
  );
}

export function PlatformsSection() {
  return (
    <Section id="stack" alt>
      <SectionHeading
        eyebrow="Platforms · Tools · Skills"
        title="The full stack behind the strategy"
        subtitle="The platforms I manage, the tools I create with, and the skills that tie it all together."
      />

      <div className="space-y-10">
        <Reveal>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Platforms</h3>
          <PlatformsRow />
        </Reveal>

        <Reveal>
          {/* PLACEHOLDER: swap emoji/text badges for real tool logos when assets exist */}
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Tools</h3>
          <ToolsMarquee />
        </Reveal>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Skills</h3>
          <SkillsTags />
        </div>
      </div>
    </Section>
  );
}
