"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { journeyStops, easterEggs, type MapStop } from "@/content/mapPlaces";
import { BurrussHallSketch } from "./BurrussHallSketch";
import { WashingtonMonumentSketch } from "./WashingtonMonumentSketch";
import { StopIcon } from "./StopIcon";
import { SpeechBubble } from "./SpeechBubble";

// A big, irregular sweeping line through the stops, in order — cubic
// bezier segments with two asymmetric perpendicular offsets so each leg
// bows out into its own loose curve/U-shape rather than a tight uniform
// zigzag. Offsets scale with segment length and vary per segment (a
// deterministic pseudo-random wobble) so no two curves look identical.
function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function buildWigglyPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const seed = Math.sin(i * 12.9898) * 43758.5453;
    const rand = seed - Math.floor(seed);
    const sign = i % 2 === 0 ? 1 : -1;
    const w1 = sign * (len * 0.3 + rand * 6);
    const w2 = -sign * (len * 0.2 + (1 - rand) * 8);

    const c1x = round(p1.x + dx * 0.33 + nx * w1);
    const c1y = round(p1.y + dy * 0.33 + ny * w1);
    const c2x = round(p1.x + dx * 0.66 + nx * w2);
    const c2y = round(p1.y + dy * 0.66 + ny * w2);

    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export function JourneyMap() {
  const [openId, setOpenId] = useState<string | null>(null);
  const pathD = buildWigglyPath(journeyStops.map((s) => ({ x: s.x, y: s.y })));

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section id="map" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        The Journey
      </h2>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        A few of the places along the way — click a stop for more.
      </p>

      <div className="mt-10 overflow-x-auto">
        <div className="relative h-[580px] min-w-[820px] py-6">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* road body */}
            <path d={pathD} stroke="rgba(43,42,38,0.12)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            {/* center dashes */}
            <path
              d={pathD}
              stroke="rgba(43,42,38,0.35)"
              strokeWidth="0.4"
              strokeDasharray="1.2 1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {journeyStops.map((stop, i) => (
            <Marker
              key={stop.id}
              stop={stop}
              index={i}
              isOpen={openId === stop.id}
              onToggle={toggle}
            />
          ))}

          {easterEggs.map((egg) => (
            <div
              key={egg.id}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${egg.x}%`, top: `${egg.y}%` }}
            >
              <span className="cursor-default text-2xl opacity-70 transition-opacity hover:opacity-100">
                {egg.emoji}
              </span>
              <SpeechBubble className="top-9 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {egg.tooltip}
              </SpeechBubble>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marker({
  stop,
  index,
  isOpen,
  onToggle,
}: {
  stop: MapStop;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
}) {
  const icon =
    stop.sketch === "burruss" ? (
      <BurrussHallSketch className="h-full w-full" />
    ) : stop.sketch === "dc" ? (
      <WashingtonMonumentSketch className="h-full w-full" />
    ) : stop.icon ? (
      <StopIcon icon={stop.icon} color={stop.color} className="h-full w-full" />
    ) : null;

  const content = (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 4) * 0.4,
      }}
      className="flex w-28 flex-col items-center text-center"
    >
      <div className="h-16 w-16 overflow-hidden rounded-2xl shadow-soft">{icon}</div>
      <span className="mt-2 text-sm font-bold leading-tight text-coral">
        {stop.label}
      </span>
      {stop.caption && (
        <span className="mt-0.5 text-xs leading-snug text-ink/60">
          {stop.caption}
        </span>
      )}
    </motion.div>
  );

  const wrapperStyle = { left: `${stop.x}%`, top: `${stop.y}%` };

  if (stop.href) {
    const external = stop.href.startsWith("http");
    return external ? (
      <a
        href={stop.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={wrapperStyle}
      >
        {content}
      </a>
    ) : (
      <Link
        href={stop.href}
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={wrapperStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={wrapperStyle}
    >
      <button type="button" onClick={() => onToggle(stop.id)}>
        {content}
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
          className="absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 rounded-xl border border-ink/10 bg-white p-3 text-left text-xs leading-relaxed text-ink/80 shadow-soft"
        >
          {stop.blurb}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
