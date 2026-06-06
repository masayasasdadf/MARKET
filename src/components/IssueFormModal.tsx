"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import type { Issue, Severity, BudgetLevel, SalesPriority } from "@/lib/types";
import {
  AKATSUKI_SERVICES,
  SEVERITY_LABELS,
  BUDGET_LABELS,
  SALES_PRIORITY_LABELS,
  ISSUE_TEMPLATES,
} from "@/lib/constants";
import { generateId } from "@/lib/utils";
import TagInput from "./TagInput";

interface IssueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (issue: Issue) => void;
  initialIssue?: Issue | null;
  title?: string;
}

const defaultIssue = (): Issue => ({
  id: generateId(),
  title: "",
  description: "",
  severity: "medium",
  budgetLevel: "unknown",
  existingAlternatives: [],
  solutions: [],
  akatsukiServices: [],
  salesCopy: "",
  seoKeywords: [],
  adTargeting: [],
  salesPriority: "medium",
  memo: "",
});

export default function IssueFormModal({
  isOpen,
  onClose,
  onSave,
  initialIssue,
  title = "課題を登録",
}: IssueFormModalProps) {
  const [issue, setIssue] = useState<Issue>(defaultIssue());
  const [showTemplate, setShowTemplate] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setIssue(initialIssue ? { ...initialIssue } : defaultIssue());
      setErrors({});
      setShowTemplate(false);
    }
  }, [isOpen, initialIssue]);

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!issue.title.trim()) e.title = "課題タイトルは必須です";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(issue);
    onClose();
  };

  const applyTemplate = (templateId: string) => {
    const tpl = ISSUE_TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;
    setIssue((prev) => ({
      ...prev,
      title: tpl.title,
      description: tpl.description,
      akatsukiServices: tpl.akatsukiServices,
      seoKeywords: tpl.seoKeywords,
    }));
    setShowTemplate(false);
  };

  const set = <K extends keyof Issue>(key: K, value: Issue[K]) =>
    setIssue((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 my-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center gap-2">
            {/* テンプレート選択 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTemplate(!showTemplate)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                テンプレート
                <ChevronDown className="w-3 h-3" />
              </button>
              {showTemplate && (
                <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  {ISSUE_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyTemplate(t.id)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* フォーム本体 */}
        <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* 課題タイトル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              課題タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={issue.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="例：Google口コミが少ない"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                errors.title ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* 課題詳細 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              課題詳細
            </label>
            <textarea
              value={issue.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="課題の背景・状況を詳しく記述してください"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
            />
          </div>

          {/* 深刻度・予算感・営業優先度 */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                深刻度
              </label>
              <select
                value={issue.severity}
                onChange={(e) => set("severity", e.target.value as Severity)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                {(["critical", "high", "medium", "low"] as Severity[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {SEVERITY_LABELS[s]}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                予算感
              </label>
              <select
                value={issue.budgetLevel}
                onChange={(e) =>
                  set("budgetLevel", e.target.value as BudgetLevel)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                {(["unknown", "low", "medium", "high"] as BudgetLevel[]).map(
                  (b) => (
                    <option key={b} value={b}>
                      {BUDGET_LABELS[b]}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                営業優先度
              </label>
              <select
                value={issue.salesPriority}
                onChange={(e) =>
                  set("salesPriority", e.target.value as SalesPriority)
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                {(["high", "medium", "low"] as SalesPriority[]).map((p) => (
                  <option key={p} value={p}>
                    {SALES_PRIORITY_LABELS[p]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* タグ入力フィールド群 */}
          <TagInput
            label="既存代替手段"
            tags={issue.existingAlternatives}
            onChange={(tags) => set("existingAlternatives", tags)}
            placeholder="例：ホットペッパー掲載"
          />

          <TagInput
            label="提案できる解決策"
            tags={issue.solutions}
            onChange={(tags) => set("solutions", tags)}
            placeholder="例：MEO対策強化"
          />

          <TagInput
            label="Akatsukiで提案できる商材"
            tags={issue.akatsukiServices}
            onChange={(tags) => set("akatsukiServices", tags)}
            suggestions={[...AKATSUKI_SERVICES]}
            placeholder="商材名を入力またはリストから選択"
          />

          {/* 訴求文 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              営業訴求文
            </label>
            <textarea
              value={issue.salesCopy}
              onChange={(e) => set("salesCopy", e.target.value)}
              placeholder="例：口コミを増やして地域No.1店舗を目指しませんか？"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          <TagInput
            label="SEOキーワード"
            tags={issue.seoKeywords}
            onChange={(tags) => set("seoKeywords", tags)}
            placeholder="例：居酒屋 口コミ 増やし方"
          />

          <TagInput
            label="広告ターゲティング"
            tags={issue.adTargeting}
            onChange={(tags) => set("adTargeting", tags)}
            placeholder="例：30-60代経営者"
          />

          {/* メモ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メモ
            </label>
            <textarea
              value={issue.memo}
              onChange={(e) => set("memo", e.target.value)}
              placeholder="社内メモ・備考など"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
        </div>

        {/* フッター */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
