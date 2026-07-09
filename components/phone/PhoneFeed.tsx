"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bookmark, Heart, Lock, Menu, MessageCircle, Play, PlusSquare, Send } from "lucide-react";
import { useState } from "react";
import type { PHONE_ACCOUNTS } from "@/lib/constants";

type Account = (typeof PHONE_ACCOUNTS)[number];


/** Heart burst that pops on like / double-tap. */
function HeartBurst({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, times: [0, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <Heart className="h-16 w-16 fill-white text-white drop-shadow-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PhoneFeed({
  account,
  onOpenStory,
}: {
  account: Account;
  onOpenStory: (slides: string[]) => void;
}) {
  const reduce = useReducedMotion();
  const slides = account.images;
  const [carousel, setCarousel] = useState(0);
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);
  const [saved, setSaved] = useState(false);

  const doLike = () => {
    if (!liked) {
      setBurst(true);
      setTimeout(() => setBurst(false), 900);
    }
    setLiked((v) => !v);
  };

  const next = (dir: number) =>
    setCarousel((c) => Math.min(slides.length - 1, Math.max(0, c + dir)));

  return (
    <div className="flex h-full flex-col bg-navy-dark text-ink">
      {/* Instagram-style top bar with username + hamburger menu */}
      <div className="flex items-center gap-2 border-b border-white/5 px-3 pb-2 pt-1">
        <Lock className="h-3 w-3 text-muted" />
        <span className="text-sm font-bold">{account.handle.replace("@", "")}</span>
        <div className="ml-auto flex items-center gap-3">
          <PlusSquare className="h-[18px] w-[18px] text-ink" aria-hidden />
          <button aria-label="Open menu" className="text-ink">
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {/* Profile header */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        <button
          onClick={() => onOpenStory([...slides])}
          aria-label="Open story"
          className="rounded-full p-[2px]"
          style={{ background: `conic-gradient(from 90deg, ${account.accent}, #2ec4b6, ${account.accent})` }}
        >
          <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-navy-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slides[0]} alt="" className="h-full w-full object-cover object-top" />
          </div>
        </button>
        <div className="leading-tight">
          <div className="text-xs font-semibold">{account.handle}</div>
          <div className="text-[10px] text-muted">{account.niche}</div>
        </div>
        <div className="ml-auto flex gap-3 text-center text-[10px] text-muted">
          <div>
            <div className="text-xs font-bold text-ink tnums">248</div>posts
          </div>
          <div>
            <div className="text-xs font-bold text-ink tnums">86K</div>followers
          </div>
        </div>
      </div>

      {/* Swipeable carousel post */}
      <div className="relative mx-3 overflow-hidden rounded-xl border border-hairline">
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) next(1);
            else if (info.offset.x > 40) next(-1);
          }}
          animate={{ x: `-${carousel * 100}%` }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
        >
          {slides.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square w-full shrink-0 bg-navy-dark"
              onDoubleClick={doLike}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${account.niche} design post ${i + 1}`}
                draggable={false}
                className="h-full w-full select-none object-cover object-top"
              />
              <span className="absolute right-2 top-2 rounded-full bg-black/40 px-1.5 py-0.5 text-[9px] text-white tnums">
                {i + 1}/{slides.length}
              </span>
              {i === carousel && <HeartBurst show={burst} />}
            </div>
          ))}
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCarousel(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === carousel ? "w-3.5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-4 px-3 py-2">
        <button onClick={doLike} aria-label="Like" aria-pressed={liked}>
          <Heart
            className={`h-5 w-5 transition ${liked ? "scale-110 fill-[#ff3b5c] text-[#ff3b5c]" : "text-ink"}`}
          />
        </button>
        <MessageCircle className="h-5 w-5 text-ink" />
        <Send className="h-5 w-5 text-ink" />
        <button className="ml-auto" onClick={() => setSaved((v) => !v)} aria-label="Save" aria-pressed={saved}>
          <Bookmark className={`h-5 w-5 transition ${saved ? "fill-amber text-amber" : "text-ink"}`} />
        </button>
      </div>
      <div className="px-3 text-[11px]">
        <span className="font-semibold tnums">{(liked ? 1287 : 1286).toLocaleString()} likes</span>
        <p className="mt-0.5 text-muted">
          <span className="font-semibold text-ink">{account.handle}</span> New drop just landed 🔥 Full
          campaign in the highlights…
        </p>
      </div>

      {/* Scrollable Reels row */}
      <div className="mt-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted">Reels</div>
      <div className="flex gap-2 overflow-x-auto px-3 pb-3 pt-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => onOpenStory([...slides])}
            className="relative h-28 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border border-hairline bg-navy-dark"
            aria-label={`Play reel ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[i % slides.length]}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <motion.span
                animate={reduce ? {} : { scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <Play className="h-5 w-5 fill-white/90 text-white/90 drop-shadow" />
              </motion.span>
            </div>
            <span className="absolute bottom-1 left-1 text-[9px] text-white tnums drop-shadow">
              {(120 + i * 37).toString()}K
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
