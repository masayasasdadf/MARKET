"use client";

import { AlertTriangle, Star, Tag, Edit2 } from "lucide-react";
import type { Issue } from "@/lib/types";
import {
  SEVERITY_LABELS,
  SEVERITY_COLORS,
  SEVERITY_BORDER_COLORS,
  SALES_PRIORITY_COLORS,
  SALES_PRIORITY_LABELS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issue: Issue;
  onEdit?: (issue: Issue) => void;
  compact?: boolean;
}

export default function IssueCard({
  issue,
  onEdit,
  compact = false,
}: IssueCardProps) {
  return (
    <div
      className={cn(
        "bg-white border rounded-lg border-l-4 transition-shadow hover:shadow-md",
        SEVERITY_BORDER_COLORS[issue.severity],
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border",
                SEVERITY_COLORS[issue.severity]
              )}
            >
              <AlertTriangle className="w-3 h-3" />
              {SEVERITY_LABELS[issue.severity]}
            </span>
            {issue.salesPriority === "high" && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                <Star className="w-3 h-3 fill-purple-400" />
                営業優先度：高
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-gray-900 leading-snug">
            {issue.title}
          </h4>
          {!compact && issue.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {issue.description}
            </p>
          )}
          {!compact && issue.akatsukiServices.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {issue.akatsukiServices.slice(0, 3).map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {s}
                </span>
              ))}
              {issue.akatsukiServices.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{issue.akatsukiServices.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit(issue)}
            className="shrink-0 text-gray-400 hover:text-blue-600 transition-colors p-1"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
