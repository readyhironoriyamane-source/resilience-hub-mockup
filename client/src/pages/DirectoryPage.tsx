import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Link as LinkIcon, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export default function DirectoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const companies = [
    {
      id: 1,
      name: "内閣府政策統括官（防災担当）",
      location: "東京都",
      strength: "政府防災政策の司令塔・省庁横断調整",
      achievement: "令和6年能登半島地震 非常災害対策本部の設置・運営",
      description: "自然災害から国民の生命・財産を守るため、国の防災政策の企画立案と総合調整を担う。平時の備えから発災時の応急対応、復旧・復興まで一貫して対処する防災行政の中枢。",
      logo: "内閣府"
    },
    {
      id: 2,
      name: "外務省",
      location: "東京都",
      strength: "国際防災外交・海外被災地への支援調整",
      achievement: "仙台防災枠組2015-2030の国際交渉・策定支援",
      description: "国際社会における防災協力の推進と、海外における大規模災害発生時の邦人保護・支援調整を担う。多国間・二国間の防災外交を通じてグローバルなレジリエンス強化に貢献。",
      logo: "外務省"
    },
    {
      id: 3,
      name: "日本商工会議所",
      location: "東京都",
      strength: "全国中小企業へのBCP策定支援・地域防災拠点",
      achievement: "中小企業強靭化法に基づく事業継続力強化支援計画の全国展開",
      description: "全国515商工会議所のネットワークを活かし、中小企業のBCP策定を継続的に支援。東日本大震災をはじめ大規模災害の発災時には被災事業者の事業継続・再建支援の拠点として機能。",
      logo: "日商"
    },
    {
      id: 4,
      name: "YECAP（アジア太平洋若者気候行動プラットフォーム）",
      location: "国際機関（アジア太平洋地域）",
      strength: "若者主導の気候・防災アクション推進",
      achievement: "国連環境開発委員会（CED8）での若者声明発表（2024年）",
      description: "アジア太平洋地域の若者が気候変動・防災分野で政策立案に参画するための国際プラットフォーム。国連会議での政策提言を通じ、若い世代の防災リーダー育成を推進。",
      logo: "YECAP"
    },
    {
      id: 5,
      name: "独立行政法人 国際協力機構（JICA）",
      location: "東京都",
      strength: "開発途上国への防災技術移転・国際緊急援助",
      achievement: "仙台防災枠組への政策貢献と途上国向け防災主流化プログラムの推進",
      description: "日本の防災知見を開発途上国に移転し、世界の災害リスク削減に貢献する国際協力の実施機関。地震・洪水・感染症など多様な緊急事態に対応する国際緊急援助隊（JDR）を保有。",
      logo: "JICA"
    },
    {
      id: 6,
      name: "国際商業会議所 日本委員会（ICC JAPAN）",
      location: "東京都",
      strength: "国際ビジネス規範策定・G20への民間提言",
      achievement: "国連総会オブザーバー資格取得・G7/G20へのビジネス界代表として気候・防災政策提言",
      description: "世界130カ国以上の企業・団体が参加する民間国際経済機構の日本委員会。国際ビジネスの持続可能性確保の観点から、気候変動・防災リスクに関する政策提言活動を展開。",
      logo: "ICC"
    },
    {
      id: 7,
      name: "パナソニック コネクト株式会社",
      location: "東京都",
      strength: "防災ICTインフラ・自治体向け防災DXソリューション",
      achievement: "全国自治体への防災行政無線デジタル化・避難所ソリューション導入",
      description: "J-ALERT・Lアラート連携から監視カメラ・ウェアラブル端末による現場情報収集まで、情報収集から住民伝達までをトータルサポートする防災DXの第一人者。長年にわたり市町村防災行政無線の整備を支援し、ICT×防災領域で国内最大級の導入実績を持つ。",
      logo: "Panasonic"
    },
    {
      id: 8,
      name: "BlueBank株式会社",
      location: "東京都",
      strength: "有事の際の即時的な資金流動性を確保する、経営者専用の次世代金融プラットフォーム。",
      achievement: "災害時等のキャッシュフロー悪化に備える、迅速なデットファイナンス支援体制の構築",
      description: "「挑戦者が、正しく評価される世界を創る」を掲げ、有事の際も止まらない経営支援インフラを提供。 独自のスコアリング技術により、従来の銀行融資では困難なスピード感で、企業の災害復旧や事業継続に必要な資金供給を可能にします。",
      logo: "BlueBank"
    },
    {
      id: 9,
      name: "株式会社FLUX",
      location: "東京都",
      strength: "AIを活用した高精度な災害リスク予測と、ノーコードによる防災DXの実装支援。",
      achievement: "累計100億円の資金を背景とした、サプライチェーンリスク管理AIの開発と提供",
      description: "「日本経済に流れを」をミッションに、企業の防災・減災対応をAI技術でスマート化するソリューションを展開。 膨大なデータから災害時の事業インパクトを瞬時に解析し、属人的な判断を排除した論理的なBCP（事業継続計画）の策定と運用を支援します。",
      logo: "FLUX"
    },
    {
      id: 10,
      name: "株式会社Meta Drive",
      location: "東京都",
      strength: "Metaプラットフォームを活用した、災害時における高精度なリアルタイム情報拡散支援。",
      achievement: "Facebook/Instagram広告のターゲティング技術を応用した、地域限定の防災啓発・避難誘導支援",
      description: "デジタルマーケティングの知見を活かし、有事の際に「必要な人に、必要な防災情報」を届ける情報伝達インフラを構築。 SNSの動的なリーチ力を活用することで、従来のアナログな防災広報では届かなかった層へも、確実なリスク認知と行動変容を促します。",
      logo: "Meta"
    },
    {
      id: 11,
      name: "株式会社恵福",
      location: "福岡県",
      strength: "福岡エリアにおける、被災後の建物復旧と公衆衛生維持を支える特殊清掃・管理技術。",
      achievement: "水害や火災等の災害発生時における、オフィスビル・公共施設の緊急復旧清掃業務",
      description: "昭和61年からの豊富な経験に基づき、被災した建物の迅速な再開を支援するメンテナンス体制を完備。 高所作業や特殊清掃の専門スキルを駆使し、二次被害を防ぎながら地域のインフラ拠点の安全と衛生を最前線で守り抜きます。",
      logo: "恵福"
    }
  ];

  return (
    <div className="flex h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 pb-24 max-w-5xl">
            {/* Header */}
            <header className="mb-10">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                レジハブパートナー
              </h1>
              <p className="text-gray-300 text-base md:text-lg">
                日本と世界の防災を共にリードする、先進的なパートナーたちをご紹介します。
              </p>
            </header>

            {/* Company Grid */}
            <div className="grid grid-cols-1 gap-6">
              {companies.map((company) => (
                <Card key={company.id} className="bg-white border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Main Content */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {/* Logo Area */}
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                            <span className={`text-lg font-bold text-slate-700 ${company.logo.length > 4 ? 'text-sm px-2 text-center' : 'writing-vertical-rl'}`}>
                              {company.logo}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0 space-y-4">
                            {/* Company Name & Location */}
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-[#0B1026] leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                                {company.name}
                              </h3>
                              <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span className="text-slate-600">{company.location}</span>
                              </div>
                            </div>

                            {/* Strength & Achievement */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                <div className="text-xs font-bold text-blue-600 mb-1">強み</div>
                                <div className="text-sm font-bold text-slate-800">{company.strength}</div>
                              </div>
                              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                <div className="text-xs font-bold text-slate-500 mb-1">主な実績</div>
                                <div className="text-sm font-medium text-slate-700">{company.achievement}</div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-base text-slate-600 leading-relaxed">
                              {company.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action Area */}
                      <div className="bg-slate-50 p-6 md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-3">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md h-12 text-base font-bold gap-2">
                          <ExternalLink className="h-5 w-5" />
                          詳細を見る
                        </Button>
                        <p className="text-xs text-center text-slate-400">
                          ※外部サイトへ遷移します
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Footer Call to Action */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">あなたの技術やノウハウで、防災の未来を共に創りませんか？</p>
              <Button 
                variant="link" 
                className="text-[#d4a574] hover:text-[#e5b685] text-lg p-0 h-auto font-bold"
                onClick={() => window.location.href = '/desk'}
              >
                パートナー参画について相談する &rarr;
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
