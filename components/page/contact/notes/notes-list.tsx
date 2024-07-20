"use client";

import { cn } from "@/lib/utils";
import { NotesResponce } from "@/data/notes/data-notes";
import NoNotes from "@/components/page/contact/notes/no-notes";
import NoteItem from "@/components/page/contact/notes/note-item";

interface NotesListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  notesList?: NotesResponce[] | null;
}
const NotesList: React.FC<NotesListProps> = ({ notesList, className }) => {
  if (!notesList || !notesList?.length)
    return <NoNotes className={className} />;

  return (
    <div className={cn("flex flex-col-reverse gap-6", className)}>
      {notesList.map((item) => (
        <NoteItem
          key={item.id}
          userName={item.user?.name || "not assigned"}
          date={item.createdAt}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default NotesList;
