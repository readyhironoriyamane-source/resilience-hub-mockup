import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { HelpCircle, Send, CheckCircle2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DeskPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("お問い合わせを受け付けました", {
        description: "担当者より2営業日以内にご連絡いたします。"
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
        <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
          <Sidebar />
        </div>
        <div className="flex-1 md:pl-64 relative z-10 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">受理されました</h2>
              <p className="text-muted-foreground mb-6">
                ノブレスオブリージュ、今後も救世主たらんことを。<br/>
                担当者より2営業日以内にご連絡いたします。
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline" 
                className="border-white/20 hover:bg-white/10"
              >
                フォームに戻る
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      {/* Sidebar for Desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 bg-[#0B1026]/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20">
              <span className="font-serif text-white font-bold text-xs">RH</span>
            </div>
            <span className="font-serif font-bold text-sm tracking-tight">Resilience Hub</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r border-white/10 bg-[#0B1026]">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl font-serif font-bold">GRS Desk</h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ここは、防災・レジリエンスに関する「共創」の窓口です。<br className="hidden md:block"/>
              単なる問い合わせだけでなく、新しい価値を生み出すための対話をお待ちしています。
            </p>
          </header>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">お問い合わせフォーム</CardTitle>
              <CardDescription className="text-slate-400">
                以下の項目にご入力ください。必須項目は必ずご記入をお願いいたします。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. 相談種別 */}
                <div className="space-y-3">
                  <Label className="text-base font-bold text-white">1. 相談種別 <span className="text-red-500 text-xs ml-1">*</span></Label>
                  <RadioGroup defaultValue="alliance" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <RadioGroupItem value="alliance" id="alliance" className="border-white/50 text-primary" />
                      <Label htmlFor="alliance" className="cursor-pointer flex-1">
                        <span className="block font-bold text-white">協業・アライアンス</span>
                        <span className="text-xs text-muted-foreground">技術連携、サービス連携のご提案</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <RadioGroupItem value="media" id="media" className="border-white/50 text-primary" />
                      <Label htmlFor="media" className="cursor-pointer flex-1">
                        <span className="block font-bold text-white">掲載・取材依頼</span>
                        <span className="text-xs text-muted-foreground">プレスリリース送付、インタビュー希望</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <RadioGroupItem value="sales" id="sales" className="border-white/50 text-primary" />
                      <Label htmlFor="sales" className="cursor-pointer flex-1">
                        <span className="block font-bold text-white">導入・利用相談</span>
                        <span className="text-xs text-muted-foreground">有料プラン詳細、法人契約について</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer">
                      <RadioGroupItem value="subsidy" id="subsidy" className="border-white/50 text-primary" />
                      <Label htmlFor="subsidy" className="cursor-pointer flex-1">
                        <span className="block font-bold text-white">補助金・制度活用</span>
                        <span className="text-xs text-muted-foreground">具体的な申請サポートの依頼</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2. 会社名 */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">2. 会社名・組織名 <span className="text-red-500 text-xs ml-1">*</span></Label>
                    <Input id="company" placeholder="例）株式会社レジリエンス・ハブ" required className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50" />
                  </div>

                  {/* 3. 担当者名 */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">3. 担当者名 <span className="text-red-500 text-xs ml-1">*</span></Label>
                    <Input id="name" placeholder="例）防災 太郎" required className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50" />
                  </div>
                </div>

                {/* 4. メールアドレス */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">4. 連絡先メールアドレス <span className="text-red-500 text-xs ml-1">*</span></Label>
                  <Input id="email" type="email" placeholder="example@company.co.jp" required className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50" />
                  <p className="text-xs text-muted-foreground">※原則として法人メールアドレスをご入力ください</p>
                </div>

                {/* 5. 相談内容詳細 */}
                <div className="space-y-4">
                  <Label className="text-base font-bold text-white">5. 具体的な相談内容 <span className="text-red-500 text-xs ml-1">*</span></Label>
                  
                  <div className="space-y-2">
                    <Label htmlFor="urgency" className="text-sm text-slate-300">今回のご相談の緊急度は？</Label>
                    <Select defaultValue="warm">
                      <SelectTrigger className="bg-white/5 border-white/10 text-white w-full md:w-1/2">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a2342] border-white/10 text-white">
                        <SelectItem value="hot">今すぐ動きたい (Hot)</SelectItem>
                        <SelectItem value="warm">情報収集中・検討段階 (Warm)</SelectItem>
                        <SelectItem value="cold">将来的な話として (Cold)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details" className="text-sm text-slate-300">詳細内容 (任意)</Label>
                    <Textarea 
                      id="details" 
                      placeholder="協業の場合：貴社の技術・サービスの概要&#13;&#10;取材の場合：対象となる取り組みや時期&#13;&#10;導入の場合：対象人数や解決したい課題" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 min-h-[120px]" 
                    />
                  </div>
                </div>

                {/* 6. 予算感 */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white">6. 予算感・規模感 (任意)</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-full md:w-1/2">
                      <SelectValue placeholder="未定" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2342] border-white/10 text-white">
                      <SelectItem value="undecided">未定</SelectItem>
                      <SelectItem value="small">〜100万円</SelectItem>
                      <SelectItem value="medium">100〜500万円</SelectItem>
                      <SelectItem value="large">500万円〜</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">※現時点での想定で構いません</p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-black font-bold py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></span>
                        送信中...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        共創を始める
                      </span>
                    )}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
