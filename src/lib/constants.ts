import type { IssueTemplate } from "./types";

export const AKATSUKI_SERVICES = [
  "ReviewMaster",
  "MEO対策",
  "SEO記事制作",
  "ローカルSEO",
  "Web広告運用",
  "Google広告運用",
  "Instagram運用代行",
  "TikTok運用代行",
  "LINE公式アカウント構築",
  "LP制作",
  "ホームページ制作",
  "採用LP制作",
  "ブランディング支援",
  "3C分析",
  "STP分析",
  "市場調査",
  "生成AI活用支援",
  "業務効率化支援",
  "CRM導入支援",
  "フォーム改善",
  "口コミ返信代行",
  "SNSショート動画制作",
] as const;

export const SEVERITY_LABELS: Record<string, string> = {
  low: "低",
  medium: "中",
  high: "高",
  critical: "重大",
};

export const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200",
};

export const SEVERITY_BORDER_COLORS: Record<string, string> = {
  low: "border-l-green-400",
  medium: "border-l-yellow-400",
  high: "border-l-orange-400",
  critical: "border-l-red-500",
};

export const BUDGET_LABELS: Record<string, string> = {
  low: "低",
  medium: "中",
  high: "高",
  unknown: "不明",
};

export const SALES_PRIORITY_LABELS: Record<string, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

export const SALES_PRIORITY_COLORS: Record<string, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-purple-100 text-purple-700",
};

export const ISSUE_TEMPLATES: IssueTemplate[] = [
  {
    id: "collection",
    name: "集客課題",
    title: "新規集客が伸び悩んでいる",
    description:
      "新規顧客の獲得が難しく、既存顧客への依存度が高い。広告費をかけても費用対効果が見えにくい状況。",
    akatsukiServices: ["MEO対策", "Google広告運用", "LP制作", "Web広告運用"],
    seoKeywords: ["集客方法", "新規顧客獲得", "広告効果"],
  },
  {
    id: "review",
    name: "口コミ課題",
    title: "Google口コミが少なく競合に負けている",
    description:
      "口コミ数が競合より少なく、Googleマップでの順位が低い。悪い口コミへの返信もできていない。",
    akatsukiServices: ["ReviewMaster", "MEO対策", "口コミ返信代行"],
    seoKeywords: ["口コミ増やし方", "Google口コミ", "MEO対策"],
  },
  {
    id: "recruitment",
    name: "採用課題",
    title: "スタッフ・人材が採用できない",
    description:
      "求人を出しても応募が来ない。採用ページが弱く、会社の魅力が伝わっていない。",
    akatsukiServices: ["採用LP制作", "Web広告運用", "ブランディング支援"],
    seoKeywords: ["採用強化", "求人効果改善", "採用ページ"],
  },
  {
    id: "repeat",
    name: "リピート課題",
    title: "リピート率が低く新規依存になっている",
    description:
      "一度来た顧客が戻ってこない。フォローアップの仕組みがなく、常連客の育成ができていない。",
    akatsukiServices: [
      "LINE公式アカウント構築",
      "CRM導入支援",
      "フォーム改善",
    ],
    seoKeywords: ["リピーター獲得", "顧客維持", "再来店促進"],
  },
  {
    id: "price",
    name: "単価課題",
    title: "客単価が上がらず利益率が低い",
    description:
      "価格競争に巻き込まれており、高単価メニューや自費サービスへの誘導ができていない。",
    akatsukiServices: ["ブランディング支援", "LP制作", "3C分析", "STP分析"],
    seoKeywords: ["単価アップ", "高単価商品", "利益改善"],
  },
  {
    id: "efficiency",
    name: "業務効率化課題",
    title: "業務が属人化しており効率が悪い",
    description:
      "特定のスタッフに業務が集中し、マニュアル化・システム化ができていない。",
    akatsukiServices: ["業務効率化支援", "生成AI活用支援", "CRM導入支援"],
    seoKeywords: ["業務効率化", "DX推進", "自動化"],
  },
  {
    id: "branding",
    name: "ブランディング課題",
    title: "競合との差別化ができておらず選ばれない",
    description:
      "他社との違いが伝わらず、価格以外の選ばれる理由がない。ブランドイメージが弱い。",
    akatsukiServices: [
      "ブランディング支援",
      "3C分析",
      "STP分析",
      "ホームページ制作",
    ],
    seoKeywords: ["ブランディング", "差別化戦略", "独自価値"],
  },
  {
    id: "ad-roas",
    name: "広告費用対効果課題",
    title: "広告費をかけているが成果が出ない",
    description:
      "広告を出しているが問い合わせや予約につながらない。費用対効果の計測ができていない。",
    akatsukiServices: [
      "Google広告運用",
      "Web広告運用",
      "LP制作",
      "フォーム改善",
    ],
    seoKeywords: ["広告効果改善", "ROAS改善", "広告費最適化"],
  },
  {
    id: "seo",
    name: "SEO課題",
    title: "検索エンジンからの流入が少ない",
    description:
      "ホームページへの自然検索流入が少なく、検索上位を競合に取られている。",
    akatsukiServices: ["SEO記事制作", "ローカルSEO", "MEO対策", "ホームページ制作"],
    seoKeywords: ["SEO対策", "検索上位表示", "コンテンツSEO"],
  },
  {
    id: "sns",
    name: "SNS運用課題",
    title: "SNS投稿が続かず集客につながらない",
    description:
      "InstagramやTikTokを始めたが投稿が続かない。フォロワーが増えず集客効果がない。",
    akatsukiServices: [
      "Instagram運用代行",
      "TikTok運用代行",
      "SNSショート動画制作",
    ],
    seoKeywords: ["Instagram集客", "SNS運用", "ショート動画マーケティング"],
  },
];
