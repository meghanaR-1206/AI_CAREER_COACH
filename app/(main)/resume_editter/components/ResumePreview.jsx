"use client";

import { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Button } from "@/components/ui/button";
import "./editor.css"; // You can style for print inside this file too

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 text-sm print:hidden">
      <Button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</Button>
      <Button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</Button>
      <Button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Button>
      <input
        type="color"
        onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="border rounded h-8 w-8 p-0"
        title="Text color"
      />
    </div>
  );
};

export default function ResumePreview({ data }) {
  const contentRef = useRef(null);
  const [editMode, setEditMode] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color],
    content: `
      <h2>${data.contactInfo.name}</h2>
      <p>${data.contactInfo.email} | ${data.contactInfo.phone}</p>
      <p>${data.contactInfo.linkedin} | ${data.contactInfo.github}</p>

      <h3>Summary</h3>
      <p>${data.summary}</p>

      <h3>Skills</h3>
      <p>${data.skills}</p>

      <h3>Experience</h3>
      ${data.experience.map(e => `<p><strong>${e.title}</strong><br/>${e.description}</p>`).join("")}

      <h3>Education</h3>
      ${data.education.map(e => `<p><strong>${e.title}</strong><br/>${e.description}</p>`).join("")}

      <h3>Projects</h3>
      ${data.projects.map(p => `<p><strong>${p.title}</strong><br/>${p.description}</p>`).join("")}
    `,
    editable: editMode,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header with buttons (hidden during print) */}
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h1 className="text-2xl font-bold">📄 Resume Editor</h1>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline">🖨️ Print / Save as PDF</Button>
          {editMode ? (
            <Button onClick={() => setEditMode(false)} className="bg-[#FF7601] text-white">💾 Save</Button>
          ) : (
            <Button onClick={() => setEditMode(true)} variant="outline">✏️ Edit</Button>
          )}
        </div>
      </div>

      {/* Editor Toolbar */}
      {editMode && <MenuBar editor={editor} />}

      {/* Resume Content */}
      <div
        ref={contentRef}
        className={`prose border p-4 min-h-[300px] ${editMode ? "bg-white" : "bg-gray-50"} rounded`}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
