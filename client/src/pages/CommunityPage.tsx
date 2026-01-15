import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Lock, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { toast } from "sonner";

export default function CommunityPage() {
  const handleJoinClick = () => {
    toast.info("コミュニティ機能は現在プレビュー版です。正式リリースは2026.04を予定しています。");
  };

  const forums = [
    {
      id: 1,
      title: "General Discussion",
      description: "防災・BCPに関する全般的な話題、ニュースの共有など",
      icon: MessageSquare,
      members: 1240,
      active: 45,
      topics: [
        { title: "2026年の防災トレンドについて語るスレ", author: "T.Yamada", replies: 12, lastActive: "2h ago" },
        { title: "【自己紹介】新しく担当になりました", author: "K.Sato", replies: 5, lastActive: "5h ago" },
      ]
    },
    {
      id: 2,
      title: "Risk Management",
      description: "リスク評価手法、BCP策定の実務的な悩み相談",
      icon: AlertTriangle,
      members: 850,
      active: 32,
      topics: [
        { title: "サプライチェーン途絶時の代替調達ルート確保について", author: "M.Tanaka", replies: 8, lastActive: "1d ago" },
        { title: "ISO22301認証取得のメリット・デメリット", author: "S.Suzuki", replies: 15, lastActive: "3d ago" },
      ]
    },
    {
      id: 3,
      title: "Technology & Tools",
      description: "防災テック、安否確認システム、備蓄品などの情報交換",
      icon: Activity,
      members: 920,
      active: 28,
      topics: [
        { title: "衛星データ活用のコスト感について", author: "H.Kato", replies: 6, lastActive: "4h ago" },
        { title: "おすすめの安否確認システム教えてください", author: "Y.Ito", replies: 22, lastActive: "2d ago" },
      ]
    },
    {
      id: 4,
      title: "Executive Lounge",
      description: "経営層・CISO限定のクローズドコミュニティ",
      icon: Lock,
      members: 120,
      active: 5,
      isLocked: true,
      topics: []
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Community Forum</h1>
          <p className="text-muted-foreground mt-2">
            実務担当者同士が知見を共有し、共に解決策を探る場所。
          </p>
        </div>
        <Button onClick={handleJoinClick} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <MessageSquare className="mr-2 h-4 w-4" />
          新しいトピックを作成
        </Button>
      </div>

      {/* Forum Categories */}
      <div className="grid grid-cols-1 gap-6">
        {forums.map((forum) => (
          <Card key={forum.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <forum.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {forum.title}
                      {forum.isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </CardTitle>
                    <CardDescription className="mt-1">{forum.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{forum.members}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span>{forum.active} online</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {forum.isLocked ? (
                <div className="flex items-center justify-center h-24 bg-muted/20 rounded-md border border-dashed border-muted-foreground/20">
                  <div className="text-center">
                    <Lock className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">このフォーラムは招待制です</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  {forum.topics.map((topic, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                      onClick={handleJoinClick}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {topic.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>by {topic.author}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> {topic.replies}
                        </span>
                        <span>{topic.lastActive}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-muted-foreground hover:text-primary" onClick={handleJoinClick}>
                    すべてのトピックを見る
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
