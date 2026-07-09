"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { GROWTH_MILESTONES } from "@/lib/constants";

/**
 * Replaces a plain scroll-progress bar with a "follower growth" indicator.
 * The bar fills as you scroll; crossing a milestone fires a one-time
 * celebratory toast (state flags prevent re-firing on scroll up/down).
 */
export function ScrollGrowthBar() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [current, setCurrent] = useState<string>(GROWTH_MILESTONES[0].label);
  const [celebrate, setCelebrate] = useState<string | null>(null);
  const [reached, setReached] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      // Find the highest milestone whose threshold we've passed.
      let activeIdx = 0;
      for (let i = 0; i < GROWTH_MILESTONES.length; i++) {
        if (p >= GROWTH_MILESTONES[i].at) activeIdx = i;
      }
      const m = GROWTH_MILESTONES[activeIdx];
      setCurrent(m.label);

      if (activeIdx > 0 && !reached.has(activeIdx)) {
        setReached((prev) => new Set(prev).add(activeIdx));
        if (!reduce) {
          setCelebrate(`🎉 ${m.label} Followers reached!`);
          setTimeout(() => setCelebrate(null), 2600);
        }
      }
    });
  }, [scrollYProgress, reached, reduce]);

  return (
    <>
      {/* Thin top progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-teal via-amber to-success"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Follower counter widget (desktop) */}
      <div className="fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-hairline bg-navy-dark/80 px-3 py-1.5 text-xs backdrop-blur sm:flex">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="tnums font-semibold text-ink">{current}</span>
        <span className="text-muted">followers</span>
      </div>

      {/* Milestone celebration toast */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-16 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-amber/40 bg-surface-2/95 px-4 py-2 text-sm font-semibold text-amber shadow-[var(--shadow-glow-amber)] backdrop-blur"
          >
            {celebrate}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
