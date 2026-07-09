"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Generic full-screen image viewer with keyboard + arrow navigation. */
export default function ImageLightbox({ images, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const img = open ? images[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (index === null || images.length < 2) return;
      onNavigate((index + dir + images.length) % images.length);
    },
    [index, images.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0, 20, 43, 0.88)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={img.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={img.src}
            alt={img.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto rounded-lg border border-hairline object-contain shadow-[0_20px_60px_-20px_rgba(0,8,20,0.9)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
