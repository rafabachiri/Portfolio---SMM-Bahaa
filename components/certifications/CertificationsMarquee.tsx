"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CERTIFICATIONS, type Certification } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";

const CertificationLightbox = dynamic(() => import("./CertificationLightbox"), { ssr: false });

type CardState = "idle" | "focused" | "dimmed";

function CertCard({
  cert,
  onOpen,
  inMarquee,
  state = "idle",
  onEnter,
  onLeave,
}: {
  cert: Certification;
  onOpen: () => void;
  inMarquee?: boolean;
  state?: CardState;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const focused = state === "focused";
  const dimmed = state === "dimmed";
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onBlur={onLeave}
      aria-label={`View ${cert.title} certificate`}
      style={{
        // JS-driven so the effect is reliable regardless of CSS hover quirks.
        transform: focused ? "scale(1.14)" : "scale(1)",
        opacity: dimmed ? 0.4 : 1,
        filter: dimmed ? "blur(4px)" : "blur(0px)",
        zIndex: focused ? 30 : 1,
      }}
      className={`relative shrink-0 overflow-hidden rounded-2xl border bg-surface/60 p-2 text-left outline-none transition-[transform,opacity,filter,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-amber ${
        inMarquee ? "w-[280px]" : "w-full"
      } ${focused ? "border-amber/70 shadow-[0_20px_50px_-12px_rgba(255,182,39,0.45)]" : "border-hairline"}`}
    >
      {/* Light mat behind the (usually white) certificate image */}
      <div className="overflow-hidden rounded-xl bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.imagePath}
          alt={`${cert.title} — ${cert.issuer}`}
          loading="lazy"
          decoding="async"
          className="aspect-[1.3/1] w-full object-contain"
        />
      </div>

      {/* Caption — calm idle state, fades in for the focused card */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark via-navy-dark/90 to-transparent p-3 pt-8 transition-opacity duration-300"
        style={{ opacity: inMarquee ? (focused ? 1 : 0) : 1 }}
      >
        <div className="text-sm font-semibold leading-snug text-ink line-clamp-2">{cert.title}</div>
        <div className="text-xs text-muted">{cert.issuer}</div>
      </div>
    </button>
  );
}

export function CertificationsMarquee() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null); // loop index being hovered

  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...CERTIFICATIONS, ...CERTIFICATIONS];
  const duration = `${CERTIFICATIONS.length * 7}s`; // ~7s per certificate
  const paused = hovered !== null;

  return (
    <Section id="certifications" alt>
      <SectionHeading
        eyebrow="Certifications"
        title="Certified, and always learning"
        subtitle="Ongoing training from Meta, Google, and leading universities. Hover to pause, click any certificate to view it full-screen."
      />

      {reduce ? (
        // Reduced-motion: static wrapped grid, no auto-scroll.
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} onOpen={() => setActive(i)} />
          ))}
        </div>
      ) : (
        // py gives the enlarged (hovered) card vertical room so overflow-hidden
        // doesn't clip it; -my cancels the extra outer spacing.
        <div
          className="marquee-mask relative -my-6 overflow-hidden py-6"
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className="flex w-max items-center gap-5 animate-marquee"
            // JS pause is bulletproof; the CSS animation just drives the scroll.
            style={{ animationDuration: duration, animationPlayState: paused ? "paused" : "running" }}
          >
            {loop.map((cert, i) => (
              <CertCard
                key={`${cert.id}-${i}`}
                cert={cert}
                inMarquee
                state={hovered === null ? "idle" : hovered === i ? "focused" : "dimmed"}
                onEnter={() => setHovered(i)}
                onLeave={() => setHovered((cur) => (cur === i ? null : cur))}
                onOpen={() => setActive(i % CERTIFICATIONS.length)}
              />
            ))}
          </div>
        </div>
      )}

      <CertificationLightbox
        items={CERTIFICATIONS}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </Section>
  );
}
