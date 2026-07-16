import { useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Type,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const formatBlock = (tag: string) => {
    document.execCommand("formatBlock", false, tag);
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const ToolbarButton = ({
    onClick,
    icon: Icon,
    title,
    isActive = false,
  }: {
    onClick: () => void;
    icon: typeof Bold;
    title: string;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
        isActive ? "bg-teal-50 dark:bg-teal-900/20 text-[#14B8A6]" : "text-gray-600 dark:text-gray-400"
      }`}
      title={title}
    >
      <Icon className="size-4" />
    </button>
  );

  const ToolbarDivider = () => <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />;

  return (
    <div className="rich-text-editor border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-[#14B8A6] focus-within:border-[#14B8A6]">
      {/* Toolbar */}
      <div className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Style */}
          <select
            onChange={(e) => formatBlock(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 mr-2 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            defaultValue="p"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>

          <ToolbarDivider />

          {/* Text Formatting */}
          <ToolbarButton onClick={() => executeCommand("bold")} icon={Bold} title="Bold (Ctrl+B)" />
          <ToolbarButton onClick={() => executeCommand("italic")} icon={Italic} title="Italic (Ctrl+I)" />
          <ToolbarButton
            onClick={() => executeCommand("underline")}
            icon={Underline}
            title="Underline (Ctrl+U)"
          />
          <ToolbarButton
            onClick={() => executeCommand("strikeThrough")}
            icon={Strikethrough}
            title="Strikethrough"
          />

          <ToolbarDivider />

          {/* Lists */}
          <ToolbarButton
            onClick={() => executeCommand("insertUnorderedList")}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => executeCommand("insertOrderedList")}
            icon={ListOrdered}
            title="Numbered List"
          />

          <ToolbarDivider />

          {/* Indentation */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              executeCommand("outdent");
            }}
            className="p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            title="Decrease Indent"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              executeCommand("indent");
            }}
            className="p-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            title="Increase Indent"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>

          <ToolbarDivider />

          {/* Alignment */}
          <ToolbarButton onClick={() => executeCommand("justifyLeft")} icon={AlignLeft} title="Align Left" />
          <ToolbarButton
            onClick={() => executeCommand("justifyCenter")}
            icon={AlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() => executeCommand("justifyRight")}
            icon={AlignRight}
            title="Align Right"
          />

          <ToolbarDivider />

          {/* Insert */}
          <ToolbarButton onClick={insertLink} icon={LinkIcon} title="Insert Link" />
          <ToolbarButton
            onClick={() => formatBlock("blockquote")}
            icon={Quote}
            title="Blockquote"
          />
          <ToolbarButton onClick={() => formatBlock("pre")} icon={Code} title="Code Block" />

          <ToolbarDivider />

          {/* Colors */}
          <input
            type="color"
            onChange={(e) => executeCommand("foreColor", e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600"
            title="Text Color"
          />
          <input
            type="color"
            onChange={(e) => executeCommand("backColor", e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-600"
            title="Background Color"
          />

          <ToolbarDivider />

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              executeCommand("removeFormat");
            }}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium transition-all"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[600px] p-4 focus:outline-none text-gray-900 dark:text-white prose prose-sm dark:prose-invert max-w-none"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
        data-placeholder={placeholder}
      />

      <style>{`
        .rich-text-editor [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .rich-text-editor [contenteditable] {
          overflow-y: auto;
        }
        
        .rich-text-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em;
        }
        
        .rich-text-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em 0 0.5em;
        }
        
        .rich-text-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0 0.5em;
        }
        
        .rich-text-editor blockquote {
          border-left: 4px solid #14B8A6;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        
        .rich-text-editor pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
          font-family: monospace;
        }
        
        .rich-text-editor a {
          color: #14B8A6;
          text-decoration: underline;
        }
        
        .rich-text-editor ul, .rich-text-editor ol {
          padding-left: 2em;
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
}
