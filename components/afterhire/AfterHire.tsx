"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AFTER_HIRE_STEPS } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";

export function AfterHire() {
  const ref = useRef<HTMLDivElement>(null);
  // Draw the center line as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="after-hire" alt>
      <SectionHeading
        eyebrow="The First 30 Days"
        title={<>What happens after you <span className="text-gradient-amber">hire me</span></>}
        subtitle="No guesswork, no ghosting. Here's exactly how the first month plays out."
        center
      />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* Center timeline track (desktop) / left track (mobile) */}
        <div className="absolute bottom-0 left-5 top-0 w-[2px] bg-hairline md:left-1/2 md:-translate-x-1/2">
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-teal via-amber to-success"
            style={{ scaleY: lineScale }}
          />
        </div>

        <ol className="space-y-8 md:space-y-2">
          {AFTER_HIRE_STEPS.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={step.title}
                className={`relative flex md:items-center ${left ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Node */}
                <div className="absolute left-5 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-surface text-lg shadow-[var(--shadow-panel)]"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <div className="w-full pl-14 md:w-1/2 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: left ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-2xl border border-hairline bg-surface/60 p-5 ${
                      left ? "md:mr-10 md:text-right" : "md:ml-10"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-bold text-amber">
                      {step.when}
                    </span>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.desc}</p>
                  </motion.div>
                </div>

                {/* spacer for the other side on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
