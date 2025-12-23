import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldAlert, Activity, Building2, Briefcase, TrendingUp, MessageSquarePlus } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { ContentCard } from "@/components/ContentCard";
import { contentItems } from "@/lib/mock-data";

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
    ]
  }
};

export default function NeedsPage() {
  const [match, params] = useRoute("/needs/:category");
  const [, setLocation] = useLocation();
  const category = params?.category as keyof typeof needsData;
  const data = needsData[category] || needsData.prediction; // Fallback

  // Filter content items to show only 'needs' type
  const relatedArticles = contentItems.filter(item => item.type === 'needs');

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

              {/* Solution Listing Inquiry */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <MessageSquarePlus className="w-5 h-5" />
                  ソリューション掲載について
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  自社の防災・レジリエンスソリューションを掲載しませんか？
                </p>
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 hover:text-white">
                  掲載の相談をする
                </Button>
              </div>
            </div>

            {/* Right Column: Articles (Crawled Content) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                関連トピック・記事
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    item={item} 
                    onClick={() => handleCardClick(Number(item.id))} 
                  />
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" className="border-white/10 text-muted-foreground hover:text-white hover:bg-white/5">
                  もっと見る <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
