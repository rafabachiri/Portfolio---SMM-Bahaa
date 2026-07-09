"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";

export function ProcessTimeline() {
  return (
    <Section id="process" alt>
      <SectionHeading
        eyebrow="How I Work"
        title="A process that keeps growth predictable"
        subtitle="Five deliberate steps — from research to optimization — so nothing is left to chance."
      />

      <div className="relative">
        {/* Desktop horizontal track */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-[2px] bg-hairline md:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-teal to-amber"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>
        {/* Mobile vertical track */}
        <div className="pointer-events-none absolute bottom-4 left-7 top-4 w-[2px] bg-hairline md:hidden">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-teal to-amber"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>

        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
              className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
            >
              <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-xl shadow-[var(--shadow-panel)]">
                {step.icon}
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-amber text-[10px] font-bold text-navy-dark tnums">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
