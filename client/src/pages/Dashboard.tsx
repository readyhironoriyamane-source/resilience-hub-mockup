import { useState } from "react";
import { useLocation } from "wouter";
import { contentItems } from "@/lib/mock-data";
import { useBookmark } from "@/hooks/useBookmark";
import { useArticleLimit } from "@/hooks/useArticleLimit";
import { ContentCard } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Library, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'library' | 'activity'>('overview');
  const [, setLocation] = useLocation();
  const { bookmarkedIds } = useBookmark();
  const { allReadArticles } = useArticleLimit();

  // Filter content items
  const bookmarkedArticles = contentItems.filter(item => bookmarkedIds.includes(item.id));
  const readArticles = contentItems.filter(item => allReadArticles.includes(item.id));

  const handleCardClick = (id: string) => {
    setLocation(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:pl-72">
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
            label="Overview"
          />
          <TabButton 
            active={activeTab === 'library'} 
            onClick={() => setActiveTab('library')}
            icon={<Library className="w-4 h-4" />}
            label="My Library"
          />
          <TabButton 
            active={activeTab === 'activity'} 
            onClick={() => setActiveTab('activity')}
            icon={<MessageSquare className="w-4 h-4" />}
            label="Activity"
          />
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Resilience Score Card */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck className="w-32 h-32 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Resilience Score
                  </h2>
                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-5xl font-bold text-white">72</span>
                    <span className="text-sm text-muted-foreground mb-2">/ 100 points</span>
                    <span className="text-sm text-green-400 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5 pts (先月比)
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full mb-4 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    BCP策定の進捗が良好です。次は「サプライチェーン管理」の項目を強化しましょう。
                  </p>
                </div>

                <div className="bg-[#1e293b]/50 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                  <AlertTriangle className="w-10 h-10 text-yellow-500 mb-3" />
                  <h3 className="font-bold mb-1">要注意課題</h3>
                  <p className="text-2xl font-bold text-white mb-1">3件</p>
                  <p className="text-xs text-muted-foreground mb-4">対応期限が迫っています</p>
                  <Button variant="outline" size="sm" className="w-full border-white/20 hover:bg-white/10">
                    詳細を確認
                  </Button>
                </div>
              </section>

              {/* Recommended Actions */}
              <section>
                <h2 className="text-xl font-bold font-serif mb-4">Recommended Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "サプライチェーン・リスク診断を受ける", time: "15 min", type: "Diagnosis" },
                    { title: "「AI予兆検知」の導入事例レポートを読む", time: "5 min", type: "Learning" }
                  ].map((action, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                          {action.type === 'Diagnosis' ? 'D' : 'L'}
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
                  <h2 className="text-xl font-bold font-serif">Bookmarks</h2>
                  <span className="text-xs text-muted-foreground ml-2">{bookmarkedArticles.length} items</span>
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
                  <h2 className="text-xl font-bold font-serif">Recently Read</h2>
                  <span className="text-xs text-muted-foreground ml-2">{readArticles.length} items</span>
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
                <h2 className="text-xl font-bold font-serif">My Comments</h2>
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
