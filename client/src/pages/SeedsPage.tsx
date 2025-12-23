import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Bot, Satellite, Map, Play, ExternalLink, Layers, Cpu, Globe } from "lucide-react";
import { useLocation, useRoute } from "wouter";

// Mock data for seeds categories
const seedsData = {
  "ai-bigdata": {
    title: "AI・ビッグデータ",
    icon: <Database className="w-6 h-6" />,
    description: "膨大なデータをリアルタイムに解析し、災害予測や被害状況の把握を高度化する最先端AI技術。",
    techs: [
      {
        name: "DeepRain Forecast",
        provider: "AI Weather Lab",
        image: "/images/tech-ai-weather.jpg", // Placeholder
        description: "ディープラーニングを用いた局地気象予測モデル。従来の数値予報モデルと比較して、突発的な豪雨の予測精度が30%向上。",
        specs: ["予測範囲: 5kmメッシュ", "更新頻度: 10分", "API提供: あり"],
        status: "実用化済み"
      },
      {
        name: "Social Sensor API",
        provider: "DataLinks Inc.",
        image: "/images/tech-social.jpg", // Placeholder
        description: "SNS上の投稿画像やテキストから、災害発生地点と被害レベルを自動抽出。デマ情報のフィルタリング機能も搭載。",
        specs: ["対応言語: 50ヶ国語", "画像解析: 対応", "リアルタイム性: <1分"],
        status: "実証実験中"
      }
    ]
  },
  drone: {
    title: "ドローン・ロボティクス",
    icon: <Bot className="w-6 h-6" />,
    description: "人が立ち入れない危険地帯の調査や、物資の無人搬送を実現する自律制御ロボット技術。",
    techs: [
      {
        name: "Rescue Drone X1",
        provider: "AeroRobotics",
        image: "/images/tech-drone.jpg", // Placeholder
        description: "悪天候下でも飛行可能な全天候型レスキュードローン。赤外線カメラを搭載し、夜間の遭難者捜索にも対応。",
        specs: ["飛行時間: 45分", "耐風性能: 15m/s", "積載量: 5kg"],
        status: "販売中"
      }
    ]
  },
  satellite: {
    title: "衛星・地理情報",
    icon: <Satellite className="w-6 h-6" />,
    description: "宇宙からの広域監視と高精度な位置情報により、地球規模での環境変化や災害状況を可視化。",
    techs: [
      {
        name: "SAR-View Constellation",
        provider: "SpaceEye",
        image: "/images/tech-satellite.jpg", // Placeholder
        description: "小型SAR衛星コンステレーションにより、雲の下や夜間でも地表の状況を観測可能。浸水域の特定に威力を発揮。",
        specs: ["再訪頻度: 2時間", "分解能: 1m", "観測幅: 50km"],
        status: "運用中"
      }
    ]
  },
  "hazard-map": {
    title: "ハザードマップ・可視化",
    icon: <Map className="w-6 h-6" />,
    description: "複雑な災害リスク情報を、誰もが直感的に理解できる3DマップやAR（拡張現実）で表現。",
    techs: [
      {
        name: "3D City Hazard",
        provider: "UrbanVis",
        image: "/images/tech-3dmap.jpg", // Placeholder
        description: "都市の3Dモデル上に、洪水や津波のシミュレーション結果を重ね合わせて表示。避難ルートの検証に活用。",
        specs: ["データ形式: 3D Tiles", "ブラウザ動作: 対応", "VR対応: あり"],
        status: "実用化済み"
      }
    ]
  }
};

export default function SeedsPage() {
  const [match, params] = useRoute("/seeds/:category");
  const category = params?.category as keyof typeof seedsData;
  const data = seedsData[category] || seedsData["ai-bigdata"]; // Fallback

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
          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.techs.map((tech, i) => (
              <div key={i} className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
                {/* Tech Visual Area (Placeholder) */}
                <div className="h-48 bg-black/50 relative flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-80" />
                  <Cpu className="w-12 h-12 text-white/20 group-hover:text-blue-400 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="px-2 py-1 rounded bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                      {tech.status}
                    </span>
                    <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10">
                      <Play className="w-3 h-3 mr-1" /> デモを見る
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        by <span className="text-white font-medium">{tech.provider}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 mb-6 leading-relaxed h-20 overflow-hidden">
                    {tech.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {tech.specs.map((spec, j) => (
                      <div key={j} className="bg-black/20 px-3 py-2 rounded border border-white/5 text-xs font-mono text-blue-200/80">
                        {spec}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                    詳細スペックを確認
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
