import { Button } from "@/components/ui/button";
import { Check, Globe, LayoutDashboard, Sparkles, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans selection:bg-[#d4a574] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 flex items-center justify-center">
              <span className="font-serif font-bold text-white">RH</span>
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">The Global Resilience Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-white">ログイン</Button>
            </Link>
            <Link href="/">
              <Button className="bg-[#d4a574] hover:bg-[#c49564] text-white border-none">無料で始める</Button>
            </Link>
          </div>
        </div>
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
            日本と世界の<br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400">"防災とレジリエンスの知"</span>
            を繋ぐ
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The Global Resilience Hubは、世界中の防災テック情報、リスク予兆、そして最適なソリューションをAIが繋ぐ、次世代のコミュニティ型プラットフォームです。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-[#d4a574] hover:bg-[#c49564] text-white border-none h-12 px-8 text-base">
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

      {/* Core Values Section */}
      <section className="py-20 bg-[#0a0f1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">3つのコアバリュー</h2>
            <p className="text-muted-foreground">レジハブが提供する、持続可能な成長のための3つのエンジン</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1: Solution Intelligence */}
            <div className="p-8 rounded-2xl bg-[#1e293b]/30 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-100">ソリューション<br/>インテリジェンス</h3>
              <p className="text-xs font-bold text-blue-400 mb-4 tracking-wider">ACQUISITION (集客)</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>世界中の防災テック情報DB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>公式バッジによる信頼性担保</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <span>カテゴリ別ニュースフィード</span>
                </li>
              </ul>
            </div>

            {/* Value 2: Personal Dashboard */}
            <div className="p-8 rounded-2xl bg-[#1e293b]/30 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-emerald-100">パーソナル<br/>ダッシュボード</h3>
              <p className="text-xs font-bold text-emerald-400 mb-4 tracking-wider">RETENTION (定着)</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>自社課題・リスクの可視化</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>導入ソリューション管理</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>気になる情報のクリッピング</span>
                </li>
              </ul>
            </div>

            {/* Value 3: AI Matching & Community */}
            <div className="p-8 rounded-2xl bg-[#1e293b]/30 border border-orange-500/20 hover:border-orange-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-100">AIマッチング &<br/>コミュニティ</h3>
              <p className="text-xs font-bold text-orange-400 mb-4 tracking-wider">MONETIZATION (収益化)</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>AI要約 & 最適解レコメンド</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>課題解決型スレッド (Q&A)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <span>ベンダーへの自動送客</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#0f172a]">
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

      {/* Footer */}
      <footer className="py-12 bg-[#0a0f1c] border-t border-white/10 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 The Global Resilience Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
