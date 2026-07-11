"use client";

import { useEffect, useRef } from "react";
import { journeyStops, type MapStop } from "@/content/mapPlaces";

// Pastel tints keyed by the same stop colors used on the map, so a
// placeholder photo card still reads as "belonging" to its stop.
const cardTint: Record<string, string> = {
  coral: "bg-coral/15",
  peach: "bg-peach/40",
  sky: "bg-sky/25",
  leaf: "bg-leaf/20",
  butter: "bg-butter/40",
};

const bubbleRotate = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

const AUTO_SCROLL_SPEED = 0.6; // px per animation frame

// A continuously looping filmstrip, one card per journey stop (duplicated
// so the loop is seamless). Hovering a stop on the map above pauses the
// loop and glides the strip to that stop's card; moving off resumes the
// loop from wherever it landed.
export function PhotoScroll({ hoveredStopId }: { hoveredStopId: string | null }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const setWidthRef = useRef(0);

  // Measure the width of one (non-duplicated) set of cards so the auto-scroll
  // loop knows when to wrap back around seamlessly.
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        setWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let rafId: number;
    function tick() {
      if (!pausedRef.current && trackRef.current) {
        offsetRef.current -= AUTO_SCROLL_SPEED;
        const setWidth = setWidthRef.current;
        if (setWidth && Math.abs(offsetRef.current) >= setWidth) {
          offsetRef.current += setWidth;
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    if (hoveredStopId) {
      const index = journeyStops.findIndex((s) => s.id === hoveredStopId);
      const item = itemRefs.current[index];
      if (index === -1 || !item) return;

      pausedRef.current = true;
      const itemBox = item.getBoundingClientRect();
      const viewportBox = viewport.getBoundingClientRect();
      const delta =
        viewportBox.left + viewportBox.width / 2 - (itemBox.left + itemBox.width / 2);
      const target = offsetRef.current + delta;

      track.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
      track.style.transform = `translateX(${target}px)`;
      offsetRef.current = target;
    } else {
      track.style.transition = "";
      pausedRef.current = false;
    }
  }, [hoveredStopId]);

  const cards = [...journeyStops, ...journeyStops];

  return (
    <section
      className="w-screen overflow-hidden py-10"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-6 px-6" style={{ willChange: "transform" }}>
          {cards.map((stop, i) => (
            <PhotoCard
              key={`${stop.id}-${i}`}
              stop={stop}
              rotate={bubbleRotate[i % bubbleRotate.length]}
              refCallback={
                i < journeyStops.length ? (el) => (itemRefs.current[i] = el) : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({
  stop,
  rotate,
  refCallback,
}: {
  stop: MapStop;
  rotate: string;
  refCallback?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={refCallback} className="relative shrink-0">
      <span
        className={`absolute -top-4 left-4 z-10 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-soft ${rotate}`}
      >
        {stop.label}
      </span>
      <div
        className={`flex h-72 w-56 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 shadow-soft ${cardTint[stop.color]} ${rotate}`}
      >
        {stop.photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={stop.photoSrc} alt={stop.label} className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl opacity-30" aria-hidden="true">
            🖼️
          </span>
        )}
      </div>
    </div>
  );
}
