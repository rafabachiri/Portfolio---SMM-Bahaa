"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { CONTACT, HERO_STATS, PROFILE } from "@/lib/constants";
import { DashboardCard } from "./DashboardCard";
import { PhoneMockup } from "../phone/PhoneMockup";

const HERO_TOASTS = ["🔔 New follower", "📈 Reach +38%", "❤️ 528 likes"];

/** Small seeded toast that always shows near the hero dashboard. */
function HeroToast() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % HERO_TOASTS.length), 4200);
    return () => clearInterval(t);
  }, [reduce]);

  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute -top-4 left-4 z-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-hairline bg-surface-2/95 px-3 py-2 text-xs font-medium text-ink shadow-[0_8px_24px_-8px_rgba(0,8,20,0.8)] backdrop-blur"
        >
          {HERO_TOASTS[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-texture opacity-60" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1.2fr]">
        {/* Left — copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-xs font-medium text-teal"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {PROFILE.role}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-bold leading-[1.05] text-ink sm:text-5xl md:text-6xl"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink/90 sm:text-xl"
          >
            {PROFILE.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base"
          >
            {PROFILE.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-semibold text-navy-dark shadow-[var(--shadow-glow-amber)] transition-transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Call
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface/40 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-teal/60 hover:text-teal"
            >
              View My Work
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Right — dashboard + phone */}
        <div ref={ref} className="relative">
          <HeroToast />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {HERO_STATS.map((stat, i) => (
              <DashboardCard key={stat.id} stat={stat} index={i} active={inView} />
            ))}
          </div>

          {/*
            Phone: on xl+ it floats and overlaps only the bottom-right corner
            (mostly hanging into the section's side padding for depth, so the
            stat cards stay readable). Below xl it drops into normal flow, centered.
          */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={inView ? { opacity: 1, y: 0, rotate: -4 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex justify-center xl:absolute xl:-bottom-10 xl:-right-24 xl:mt-0 xl:block"
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="scale-90 sm:scale-100 xl:scale-[0.72]">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
