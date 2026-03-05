import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Bell, Search, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex flex-col md:flex-row">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

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

      <main className="flex-1 relative z-10 min-h-screen flex flex-col min-w-0">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Header (Desktop only) */}
        <header 
          className={`hidden md:block sticky top-0 z-30 bg-[#0B1026]/95 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="md:hidden flex items-center gap-3">
            </div>
            <div className="hidden md:block">
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="キーワード検索..." 
                  className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-base text-white placeholder:text-muted-foreground focus:outline-none focus:bg-white/10 focus:border-white/20 w-64 transition-all"
                />
              </div>
              <Search className="md:hidden w-5 h-5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
              
              <div className="relative cursor-pointer group">
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0B1026]" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section (Visible on all devices) */}
        <div className="bg-[#151e32] border-b border-white/5 relative z-20">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-2xl hidden md:block">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left w-full">
              <div className="md:hidden w-20 h-20 rounded-xl overflow-hidden border border-white/10 shadow-2xl mx-auto mb-4">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-sans text-2xl md:text-3xl font-bold mb-2">The Global Resilience Hub</h1>
              <div className="text-base md:text-lg text-muted-foreground mb-2 px-2 md:px-0 leading-relaxed">
                <p className="font-bold text-white">世界中の防災・レジリエンスに関する知見が集まる場所。</p>
              </div>

              {/* Event Report Section */}
              <div className="mt-6 mb-2">
                <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/20 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-blue-900/20 transition-colors group cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                        イベント報告
                      </span>
                      <span className="text-xs text-slate-400">2026.03.01</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      3/1 Global Resilience Summit 開催報告
                    </h3>
                    <p className="text-sm text-slate-300 mt-1 line-clamp-1 md:line-clamp-2">
                      世界30ヶ国から専門家が集結し、次世代の防災インフラについて熱い議論が交わされました。当日のアーカイブ動画と資料を公開しています。
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-200">
                      詳細を見る
                    </Button>
                  </div>
                </div>
              </div>

              {/* Featured Banners Carousel */}
              <div className="mt-6 mb-6 w-full overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max px-1">
                  {/* Banner 1: Award */}
                  <div className="w-72 h-40 rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-slate-900/90 z-10" />
                    <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop" alt="Award" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
                      <div className="bg-blue-500/20 backdrop-blur-sm text-blue-200 text-xs font-bold px-2 py-1 rounded w-fit border border-blue-400/30">
                        アワード
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">ジャパン・レジリエンス・アワード2026</h3>
                        <p className="text-blue-100/80 text-xs">エントリー受付中</p>
                      </div>
                    </div>
                  </div>

                  {/* Banner 2: Metaverse */}
                  <div className="w-72 h-40 rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-slate-900/90 z-10" />
                    <img src="https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1000&auto=format&fit=crop" alt="Metaverse" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
                      <div className="bg-purple-500/20 backdrop-blur-sm text-purple-200 text-xs font-bold px-2 py-1 rounded w-fit border border-purple-400/30">
                        防災メタバース
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">バーチャル避難訓練</h3>
                        <p className="text-purple-100/80 text-xs">スマホで体験可能</p>
                      </div>
                    </div>
                  </div>

                  {/* Banner 3: Bosai X */}
                  <div className="w-72 h-40 rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-slate-900/90 z-10" />
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" alt="Bosai X" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
                      <div className="bg-emerald-500/20 backdrop-blur-sm text-emerald-200 text-xs font-bold px-2 py-1 rounded w-fit border border-emerald-400/30">
                        防災X
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">次世代防災技術展</h3>
                        <p className="text-emerald-100/80 text-xs">最新テックが集結</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 pb-24">
          
          {/* Finalists/Award Winners Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-[#d4a574] rounded-full"></span>
                ファイナリスト・受賞者情報
              </h2>
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-white">
                すべて見る
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Winner 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="Winner 1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-[#d4a574] text-[#0B1026] text-xs font-bold px-2 py-1 rounded shadow-lg">
                    最優秀賞
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">田中 健一</div>
                      <div className="text-xs text-muted-foreground">株式会社レジリエンス・テック</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      先進技術部門
                    </span>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2 italic">
                    「AIを活用したリアルタイム避難誘導システムが評価されました。今後も技術で命を守る取り組みを加速させます。」
                  </p>
                </div>
              </div>

              {/* Winner 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" alt="Winner 2" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-slate-200 text-slate-800 text-xs font-bold px-2 py-1 rounded shadow-lg">
                    優秀賞
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">佐藤 美咲</div>
                      <div className="text-xs text-muted-foreground">NPO法人 地域防災ネットワーク</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      地域活動部門
                    </span>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2 italic">
                    「住民参加型の防災マップ作りが実を結びました。地域の絆こそが最強の防災インフラです。」
                  </p>
                </div>
              </div>

              {/* Winner 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group">
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" alt="Winner 3" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-amber-700 text-amber-100 text-xs font-bold px-2 py-1 rounded shadow-lg border border-amber-500/30">
                    特別賞
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-white/20">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">鈴木 一郎</div>
                      <div className="text-xs text-muted-foreground">未来都市建設株式会社</div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      企業レジリエンス部門
                    </span>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2 italic">
                    「BCP策定から訓練までの一貫した支援体制が高く評価されました。企業の存続を支え続けます。」
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Seminar/Event Announcement Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-[#d4a574] rounded-full"></span>
                セミナー・イベント告知
              </h2>
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-white">
                すべて見る
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-colors group">
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" alt="Event 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    オンライン
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-[#d4a574] font-bold mb-1">2026.03.15 (水) 14:00 - 16:00</div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">
                      【緊急開催】改正BCPガイドライン徹底解説セミナー
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      経産省の最新ガイドライン改定ポイントを、専門家が実務視点で分かりやすく解説します。
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">定員: 500名 (残席わずか)</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-colors group">
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop" alt="Event 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                    オフライン (東京)
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-[#d4a574] font-bold mb-1">2026.03.22 (水) 18:00 - 20:00</div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-emerald-300 transition-colors">
                      防災テック交流会 Vol.5 @渋谷
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      スタートアップから自治体担当者まで、防災に関わるプレイヤーが集うネットワーキングイベント。
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">定員: 50名 (抽選)</span>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      申し込む
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
