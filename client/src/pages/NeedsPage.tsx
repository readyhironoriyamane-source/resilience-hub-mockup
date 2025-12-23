import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldAlert, Activity, Building2, Briefcase, FileText, Users, TrendingUp } from "lucide-react";
import { useLocation, useRoute } from "wouter";

// Mock data for needs categories
const needsData = {
  prediction: {
    title: "予測・予兆検知",
    icon: <Activity className="w-8 h-8 text-blue-400" />,
    description: "AIとビッグデータを活用し、災害やリスクの予兆を早期に検知。被害を最小限に抑えるための事前対策を支援します。",
    challenges: [
      "突発的な自然災害への対応遅れ",
      "サプライチェーン上のリスクが見えない",
      "過去のデータに基づいた予測の限界"
    ],
    solutions: [
      {
        title: "AI気象予測プラットフォーム",
        provider: "WeatherTech AI",
        description: "局地的な豪雨や台風の進路を最大72時間前から高精度に予測。工場の稼働調整や従業員の安全確保に活用できます。",
        tags: ["AI", "気象データ", "SaaS"]
      },
      {
        title: "サプライチェーンリスク検知",
        provider: "Global Chain Monitor",
        description: "世界中のニュースやSNSを解析し、サプライヤーの被災状況や政情不安をリアルタイムに検知・通知します。",
        tags: ["ビッグデータ", "リスク管理"]
      }
    ]
  },
  shelter: {
    title: "避難所・物資管理",
    icon: <ShieldAlert className="w-8 h-8 text-orange-400" />,
    description: "避難所の開設状況や混雑度、備蓄物資の在庫をリアルタイムに可視化。効率的な避難誘導と物資配給を実現します。",
    challenges: [
      "避難所の混雑状況が把握できない",
      "必要な物資がどこにあるか分からない",
      "要配慮者への対応が遅れる"
    ],
    solutions: [
      {
        title: "スマート避難所管理システム",
        provider: "SafeHaven Tech",
        description: "QRコードを活用した入退室管理と、カメラによる混雑状況の自動検知。避難者の属性に合わせた物資配給もサポート。",
        tags: ["IoT", "QRコード", "自治体向け"]
      }
    ]
  },
  infrastructure: {
    title: "インフラ点検・監視",
    icon: <Building2 className="w-8 h-8 text-green-400" />,
    description: "ドローンやセンサーを活用し、橋梁、道路、送電線などのインフラ点検を効率化。老朽化対策や予防保全に貢献します。",
    challenges: [
      "点検員不足と高齢化",
      "目視点検による精度のバラつき",
      "高所や危険箇所での作業リスク"
    ],
    solutions: [
      {
        title: "ドローン自動点検サービス",
        provider: "SkyInspect",
        description: "自律飛行ドローンがインフラ設備を撮影し、AIがひび割れや錆を自動検出。点検時間を従来の1/5に短縮します。",
        tags: ["ドローン", "画像解析", "インフラ"]
      }
    ]
  },
  bcp: {
    title: "BCP・事業継続",
    icon: <Briefcase className="w-8 h-8 text-purple-400" />,
    description: "実効性のあるBCP（事業継続計画）の策定と運用を支援。緊急時の初動対応から復旧までをトータルでサポートします。",
    challenges: [
      "BCPが形骸化している",
      "緊急時の連絡網が機能しない",
      "代替拠点の確保が難しい"
    ],
    solutions: [
      {
        title: "クラウドBCP策定ツール",
        provider: "Resilience Cloud",
        description: "ガイドに従って入力するだけで、ガイドラインに準拠したBCPを策定。スマホアプリで緊急時の安否確認も可能です。",
        tags: ["SaaS", "コンサルティング", "安否確認"]
      }
    ]
  }
};

export default function NeedsPage() {
  const [match, params] = useRoute("/needs/:category");
  const category = params?.category as keyof typeof needsData;
  const data = needsData[category] || needsData.prediction; // Fallback

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        {/* Hero Section for Needs (Story-driven) */}
        <div className="relative bg-gradient-to-b from-[#1e293b] to-[#0B1026] py-16 px-8 border-b border-white/10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] opacity-10" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
                {data.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
                    課題・目的 (Needs)
                  </span>
                </div>
                <h1 className="text-4xl font-serif font-bold mb-4">{data.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Challenges (Story) */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
                  <TrendingUp className="w-5 h-5" />
                  よくある課題
                </h3>
                <ul className="space-y-4">
                  {data.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-blue-600/10 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-bold mb-2 text-primary">専門家に相談する</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  自社の状況に合わせた最適なソリューションをご提案します。
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  コンシェルジュに相談
                </Button>
              </div>
            </div>

            {/* Right Column: Solutions (Actionable) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                解決アプローチ & ソリューション
              </h2>

              <div className="space-y-6">
                {data.solutions.map((solution, i) => (
                  <div key={i} className="group bg-[#1e293b]/50 hover:bg-[#1e293b] border border-white/10 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs text-primary font-bold mb-1">{solution.provider}</div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {solution.title}
                        </h3>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-white">
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {solution.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-white/60 border border-white/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="p-8 rounded-xl border border-dashed border-white/10 text-center hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-muted-foreground font-medium">
                    他にも {category === 'prediction' ? '12' : '8'} 件のソリューションがあります
                  </p>
                  <Button variant="link" className="text-primary mt-2">
                    すべて見る <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
