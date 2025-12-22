import { Button } from "@/components/ui/button";
import { 
  Check, Globe, LayoutDashboard, Sparkles, ArrowRight, ShieldCheck, Users, 
  AlertTriangle, Network, Clock, Building2, Briefcase, LineChart, HelpCircle, Lock,
  Menu, X, Crown
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
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 flex items-center justify-center">
                <span className="font-serif font-bold text-white">RH</span>
              </div>
              <span className="font-serif font-bold text-lg tracking-tight truncate max-w-[200px] md:max-w-none">The Global Resilience Hub</span>
            </div>
          </Link>
          
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
                <p className="text-xs font-bold text-blue-400 mb-4 tracking-wider">OSINTech連携</p>
                <p className="text-blue-200/80 mb-6 text-sm leading-relaxed">
                  世界中の防災テック情報を会員限定で閲覧可能。
                  AIが関心に合わせてタイムラインを最適化し、1500を超える国際機関からの情報を一元化します。
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    AIによるタイムライン最適化
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    1500超の国際機関情報連携
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    リスク予兆検知アラート
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
                <p className="text-xs font-bold text-emerald-400 mb-4 tracking-wider">AI最適化 & 可視化</p>
                <p className="text-emerald-200/80 mb-6 text-sm leading-relaxed">
                  自社課題からのリスク可視化と導入ソリューション管理を実現。
                  関心分野のクリッピングによって、ダッシュボードの精度を高めていくことができます。
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
                <p className="text-xs font-bold text-orange-400 mb-4 tracking-wider">ユーザー共創</p>
                <p className="text-orange-200/80 mb-6 text-sm leading-relaxed">
                  ダッシュボードに対しAIが要約や最適解をレコメンド。
                  ユーザー同士のコミュニティ形成により、世界中の人と質の高いQ&Aを繰り広げられます。
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    AI要約 & 最適解レコメンド
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    質の高いQ&Aコミュニティ
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 shrink-0">
                      <Check className="w-3 h-3 text-orange-400" />
                    </div>
                    ユーザー同士のマッチング
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

          {/* Mobile View: Cards */}
          <div className="md:hidden space-y-6">
            {/* Free Plan */}
            <div className="p-6 rounded-xl bg-[#1e293b]/50 border border-white/5 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <div className="text-2xl font-bold mt-2">¥0</div>
                <p className="text-xs text-muted-foreground mt-1">リード獲得用</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">機能ハイライト</p>
                  <ul className="space-y-2">
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-slate-500" /> タイムライン閲覧 (3件/日)
                    </li>
                  </ul>
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
                <div className="text-2xl font-bold mt-2 text-blue-400">¥30,000<span className="text-sm text-muted-foreground font-normal">/月</span></div>
                <p className="text-xs text-muted-foreground mt-1">SaaS単体利用</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">機能ハイライト</p>
                  <ul className="space-y-2">
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-500" /> タイムライン無制限閲覧
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-500" /> 課題・導入管理
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-blue-500" /> AIサマリー/マッチング
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none">
                選択する
              </Button>
            </div>

            {/* Bundle Plan (Recommended) */}
            <div className="p-6 rounded-xl bg-[#1e293b] border-2 border-emerald-500 flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider">
                Recommended
              </div>
              <div className="mb-4 mt-4">
                <h3 className="text-lg font-bold text-emerald-100">Bundle</h3>
                <div className="text-2xl font-bold mt-2 text-emerald-400">¥60,000<span className="text-sm text-muted-foreground font-normal">/月</span></div>
                <p className="text-xs text-emerald-500/80 mt-1 font-medium">OSINTech + 協会付帯</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">Standardの全機能に加え:</p>
                  <ul className="space-y-2">
                    <li className="text-xs text-emerald-400 flex items-center gap-2 font-medium">
                      <ShieldCheck className="w-3 h-3" /> OSINTech リスク予兆
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500" /> コミュニティ参加権限
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500" /> 協会会員資格 (自動付帯)
                    </li>
                  </ul>
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
                <p className="text-xs text-muted-foreground mt-1">戦略パートナー枠</p>
              </div>
              <div className="flex-1 space-y-4 mb-6">
                <div className="text-sm border-t border-white/10 pt-4">
                  <p className="font-medium text-slate-300 mb-2">Bundleの全機能に加え:</p>
                  <ul className="space-y-2">
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Crown className="w-3 h-3 text-orange-500" /> 特別会員 (VIP)
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-orange-500" /> 優先レコメンド
                    </li>
                    <li className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="w-3 h-3 text-orange-500" /> イベント出展権含む
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-none">
                お問い合わせ
              </Button>
            </div>
          </div>

          {/* Desktop View: Comparison Table */}
          <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
            <div className="min-w-[800px] bg-[#1e293b]/50 rounded-xl border border-white/5 overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-5 border-b border-white/10">
                <div className="p-6 flex flex-col justify-center border-r border-white/5 bg-[#0f172a]/50">
                  <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Plan Comparison</span>
                  <h3 className="text-lg font-bold text-white mt-1">機能・特典一覧</h3>
                </div>
                
                {/* Free */}
                <div className="p-6 text-center border-r border-white/5 bg-[#1e293b]/30">
                  <h4 className="font-bold text-slate-300 mb-2">Free</h4>
                  <div className="text-2xl font-bold text-white mb-1">¥0</div>
                  <p className="text-xs text-muted-foreground">リード獲得用</p>
                </div>

                {/* Standard */}
                <div className="p-6 text-center border-r border-white/5 bg-[#1e293b]/30">
                  <h4 className="font-bold text-blue-400 mb-2">Standard</h4>
                  <div className="text-2xl font-bold text-white mb-1">¥30,000<span className="text-sm font-normal text-muted-foreground">/月</span></div>
                  <p className="text-xs text-muted-foreground">SaaS単体利用</p>
                </div>

                {/* Bundle (Recommended) */}
                <div className="p-6 text-center border-r border-white/5 bg-emerald-950/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Recommended
                  </div>
                  <h4 className="font-bold text-emerald-400 mb-2 mt-4">Bundle</h4>
                  <div className="text-2xl font-bold text-white mb-1">¥60,000<span className="text-sm font-normal text-muted-foreground">/月</span></div>
                  <p className="text-xs text-emerald-500/80 font-medium">OSINTech + 協会付帯</p>
                </div>

                {/* Premium */}
                <div className="p-6 text-center bg-orange-950/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
                  <h4 className="font-bold text-orange-400 mb-2">Premium</h4>
                  <div className="text-2xl font-bold text-white mb-1">¥100,000<span className="text-sm font-normal text-muted-foreground">/月</span></div>
                  <p className="text-xs text-orange-500/80 font-medium">戦略パートナー枠</p>
                </div>
              </div>

              {/* Section 1: Solution Intelligence */}
              <div className="bg-[#0f172a]/30 px-6 py-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-slate-300">① ソリューション・インテリジェンス（情報収集）</h4>
              </div>
              
              {/* Row: Timeline */}
              <div className="grid grid-cols-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border-r border-white/5 flex flex-col justify-center">
                  <span className="font-bold text-sm text-slate-200">タイムライン閲覧</span>
                  <span className="text-xs text-muted-foreground mt-0.5">最新の防災ソリューション・ニュース</span>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-sm font-medium text-slate-300">
                  3件/日
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center bg-emerald-950/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center bg-orange-950/10">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Row: OSINTech Risk Prediction */}
              <div className="grid grid-cols-5 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border-r border-white/5 flex flex-col justify-center">
                  <span className="font-bold text-sm text-emerald-400">OSINTech リスク予兆</span>
                  <span className="text-xs text-muted-foreground mt-0.5">国際ルール形成・予兆検知 (RuleWatcher)</span>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex flex-col items-center justify-center bg-emerald-950/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500">閲覧権限解放</span>
                </div>
                <div className="p-4 flex items-center justify-center bg-orange-950/10">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Section 2: Personal Dashboard */}
              <div className="bg-[#0f172a]/30 px-6 py-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-slate-300">② パーソナル・ダッシュボード（業務管理）</h4>
              </div>

              {/* Row: Issue Management */}
              <div className="grid grid-cols-5 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border-r border-white/5 flex flex-col justify-center">
                  <span className="font-bold text-sm text-slate-200">課題・導入管理</span>
                  <span className="text-xs text-muted-foreground mt-0.5">自社のリスク・対策状況の可視化と台帳管理</span>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center bg-emerald-950/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center bg-orange-950/10">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Section 3: AI Matching & Community */}
              <div className="bg-[#0f172a]/30 px-6 py-3 border-b border-white/10">
                <h4 className="text-sm font-bold text-slate-300">③ AIマッチング & コミュニティ（解決・権威）</h4>
              </div>

              {/* Row: AI Summary/Matching */}
              <div className="grid grid-cols-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border-r border-white/5 flex flex-col justify-center">
                  <span className="font-bold text-sm text-slate-200">AIサマリー/マッチング</span>
                  <span className="text-xs text-muted-foreground mt-0.5">課題に対する最適解レコメンド・AIスレッド</span>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center bg-emerald-950/10">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center bg-orange-950/10">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Row: Association Membership */}
              <div className="grid grid-cols-5 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <div className="p-4 border-r border-white/5 flex flex-col justify-center">
                  <span className="font-bold text-sm text-[#d4a574]">協会 会員資格</span>
                  <span className="text-xs text-muted-foreground mt-0.5">認証バッジ付与・イベント優先出展権</span>
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center text-muted-foreground">-</div>
                <div className="p-4 border-r border-white/5 flex flex-col items-center justify-center bg-emerald-950/10">
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">自動付帯</span>
                </div>
                <div className="p-4 flex flex-col items-center justify-center bg-orange-950/10">
                  <Crown className="w-4 h-4 text-orange-500 mb-1" />
                  <span className="text-[10px] font-bold text-orange-500">特別会員 (VIP)</span>
                </div>
              </div>

              {/* Footer Row (CTA) */}
              <div className="grid grid-cols-5 bg-[#0f172a]/50">
                <div className="p-6 border-r border-white/5"></div>
                <div className="p-6 border-r border-white/5">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent text-xs h-9">
                    無料で開始
                  </Button>
                </div>
                <div className="p-6 border-r border-white/5 text-center">
                  <span className="text-xs font-bold text-blue-400 block mb-2">SaaS標準</span>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none text-xs h-9">
                    選択する
                  </Button>
                </div>
                <div className="p-6 border-r border-white/5 bg-emerald-950/10 text-center">
                  <span className="text-xs font-bold text-emerald-500 block mb-2">一番人気 (お得)</span>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none font-bold text-xs h-9 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    今すぐ始める
                  </Button>
                </div>
                <div className="p-6 bg-orange-950/10 text-center">
                  <span className="text-xs font-bold text-orange-500 block mb-2">戦略パートナー</span>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-none text-xs h-9">
                    お問い合わせ
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-right text-xs text-muted-foreground mt-4">
              ※ プレミアムプラン（年額120万円相当）には、年1回のイベント出展権（30万円相当）を含みます。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ & Trust Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">よくある質問</h2>
            <p className="text-muted-foreground">導入検討時によくいただくご質問をまとめました</p>
          </div>

          <div className="space-y-12">
            {/* Category 1: Service & Features */}
            <div>
              <h3 className="text-xl font-bold text-[#d4a574] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> サービス・機能について
              </h3>
              <div className="space-y-4">
                {[
                  { q: "海外情報の翻訳精度はどの程度ですか？", a: "最新のLLM（大規模言語モデル）を活用し、防災・レジリエンス分野の専門用語に特化したチューニングを行っています。単なる直訳ではなく、文脈を理解した要約・解説を提供するため、専門家でなくても内容を正確に把握できます。" },
                  { q: "情報の更新頻度はどのくらいですか？", a: "OSINTech連携により、世界中のソースを24時間365日モニタリングしています。重大なリスク予兆やニュースはリアルタイムで検知し、ダッシュボードおよびアラート通知にて即座にお知らせします。" },
                  { q: "特定の国や地域の情報だけを収集できますか？", a: "はい、可能です。パーソナル・ダッシュボードの設定で、関心のある国・地域、または特定の災害種別（洪水、地震、サイバー攻撃など）をフィルタリング登録することで、必要な情報だけを効率的に収集できます。" }
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
                      <div className="px-6 py-4 text-slate-400 border-t border-white/5 bg-[#1e293b]/50 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Contract & Pricing */}
            <div>
              <h3 className="text-xl font-bold text-[#d4a574] mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5" /> 契約・料金について
              </h3>
              <div className="space-y-4">
                {[
                  { q: "自治体向けの請求書払いは対応していますか？", a: "はい、対応しております。StandardプランおよびPremiumプランでは、請求書払い（月末締め翌月末払い）が可能です。見積書・納品書・請求書の発行など、自治体様の会計処理に合わせた柔軟な対応を行っております。" },
                  { q: "最低契約期間はありますか？", a: "Standardプランは1ヶ月単位での契約・解約が可能です。Premiumプラン（パートナー契約）につきましては、専任サポート体制構築のため、原則として6ヶ月または12ヶ月契約をお願いしております。" },
                  { q: "トライアル期間はありますか？", a: "Freeプラン（お試し体験）にて、基本機能を無期限でご確認いただけます。また、法人・自治体様向けに、Standardプランの全機能を2週間無料でお試しいただけるトライアル制度もご用意しております。詳細はお問い合わせください。" }
                ].map((item, i) => (
                  <div key={i + 10} className="border border-white/10 rounded-lg bg-[#1e293b]/30 overflow-hidden">
                    <button 
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      onClick={() => toggleFaq(i + 10)}
                    >
                      <span className="font-bold text-slate-200 flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-[#d4a574]" />
                        {item.q}
                      </span>
                      <span className={`transform transition-transform ${openFaq === i + 10 ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openFaq === i + 10 && (
                      <div className="px-6 py-4 text-slate-400 border-t border-white/5 bg-[#1e293b]/50 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Security & Support */}
            <div>
              <h3 className="text-xl font-bold text-[#d4a574] mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" /> セキュリティ・サポート
              </h3>
              <div className="space-y-4">
                {[
                  { q: "セキュリティ対策について教えてください", a: "通信の常時SSL化、WAF（Web Application Firewall）による攻撃遮断、データの国内サーバー保管など、金融機関レベルのセキュリティ対策を実施しています。また、第三者機関による脆弱性診断を定期的に実施し、安全性の確保に努めています。" },
                  { q: "導入時のサポート体制はどのようになっていますか？", a: "導入時には、オンラインでの操作説明会や初期設定サポート（キーワード登録支援など）を実施いたします。運用開始後も、チャットおよびメールでのサポート窓口をご利用いただけます（Standardプラン以上）。" },
                  { q: "LGWAN（総合行政ネットワーク）環境で利用できますか？", a: "現在はインターネット経由でのクラウドサービスとして提供しておりますが、LGWAN-ASP対応についても順次検討を進めております。LGWAN接続端末からのご利用については、自治体様のセキュリティポリシーに合わせて個別にご相談可能です。" }
                ].map((item, i) => (
                  <div key={i + 20} className="border border-white/10 rounded-lg bg-[#1e293b]/30 overflow-hidden">
                    <button 
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      onClick={() => toggleFaq(i + 20)}
                    >
                      <span className="font-bold text-slate-200 flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-[#d4a574]" />
                        {item.q}
                      </span>
                      <span className={`transform transition-transform ${openFaq === i + 20 ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {openFaq === i + 20 && (
                      <div className="px-6 py-4 text-slate-400 border-t border-white/5 bg-[#1e293b]/50 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-emerald-500/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Lock className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h4 className="text-xl font-bold text-white mb-2">エンタープライズレベルの安全性</h4>
              <p className="text-slate-400 leading-relaxed">
                ISO27001（ISMS）認証取得に向けた運用体制を構築。
                お客様の大切なデータとプライバシーを守るため、最高水準のセキュリティ対策を講じています。
              </p>
            </div>
            <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 whitespace-nowrap">
              セキュリティ詳細を見る
            </Button>
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
