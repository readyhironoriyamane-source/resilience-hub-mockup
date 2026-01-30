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
                  
                  <div className="mb-8"></div>

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
              {/* Reference Info (Only if attachments exist) */}
              {/* Assuming attachments exist for this mock */}
              <Card className="bg-white/10 backdrop-blur-md border-white/10 shadow-lg text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    参考情報
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group">
                      <div className="font-bold text-sm group-hover:text-blue-300 transition-colors mb-1 flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-300 text-[10px] px-1.5 py-0.5 rounded">PDF</span>
                        避難所運営マニュアル.pdf
                      </div>
                      <div className="text-xs text-slate-400">
                        2.4 MB • 2026.01.28
                      </div>
                    </a>
                    <a href="#" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group">
                      <div className="font-bold text-sm group-hover:text-blue-300 transition-colors mb-1 flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded">IMG</span>
                        現場写真_01.jpg
                      </div>
                      <div className="text-xs text-slate-400">
                        1.2 MB • 2026.01.28
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Consultation */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500/30 shadow-xl text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <HelpCircle className="h-24 w-24 text-amber-500" />
                </div>
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-lg font-bold text-amber-400 flex items-center gap-2">
                    専門家に相談する
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    スレッドで解決しない課題や関連するお悩みを専門家に相談することができます。
                    自社の状況に合わせた最適なソリューションをご提案します。
                  </p>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-lg shadow-amber-900/20"
                    onClick={() => setLocation("/desk")}
                  >
                    コンシェルジュに相談
                  </Button>
                </CardContent>
              </Card>

              {/* Solution Listing */}
              <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-white/10 shadow-lg text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Sparkles className="h-24 w-24 text-white" />
                </div>
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="bg-white/10 p-1 rounded">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    ソリューション掲載について
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    自社の防災・レジリエンスソリューションを掲載しませんか？
                    自治体担当者に直接アプローチできます。
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
                    onClick={() => setLocation("/desk")}
                  >
                    掲載の相談をする
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
