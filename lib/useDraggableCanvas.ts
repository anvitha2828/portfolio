"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type Point = { x: number; y: number };
export type PositionMap = Record<string, Point>;

export function defaultPositions(
  items: { id: string; x: number; y: number }[],
): PositionMap {
  return Object.fromEntries(
    items.map((item) => [item.id, { x: item.x, y: item.y }]),
  );
}

// Tracks a canvas's actual pixel size so percentage-based positions can be
// converted to real pixel coordinates when needed (e.g. drawing an SVG path
// through them) instead of a stretched 0-100 viewBox.
export function useElementSize(ref: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

// Drag-to-arrange, everything positioned by x/y percentage of the
// containing canvas. This is a temporary editing aid — arrangements are
// kept in localStorage so they survive a refresh while things get moved
// around; once a layout is settled, the dragged coordinates get baked back
// into the source content and dragging is turned off.
export function useDraggable(
  containerRef: RefObject<HTMLDivElement | null>,
  onDrag: (p: Point) => void,
  onDragEnd: (p: Point) => void,
  onClick?: () => void,
) {
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startRef = useRef<Point>({ x: 0, y: 0 });
  const lastRef = useRef<Point | null>(null);

  function toPercent(clientX: number, clientY: number): Point {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    const y = Math.min(
      100,
      Math.max(0, ((clientY - rect.top) / rect.height) * 100),
    );
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

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    style: { touchAction: "none" as const },
  };
}
