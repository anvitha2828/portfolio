/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type PanInfo } from "framer-motion";
import { journeyStops, type MapStop } from "@/content/mapPlaces";

// Pastel tints keyed by stop color, used for the placeholder card face when
// a stop has no photo yet.
const cardTint: Record<string, string> = {
  coral: "bg-coral/15",
  peach: "bg-peach/40",
  sky: "bg-sky/25",
  leaf: "bg-leaf/20",
  butter: "bg-butter/40",
};

const DRAG_THRESHOLD = 50;

export function JourneyCards() {
  return (
    <section
      id="map"
      className="w-screen scroll-mt-24 py-10"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div className="flex gap-5 overflow-x-auto px-6 pb-4">
        {journeyStops.map((stop) => (
          <JourneyCard key={stop.id} stop={stop} />
        ))}
      </div>
    </section>
  );
}

// A full-bleed photo card, title on the photo, nothing else — drag the
// card up (or tap it) and the photo gives way to a panel with the fuller
// story. Drag back down, or tap again, to close it.
function JourneyCard({ stop }: { stop: MapStop }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const photo = stop.photos?.[0];

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y < -DRAG_THRESHOLD) setOpen(true);
    else if (info.offset.y > DRAG_THRESHOLD) setOpen(false);
  }

  function handleTap() {
    if (open) {
      setOpen(false);
    } else if (stop.href) {
      router.push(stop.href);
    } else {
      setOpen(true);
    }
  }

  // A peek of the white panel on hover, just for cards where pulling up
  // actually reveals something (a blurb) — a little "there's more here"
  // hint before you commit to the drag.
  const panelY = open ? "0%" : stop.blurb && hovered ? "94%" : "100%";

  return (
    <div
      className="relative h-[420px] w-64 shrink-0 overflow-hidden rounded-3xl shadow-soft"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={stop.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${cardTint[stop.color]}`}
        >
          <span className="text-5xl opacity-30" aria-hidden="true">
            🖼️
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-5 pb-5 pt-16">
        <span className="text-lg font-semibold text-white">{stop.label}</span>
      </div>

      {/* Gesture layer — drag detection only, snaps back to origin itself
          (zero-size dragConstraints) so it never fights the panel's own
          `animate`-driven slide below. */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
        className="absolute inset-0 cursor-grab touch-none select-none active:cursor-grabbing"
      />

      <motion.div
        initial={false}
        animate={{ y: panelY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-none absolute inset-0 flex flex-col justify-end rounded-3xl bg-white p-5"
      >
        <span className="text-lg font-bold text-ink">{stop.label}</span>
        {stop.caption && (
          <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/50">
            {stop.caption}
          </span>
        )}
        {stop.blurb && (
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            {stop.blurb}
          </p>
        )}
        {stop.href && (
          <button
            type="button"
            onClick={() => router.push(stop.href!)}
            className="pointer-events-auto mt-4 w-fit rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream"
          >
            View case study →
          </button>
        )}
      </motion.div>

      {stop.href && (
        <div
          className={`group absolute bottom-4 right-4 z-10 transition-opacity ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-cream opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
            Click here to see my case study
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push(stop.href!);
            }}
            aria-label={`View case study: ${stop.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition-transform hover:scale-105"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M9 7 h8 v8" />
    </svg>
  );
}
