"use client";

import { MapPin } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-3">
          <div className="flex items-center gap-2 text-blue-600">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              Industry Issue Map
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              業種別の課題・必要サービス・提案商材を整理するマーケティング戦略マップ
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
