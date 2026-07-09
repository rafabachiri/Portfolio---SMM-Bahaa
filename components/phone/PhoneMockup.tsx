"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PHONE_ACCOUNTS } from "@/lib/constants";
import { PhoneFeed } from "./PhoneFeed";
import { PhoneStoryOverlay } from "./PhoneStoryOverlay";

export function PhoneMockup({ className = "" }: { className?: string }) {
  const [accountIdx, setAccountIdx] = useState(0);
  const [story, setStory] = useState<string[] | null>(null);
  const account = PHONE_ACCOUNTS[accountIdx];

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Client tab switcher — each maps to a case study below */}
      <div className="flex gap-1 rounded-full border border-hairline bg-surface/70 p-1 backdrop-blur">
        {PHONE_ACCOUNTS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => {
              setAccountIdx(i);
              setStory(null);
            }}
            className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              i === accountIdx ? "text-navy-dark" : "text-muted hover:text-ink"
            }`}
            aria-pressed={i === accountIdx}
          >
            {i === accountIdx && (
              <motion.span
                layoutId="phone-tab"
                className="absolute inset-0 rounded-full bg-amber"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{a.label}</span>
          </button>
        ))}
      </div>

      {/* Phone frame (pure CSS, no image dependency) */}
      <div className="relative h-[560px] w-[280px] rounded-[2.75rem] border-[10px] border-[#0b1f38] bg-navy-dark shadow-[0_30px_60px_-20px_rgba(0,8,20,0.9)]">
        {/* side buttons */}
        <div className="absolute -left-[13px] top-24 h-10 w-[3px] rounded-l bg-[#0b1f38]" />
        <div className="absolute -left-[13px] top-40 h-16 w-[3px] rounded-l bg-[#0b1f38]" />
        <div className="absolute -right-[13px] top-32 h-20 w-[3px] rounded-r bg-[#0b1f38]" />

        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2 z-40 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="h-full w-full pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={account.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <PhoneFeed account={account} onOpenStory={(slides) => setStory(slides)} />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {story && (
              <PhoneStoryOverlay
                accent={account.accent}
                handle={account.handle}
                slides={story}
                onClose={() => setStory(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
