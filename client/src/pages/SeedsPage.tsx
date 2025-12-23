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

  // Filter content items based on category (Mock filtering)
  // In a real app, this would filter by tags or category ID
  const relatedArticles = contentItems.slice(0, 6); 

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
          {/* Tech Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((item) => (
              <ContentCard 
                key={item.id} 
                item={item} 
                onClick={() => handleCardClick(Number(item.id))} 
              />
            ))}
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
