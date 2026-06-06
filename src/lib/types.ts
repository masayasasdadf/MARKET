export type Severity = "low" | "medium" | "high" | "critical";
export type BudgetLevel = "low" | "medium" | "high" | "unknown";
export type SalesPriority = "low" | "medium" | "high";

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  budgetLevel: BudgetLevel;
  existingAlternatives: string[];
  solutions: string[];
  akatsukiServices: string[];
  salesCopy: string;
  seoKeywords: string[];
  adTargeting: string[];
  salesPriority: SalesPriority;
  memo: string;
}

export interface Need {
  id: string;
  name: string;
  description: string;
  issues: Issue[];
}

export interface CustomerType {
  id: string;
  name: string;
  description: string;
  needs: Need[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  customerTypes: CustomerType[];
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
  industries: Industry[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  children: SubCategory[];
}

export type ViewMode = "mindmap" | "table" | "card";

export interface FilterState {
  keyword: string;
  categoryId: string;
  industryId: string;
  severity: Severity | "";
  salesPriority: SalesPriority | "";
}

export interface FlatIssueRow {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  industryId: string;
  industryName: string;
  customerTypeId: string;
  customerTypeName: string;
  needId: string;
  needName: string;
  issue: Issue;
}

export interface IssueTemplate {
  id: string;
  name: string;
  title: string;
  description: string;
  akatsukiServices: string[];
  seoKeywords: string[];
}
