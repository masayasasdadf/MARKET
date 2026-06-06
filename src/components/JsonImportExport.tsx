"use client";

import { useRef } from "react";
import { Download, Upload } from "lucide-react";
import type { Category } from "@/lib/types";
import { exportJSON, importJSON } from "@/lib/storage";

interface JsonImportExportProps {
  categories: Category[];
  onImport: (categories: Category[]) => void;
}

export default function JsonImportExport({
  categories,
  onImport,
}: JsonImportExportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importJSON(file);
      onImport(data);
      alert("インポートが完了しました");
    } catch (err) {
      alert("インポートに失敗しました: " + (err as Error).message);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportJSON(categories)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Download className="w-4 h-4" />
        JSONエクスポート
      </button>
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Upload className="w-4 h-4" />
        JSONインポート
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
