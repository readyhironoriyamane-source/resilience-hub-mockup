import { useState } from "react";
import { useLocation } from "wouter";
import { contentItems } from "@/lib/mock-data";
import { useBookmark } from "@/hooks/useBookmark";
import { useArticleLimit } from "@/hooks/useArticleLimit";
import { ContentCard } from "@/components/ContentCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Library, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Menu,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'library' | 'activity'>('overview');
  const [isIssuesExpanded, setIsIssuesExpanded] = useState(false);
  const [, setLocation] = useLocation();
  const { bookmarkedIds } = useBookmark();
  const { allReadArticles } = useArticleLimit();

  // Filter content items
  const bookmarkedArticles = contentItems.filter(item => bookmarkedIds.includes(item.id));
  const readArticles = contentItems.filter(item => allReadArticles.includes(item.id));

  const handleCardClick = (id: string) => {
    setLocation(`/article/${id}`);
  };

  // Mock critical issues
  const criticalIssues = [
    { id: 1, title: "サプライチェーン寸断リスク", deadline: "残り3日", priority: "High" },
    { id: 2, title: "BCPマニュアルの未更新", deadline: "残り5日", priority: "High" },
    { id: 3, title: "従業員安否確認システムのテスト未実施", deadline: "残り1週間", priority: "High" },
  ];

  const otherIssues = [
    { id: 4, title: "備蓄品の賞味期限チェック", deadline: "残り2週間", priority: "Medium" },
    { id: 5, title: "ハザードマップの最新版確認", deadline: "残り1ヶ月", priority: "Low" },
  ];

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 bg-[#0B1026]/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20">
              <span className="font-serif text-white font-bold text-xs">RH</span>
            </div>
            <span className="font-serif font-bold text-sm tracking-tight">Resilience Hub</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-white/10 bg-[#0B1026]">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Personal Dashboard</h1>
            <p className="text-muted-foreground">自社の課題解決と、あなたの学習活動を一元管理</p>
          </header>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mb-8 border-b border-white/10 overflow-x-auto no-scrollbar">
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="ホーム"
            />
            <TabButton 
              active={activeTab === 'library'} 
              onClick={() => setActiveTab('library')}
              icon={<Library className="w-4 h-4" />}
              label="マイライブラリ"
            />
            <TabButton 
              active={activeTab === 'activity'} 
              onClick={() => setActiveTab('activity')}
              icon={<MessageSquare className="w-4 h-4" />}
              label="アクティビティ"
            />
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Resilience Process Flow */}
                <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    レジリエンス向上プロセス
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                    
                    {[
                      { step: 1, title: "課題登録", icon: <FileText className="w-5 h-5" />, status: "completed" },
                      { step: 2, title: "リスク可視化", icon: <BarChart3 className="w-5 h-5" />, status: "completed" },
                      { step: 3, title: "ソリューション導入", icon: <Lightbulb className="w-5 h-5" />, status: "current" },
                      { step: 4, title: "スコア算出", icon: <ShieldCheck className="w-5 h-5" />, status: "pending" },
                    ].map((item, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 border-2 transition-colors ${
                          item.status === 'completed' ? 'bg-primary border-primary text-white' :
                          item.status === 'current' ? 'bg-[#0B1026] border-primary text-primary shadow-[0_0_15px_rgba(56,189,248,0.5)]' :
                          'bg-[#0B1026] border-white/20 text-muted-foreground'
                        }`}>
                          {item.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : item.icon}
                        </div>
                        <h3 className={`font-bold text-sm ${item.status === 'pending' ? 'text-muted-foreground' : 'text-white'}`}>
                          {item.title}
                        </h3>
                        {item.status === 'current' && (
                          <span className="text-xs text-primary mt-1 font-bold animate-pulse">進行中</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Critical Issues List */}
                  <section className="lg:col-span-2 bg-[#1e293b]/50 border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                      <h2 className="text-lg font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        対応が必要な課題
                      </h2>
                      <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-2 py-1 rounded">
                        要対応 {criticalIssues.length + otherIssues.length}件
                      </span>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                      {/* Critical Issues (Always Visible) */}
                      {criticalIssues.map((issue) => (
                        <div key={issue.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                            <div>
                              <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{issue.title}</h3>
                              <p className="text-xs text-red-400 font-medium mt-0.5">{issue.deadline}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-muted-foreground group-hover:text-white">
                            詳細 <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}

                      {/* Expandable Other Issues */}
                      {isIssuesExpanded && otherIssues.map((issue) => (
                        <div key={issue.id} className="p-4 hover:bg-white/5 transition-colors flex items-center justify-between group cursor-pointer bg-black/20">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div>
                              <h3 className="font-bold text-sm text-white/80 group-hover:text-primary transition-colors">{issue.title}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{issue.deadline}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-muted-foreground group-hover:text-white">
                            詳細 <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {otherIssues.length > 0 && (
                      <button 
                        onClick={() => setIsIssuesExpanded(!isIssuesExpanded)}
                        className="w-full py-3 text-xs font-bold text-muted-foreground hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-1 border-t border-white/5"
                      >
                        {isIssuesExpanded ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            閉じる
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            その他の課題を表示 ({otherIssues.length}件)
                          </>
                        )}
                      </button>
                    )}
                  </section>

                  {/* Current Score Summary */}
                  <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <ShieldCheck className="w-40 h-40 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-muted-foreground mb-2">現在のレジリエンススコア</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-6xl font-bold text-white tracking-tighter">72</span>
                      <span className="text-xl text-muted-foreground">/ 100</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '72%' }} />
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">
                      ソリューション導入が進んでいます。<br/>
                      <span className="text-primary font-bold">「サプライチェーン管理」</span>の対策完了で、スコア80点台到達が見込まれます。
                    </p>
                  </section>
                </div>

                {/* Recommended Actions */}
                <section>
                  <h2 className="text-xl font-bold font-serif mb-4">推奨アクション</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "サプライチェーン・リスク診断を受ける", time: "15分", type: "Diagnosis" },
                      { title: "「AI予兆検知」の導入事例レポートを読む", time: "5分", type: "Learning" }
                    ].map((action, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {action.type === 'Diagnosis' ? '診断' : '学習'}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{action.title}</h4>
                            <span className="text-xs text-muted-foreground">{action.time}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'library' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Bookmarks */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Library className="w-5 h-5 text-[#d4a574]" />
                    <h2 className="text-xl font-bold font-serif">ブックマーク</h2>
                    <span className="text-xs text-muted-foreground ml-2">{bookmarkedArticles.length} 件</span>
                  </div>
                  {bookmarkedArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bookmarkedArticles.map(item => (
                        <ContentCard 
                          key={item.id} 
                          item={item} 
                          onClick={() => handleCardClick(item.id)}
                          isRead={allReadArticles.includes(item.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                      <p className="text-muted-foreground">ブックマークした記事はありません</p>
                    </div>
                  )}
                </section>

                {/* Recently Read */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold font-serif">最近読んだ記事</h2>
                    <span className="text-xs text-muted-foreground ml-2">{readArticles.length} 件</span>
                  </div>
                  {readArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {readArticles.slice(0, 3).map(item => (
                        <ContentCard 
                          key={item.id} 
                          item={item} 
                          onClick={() => handleCardClick(item.id)}
                          isRead={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                      <p className="text-muted-foreground">閲覧履歴はありません</p>
                    </div>
                  )}
                </section>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-bold font-serif">コメント履歴</h2>
                </div>
                
                <div className="space-y-4">
                  {/* Mock Activity Items */}
                  {[
                    { article: "Turiyam AIに投資した理由...", comment: "非常に参考になりました。特にコスト削減の観点が...", date: "2025/12/13" },
                    { article: "都市型水害への新たなアプローチ", comment: "自治体との連携スキームについて質問です。", date: "2025/12/10" }
                  ].map((activity, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-sm text-primary">{activity.article}</h3>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-white/80">"{activity.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
        active 
          ? 'border-primary text-white bg-white/5' 
          : 'border-transparent text-muted-foreground hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
