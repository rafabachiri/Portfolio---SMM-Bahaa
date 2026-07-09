"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { Certification } from "@/lib/constants";

type Props = {
  items: Certification[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Full-screen certificate viewer (image), with keyboard + arrow navigation. */
export default function CertificationLightbox({ items, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const cert = open ? items[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate]
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
      {open && cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0, 20, 43, 0.85)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} certificate`}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Previous certificate"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Next certificate"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-4xl flex-col items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cert.imagePath}
              alt={`${cert.title} — certificate`}
              className="max-h-[70vh] w-auto rounded-lg border border-hairline bg-white object-contain shadow-[0_20px_60px_-20px_rgba(0,8,20,0.9)]"
            />
            <div className="text-center">
              <h3 className="font-heading text-base font-semibold text-ink">{cert.title}</h3>
              <p className="text-sm text-muted">{cert.issuer}</p>
              <a
                href={cert.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-teal hover:text-amber"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open original PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
