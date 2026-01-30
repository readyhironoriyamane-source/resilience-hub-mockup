import React, { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, MessageSquare, ThumbsUp, Share2, Flag, MoreHorizontal, HelpCircle, ExternalLink, Sparkles, FileText } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { toast } from "sonner";

// Mock Data for Topic Detail
const TOPIC_DATA = {
  id: 1,
  title: "2026年の防災トレンドについて語るスレ",
  author: "T.Yamada",
  authorRole: "東京都 防災課",
  createdAt: "2026-01-29 10:00",
  content: `
    <p class="mb-4 text-lg leading-relaxed">
      2026年の防災トレンドとして、特に<strong>「フェーズフリー」</strong><span class="tooltip-trigger" data-term="フェーズフリー"></span>の考え方が自治体レベルで標準化されつつあると感じています。
    </p>
    <p class="mb-4 text-lg leading-relaxed">
      これまでは「防災専用」の備蓄や設備が中心でしたが、平時も活用できるインフラ整備への補助金拡充が目立ちます。
      特に、避難所となる学校施設のWi-Fi環境整備や、EV（電気自動車）の公用車導入などがその典型です。
    </p>
    <p class="mb-6 text-lg leading-relaxed">
      皆さんの自治体では、今年度の予算編成でどのような点に注力されていますか？
      特にデジタル田園都市国家構想交付金の活用事例などあれば共有いただきたいです。
    </p>
  `,
  tags: ["フェーズフリー", "補助金", "DX"],
  likes: 45,
  commentsCount: 12,
  isSaved: true,
};

// Mock Data for Comments
const COMMENTS_DATA = [
  {
    id: 101,
    author: "K.Sato",
    authorRole: "大阪市 危機管理室",
    content: "大阪市でもフェーズフリーの観点から、公園のベンチを「かまどベンチ」に更新する予算がつきました。平時は休憩所、有事は炊き出し拠点になります。",
    createdAt: "2026-01-29 11:30",
    likes: 12,
    isAuthor: false,
    replies: [
      {
        id: 201,
        author: "T.Yamada",
        authorRole: "東京都 防災課",
        content: "貴重な事例ありがとうございます！かまどベンチ、維持管理のコスト感はどうでしょうか？",
        createdAt: "2026-01-29 13:00",
        likes: 3,
        isAuthor: true, // Original Poster
      }
    ]
  },
  {
    id: 102,
    author: "M.Suzuki",
    authorRole: "福岡市 防災推進課",
    content: "デジ田交付金については、避難所の入退室管理システムの導入で申請を通しました。マイナンバーカード連携を見据えた仕様にすることが採択のポイントでした。",
    createdAt: "2026-01-29 14:15",
    likes: 28,
    isAuthor: false,
    replies: []
  }
];

export default function TopicDetailPage() {
  const [match, params] = useRoute("/community/topic/:id");
  const [, setLocation] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleBack = () => {
    setLocation("/community");
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "「役に立った！」を取り消しました" : "「役に立った！」を送りました");
  };

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
        
        <div className="container mx-auto px-4 py-8 pb-24 max-w-6xl">
          {/* Navigation */}
          <Button variant="ghost" onClick={handleBack} className="mb-6 text-white/70 hover:text-white hover:bg-white/10 pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            コミュニティ一覧に戻る
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Post Card */}
              <Card className="bg-white border-none shadow-xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      なんでも相談・雑談
                    </Badge>
                    <span className="text-slate-500 text-sm">{TOPIC_DATA.createdAt}</span>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-[#0B1026] leading-tight">
                    {TOPIC_DATA.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarFallback className="bg-blue-600 text-white">TY</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-[#0B1026]">{TOPIC_DATA.author}</div>
                      <div className="text-xs text-slate-500">{TOPIC_DATA.authorRole}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div 
                    className="prose prose-lg max-w-none text-slate-700"
                    dangerouslySetInnerHTML={{ 
                      __html: TOPIC_DATA.content.replace(
                        '<span class="tooltip-trigger" data-term="フェーズフリー"></span>', 
                        `<span class="inline-flex items-center align-middle ml-1 text-blue-600 cursor-help" title="日常時（いつも）と非常時（もしも）のフェーズ（社会の状態）をフリーにして、生活の質を向上させようとする考え方"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></span>`
                      ) 
                    }} 
                  />
                  
                  <div className="flex flex-wrap gap-2 mt-6 mb-8">
                    {TOPIC_DATA.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleLike}
                        className={`gap-2 h-12 px-6 text-lg font-bold transition-all ${liked ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                      >
                        <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                        役に立った！
                        <span className="ml-1 text-base font-normal opacity-80">{TOPIC_DATA.likes + (liked ? 1 : 0)}</span>
                      </Button>
                      
                      <Button variant="ghost" className="gap-2 text-slate-600 hover:bg-slate-100 h-12 px-4">
                        <MessageSquare className="h-5 w-5" />
                        コメントする
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <div className="space-y-6 mt-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  コメント <span className="text-slate-400 text-lg font-normal">({TOPIC_DATA.commentsCount})</span>
                </h3>

                {COMMENTS_DATA.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    {/* Parent Comment */}
                    <Card className="bg-white/95 border-none shadow-md">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-slate-200 text-slate-600">
                                {comment.author.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#0B1026]">{comment.author}</span>
                                {comment.isAuthor && (
                                  <Badge variant="outline" className="text-blue-600 border-blue-200 text-[10px] px-1.5 py-0 h-5">
                                    質問者
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-slate-500">{comment.authorRole} • {comment.createdAt}</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-slate-700 leading-relaxed mb-4 pl-11">
                          {comment.content}
                        </p>
                        
                        <div className="flex items-center gap-4 pl-11">
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 h-8 px-2 gap-1.5">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 h-8 px-2 gap-1.5">
                            <MessageSquare className="h-4 w-4" />
                            <span>返信する</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Replies (Threaded) */}
                    {comment.replies.length > 0 && (
                      <div className="pl-6 md:pl-10 border-l-2 border-white/20 space-y-4">
                        {comment.replies.map((reply) => (
                          <Card key={reply.id} className="bg-white/90 border-none shadow-sm relative">
                            {/* Visual connector */}
                            <div className="absolute top-6 -left-4 w-4 h-0.5 bg-white/20"></div>
                            
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className={`${reply.isAuthor ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'}`}>
                                      {reply.author.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-[#0B1026] text-sm">{reply.author}</span>
                                      {reply.isAuthor && (
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none text-[10px] px-1.5 py-0 h-5">
                                          質問者
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-xs text-slate-500">{reply.authorRole} • {reply.createdAt}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-slate-700 text-sm leading-relaxed mb-3 pl-10">
                                {reply.content}
                              </p>
                              
                              <div className="flex items-center gap-4 pl-10">
                                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 h-7 px-2 gap-1.5 text-xs">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{reply.likes}</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* AI Summary Panel */}
              <Card className="bg-gradient-to-br from-indigo-900/90 to-slate-900/90 border-indigo-500/30 shadow-xl text-white overflow-hidden">
                <CardHeader className="pb-3 border-b border-white/10 bg-white/5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    AI要約（3行まとめ）
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex gap-3 items-start">
                    <span className="bg-white/20 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p className="text-sm text-slate-200 leading-snug">
                      2026年は「フェーズフリー」が標準化。平時活用のインフラ整備が鍵。
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="bg-white/20 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p className="text-sm text-slate-200 leading-snug">
                      大阪市では公園ベンチを「かまどベンチ」へ更新し、予算を獲得。
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="bg-white/20 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p className="text-sm text-slate-200 leading-snug">
                      福岡市は避難所システムでデジ田交付金を活用。マイナカード連携が必須。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Comparison Table */}
              <Card className="bg-white/10 backdrop-blur-md border-white/10 shadow-lg text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    関連する比較表
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group">
                      <div className="font-bold text-sm group-hover:text-blue-300 transition-colors mb-1">
                        安否確認システム 5選比較
                      </div>
                      <div className="text-xs text-slate-400">
                        コスト・機能・自治体導入実績で比較
                      </div>
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group">
                      <div className="font-bold text-sm group-hover:text-blue-300 transition-colors mb-1">
                        避難所Wi-Fi整備の補助金リスト
                      </div>
                      <div className="text-xs text-slate-400">
                        2026年度版・対象要件まとめ
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Official Data Link */}
              <Card className="bg-white/10 backdrop-blur-md border-white/10 shadow-lg text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-emerald-400" />
                    一次情報・公的データ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full justify-start text-left h-auto py-3 bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white group">
                    <div>
                      <div className="font-bold text-sm group-hover:text-emerald-300 transition-colors">
                        デジタル田園都市国家構想
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        内閣官房・デジタル庁 (2025.12更新)
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
