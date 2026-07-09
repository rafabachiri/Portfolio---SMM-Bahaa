"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { DmConversation } from "./DmConversation";

export function DmTestimonials() {
  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title={<>Straight from the <span className="text-gradient-amber">DMs</span></>}
        subtitle="What clients and collaborators say — scroll in and watch the conversation play out."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.08}>
            <DmConversation t={t} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
