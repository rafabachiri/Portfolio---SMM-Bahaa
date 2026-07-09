import {
  siInstagram,
  siFacebook,
  siTiktok,
  siThreads,
  siPinterest,
  siMeta,
  siFigma,
  siGooglegemini,
  siNotion,
  siTrello,
  siGooglesheets,
  siGoogledrive,
  siZoom,
} from "simple-icons";

type SI = { path: string; hex: string; title: string };

// Custom single-path logos for brands simple-icons dropped (trademark removals).
const LINKEDIN: SI = {
  title: "LinkedIn",
  hex: "0A66C2",
  path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
};
const CANVA: SI = {
  title: "Canva",
  hex: "00C4CC",
  // approximation: circle mark
  path: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm1.36 16.9c-2.53 0-4.2-1.86-4.2-4.5 0-2.9 1.9-5.06 4.16-5.06 1.3 0 2.1.66 2.1 1.53 0 .6-.36 1.05-.9 1.05-.72 0-.7-.72-1.32-.72-.92 0-1.72 1.2-1.72 3.02 0 1.66.78 2.7 1.9 2.7.9 0 1.4-.6 1.76-1.16.2-.3.4-.5.72-.5.42 0 .74.34.74.8 0 1.02-1.36 2.5-3.2 2.5Z",
};
const CHATGPT: SI = {
  title: "ChatGPT",
  hex: "10A37F",
  path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-.5 4.2 4.3 2.48c.3.17.5.5.5.86v3.7c0 .18-.1.35-.25.44l-3.8 2.2a.5.5 0 0 1-.5 0l-4.3-2.48a1 1 0 0 1-.5-.86v-3.7c0-.18.1-.35.25-.44l3.8-2.2a.5.5 0 0 1 .5 0Zm-.5 2-3 1.73v3.14l3 1.73 3-1.73V9.93l-3-1.73Z",
};
const CAPCUT: SI = {
  title: "CapCut",
  hex: "000000",
  path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.5a5.5 5.5 0 0 1 4.76 2.76l-2.6 1.5A2.5 2.5 0 0 0 12 9.5a2.5 2.5 0 1 0 2.16 3.74l2.6 1.5A5.5 5.5 0 1 1 12 6.5Z",
};

const REGISTRY: Record<string, SI> = {
  Instagram: siInstagram,
  Facebook: siFacebook,
  TikTok: siTiktok,
  Threads: siThreads,
  Pinterest: siPinterest,
  LinkedIn: LINKEDIN,
  "Meta Business Suite": siMeta,
  Canva: CANVA,
  Figma: siFigma,
  CapCut: CAPCUT,
  ChatGPT: CHATGPT,
  "Google Gemini": siGooglegemini,
  Notion: siNotion,
  Trello: siTrello,
  "Google Workspace": siGoogledrive,
  "Google Sheets": siGooglesheets,
  Zoom: siZoom,
};

// If a brand's mark is near-black it's invisible on navy — render it in ink instead.
function displayColor(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 40 ? "#F5F7FA" : `#${hex}`;
}

/**
 * Real brand logo (monochrome single-path). Falls back to an initials badge for
 * brands with no available mark (e.g. "VN Editor"). // PLACEHOLDER: swap the
 * fallback for a real logo asset if you have one.
 */
export function BrandLogo({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const icon = REGISTRY[name];
  if (!icon) {
    const initials = name
      .replace(/[^A-Za-z ]/g, "")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <span
        className={`grid place-items-center rounded-[5px] bg-amber/20 text-[9px] font-bold text-amber ${className}`}
        aria-label={name}
      >
        {initials}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={name}
      fill={displayColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}
