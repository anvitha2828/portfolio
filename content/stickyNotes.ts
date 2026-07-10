// The little kanban board on the landing page. Drag a note between
// columns — dropping one in "Done" pops confetti. Edit these with your
// real to-dos whenever you're ready; the board picks up changes automatically.

export type NoteStatus = "todo" | "doing" | "done";

export type StickyNote = {
  id: string;
  text: string;
  status: NoteStatus;
  color: "coral" | "peach" | "sky" | "leaf" | "butter";
};

export const stickyNotes: StickyNote[] = [
  { id: "1", text: "Learn pottery", status: "todo", color: "peach" },
  { id: "2", text: "Visit Japan", status: "todo", color: "sky" },
  { id: "3", text: "Ship Roots v2", status: "doing", color: "butter" },
  { id: "4", text: "Design the Map page", status: "doing", color: "leaf" },
  { id: "5", text: "Launch this portfolio", status: "done", color: "coral" },
];
