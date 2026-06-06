"use client";

import { FileDown } from "lucide-react";
import type { FlatIssueRow } from "@/lib/types";
import { exportToCSV } from "@/lib/utils";

interface CsvExportButtonProps {
  rows: FlatIssueRow[];
}

export default function CsvExportButton({ rows }: CsvExportButtonProps) {
  const handleExport = () => {
    const csv = exportToCSV(rows);
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `industry-issue-map-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <FileDown className="w-4 h-4" />
      CSVエクスポート
    </button>
  );
}
