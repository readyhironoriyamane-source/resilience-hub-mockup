import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, ShieldCheck, ArrowRight, Info, ChevronDown, ChevronUp, Heart, Building2, Users, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- Types & Data Definitions ---

type Phase = "survival" | "continuity" | "contribution";

interface ChecklistItem {
  id: number;
  text: string;
  actionLabel?: string; // Action-oriented text for next steps
  isMandatory: boolean;
  weight: number; // Score weight
}

interface PhaseConfig {
  id: Phase;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  items: ChecklistItem[];
}

const RESILIENCE_DATA: Record<Phase, PhaseConfig> = {
  survival: {
    id: "survival",
    title: "初級：命を守る準備からチェックする",
    subtitle: "命を守る準備",
    description: "",
    color: "bg-red-500",
    items: [
      { id: 1, text: "全従業員3日分の水・食料・トイレを備蓄している", actionLabel: "備蓄品リストを作成し、不足分を購入する", isMandatory: true, weight: 20 },
      { id: 2, text: "自社拠点のハザードマップ（水害・地震）を把握している", actionLabel: "自治体のサイトで最新のハザードマップを確認する", isMandatory: true, weight: 20 },
      { id: 3, text: "オフィスの什器・設備の転倒防止対策済みである", actionLabel: "固定器具を購入し、棚やコピー機を固定する", isMandatory: false, weight: 8 },
      { id: 4, text: "緊急連絡網（電話以外にLINE/チャット等）がある", actionLabel: "連絡網ツールを導入し、テスト送信を行う", isMandatory: true, weight: 20 },
      { id: 5, text: "防災管理者（リーダー）を選任している", actionLabel: "リーダーを指名し、役割を周知する", isMandatory: false, weight: 8 },
      { id: 6, text: "従業員向けの避難訓練を年1回実施している", actionLabel: "訓練日程を決定し、従業員に案内する", isMandatory: false, weight: 8 },
      { id: 7, text: "負傷者対応のための救急セット（AED等）がある", actionLabel: "救急セットの中身を確認し、期限切れを交換する", isMandatory: false, weight: 8 },
      { id: 8, text: "損害保険（火災・地震・水災）に加入している", actionLabel: "保険証券を確認し、補償範囲を見直す", isMandatory: false, weight: 8 },
    ]
  },
  continuity: {
    id: "continuity",
    title: "中級：事業継続フェーズ",
    subtitle: "活動を続ける準備",
    description: "被災後も事業を止めない・早期復旧する力",
    color: "bg-amber-500",
    items: [
      { id: 1, text: "BCP（事業継続計画）を策定し、年1回更新している", actionLabel: "BCP策定テンプレートをダウンロードする", isMandatory: true, weight: 15 },
      { id: 2, text: "重要業務の目標復旧時間（RTO）を設定している", actionLabel: "各部署の責任者と復旧目標時間を協議する", isMandatory: true, weight: 15 },
      { id: 3, text: "安否確認システムを導入し、回答率訓練を行っている", actionLabel: "安否確認システムの無料トライアルを申し込む", isMandatory: false, weight: 10 },
      { id: 4, text: "重要データのクラウドバックアップ・代替手段がある", actionLabel: "クラウドストレージの容量とバックアップ設定を確認する", isMandatory: true, weight: 15 },
      { id: 5, text: "非常用電源（発電機・蓄電池）を72時間分確保している", actionLabel: "必要な電力量を計算し、発電機を選定する", isMandatory: true, weight: 15 },
      { id: 6, text: "従業員がリモート・代替拠点で業務できる環境がある", actionLabel: "リモートアクセス権限の付与状況を確認する", isMandatory: false, weight: 10 },
      { id: 7, text: "被災時の運転資金（手元流動性）を確保している", actionLabel: "融資枠や現預金残高を確認する", isMandatory: false, weight: 10 },
      { id: 8, text: "災害対策本部マニュアル（初動フロー）がある", actionLabel: "初動対応フロー図を作成し、掲示する", isMandatory: false, weight: 10 },
    ]
  },
  contribution: {
    id: "contribution",
    title: "上級：社会貢献フェーズ",
    subtitle: "地域を助ける準備",
    description: "地域や社会全体のレジリエンスを高める存在へ",
    color: "bg-emerald-500",
    items: [
      { id: 1, text: "地域住民・帰宅困難者の受入体制を整備している", actionLabel: "受入可能人数と備蓄品を計算する", isMandatory: false, weight: 10 },
      { id: 2, text: "被災時の意思決定権限の委譲ルールが明確である", actionLabel: "権限委譲規定を作成し、承認を得る", isMandatory: true, weight: 15 },
      { id: 3, text: "サプライチェーン全体の被災リスクを管理している", actionLabel: "主要取引先のBCP策定状況をアンケート調査する", isMandatory: true, weight: 15 },
      { id: 4, text: "サイバー攻撃など複合災害への対策・演習を行っている", actionLabel: "セキュリティ診断を実施する", isMandatory: false, weight: 10 },
      { id: 5, text: "平時から自治体・他社と災害協定を締結している", actionLabel: "自治体の防災課に協定について問い合わせる", isMandatory: false, weight: 10 },
      { id: 6, text: "経営層が参画するトップダウン型の訓練を実施している", actionLabel: "経営会議で訓練日程を提案する", isMandatory: true, weight: 15 },
      { id: 7, text: "防災・レジリエンスに関する認証を取得している", actionLabel: "認証制度（レジリエンス認証等）の要件を確認する", isMandatory: false, weight: 10 },
      { id: 8, text: "自社の防災ノウハウや資源を地域/社会へ提供できる", actionLabel: "提供可能なリソース（場所・物・人）をリスト化する", isMandatory: true, weight: 15 },
    ]
  }
};

// --- Helper Functions ---

const getScoreEvaluation = (score: number) => {
  if (score >= 90) return { rank: "EXCELLENT", label: "次のステージへ", message: "この級は卒業です。", cta: "ランクアップ", ctaDesc: "初級は完璧です。次は『中級：事業継続』に挑みましょう", color: "text-emerald-400", bg: "bg-emerald-500/20" };
  if (score >= 70) return { rank: "GOOD", label: "標準クリアレベル", message: "基礎体力はつきました。", cta: "質を高める", ctaDesc: "運用の質を上げるため、訓練シナリオを見直しましょう", color: "text-blue-400", bg: "bg-blue-500/20" };
  if (score >= 40) return { rank: "注意", label: "形式的な備えレベル", message: "実際に機能するか不安が残ります。", cta: "弱点補強", ctaDesc: "配点の高い必須項目の整備を急いでください", color: "text-amber-400", bg: "bg-amber-500/20" };
  return { rank: "DANGER", label: "存続の危機レベル", message: "基本の“き”が抜けています。", cta: "一点突破で改善", ctaDesc: "まずは未達の必須項目だけやりましょう", color: "text-red-400", bg: "bg-red-500/20" };
};

export function ResilienceDashboard() {
  const [currentPhase, setCurrentPhase] = useState<Phase>("survival");
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock state for checked items (In a real app, this would be persisted)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    "survival-1": true,
    "survival-2": true,
    "survival-4": true,
    "survival-3": false,
    // Add some initial data for demo
  });

  const handleToggle = (phaseId: string, itemId: number) => {
    const key = `${phaseId}-${itemId}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = (phase: Phase) => {
    const config = RESILIENCE_DATA[phase];
    return config.items.reduce((total, item) => {
      const key = `${phase}-${item.id}`;
      return total + (checkedItems[key] ? item.weight : 0);
    }, 0);
  };

  const score = calculateScore(currentPhase);
  const evaluation = getScoreEvaluation(score);
  const config = RESILIENCE_DATA[currentPhase];

  // Get next actions (unchecked mandatory items first, then highest weight)
  const nextActions = useMemo(() => {
    return config.items
      .filter(item => !checkedItems[`${currentPhase}-${item.id}`])
      .sort((a, b) => {
        if (a.isMandatory && !b.isMandatory) return -1;
        if (!a.isMandatory && b.isMandatory) return 1;
        return b.weight - a.weight;
      })
      .slice(0, 3);
  }, [currentPhase, checkedItems, config.items]);

  return (
    <div className="space-y-6">
      {/* Header & Guidance */}
      <div className="mb-2">
        <h2 className="text-lg md:text-xl font-bold text-white mb-1">3つのステップで備えを固める</h2>
        <p className="text-xs md:text-sm text-muted-foreground">まずは『命を守る準備』から確認しましょう。各項目を選んで切り替えられます</p>
      </div>

      {/* Phase Navigation (Tabs) */}
      <div className="flex w-full border-b border-white/10 mb-6">
        {(Object.keys(RESILIENCE_DATA) as Phase[]).map((phase) => {
          const pConfig = RESILIENCE_DATA[phase];
          const isActive = currentPhase === phase;
          const pScore = calculateScore(phase);
          
          // Icons mapping
          const Icon = phase === "survival" ? Heart : phase === "continuity" ? Building2 : Users;
          
              return (
                <button
                  key={phase}
                  onClick={() => setCurrentPhase(phase)}
                  className={cn(
                    "flex-1 relative flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 border-b-2 group",
                    isActive 
                      ? "border-primary bg-white/5 text-white" 
                      : "border-transparent text-muted-foreground hover:bg-white/5 hover:text-gray-300"
                  )}
                >
                  {/* Active Indicator Triangle */}
                  {isActive && (
                    <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary z-10" />
                  )}

                  {/* Line 1: Icon + Subtitle */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-gray-300")} />
                    <span className="text-xs md:text-sm font-bold whitespace-nowrap">{pConfig.subtitle}</span>
                  </div>
                  
                  {/* Line 2: Level + Score + Indicator */}
                  <div className="flex items-center gap-2 text-[10px] md:text-xs">
                    <span className="opacity-80">{pConfig.title.split("：")[0]}</span>
                    <span className="font-mono font-bold">{pScore}%</span>
                    
                    {/* "Start Here" prompt for unstarted phases */}
                    {!isActive && pScore === 0 && (
                      <span className="hidden md:inline-flex items-center text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white ml-1 font-bold border border-white/20">
                        ここから診断
                      </span>
                    )}
                  </div>
                </button>
              );
        })}
      </div>

      {/* Main Dashboard Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Score & Next Actions (Compact) */}
        <Card className="lg:col-span-1 bg-[#151e32] border-white/10 flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              現在の防災レベル判定
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col py-4">
            {/* Compact Score Display */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * score) / 100}
                    className={cn("transition-all duration-1000 ease-out", evaluation.color)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn("text-xl font-bold font-mono", evaluation.color)}>{score}</span>
                </div>
              </div>
              
              <div>
                <Badge variant="outline" className={cn("mb-1 px-2 py-0.5 text-sm font-bold border-2", evaluation.color, evaluation.bg)}>
                  {evaluation.rank}
                </Badge>
                <h3 className="text-base font-bold text-white leading-tight">{evaluation.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{evaluation.message}</p>
              </div>
            </div>

            {/* Export Report Button */}
            <div className="mb-6">
              <Button 
                variant="outline" 
                className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-bold h-10 flex items-center justify-center gap-2"
                onClick={() => toast.success("レポートのPDF出力を開始しました")}
              >
                <FileText className="w-4 h-4" />
                PDFでレポートを出す
              </Button>
            </div>
            
            {/* Next Actions List */}
            <div className="w-full bg-white/5 rounded-lg p-4 border border-white/10 text-left flex-1">
              <div className="flex items-center gap-2 mb-3 text-base font-bold text-primary uppercase tracking-wider">
                <Info className="w-4 h-4" />
                次に行うこと
              </div>
              
              {nextActions.length > 0 ? (
                <div className="space-y-3">
                  {nextActions.map((item, idx) => {
                    const isFirst = idx === 0;
                    return (
                      <div 
                        key={item.id} 
                        className={cn(
                          "flex items-start gap-3 text-sm p-2 rounded-md transition-colors",
                          isFirst ? "bg-primary/10 border border-primary/20" : ""
                        )}
                      >
                        <div className={cn(
                          "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                          isFirst ? "bg-primary text-white" : "bg-white/10 text-muted-foreground"
                        )}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className={cn("font-bold leading-snug mb-0.5", isFirst ? "text-amber-400" : "text-white")}>
                            {item.actionLabel || item.text}
                          </p>
                          <p className="text-xs text-muted-foreground leading-tight mb-1">
                            {item.text}
                          </p>
                          {item.isMandatory && (
                            <span className="text-[10px] text-red-400 flex items-center gap-0.5 font-medium">
                              <AlertTriangle className="w-3 h-3" /> 最優先・必須
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-white font-bold mb-1">素晴らしい！完璧です</p>
                  <p className="text-xs text-emerald-200/70">この調子で次のステージもクリアしましょう</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right: Checklist (Always Expanded) */}
        <Card className="lg:col-span-2 bg-[#151e32] border-white/10 flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                  {config.title}
                </CardTitle>
                <CardDescription className="mt-1">{config.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                {config.items.filter(i => checkedItems[`${currentPhase}-${i.id}`]).length} / {config.items.length} 完了
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1">
            <div className="space-y-3 pt-2">
              {config.items.map((item) => {
                const isChecked = checkedItems[`${currentPhase}-${item.id}`] || false;
                
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleToggle(currentPhase, item.id)}
                    className={cn(
                      "group flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                      isChecked 
                        ? "bg-primary/10 border-primary/30" 
                        : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                      isChecked 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-white/30 group-hover:border-white/50"
                    )}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.isMandatory && (
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 bg-red-500/80 hover:bg-red-500/80 border-0">
                            必須
                          </Badge>
                        )}
                        <span className={cn("text-base font-medium transition-colors", isChecked ? "text-white" : "text-gray-300")}>
                          {item.text}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span>配点: {item.weight}点</span>
                        {item.isMandatory && <span className="text-red-400/80 flex items-center gap-0.5"><AlertTriangle className="w-3 h-3" /> 重要項目</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/5 pt-4 pb-6">
            <Button className="w-full gap-2" disabled={score < 100}>
              次のステージへ進む <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
