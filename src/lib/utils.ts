import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category, FlatIssueRow, FilterState } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function flattenIssues(categories: Category[]): FlatIssueRow[] {
  const rows: FlatIssueRow[] = [];
  for (const cat of categories) {
    for (const sub of cat.children) {
      for (const industry of sub.industries) {
        for (const ct of industry.customerTypes) {
          for (const need of ct.needs) {
            for (const issue of need.issues) {
              rows.push({
                categoryId: cat.id,
                categoryName: cat.name,
                subCategoryId: sub.id,
                subCategoryName: sub.name,
                industryId: industry.id,
                industryName: industry.name,
                customerTypeId: ct.id,
                customerTypeName: ct.name,
                needId: need.id,
                needName: need.name,
                issue,
              });
            }
          }
        }
      }
    }
  }
  return rows;
}

export function filterIssues(
  rows: FlatIssueRow[],
  filters: FilterState
): FlatIssueRow[] {
  return rows.filter((row) => {
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const searchable = [
        row.categoryName,
        row.subCategoryName,
        row.industryName,
        row.customerTypeName,
        row.needName,
        row.issue.title,
        row.issue.description,
        row.issue.salesCopy,
        ...row.issue.seoKeywords,
        ...row.issue.akatsukiServices,
        ...row.issue.solutions,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(kw)) return false;
    }
    if (filters.categoryId && row.categoryId !== filters.categoryId)
      return false;
    if (filters.industryId && row.industryId !== filters.industryId)
      return false;
    if (filters.severity && row.issue.severity !== filters.severity)
      return false;
    if (
      filters.salesPriority &&
      row.issue.salesPriority !== filters.salesPriority
    )
      return false;
    return true;
  });
}

export function exportToCSV(rows: FlatIssueRow[]): string {
  const headers = [
    "大カテゴリー",
    "小カテゴリー",
    "業種",
    "顧客タイプ",
    "必要なもの・サービス",
    "課題タイトル",
    "課題詳細",
    "深刻度",
    "予算感",
    "既存代替手段",
    "提案商材",
    "訴求文",
    "SEOキーワード",
    "広告ターゲティング",
    "営業優先度",
    "メモ",
  ];

  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;

  const csvRows = rows.map((row) =>
    [
      escape(row.categoryName),
      escape(row.subCategoryName),
      escape(row.industryName),
      escape(row.customerTypeName),
      escape(row.needName),
      escape(row.issue.title),
      escape(row.issue.description),
      escape(row.issue.severity),
      escape(row.issue.budgetLevel),
      escape(row.issue.existingAlternatives.join("、")),
      escape(row.issue.akatsukiServices.join("、")),
      escape(row.issue.salesCopy),
      escape(row.issue.seoKeywords.join("、")),
      escape(row.issue.adTargeting.join("、")),
      escape(row.issue.salesPriority),
      escape(row.issue.memo),
    ].join(",")
  );

  return [headers.map(escape).join(","), ...csvRows].join("\n");
}

export function countIndustries(categories: Category[]): number {
  return categories.flatMap((c) => c.children.flatMap((s) => s.industries))
    .length;
}

export function countAllIssues(categories: Category[]): number {
  return flattenIssues(categories).length;
}

export function countHighPriorityIssues(categories: Category[]): number {
  return flattenIssues(categories).filter(
    (r) => r.issue.salesPriority === "high"
  ).length;
}

export function countServiceUsage(
  categories: Category[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const row of flattenIssues(categories)) {
    for (const svc of row.issue.akatsukiServices) {
      counts[svc] = (counts[svc] || 0) + 1;
    }
  }
  return counts;
}

export function countSeverity(
  categories: Category[]
): Record<string, number> {
  const counts: Record<string, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };
  for (const row of flattenIssues(categories)) {
    counts[row.issue.severity] = (counts[row.issue.severity] || 0) + 1;
  }
  return counts;
}
