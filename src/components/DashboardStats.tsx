"use client";

import type { Category } from "@/lib/types";
import {
  countIndustries,
  countAllIssues,
  countHighPriorityIssues,
  countServiceUsage,
  countSeverity,
} from "@/lib/utils";
import { SEVERITY_LABELS } from "@/lib/constants";

interface DashboardStatsProps {
  categories: Category[];
}

export default function DashboardStats({ categories }: DashboardStatsProps) {
  const industryCount = countIndustries(categories);
  const issueCount = countAllIssues(categories);
  const highPriorityCount = countHighPriorityIssues(categories);
  const serviceUsage = countServiceUsage(categories);
  const severityCounts = countSeverity(categories);

  const topServices = Object.entries(serviceUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* 基本統計 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="大カテゴリー"
          value={categories.length}
          color="bg-blue-50 text-blue-700"
          border="border-blue-200"
        />
        <StatCard
          label="業種数"
          value={industryCount}
          color="bg-indigo-50 text-indigo-700"
          border="border-indigo-200"
        />
        <StatCard
          label="課題数"
          value={issueCount}
          color="bg-violet-50 text-violet-700"
          border="border-violet-200"
        />
        <StatCard
          label="高優先度課題"
          value={highPriorityCount}
          color="bg-purple-50 text-purple-700"
          border="border-purple-200"
          highlight={highPriorityCount > 0}
        />
      </div>

      {/* 深刻度別 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">深刻度別の課題数</h3>
        <div className="flex gap-3 flex-wrap">
          {(["critical", "high", "medium", "low"] as const).map((sev) => (
            <div
              key={sev}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${
                sev === "critical"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : sev === "high"
                  ? "bg-orange-50 text-orange-700 border-orange-200"
                  : sev === "medium"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              <span>{SEVERITY_LABELS[sev]}</span>
              <span className="font-bold">{severityCounts[sev]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 商材別紐づき件数 */}
      {topServices.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Akatsuki商材別の課題紐づき件数（上位5）
          </h3>
          <div className="space-y-2">
            {topServices.map(([service, count]) => (
              <div key={service} className="flex items-center gap-2">
                <span className="text-sm text-gray-700 w-48 shrink-0 truncate">
                  {service}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (count / (topServices[0]?.[1] || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-blue-700 w-8 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  border,
  highlight = false,
}: {
  label: string;
  value: number;
  color: string;
  border: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border p-4 ${border} ${
        highlight ? "ring-2 ring-purple-300" : ""
      }`}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color.split(" ")[1]}`}>{value}</p>
    </div>
  );
}
