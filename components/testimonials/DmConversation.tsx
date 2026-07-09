"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/constants";

function TypingDots() {
  return (
    <div className="flex w-14 items-center gap-1 rounded-2xl rounded-bl-md bg-surface-2 px-3 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export function DmConversation({ t }: { t: Testimonial }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [shown, setShown] = useState(0); // number of bubbles revealed
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setShown(t.bubbles.length);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const revealNext = (i: number) => {
      if (cancelled || i >= t.bubbles.length) {
        setTyping(false);
        return;
      }
      setTyping(true);
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setShown(i + 1);
          timers.push(setTimeout(() => revealNext(i + 1), 450));
        }, 850 + Math.min(t.bubbles[i].length * 12, 900))
      );
    };

    timers.push(setTimeout(() => revealNext(0), 400));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, t.bubbles]);

  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface/50">
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-hairline bg-navy-dark/50 px-4 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber/80 to-teal/80 text-xs font-bold text-navy-dark">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">{t.name}</div>
          {t.title && <div className="text-[11px] text-muted">{t.title}</div>}
        </div>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Active
        </span>
      </div>

      {/* Messages */}
      <div className="flex min-h-[190px] flex-1 flex-col gap-2 p-4">
        {t.bubbles.slice(0, shown).map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative max-w-[85%] self-start"
          >
            <div className="rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-ink">
              {b}
            </div>
            {/* Emoji reaction on hover */}
            {t.reaction && (
              <span className="absolute -bottom-2 right-1 rounded-full border border-hairline bg-navy-dark px-1.5 py-0.5 text-[11px] opacity-0 transition-opacity group-hover:opacity-100">
                {t.reaction}
              </span>
            )}
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="self-start"
            >
              <TypingDots />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timestamp + seen once fully played */}
        {shown === t.bubbles.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 flex items-center gap-1 self-end text-[10px] text-muted"
          >
            {t.time}
            <CheckCheck className="h-3 w-3 text-teal" />
            Seen
          </motion.div>
        )}
      </div>
    </div>
  );
}
