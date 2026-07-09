/**
 * Pre-renders every certificate PDF in /public/certifications/ to a high-res PNG
 * in /public/certifications/generated/. The site marquee + lightbox use the PNGs
 * (PDFs stay the source of truth). Runs automatically via `prebuild`, or on demand
 * with `npm run generate:certs`.
 *
 * Slug = slugified PDF basename, so /public/certifications/generated/<slug>.png
 * matches the `imagePath` values in lib/constants.ts.
 */
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";
import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CERT_DIR = join(__dirname, "..", "public", "certifications");
const OUT_DIR = join(CERT_DIR, "generated");
const LONG_EDGE = 2200; // px on the long edge — crisp on large monitors

// Duplicate exports Bahaa uploaded — skip so they don't appear twice.
const SKIP = new Set([
  "Coursera Attract and Engage Customers with Digital Marketing (1).pdf",
  "Coursera MISJCI4B6W3B.pdf",
]);

export const slugify = (name) =>
  name
    .replace(/\.pdf$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function renderPdf(file) {
  const url = join(CERT_DIR, file);
  const doc = await getDocument({
    url,
    // In Node there's no FontFace API — force pdf.js to draw glyph *outlines*
    // directly onto the canvas, otherwise embedded-font text renders as boxes.
    disableFontFace: true,
    useSystemFonts: false,
    isEvalSupported: false,
    standardFontDataUrl: join(CERT_DIR, "..", "standard_fonts") + "/",
  }).promise;
  const page = await doc.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const scale = LONG_EDGE / Math.max(base.width, base.height);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const ctx = canvas.getContext("2d");
  // white backing so any transparent regions read as a real certificate
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport, background: "#ffffff" }).promise;
  await doc.destroy();
  return canvas.toBuffer("image/png");
}

async function main() {
  if (!existsSync(CERT_DIR)) {
    console.warn(`[certs] ${CERT_DIR} not found — skipping.`);
    return;
  }
  mkdirSync(OUT_DIR, { recursive: true });
  const pdfs = readdirSync(CERT_DIR).filter((f) => f.toLowerCase().endsWith(".pdf") && !SKIP.has(f));
  let ok = 0;
  for (const file of pdfs) {
    const out = join(OUT_DIR, `${slugify(file)}.png`);
    try {
      const buf = await renderPdf(file);
      writeFileSync(out, buf);
      ok++;
      console.log(`[certs] ✓ ${file} → generated/${slugify(file)}.png (${(buf.length / 1024) | 0}KB)`);
    } catch (e) {
      console.error(`[certs] ✗ ${file}: ${e.message}`);
    }
  }
  console.log(`[certs] done — ${ok}/${pdfs.length} rendered.`);
}

main();
