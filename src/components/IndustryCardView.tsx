"use client";

import { useState } from "react";
import {
  Users,
  Package,
  AlertTriangle,
  Star,
  ChevronDown,
  ChevronUp,
  Tag,
} from "lucide-react";
import type { Category, Industry } from "@/lib/types";
import { flattenIssues } from "@/lib/utils";
import { SEVERITY_COLORS, SEVERITY_LABELS, SEVERITY_BORDER_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface IndustryCardViewProps {
  categories: Category[];
}

interface IndustryWithMeta {
  industry: Industry;
  categoryName: string;
  subCategoryName: string;
}

export default function IndustryCardView({
  categories,
}: IndustryCardViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allIndustries: IndustryWithMeta[] = categories.flatMap((cat) =>
    cat.children.flatMap((sub) =>
      sub.industries.map((ind) => ({
        industry: ind,
        categoryName: cat.name,
        subCategoryName: sub.name,
      }))
    )
  );

  if (allIndustries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">データがありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {allIndustries.map(({ industry, categoryName, subCategoryName }) => (
        <IndustryCard
          key={industry.id}
          industry={industry}
          categoryName={categoryName}
          subCategoryName={subCategoryName}
          isExpanded={expandedId === industry.id}
          onToggle={() =>
            setExpandedId(expandedId === industry.id ? null : industry.id)
          }
        />
      ))}
    </div>
  );
}

function IndustryCard({
  industry,
  categoryName,
  subCategoryName,
  isExpanded,
  onToggle,
}: {
  industry: Industry;
  categoryName: string;
  subCategoryName: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const customerTypeCount = industry.customerTypes.length;
  const needCount = industry.customerTypes.reduce(
    (sum, ct) => sum + ct.needs.length,
    0
  );
  const allIssues = industry.customerTypes.flatMap((ct) =>
    ct.needs.flatMap((n) => n.issues)
  );
  const issueCount = allIssues.length;
  const highPriorityCount = allIssues.filter(
    (i) => i.salesPriority === "high"
  ).length;
  const criticalCount = allIssues.filter(
    (i) => i.severity === "critical"
  ).length;

  const allServices = [
    ...new Set(allIssues.flatMap((i) => i.akatsukiServices)),
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all overflow-hidden">
      {/* カードヘッダー */}
      <button
        className="w-full text-left px-5 py-4"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                {categoryName}
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                {subCategoryName}
              </span>
            </div>
            <h3 className="text-base font-bold text-gray-900">
              {industry.name}
            </h3>
            {industry.description && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                {industry.description}
              </p>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
          )}
        </div>

        {/* 統計バッジ */}
        <div className="flex flex-wrap gap-2 mt-3">
          <StatBadge
            icon={<Users className="w-3 h-3" />}
            label={`顧客タイプ ${customerTypeCount}`}
            color="text-gray-600 bg-gray-100"
          />
          <StatBadge
            icon={<Package className="w-3 h-3" />}
            label={`必要サービス ${needCount}`}
            color="text-gray-600 bg-gray-100"
          />
          <StatBadge
            icon={<AlertTriangle className="w-3 h-3" />}
            label={`課題 ${issueCount}`}
            color="text-orange-700 bg-orange-50"
          />
          {highPriorityCount > 0 && (
            <StatBadge
              icon={<Star className="w-3 h-3 fill-purple-400" />}
              label={`高優先度 ${highPriorityCount}`}
              color="text-purple-700 bg-purple-50"
            />
          )}
          {criticalCount > 0 && (
            <StatBadge
              icon={<AlertTriangle className="w-3 h-3" />}
              label={`重大 ${criticalCount}`}
              color="text-red-700 bg-red-50"
            />
          )}
        </div>

        {/* 提案商材 */}
        {allServices.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {allServices.slice(0, 4).map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100"
              >
                <Tag className="w-2.5 h-2.5" />
                {s}
              </span>
            ))}
            {allServices.length > 4 && (
              <span className="text-xs text-gray-400">
                +{allServices.length - 4}
              </span>
            )}
          </div>
        )}
      </button>

      {/* 展開時の詳細 */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
          {industry.customerTypes.map((ct) => (
            <div key={ct.id} className="mb-4 last:mb-0">
              <h4 className="text-xs font-semibold text-violet-700 mb-2 uppercase tracking-wide">
                {ct.name}
              </h4>
              {ct.needs.map((need) => (
                <div key={need.id} className="mb-3">
                  <p className="text-xs font-medium text-gray-600 mb-1.5">
                    ■ {need.name}
                  </p>
                  <div className="space-y-2">
                    {need.issues.map((issue) => (
                      <div
                        key={issue.id}
                        className={cn(
                          "bg-white border rounded-lg border-l-4 p-2.5",
                          SEVERITY_BORDER_COLORS[issue.severity]
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span
                            className={cn(
                              "text-xs px-1.5 py-0.5 rounded-full border font-medium",
                              SEVERITY_COLORS[issue.severity]
                            )}
                          >
                            {SEVERITY_LABELS[issue.severity]}
                          </span>
                          {issue.salesPriority === "high" && (
                            <span className="text-xs font-bold text-purple-700">
                              ★ 優先
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-gray-800">
                          {issue.title}
                        </p>
                        {issue.akatsukiServices.length > 0 && (
                          <p className="text-xs text-blue-600 mt-1">
                            提案:{" "}
                            {issue.akatsukiServices.slice(0, 2).join("、")}
                            {issue.akatsukiServices.length > 2 &&
                              ` 他${issue.akatsukiServices.length - 2}件`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
        color
      )}
    >
      {icon}
      {label}
    </span>
  );
}
