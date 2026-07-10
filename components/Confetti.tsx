"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Site palette: coral, peach, sky, leaf, butter
const COLORS = ["#FF7A59", "#FFD8C2", "#8ECae6", "#8AB17D", "#FFE9A8"];
const PARTICLE_COUNT = 28;

type Particle = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  delay: number;
  shape: "circle" | "square";
};

function makeBurst(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 90;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 40, // bias upward, like a little pop
      rotate: Math.random() * 360 - 180,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.08,
      shape: Math.random() > 0.5 ? "circle" : "square",
    };
  });
}

// Renders a confetti pop centered in its (relatively positioned) parent.
// Bump `burstKey` to fire a new burst.
export function Confetti({ burstKey }: { burstKey: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (burstKey === 0) return;
    setParticles(makeBurst());
    const timeout = window.setTimeout(() => setParticles([]), 900);
    return () => window.clearTimeout(timeout);
  }, [burstKey]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={`${burstKey}-${p.id}`}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: p.x,
              y: p.y,
              rotate: p.rotate,
              scale: 0.6,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5"
            style={{
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "9999px" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
