"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Options = {
  duration?: number; // ms
  decimals?: number;
  active?: boolean; // start the animation when true (e.g. in view)
};

/**
 * Counts from 0 up to `target`. Snaps straight to the value when the user
 * prefers reduced motion. Restart is gated by `active` so callers can trigger
 * it on mount or on scroll-into-view.
 */
export function useCountUp(target: number, { duration = 1400, decimals = 0, active = true }: Options = {}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduce) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo for a snappy, decelerating count
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(target);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration, reduce]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");

  return formatted;
}
