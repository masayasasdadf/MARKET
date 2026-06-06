"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}

export default function TagInput({
  label,
  tags,
  onChange,
  suggestions = [],
  placeholder = "入力してEnterで追加",
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(input.toLowerCase()) &&
      !tags.includes(s) &&
      input.length > 0
  );

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div className="min-h-[2.5rem] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 flex flex-wrap gap-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => setShowSuggestions(true)}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
          />
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onMouseDown={() => addTag(s)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
