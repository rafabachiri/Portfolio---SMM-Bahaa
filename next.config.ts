import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static-export ready: builds to /out, deployable to Vercel, Netlify, or any static host.
  output: "export",
  images: {
    // Required for static export — Next's image optimization server isn't available.
    unoptimized: true,
  },
  // Cleaner static URLs (each route becomes /path/index.html).
  trailingSlash: true,
};

export default nextConfig;
