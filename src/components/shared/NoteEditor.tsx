"use client";

import React, { useCallback, useRef } from "react";
// FIX: Removed BubbleMenu import
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {TextStyle} from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Table as TableIcon,
  Columns,
  Rows,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button"; //
import { cn } from "@/lib/utils"; //

// --- Editor Toolbar (Unchanged) ---
const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  const colorInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ToggleButton = ({
    icon: Icon,
    onClick,
    isActive,
    label,
    disabled = false,
  }: {
    icon: React.ElementType;
    onClick: () => void;
    isActive: boolean;
    label: string;
    disabled?: boolean;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn(
        "h-8 w-8 p-2",
        isActive ? "bg-primary/10 text-primary" : "",
        disabled ? "opacity-50 cursor-not-allowed" : ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  const addLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (base64) {
            editor.chain().focus().setImage({ src: base64 }).run();
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
      event.target.value = "";
    },
    [editor]
  );

  const addTable = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const addColumnAfter = useCallback(() => editor.chain().focus().addColumnAfter().run(), [editor]);
  const addRowAfter = useCallback(() => editor.chain().focus().addRowAfter().run(), [editor]);
  const deleteTable = useCallback(() => editor.chain().focus().deleteTable().run(), [editor]);

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 border-gray-300 bg-gray-50 p-2">
      {/* --- Basic Formatting --- */}
      <ToggleButton label="Bold" icon={Bold} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} />
      <ToggleButton label="Italic" icon={Italic} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} />
      <ToggleButton label="Underline" icon={UnderlineIcon} onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} />
      <div className="mx-1 h-6 w-px bg-gray-300" />
      {/* --- Headings --- */}
      <ToggleButton label="Heading 1" icon={Heading1} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })} />
      <ToggleButton label="Heading 2" icon={Heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })} />
      <ToggleButton label="Heading 3" icon={Heading3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })} />
      <div className="mx-1 h-6 w-px bg-gray-300" />
      {/* --- Lists --- */}
      <ToggleButton label="Bullet List" icon={List} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} />
      <ToggleButton label="Ordered List" icon={ListOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} />
      <div className="mx-1 h-6 w-px bg-gray-300" />
      {/* --- Alignment --- */}
      <ToggleButton label="Align Left" icon={AlignLeft} onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} />
      <ToggleButton label="Align Center" icon={AlignCenter} onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} />
      <ToggleButton label="Align Right" icon={AlignRight} onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} />
      <div className="mx-1 h-6 w-px bg-gray-300" />
      {/* --- Link & Color --- */}
      <ToggleButton label="Add Link" icon={LinkIcon} onClick={addLink} isActive={editor.isActive("link")} />
      <Button variant="ghost" size="icon" aria-label="Text Color" className="h-8 w-8 p-2 relative" onClick={() => colorInputRef.current?.click()}>
        <Palette className="h-4 w-4" />
        <input type="color" ref={colorInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onInput={(event) => editor.chain().focus().setColor(event.currentTarget.value).run()} value={editor.getAttributes('textStyle').color || '#000000'} />
      </Button>
      <div className="mx-1 h-6 w-px bg-gray-300" />
      {/* --- Image (Local Upload) --- */}
      <Button variant="ghost" size="icon" aria-label="Add Image" className="h-8 w-8 p-2" onClick={() => fileInputRef.current?.click()}> <ImageIcon className="h-4 w-4" /> </Button>
      <input type="file" ref={fileInputRef} accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      {/* --- Table Controls --- */}
      <ToggleButton label="Add Table" icon={TableIcon} onClick={addTable} isActive={editor.isActive("table")} />
      <ToggleButton label="Add Column After" icon={Columns} onClick={addColumnAfter} isActive={false} disabled={!editor.can().addColumnAfter()} />
      <ToggleButton label="Add Row After" icon={Rows} onClick={addRowAfter} isActive={false} disabled={!editor.can().addRowAfter()} />
      <ToggleButton label="Delete Table" icon={Trash2} onClick={deleteTable} isActive={false} disabled={!editor.can().deleteTable()} />
    </div>
  );
};

// --- Main Editor Component ---
interface NoteEditorProps {
  content: string;
  onUpdate: (html: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ content, onUpdate }) => {
  const extensions = [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Underline,
    Link.configure({ openOnClick: false, autolink: true }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Image.configure({ inline: false, allowBase64: true }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TextStyle,
    Color,
  ];

  const editor = useEditor({
    extensions,
    content: content,
    onUpdate: ({ editor }) => { onUpdate(editor.getHTML()); },
    editorProps: { attributes: { class: "tiptap-content p-4 min-h-[250px] focus:outline-none", }, },
    immediatelyRender: false,
  });

  return (
    <div className="tiptap-editor-container rounded-md border border-gray-300">
      <EditorToolbar editor={editor} />
      {/* FIX: Removed BubbleMenu component and related logic */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;