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
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col md:flex-row">
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

      <main className="flex-1 relative z-10 min-h-screen flex flex-col min-w-0 bg-white">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Header (Desktop only) - Dark to match Sidebar */}
        <header 
          className={`hidden md:block sticky top-0 z-30 bg-[#0B1026]/95 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="キーワード検索..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-base text-white placeholder:text-muted-foreground focus:outline-none focus:bg-white/10 focus:border-white/20 w-64 transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0B1026]" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section (Light) */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-slate-50 border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                現在 1,240名 が登録中
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                防災の診断・情報・つながりが<br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">一か所に集まる場所</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
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
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900">近日開催のイベント</h2>
              <a href="#" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                すべて見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Event Card 1 */}
              <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    オンライン
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.03.15 (水) 14:00</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    【緊急開催】改正BCPガイドライン徹底解説セミナー
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-lg">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm">
                    オフライン (東京)
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.03.22 (水) 18:00</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    防災テック交流会 Vol.5 @渋谷
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-lg">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    オンライン
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="text-sm font-bold text-[#D4B84A] mb-2">2026.04.05 (土) 10:00</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    家庭でできる！実践的防災グッズ選定ワークショップ
                  </h3>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-lg">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Reports */}
        <section className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900">イベントレポート</h2>
              <a href="#" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                すべて見る <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Report 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-xs font-bold bg-blue-600 px-2 py-1 rounded">Summit</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-2">2026.03.01</div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  Global Resilience Summit 2026 開催レポート：世界30ヶ国の知見が集結
                </h3>
              </div>

              {/* Report 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-xs font-bold bg-emerald-600 px-2 py-1 rounded">Workshop</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-2">2026.02.20</div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  自治体×スタートアップ連携による地域防災の新しい形
                </h3>
              </div>

              {/* Report 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/2] rounded-xl overflow-hidden mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop" alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-xs font-bold bg-purple-600 px-2 py-1 rounded">Award</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mb-2">2026.02.15</div>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  ジャパン・レジリエンス・アワード2025 受賞者インタビュー
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* News List */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">お知らせ</h2>
              <p className="text-slate-500">プラットフォームからの最新情報をお届けします</p>
            </div>

            <div className="space-y-4">
              {[
                { date: "2026.03.10", cat: "メンテナンス", title: "システムメンテナンスのお知らせ（3/20 2:00-4:00）" },
                { date: "2026.03.08", cat: "新機能", title: "「防災ダッシュボード」に新機能が追加されました" },
                { date: "2026.03.05", cat: "プレスリリース", title: "会員数1,000名突破記念キャンペーンを開始します" },
                { date: "2026.03.01", cat: "重要", title: "利用規約改定のお知らせ" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 p-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-slate-400 font-mono">{item.date}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 min-w-[80px] text-center">
                      {item.cat}
                    </span>
                  </div>
                  <div className="text-slate-900 font-medium hover:text-blue-600 transition-colors">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full px-8 border-slate-200 text-slate-600 hover:bg-slate-50">
                一覧を見る
              </Button>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">関連サービス</h2>
              <p className="text-slate-500">レジリエンスを高めるための多様なソリューション</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">防災メタバース</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  バーチャル空間でリアルな災害シミュレーションを体験。場所を選ばず避難訓練が可能に。
                </p>
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                  詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Radio className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">東大MR防災訓練</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  複合現実技術を活用した次世代型訓練プログラム。より実践的な判断力を養います。
                </p>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group">
                <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AIリスキリング</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">
                  防災業務におけるAI活用スキルを習得。データ分析から意思決定支援まで幅広くカバー。
                </p>
                <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                  詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer (Dark) */}
        <footer className="bg-[#0A0F1E] text-slate-400 py-12 border-t border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">The Global Resilience Hub</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <a href="#" className="hover:text-white transition-colors">利用規約</a>
                <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
                <a href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</a>
                <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
              </div>
            </div>
            <div className="text-center text-xs text-slate-600 border-t border-white/5 pt-8">
              &copy; 2026 Global Resilience Hub. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
