"use client";

import { useEffect, useRef, useState, type RefObject, type ReactNode } from "react";
import {
  useDraggable,
  defaultPositions,
  type PositionMap,
} from "@/lib/useDraggableCanvas";
import { BurrussHallSketch } from "./BurrussHallSketch";
import { WashingtonMonumentSketch } from "./WashingtonMonumentSketch";
import { RobotSketch } from "./RobotSketch";

const POSITIONS_KEY = "heroSketchPositions";

type HeroItem = {
  id: string;
  x: number;
  y: number;
  size: number; // px, square
  href?: string; // opens in a new tab on click (not drag)
  render: () => ReactNode;
};

// Every line-art drawing from the map, scattered around the hero instead —
// scattered toward the edges by default so the name/tagline stay readable,
// but fully draggable from there.
const items: HeroItem[] = [
  {
    id: "burruss",
    x: 6,
    y: 22,
    size: 110,
    render: () => <BurrussHallSketch className="h-full w-full" />,
  },
  {
    id: "dc",
    x: 94,
    y: 22,
    size: 110,
    render: () => <WashingtonMonumentSketch className="h-full w-full" />,
  },
  {
    id: "robot",
    x: 50,
    y: 90,
    size: 90,
    href: "https://chantillyhs.fcps.edu/features/students-compete-qualify-global-robotics-championship-first-r-robotics-competition",
    render: () => <RobotSketch className="h-full w-full" />,
  },
];

export function HeroSketches() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<PositionMap>(() =>
    defaultPositions(items),
  );

  // Pick up any in-progress arrangement saved in this browser, after mount —
  // kept out of the initial render so server/client HTML always match.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(POSITIONS_KEY);
      if (saved) setPositions((prev) => ({ ...prev, ...JSON.parse(saved) }));
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  function persist(next: PositionMap) {
    try {
      localStorage.setItem(POSITIONS_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — arrangement just won't survive a refresh
    }
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <SketchItem
          key={item.id}
          item={item}
          position={positions[item.id]}
          containerRef={containerRef}
          onDrag={(p) => setPositions((prev) => ({ ...prev, [item.id]: p }))}
          onDragEnd={(p) => persist({ ...positions, [item.id]: p })}
        />
      ))}
    </div>
  );
}

function SketchItem({
  item,
  position,
  containerRef,
  onDrag,
  onDragEnd,
}: {
  item: HeroItem;
  position: { x: number; y: number };
  containerRef: RefObject<HTMLDivElement | null>;
  onDrag: (p: { x: number; y: number }) => void;
  onDragEnd: (p: { x: number; y: number }) => void;
}) {
  const drag = useDraggable(
    containerRef,
    onDrag,
    onDragEnd,
    item.href
      ? () => window.open(item.href, "_blank", "noopener,noreferrer")
      : undefined,
  );

  return (
    <div
      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 select-none opacity-80 transition-opacity hover:opacity-100 active:cursor-grabbing ${
        item.href ? "cursor-pointer" : "cursor-grab"
      }`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: item.size,
        height: item.size,
        ...drag.style,
      }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      {item.render()}
    </div>
  );
}
