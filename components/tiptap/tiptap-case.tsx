"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

interface TiptapCaseProps {
  description: string;
  onChange: (richText: string) => void;
}

const TiptapCase: React.FC<TiptapCaseProps> = ({ description, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class: "p-4 rounded-md border min-h-[150px] border-input ",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapCase;
