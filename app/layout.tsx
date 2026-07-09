import type { Metadata } from "next";
import { Space_Grotesk, Nunito } from "next/font/google";
import "./globals.css";
import { NavChip } from "@/components/NavChip";
import { site } from "@/lib/site";

// Clean, bold geometric display font for headings + a warm sans for body.
// next/font self-hosts these at build time (no runtime external requests).
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <NavChip />
        <main className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
