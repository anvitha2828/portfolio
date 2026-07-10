"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  journeyStops,
  backgroundImages,
  easterEggs,
  type MapStop,
  type MapBackground,
  type EasterEgg,
} from "@/content/mapPlaces";
import { BurrussHallSketch } from "./BurrussHallSketch";
import { WashingtonMonumentSketch } from "./WashingtonMonumentSketch";
import { SpeechBubble } from "./SpeechBubble";

type Point = { x: number; y: number };
type PositionMap = Record<string, Point>;

const STOPS_KEY = "journeyMapPositions";
const BG_KEY = "journeyMapBgPositions";
const EGG_KEY = "journeyMapEggPositions";

const dotColor: Record<string, string> = {
  coral: "bg-coral",
  peach: "bg-peach",
  sky: "bg-sky",
  leaf: "bg-leaf",
  butter: "bg-butter",
};

function defaultPositions(items: { id: string; x: number; y: number }[]): PositionMap {
  return Object.fromEntries(items.map((item) => [item.id, { x: item.x, y: item.y }]));
}

// A smooth curve through every point (Catmull-Rom, converted to cubic
// bezier segments) — always rounded, never a straight ruled line, and
// happy to re-flow into new U-shaped bends as points move around.
function smoothPath(points: Point[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

// Tracks the map canvas's actual pixel size so the connecting line can be
// drawn in real pixel coordinates (1 SVG unit = 1px) instead of a
// non-uniformly stretched 0-100 viewBox, which kept warping the dotted
// line's round dots into ellipses whenever the canvas wasn't square.
function useElementSize(ref: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

// Drag-to-arrange, everything positioned by x/y percentage of the map
// canvas. This is a temporary editing aid — arrangements are kept in
// localStorage so they survive a refresh while things get moved around;
// once a layout is settled, the coordinates get baked back into
// content/mapPlaces.ts and dragging goes away.
function useDraggable(
  containerRef: RefObject<HTMLDivElement | null>,
  onDrag: (p: Point) => void,
  onDragEnd: (p: Point) => void,
  onClick?: () => void
) {
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const lastRef = useRef<Point | null>(null);

  function toPercent(clientX: number, clientY: number): Point {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    return { x, y };
  }

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    startRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
    if (!movedRef.current) return;
    const p = toPercent(e.clientX, e.clientY);
    lastRef.current = p;
    onDrag(p);
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (movedRef.current && lastRef.current) {
      onDragEnd(lastRef.current);
    } else if (!movedRef.current && onClick) {
      onClick();
    }
    movedRef.current = false;
    lastRef.current = null;
  };

  return { onPointerDown, onPointerMove, onPointerUp, style: { touchAction: "none" as const } };
}

export function JourneyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasSize = useElementSize(containerRef);
  const [openId, setOpenId] = useState<string | null>(null);
  const [positions, setPositions] = useState<PositionMap>(() => defaultPositions(journeyStops));
  const [bgPositions, setBgPositions] = useState<PositionMap>(() => defaultPositions(backgroundImages));
  const [eggPositions, setEggPositions] = useState<PositionMap>(() => defaultPositions(easterEggs));

  // Pick up any in-progress arrangement saved in this browser, after mount —
  // kept out of the initial render so server/client HTML always match.
  useEffect(() => {
    try {
      const savedStops = localStorage.getItem(STOPS_KEY);
      if (savedStops) setPositions((prev) => ({ ...prev, ...JSON.parse(savedStops) }));
      const savedBg = localStorage.getItem(BG_KEY);
      if (savedBg) setBgPositions((prev) => ({ ...prev, ...JSON.parse(savedBg) }));
      const savedEggs = localStorage.getItem(EGG_KEY);
      if (savedEggs) setEggPositions((prev) => ({ ...prev, ...JSON.parse(savedEggs) }));
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  function persist(key: string, next: PositionMap) {
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // storage unavailable — arrangement just won't survive a refresh
    }
  }

  const pathD =
    canvasSize.width > 0
      ? smoothPath(
          journeyStops.map((stop) => {
            const p = positions[stop.id] ?? { x: stop.x, y: stop.y };
            return { x: (p.x / 100) * canvasSize.width, y: (p.y / 100) * canvasSize.height };
          })
        )
      : "";

  return (
    <section
      id="map"
      className="w-screen scroll-mt-24 py-10"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="overflow-x-auto">
        <div ref={containerRef} className="relative h-[580px] min-w-[820px] py-6">
          {backgroundImages.map((bg) => (
            <BackgroundMarker
              key={bg.id}
              bg={bg}
              position={bgPositions[bg.id]}
              containerRef={containerRef}
              onDrag={(p) => setBgPositions((prev) => ({ ...prev, [bg.id]: p }))}
              onDragEnd={(p) => persist(BG_KEY, { ...bgPositions, [bg.id]: p })}
            />
          ))}

          {pathD && (
            <svg
              viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
              className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
              aria-hidden="true"
            >
              <path
                d={pathD}
                stroke="rgba(43,42,38,0.3)"
                strokeWidth="1.6"
                strokeDasharray="0.1 9"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}

          {journeyStops.map((stop) => (
            <Marker
              key={stop.id}
              stop={stop}
              position={positions[stop.id]}
              containerRef={containerRef}
              isOpen={openId === stop.id}
              onToggle={toggle}
              onDrag={(p) => setPositions((prev) => ({ ...prev, [stop.id]: p }))}
              onDragEnd={(p) => persist(STOPS_KEY, { ...positions, [stop.id]: p })}
            />
          ))}

          {easterEggs.map((egg) => (
            <EasterEggMarker
              key={egg.id}
              egg={egg}
              position={eggPositions[egg.id]}
              containerRef={containerRef}
              onDrag={(p) => setEggPositions((prev) => ({ ...prev, [egg.id]: p }))}
              onDragEnd={(p) => persist(EGG_KEY, { ...eggPositions, [egg.id]: p })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Marker({
  stop,
  position,
  containerRef,
  isOpen,
  onToggle,
  onDrag,
  onDragEnd,
}: {
  stop: MapStop;
  position: Point;
  containerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onDrag: (p: Point) => void;
  onDragEnd: (p: Point) => void;
}) {
  const router = useRouter();

  function handleClick() {
    if (stop.href) {
      if (stop.href.startsWith("http")) {
        window.open(stop.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(stop.href);
      }
    } else {
      onToggle(stop.id);
    }
  }

  const drag = useDraggable(containerRef, onDrag, onDragEnd, handleClick);

  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none active:cursor-grabbing"
      style={{ left: `${position.x}%`, top: `${position.y}%`, ...drag.style }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <div className="flex w-28 flex-col items-center text-center">
        <span className={`h-4 w-4 rounded-full shadow-soft ${dotColor[stop.color]}`} />
        <span className="mt-2 text-sm font-bold leading-tight text-coral">{stop.label}</span>
        {stop.caption && (
          <span className="mt-0.5 text-xs leading-snug text-ink/60">{stop.caption}</span>
        )}
      </div>
      <BlurbPopover stop={stop} isOpen={isOpen} />
    </div>
  );
}

function BackgroundMarker({
  bg,
  position,
  containerRef,
  onDrag,
  onDragEnd,
}: {
  bg: MapBackground;
  position: Point;
  containerRef: RefObject<HTMLDivElement | null>;
  onDrag: (p: Point) => void;
  onDragEnd: (p: Point) => void;
}) {
  const drag = useDraggable(containerRef, onDrag, onDragEnd);
  const Illustration = bg.sketch === "burruss" ? BurrussHallSketch : WashingtonMonumentSketch;

  return (
    <div
      className="absolute z-0 w-36 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none opacity-80 active:cursor-grabbing"
      style={{ left: `${position.x}%`, top: `${position.y}%`, aspectRatio: "5 / 6", ...drag.style }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <Illustration className="h-full w-full" />
    </div>
  );
}

function EasterEggMarker({
  egg,
  position,
  containerRef,
  onDrag,
  onDragEnd,
}: {
  egg: EasterEgg;
  position: Point;
  containerRef: RefObject<HTMLDivElement | null>;
  onDrag: (p: Point) => void;
  onDragEnd: (p: Point) => void;
}) {
  const drag = useDraggable(containerRef, onDrag, onDragEnd);

  return (
    <div
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none active:cursor-grabbing"
      style={{ left: `${position.x}%`, top: `${position.y}%`, ...drag.style }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <span className="text-2xl opacity-70 transition-opacity hover:opacity-100">{egg.emoji}</span>
      <SpeechBubble className="top-9 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {egg.tooltip}
      </SpeechBubble>
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
