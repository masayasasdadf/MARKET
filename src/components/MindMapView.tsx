"use client";

import { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Copy,
  AlertTriangle,
  Star,
} from "lucide-react";
import type {
  Category,
  SubCategory,
  Industry,
  CustomerType,
  Need,
  Issue,
} from "@/lib/types";
import {
  SEVERITY_COLORS,
  SEVERITY_LABELS,
  SEVERITY_BORDER_COLORS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import IssueCard from "./IssueCard";

interface MindMapViewProps {
  categories: Category[];
  onAddSubCategory: (categoryId: string) => void;
  onAddIndustry: (categoryId: string, subCategoryId: string) => void;
  onAddCustomerType: (
    categoryId: string,
    subCategoryId: string,
    industryId: string
  ) => void;
  onAddNeed: (
    categoryId: string,
    subCategoryId: string,
    industryId: string,
    customerTypeId: string
  ) => void;
  onAddIssue: (
    categoryId: string,
    subCategoryId: string,
    industryId: string,
    customerTypeId: string,
    needId: string
  ) => void;
  onEditCategory: (category: Category) => void;
  onEditSubCategory: (categoryId: string, sub: SubCategory) => void;
  onEditIndustry: (
    categoryId: string,
    subId: string,
    industry: Industry
  ) => void;
  onEditCustomerType: (
    categoryId: string,
    subId: string,
    industryId: string,
    ct: CustomerType
  ) => void;
  onEditNeed: (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    need: Need
  ) => void;
  onEditIssue: (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string,
    issue: Issue
  ) => void;
  onDeleteCategory: (id: string) => void;
  onDeleteSubCategory: (categoryId: string, subId: string) => void;
  onDeleteIndustry: (
    categoryId: string,
    subId: string,
    industryId: string
  ) => void;
  onDeleteCustomerType: (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string
  ) => void;
  onDeleteNeed: (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string
  ) => void;
  onDeleteIssue: (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string,
    issueId: string
  ) => void;
  onDuplicateCategory: (category: Category) => void;
}

type CollapseMap = Record<string, boolean>;

export default function MindMapView({
  categories,
  onAddSubCategory,
  onAddIndustry,
  onAddCustomerType,
  onAddNeed,
  onAddIssue,
  onEditCategory,
  onEditSubCategory,
  onEditIndustry,
  onEditCustomerType,
  onEditNeed,
  onEditIssue,
  onDeleteCategory,
  onDeleteSubCategory,
  onDeleteIndustry,
  onDeleteCustomerType,
  onDeleteNeed,
  onDeleteIssue,
  onDuplicateCategory,
}: MindMapViewProps) {
  const [collapsed, setCollapsed] = useState<CollapseMap>({});

  const toggle = useCallback((id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isOpen = (id: string) => !collapsed[id];

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-lg font-medium">データがありません</p>
        <p className="text-sm mt-1">
          「新規カテゴリー追加」または「サンプルデータ読み込み」で開始してください
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin pb-4">
      <div className="inline-flex flex-col gap-4 min-w-full">
        {categories.map((cat) => (
          <div key={cat.id} className="flex gap-0 items-stretch">
            {/* 大カテゴリーノード */}
            <NodeBox
              label={cat.name}
              description={cat.description}
              level="category"
              isOpen={isOpen(cat.id)}
              onToggle={() => toggle(cat.id)}
              onEdit={() => onEditCategory(cat)}
              onDelete={() => onDeleteCategory(cat.id)}
              onAdd={() => onAddSubCategory(cat.id)}
              onDuplicate={() => onDuplicateCategory(cat)}
              addLabel="小カテゴリー追加"
              count={cat.children.length}
            />

            {/* 右側：小カテゴリー以降 */}
            {isOpen(cat.id) && cat.children.length > 0 && (
              <>
                <Connector />
                <div className="flex flex-col gap-3">
                  {cat.children.map((sub) => (
                    <div key={sub.id} className="flex gap-0 items-stretch">
                      <NodeBox
                        label={sub.name}
                        description={sub.description}
                        level="sub"
                        isOpen={isOpen(sub.id)}
                        onToggle={() => toggle(sub.id)}
                        onEdit={() => onEditSubCategory(cat.id, sub)}
                        onDelete={() =>
                          onDeleteSubCategory(cat.id, sub.id)
                        }
                        onAdd={() => onAddIndustry(cat.id, sub.id)}
                        addLabel="業種追加"
                        count={sub.industries.length}
                      />

                      {isOpen(sub.id) && sub.industries.length > 0 && (
                        <>
                          <Connector />
                          <div className="flex flex-col gap-3">
                            {sub.industries.map((ind) => (
                              <div
                                key={ind.id}
                                className="flex gap-0 items-stretch"
                              >
                                <NodeBox
                                  label={ind.name}
                                  description={ind.description}
                                  level="industry"
                                  isOpen={isOpen(ind.id)}
                                  onToggle={() => toggle(ind.id)}
                                  onEdit={() =>
                                    onEditIndustry(cat.id, sub.id, ind)
                                  }
                                  onDelete={() =>
                                    onDeleteIndustry(
                                      cat.id,
                                      sub.id,
                                      ind.id
                                    )
                                  }
                                  onAdd={() =>
                                    onAddCustomerType(
                                      cat.id,
                                      sub.id,
                                      ind.id
                                    )
                                  }
                                  addLabel="顧客タイプ追加"
                                  count={ind.customerTypes.length}
                                />

                                {isOpen(ind.id) &&
                                  ind.customerTypes.length > 0 && (
                                    <>
                                      <Connector />
                                      <div className="flex flex-col gap-3">
                                        {ind.customerTypes.map((ct) => (
                                          <div
                                            key={ct.id}
                                            className="flex gap-0 items-stretch"
                                          >
                                            <NodeBox
                                              label={ct.name}
                                              description={ct.description}
                                              level="customerType"
                                              isOpen={isOpen(ct.id)}
                                              onToggle={() => toggle(ct.id)}
                                              onEdit={() =>
                                                onEditCustomerType(
                                                  cat.id,
                                                  sub.id,
                                                  ind.id,
                                                  ct
                                                )
                                              }
                                              onDelete={() =>
                                                onDeleteCustomerType(
                                                  cat.id,
                                                  sub.id,
                                                  ind.id,
                                                  ct.id
                                                )
                                              }
                                              onAdd={() =>
                                                onAddNeed(
                                                  cat.id,
                                                  sub.id,
                                                  ind.id,
                                                  ct.id
                                                )
                                              }
                                              addLabel="必要サービス追加"
                                              count={ct.needs.length}
                                            />

                                            {isOpen(ct.id) &&
                                              ct.needs.length > 0 && (
                                                <>
                                                  <Connector />
                                                  <div className="flex flex-col gap-3">
                                                    {ct.needs.map((need) => (
                                                      <div
                                                        key={need.id}
                                                        className="flex gap-0 items-stretch"
                                                      >
                                                        <NodeBox
                                                          label={need.name}
                                                          description={
                                                            need.description
                                                          }
                                                          level="need"
                                                          isOpen={isOpen(
                                                            need.id
                                                          )}
                                                          onToggle={() =>
                                                            toggle(need.id)
                                                          }
                                                          onEdit={() =>
                                                            onEditNeed(
                                                              cat.id,
                                                              sub.id,
                                                              ind.id,
                                                              ct.id,
                                                              need
                                                            )
                                                          }
                                                          onDelete={() =>
                                                            onDeleteNeed(
                                                              cat.id,
                                                              sub.id,
                                                              ind.id,
                                                              ct.id,
                                                              need.id
                                                            )
                                                          }
                                                          onAdd={() =>
                                                            onAddIssue(
                                                              cat.id,
                                                              sub.id,
                                                              ind.id,
                                                              ct.id,
                                                              need.id
                                                            )
                                                          }
                                                          addLabel="課題追加"
                                                          count={
                                                            need.issues.length
                                                          }
                                                        />

                                                        {isOpen(need.id) &&
                                                          need.issues.length >
                                                            0 && (
                                                            <>
                                                              <Connector />
                                                              <div className="flex flex-col gap-2">
                                                                {need.issues.map(
                                                                  (issue) => (
                                                                    <IssueNodeBox
                                                                      key={
                                                                        issue.id
                                                                      }
                                                                      issue={
                                                                        issue
                                                                      }
                                                                      onEdit={() =>
                                                                        onEditIssue(
                                                                          cat.id,
                                                                          sub.id,
                                                                          ind.id,
                                                                          ct.id,
                                                                          need.id,
                                                                          issue
                                                                        )
                                                                      }
                                                                      onDelete={() =>
                                                                        onDeleteIssue(
                                                                          cat.id,
                                                                          sub.id,
                                                                          ind.id,
                                                                          ct.id,
                                                                          need.id,
                                                                          issue.id
                                                                        )
                                                                      }
                                                                    />
                                                                  )
                                                                )}
                                                              </div>
                                                            </>
                                                          )}
                                                      </div>
                                                    ))}
                                                  </div>
                                                </>
                                              )}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const levelStyles: Record<
  string,
  { bg: string; border: string; text: string; width: string }
> = {
  category: {
    bg: "bg-blue-600",
    border: "border-blue-700",
    text: "text-white",
    width: "w-36",
  },
  sub: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    width: "w-32",
  },
  industry: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-900",
    width: "w-32",
  },
  customerType: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-900",
    width: "w-28",
  },
  need: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
    width: "w-28",
  },
};

function NodeBox({
  label,
  description,
  level,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
  onDuplicate,
  addLabel,
  count,
}: {
  label: string;
  description: string;
  level: string;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  onDuplicate?: () => void;
  addLabel: string;
  count: number;
}) {
  const styles = levelStyles[level] || levelStyles.need;
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "relative rounded-lg border shadow-sm flex flex-col select-none",
          styles.bg,
          styles.border,
          styles.width,
          "min-h-[60px]"
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-1 px-3 py-2 text-left w-full",
            styles.text
          )}
        >
          <span className="text-xs font-semibold leading-tight flex-1 break-words">
            {label}
          </span>
          <span className="shrink-0 opacity-60">
            {count > 0 ? (
              isOpen ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )
            ) : null}
          </span>
        </button>

        {count > 0 && (
          <div
            className={cn(
              "px-3 pb-1 text-xs opacity-60",
              styles.text
            )}
          >
            {count}件
          </div>
        )}

        {/* アクションボタン */}
        {showActions && (
          <div className="absolute -top-2 -right-2 flex gap-1 z-10">
            <ActionBtn
              icon={<Plus className="w-3 h-3" />}
              title={addLabel}
              onClick={onAdd}
              color="bg-green-500"
            />
            <ActionBtn
              icon={<Edit2 className="w-3 h-3" />}
              title="編集"
              onClick={onEdit}
              color="bg-blue-500"
            />
            {onDuplicate && (
              <ActionBtn
                icon={<Copy className="w-3 h-3" />}
                title="複製"
                onClick={onDuplicate}
                color="bg-yellow-500"
              />
            )}
            <ActionBtn
              icon={<Trash2 className="w-3 h-3" />}
              title="削除"
              onClick={onDelete}
              color="bg-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function IssueNodeBox({
  issue,
  onEdit,
  onDelete,
}: {
  issue: Issue;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-white border rounded-lg border-l-4 shadow-sm p-2 w-56 cursor-pointer hover:shadow-md transition-shadow",
        SEVERITY_BORDER_COLORS[issue.severity]
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onEdit}
    >
      <div className="flex items-start gap-1">
        <span
          className={cn(
            "shrink-0 text-xs px-1.5 py-0.5 rounded-full border font-medium",
            SEVERITY_COLORS[issue.severity]
          )}
        >
          {SEVERITY_LABELS[issue.severity]}
        </span>
        {issue.salesPriority === "high" && (
          <Star className="w-3 h-3 text-purple-500 fill-purple-400 shrink-0 mt-0.5" />
        )}
      </div>
      <p className="text-xs font-medium text-gray-800 mt-1 leading-snug line-clamp-2">
        {issue.title}
      </p>
      {issue.akatsukiServices.length > 0 && (
        <p className="text-xs text-blue-600 mt-1 truncate">
          {issue.akatsukiServices[0]}
          {issue.akatsukiServices.length > 1 &&
            ` 他${issue.akatsukiServices.length - 1}件`}
        </p>
      )}

      {showActions && (
        <div className="absolute -top-2 -right-2 flex gap-1 z-10">
          <ActionBtn
            icon={<Edit2 className="w-3 h-3" />}
            title="編集"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            color="bg-blue-500"
          />
          <ActionBtn
            icon={<Trash2 className="w-3 h-3" />}
            title="削除"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            color="bg-red-500"
          />
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  icon,
  title,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: (e: React.MouseEvent) => void;
  color: string;
}) {
  return (
    <button
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className={cn(
        "w-5 h-5 rounded-full text-white flex items-center justify-center shadow-sm hover:opacity-80 transition-opacity",
        color
      )}
    >
      {icon}
    </button>
  );
}

function Connector() {
  return (
    <div className="flex items-center px-0">
      <div className="w-6 h-px bg-gray-300" />
    </div>
  );
}
