import type { Category } from "./types";
import { generateId } from "./utils";

export function createSampleData(): Category[] {
  return [
    {
      id: generateId(),
      name: "店舗型ビジネス",
      description: "実店舗を構えて顧客に直接サービスを提供するビジネス",
      children: [
        {
          id: generateId(),
          name: "飲食・外食",
          description: "飲食店・レストラン・居酒屋など",
          industries: [
            {
              id: generateId(),
              name: "個人経営居酒屋",
              description: "個人オーナーが経営する居酒屋・小料理店",
              customerTypes: [
                {
                  id: generateId(),
                  name: "店舗オーナー",
                  description: "経営判断を行うオーナー",
                  needs: [
                    {
                      id: generateId(),
                      name: "集客",
                      description: "新規顧客を集める施策",
                      issues: [
                        {
                          id: generateId(),
                          title: "Google口コミが少ない",
                          description:
                            "Googleマップの口コミ数が競合店より少なく、新規顧客に信頼されにくい状況。来店客に口コミを依頼するノウハウもない。",
                          severity: "high",
                          budgetLevel: "low",
                          existingAlternatives: ["食べログ掲載", "ホットペッパー"],
                          solutions: [
                            "口コミ依頼の仕組み化",
                            "QRコードで口コミ誘導",
                            "ReviewMasterで口コミ管理",
                          ],
                          akatsukiServices: ["ReviewMaster", "MEO対策"],
                          salesCopy:
                            "口コミを増やして地域No.1店舗を目指しませんか？ReviewMasterで口コミ獲得を自動化します。",
                          seoKeywords: [
                            "居酒屋 口コミ 増やし方",
                            "Google口コミ 飲食店",
                            "MEO対策 居酒屋",
                          ],
                          adTargeting: [
                            "30-60代経営者",
                            "飲食店オーナー",
                            "個人事業主",
                          ],
                          salesPriority: "high",
                          memo: "口コミ数が10件未満の店舗が多く、即効性が高い",
                        },
                        {
                          id: generateId(),
                          title: "Instagram投稿が続かない",
                          description:
                            "Instagram集客を試みているが、投稿ネタがなくなり継続できない。フォロワーも増えず集客効果が見えない。",
                          severity: "medium",
                          budgetLevel: "medium",
                          existingAlternatives: ["自己流Instagram運用"],
                          solutions: [
                            "投稿テンプレート作成",
                            "運用代行依頼",
                            "月次コンテンツカレンダー作成",
                          ],
                          akatsukiServices: [
                            "Instagram運用代行",
                            "SNSショート動画制作",
                          ],
                          salesCopy:
                            "投稿ネタ切れ・更新停止から脱却。プロのInstagram運用で集客を自動化します。",
                          seoKeywords: [
                            "居酒屋 Instagram 集客",
                            "飲食店 SNS運用",
                            "Instagram 運用代行 飲食",
                          ],
                          adTargeting: ["飲食店経営者", "SNS集客に悩む店主"],
                          salesPriority: "medium",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "新規客が増えない",
                          description:
                            "常連客はいるが新規客が全く来ない。広告をどこに出せばよいかわからない。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: [
                            "ホットペッパー掲載",
                            "チラシ配布",
                          ],
                          solutions: [
                            "Google広告運用",
                            "MEO対策強化",
                            "LP制作で訴求強化",
                          ],
                          akatsukiServices: [
                            "Google広告運用",
                            "MEO対策",
                            "LP制作",
                          ],
                          salesCopy:
                            "新規客ゼロから脱却。Googleマップ×Web広告で毎月安定した新規来店を実現します。",
                          seoKeywords: [
                            "居酒屋 新規客 集客",
                            "飲食店 Web広告",
                            "居酒屋 集客方法",
                          ],
                          adTargeting: ["飲食店オーナー", "個人経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                    {
                      id: generateId(),
                      name: "採用",
                      description: "スタッフ採用・求人施策",
                      issues: [
                        {
                          id: generateId(),
                          title: "アルバイトが採用できない",
                          description:
                            "求人サイトに掲載しても応募が来ない。採用コストが上昇している。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: ["Indeed掲載", "バイトル掲載"],
                          solutions: [
                            "採用LP制作",
                            "SNS採用広告",
                            "求人ページ改善",
                          ],
                          akatsukiServices: ["採用LP制作", "Web広告運用"],
                          salesCopy:
                            "求人費ゼロで応募を増やす。採用LPと広告で優秀なスタッフを集めます。",
                          seoKeywords: [
                            "居酒屋 アルバイト 採用",
                            "飲食店 求人 コスト削減",
                          ],
                          adTargeting: ["飲食店経営者", "採用担当者"],
                          salesPriority: "medium",
                          memo: "",
                        },
                      ],
                    },
                    {
                      id: generateId(),
                      name: "リピート施策",
                      description: "既存顧客のリピート促進",
                      issues: [
                        {
                          id: generateId(),
                          title: "常連客に依存している",
                          description:
                            "売上の8割が常連客。新規客が再来店しない仕組みになっている。",
                          severity: "medium",
                          budgetLevel: "low",
                          existingAlternatives: ["スタンプカード"],
                          solutions: [
                            "LINE公式アカウント構築",
                            "メルマガ配信",
                            "リピート特典設計",
                          ],
                          akatsukiServices: [
                            "LINE公式アカウント構築",
                            "CRM導入支援",
                          ],
                          salesCopy:
                            "一度来たお客様を常連に。LINE公式アカウントで再来店率を高めます。",
                          seoKeywords: [
                            "飲食店 リピーター 増やし方",
                            "居酒屋 LINE 集客",
                          ],
                          adTargeting: ["飲食店経営者"],
                          salesPriority: "medium",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: generateId(),
          name: "美容・健康",
          description: "美容室・エステ・整体など美容・健康関連店舗",
          industries: [
            {
              id: generateId(),
              name: "美容室",
              description: "ヘアカット・カラー・パーマ等のヘアサロン",
              customerTypes: [
                {
                  id: generateId(),
                  name: "サロンオーナー",
                  description: "美容室経営者・店長",
                  needs: [
                    {
                      id: generateId(),
                      name: "集客・予約獲得",
                      description: "新規客獲得と予約数増加",
                      issues: [
                        {
                          id: generateId(),
                          title: "新規予約がホットペッパーに依存している",
                          description:
                            "ホットペッパービューティーへの掲載費が高く、手数料も多い。自社集客ができていない。",
                          severity: "critical",
                          budgetLevel: "high",
                          existingAlternatives: [
                            "ホットペッパービューティー",
                            "ミニモ",
                          ],
                          solutions: [
                            "自社サイトSEO強化",
                            "MEO対策",
                            "Google広告運用",
                          ],
                          akatsukiServices: [
                            "MEO対策",
                            "Google広告運用",
                            "ローカルSEO",
                          ],
                          salesCopy:
                            "ホットペッパー依存から脱却。自社集客で手数料ゼロの予約を増やします。",
                          seoKeywords: [
                            "美容室 ホットペッパー 脱却",
                            "美容室 自社集客",
                            "美容室 MEO対策",
                          ],
                          adTargeting: ["美容室オーナー", "サロン経営者"],
                          salesPriority: "high",
                          memo: "ホットペッパー離脱後の集客設計が必要",
                        },
                        {
                          id: generateId(),
                          title: "Google口コミが少ない",
                          description:
                            "口コミ数が少なくGoogleマップで競合に負けている。",
                          severity: "high",
                          budgetLevel: "low",
                          existingAlternatives: ["ホットペッパー口コミ"],
                          solutions: ["ReviewMasterで口コミ自動化", "MEO対策"],
                          akatsukiServices: ["ReviewMaster", "MEO対策"],
                          salesCopy:
                            "口コミを増やしてGoogleマップ上位表示。新規予約を自動増加させます。",
                          seoKeywords: [
                            "美容室 Google口コミ",
                            "サロン MEO対策",
                          ],
                          adTargeting: ["美容室経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "Instagramから予約につながらない",
                          description:
                            "フォロワーはいるが予約に転換できていない。投稿の質・予約導線が弱い。",
                          severity: "medium",
                          budgetLevel: "medium",
                          existingAlternatives: ["自己流Instagram運用"],
                          solutions: ["Instagram運用代行", "予約導線改善"],
                          akatsukiServices: [
                            "Instagram運用代行",
                            "フォーム改善",
                          ],
                          salesCopy:
                            "「いいね」を予約に変える。Instagram×予約導線設計で売上直結の運用を。",
                          seoKeywords: [
                            "美容室 Instagram 予約",
                            "サロン SNS集客",
                          ],
                          adTargeting: ["美容室オーナー"],
                          salesPriority: "medium",
                          memo: "",
                        },
                      ],
                    },
                    {
                      id: generateId(),
                      name: "採用",
                      description: "美容師・スタッフ採用",
                      issues: [
                        {
                          id: generateId(),
                          title: "スタッフ採用が難しい",
                          description:
                            "美容師不足で求人を出しても応募が来ない。給与・待遇面での競合が激しい。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: [
                            "求人誌掲載",
                            "美容師専門求人サイト",
                          ],
                          solutions: ["採用LP制作", "SNS採用広告", "ブランディング強化"],
                          akatsukiServices: [
                            "採用LP制作",
                            "ブランディング支援",
                          ],
                          salesCopy:
                            "働きたいサロンNo.1へ。採用LPとブランディングで美容師が集まる職場を作ります。",
                          seoKeywords: [
                            "美容師 求人 集客",
                            "サロン 採用強化",
                          ],
                          adTargeting: ["美容室経営者", "採用担当者"],
                          salesPriority: "medium",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: generateId(),
              name: "整体・整骨院",
              description: "整体院・整骨院・接骨院",
              customerTypes: [
                {
                  id: generateId(),
                  name: "院長・経営者",
                  description: "整体院・整骨院の経営者",
                  needs: [
                    {
                      id: generateId(),
                      name: "地域集客",
                      description: "地域での認知拡大と新患獲得",
                      issues: [
                        {
                          id: generateId(),
                          title: "地域検索で上位表示されない",
                          description:
                            "「地域名 整体」で検索しても上位に表示されない。競合院がGoogleマップを活用している。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: ["チラシ配布", "タウンワーク"],
                          solutions: ["MEO対策", "ローカルSEO", "口コミ獲得"],
                          akatsukiServices: [
                            "MEO対策",
                            "ローカルSEO",
                            "ReviewMaster",
                          ],
                          salesCopy:
                            "「地域名 整体」で1位表示。Googleマップから毎月新患を獲得します。",
                          seoKeywords: [
                            "整体 地域名 集客",
                            "整骨院 MEO対策",
                            "整体院 新患獲得",
                          ],
                          adTargeting: ["整体院経営者", "整骨院院長"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "初回クーポン客ばかりで定着しない",
                          description:
                            "グルーポンや初回割引で来院するが2回目以降に来ない。リピート設計ができていない。",
                          severity: "high",
                          budgetLevel: "low",
                          existingAlternatives: ["グルーポン", "クーポンサイト"],
                          solutions: [
                            "LINE公式アカウント構築",
                            "リピートプログラム設計",
                            "CRM導入",
                          ],
                          akatsukiServices: [
                            "LINE公式アカウント構築",
                            "CRM導入支援",
                          ],
                          salesCopy:
                            "クーポン客を常連患者に変える。LINE×リピート設計で安定経営を実現します。",
                          seoKeywords: [
                            "整体 リピーター 増やし方",
                            "整骨院 定着率",
                          ],
                          adTargeting: ["整体院経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: generateId(),
          name: "医療・クリニック",
          description: "歯科・内科・クリニックなど医療機関",
          industries: [
            {
              id: generateId(),
              name: "歯科医院",
              description: "一般歯科・矯正歯科・審美歯科",
              customerTypes: [
                {
                  id: generateId(),
                  name: "院長・理事長",
                  description: "歯科医院経営者",
                  needs: [
                    {
                      id: generateId(),
                      name: "新患獲得・集患",
                      description: "新規患者の獲得",
                      issues: [
                        {
                          id: generateId(),
                          title: "新患が増えない",
                          description:
                            "既存患者の定期検診はあるが新患が増えず、売上が伸びない。",
                          severity: "high",
                          budgetLevel: "high",
                          existingAlternatives: [
                            "地域広告",
                            "紹介患者のみ",
                          ],
                          solutions: ["MEO対策", "Web広告", "SEO記事制作"],
                          akatsukiServices: [
                            "MEO対策",
                            "Google広告運用",
                            "SEO記事制作",
                          ],
                          salesCopy:
                            "毎月安定した新患獲得を実現。MEO×Web広告で地域一番院へ。",
                          seoKeywords: [
                            "歯科 新患獲得",
                            "歯医者 集患方法",
                            "歯科医院 MEO",
                          ],
                          adTargeting: ["歯科院長", "歯科医院経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "自費診療の訴求が弱い",
                          description:
                            "矯正・ホワイトニングなど自費診療があるが患者への訴求ができていない。",
                          severity: "high",
                          budgetLevel: "high",
                          existingAlternatives: ["院内ポスター", "口頭説明"],
                          solutions: [
                            "自費診療LP制作",
                            "SNS訴求",
                            "ビフォーアフター掲載",
                          ],
                          akatsukiServices: ["LP制作", "Instagram運用代行"],
                          salesCopy:
                            "自費診療の患者数を3倍に。専用LPとSNSで矯正・審美の問い合わせを増やします。",
                          seoKeywords: [
                            "歯科 自費診療 集患",
                            "矯正歯科 Web集客",
                            "ホワイトニング 広告",
                          ],
                          adTargeting: ["歯科院長", "矯正担当医"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "口コミが増えない・悪い口コミが放置されている",
                          description:
                            "Google口コミが少なく、稀に来る悪い口コミへの返信ができていない。",
                          severity: "critical",
                          budgetLevel: "low",
                          existingAlternatives: ["対応なし"],
                          solutions: [
                            "ReviewMasterで口コミ管理",
                            "口コミ返信代行",
                          ],
                          akatsukiServices: [
                            "ReviewMaster",
                            "口コミ返信代行",
                            "MEO対策",
                          ],
                          salesCopy:
                            "悪い口コミを放置しない。ReviewMasterで評判を守り、新患を呼び込みます。",
                          seoKeywords: [
                            "歯科 口コミ 増やし方",
                            "歯医者 Google口コミ",
                          ],
                          adTargeting: ["歯科医院経営者"],
                          salesPriority: "high",
                          memo: "医療機関は特に口コミの影響が大きい",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: generateId(),
              name: "クリニック（内科・皮膚科等）",
              description: "内科・皮膚科・耳鼻科などの一般クリニック",
              customerTypes: [
                {
                  id: generateId(),
                  name: "院長",
                  description: "クリニック経営者",
                  needs: [
                    {
                      id: generateId(),
                      name: "オンライン集患",
                      description: "Web経由での患者獲得",
                      issues: [
                        {
                          id: generateId(),
                          title: "Googleマップで競合に負けている",
                          description:
                            "地域検索でライバルクリニックより順位が低く、新患が来ない。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: ["エムスリー掲載"],
                          solutions: ["MEO対策", "口コミ獲得施策"],
                          akatsukiServices: ["MEO対策", "ReviewMaster"],
                          salesCopy:
                            "「地域名 内科」で1位へ。Googleマップ最適化で新患獲得を加速します。",
                          seoKeywords: [
                            "クリニック MEO対策",
                            "内科 Googleマップ 上位",
                          ],
                          adTargeting: ["クリニック院長"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: generateId(),
          name: "買取・リユース",
          description: "買取専門店・リサイクルショップ",
          industries: [
            {
              id: generateId(),
              name: "買取店",
              description: "ブランド品・家電・金・貴金属などの買取専門店",
              customerTypes: [
                {
                  id: generateId(),
                  name: "店長・経営者",
                  description: "買取店の経営者・店長",
                  needs: [
                    {
                      id: generateId(),
                      name: "持ち込み集客",
                      description: "買取依頼の集客",
                      issues: [
                        {
                          id: generateId(),
                          title: "競合比較で選ばれない",
                          description:
                            "価格比較サイトや他店との差別化ができておらず、選ばれる理由がない。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: [
                            "価格比較サイト掲載",
                            "チラシ",
                          ],
                          solutions: [
                            "差別化訴求LP制作",
                            "口コミ強化",
                            "ブランディング",
                          ],
                          akatsukiServices: [
                            "LP制作",
                            "ReviewMaster",
                            "ブランディング支援",
                          ],
                          salesCopy:
                            "「高く買ってくれる店」として地域No.1に。口コミ×LPで選ばれる買取店を作ります。",
                          seoKeywords: [
                            "買取店 差別化",
                            "ブランド買取 地域 集客",
                          ],
                          adTargeting: ["買取店経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "地域名検索で上位表示されない",
                          description:
                            "「地域名 買取」で検索しても上位に出てこない。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: ["フリーペーパー広告"],
                          solutions: ["MEO対策", "ローカルSEO", "Google広告"],
                          akatsukiServices: [
                            "MEO対策",
                            "ローカルSEO",
                            "Google広告運用",
                          ],
                          salesCopy:
                            "地域検索で1位表示を実現。MEO×ローカルSEOで持ち込み買取を増やします。",
                          seoKeywords: [
                            "買取店 MEO対策",
                            "買取 地域検索 上位",
                            "ローカルSEO 買取",
                          ],
                          adTargeting: ["買取店オーナー"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: generateId(),
          name: "自動車関連",
          description: "中古車販売・整備・車検など自動車関連サービス",
          industries: [
            {
              id: generateId(),
              name: "中古車販売店",
              description: "中古自動車の販売・買取を行う店舗",
              customerTypes: [
                {
                  id: generateId(),
                  name: "店長・経営者",
                  description: "中古車販売店の経営者",
                  needs: [
                    {
                      id: generateId(),
                      name: "在庫車両の問い合わせ獲得",
                      description: "在庫車両への問い合わせ・来店促進",
                      issues: [
                        {
                          id: generateId(),
                          title:
                            "カーセンサー・グーネット依存で自社集客できない",
                          description:
                            "大手媒体への掲載費が高く、自社サイトからの問い合わせがほぼない。",
                          severity: "critical",
                          budgetLevel: "high",
                          existingAlternatives: [
                            "カーセンサー",
                            "グーネット",
                          ],
                          solutions: [
                            "自社サイトSEO強化",
                            "Google広告運用",
                            "SNS運用",
                          ],
                          akatsukiServices: [
                            "ローカルSEO",
                            "Google広告運用",
                            "SNSショート動画制作",
                          ],
                          salesCopy:
                            "媒体依存から自社集客へ。Google広告×SEOで問い合わせを自社に取り戻します。",
                          seoKeywords: [
                            "中古車 自社集客",
                            "中古車販売 Web広告",
                            "カーセンサー 脱却",
                          ],
                          adTargeting: ["中古車販売店経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                        {
                          id: generateId(),
                          title: "口コミが少なく信頼されにくい",
                          description:
                            "高額商品のため口コミの信頼性が重要だが、口コミが少ない。",
                          severity: "high",
                          budgetLevel: "low",
                          existingAlternatives: ["自然な口コミのみ"],
                          solutions: [
                            "ReviewMasterで口コミ促進",
                            "納車後フォロー施策",
                          ],
                          akatsukiServices: ["ReviewMaster", "MEO対策"],
                          salesCopy:
                            "口コミで信頼を獲得。高額商品だからこそ、口コミ数が成約率に直結します。",
                          seoKeywords: [
                            "中古車 口コミ 増やし方",
                            "中古車販売 Google口コミ",
                          ],
                          adTargeting: ["中古車販売店経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: generateId(),
              name: "整備工場",
              description: "自動車整備・車検・修理を行う整備工場",
              customerTypes: [
                {
                  id: generateId(),
                  name: "工場長・経営者",
                  description: "整備工場の経営者・工場長",
                  needs: [
                    {
                      id: generateId(),
                      name: "車検・整備予約獲得",
                      description: "車検・定期整備の予約獲得",
                      issues: [
                        {
                          id: generateId(),
                          title: "車検予約が増えない",
                          description:
                            "ディーラーや大手チェーンに顧客を取られており、車検予約が伸びない。",
                          severity: "high",
                          budgetLevel: "medium",
                          existingAlternatives: ["コバックなど大手加盟"],
                          solutions: ["車検LP制作", "MEO対策", "Google広告"],
                          akatsukiServices: [
                            "MEO対策",
                            "LP制作",
                            "Google広告運用",
                          ],
                          salesCopy:
                            "車検予約を自社で獲得。MEO×専用LPで地域の車検需要を取り込みます。",
                          seoKeywords: [
                            "車検 予約 地域名",
                            "整備工場 集客",
                            "車検 安い 地域",
                          ],
                          adTargeting: ["整備工場経営者"],
                          salesPriority: "high",
                          memo: "",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
