export interface ContentItem {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  description: string;
  isPremium: boolean;
  keyTakeaways?: string[]; // 編集部による要点解説
  sourceUrl?: string;      // 元記事のURL
  fullContent?: string;    // 記事本文（モック用）
  type?: 'needs' | 'seeds' | 'general'; // 記事タイプ
  likes?: number;
  saves?: number;
}

export const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "【経産省】BCPガイドライン改定｜中小企業の補助金要件が厳格化、3月末までの対応必須",
    author: "Resilience Hub Editorial",
    date: "2026年1月12日 10:00",
    image: "/images/impact-fund.jpg",
    category: "制度・補助金・法対応",
    description: "経済産業省が事業継続力強化計画の認定基準を改定。ものづくり補助金などの加点要件に関わる重要変更。",
    isPremium: true,
    type: 'general',
    likes: 124,
    saves: 45,
    keyTakeaways: [
      "認定基準に「サイバーセキュリティ対策」が必須項目として追加",
      "未対応の場合、来年度の補助金採択率が大幅に低下するリスク",
      "ものづくり補助金・IT導入補助金の申請を予定している全中小企業が対象"
    ],
    sourceUrl: "https://www.meti.go.jp/policy/mono_info_service/mono/toushin/index.html",
    fullContent: `
      <div class="space-y-8">
        <section>
          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">概要と背景: なぜ今それが重要なのか</h3>
          <p class="text-gray-300 leading-relaxed">
            近年、中小企業を標的としたランサムウェア被害が急増しており、サプライチェーン全体への影響が深刻化しています。これを受け、経済産業省は「事業継続力強化計画」の認定基準を見直し、従来の自然災害対策に加え、サイバー攻撃への対策を必須要件とする改定を行いました。この変更は2026年4月1日申請分より適用されます。
          </p>
        </section>\n\n        <section>\n          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">詳細データ</h3>\n          <div class="bg-white/5 rounded-lg p-4 border border-white/10">\n            <table class="w-full text-sm text-left text-gray-300">\n              <thead class="text-xs text-gray-400 uppercase bg-white/5">\n                <tr>\n                  <th class="px-4 py-3 rounded-tl-lg w-1/3">項目</th>\n                  <th class="px-4 py-3 rounded-tr-lg">内容</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr class="border-b border-white/5">\n                  <td class="px-4 py-3 font-medium text-white">具体的な数値</td>\n                  <td class="px-4 py-3">加点幅：最大+5点（審査基準による）</td>\n                </tr>\n                <tr class="border-b border-white/5">\n                  <td class="px-4 py-3 font-medium text-white">スペック</td>\n                  <td class="px-4 py-3">3-2-1ルールに基づくバックアップ体制</td>\n                </tr>\n                <tr class="border-b border-white/5">\n                  <td class="px-4 py-3 font-medium text-white">金額</td>\n                  <td class="px-4 py-3">補助上限額：1,000万円（ものづくり補助金）</td>\n                </tr>\n                <tr>\n                  <td class="px-4 py-3 font-medium text-white">日付</td>\n                  <td class="px-4 py-3">適用開始：2026年4月1日</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </section>\n\n\n\n        <section>\n          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">ビジネス影響: 企業のどの部門にどのような影響があるか</h3>        <ul class="list-disc list-inside space-y-2 text-gray-300">
            <li><strong class="text-white">補助金採択への影響：</strong> ものづくり補助金などで実施されている「認定企業への加点」を得るためには、新基準での認定が必須となります。</li>
            <li><strong class="text-white">システム投資の必要性：</strong> バックアップサーバーの導入やセキュリティソフトの更新など、追加のIT投資が必要になる可能性があります。</li>
          </ul>
        </section>

        <section>
          <div class="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              推奨アクション
            </h3>
            <ul class="space-y-3 text-gray-200">
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">即時</span>
                <span>現在の認定有効期限を確認し、3月末までの「駆け込み更新」が可能か検討する。</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">今週中</span>
                <span>情報システム担当者に対し、現状のバックアップ体制が新基準（3-2-1ルール等）を満たしているかヒアリングを行う。</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">来月中</span>
                <span>IPA（情報処理推進機構）が提供する「セキュリティアクション」の自己宣言を行い、基礎点を確保する。</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    `
  },
  {
    id: "2",
    title: "【規制緩和】ドローン「レベル4」飛行の承認要件が緩和｜過疎地での無人配送が実用段階へ",
    author: "Resilience Hub Editorial",
    date: "2026年1月11日 14:30",
    image: "/images/tech-drone.jpg",
    category: "ドローン・ロボティクス",
    description: "国土交通省が有人地帯での目視外飛行（レベル4）に関する審査基準を一部簡素化。物流クライシスへの切り札となるか。",
    isPremium: true,
    type: 'seeds',
    likes: 89,
    saves: 32,
    keyTakeaways: [
      "機体認証の手続き期間が従来の3ヶ月から最短1ヶ月に短縮",
      "物流コストの高騰に悩む地方自治体や小売業にとって、ドローン配送の導入ハードルが劇的に下がる",
      "物流事業者、地方自治体の防災担当、小売チェーンの物流部門"
    ],
    sourceUrl: "https://www.mlit.go.jp/koku/koku_tk10_000003.html",
    fullContent: `
      <div class="space-y-8">
        <section>
          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">概要と背景: なぜ今それが重要なのか</h3>
          <p class="text-gray-300 leading-relaxed">
            2024年問題以降、トラックドライバー不足による「物流クライシス」が深刻化しています。特に過疎地や離島では、配送網の維持が困難になりつつあります。政府はこの課題解決のため、ドローンによる「レベル4飛行（有人地帯での目視外飛行）」の普及を急いでおり、今回の規制緩和はその一環として実施されました。
          </p>
        </section>

        <section>
          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">ビジネス影響: 企業のどの部門にどのような影響があるか</h3>
          <p class="text-gray-300 mb-4">
            これまで「実証実験」止まりだったドローン物流が、いよいよ「社会実装」フェーズに入ります。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white/5 p-4 rounded-lg">
              <h4 class="font-bold text-white mb-2">物流・小売業</h4>
              <p class="text-sm text-gray-400">ラストワンマイル配送のコスト削減。特に山間部への配送効率が劇的に改善します。</p>
            </div>
            <div class="bg-white/5 p-4 rounded-lg">
              <h4 class="font-bold text-white mb-2">自治体・インフラ</h4>
              <p class="text-sm text-gray-400">災害時の孤立集落への物資輸送手段として、平時から民間事業者と協定を結ぶ動きが加速します。</p>
            </div>
          </div>
        </section>

        <section>
          <div class="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              推奨アクション
            </h3>
            <ul class="space-y-3 text-gray-200">
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">調査</span>
                <span>自社の配送エリア内に、ドローン配送に適した「過疎地・離島」が含まれているかマップ化する。</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">協業</span>
                <span>レベル4対応機体を持つドローン物流ベンダー（SkyDrive、ACSL等）との提携可能性を探る。</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    `
  },
  {
    id: "3",
    title: "【経営リスク】台湾有事シミュレーション｜半導体供給停止がもたらす国内製造業への衝撃",
    author: "Resilience Hub Editorial",
    date: "2026年1月10日 09:00",
    image: "/images/tech-satellite.jpg",
    category: "サプライチェーン・調達",
    description: "民間シンクタンクが最新の地政学リスクレポートを公開。台湾海峡封鎖時の国内GDP損失額は推計50兆円超。",
    isPremium: true,
    type: 'needs',
    likes: 256,
    saves: 128,
    keyTakeaways: [
      "台湾からの輸入が停止した場合、国内製造業の生産活動の約3割が1ヶ月以内に停止する試算",
      "半導体だけでなく、化学品やプラスチック部品の調達も困難に",
      "経営企画部、調達部門、リスク管理担当者"
    ],
    sourceUrl: "https://example.com/report/taiwan-risk-2026",
    fullContent: `
      <div class="space-y-8">
        <section>
          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">概要と背景: なぜ今それが重要なのか</h3>
          <p class="text-gray-300 leading-relaxed">
            米中対立の激化に伴い、台湾海峡における地政学リスクが高止まりしています。多くの日本企業にとって台湾は重要な調達拠点ですが、万が一の事態における具体的な被害想定や代替策の準備は十分とは言えません。今回のレポートは、最悪のシナリオ（海上封鎖）を想定した定量的なインパクト分析を提供しています。
          </p>
        </section>

        <section>
          <h3 class="text-xl font-bold mb-4 text-white border-l-4 border-blue-500 pl-3">ビジネス影響: 企業のどの部門にどのような影響があるか</h3>
          <p class="text-gray-300 mb-4">
            「うちは台湾と直接取引していない」という企業も安全ではありません。2次、3次サプライヤーが台湾部材を使用している可能性が高く、見えないリスクが内在しています。
          </p>
        </section>

        <section>
          <div class="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              推奨アクション
            </h3>
            <ul class="space-y-3 text-gray-200">
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">可視化</span>
                <span>主要製品のBOM（部品表）を精査し、サプライチェーンの深層に台湾リスクが含まれていないか洗い出す。</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded mt-0.5">備蓄</span>
                <span>代替が効かない重要部材については、在庫積み増し（戦略的在庫）の基準を引き上げる。</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    `
  }
];

export const mockArticles = [
  {
    id: "1",
    title: "【経産省】BCPガイドライン改定｜中小企業の補助金要件が厳格化、3月末までの対応必須",
    author: "Resilience Hub Editorial",
    date: "2026年1月12日",
    thumbnail: "/images/impact-fund.jpg",
    category: "制度・補助金・法対応",
    summary: "経済産業省が事業継続力強化計画の認定基準を改定。ものづくり補助金などの加点要件に関わる重要変更。",
    isPremium: true
  },
  {
    id: "2",
    title: "【規制緩和】ドローン「レベル4」飛行の承認要件が緩和｜過疎地での無人配送が実用段階へ",
    author: "Resilience Hub Editorial",
    date: "2026年1月11日",
    thumbnail: "/images/tech-drone.jpg",
    category: "ドローン・ロボティクス",
    summary: "国土交通省が有人地帯での目視外飛行（レベル4）に関する審査基準を一部簡素化。物流クライシスへの切り札となるか。",
    isPremium: true
  },
  {
    id: "3",
    title: "【経営リスク】台湾有事シミュレーション｜半導体供給停止がもたらす国内製造業への衝撃",
    author: "Resilience Hub Editorial",
    date: "2026年1月10日",
    thumbnail: "/images/tech-satellite.jpg",
    category: "サプライチェーン・調達",
    summary: "民間シンクタンクが最新の地政学リスクレポートを公開。台湾海峡封鎖時の国内GDP損失額は推計50兆円超。",
    isPremium: true
  },
  {
    id: "4",
    title: "AIを活用したリアルタイムハザードマップの可能性",
    author: "Tech Watcher",
    date: "2026年1月09日",
    thumbnail: "/images/tech-ai.jpg",
    category: "AI・ビッグデータ",
    summary: "SNSの投稿データと気象衛星データを組み合わせ、浸水被害をリアルタイムに可視化する新技術が登場。",
    isPremium: false
  },
  {
    id: "5",
    title: "中小企業のためのサイバーセキュリティ入門",
    author: "Security Expert",
    date: "2026年1月08日",
    thumbnail: "/images/tech-cyber.jpg",
    category: "リスク可視化・被害想定",
    summary: "予算や人材が限られる中小企業でも実践できる、効果的なサイバー攻撃対策の基本ステップを解説。",
    isPremium: false
  }
];
