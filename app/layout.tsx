/** @format */

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { NavChip } from "@/components/NavChip";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { CustomCursor } from "@/components/CustomCursor";
import { site } from "@/lib/site";

// Bold display font for the name and page/section titles, a warm sans
// for body text, and an elegant serif reserved for the hero tagline.
// next/font self-hosts these at build time (no runtime external requests).
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
        <CustomCursor />
        <ScrollProgressBar />
        <NavChip />
        <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
