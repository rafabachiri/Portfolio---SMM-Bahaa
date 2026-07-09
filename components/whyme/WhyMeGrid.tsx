"use client";

import { motion } from "framer-motion";
import { WHY_ME } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { RevealGroup } from "../ui/Reveal";

export function WhyMeGrid() {
  return (
    <Section id="why-me">
      <SectionHeading
        eyebrow="Why Me"
        title="What makes the difference"
        subtitle="Not just another content creator — a partner who thinks in strategy, systems, and long-term growth."
      />

      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_ME.map((item) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-hairline bg-surface/60 p-5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-dark text-xl" aria-hidden>
              {item.icon}
            </div>
            <h3 className="mt-4 font-heading text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
          </motion.div>
        ))}
      </RevealGroup>
    </Section>
  );
}
