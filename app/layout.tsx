/** @format */

import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { NavChip } from "@/components/NavChip";
import { site } from "@/lib/site";

// Bold geometric font reserved for the hero name, a warm sans for body
// text, and an elegant serif for page/section titles.
// next/font self-hosts these at build time (no runtime external requests).
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const title = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${title.variable}`}
    >
      <body className="font-sans antialiased">
        <NavChip />
        <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
