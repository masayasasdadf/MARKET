"use client";

import { Network, Table, LayoutGrid } from "lucide-react";
import type { ViewMode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ViewSwitcherProps {
  current: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const views: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: "mindmap", label: "マインドマップ", icon: <Network className="w-4 h-4" /> },
  { id: "table", label: "テーブル", icon: <Table className="w-4 h-4" /> },
  { id: "card", label: "カード", icon: <LayoutGrid className="w-4 h-4" /> },
];

export default function ViewSwitcher({ current, onChange }: ViewSwitcherProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
      {views.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            current === v.id
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {v.icon}
          <span className="hidden sm:inline">{v.label}</span>
        </button>
      ))}
    </div>
  );
}
