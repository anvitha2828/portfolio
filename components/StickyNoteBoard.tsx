"use client";

import { useState } from "react";
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
import {
  stickyNotes as initialNotes,
  type NoteStatus,
  type StickyNote,
} from "@/content/stickyNotes";
import { Confetti } from "./Confetti";

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

// Deterministic little tilt per note so the board doesn't look too tidy.
function tiltFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return (hash % 7) - 3; // -3..3 degrees
}

export function StickyNoteBoard() {
  const [notes, setNotes] = useState<StickyNote[]>(initialNotes);
  const [confettiBurst, setConfettiBurst] = useState(0);

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
        }
        return { ...note, status: newStatus };
      })
    );
  }

  return (
    <section className="py-8">
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
        What I&apos;m Up To
      </h2>
      <p className="mt-3 max-w-xl text-lg text-ink/70">
        Drag a note across the board — see what happens when one lands in
        Done.
      </p>

      <DndContext
        id="sticky-note-board"
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              label={column.label}
              notes={notes.filter((n) => n.status === column.id)}
              showConfetti={column.id === "done"}
              confettiBurst={confettiBurst}
            />
          ))}
        </div>
      </DndContext>
    </section>
  );
}

function Column({
  id,
  label,
  notes,
  showConfetti,
  confettiBurst,
}: {
  id: NoteStatus;
  label: string;
  notes: StickyNote[];
  showConfetti: boolean;
  confettiBurst: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[220px] rounded-blob border border-dashed p-4 transition-colors ${
        isOver ? "border-ink/30 bg-ink/[0.04]" : "border-ink/15 bg-ink/[0.02]"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
        {label}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
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
      className={`w-32 cursor-grab touch-none select-none rounded-lg px-3 py-4 text-sm font-semibold shadow-soft transition-shadow active:cursor-grabbing ${
        noteBg[note.color]
      } ${isDragging ? "z-30 shadow-chip" : "z-0"}`}
    >
      {note.text}
    </div>
  );
}
