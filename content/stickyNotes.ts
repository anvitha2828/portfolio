// The little kanban board on the landing page. Drag the note into
// "Done" to pop confetti and reveal a thank-you note asking visitors
// to reach out. Add more notes here if you ever want a bigger board.

export type NoteStatus = "todo" | "doing" | "done";

export type StickyNote = {
  id: string;
  text: string;
  status: NoteStatus;
  color: "coral" | "peach" | "sky" | "leaf" | "butter";
};

export const stickyNotes: StickyNote[] = [
  {
    id: "1",
    text: "Reviewed Anvitha's portfolio",
    status: "todo",
    color: "butter",
  },
];
