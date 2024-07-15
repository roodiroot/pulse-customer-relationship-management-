"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";

import Toolbar from "./toolbar";
import { cn } from "@/lib/utils";

interface TiptapCaseProps {
  description: string;
  onChange: (richText: string) => void;
  className?: string;
}

const TiptapCase: React.FC<TiptapCaseProps> = ({
  description,
  onChange,
  className,
}) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class: cn(
          "pt-4 pb-12 px-6 rounded-md border min-h-[70px] border-input text-sm *:list-revert",
          className
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="relative">
      <Toolbar editor={editor} className="absolute bottom-0 left-0 z-10" />
      <EditorContent editor={editor} className="relative z-0" />
    </div>
  );
};

export default TiptapCase;
