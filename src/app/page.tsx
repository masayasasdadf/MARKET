"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Database,
  Trash2,
  RefreshCw,
} from "lucide-react";
import type {
  Category,
  SubCategory,
  Industry,
  CustomerType,
  Need,
  Issue,
  ViewMode,
  FilterState,
  FlatIssueRow,
} from "@/lib/types";
import { generateId, flattenIssues, filterIssues } from "@/lib/utils";
import { loadFromStorage, saveToStorage } from "@/lib/storage";
import { createSampleData } from "@/lib/sampleData";

import AppHeader from "@/components/AppHeader";
import DashboardStats from "@/components/DashboardStats";
import ViewSwitcher from "@/components/ViewSwitcher";
import FilterBar from "@/components/FilterBar";
import MindMapView from "@/components/MindMapView";
import TableView from "@/components/TableView";
import IndustryCardView from "@/components/IndustryCardView";
import IssueFormModal from "@/components/IssueFormModal";
import CategoryFormModal from "@/components/CategoryFormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import JsonImportExport from "@/components/JsonImportExport";

const defaultFilters: FilterState = {
  keyword: "",
  categoryId: "",
  industryId: "",
  severity: "",
  salesPriority: "",
};

interface CategoryModalState {
  isOpen: boolean;
  title: string;
  initialData: { name: string; description: string } | null;
  onSave: (data: { name: string; description: string }) => void;
}

interface IssueModalState {
  isOpen: boolean;
  title: string;
  initialIssue: Issue | null;
  onSave: (issue: Issue) => void;
}

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [view, setView] = useState<ViewMode>("mindmap");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStats, setShowStats] = useState(true);

  const [catModal, setCatModal] = useState<CategoryModalState>({
    isOpen: false,
    title: "",
    initialData: null,
    onSave: () => {},
  });

  const [issueModal, setIssueModal] = useState<IssueModalState>({
    isOpen: false,
    title: "",
    initialIssue: null,
    onSave: () => {},
  });

  const [confirm, setConfirm] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // localStorage から読み込み
  useEffect(() => {
    const stored = loadFromStorage();
    setCategories(stored);
    setIsLoaded(true);
  }, []);

  // localStorage へ保存
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(categories);
    }
  }, [categories, isLoaded]);

  const updateCategories = useCallback((updater: (prev: Category[]) => Category[]) => {
    setCategories(updater);
  }, []);

  const showConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirm({ isOpen: true, title, message, onConfirm });
  };

  const openCatModal = (
    title: string,
    initialData: { name: string; description: string } | null,
    onSave: (data: { name: string; description: string }) => void
  ) => {
    setCatModal({ isOpen: true, title, initialData, onSave });
  };

  const openIssueModal = (
    title: string,
    initialIssue: Issue | null,
    onSave: (issue: Issue) => void
  ) => {
    setIssueModal({ isOpen: true, title, initialIssue, onSave });
  };

  // --- カテゴリー CRUD ---
  const handleAddCategory = () => {
    openCatModal("大カテゴリーを追加", null, (data) => {
      updateCategories((prev) => [
        ...prev,
        { id: generateId(), ...data, children: [] },
      ]);
    });
  };

  const handleEditCategory = (cat: Category) => {
    openCatModal(
      "大カテゴリーを編集",
      { name: cat.name, description: cat.description },
      (data) => {
        updateCategories((prev) =>
          prev.map((c) => (c.id === cat.id ? { ...c, ...data } : c))
        );
      }
    );
  };

  const handleDeleteCategory = (id: string) => {
    showConfirm(
      "大カテゴリーを削除",
      "この大カテゴリーと配下のすべてのデータが削除されます。この操作は取り消せません。",
      () => {
        updateCategories((prev) => prev.filter((c) => c.id !== id));
      }
    );
  };

  const handleDuplicateCategory = (cat: Category) => {
    const deepClone = (obj: Category): Category =>
      JSON.parse(JSON.stringify({ ...obj, id: generateId(), name: `${obj.name}（コピー）` }));
    updateCategories((prev) => [...prev, deepClone(cat)]);
  };

  // --- 小カテゴリー CRUD ---
  const handleAddSubCategory = (categoryId: string) => {
    openCatModal("小カテゴリーを追加", null, (data) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: [
                  ...c.children,
                  { id: generateId(), ...data, industries: [] },
                ],
              }
            : c
        )
      );
    });
  };

  const handleEditSubCategory = (categoryId: string, sub: SubCategory) => {
    openCatModal(
      "小カテゴリーを編集",
      { name: sub.name, description: sub.description },
      (data) => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === sub.id ? { ...s, ...data } : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  const handleDeleteSubCategory = (categoryId: string, subId: string) => {
    showConfirm(
      "小カテゴリーを削除",
      "この小カテゴリーと配下のすべてのデータが削除されます。",
      () => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? { ...c, children: c.children.filter((s) => s.id !== subId) }
              : c
          )
        );
      }
    );
  };

  // --- 業種 CRUD ---
  const handleAddIndustry = (categoryId: string, subId: string) => {
    openCatModal("業種を追加", null, (data) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: [
                          ...s.industries,
                          { id: generateId(), ...data, customerTypes: [] },
                        ],
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  const handleEditIndustry = (
    categoryId: string,
    subId: string,
    industry: Industry
  ) => {
    openCatModal(
      "業種を編集",
      { name: industry.name, description: industry.description },
      (data) => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === subId
                      ? {
                          ...s,
                          industries: s.industries.map((ind) =>
                            ind.id === industry.id ? { ...ind, ...data } : ind
                          ),
                        }
                      : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  const handleDeleteIndustry = (
    categoryId: string,
    subId: string,
    industryId: string
  ) => {
    showConfirm("業種を削除", "この業種と配下のすべてのデータが削除されます。", () => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.filter(
                          (ind) => ind.id !== industryId
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  // --- 顧客タイプ CRUD ---
  const handleAddCustomerType = (
    categoryId: string,
    subId: string,
    industryId: string
  ) => {
    openCatModal("顧客タイプを追加", null, (data) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.map((ind) =>
                          ind.id === industryId
                            ? {
                                ...ind,
                                customerTypes: [
                                  ...ind.customerTypes,
                                  { id: generateId(), ...data, needs: [] },
                                ],
                              }
                            : ind
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  const handleEditCustomerType = (
    categoryId: string,
    subId: string,
    industryId: string,
    ct: CustomerType
  ) => {
    openCatModal(
      "顧客タイプを編集",
      { name: ct.name, description: ct.description },
      (data) => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === subId
                      ? {
                          ...s,
                          industries: s.industries.map((ind) =>
                            ind.id === industryId
                              ? {
                                  ...ind,
                                  customerTypes: ind.customerTypes.map(
                                    (t) => (t.id === ct.id ? { ...t, ...data } : t)
                                  ),
                                }
                              : ind
                          ),
                        }
                      : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  const handleDeleteCustomerType = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string
  ) => {
    showConfirm(
      "顧客タイプを削除",
      "この顧客タイプと配下のすべてのデータが削除されます。",
      () => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === subId
                      ? {
                          ...s,
                          industries: s.industries.map((ind) =>
                            ind.id === industryId
                              ? {
                                  ...ind,
                                  customerTypes: ind.customerTypes.filter(
                                    (t) => t.id !== ctId
                                  ),
                                }
                              : ind
                          ),
                        }
                      : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  // --- 必要サービス CRUD ---
  const handleAddNeed = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string
  ) => {
    openCatModal("必要サービスを追加", null, (data) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.map((ind) =>
                          ind.id === industryId
                            ? {
                                ...ind,
                                customerTypes: ind.customerTypes.map((ct) =>
                                  ct.id === ctId
                                    ? {
                                        ...ct,
                                        needs: [
                                          ...ct.needs,
                                          {
                                            id: generateId(),
                                            ...data,
                                            issues: [],
                                          },
                                        ],
                                      }
                                    : ct
                                ),
                              }
                            : ind
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  const handleEditNeed = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    need: Need
  ) => {
    openCatModal(
      "必要サービスを編集",
      { name: need.name, description: need.description },
      (data) => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === subId
                      ? {
                          ...s,
                          industries: s.industries.map((ind) =>
                            ind.id === industryId
                              ? {
                                  ...ind,
                                  customerTypes: ind.customerTypes.map((ct) =>
                                    ct.id === ctId
                                      ? {
                                          ...ct,
                                          needs: ct.needs.map((n) =>
                                            n.id === need.id
                                              ? { ...n, ...data }
                                              : n
                                          ),
                                        }
                                      : ct
                                  ),
                                }
                              : ind
                          ),
                        }
                      : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  const handleDeleteNeed = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string
  ) => {
    showConfirm(
      "必要サービスを削除",
      "この必要サービスと配下のすべての課題が削除されます。",
      () => {
        updateCategories((prev) =>
          prev.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  children: c.children.map((s) =>
                    s.id === subId
                      ? {
                          ...s,
                          industries: s.industries.map((ind) =>
                            ind.id === industryId
                              ? {
                                  ...ind,
                                  customerTypes: ind.customerTypes.map((ct) =>
                                    ct.id === ctId
                                      ? {
                                          ...ct,
                                          needs: ct.needs.filter(
                                            (n) => n.id !== needId
                                          ),
                                        }
                                      : ct
                                  ),
                                }
                              : ind
                          ),
                        }
                      : s
                  ),
                }
              : c
          )
        );
      }
    );
  };

  // --- 課題 CRUD ---
  const handleAddIssue = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string
  ) => {
    openIssueModal("課題を追加", null, (issue) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.map((ind) =>
                          ind.id === industryId
                            ? {
                                ...ind,
                                customerTypes: ind.customerTypes.map((ct) =>
                                  ct.id === ctId
                                    ? {
                                        ...ct,
                                        needs: ct.needs.map((n) =>
                                          n.id === needId
                                            ? {
                                                ...n,
                                                issues: [...n.issues, issue],
                                              }
                                            : n
                                        ),
                                      }
                                    : ct
                                ),
                              }
                            : ind
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  const handleEditIssue = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string,
    issue: Issue
  ) => {
    openIssueModal("課題を編集", issue, (updated) => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.map((ind) =>
                          ind.id === industryId
                            ? {
                                ...ind,
                                customerTypes: ind.customerTypes.map((ct) =>
                                  ct.id === ctId
                                    ? {
                                        ...ct,
                                        needs: ct.needs.map((n) =>
                                          n.id === needId
                                            ? {
                                                ...n,
                                                issues: n.issues.map((i) =>
                                                  i.id === issue.id
                                                    ? updated
                                                    : i
                                                ),
                                              }
                                            : n
                                        ),
                                      }
                                    : ct
                                ),
                              }
                            : ind
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  const handleDeleteIssue = (
    categoryId: string,
    subId: string,
    industryId: string,
    ctId: string,
    needId: string,
    issueId: string
  ) => {
    showConfirm("課題を削除", "この課題を削除します。この操作は取り消せません。", () => {
      updateCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                children: c.children.map((s) =>
                  s.id === subId
                    ? {
                        ...s,
                        industries: s.industries.map((ind) =>
                          ind.id === industryId
                            ? {
                                ...ind,
                                customerTypes: ind.customerTypes.map((ct) =>
                                  ct.id === ctId
                                    ? {
                                        ...ct,
                                        needs: ct.needs.map((n) =>
                                          n.id === needId
                                            ? {
                                                ...n,
                                                issues: n.issues.filter(
                                                  (i) => i.id !== issueId
                                                ),
                                              }
                                            : n
                                        ),
                                      }
                                    : ct
                                ),
                              }
                            : ind
                        ),
                      }
                    : s
                ),
              }
            : c
        )
      );
    });
  };

  // テーブルビュー用の課題編集（FlatIssueRowから）
  const handleEditIssueFromRow = (row: FlatIssueRow) => {
    handleEditIssue(
      row.categoryId,
      row.subCategoryId,
      row.industryId,
      row.customerTypeId,
      row.needId,
      row.issue
    );
  };

  const handleLoadSampleData = () => {
    showConfirm(
      "サンプルデータを読み込む",
      "現在のデータにサンプルデータを追加します。既存データは保持されます。",
      () => {
        updateCategories((prev) => [...prev, ...createSampleData()]);
      }
    );
  };

  const handleDeleteAll = () => {
    showConfirm(
      "全データを削除",
      "すべてのデータが削除されます。この操作は取り消せません。本当に削除しますか？",
      () => {
        updateCategories(() => []);
      }
    );
  };

  const allRows = flattenIssues(categories);
  const filteredRows = filterIssues(allRows, filters);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 操作ボタン */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            新規カテゴリー追加
          </button>
          <button
            onClick={handleLoadSampleData}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Database className="w-4 h-4" />
            サンプルデータ読み込み
          </button>
          <JsonImportExport
            categories={categories}
            onImport={(data) => {
              updateCategories(() => data);
            }}
          />
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            全データ削除
          </button>
        </div>

        {/* ダッシュボード統計 */}
        <div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1"
          >
            {showStats ? "▾" : "▸"} ダッシュボード統計
          </button>
          {showStats && <DashboardStats categories={categories} />}
        </div>

        {/* フィルター & 表示切り替え */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 w-full">
            <FilterBar
              filters={filters}
              onChange={setFilters}
              categories={categories}
            />
          </div>
          <ViewSwitcher current={view} onChange={setView} />
        </div>

        {/* メインコンテンツ */}
        {view === "mindmap" && (
          <MindMapView
            categories={categories}
            onAddSubCategory={handleAddSubCategory}
            onAddIndustry={handleAddIndustry}
            onAddCustomerType={handleAddCustomerType}
            onAddNeed={handleAddNeed}
            onAddIssue={handleAddIssue}
            onEditCategory={handleEditCategory}
            onEditSubCategory={handleEditSubCategory}
            onEditIndustry={handleEditIndustry}
            onEditCustomerType={handleEditCustomerType}
            onEditNeed={handleEditNeed}
            onEditIssue={handleEditIssue}
            onDeleteCategory={handleDeleteCategory}
            onDeleteSubCategory={handleDeleteSubCategory}
            onDeleteIndustry={handleDeleteIndustry}
            onDeleteCustomerType={handleDeleteCustomerType}
            onDeleteNeed={handleDeleteNeed}
            onDeleteIssue={handleDeleteIssue}
            onDuplicateCategory={handleDuplicateCategory}
          />
        )}

        {view === "table" && (
          <TableView rows={filteredRows} onEditIssue={handleEditIssueFromRow} />
        )}

        {view === "card" && <IndustryCardView categories={categories} />}
      </main>

      {/* モーダル群 */}
      <CategoryFormModal
        isOpen={catModal.isOpen}
        onClose={() => setCatModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={catModal.onSave}
        title={catModal.title}
        initialData={catModal.initialData}
      />

      <IssueFormModal
        isOpen={issueModal.isOpen}
        onClose={() => setIssueModal((prev) => ({ ...prev, isOpen: false }))}
        onSave={issueModal.onSave}
        initialIssue={issueModal.initialIssue}
        title={issueModal.title}
      />

      <ConfirmDialog
        isOpen={confirm.isOpen}
        title={confirm.title}
        message={confirm.message}
        onConfirm={() => {
          confirm.onConfirm();
          setConfirm((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => setConfirm((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
