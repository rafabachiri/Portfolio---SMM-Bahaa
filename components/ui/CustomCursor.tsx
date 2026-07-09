"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom cursor: a precise amber dot + a soft trailing ring that grows when
 * hovering interactive elements. Only enabled on fine-pointer (mouse) devices
 * and when the user hasn't asked to reduce motion — touch devices keep the
 * native behavior.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a, button, [role='button'], input, textarea, label, select"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-amber"
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: down ? 0.8 : hovering ? 1.7 : 1,
          backgroundColor: hovering ? "rgba(255,182,39,0.12)" : "rgba(255,182,39,0)",
          borderColor: hovering ? "rgba(255,182,39,0.9)" : "rgba(255,182,39,0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-amber"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
