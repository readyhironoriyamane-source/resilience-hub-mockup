import React, { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Lock, TrendingUp, AlertTriangle, Activity, Menu, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { CreateTopicModal } from "@/components/CreateTopicModal";

// Mock Data with Enhanced Attributes
const ALL_TOPICS = [
  { id: 1, forumId: 1, title: "2026年の防災トレンドについて語るスレ", author: "T.Yamada", replies: 12, lastActive: "2時間前", region: "tokyo", isSaved: true, likes: 45, createdAt: "2026-01-29T10:00:00" },
  { id: 2, forumId: 1, title: "【自己紹介】新しく担当になりました", author: "K.Sato", replies: 5, lastActive: "5時間前", region: "osaka", isSaved: false, likes: 10, createdAt: "2026-01-30T08:00:00" },
  { id: 3, forumId: 2, title: "サプライチェーン途絶時の代替調達ルート確保について", author: "M.Tanaka", replies: 8, lastActive: "1日前", region: "tokyo", isSaved: true, likes: 32, createdAt: "2026-01-28T15:00:00" },
  { id: 4, forumId: 2, title: "ISO22301認証取得のメリット・デメリット", author: "S.Suzuki", replies: 15, lastActive: "3日前", region: "aichi", isSaved: false, likes: 28, createdAt: "2026-01-25T09:00:00" },
  { id: 5, forumId: 3, title: "衛星データ活用のコスト感について", author: "H.Kato", replies: 6, lastActive: "4時間前", region: "fukuoka", isSaved: false, likes: 15, createdAt: "2026-01-30T09:30:00" },
  { id: 6, forumId: 3, title: "おすすめの安否確認システム教えてください", author: "Y.Ito", replies: 22, lastActive: "2日前", region: "tokyo", isSaved: true, likes: 55, createdAt: "2026-01-27T11:00:00" },
  { id: 7, forumId: 1, title: "避難所運営マニュアルの改定ポイント", author: "A.Watanabe", replies: 3, lastActive: "10分前", region: "hokkaido", isSaved: false, likes: 8, createdAt: "2026-01-30T10:50:00" },
  { id: 8, forumId: 2, title: "水害リスクの高い拠点の移転検討", author: "K.Yamamoto", replies: 18, lastActive: "5日前", region: "tokyo", isSaved: false, likes: 40, createdAt: "2026-01-20T14:00:00" },
];

const FORUMS = [
  {
    id: 1,
    title: "なんでも相談・雑談",
    description: "防災・BCPに関する全般的な話題、ニュースの共有など",
    icon: MessageSquare,
    color: "bg-blue-500",
    isLocked: false,
  },
  {
    id: 2,
    title: "BCP・リスク管理の悩み",
    description: "リスク評価手法、BCP策定の実務的な悩み相談",
    icon: AlertTriangle,
    color: "bg-amber-500",
    isLocked: false,
  },
  {
    id: 3,
    title: "防災製品・ツールの情報交換",
    description: "防災テック、安否確認システム、備蓄品などの情報交換",
    icon: Activity,
    color: "bg-emerald-500",
    isLocked: false,
  },

];

type FilterType = 'all' | 'region' | 'saved' | 'popular' | 'new';

export default function CommunityPage() {
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [filterTitle, setFilterTitle] = useState("");

  // User Profile Mock
  const userProfile = {
    region: "tokyo"
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleFilterClick = (filter: FilterType, title: string) => {
    setActiveFilter(filter);
    setFilterTitle(title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForums = () => {
    setActiveFilter('all');
    setFilterTitle("");
  };

  const filteredTopics = useMemo(() => {
    let topics = [...ALL_TOPICS];
    
    switch (activeFilter) {
      case 'region':
        return topics.filter(t => t.region === userProfile.region);
      case 'saved':
        return topics.filter(t => t.isSaved);
      case 'popular':
        return topics.sort((a, b) => b.likes - a.likes); // Sort by likes
      case 'new':
        return topics.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by date
      default:
        return [];
    }
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30">
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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <main className="md:pl-64 relative z-10 min-h-screen flex flex-col">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">防災コミュニティ</h1>
                <p className="text-muted-foreground mt-2 text-lg leading-relaxed max-w-3xl">
                  同じ悩みを持つ担当者とつながり、知恵を出し合える場所です。<br className="hidden md:block" />
                  「どうすればいい？」を一人で抱えず、みんなの経験をヒントに解決しましょう。
                </p>
              </div>
            </div>
          </div>

          {/* Quick Access - Moved to top for better visibility */}
          <div className="mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 px-2 flex items-center gap-2">
                <span className="text-primary">⚡</span> クイックアクセス
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant={activeFilter === 'region' ? "secondary" : "ghost"} 
                  className={`w-full justify-start h-auto py-3 ${activeFilter === 'region' ? 'bg-white text-primary' : 'text-white hover:bg-white/10 hover:text-white'}`}
                  onClick={() => handleFilterClick('region', '自分の担当地域（近隣自治体の動き）')}
                >
                  <span className="mr-2 text-xl">📍</span> 
                  <div className="text-left">
                    <div className="font-bold">自分の担当地域</div>
                    <div className={`text-xs font-normal ${activeFilter === 'region' ? 'text-primary/80' : 'text-white/60'}`}>近隣自治体の動き</div>
                  </div>
                </Button>
                <Button 
                  variant={activeFilter === 'saved' ? "secondary" : "ghost"} 
                  className={`w-full justify-start h-auto py-3 ${activeFilter === 'saved' ? 'bg-white text-primary' : 'text-white hover:bg-white/10 hover:text-white'}`}
                  onClick={() => handleFilterClick('saved', '保存した投稿（自分専用の知恵袋）')}
                >
                  <span className="mr-2 text-xl">🔖</span> 
                  <div className="text-left">
                    <div className="font-bold">保存した投稿</div>
                    <div className={`text-xs font-normal ${activeFilter === 'saved' ? 'text-primary/80' : 'text-white/60'}`}>自分専用の知恵袋</div>
                  </div>
                </Button>
                <Button 
                  variant={activeFilter === 'popular' ? "secondary" : "ghost"} 
                  className={`w-full justify-start h-auto py-3 ${activeFilter === 'popular' ? 'bg-white text-primary' : 'text-white hover:bg-white/10 hover:text-white'}`}
                  onClick={() => handleFilterClick('popular', '人気のトピック（乗り遅れない情報）')}
                >
                  <span className="mr-2 text-xl">🔥</span> 
                  <div className="text-left">
                    <div className="font-bold">人気のトピック</div>
                    <div className={`text-xs font-normal ${activeFilter === 'popular' ? 'text-primary/80' : 'text-white/60'}`}>乗り遅れない情報</div>
                  </div>
                </Button>
                <Button 
                  variant={activeFilter === 'new' ? "secondary" : "ghost"} 
                  className={`w-full justify-start h-auto py-3 ${activeFilter === 'new' ? 'bg-white text-primary' : 'text-white hover:bg-white/10 hover:text-white'}`}
                  onClick={() => handleFilterClick('new', '新着の投稿（新しい質問・相談）')}
                >
                  <span className="mr-2 text-xl">🆕</span> 
                  <div className="text-left">
                    <div className="font-bold">新着の投稿</div>
                    <div className={`text-xs font-normal ${activeFilter === 'new' ? 'text-primary/80' : 'text-white/60'}`}>新しい質問・相談</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {activeFilter !== 'all' ? (
              /* Filtered View */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" onClick={handleBackToForums} className="text-white hover:bg-white/10">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    フォーラム一覧に戻る
                  </Button>
                  <h2 className="text-2xl font-bold text-white">{filterTitle}</h2>
                </div>

                <div className="space-y-4">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => {
                      const forum = FORUMS.find(f => f.id === topic.forumId);
                      return (
                        <div 
                          key={topic.id} 
                          className="flex items-center justify-between p-6 rounded-xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all group relative top-0 hover:-top-1"
                          onClick={() => setLocation(`/community/topic/${topic.id}`)}
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`h-3 w-3 rounded-full flex-shrink-0 ${forum?.color || 'bg-gray-400'}`} />
                            <div>
                              <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                                <span className="font-bold text-slate-700">{forum?.title}</span>
                                <span>•</span>
                                <span>{topic.lastActive}</span>
                              </div>
                              <span className="font-bold text-xl text-[#0B1026] group-hover:text-blue-700 transition-colors leading-relaxed">
                                {topic.title}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-base text-slate-600 font-medium flex-shrink-0 ml-4">
                            <span className="hidden md:inline">by {topic.author}</span>
                            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                              <MessageSquare className="h-4 w-4 text-slate-500" /> 
                              <span className="text-slate-700">コメント{topic.replies}件</span>
                            </span>
                            {activeFilter === 'popular' && (
                              <span className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full text-red-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>{topic.likes}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xl text-white/60">該当するトピックはありません</p>
                      <Button variant="link" onClick={handleBackToForums} className="text-primary mt-2">
                        一覧に戻る
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Default Forum Categories View */
              <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-300">
                {FORUMS.map((forum) => {
                  // Get topics for this forum from ALL_TOPICS (limit to 2 for preview)
                  const forumTopics = ALL_TOPICS.filter(t => t.forumId === forum.id).slice(0, 2);
                  
                  return (
                  <Card key={forum.id} className="bg-white/90 backdrop-blur-md border-white/20 hover:bg-white/95 transition-all overflow-hidden relative group shadow-lg mb-6">
                    <CardHeader className="pb-2 pl-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${forum.color.replace('bg-', 'bg-opacity-90 bg-')} text-white shadow-md transform transition-transform group-hover:scale-110`}>
                            <forum.icon className="h-8 w-8" />
                          </div>
                          <div>
                            <CardTitle className="text-xl flex items-center gap-2 text-[#0B1026]">
                              {forum.title}
                              {forum.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            </CardTitle>
                            <CardDescription className="mt-1 text-slate-600">
                              {forum.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pl-6">
                      {forum.isLocked ? (
                        <div className="flex items-center justify-center h-24 bg-slate-100 rounded-md border border-dashed border-slate-300">
                          <div className="text-center">
                            <Lock className="h-5 w-5 mx-auto text-gray-500 mb-2" />
                            <p className="text-base text-slate-500">このフォーラムは招待制です</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2">
                          {forumTopics.map((topic) => (
                            <div 
                              key={topic.id} 
                              className="flex items-center justify-between p-4 rounded-lg bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group relative top-0 hover:-top-0.5"
                              onClick={() => setLocation(`/community/topic/${topic.id}`)}
                            >
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className={`h-3 w-3 rounded-full flex-shrink-0 ${forum.color}`} />
                                <span className="font-bold text-lg text-[#0B1026] group-hover:text-blue-700 transition-colors line-clamp-2 leading-relaxed">
                                  {topic.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-6 text-base text-slate-600 font-medium flex-shrink-0 ml-4">
                                <span className="hidden md:inline">by {topic.author}</span>
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                                  <MessageSquare className="h-4 w-4 text-slate-500" /> 
                                  <span className="text-slate-700">コメント{topic.replies}件</span>
                                </span>
                                <span className="text-slate-500">{topic.lastActive}</span>
                              </div>
                            </div>
                          ))}
                          <Button variant="ghost" size="sm" className="w-full mt-2 text-slate-500 hover:text-[#0B1026] hover:bg-slate-100" onClick={() => toast.info("すべてのトピックを表示")}>
                            すべてのトピックを見る
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  );
                })}
              </div>
            )}
        </div>

        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button 
            onClick={handleCreateClick} 
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 w-16 rounded-full shadow-xl shadow-primary/30 transition-all hover:scale-110 flex items-center justify-center"
          >
            <span className="text-4xl font-bold leading-none pb-1">+</span>
          </Button>
        </div>

        <CreateTopicModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </main>
    </div>
  );
}
