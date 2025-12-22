import { Button } from "@/components/ui/button";
import { 
  Check, Globe, LayoutDashboard, Sparkles, ArrowRight, ShieldCheck, Users, 
  AlertTriangle, Network, Clock, Building2, Briefcase, LineChart, HelpCircle, Lock,
  Menu, X
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-[#d4a574] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0f1c]/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 flex items-center justify-center">
              <span className="font-serif font-bold text-white">RH</span>
            </div>
            <span className="font-serif font-bold text-lg tracking-tight truncate max-w-[200px] md:max-w-none">The Global Resilience Hub</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-white">ログイン</Button>
            </Link>
            <Link href="/">
              <Button className="bg-[#d4a574] hover:bg-[#c49564] text-white border-none">無料で始める</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#0a0f1c] border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                ログイン
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full bg-[#d4a574] hover:bg-[#c49564] text-white border-none" onClick={() => setIsMobileMenuOpen(false)}>
                無料で始める
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/bg-stars.png" alt="Background" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c]/50 via-[#0a0f1c]/80 to-[#0a0f1c]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-[#d4a574] mb-6 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            <span>New: AIサマリー・マッチング機能リリース</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            地球規模の課題を、<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">集合知で解決する</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The Global Resilience Hubは、世界中の防災テック情報、リスク予兆、そして最適なソリューションをAIが繋ぐ、次世代のコミュニティ型プラットフォームです。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-[#d4a574] hover:bg-[#c49564] text-white border-none h-12 px-8 text-base font-bold shadow-[0_0_20px_rgba(212,165,116,0.3)]">
                無料でメンバー登録
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 h-12 px-8 text-base bg-transparent">
              資料をダウンロード
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-[#0f172a] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">なぜ、今レジハブなのか？</h2>
            <p className="text-muted-foreground">私たちが直面している、待ったなしの課題</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#1e293b]/50 border border-red-500/20 hover:border-red-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-100">気候変動の激甚化</h3>
              <p className="text-slate-400 leading-relaxed">
                自然災害の頻度と規模は年々増大しており、従来の対策だけでは対応しきれない事態が世界中で発生しています。
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#1e293b]/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-100">情報の分断</h3>
              <p className="text-slate-400 leading-relaxed">
                優れた防災技術や知見が世界中に点在しているにもかかわらず、言語や業界の壁により共有されず、孤立しています。
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#1e293b]/50 border border-slate-500/20 hover:border-slate-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-500/10 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">対策の遅れ</h3>
              <p className="text-slate-400 leading-relaxed">
                リスクの予兆を検知してから対策を講じるまでのリードタイムが長く、被害を最小限に抑える機会を逃しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-[#0a0f1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">3つのコアバリュー</h2>
            <p className="text-muted-foreground">レジハブが提供する、持続可能な成長のための3つのエンジン</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: Solution Intelligence */}
            <div className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-card/40 transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-square w-full relative overflow-hidden bg-blue-900/20">
                <img 
                  src="/images/solution-intelligence.png" 
                  alt="Solution Intelligence Isometric Illustration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-blue-500/30">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">ソリューションインテリジェンス</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold text-blue-400 mb-4 tracking-wider">ACQUISITION (集客)</p>
                <p className="text-blue-200/80 mb-6 text-sm leading-relaxed">
                  世界中の防災テック情報DBとOSINT連携によるリスク予兆検知。
                  「防災ならまずここを見る」という第一想起を獲得します。
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    世界中の防災テック情報DB
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    公式バッジによる信頼性担保
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    カテゴリ別ニュースフィード
                  </li>
                </ul>
              </div>
            </div>

            {/* Value 2: Personal Dashboard */}
            <div className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-card/40 transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-square w-full relative overflow-hidden bg-emerald-900/20">
                <img 
                  src="/images/personal-dashboard.png" 
                  alt="Personal Dashboard Isometric Illustration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-emerald-500/30">
                    <LayoutDashboard className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">パーソナル・ダッシュボード</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold text-emerald-400 mb-4 tracking-wider">RETENTION (定着)</p>
                <p className="text-emerald-200/80 mb-6 text-sm leading-relaxed">
                  自社課題・リスクの可視化と導入ソリューション管理。
                  業務ツール化することでスイッチングコストを高め、定着を促進します。
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    自社課題・リスクの可視化
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    導入ソリューション管理
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    関心分野のクリッピング
                  </li>
                </ul>
              </div>
            </div>

            {/* Value 3: AI Matching & Community */}
            <div className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-card/40 transition-all duration-300 group flex flex-col h-full">
              <div className="aspect-square w-full relative overflow-hidden bg-orange-900/20">
                <img 
                  src="/images/ai-matching.png" 
                  alt="AI Matching & Community Isometric Illustration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 backdrop-blur-sm flex items-center justify-center mb-3 border border-orange-500/30">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AIマッチング & コミュニティ</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold text-orange-400 mb-4 tracking-wider">MONETIZATION (収益化)</p>
                <p className="text-orange-200/80 mb-6 text-sm leading-relaxed">
                  AI要約＆最適解レコメンドと課題解決型スレッド。
                  質の高いQ&Aがコンテンツ資産となり、高単価なマッチングを生みます。
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    AI要約＆最適解レコメンド
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    課題解決型スレッド (Q&A)
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    ベンダーへの自動送客
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target & Use Case Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">誰のためのプラットフォームか？</h2>
            <p className="text-muted-foreground">それぞれの立場から、レジリエンス社会の実現に貢献します</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/5">
              <div className="h-48 bg-slate-800 relative">
                <img src="/images/primary-industry.jpg" alt="自治体" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-white/80" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">自治体・公共機関</h3>
                <p className="text-sm text-muted-foreground mb-4">地域防災計画の策定と実行</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> 先進的な防災事例の参照</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> 最適なソリューションの選定</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/5">
              <div className="h-48 bg-slate-800 relative">
                <img src="/images/impact-fund.jpg" alt="企業" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase className="w-16 h-16 text-white/80" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">企業・ビジネス</h3>
                <p className="text-sm text-muted-foreground mb-4">BCP策定と新規事業創出</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> サプライチェーンリスク管理</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> 防災ビジネスのパートナー探索</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-xl overflow-hidden border border-white/5">
              <div className="h-48 bg-slate-800 relative">
                <img src="/images/environment.jpg" alt="投資家" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <LineChart className="w-16 h-16 text-white/80" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">投資家・金融機関</h3>
                <p className="text-sm text-muted-foreground mb-4">ESG投資とリスク評価</p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> 気候変動リスクの定量評価</li>
                  <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[#d4a574] mt-0.5" /> 有望な防災テックへの投資</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0a0f1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">料金プラン</h2>
            <p className="text-muted-foreground">あなたのニーズに合わせた最適なプランをお選びください</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-white/5 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <div className="text-2xl font-bold mt-2">¥0</div>
                <p className="text-xs text-muted-foreground mt-1">リード獲得用</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">ソリューション情報</p>
                  <p className="text-xs text-muted-foreground">タイムライン閲覧: 3件/日</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                無料で開始
              </Button>
            </div>

            {/* Standard Plan */}
            <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-blue-500/30 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-blue-100">Standard</h3>
                <div className="text-2xl font-bold mt-2 text-blue-400">¥40,000<span className="text-sm text-muted-foreground font-normal">/月</span></div>
                <p className="text-xs text-muted-foreground mt-1">SaaS単体</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">ソリューション情報</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> 無制限閲覧</p>
                </div>
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">ダッシュボード</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> 課題・導入管理</p>
                </div>
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">AIマッチング</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-blue-500" /> AIサマリー/マッチング</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none">
                選択する
              </Button>
            </div>

            {/* Bundle Plan (Recommended) */}
            <div className="p-6 rounded-xl bg-[#1e293b] border-2 border-emerald-500 flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.1)] transform md:-translate-y-4 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider">
                Recommended
              </div>
              <div className="mb-4 mt-4">
                <h3 className="text-lg font-bold text-emerald-100">Bundle</h3>
                <div className="text-2xl font-bold mt-2 text-emerald-400">¥60,000<span className="text-sm text-muted-foreground font-normal">/月</span></div>
                <p className="text-xs text-emerald-500/80 mt-1 font-medium">OSINTech付帯 (一番人気)</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">ソリューション情報</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> 無制限閲覧</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium"><ShieldCheck className="w-3 h-3" /> OSINTech リスク予兆</p>
                </div>
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">ダッシュボード</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> 課題・導入管理</p>
                </div>
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">AIマッチング</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> AIサマリー/マッチング</p>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none font-bold">
                今すぐ始める
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-orange-500/30 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-orange-100">Premium</h3>
                <div className="text-2xl font-bold mt-2 text-orange-400">¥100,000<span className="text-sm text-muted-foreground font-normal">/月</span></div>
                <p className="text-xs text-muted-foreground mt-1">協会特別会員</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">全てのアセット</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Check className="w-3 h-3 text-orange-500" /> フルアクセス</p>
                </div>
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">特別会員資格</p>
                  <p className="text-xs text-orange-400 flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3" /> 認証バッジ付与</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">イベント優先出展・API</p>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-none">
                お問い合わせ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Trust Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">よくある質問</h2>
            <p className="text-muted-foreground">レジハブのご利用に関する疑問にお答えします</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "無料プランでどこまで利用できますか？", a: "無料プランでは、1日3件までのタイムライン閲覧が可能です。基本的なニュースフィードの確認や、コミュニティの雰囲気を知るために最適です。" },
              { q: "AIマッチング機能とは何ですか？", a: "あなたの関心分野や抱えている課題（ダッシュボード登録情報）に基づき、AIが世界中の膨大なデータベースから最適なソリューションやニュースを自動で選定・要約して提案する機能です。" },
              { q: "セキュリティ対策は万全ですか？", a: "はい。通信の暗号化（SSL/TLS）はもちろん、企業情報の取り扱いには細心の注意を払っています。ISO27001（ISMS）に準拠した運用体制を構築しています。" },
              { q: "プランの変更や解約はいつでも可能ですか？", a: "はい、マイページからいつでもプラン変更・解約が可能です。契約期間の縛りはございません（法人契約を除く）。" }
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-lg bg-[#1e293b]/30 overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-bold text-slate-200 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#d4a574]" />
                    {item.q}
                  </span>
                  <span className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 text-slate-400 border-t border-white/5 bg-[#1e293b]/50">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-[#1e293b]/50 border border-emerald-500/20 flex items-center gap-4 justify-center">
            <Lock className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <h4 className="font-bold text-white">安心のセキュリティ体制</h4>
              <p className="text-sm text-slate-400">エンタープライズレベルのデータ保護とプライバシー管理を徹底しています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574] to-[#b08050]"></div>
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] opacity-20 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
            まずは無料で、<br/>世界の知見に触れる
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            リスクをチャンスに変える、最初の一歩をここから踏み出しましょう。<br/>
            クレジットカード登録なしで、すぐに始められます。
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-[#b08050] hover:bg-slate-100 border-none h-14 px-10 text-lg font-bold shadow-xl">
              今すぐ無料で登録する
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0f1c] border-t border-white/10 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <span className="font-serif font-bold text-white text-xs">RH</span>
            </div>
            <span className="font-serif font-bold text-white">The Global Resilience Hub</span>
          </div>
          <p>&copy; 2025 The Global Resilience Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
