"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { FlatIssueRow, Issue } from "@/lib/types";
import {
  SEVERITY_LABELS,
  SEVERITY_COLORS,
  BUDGET_LABELS,
  SALES_PRIORITY_LABELS,
  SALES_PRIORITY_COLORS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import CsvExportButton from "./CsvExportButton";

interface TableViewProps {
  rows: FlatIssueRow[];
  onEditIssue: (row: FlatIssueRow) => void;
}

type SortKey = keyof Pick<
  FlatIssueRow,
  | "categoryName"
  | "subCategoryName"
  | "industryName"
  | "customerTypeName"
  | "needName"
> | "title" | "severity" | "salesPriority" | "budgetLevel";

export default function TableView({ rows, onEditIssue }: TableViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>("categoryName");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      let av: string;
      let bv: string;
      if (
        sortKey === "title" ||
        sortKey === "severity" ||
        sortKey === "salesPriority" ||
        sortKey === "budgetLevel"
      ) {
        av = a.issue[sortKey as keyof Issue] as string;
        bv = b.issue[sortKey as keyof Issue] as string;
      } else {
        av = a[sortKey] as string;
        bv = b[sortKey] as string;
      }
      return sortDir === "asc"
        ? av.localeCompare(bv, "ja")
        : bv.localeCompare(av, "ja");
    });
  }, [rows, sortKey, sortDir]);

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k)
      return <ArrowUpDown className="w-3 h-3 opacity-40 ml-1 inline" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 ml-1 inline text-blue-600" />
    ) : (
      <ArrowDown className="w-3 h-3 ml-1 inline text-blue-600" />
    );
  };

  const Th = ({
    label,
    k,
    className = "",
  }: {
    label: string;
    k: SortKey;
    className?: string;
  }) => (
    <th
      className={cn(
        "px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap cursor-pointer hover:bg-gray-100 select-none",
        className
      )}
      onClick={() => handleSort(k)}
    >
      {label}
      <SortIcon k={k} />
    </th>
  );

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">データがありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{sorted.length}件</p>
        <CsvExportButton rows={sorted} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 scrollbar-thin">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <Th label="大カテゴリー" k="categoryName" className="min-w-[100px]" />
              <Th label="小カテゴリー" k="subCategoryName" className="min-w-[100px]" />
              <Th label="業種" k="industryName" className="min-w-[100px]" />
              <Th label="顧客タイプ" k="customerTypeName" className="min-w-[100px]" />
              <Th label="必要サービス" k="needName" className="min-w-[100px]" />
              <Th label="課題" k="title" className="min-w-[160px]" />
              <Th label="深刻度" k="severity" className="min-w-[70px]" />
              <Th label="予算感" k="budgetLevel" className="min-w-[60px]" />
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[140px]">
                既存代替手段
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[180px]">
                Akatsuki商材
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[200px]">
                訴求文
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[160px]">
                SEOキーワード
              </th>
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[140px]">
                広告ターゲット
              </th>
              <Th label="営業優先度" k="salesPriority" className="min-w-[80px]" />
              <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[120px]">
                メモ
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr
                key={`${row.issue.id}-${i}`}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
                onClick={() => onEditIssue(row)}
              >
                <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                  {row.categoryName}
                </td>
                <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                  {row.subCategoryName}
                </td>
                <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                  {row.industryName}
                </td>
                <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                  {row.customerTypeName}
                </td>
                <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                  {row.needName}
                </td>
                <td className="px-3 py-2.5 font-medium text-gray-900">
                  {row.issue.title}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full border font-medium",
                      SEVERITY_COLORS[row.issue.severity]
                    )}
                  >
                    {SEVERITY_LABELS[row.issue.severity]}
                  </span>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">
                  {BUDGET_LABELS[row.issue.budgetLevel]}
                </td>
                <td className="px-3 py-2.5">
                  <TagList items={row.issue.existingAlternatives} max={2} />
                </td>
                <td className="px-3 py-2.5">
                  <TagList
                    items={row.issue.akatsukiServices}
                    max={2}
                    color="blue"
                  />
                </td>
                <td className="px-3 py-2.5 text-xs text-gray-600 max-w-[200px]">
                  <p className="line-clamp-2">{row.issue.salesCopy}</p>
                </td>
                <td className="px-3 py-2.5">
                  <TagList items={row.issue.seoKeywords} max={2} color="green" />
                </td>
                <td className="px-3 py-2.5">
                  <TagList items={row.issue.adTargeting} max={2} />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      SALES_PRIORITY_COLORS[row.issue.salesPriority]
                    )}
                  >
                    {SALES_PRIORITY_LABELS[row.issue.salesPriority]}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-xs text-gray-500 max-w-[120px]">
                  <p className="line-clamp-2">{row.issue.memo}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TagList({
  items,
  max = 3,
  color = "gray",
}: {
  items: string[];
  max?: number;
  color?: "blue" | "green" | "gray";
}) {
  const colorClass =
    color === "blue"
      ? "bg-blue-50 text-blue-700"
      : color === "green"
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="flex flex-wrap gap-1">
      {items.slice(0, max).map((item, i) => (
        <span
          key={i}
          className={cn("text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap", colorClass)}
        >
          {item}
        </span>
      ))}
      {items.length > max && (
        <span className="text-xs text-gray-400">+{items.length - max}</span>
      )}
    </div>
  );
}
