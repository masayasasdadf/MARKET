"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface FormData {
  name: string;
  description: string;
}

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  title: string;
  initialData?: FormData | null;
  namePlaceholder?: string;
  descPlaceholder?: string;
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  title,
  initialData,
  namePlaceholder = "名前を入力",
  descPlaceholder = "説明（任意）",
}: CategoryFormModalProps) {
  const [data, setData] = useState<FormData>({ name: "", description: "" });
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setData(initialData ?? { name: "", description: "" });
      setNameError("");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!data.name.trim()) {
      setNameError("名前は必須です");
      return;
    }
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => {
                setData((d) => ({ ...d, name: e.target.value }));
                setNameError("");
              }}
              placeholder={namePlaceholder}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                nameError ? "border-red-400" : "border-gray-300"
              }`}
              autoFocus
            />
            {nameError && (
              <p className="text-xs text-red-500 mt-1">{nameError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              value={data.description}
              onChange={(e) =>
                setData((d) => ({ ...d, description: e.target.value }))
              }
              placeholder={descPlaceholder}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
