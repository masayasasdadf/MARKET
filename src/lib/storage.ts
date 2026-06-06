import type { Category } from "./types";

const STORAGE_KEY = "industry-issue-map-data";

export function loadFromStorage(): Category[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

export function saveToStorage(categories: Category[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch {
    // ignore quota errors
  }
}

export function exportJSON(categories: Category[]): void {
  const blob = new Blob([JSON.stringify(categories, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `industry-issue-map-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File): Promise<Category[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as Category[];
        resolve(data);
      } catch {
        reject(new Error("JSONの解析に失敗しました"));
      }
    };
    reader.onerror = () => reject(new Error("ファイルの読み込みに失敗しました"));
    reader.readAsText(file);
  });
}
