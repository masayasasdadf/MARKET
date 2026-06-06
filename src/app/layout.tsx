import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Industry Issue Map",
  description:
    "業種別の課題・必要サービス・提案商材を整理するマーケティング戦略マップ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
