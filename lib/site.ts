/** @format */

// Single source of truth for site-wide config.
// Update these values and every page/nav reflects the change.

export const site = {
  name: "Anvitha Nachiappan",
  tagline: "making products feel simple, even when they're not",
  email: "anvitha2828@gmail.com",
  resumeHref: "/Anvitha%20Nachiappan%20Resume%2026.pdf", // public/Anvitha Nachiappan Resume 26.pdf
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean; // opens in a new tab (used for the resume PDF)
};

// Order here == order in the nav chip.
export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Map", href: "/map" },
  { label: "Resume", href: site.resumeHref, external: true },
];
