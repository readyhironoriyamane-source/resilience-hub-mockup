import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Lock, TrendingUp, AlertTriangle, Activity, Menu } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export default function CommunityPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleJoinClick = () => {
    toast.info("コミュニティ機能は現在プレビュー版です。正式リリースは2026.04を予定しています。");
  };

  const forums = [
    {
      id: 1,
      title: "なんでも相談・雑談",
      description: "防災・BCPに関する全般的な話題、ニュースの共有など",
      example: "例：新しく担当になった方の自己紹介や、ニュースの感想など",
      icon: MessageSquare,
      color: "bg-blue-500",
      members: 1240,
      active: 45,
      topics: [
        { title: "2026年の防災トレンドについて語るスレ", author: "T.Yamada", replies: 12, lastActive: "2時間前" },
        { title: "【自己紹介】新しく担当になりました", author: "K.Sato", replies: 5, lastActive: "5時間前" },
      ]
    },
    {
      id: 2,
      title: "BCP・リスク管理の悩み",
      description: "リスク評価手法、BCP策定の実務的な悩み相談",
      example: "例：訓練のマンネリ化対策や、他社の事例を知りたい時など",
      icon: AlertTriangle,
      color: "bg-amber-500",
      members: 850,
      active: 32,
      topics: [
        { title: "サプライチェーン途絶時の代替調達ルート確保について", author: "M.Tanaka", replies: 8, lastActive: "1日前" },
        { title: "ISO22301認証取得のメリット・デメリット", author: "S.Suzuki", replies: 15, lastActive: "3日前" },
      ]
    },
    {
      id: 3,
      title: "防災製品・ツールの情報交換",
      description: "防災テック、安否確認システム、備蓄品などの情報交換",
      example: "例：導入して良かったシステムや、備蓄品の管理方法など",
      icon: Activity,
      color: "bg-emerald-500",
      members: 920,
      active: 28,
      topics: [
        { title: "衛星データ活用のコスト感について", author: "H.Kato", replies: 6, lastActive: "4時間前" },
        { title: "おすすめの安否確認システム教えてください", author: "Y.Ito", replies: 22, lastActive: "2日前" },
      ]
    },
    {
      id: 4,
      title: "経営層・CISO限定ラウンジ",
      description: "経営層・CISO限定のクローズドコミュニティ",
      example: "例：経営判断に関わる重大なリスク情報の共有など",
      icon: Lock,
      color: "bg-purple-500",
      members: 120,
      active: 5,
      isLocked: true,
      topics: []
    }
  ];

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
              {/* Mobile menu trigger removed as it is handled by MobileHeader */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">防災コミュニティ</h1>
                <p className="text-muted-foreground mt-2">
                  実務担当者同士が知見を共有し、共に解決策を探る場所。
                </p>
              </div>
            </div>
            <Button onClick={handleJoinClick} className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto shadow-lg shadow-primary/20 transition-all hover:scale-105">
              <span className="mr-2 text-3xl font-bold leading-none">+</span>
              新しいトピックを作成
            </Button>
          </div>

          {/* Forum Categories */}
          <div className="grid grid-cols-1 gap-6">
            {forums.map((forum) => (
              <Card key={forum.id} className="bg-white/90 backdrop-blur-md border-white/20 hover:bg-white/95 transition-all overflow-hidden relative group shadow-lg">
                {/* Category Color Strip */}
                {/* Color strip removed */}
                
                <CardHeader className="pb-2 pl-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${forum.color.replace('bg-', 'bg-opacity-90 bg-')} text-white shadow-md`}>
                        <forum.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2 text-[#0B1026]">
                          {forum.title}
                          {forum.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                        </CardTitle>
                        <CardDescription className="mt-1 text-slate-600">
                          {forum.description}
                          <span className="block mt-1 text-sm text-slate-500 bg-slate-100/50 px-2 py-1 rounded-md inline-block border border-slate-200/50">
                            {forum.example}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-base text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{forum.members}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span>今{forum.active}人が見ています</span>
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
                      {forum.topics.map((topic, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors group border border-transparent"
                          onClick={handleJoinClick}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${forum.color}`} />
                            <span className="font-medium text-[#0B1026] group-hover:text-blue-700 transition-colors">
                              {topic.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-base text-slate-500">
                            <span>by {topic.author}</span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" /> コメント{topic.replies}件
                            </span>
                            <span>{topic.lastActive}</span>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full mt-2 text-slate-500 hover:text-[#0B1026] hover:bg-slate-100" onClick={handleJoinClick}>
                        すべてのトピックを見る
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
