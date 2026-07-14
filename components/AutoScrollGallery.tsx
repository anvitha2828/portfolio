"use client";

import { useEffect, useRef } from "react";
import { imageSrc, type GalleryImage } from "@/content/caseStudies";

const SPEED = 0.35; // px per frame — slow drift, not a ticker
const RESUME_DELAY = 2000; // ms of no interaction before auto-scroll resumes

// A horizontal filmstrip that drifts on its own (bouncing between the
// start and end, no jump-cut) but is a native scrollable div underneath —
// so trackpad/touch scrolling always works too, and doing so pauses the
// auto-drift for a couple seconds before it picks back up.
//
// Plain `overflow-x-auto` doesn't support click-and-drag panning with a
// mouse (only trackpad/touch swipe or the scrollbar), so mouse drag-to-
// scroll is added by hand below — touch is left alone since it already
// scrolls natively.
export function AutoScrollGallery({
  images,
  alt,
}: {
  images: GalleryImage[];
  alt: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const directionRef = useRef(1);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    function tick() {
      const el = scrollRef.current;
      if (el && !pausedRef.current && !draggingRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 1) {
          let next = el.scrollLeft + SPEED * directionRef.current;
          if (next >= maxScroll) {
            next = maxScroll;
            directionRef.current = -1;
          } else if (next <= 0) {
            next = 0;
            directionRef.current = 1;
          }
          el.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function pauseThenResume() {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pauseThenResume();
    if (e.pointerType !== "mouse") return; // touch already scrolls natively
    const el = scrollRef.current;
    if (!el) return;
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || !scrollRef.current) return;
    scrollRef.current.scrollLeft =
      dragStartScrollRef.current - (e.clientX - dragStartXRef.current);
  }

  function endDrag() {
    draggingRef.current = false;
  }

  if (images.length === 0) return null;

  return (
    <div
      ref={scrollRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="flex h-full w-full cursor-grab items-center gap-6 overflow-x-auto select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={imageSrc(image)}
          alt={alt}
          draggable={false}
          className="h-full max-h-64 w-auto shrink-0 rounded-2xl border border-ink/10 object-contain sm:max-h-none"
        />
      ))}
    </div>
  );
}
