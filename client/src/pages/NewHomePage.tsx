import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Bell, Search, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NewHomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white font-sans flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with mobile visibility control */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shrink-0`}>
        <Sidebar />
      </div>

      <main className="flex-1 relative z-10 min-h-screen flex flex-col min-w-0 bg-[#0A0F1E]">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Header (Desktop only) - Dark to match Sidebar */}
        <header 
          className={`hidden md:block sticky top-0 z-30 bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="キーワード検索..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:bg-white/10 focus:border-white/20 w-64 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0A0F1E]" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section (Dark) */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#0A0F1E] border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium mb-6 border border-blue-800/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                現在 1,240名 が登録中
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                防災の診断・情報・つながりが<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">一か所に集まる場所</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
                The Global Resilience Hubへようこそ。<br />
                最新の防災トレンド、専門家とのネットワーク、実践的なツールを活用して、<br className="hidden md:block" />
                組織と地域のレジリエンスを高めましょう。
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="/news">
                  <Button size="lg" className="w-full sm:w-auto bg-[#D4B84A] hover:bg-[#C4A83A] text-[#0A0F1E] font-bold text-lg px-8 h-12 rounded-full shadow-lg shadow-yellow-500/20">
                    最新の防災ニュースを見る
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Press Release */}
        <section className="py-16 bg-[#0A0F1E] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-white">プレスリリース</h2>
              <a href="#" className="text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Press Release 1 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop" alt="Press Release" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.03.12</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    次世代防災プラットフォーム「Resilience Hub」正式リリース
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                    企業や自治体の防災担当者向けに、最新の防災情報とコミュニティ機能を提供する新サービスを開始しました。
                  </p>
                  <div className="mt-auto pt-4">
                    <a href="https://example.com/pr1" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center gap-2">
                        詳細を見る <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Press Release 2 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Press Release" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.02.28</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    AIを活用したリアルタイム被害予測システムの実証実験を開始
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                    気象データとSNS情報を統合し、AIがリアルタイムで被害状況を予測・可視化する新システムの実証実験を東京都内で開始しました。
                  </p>
                  <div className="mt-auto pt-4">
                    <a href="https://example.com/pr2" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center gap-2">
                        詳細を見る <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Press Release 3 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Press Release" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.01.15</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    大手企業50社が参画する「防災DXコンソーシアム」設立
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                    業界の垣根を越えて防災分野のデジタルトランスフォーメーションを推進するコンソーシアムを設立しました。
                  </p>
                  {/* No source_url for this one, so no button */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Reports */}
        <section className="py-16 bg-[#0A0F1E] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-white">イベントレポート</h2>
              <a href="#" className="text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Report 1 */}
              <div className="group cursor-pointer bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col" onClick={() => setLocation('/report/1')}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-slate-400 mb-2">2026.03.01</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                    Global Resilience Summit 2026 開催レポート：世界30ヶ国の知見が集結
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    気候変動による激甚化する災害に対し、グローバルな視点でレジリエンスをどう高めるか。3日間にわたるサミットのハイライトをお届けします。
                  </p>
                </div>
              </div>

              {/* Report 2 */}
              <div className="group cursor-pointer bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col" onClick={() => setLocation('/report/2')}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-slate-400 mb-2">2026.02.20</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                    【参加者アンケート公開】BCP策定ワークショップの満足度98%の理由
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    実践的なシナリオを用いたBCP策定ワークショップ。参加者の声から見えてきた、本当に役立つBCPのあり方とは。
                  </p>
                </div>
              </div>

              {/* Report 3 */}
              <div className="group cursor-pointer bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col" onClick={() => setLocation('/report/3')}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-xs text-slate-400 mb-2">2026.02.15</div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                    「想定外」をなくすために。防災専門家が語る2026年のリスク予測
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    第一線で活躍する防災専門家3名によるパネルディスカッション。今年注視すべき新たなリスクとその対策について語られました。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News */}
        <section className="py-16 bg-[#0A0F1E] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-white">お知らせ</h2>
              <a href="#" className="text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
                一覧を見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-2">
              <div 
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group"
                onClick={() => setLocation('/news/1')}
              >
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.10</div>
                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                  会員数が1,000名を突破しました
                </div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div 
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group"
                onClick={() => setLocation('/news/2')}
              >
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.08</div>
                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                  ダッシュボードに「地域別リスクマップ」機能を追加しました
                </div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div 
                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group"
                onClick={() => setLocation('/news/3')}
              >
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.01</div>
                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                  4月開催のワークショップの先行予約を開始しました
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-[#0A0F1E]">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-10">関連サービス</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Service 1 */}
              <a href="https://example.com/metaverse" target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 block">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/metaverse_thumbnail-3TcSCDKJSKp8WpUzcn2Cx6.webp" alt="防災メタバース" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-[#0A0F1E]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors drop-shadow-lg">防災メタバース</h3>
                </div>
              </a>

              {/* Service 2 */}
              <a href="https://example.com/mr-training" target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-300 block">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/mr_training_thumbnail-B89jAZbo9hstbu9Hto9BnU.webp" alt="東大MR防災訓練" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-[#0A0F1E]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors drop-shadow-lg">東大MR防災訓練</h3>
                </div>
              </a>

              {/* Service 3 */}
              <a href="https://example.com/ai-reskilling" target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 block">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/ai_reskilling_thumbnail-7Md9Y4utBPrNhJJddubSuY.webp" alt="AIリスキリング" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-[#0A0F1E]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors drop-shadow-lg">AIリスキリング</h3>
                </div>
              </a>

              {/* Service 4 */}
              <a href="https://example.com/consulting" target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 block">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/disaster_consulting_thumbnail-6GzoaR2rgmas5mzh4CDj2X.webp" alt="防災コンサルティング" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-[#0A0F1E]/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors drop-shadow-lg">防災コンサルティング</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-[#050814] border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-white font-bold text-xl tracking-tight">
                The Global Resilience Hub
              </div>
              <div className="flex gap-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">利用規約</a>
                <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
                <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
              </div>
              <div className="text-xs text-slate-600">
                © 2026 Global Resilience Hub
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
