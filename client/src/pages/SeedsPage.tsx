import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Bot, Satellite, Map, ExternalLink, Layers } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { ContentCard } from "@/components/ContentCard";
import { contentItems } from "@/lib/mock-data";

// Mock data for seeds categories
const seedsData = {
  "ai-bigdata": {
    title: "AI・ビッグデータ",
    icon: <Database className="w-6 h-6" />,
    description: "膨大なデータをリアルタイムに解析し、災害予測や被害状況の把握を高度化する最先端AI技術。"
  },
  drone: {
    title: "ドローン・ロボティクス",
    icon: <Bot className="w-6 h-6" />,
    description: "人が立ち入れない危険地帯の調査や、物資の無人搬送を実現する自律制御ロボット技術。"
  },
  satellite: {
    title: "衛星・地理情報",
    icon: <Satellite className="w-6 h-6" />,
    description: "宇宙からの広域監視と高精度な位置情報により、地球規模での環境変化や災害状況を可視化。"
  },
  "hazard-map": {
    title: "ハザードマップ・可視化",
    icon: <Map className="w-6 h-6" />,
    description: "複雑な災害リスク情報を、誰もが直感的に理解できる3DマップやAR（拡張現実）で表現。"
  }
};

export default function SeedsPage() {
  const [match, params] = useRoute("/seeds/:category");
  const [, setLocation] = useLocation();
  const category = params?.category as keyof typeof seedsData;
  const data = seedsData[category] || seedsData["ai-bigdata"]; // Fallback

  // Filter content items to show only 'seeds' type
  const relatedArticles = contentItems.filter(item => item.type === 'seeds');

  const handleCardClick = (id: number) => {
    setLocation(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        {/* Hero Section for Seeds (Tech Catalog) */}
        <div className="bg-[#0f172a] border-b border-white/10 py-12 px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {data.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Technology & Seeds</div>
                  <h1 className="text-3xl font-bold font-serif">{data.title}</h1>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  技術レポート
                </Button>
                <Button variant="outline" size="sm" className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5">
                  <Layers className="w-4 h-4 mr-2" />
                  API仕様書
                </Button>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {data.description}
            </p>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar: Filters & CTA */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-sm font-bold mb-4 text-slate-300 uppercase tracking-wider">Filter</h3>
                <div className="space-y-2">
                  {["すべて", "実証実験済み", "導入事例あり", "特許取得済み"].map((filter) => (
                    <div key={filter} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-white/30" />
                      <span className="text-sm text-slate-400">{filter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Listing Inquiry */}
              <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer group">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white group-hover:text-blue-400 transition-colors">
                  <Database className="w-5 h-5" />
                  技術シーズを掲載
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  貴社の保有する防災・レジリエンス技術を、世界中の課題保有者に届けませんか？
                </p>
                <Button variant="outline" className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                  掲載の相談をする
                </Button>
              </div>
            </div>

            {/* Tech Articles Grid */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((item) => (
              <ContentCard 
                key={item.id} 
                item={item} 
                onClick={() => handleCardClick(Number(item.id))} 
              />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 px-8">
              もっと見る <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
