"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { NOTIFICATIONS } from "@/lib/constants";

// Spawn zones chosen to avoid the navbar (top center), the scroll-growth
// widget (bottom-left) and the hero phone (top-right of the hero). Container is
// pointer-events-none so toasts never block clickable content. Toasts are also
// gated to appear only after the hero has scrolled away (see below), so they
// never cover the phone mockup.
const ZONES = [
  { key: "br", className: "bottom-6 right-5", x: 40 },
  { key: "tr", className: "top-28 right-5", x: 40 },
  { key: "ml", className: "top-1/2 right-5 -translate-y-1/2", x: 40 },
] as const;

type Toast = { id: number; msg: string; zone: (typeof ZONES)[number] };

export function NotificationSystem() {
  const reduce = useReducedMotion();
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    // Respect reduced motion: disable the whole system.
    if (reduce) return;

    let msgIdx = Math.floor(Math.random() * NOTIFICATIONS.length);
    let zoneIdx = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    let loopTimer: ReturnType<typeof setTimeout>;
    let counter = 0;

    const show = () => {
      // Only surface toasts once the hero (with its phone mockup) has scrolled
      // out of the way — the spec forbids toasts covering the phone.
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      if (pastHero) {
        const t: Toast = {
          id: counter++,
          msg: NOTIFICATIONS[msgIdx % NOTIFICATIONS.length],
          zone: ZONES[zoneIdx % ZONES.length],
        };
        msgIdx++;
        zoneIdx++;
        setToast(t);
        hideTimer = setTimeout(() => setToast(null), 2500); // hold ~2.5s
      }
      // next appearance in 3.5–6s (re-check scroll position then)
      loopTimer = setTimeout(show, 2500 + 1000 + Math.random() * 2500);
    };

    // First toast after a short delay
    loopTimer = setTimeout(show, 2200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(loopTimer);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: toast.zone.x, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: toast.zone.x, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute flex max-w-[240px] items-center gap-2 rounded-xl border border-hairline bg-surface-2/95 px-3.5 py-2.5 text-sm font-medium text-ink shadow-[0_10px_30px_-10px_rgba(0,8,20,0.85)] backdrop-blur ${toast.zone.className}`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
