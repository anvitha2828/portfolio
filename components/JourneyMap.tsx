"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  journeyBefore,
  journeyAfter,
  vtHub,
  vtStops,
  easterEggs,
  type MapStop,
} from "@/content/mapPlaces";
import { BurrussHallSketch } from "./BurrussHallSketch";
import { SketchLine } from "./SketchLine";
import { SpeechBubble } from "./SpeechBubble";

export function JourneyMap() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="map" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        The Journey
      </h2>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        A few of the places along the way — click a stop to see what happened
        there.
      </p>

      <div className="relative mt-12">
        <EasterEgg
          egg={easterEggs[0]}
          className="absolute -top-8 right-2 sm:right-12"
        />
        <EasterEgg
          egg={easterEggs[1]}
          className="absolute -bottom-4 left-0 sm:left-8"
        />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-center sm:gap-3">
          <StopCard stop={journeyBefore} isOpen={openId === journeyBefore.id} onToggle={toggle} />

          <SketchLine orientation="vertical" className="h-8 sm:hidden" />
          <SketchLine
            orientation="horizontal"
            className="hidden w-12 self-center sm:block"
          />

          <div className="flex flex-col items-center">
            <div className="w-40 overflow-hidden rounded-2xl shadow-soft sm:w-48">
              <BurrussHallSketch className="w-full" />
            </div>
            <StopCard
              stop={vtHub}
              isOpen={openId === vtHub.id}
              onToggle={toggle}
              className="mt-3"
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {vtStops.map((stop) => (
                <StopChip
                  key={stop.id}
                  stop={stop}
                  isOpen={openId === stop.id}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>

          <SketchLine orientation="vertical" className="h-8 sm:hidden" />
          <SketchLine
            orientation="horizontal"
            className="hidden w-12 self-center sm:block"
          />

          <StopCard stop={journeyAfter} isOpen={openId === journeyAfter.id} onToggle={toggle} />
        </div>
      </div>
    </section>
  );
}

function StopCard({
  stop,
  isOpen,
  onToggle,
  className = "",
}: {
  stop: MapStop;
  isOpen: boolean;
  onToggle: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => onToggle(stop.id)}
        className="rounded-full border border-ink/15 bg-ink/[0.03] px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.06]"
      >
        {stop.label}
      </button>
      <BlurbPopover stop={stop} isOpen={isOpen} />
    </div>
  );
}

function StopChip({
  stop,
  isOpen,
  onToggle,
}: {
  stop: MapStop;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  if (stop.href) {
    const external = stop.href.startsWith("http");
    const className =
      "inline-flex items-center gap-1 rounded-full bg-coral/10 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-coral/20";
    return external ? (
      <a href={stop.href} target="_blank" rel="noopener noreferrer" className={className}>
        {stop.label}
        <ArrowUpRight className="h-3 w-3" />
      </a>
    ) : (
      <Link href={stop.href} className={className}>
        {stop.label}
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onToggle(stop.id)}
        className="rounded-full bg-ink/[0.04] px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.08]"
      >
        {stop.label}
      </button>
      <BlurbPopover stop={stop} isOpen={isOpen} />
    </div>
  );
}

function BlurbPopover({ stop, isOpen }: { stop: MapStop; isOpen: boolean }) {
  if (!stop.blurb) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-ink/10 bg-white p-3 text-left text-xs leading-relaxed text-ink/80 shadow-soft"
        >
          {stop.blurb}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EasterEgg({
  egg,
  className,
}: {
  egg: { id: string; emoji: string; tooltip: string };
  className: string;
}) {
  return (
    <div className={`group relative z-20 ${className}`}>
      <span className="cursor-default text-2xl opacity-70 transition-opacity hover:opacity-100">
        {egg.emoji}
      </span>
      <SpeechBubble className="top-9 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {egg.tooltip}
      </SpeechBubble>
    </div>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}
