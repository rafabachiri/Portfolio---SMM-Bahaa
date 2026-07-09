"use client";

import { motion } from "framer-motion";
import { X, Heart, Send } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  accent: string;
  handle: string;
  slides: string[]; // gradient CSS strings
  onClose: () => void;
};

/** Full-screen (within-phone) stories view with an auto-advancing progress bar. */
export function PhoneStoryOverlay({ accent, handle, slides, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const DURATION = 3200; // ms per slide

  useEffect(() => {
    const t = setTimeout(() => {
      if (index < slides.length - 1) setIndex((i) => i + 1);
      else onClose();
    }, DURATION);
    return () => clearTimeout(t);
  }, [index, slides.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-30 flex flex-col bg-black"
    >
      {/* Full-bleed design image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slides[index]}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />

      {/* Progress bars */}
      <div className="relative z-10 flex gap-1 px-3 pt-3">
        {slides.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
            <motion.div
              className="h-full bg-white"
              initial={{ width: i < index ? "100%" : "0%" }}
              animate={{ width: i < index ? "100%" : i === index ? "100%" : "0%" }}
              transition={{ duration: i === index ? DURATION / 1000 : 0, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-2 px-3 py-3">
        <div
          className="h-7 w-7 rounded-full border-2 border-white/80"
          style={{ background: accent }}
        />
        <span className="text-xs font-semibold text-white">{handle}</span>
        <span className="text-[10px] text-white/70">now</span>
        <button
          onClick={onClose}
          aria-label="Close story"
          className="ml-auto rounded-full p-1 text-white/90 hover:bg-white/15"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Tap zones to navigate */}
      <button
        aria-label="Previous"
        className="absolute inset-y-0 left-0 z-10 w-1/3"
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
      />
      <button
        aria-label="Next"
        className="absolute inset-y-0 right-0 z-10 w-1/3"
        onClick={() => (index < slides.length - 1 ? setIndex((i) => i + 1) : onClose())}
      />

      {/* Footer reply bar */}
      <div className="relative z-10 mt-auto flex items-center gap-2 p-3">
        <div className="flex-1 rounded-full border border-white/40 px-3 py-1.5 text-[11px] text-white/70">
          Send message…
        </div>
        <Heart className="h-5 w-5 text-white" />
        <Send className="h-5 w-5 text-white" />
      </div>
    </motion.div>
  );
}
