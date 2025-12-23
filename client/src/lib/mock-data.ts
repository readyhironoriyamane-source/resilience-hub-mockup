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
}

export const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Aavishkaar Groupが支援するArohan Financial Services、気候変動リスク対応型マイクロファイナンスを開始",
    author: "Venture capital Journal",
    date: "2025年12月17日 15:13",
    image: "/images/impact-fund.jpg",
    category: "防災テクノロジー",
    description: "インドのマイクロファイナンス機関Arohan Financial Servicesへの投資に関する詳細レポート。",
    isPremium: true,
    keyTakeaways: [
      "気候変動リスクが高い地域の小規模事業者向けに特化した新しい融資モデルを構築",
      "AIを活用した信用スコアリングにより、従来金融サービスを受けられなかった層へのリーチが可能に",
      "Aavishkaar Groupのインパクト投資戦略における重要なマイルストーンとなる案件"
    ],
    sourceUrl: "https://example.com/news/arohan-finance",
    fullContent: `
      <p>Aavishkaar Groupは本日、傘下のArohan Financial Servicesを通じて、気候変動リスクに脆弱な地域の中小規模事業者（MSME）を対象とした新しいマイクロファイナンスプログラムの開始を発表しました。</p>
      <h3>背景と目的</h3>
      <p>インド農村部では、洪水や干ばつなどの気候変動による災害リスクが高まっており、従来の金融機関からの融資を受けることが困難な状況が続いています。Arohanは、衛星データとAIを活用した独自のリスク評価モデルを導入することで、これらの地域における信用供与のハードルを下げることに成功しました。</p>
      <h3>主な特徴</h3>
      <ul>
        <li><strong>AI信用スコアリング:</strong> 過去の気象データと収穫予測を組み合わせた返済能力評価</li>
        <li><strong>パラメトリック保険の組み込み:</strong> 災害発生時に即座に保険金が支払われる仕組みを融資に付帯</li>
        <li><strong>デジタルオンボーディング:</strong> スマートフォンのみで完結する申し込みプロセス</li>
      </ul>
      <p>この取り組みは、金融包摂（Financial Inclusion）と気候変動適応（Climate Adaptation）を同時に推進するモデルケースとして注目されています。</p>
    `
  },
  {
    id: "2",
    title: "「すべてのスタートアップがLenskartではありません」：Peyush Bansal氏が語るレジリエンス経営",
    author: "Startup India News",
    date: "2025年12月17日 15:08",
    image: "/images/avatar-1.jpg",
    category: "防災テクノロジー",
    description: "Lenskartの創業者Peyush Bansal氏が語る、スタートアップの成長戦略と失敗からの学び。",
    isPremium: true,
    keyTakeaways: [
      "急成長だけが正解ではない：持続可能な収益モデルの構築が最優先",
      "危機管理としてのピボット：市場の変化に柔軟に対応する組織文化の重要性",
      "従業員のメンタルヘルスケアが企業のレジリエンスを高める"
    ],
    sourceUrl: "https://example.com/interview/peyush-bansal",
    fullContent: `
      <p>インドのアイウェアユニコーン企業Lenskartの創業者Peyush Bansal氏は、ニューデリーで開催されたスタートアップサミットにて登壇し、不確実な経済環境下での経営戦略について語りました。</p>
      <h3>ユニコーン神話への警鐘</h3>
      <p>Bansal氏は「メディアは華々しい資金調達や評価額ばかりを取り上げるが、真の成功は顧客に価値を提供し続けられるかどうかにかかっている」と強調しました。特に、災害やパンデミックといった予期せぬ事態においても事業を継続できる「レジリエンス（回復力）」こそが、これからのスタートアップに求められる資質であると述べました。</p>
    `
  },
  {
    id: "3",
    title: "サウィリス文化賞、気候変動をテーマにした第21回新進作家候補者を発表",
    author: "Sawiris Foundation",
    date: "2025年12月16日 16:11",
    image: "/images/environment.jpg",
    category: "気候変動レジリエンス",
    description: "エジプトの文化芸術支援を行うサウィリス財団による、若手作家の発掘プロジェクト。",
    isPremium: true,
    keyTakeaways: [
      "芸術を通じた気候変動啓発：文学作品が持つ社会的インパクトに注目",
      "若手作家への支援拡大：受賞者には創作活動のための助成金とメンタリングを提供",
      "中東・北アフリカ地域における環境意識の向上を目指す"
    ],
    sourceUrl: "https://example.com/culture/sawiris-award-21",
    fullContent: `
      <p>サウィリス財団は、第21回サウィリス文化賞の最終候補者を発表しました。本年度は特別テーマとして「変動する世界と私たちの暮らし」を掲げ、気候変動が人々の生活や文化に与える影響を描いた作品が多く選出されました。</p>
    `
  },
  {
    id: "4",
    title: "Turiyam AIに投資した理由：創薬プロセスを加速する生成AIの可能性",
    author: "Ankur Capital",
    date: "2025年12月13日 16:10",
    image: "/images/impact-fund.jpg",
    category: "防災テクノロジー",
    description: "生成AIを活用した創薬プラットフォームTuriyam AIへの投資決定の背景と将来性。",
    isPremium: true,
    keyTakeaways: [
      "創薬期間の短縮：従来数年かかっていた候補物質の探索を数週間に短縮",
      "パンデミック対応：未知のウイルスに対するワクチン開発への応用が期待される",
      "ディープテック投資の潮流：インド発のAIスタートアップへの注目度が高まっている"
    ],
    sourceUrl: "https://example.com/investment/turiyam-ai",
    fullContent: `
      <p>Ankur Capitalは、生成AIを活用した創薬プラットフォームを開発するTuriyam AIへのシード投資を実施しました。この投資は、単なる技術への投資ではなく、将来のパンデミックリスクに対する社会的な備え（プリペアードネス）への投資でもあります。</p>
    `
  },
  {
    id: "5",
    title: "環境運動がイノベーションを解き放つ方法 - Breakthrough Energyレポート",
    author: "Breakthrough Energy",
    date: "2025年12月18日 00:11",
    image: "/images/environment.jpg",
    category: "気候変動レジリエンス",
    description: "気候変動対策としての環境運動が、いかにして技術革新を加速させているか。",
    isPremium: true,
    keyTakeaways: [
      "規制とイノベーションの関係：適切な環境規制が技術開発の触媒となる",
      "市民社会の役割：消費者行動の変化が企業の脱炭素化を後押ししている",
      "クリーンテック市場の拡大：2030年までに予想される市場規模と投資機会"
    ],
    sourceUrl: "https://example.com/report/breakthrough-energy",
    fullContent: `
      <p>ビル・ゲイツ氏が率いるBreakthrough Energyは最新のレポートを公開し、環境運動が技術イノベーションに与える影響について分析しました。レポートでは、若者を中心とした気候変動対策への要求が、政府の政策決定や企業のR&D投資に直接的な影響を与えていることがデータで示されています。</p>
    `
  },
  {
    id: "6",
    title: "ソファからコードへ：メンタルヘルスイノベーションの最前線",
    author: "Grove Ventures",
    date: "2025年12月17日 19:17",
    image: "/images/avatar-2.jpg",
    category: "気候変動レジリエンス",
    description: "メンタルヘルスケアへのアクセスを改善するためのデジタルソリューションの最前線。",
    isPremium: true,
    keyTakeaways: [
      "災害時のメンタルケア：被災者のPTSD予防におけるデジタルツールの有効性",
      "遠隔カウンセリングの普及：地理的な制約を超えたケアの提供",
      "AIチャットボットの活用：24時間365日のサポート体制構築"
    ],
    sourceUrl: "https://example.com/health/mental-health-tech",
    fullContent: `
      <p>Grove VenturesのパートナーであるLior Handelsman氏は、メンタルヘルステック分野への投資戦略についてブログで解説しました。特に、自然災害や紛争などの危機的状況下におけるメンタルヘルスケアの重要性が高まっており、スケーラブルなデジタルソリューションへの需要が急増しています。</p>
    `
  },
  {
    id: "7",
    title: "スマート農業の未来：一次産業のDXと気候変動適応",
    author: "AgriTech Lab",
    date: "2025年12月19日 10:00",
    image: "/images/primary-industry.jpg",
    category: "社会インフラ",
    description: "ドローンとAIを活用した精密農業がもたらす収穫量増加と環境負荷低減。",
    isPremium: true,
    keyTakeaways: [
      "精密農業による効率化：肥料・農薬の最適化によるコスト削減と環境保護",
      "気象リスクの軽減：AI予測に基づく栽培管理で異常気象の被害を最小化",
      "食料安全保障への貢献：持続可能な食料生産システムの構築"
    ],
    sourceUrl: "https://example.com/agri/smart-farming-future",
    fullContent: `
      <p>AgriTech Labは、最新のスマート農業技術に関する実証実験の結果を公表しました。ドローンによる空撮画像解析と土壌センサーデータを組み合わせることで、作物の生育状況をリアルタイムで把握し、必要な箇所にピンポイントで水や肥料を供給することが可能になりました。</p>
    `
  },
];
