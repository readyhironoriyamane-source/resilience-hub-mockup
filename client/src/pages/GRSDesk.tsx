import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Send, HelpCircle, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function GRSDesk() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random ticket ID
    const id = "GRS-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTicketId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        <div className="container mx-auto max-w-3xl px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-sans font-bold mb-2 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary" />
              GRS Desk
            </h1>
            <p className="text-muted-foreground">
              The Global Resilience Hub 運営事務局への公式相談窓口です。<br />
              協業のご提案、取材依頼、補助金に関するご相談など、お気軽にお問い合わせください。
            </p>
          </div>

          {isSubmitted ? (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6 text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">お問い合わせを受け付けました</h2>
                <p className="text-muted-foreground mb-6">
                  以下の受付番号にて承りました。担当者より3営業日以内にご連絡いたします。
                </p>
                <div className="bg-black/30 rounded-lg p-4 mb-8 inline-block">
                  <span className="text-sm text-muted-foreground block mb-1">受付番号</span>
                  <span className="text-xl font-mono font-bold text-primary tracking-wider">{ticketId}</span>
                </div>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setLocation("/")} className="border-white/20 hover:bg-white/10 hover:text-white">
                    トップページへ戻る
                  </Button>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-primary hover:bg-primary/90 text-white">
                    別の相談をする
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">お問い合わせフォーム</CardTitle>
                <CardDescription className="text-slate-400">
                  必要な情報を入力して送信してください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-slate-300">ご相談カテゴリ <span className="text-red-400">*</span></Label>
                      <Select required>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white">
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                          <SelectItem value="collaboration">協業・パートナーシップのご提案</SelectItem>
                          <SelectItem value="speaking">登壇・イベント出演依頼</SelectItem>
                          <SelectItem value="media">取材・メディア掲載について</SelectItem>
                          <SelectItem value="subsidy">補助金・助成金に関するご相談</SelectItem>
                          <SelectItem value="other">その他のお問い合わせ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-slate-300">緊急度</Label>
                      <Select>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white">
                          <SelectValue placeholder="通常" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] border-white/10 text-white">
                          <SelectItem value="high">高（なるべく早めの回答を希望）</SelectItem>
                          <SelectItem value="normal">通常</SelectItem>
                          <SelectItem value="low">低（急ぎではない）</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-300">件名 <span className="text-red-400">*</span></Label>
                    <Input id="subject" required placeholder="例：〇〇に関する協業のご相談" className="bg-black/20 border-white/10 text-white placeholder:text-slate-600" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-300">お問い合わせ内容 <span className="text-red-400">*</span></Label>
                    <Textarea id="message" required placeholder="詳細な内容をご記入ください..." className="min-h-[150px] bg-black/20 border-white/10 text-white placeholder:text-slate-600" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">連絡先メールアドレス <span className="text-red-400">*</span></Label>
                    <Input id="email" type="email" required placeholder="your-email@company.com" className="bg-black/20 border-white/10 text-white placeholder:text-slate-600" />
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="mb-1 font-bold text-blue-400">AIによる自動応答について</p>
                      <p>
                        お問い合わせ内容によっては、AIエージェントが一次回答を行う場合があります。
                        複雑な案件については、運営スタッフが直接確認の上ご連絡いたします。
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
