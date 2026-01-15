import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Globe, Bot, RefreshCw, AlertCircle, Menu, Search, Filter } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function IntelPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const intelFeeds = [
    {
      id: 1,
      title: "Global Risk Report 2026 Released",
      source: "World Economic Forum",
      date: "2h ago",
      summary: "WEFが2026年版グローバルリスク報告書を公開。気候変動への適応失敗がトップリスクに。サイバーセキュリティの脅威レベルも過去最高を記録。",
      tags: ["Global", "Report"],
      url: "#",
      aiAnalysis: "企業のBCP担当者は、特に「気候変動適応」と「サイバーレジリエンス」の2点について、自社の対策状況を再点検する必要があります。"
    },
    {
      id: 2,
      title: "New Earthquake Early Warning System in Japan",
      source: "Japan Meteorological Agency",
      date: "5h ago",
      summary: "気象庁が新しい緊急地震速報システムの運用を開始。海底地震計のデータを活用し、到達予想時間の精度が最大10秒向上。",
      tags: ["Japan", "Technology"],
      url: "#",
      aiAnalysis: "工場の自動停止システムなどの閾値設定を見直す良い機会です。より早期の警報受信が可能になるため、被害軽減効果が期待できます。"
    },
    {
      id: 3,
      title: "Supply Chain Disruption in Southeast Asia",
      source: "Reuters",
      date: "1d ago",
      summary: "東南アジア地域での大規模な洪水により、半導体部品のサプライチェーンに遅れが生じる可能性。主要メーカー数社が操業停止を発表。",
      tags: ["Supply Chain", "Asia"],
      url: "#",
      aiAnalysis: "代替調達先の確保と、在庫レベルの確認を推奨します。特に電子部品を使用する製品ラインへの影響評価を急いでください。"
    },
    {
      id: 4,
      title: "Cyber Attack Trends: Ransomware Evolution",
      source: "CyberSecurity News",
      date: "1d ago",
      summary: "ランサムウェア攻撃の手口が高度化。二重脅迫に加え、DDoS攻撃を組み合わせた三重脅迫のケースが増加中。",
      tags: ["Cyber", "Security"],
      url: "#",
      aiAnalysis: "バックアップのオフライン保管（エアギャップ）の重要性が増しています。また、DDoS対策サービスの導入状況も確認してください。"
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
        <div className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden text-white -ml-2" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <Globe className="w-6 h-6 text-[#d4a574]" />
                  <span className="font-serif font-bold text-sm">Global Intelligence</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                  External Intel Feed
                </h1>
                <p className="text-muted-foreground">
                  世界中の信頼できるソースから、AIがリスク情報を収集・要約。
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50 mt-4 md:mt-0">
              <RefreshCw className="h-3 w-3 animate-spin-slow" />
              <span>Last updated: Just now</span>
            </div>
          </header>

          {/* Search & Filter Bar - Emphasizing Database/Search aspect */}
          <div className="bg-card/30 p-4 rounded-lg border border-border/50 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="国、リスク種別、キーワードで検索..." 
                  className="pl-10 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  ソース絞り込み
                </Button>
                <Button variant="outline" className="gap-2">
                  <Globe className="h-4 w-4" />
                  地域選択
                </Button>
              </div>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3 mb-8">
            <Bot className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-200">AI Generated Content</p>
              <p className="text-blue-200/70 mt-1">
                このフィードの要約と分析はAIによって生成されています。意思決定の際は、必ず「Source」リンクから一次情報を確認してください。
              </p>
            </div>
          </div>

          {/* Feed List */}
          <div className="space-y-4">
            {intelFeeds.map((item) => (
              <Card key={item.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {item.source}
                        </span>
                        <span>{item.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold leading-tight">
                        <a href={item.url} className="hover:text-primary hover:underline decoration-primary/50 underline-offset-4 transition-colors text-white">
                          {item.title}
                        </a>
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Analysis Box */}
                    <div className="md:w-1/3 bg-muted/30 rounded-lg p-4 border border-border/50 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-purple-400">
                        <Bot className="h-3 w-3" />
                        <span>AI Analysis for BizOps</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.aiAnalysis}
                      </p>
                      <Button variant="ghost" size="sm" className="mt-auto w-full text-xs h-8 gap-1 hover:text-primary hover:bg-primary/10">
                        <ExternalLink className="h-3 w-3" />
                        一次情報を確認
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
