"use client";

import { Search, X } from "lucide-react";
import type { Category, FilterState, Severity, SalesPriority } from "@/lib/types";
import { SEVERITY_LABELS, SALES_PRIORITY_LABELS } from "@/lib/constants";

interface FilterBarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  categories: Category[];
}

export default function FilterBar({
  filters,
  onChange,
  categories,
}: FilterBarProps) {
  const allIndustries = categories.flatMap((c) =>
    c.children.flatMap((s) => s.industries)
  );

  const hasAnyFilter =
    filters.keyword ||
    filters.categoryId ||
    filters.industryId ||
    filters.severity ||
    filters.salesPriority;

  const reset = () =>
    onChange({
      keyword: "",
      categoryId: "",
      industryId: "",
      severity: "",
      salesPriority: "",
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex flex-wrap gap-3 items-center">
        {/* キーワード検索 */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) =>
              onChange({ ...filters, keyword: e.target.value })
            }
            placeholder="キーワード検索..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </div>

        {/* 大カテゴリー */}
        <select
          value={filters.categoryId}
          onChange={(e) =>
            onChange({ ...filters, categoryId: e.target.value, industryId: "" })
          }
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
        >
          <option value="">大カテゴリー：全て</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* 業種 */}
        <select
          value={filters.industryId}
          onChange={(e) =>
            onChange({ ...filters, industryId: e.target.value })
          }
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
        >
          <option value="">業種：全て</option>
          {(filters.categoryId
            ? categories
                .find((c) => c.id === filters.categoryId)
                ?.children.flatMap((s) => s.industries) ?? []
            : allIndustries
          ).map((ind) => (
            <option key={ind.id} value={ind.id}>
              {ind.name}
            </option>
          ))}
        </select>

        {/* 深刻度 */}
        <select
          value={filters.severity}
          onChange={(e) =>
            onChange({ ...filters, severity: e.target.value as Severity | "" })
          }
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
        >
          <option value="">深刻度：全て</option>
          {(["critical", "high", "medium", "low"] as Severity[]).map((s) => (
            <option key={s} value={s}>
              {SEVERITY_LABELS[s]}
            </option>
          ))}
        </select>

        {/* 営業優先度 */}
        <select
          value={filters.salesPriority}
          onChange={(e) =>
            onChange({
              ...filters,
              salesPriority: e.target.value as SalesPriority | "",
            })
          }
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
        >
          <option value="">営業優先度：全て</option>
          {(["high", "medium", "low"] as SalesPriority[]).map((p) => (
            <option key={p} value={p}>
              {SALES_PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>

        {hasAnyFilter && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
            リセット
          </button>
        )}
      </div>
    </div>
  );
}
