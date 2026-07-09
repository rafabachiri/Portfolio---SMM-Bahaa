"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CLIENT_PROJECTS, type ClientProject } from "@/lib/constants";
import { Section, SectionHeading } from "../ui/Section";
import { useMediaQuery } from "../ui/useMediaQuery";

const ImageLightbox = dynamic(() => import("../ui/ImageLightbox"), { ssr: false });

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Logo({ p, size = 44 }: { p: ClientProject; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (p.logo && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={p.logo}
        alt={`${p.clientName} logo`}
        onError={() => setFailed(true)}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-xl border border-hairline bg-white object-contain p-1"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber/80 to-teal/80 font-heading text-sm font-bold text-navy-dark"
      aria-hidden
    >
      {initials(p.clientName)}
    </div>
  );
}

/** The shared expanded content, used inline (desktop) and in the sheet (mobile). */
function ProjectDetail({
  p,
  onClose,
  onOpenImage,
}: {
  p: ClientProject;
  onClose: () => void;
  onOpenImage: (i: number) => void;
}) {
  const hasStats = (p.stats?.length ?? 0) > 0;
  return (
    <div className="p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Logo p={p} size={48} />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg font-bold text-ink">{p.clientName}</h3>
          <p className="text-sm text-teal">{p.role}</p>
          <p className="text-xs text-muted">{p.industry}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close project"
          className="shrink-0 rounded-full border border-hairline bg-surface/70 p-2 text-ink transition-colors hover:border-amber/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>

      {/* Stats (only if present) */}
      {hasStats && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {p.stats!.map((s) => (
            <div key={s.label} className="rounded-xl border border-hairline bg-navy-dark/50 p-3 text-center">
              <div className="tnums text-xl font-bold text-amber sm:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Screenshots */}
      {p.screenshots.length > 0 && (
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Screenshots &amp; results
            </span>
            <span className="text-[11px] text-muted">{p.screenshots.length} · tap to enlarge</span>
          </div>
          {/* Compact thumbnail grid — scales cleanly from 1 to many screenshots.
              Tall phone shots are cropped to their top (where the key numbers are);
              the lightbox shows the full image. */}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {p.screenshots.map((shot, i) => (
              <button
                key={shot.src}
                onClick={() => onOpenImage(i)}
                className="group/shot overflow-hidden rounded-lg border border-hairline bg-navy-dark"
                aria-label={`Open screenshot: ${shot.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-300 group-hover/shot:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contributions as pills */}
      <div className="mt-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Contributions</div>
        <div className="flex flex-wrap gap-2">
          {p.contributions.map((c) => (
            <span
              key={c}
              className="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollapsedCard({ p, onOpen }: { p: ClientProject; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col rounded-2xl border border-hairline bg-surface/60 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber/50"
      aria-expanded={false}
    >
      <div className="flex items-center gap-3">
        <Logo p={p} />
        <div className="min-w-0">
          <h3 className="font-heading text-base font-bold text-ink">{p.clientName}</h3>
          <p className="truncate text-xs text-muted">
            <span className="text-teal">{p.role}</span> · {p.industry}
          </p>
        </div>
      </div>
      <p className="mt-3 line-clamp-1 text-sm text-muted">{p.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-medium text-muted">
          {p.screenshots.length > 0 && `${p.screenshots.length} screenshot${p.screenshots.length > 1 ? "s" : ""} · `}
          {p.contributions.length} contributions
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-dark text-amber transition-transform group-hover:translate-x-0.5">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

export function ClientProjectsGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ pid: string; index: number } | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Gently scroll a newly-expanded desktop card into view.
  useEffect(() => {
    if (openId && isDesktop) {
      cardRefs.current[openId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [openId, isDesktop]);

  // Lock scroll when the mobile sheet is open.
  useEffect(() => {
    const sheetOpen = openId && !isDesktop;
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId, isDesktop]);

  const openProject = openId ? CLIENT_PROJECTS.find((p) => p.id === openId) ?? null : null;
  const lightboxProject = lightbox ? CLIENT_PROJECTS.find((p) => p.id === lightbox.pid) ?? null : null;

  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Work"
        title={<>Work <span className="text-gradient-amber">Experience</span></>}
        subtitle="From e-learning to private schools and agency brands — a look at the accounts I've built and grown. Tap a card to dive in."
      />

      <LayoutGroup>
        <div className="grid items-start gap-5 md:grid-cols-2">
          {CLIENT_PROJECTS.map((p) => {
            const openInline = openId === p.id && isDesktop;
            return (
              <motion.div
                layout
                key={p.id}
                ref={(el) => {
                  cardRefs.current[p.id] = el;
                }}
                transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                className={openInline ? "md:col-span-2" : ""}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {openInline ? (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden rounded-2xl border border-amber/40 bg-surface-2"
                    >
                      <ProjectDetail
                        p={p}
                        onClose={() => setOpenId(null)}
                        onOpenImage={(i) => setLightbox({ pid: p.id, index: i })}
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                      <CollapsedCard p={p} onOpen={() => setOpenId(p.id)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Mobile: full-screen sheet instead of cramped inline expansion */}
      <AnimatePresence>
        {openProject && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex flex-col bg-navy-dark/80 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="mt-auto max-h-[92vh] overflow-y-auto rounded-t-3xl border-t border-hairline bg-navy"
            >
              <div className="sticky top-0 z-10 flex justify-center bg-navy/95 py-2 backdrop-blur">
                <span className="h-1 w-10 rounded-full bg-hairline" />
              </div>
              <ProjectDetail
                p={openProject}
                onClose={() => setOpenId(null)}
                onOpenImage={(i) => setLightbox({ pid: openProject.id, index: i })}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {lightboxProject && (
        <ImageLightbox
          images={lightboxProject.screenshots}
          index={lightbox?.index ?? null}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox((cur) => (cur ? { ...cur, index: i } : cur))}
        />
      )}
    </Section>
  );
}
