"use client";

import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { ServiceCard } from "./ServiceCard";

export function ServicesGrid() {
  // Only one card expanded at a time (defaults to the first).
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={<>Content built for every <span className="text-gradient-amber">format</span></>}
        subtitle="Hover or tap a card to see how each content type drives results. From strategy to execution, everything is handled end-to-end."
      />

      <LayoutGroup>
        <div className="grid auto-rows-min grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              expanded={openId === s.id}
              onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
            />
          ))}
        </div>
      </LayoutGroup>
    </Section>
  );
}
