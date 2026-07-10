"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  stickyNotes as initialNotes,
  type NoteDecoration,
  type NoteStatus,
  type StickyNote,
} from "@/content/stickyNotes";
import { site } from "@/lib/site";
import { Confetti } from "./Confetti";
import { SketchLine } from "./SketchLine";

const COLUMNS: { id: NoteStatus; label: string }[] = [
  { id: "todo", label: "To Do" },
  { id: "doing", label: "Doing" },
  { id: "done", label: "Done" },
];

const noteBg: Record<StickyNote["color"], string> = {
  coral: "bg-coral text-cream",
  peach: "bg-peach text-ink",
  sky: "bg-sky text-ink",
  leaf: "bg-leaf text-ink",
  butter: "bg-butter text-ink",
};

// Paper texture per decoration — lined for paperclip, graph for pin,
// plain for tape so the three notes read as clearly different "species".
const noteTexture: Record<NoteDecoration, CSSProperties | undefined> = {
  paperclip: {
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent, transparent 20px, rgba(43,42,38,0.12) 21px)",
  },
  tape: undefined,
  pin: {
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent, transparent 16px, rgba(43,42,38,0.08) 17px), repeating-linear-gradient(to right, transparent, transparent 16px, rgba(43,42,38,0.08) 17px)",
  },
};

// Deterministic little tilt per note so the board doesn't look too tidy.
function tiltFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return (hash % 11) - 5; // -5..5 degrees
}

export function StickyNoteBoard() {
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [showThanks, setShowThanks] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as NoteStatus;

    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== active.id) return note;
        if (note.status !== newStatus && newStatus === "done") {
          setConfettiBurst((k) => k + 1);
          setShowThanks(true);
        }
        return { ...note, status: newStatus };
      })
    );
  }

  return (
    <section className="py-8">
      <DndContext
        id="sticky-note-board"
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <div>
          {/* Column headers */}
          <div className="grid grid-cols-3">
            {COLUMNS.map((column) => (
              <p
                key={column.id}
                className="px-4 text-xs font-semibold uppercase tracking-wide text-ink/40"
              >
                {column.label}
              </p>
            ))}
          </div>

          <SketchLine orientation="horizontal" className="mt-2" />

          {/* Body — a sketched "T" divider instead of boxed columns */}
          <div className="relative grid grid-cols-3">
            <SketchLine
              orientation="vertical"
              className="absolute inset-y-0 left-1/3 -translate-x-1/2"
            />
            <SketchLine
              orientation="vertical"
              className="absolute inset-y-0 left-2/3 -translate-x-1/2"
            />
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                notes={notes.filter((n) => n.status === column.id)}
                showConfetti={column.id === "done"}
                confettiBurst={confettiBurst}
              />
            ))}
          </div>
        </div>
      </DndContext>

      <AnimatePresence>
        {showThanks && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative mt-6 max-w-sm rounded-2xl border border-ink/10 bg-white p-5 shadow-soft"
          >
            <button
              type="button"
              onClick={() => setShowThanks(false)}
              aria-label="Dismiss"
              className="absolute right-3 top-3 text-ink/40 transition-colors hover:text-ink"
            >
              ×
            </button>
            <p className="font-title text-xl text-ink">Yay, thank you! 🎉</p>
            <p className="mt-1 text-sm text-ink/70">
              I&apos;d love to hear what you think — drop me a note anytime.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                "Thoughts on your portfolio"
              )}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-cream transition-transform hover:scale-105"
            >
              Email me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Column({
  id,
  notes,
  showConfetti,
  confettiBurst,
}: {
  id: NoteStatus;
  notes: StickyNote[];
  showConfetti: boolean;
  confettiBurst: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[220px] rounded-xl px-4 py-4 transition-colors ${
        isOver ? "bg-ink/[0.04]" : ""
      }`}
    >
      <div className="flex flex-wrap gap-4 pt-3">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
      {showConfetti && <Confetti burstKey={confettiBurst} />}
    </div>
  );
}

function Note({ note }: { note: StickyNote }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: note.id });

  const tilt = tiltFor(note.id);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${tilt}deg)`,
      }
    : { transform: `rotate(${tilt}deg)` };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`relative w-36 cursor-grab touch-none select-none overflow-visible rounded-sm px-3 pb-4 pt-5 text-sm font-semibold leading-snug shadow-soft transition-shadow active:cursor-grabbing ${
        noteBg[note.color]
      } ${isDragging ? "z-30 shadow-chip" : "z-0"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={noteTexture[note.decoration]}
        aria-hidden="true"
      />
      <NoteDecorationIcon decoration={note.decoration} />
      <span className="relative">{note.text}</span>
      <NoteLink href={note.href} external={note.external} />
    </div>
  );
}

function NoteDecorationIcon({ decoration }: { decoration: NoteDecoration }) {
  if (decoration === "paperclip") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -top-3 right-3 h-6 w-6 rotate-12 text-leaf"
        aria-hidden="true"
      >
        <path d="M8 12V6a4 4 0 1 1 8 0v9a2.5 2.5 0 1 1-5 0V8" />
      </svg>
    );
  }

  if (decoration === "tape") {
    return (
      <span
        className="absolute -top-2 left-4 h-4 w-10 -rotate-6 bg-coral/40"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-coral shadow-sm"
      aria-hidden="true"
    >
      <span className="absolute inset-0.5 rounded-full bg-white/30" />
    </span>
  );
}

function NoteLink({ href, external }: { href: string; external?: boolean }) {
  const stopDrag = (e: PointerEvent) => e.stopPropagation();
  const className =
    "absolute bottom-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-white/70 text-ink/50 transition-colors hover:bg-white hover:text-ink";
  const icon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={stopDrag}
        aria-label="Open this link"
        className={className}
      >
        {icon}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onPointerDown={stopDrag}
      aria-label="Go to this section"
      className={className}
    >
      {icon}
    </Link>
  );
}
