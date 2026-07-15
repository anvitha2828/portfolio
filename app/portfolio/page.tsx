/** @format */

import { redirect } from "next/navigation";

// The Portfolio index page merged into the home page ("/") — bio, work
// history, and the case study stack all live there now, under #about and
// #work. Individual case studies still live at /portfolio/[slug]. This
// keeps old bookmarks/links to bare /portfolio working.
export default function PortfolioIndexRedirect() {
  redirect("/#work");
}
