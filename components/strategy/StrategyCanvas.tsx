"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hand, MousePointer2 } from "lucide-react";
import { useRef } from "react";
import { STRATEGY_NOTES, type StickyNote } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";

const NOTE_STYLES: Record<StickyNote["color"], string> = {
  amber: "bg-amber/90 text-navy-dark",
  teal: "bg-teal/90 text-navy-dark",
  green: "bg-success/90 text-navy-dark",
  pink: "bg-[#E36FA8]/90 text-navy-dark",
  blue: "bg-[#7CA9FF]/90 text-navy-dark",
};

function Note({ note, bounds }: { note: StickyNote; bounds: React.RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      drag={!reduce}
      dragConstraints={bounds}
      dragElastic={0.15}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, rotate: 0, zIndex: 30, cursor: "grabbing" }}
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, scale: 0.8, rotate: note.rot }}
      whileInView={{ opacity: 1, scale: 1, rotate: note.rot }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ left: `${note.x}%`, top: `${note.y}%` }}
      className={`absolute w-40 cursor-grab touch-none select-none rounded-lg p-3 shadow-[0_10px_24px_-8px_rgba(0,8,20,0.7)] sm:w-44 ${NOTE_STYLES[note.color]}`}
    >
      {/* tape */}
      <span className="absolute -top-2 left-1/2 h-3 w-10 -translate-x-1/2 rounded-sm bg-white/25" />
      <div className="text-[11px] font-bold uppercase tracking-wide opacity-70">{note.label}</div>
      <div className="mt-1 text-sm font-semibold leading-snug">{note.note}</div>
    </motion.div>
  );
}

export function StrategyCanvas() {
  const bounds = useRef<HTMLDivElement>(null);

  return (
    <Section id="strategy-canvas">
      <SectionHeading
        eyebrow="How I Think"
        title={<>The <span className="text-gradient-amber">strategy canvas</span></>}
        subtitle="Every account starts here — on the whiteboard. Drag the notes around; this is the raw thinking before a single post goes live."
      />

      <div className="overflow-hidden rounded-3xl border border-hairline bg-navy-dark/60">
        {/* Figma-style toolbar */}
        <div className="flex items-center gap-3 border-b border-hairline bg-surface/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-xs font-medium text-muted">strategy-board.fig</span>
          <div className="ml-auto flex items-center gap-3 text-muted">
            <MousePointer2 className="h-4 w-4" />
            <Hand className="h-4 w-4 text-amber" />
          </div>
        </div>

        {/* Dot-grid canvas */}
        <div
          ref={bounds}
          className="relative h-[460px] w-full sm:h-[520px]"
          style={{
            backgroundImage: "radial-gradient(rgba(159,179,200,0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-hairline bg-navy-dark/80 px-3 py-1 text-xs text-muted backdrop-blur">
            ✋ Drag the notes around
          </span>
          {STRATEGY_NOTES.map((n) => (
            <Note key={n.id} note={n} bounds={bounds} />
          ))}
        </div>
      </div>
    </Section>
  );
}
