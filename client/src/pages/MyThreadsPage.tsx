import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, ChevronRight, User, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Mock data for user's threads
const MY_THREADS = [
  {
    id: 1,
    title: "中小企業のBCP策定における実効性の担保について",
    category: "BCP策定",
    lastComment: "2時間前",
    commentCount: 5,
    unreadCount: 2,
    isOwner: true,
    status: "active"
  },
  {
    id: 3,
    title: "非常用発電機のメンテナンス頻度とコスト",
    category: "設備・備蓄",
    lastComment: "1日前",
    commentCount: 8,
    unreadCount: 0,
    isOwner: false,
    status: "active"
  },
  {
    id: 5,
    title: "水害ハザードマップの読み方と避難計画への落とし込み",
    category: "ハザードマップ",
    lastComment: "3日前",
    commentCount: 12,
    unreadCount: 0,
    isOwner: true,
    status: "resolved"
  },
  {
    id: 8,
    title: "従業員の安否確認訓練の実施時期について",
    category: "訓練・教育",
    lastComment: "1週間前",
    commentCount: 3,
    unreadCount: 0,
    isOwner: false,
    status: "active"
  },
  {
    id: 12,
    title: "リモートワーク環境下での災害時初動対応",
    category: "テレワーク",
    lastComment: "2週間前",
    commentCount: 15,
    unreadCount: 0,
    isOwner: true,
    status: "resolved"
  }
];

export default function MyThreadsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex flex-col md:flex-row">
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
      <div className={`sticky top-0 h-screen z-50 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shrink-0 overflow-y-auto`}>
        <Sidebar />
      </div>

      <main className="flex-1 relative z-10 min-h-screen flex flex-col min-w-0">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="max-w-4xl mx-auto px-4 py-8 w-full">
          <header className="mb-8">
            <Link href="/settings">
              <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-4 text-gray-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                設定に戻る
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-[#d4a574]" />
              マイ・スレッド
            </h1>
            <p className="text-gray-400">あなたが作成したトピックや、コメントしたスレッドの更新状況を確認できます。</p>
          </header>

          <div className="space-y-4">
            {MY_THREADS.map((thread) => (
              <Link key={thread.id} href={`/community/topic/${thread.id}`}>
                <Card className="bg-[#131b33] border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                  <CardContent className="p-5 flex items-start gap-4">
                    {/* Icon / Status */}
                    <div className="mt-1">
                      {thread.unreadCount > 0 ? (
                        <div className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-500/20 animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-white/5 text-gray-400 border-white/10">
                          {thread.category}
                        </Badge>
                        {thread.isOwner && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/20">
                            自分の投稿
                          </Badge>
                        )}
                        {thread.status === "resolved" && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-green-500/10 text-green-400 border-green-500/20">
                            解決済み
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#d4a574] transition-colors line-clamp-1">
                        {thread.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>最終コメント: {thread.lastComment}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{thread.commentCount}件のコメント</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-center self-center pl-2">
                      {thread.unreadCount > 0 && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 mb-2">
                          +{thread.unreadCount} 新着
                        </Badge>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {MY_THREADS.length === 0 && (
            <div className="text-center py-20 bg-[#131b33]/50 rounded-xl border border-white/5 border-dashed">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-400 mb-2">まだスレッドがありません</h3>
              <p className="text-sm text-gray-500 mb-6">
                コミュニティで質問したり、議論に参加してみましょう。
              </p>
              <Link href="/community">
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  コミュニティへ移動
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
