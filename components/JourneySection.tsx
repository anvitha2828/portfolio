"use client";

import { useState } from "react";
import { JourneyMap } from "./JourneyMap";
import { PhotoScroll } from "./PhotoScroll";

// Wraps the map and the photo filmstrip together so they can share hover
// state — hovering a stop on the map tells the filmstrip which photo to
// glide to.
export function JourneySection() {
  const [hoveredStopId, setHoveredStopId] = useState<string | null>(null);

  return (
    <>
      <JourneyMap onStopHover={setHoveredStopId} />
      <PhotoScroll hoveredStopId={hoveredStopId} />
    </>
  );
}
