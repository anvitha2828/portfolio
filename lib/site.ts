/** @format */

// Single source of truth for site-wide config.
// Update these values and every page/nav reflects the change.

export const site = {
  name: "Anvitha Nachiappan",
  tagline: "making products feel simple, even when they're not",
  email: "anvitha2828@gmail.com",
  resumeHref: "/Anvitha%20Nachiappan%202026%20July.pdf", // public/Anvitha Nachiappan 2026 July.pdf
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean; // opens in a new tab (used for the resume PDF)
};

// Order here == order in the nav chip.
export const navItems: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resume", href: site.resumeHref, external: true },
];
