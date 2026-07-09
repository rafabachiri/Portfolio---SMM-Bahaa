"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** px size */
  size?: number;
  /** "circle" (default) or "rounded" square — swap the frame in one prop. */
  shape?: "circle" | "rounded";
  ring?: boolean;
  className?: string;
};

/**
 * Reusable avatar. Falls back to initials on a navy gradient if the image
 * is missing (the real photo is a placeholder at /public/avatar/bahaa.jpg).
 */
export function Avatar({ src, alt, size = 96, shape = "circle", ring = true, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const radius = shape === "circle" ? "9999px" : "18px";
  const initials = alt
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${ring ? "ring-2 ring-amber ring-offset-2 ring-offset-navy" : ""} ${className}`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-navy-dark font-heading font-bold text-amber"
          style={{ fontSize: size * 0.34 }}
          aria-label={alt}
        >
          {initials}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
