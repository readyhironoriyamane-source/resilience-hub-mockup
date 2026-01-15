import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CreditCard, Users, Bell, Shield, Download, Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSave = () => {
    toast.success("設定を保存しました");
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

        <div className="container mx-auto px-4 py-8 pb-24 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">Settings & Profile</h1>
            <p className="text-muted-foreground mt-2">
              アカウント設定、チーム管理、請求情報の確認
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-black/20 border border-border/30 p-1">
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <User className="w-4 h-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="focus" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Shield className="w-4 h-4 mr-2" /> My Focus
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Users className="w-4 h-4 mr-2" /> Team
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <CreditCard className="w-4 h-4 mr-2" /> Billing
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#1A1F36] border-border/50">
                  <CardHeader>
                    <CardTitle>Digital Member Card</CardTitle>
                    <CardDescription>The Global Resilience Hub 会員証</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <div className="w-full max-w-sm aspect-[1.58/1] rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 shadow-2xl relative overflow-hidden p-6 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500">
                      {/* Card Background Effects */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full -ml-5 -mb-5" />
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                            <span className="font-serif font-bold text-white text-xs">RH</span>
                          </div>
                          <span className="font-serif font-bold text-white text-sm tracking-wide">RESILIENCE HUB</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">GOLD MEMBER</Badge>
                      </div>

                      {/* Card Chip */}
                      <div className="w-10 h-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-80 my-4 z-10" />

                      {/* Card Footer */}
                      <div className="z-10">
                        <div className="text-xs text-gray-400 mb-1">MEMBER NAME</div>
                        <div className="text-lg font-mono text-white tracking-wider mb-4">HIRONORI</div>
                        <div className="flex justify-between items-end">
                          <div className="text-[10px] text-gray-500">ID: 8823-1989-0115</div>
                          <div className="text-[10px] text-gray-500">VALID THRU: 04/27</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" /> Apple Walletに追加
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#1A1F36] border-border/50">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>プロフィール情報の編集</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input defaultValue="Hironori" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="hironori@example.com" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Company / Organization</Label>
                      <Input defaultValue="BizOps Inc." className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input defaultValue="Expert" className="bg-black/20 border-white/10" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave} className="ml-auto">変更を保存</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* My Focus Tab */}
            <TabsContent value="focus">
              <Card className="bg-[#1A1F36] border-border/50">
                <CardHeader>
                  <CardTitle>My Focus Settings</CardTitle>
                  <CardDescription>タイムラインに表示する情報の優先度を設定します</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Needs (業務課題)</h3>
                      <div className="flex flex-wrap gap-2">
                        {["リスク可視化", "安否確認", "サプライチェーン", "法規制対応", "BCP策定", "サイバーセキュリティ"].map((tag) => (
                          <Badge 
                            key={tag} 
                            variant={["リスク可視化", "安否確認"].includes(tag) ? "default" : "outline"}
                            className={`cursor-pointer px-3 py-1.5 ${["リスク可視化", "安否確認"].includes(tag) ? "bg-primary hover:bg-primary/80" : "hover:bg-white/10"}`}
                          >
                            {tag}
                            {["リスク可視化", "安否確認"].includes(tag) && <Check className="w-3 h-3 ml-1" />}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Seeds (技術・分野)</h3>
                      <div className="flex flex-wrap gap-2">
                        {["AI・ビッグデータ", "ドローン", "衛星データ", "IoT・センサー", "ロボティクス", "ブロックチェーン"].map((tag) => (
                          <Badge 
                            key={tag} 
                            variant={["AI・ビッグデータ", "ドローン"].includes(tag) ? "default" : "outline"}
                            className={`cursor-pointer px-3 py-1.5 ${["AI・ビッグデータ", "ドローン"].includes(tag) ? "bg-primary hover:bg-primary/80" : "hover:bg-white/10"}`}
                          >
                            {tag}
                            {["AI・ビッグデータ", "ドローン"].includes(tag) && <Check className="w-3 h-3 ml-1" />}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} className="ml-auto">設定を更新</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team">
              <Card className="bg-[#1A1F36] border-border/50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>同じ組織のメンバー管理</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" /> 招待する
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Hironori", role: "Admin", email: "hironori@example.com", status: "Active" },
                      { name: "T.Yamada", role: "Member", email: "yamada@example.com", status: "Active" },
                      { name: "K.Sato", role: "Viewer", email: "sato@example.com", status: "Pending" },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm text-white">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                          <span className={`text-xs ${member.status === 'Active' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card className="bg-[#1A1F36] border-border/50">
                <CardHeader>
                  <CardTitle>Billing & Plan</CardTitle>
                  <CardDescription>請求書の発行とプラン管理</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/20 to-transparent border border-primary/20">
                    <div>
                      <div className="text-sm text-primary font-medium mb-1">Current Plan</div>
                      <div className="text-2xl font-bold text-white">Business Plan</div>
                      <div className="text-xs text-gray-400 mt-1">Next billing date: 2026/02/01</div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Invoice History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "2026/01/01", amount: "¥50,000", id: "INV-2026001" },
                        { date: "2025/12/01", amount: "¥50,000", id: "INV-2025121" },
                        { date: "2025/11/01", amount: "¥50,000", id: "INV-2025111" },
                      ].map((inv, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-white/5 text-gray-400 group-hover:text-white">
                              <Download className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-200">{inv.date}</div>
                              <div className="text-xs text-gray-500">{inv.id}</div>
                            </div>
                          </div>
                          <div className="text-sm font-mono text-gray-300">{inv.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
