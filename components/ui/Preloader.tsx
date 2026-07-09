"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const LOADING_LINES = [
  "Syncing analytics…",
  "Loading campaigns…",
  "Warming up the dashboard…",
];

/**
 * Domain-themed intro loader — a mini "social dashboard boot-up": a monogram,
 * a counting progress %, and a fill bar. Fades out after a beat (or instantly
 * under reduced motion) and unmounts so it never blocks interaction.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const DURATION = 1700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      setLine(t < 0.4 ? 0 : t < 0.75 ? 1 : 2);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-navy"
        >
          <div className="pointer-events-none absolute inset-0 grid-texture opacity-50" aria-hidden />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center gap-5"
          >
            {/* Logo with pulsing ring */}
            <div className="relative grid h-20 w-20 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-full border border-[#27A5FF]/40"
                animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Logo size={72} />
            </div>

            <div className="text-center">
              <div className="font-heading text-sm font-semibold tracking-[0.2em] text-ink">
                BAHAA NEDJMA
              </div>
              <div className="mt-1 h-4 text-xs text-muted">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    {LOADING_LINES[line]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar + % */}
            <div className="flex w-56 items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-hairline">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-teal to-amber"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="tnums w-9 text-right text-xs font-semibold text-amber">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
