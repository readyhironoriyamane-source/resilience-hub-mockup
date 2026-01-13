import { useState } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Menu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FileText,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// 診断項目データ
const DIAGNOSTIC_ITEMS = [
  { id: "bcp", label: "BCP（事業継続計画）を策定済みである" },
  { id: "stock", label: "全従業員3日分の水・食料を備蓄している" },
  { id: "drill", label: "年1回以上の防災訓練を実施している" },
  { id: "safety", label: "安否確認システムを導入・運用している" },
  { id: "hazard", label: "自社拠点のハザードマップリスクを把握している" },
  { id: "supply", label: "主要サプライヤーの被災リスクを把握している" },
  { id: "remote", label: "非常時のリモートワーク環境が整備されている" },
  { id: "power", label: "非常用電源（発電機・蓄電池）を確保している" },
];

// 推奨アクションデータ
const RECOMMENDED_ACTIONS = [
  {
    id: 1,
    title: "BCP策定の基本ガイドを読む",
    description: "中小企業庁のガイドラインに基づいた、最短1日で策定できるBCPの作り方を解説します。",
    type: "Article",
    link: "/article/1"
  },
  {
    id: 2,
    title: "備蓄品チェックリストをダウンロード",
    description: "従業員数や業種に合わせて必要な備蓄品を自動計算できるExcelテンプレートです。",
    type: "Template",
    link: "/article/2"
  },
  {
    id: 3,
    title: "ハザードマップ確認の手引き",
    description: "自社拠点のリスクを正しく把握するための、国土交通省ハザードマップポータルの使い方。",
    type: "Guide",
    link: "/article/3"
  }
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<string[]>(["bcp", "drill", "hazard"]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true);

  // スコア計算 (100点満点)
  const score = Math.round((checkedItems.length / DIAGNOSTIC_ITEMS.length) * 100);

  // スコアに基づく評価
  const getEvaluation = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-emerald-400", message: "素晴らしい取り組みです！さらなる高みを目指しましょう。" };
    if (score >= 50) return { label: "Good", color: "text-blue-400", message: "基本的な対策はできています。弱点を補強しましょう。" };
    return { label: "Needs Improvement", color: "text-red-400", message: "早急な対策が必要です。まずは基本的な項目から着手しましょう。" };
  };

  const evaluation = getEvaluation(score);

  const handleCheck = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    // リアルタイム反映のため、再診断ボタンなどは不要にする
  };

  const handleActionClick = (link: string) => {
    setLocation(link);
  };

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

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <header className="mb-10">
            <h1 className="text-3xl font-serif font-bold mb-2">Resilience Health Check</h1>
            <p className="text-muted-foreground">
              8つの質問に答えるだけで、自社の防災・レジリエンスレベルを簡易診断できます。
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Diagnostic Checklist */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    現状チェックリスト
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    該当する項目にチェックを入れてください。スコアは自動的に更新されます。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {DIAGNOSTIC_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                      <Checkbox 
                        id={item.id} 
                        checked={checkedItems.includes(item.id)}
                        onCheckedChange={() => handleCheck(item.id)}
                        className="mt-1 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label 
                          htmlFor={item.id} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-slate-200"
                        >
                          {item.label}
                        </Label>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Critical Issues & Actions */}
              <div className="space-y-6">
                {/* Critical Issues List */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    優先対応が必要な重要課題 (Top 3)
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "サプライチェーン寸断リスクの可視化", deadline: "残り3日" },
                      { title: "BCPマニュアルの最終更新から1年以上経過", deadline: "要確認" },
                      { title: "従業員安否確認システムのテスト未実施", deadline: "残り1週間" }
                    ].map((issue, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#0B1026]/50 p-3 rounded-lg border border-red-500/10">
                        <span className="text-sm font-medium text-white">{issue.title}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-red-300 bg-red-500/10 px-2 py-1 rounded">{issue.deadline}</span>
                          <Button size="sm" variant="ghost" className="h-6 text-xs text-muted-foreground hover:text-white">詳細</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl font-bold flex items-center gap-2 mt-8">
                  <Lightbulb className="w-5 h-5 text-[#d4a574]" />
                  あなたへの推奨アクション
                </h2>
                <div className="grid gap-4">
                  {RECOMMENDED_ACTIONS.map((action) => (
                    <div 
                      key={action.id}
                      onClick={() => handleActionClick(action.link)}
                      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-primary mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/20">
                              {action.type}
                            </span>
                          </div>
                          <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {action.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 self-center">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Score & Summary */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Resilience Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="text-white/10"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${evaluation.color} transition-all duration-1000 ease-out`}
                          strokeWidth="8"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * score) / 100}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-bold text-white">{score}</span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <div className={`mt-4 text-lg font-bold ${evaluation.color}`}>
                      {evaluation.label}
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2 px-4">
                      {evaluation.message}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">業界平均スコア</span>
                      <span className="font-bold text-white">62</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">前回診断日</span>
                      <span className="font-bold text-white">2025.12.01</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold">
                    <FileText className="w-4 h-4 mr-2" />
                    詳細レポートを出力
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
