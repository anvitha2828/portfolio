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
  // Which pathname prefix lights this item up as "active" — only needed
  // when it differs from `href` (e.g. a same-page anchor like "/#work"
  // whose href never matches a real pathname, but should still show
  // active while on a /portfolio/[slug] case study detail page).
  activePrefix?: string;
};

// Order here == order in the nav chip. Home, Portfolio, and About Me all
// live on the single landing page ("/") now — Portfolio/About Me just
// scroll-jump to a section via a hash anchor instead of navigating to a
// separate route. Resume isn't in this list — it's its own icon button in
// NavChip, next to the copy-email icon.
export const navItems: NavItem[] = [
  { label: "About Me", href: "/#about" },
  { label: "Portfolio", href: "/#work", activePrefix: "/portfolio" },
];
