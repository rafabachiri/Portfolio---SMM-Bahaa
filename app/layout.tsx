import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Body — Inter: clean, highly legible.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headings — Plus Jakarta Sans: a more professional, premium geometric sans.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

// PLACEHOLDER: update title / description / URL for real SEO + social preview.
export const metadata: Metadata = {
  title: "Bahaa Nedjma — Social Media Manager & Content Strategist",
  description:
    "Bahaa Nedjma turns social channels into growth engines — data-driven strategy, high-retention content, and community management for brands that want the digital edge.",
  keywords: [
    "Social Media Manager",
    "Content Strategist",
    "Instagram",
    "Reels",
    "Algeria",
    "Bahaa Nedjma",
  ],
  openGraph: {
    title: "Bahaa Nedjma — Social Media Manager & Content Strategist",
    description:
      "Data-driven social media strategy, high-retention content, and community management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy text-ink">{children}</body>
    </html>
  );
}
