export interface ContentItem {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  description: string;
  isPremium: boolean;
}

export const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Aavishkaar Groupが支援するArohan...",
    author: "Venture capital ...",
    date: "2025年12月17日 15:13",
    image: "/images/impact-fund.jpg",
    category: "防災テクノロジー",
    description: "インドのマイクロファイナンス機関Arohan Financial Servicesへの投資に関する詳細レポート。",
    isPremium: true,
  },
  {
    id: "2",
    title: "「すべてのスタートアップがLenskartでは...",
    author: "Venture capital ...",
    date: "2025年12月17日 15:08",
    image: "/images/avatar-1.jpg",
    category: "防災テクノロジー",
    description: "Lenskartの創業者Peyush Bansal氏が語る、スタートアップの成長戦略と失敗からの学び。",
    isPremium: true,
  },
  {
    id: "3",
    title: "サウィリス文化賞、第21回新進作家候補者を...",
    author: "Sawiris Foundat...",
    date: "2025年12月16日 16:11",
    image: "/images/environment.jpg",
    category: "防災テクノロジー",
    description: "エジプトの文化芸術支援を行うサウィリス財団による、若手作家の発掘プロジェクト。",
    isPremium: true,
  },
  {
    id: "4",
    title: "Turiyam AIに投資した理由",
    author: "Ankur Capital",
    date: "2025年12月13日 16:10",
    image: "/images/impact-fund.jpg",
    category: "防災テクノロジー",
    description: "生成AIを活用した創薬プラットフォームTuriyam AIへの投資決定の背景と将来性。",
    isPremium: true,
  },
  {
    id: "5",
    title: "環境運動がイノベーションを解き放つ方法 -...",
    author: "Breakthrough E...",
    date: "2025年12月18日 00:11",
    image: "/images/environment.jpg",
    category: "気候変動レジリエンス",
    description: "気候変動対策としての環境運動が、いかにして技術革新を加速させているか。",
    isPremium: true,
  },
  {
    id: "6",
    title: "ソファからコードへ：メンタルヘルスイノベ...",
    author: "Grove Ventures",
    date: "2025年12月17日 19:17",
    image: "/images/avatar-2.jpg",
    category: "気候変動レジリエンス",
    description: "メンタルヘルスケアへのアクセスを改善するためのデジタルソリューションの最前線。",
    isPremium: true,
  },
  {
    id: "7",
    title: "スマート農業の未来：一次産業のDX",
    author: "AgriTech Lab",
    date: "2025年12月19日 10:00",
    image: "/images/primary-industry.jpg",
    category: "社会インフラ",
    description: "ドローンとAIを活用した精密農業がもたらす収穫量増加と環境負荷低減。",
    isPremium: true,
  },
];
