"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Service } from "@/lib/constants";

export function ServiceCard({
  service,
  expanded,
  onToggle,
}: {
  service: Service;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={onToggle}
      onClick={onToggle}
      transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className={`group cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors ${
        expanded ? "border-amber/50 bg-surface-2" : "border-hairline bg-surface/60 hover:border-teal/40"
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <motion.div layout="position" className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl transition-colors ${
            expanded ? "bg-amber/15" : "bg-navy-dark"
          }`}
          aria-hidden
        >
          {service.icon}
        </span>
        <h3 className="font-heading text-base font-semibold text-ink">{service.title}</h3>
      </motion.div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
          >
            <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
            <ul className="mt-3 space-y-1.5">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-ink/90">
                  <Check className="h-3.5 w-3.5 shrink-0 text-teal" />
                  {b}
                </li>
              ))}
            </ul>
            {/* PLACEHOLDER: real work sample preview */}
            <div className="mt-4 flex h-20 items-center justify-center rounded-lg border border-dashed border-hairline bg-navy-dark/60 text-[11px] text-muted">
              PLACEHOLDER: real work sample
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
