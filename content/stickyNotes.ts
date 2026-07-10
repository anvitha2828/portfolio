import { site } from "@/lib/site";

// The little kanban board on the landing page. Drag a note into
// "Done" to pop confetti and reveal a thank-you note asking visitors
// to reach out. Each note also has a small link icon that jumps to
// the section it references (see StickyNoteBoard.tsx for rendering).

export type NoteStatus = "todo" | "doing" | "done";
export type NoteDecoration = "paperclip" | "tape" | "pin";

export type StickyNote = {
  id: string;
  text: string;
  status: NoteStatus;
  color: "coral" | "peach" | "sky" | "leaf" | "butter";
  decoration: NoteDecoration;
  href: string; // where the note's link icon navigates to
  external?: boolean; // opens in a new tab (e.g. the resume PDF)
};

export const stickyNotes: StickyNote[] = [
  {
    id: "1",
    text: "Reviewed case study",
    status: "todo",
    color: "peach",
    decoration: "paperclip",
    href: "/portfolio#work",
  },
  {
    id: "2",
    text: "Reviewed resume",
    status: "todo",
    color: "sky",
    decoration: "tape",
    href: site.resumeHref,
    external: true,
  },
  {
    id: "3",
    text: "Reviewed portfolio",
    status: "todo",
    color: "butter",
    decoration: "pin",
    href: "/portfolio",
  },
];
