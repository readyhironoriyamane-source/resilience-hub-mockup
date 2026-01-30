import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { QrCode, Wallet, Users, CreditCard, FileText, Star, MessageSquare, ChevronRight, Settings, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        <div className="max-w-5xl mx-auto px-4 py-8 w-full">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">設定</h1>
            <p className="text-gray-400">アカウント情報、チーム管理、お支払い状況を確認・変更できます。</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Digital Member Card & Quick Access */}
            <div className="lg:col-span-1 space-y-6">
              {/* 1. Digital Member Card */}
              <Card className="bg-gradient-to-br from-[#1a2342] to-[#0f1629] border-white/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d4a574] to-[#8a6a4b]" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20">
                        <span className="font-sans text-white font-bold text-xs">RH</span>
                      </div>
                      <span className="font-bold text-sm tracking-tight text-gray-300">Resilience Hub</span>
                    </div>
                    <Badge variant="outline" className="bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/30">
                      GOLD MEMBER
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <Avatar className="w-20 h-20 mx-auto border-2 border-[#d4a574]/50">
                      <AvatarImage src="/images/avatar-placeholder.jpg" />
                      <AvatarFallback className="bg-[#1e293b] text-xl">HI</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-white">Hironori</h3>
                      <p className="text-sm text-gray-400">株式会社META EARTH</p>
                      <p className="text-xs text-gray-500 mt-1">BizOps本部 エキスパート</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg mx-auto w-32 h-32 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-black" />
                  </div>
                  <p className="text-[10px] text-center text-gray-500 font-mono">ID: 8829-1029-3847</p>

                  <Button className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800 h-12 rounded-xl flex items-center justify-center gap-2 transition-all">
                    <Wallet className="w-5 h-5" />
                    <span className="font-medium">Apple Walletに追加</span>
                  </Button>
                </CardContent>
              </Card>

              {/* 2. Quick Access */}
              <Card className="bg-[#131b33] border-white/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d4a574]" />
                    クイックアクセス
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 px-2">
                  <Button variant="ghost" className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-white/5 rounded-lg group">
                    <div className="bg-blue-500/10 p-2 rounded-md mr-3 group-hover:bg-blue-500/20 transition-colors">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">あとで読む記事 (3)</div>
                      <div className="text-xs text-gray-500 truncate">最新の補助金情報ほか</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-left h-auto py-3 px-3 hover:bg-white/5 rounded-lg group">
                    <div className="bg-green-500/10 p-2 rounded-md mr-3 group-hover:bg-green-500/20 transition-colors">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">マイ・スレッド (5)</div>
                      <div className="text-xs text-gray-500 truncate">新着コメントあり</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Team & Billing */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 3. Team Management */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#d4a574]" />
                    一緒に使うメンバー
                  </h2>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-xs">
                    + 招待する
                  </Button>
                </div>
                
                <Card className="bg-[#131b33] border-white/5">
                  <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                      {[
                        { name: "Hironori", role: "管理者", email: "hironori@metaearth.co.jp", avatar: "HI", active: true },
                        { name: "Tanaka", role: "一般ユーザー", email: "tanaka@metaearth.co.jp", avatar: "TA", active: true },
                        { name: "Suzuki", role: "一般ユーザー", email: "suzuki@metaearth.co.jp", avatar: "SU", active: false },
                      ].map((member, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-white/10">
                              <AvatarFallback className="bg-[#1e293b] text-xs">{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm text-white">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={member.role === "管理者" ? "default" : "secondary"} className={cn(
                              "text-xs font-normal",
                              member.role === "管理者" ? "bg-[#d4a574] text-black hover:bg-[#d4a574]/90" : "bg-white/10 text-gray-300 hover:bg-white/20"
                            )}>
                              {member.role}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  ※ 管理者は支払い情報の変更やメンバーの追加・削除が可能です。
                </p>
              </section>

              {/* 4. Billing & Plan */}
              <section>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-[#d4a574]" />
                  お支払い・契約内容
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="bg-[#131b33] border-white/5">
                    <CardHeader className="pb-2">
                      <CardDescription>現在のプラン</CardDescription>
                      <CardTitle className="text-2xl text-[#d4a574]">GOLD MEMBER</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-400 mb-4">
                        すべての機能と無制限のレポート作成が利用可能です。
                      </div>
                      <Button variant="outline" size="sm" className="w-full border-white/10 hover:bg-white/5">
                        プランを変更する
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#131b33] border-white/5">
                    <CardHeader className="pb-2">
                      <CardDescription>次回のお支払い</CardDescription>
                      <div className="flex items-baseline gap-1">
                        <CardTitle className="text-3xl font-bold text-white">¥19,800</CardTitle>
                        <span className="text-sm text-gray-500">/月</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>2026年2月28日に請求されます</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full border-white/10 hover:bg-white/5 flex items-center justify-center gap-2">
                        <CreditCard className="w-3 h-3" />
                        カード情報を変更
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-[#131b33] border-white/5">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base">請求履歴・領収書</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-1">
                      {[
                        { date: "2026/01/31", amount: "¥19,800", status: "決済完了" },
                        { date: "2025/12/31", amount: "¥19,800", status: "決済完了" },
                        { date: "2025/11/30", amount: "¥19,800", status: "決済完了" },
                      ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="bg-white/5 p-2 rounded text-gray-400">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{invoice.date} 分</div>
                              <div className="text-xs text-gray-500">{invoice.status} • Visa **** 4242</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-white">{invoice.amount}</span>
                            <Button variant="ghost" size="sm" className="text-[#d4a574] hover:text-[#e5b685] hover:bg-[#d4a574]/10 opacity-0 group-hover:opacity-100 transition-all">
                              領収書を発行
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="text-gray-500 hover:text-white text-xs mt-2 px-0">
                      すべての履歴を見る
                    </Button>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
