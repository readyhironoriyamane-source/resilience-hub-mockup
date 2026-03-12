import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Bell, Search, ArrowRight, Globe, Radio, Users, Shield } from "lucide-react";
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

        {/* Upcoming Events */}
        <section className="py-16 bg-[#0A0F1E] border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-white">近日開催のイベント</h2>
              <a href="#" className="text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 transition-colors">
                すべて見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Event Card 1 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-400 border border-white/10">
                    オンライン
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.03.15 (水) 14:00</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    【緊急開催】改正BCPガイドライン徹底解説セミナー
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-lg">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-white/10">
                    オフライン (東京)
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.03.22 (水) 18:00</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    防災テック交流会 Vol.5 @渋谷
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-lg">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-400 border border-white/10">
                    オンライン
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.04.05 (土) 10:00</div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    家庭でできる！実践的防災グッズ選定ワークショップ
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-lg">
                      申し込む
                    </Button>
                  </div>
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
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative border border-white/5">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-white text-xs font-bold bg-blue-600 px-2 py-1 rounded">Summit</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-2">2026.03.01</div>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                  Global Resilience Summit 2026 開催レポート：世界30ヶ国の知見が集結
                </h3>
              </div>

              {/* Report 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative border border-white/5">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-white text-xs font-bold bg-emerald-600 px-2 py-1 rounded">Workshop</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-2">2026.02.20</div>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                  【参加者アンケート公開】BCP策定ワークショップの満足度98%の理由
                </h3>
              </div>

              {/* Report 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative border border-white/5">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <span className="text-white text-xs font-bold bg-purple-600 px-2 py-1 rounded">Interview</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 mb-2">2026.02.15</div>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors">
                  「想定外」をなくすために。防災専門家が語る2026年のリスク予測
                </h3>
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

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group">
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.10</div>
                <div className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/50 text-blue-300 border border-blue-800/50 w-fit">ニュース</div>
                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                  会員数が1,000名を突破しました
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group">
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.08</div>
                <div className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 w-fit">アップデート</div>
                <div className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                  ダッシュボードに「地域別リスクマップ」機能を追加しました
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer group">
                <div className="text-sm text-slate-400 w-32 shrink-0">2026.03.01</div>
                <div className="px-2 py-0.5 rounded text-xs font-bold bg-purple-900/50 text-purple-300 border border-purple-800/50 w-fit">イベント</div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/metaverse_thumbnail-3TcSCDKJSKp8WpUzcn2Cx6.webp" alt="Metaverse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 backdrop-blur-md flex items-center justify-center mb-2 border border-blue-500/30">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">防災メタバース</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">
                    バーチャル空間で災害シミュレーションを体験。リアルな避難訓練をどこでも実施可能に。
                  </p>
                  <Button variant="link" className="p-0 h-auto text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 w-fit">
                    詳細を見る <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/mr_training_thumbnail-B89jAZbo9hstbu9Hto9BnU.webp" alt="MR Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600/20 backdrop-blur-md flex items-center justify-center mb-2 border border-emerald-500/30">
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">東大MR防災訓練</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">
                    最新のMR技術を活用した次世代の防災訓練プログラム。産学連携による科学的アプローチ。
                  </p>
                  <Button variant="link" className="p-0 h-auto text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 w-fit">
                    詳細を見る <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Service 3 */}
              <div className="group bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden">
                  <img src="https://d2xsxph8kpxj0f.cloudfront.net/92549119/2ougMYJUE3LHKcm4xk3UjD/ai_reskilling_thumbnail-7Md9Y4utBPrNhJJddubSuY.webp" alt="AI Reskilling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-600/20 backdrop-blur-md flex items-center justify-center mb-2 border border-purple-500/30">
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">AIリスキリング</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">
                    防災業務のDXを推進するためのAI活用スキル習得講座。実践的なプロンプトエンジニアリングも。
                  </p>
                  <Button variant="link" className="p-0 h-auto text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 w-fit">
                    詳細を見る <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
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
