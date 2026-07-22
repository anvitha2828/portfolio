"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/lib/site";
import { CopyEmailButton } from "./CopyEmailButton";
import { ResumeButton } from "./ResumeButton";

export function NavChip() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-1 rounded-full border border-ink/5 bg-cream/90 px-2 py-2 shadow-chip backdrop-blur-md sm:gap-2">
        {/* Home icon — back to the landing page */}
        <motion.div whileHover={{ scale: 1.12, rotate: -8 }} whileTap={{ scale: 0.92 }}>
          <Link
            href="/#top"
            aria-label="Go to home"
            title="Home"
            className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
              pathname === "/"
                ? "bg-coral text-cream"
                : "text-ink/70 hover:bg-butter hover:text-ink"
            }`}
          >
            <span
              aria-hidden="true"
              className="font-against text-xl leading-none"
              style={{ WebkitTextStroke: "1px currentColor" }}
            >
              A
            </span>
          </Link>
        </motion.div>

        <span className="mx-1 h-5 w-px bg-ink/10" aria-hidden="true" />

        {/* Primary nav links */}
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const matchAgainst = item.activePrefix ?? item.href;
            const active =
              !item.external &&
              (matchAgainst === "/"
                ? pathname === "/"
                : pathname.startsWith(matchAgainst));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`relative block rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
                    active
                      ? "text-cream"
                      : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-coral"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <span className="mx-1 h-5 w-px bg-ink/10" aria-hidden="true" />

        {/* Resume + copy-email icons */}
        <ResumeButton />
        <CopyEmailButton />
      </nav>
    </motion.header>
  );
}
