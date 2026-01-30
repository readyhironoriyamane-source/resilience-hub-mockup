import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, ShieldCheck, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types & Data Definitions ---

type Phase = "survival" | "continuity" | "contribution";

interface ChecklistItem {
  id: number;
  text: string;
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
    title: "初級：生存フェーズ",
    subtitle: "Life Safety",
    description: "生命と拠点を守るための最低限の備え",
    color: "bg-red-500",
    items: [
      { id: 1, text: "全従業員3日分の水・食料・トイレを備蓄している", isMandatory: true, weight: 20 },
      { id: 2, text: "自社拠点のハザードマップ（水害・地震）を把握している", isMandatory: true, weight: 20 },
      { id: 3, text: "オフィスの什器・設備の転倒防止対策済みである", isMandatory: false, weight: 8 },
      { id: 4, text: "緊急連絡網（電話以外にLINE/チャット等）がある", isMandatory: true, weight: 20 },
      { id: 5, text: "防災管理者（リーダー）を選任している", isMandatory: false, weight: 8 },
      { id: 6, text: "従業員向けの避難訓練を年1回実施している", isMandatory: false, weight: 8 },
      { id: 7, text: "負傷者対応のための救急セット（AED等）がある", isMandatory: false, weight: 8 },
      { id: 8, text: "損害保険（火災・地震・水災）に加入している", isMandatory: false, weight: 8 },
    ]
  },
  continuity: {
    id: "continuity",
    title: "中級：事業継続フェーズ",
    subtitle: "Business Continuity",
    description: "被災後も事業を止めない・早期復旧する力",
    color: "bg-amber-500",
    items: [
      { id: 1, text: "BCP（事業継続計画）を策定し、年1回更新している", isMandatory: true, weight: 15 },
      { id: 2, text: "重要業務の目標復旧時間（RTO）を設定している", isMandatory: true, weight: 15 },
      { id: 3, text: "安否確認システムを導入し、回答率訓練を行っている", isMandatory: false, weight: 10 },
      { id: 4, text: "重要データのクラウドバックアップ・代替手段がある", isMandatory: true, weight: 15 },
      { id: 5, text: "非常用電源（発電機・蓄電池）を72時間分確保している", isMandatory: true, weight: 15 },
      { id: 6, text: "従業員がリモート・代替拠点で業務できる環境がある", isMandatory: false, weight: 10 },
      { id: 7, text: "被災時の運転資金（手元流動性）を確保している", isMandatory: false, weight: 10 },
      { id: 8, text: "災害対策本部マニュアル（初動フロー）がある", isMandatory: false, weight: 10 },
    ]
  },
  contribution: {
    id: "contribution",
    title: "上級：社会貢献フェーズ",
    subtitle: "Social Resilience",
    description: "地域や社会全体のレジリエンスを高める存在へ",
    color: "bg-emerald-500",
    items: [
      { id: 1, text: "地域住民・帰宅困難者の受入体制を整備している", isMandatory: false, weight: 10 },
      { id: 2, text: "被災時の意思決定権限の委譲ルールが明確である", isMandatory: true, weight: 15 },
      { id: 3, text: "サプライチェーン全体の被災リスクを管理している", isMandatory: true, weight: 15 },
      { id: 4, text: "サイバー攻撃など複合災害への対策・演習を行っている", isMandatory: false, weight: 10 },
      { id: 5, text: "平時から自治体・他社と災害協定を締結している", isMandatory: false, weight: 10 },
      { id: 6, text: "経営層が参画するトップダウン型の訓練を実施している", isMandatory: true, weight: 15 },
      { id: 7, text: "防災・レジリエンスに関する認証を取得している", isMandatory: false, weight: 10 },
      { id: 8, text: "自社の防災ノウハウや資源を地域/社会へ提供できる", isMandatory: true, weight: 15 },
    ]
  }
};

// --- Helper Functions ---

const getScoreEvaluation = (score: number) => {
  if (score >= 90) return { rank: "EXCELLENT", label: "次のステージへ", message: "この級は卒業です。", cta: "ランクアップ", ctaDesc: "初級は完璧です。次は『中級：事業継続』に挑みましょう", color: "text-emerald-400", bg: "bg-emerald-500/20" };
  if (score >= 70) return { rank: "GOOD", label: "標準クリアレベル", message: "基礎体力はつきました。", cta: "質を高める", ctaDesc: "運用の質を上げるため、訓練シナリオを見直しましょう", color: "text-blue-400", bg: "bg-blue-500/20" };
  if (score >= 40) return { rank: "CAUTION", label: "形式的な備えレベル", message: "実際に機能するか不安が残ります。", cta: "弱点補強", ctaDesc: "配点の高い必須項目の整備を急いでください", color: "text-amber-400", bg: "bg-amber-500/20" };
  return { rank: "DANGER", label: "存続の危機レベル", message: "基本の“き”が抜けています。", cta: "一点突破で改善", ctaDesc: "まずは未達の必須項目だけやりましょう", color: "text-red-400", bg: "bg-red-500/20" };
};

export function ResilienceDashboard() {
  const [currentPhase, setCurrentPhase] = useState<Phase>("survival");
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

  return (
    <div className="space-y-6">
      {/* Phase Navigation / Progress */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {(Object.keys(RESILIENCE_DATA) as Phase[]).map((phase) => {
          const pConfig = RESILIENCE_DATA[phase];
          const isActive = currentPhase === phase;
          const pScore = calculateScore(phase);
          
          return (
            <button
              key={phase}
              onClick={() => setCurrentPhase(phase)}
              className={cn(
                "relative flex flex-col items-center p-3 rounded-xl border transition-all duration-300",
                isActive 
                  ? "bg-white/10 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "bg-white/5 border-white/5 hover:bg-white/10 opacity-70 hover:opacity-100"
              )}
            >
              <div className="text-[10px] md:text-base font-bold tracking-wider uppercase mb-1 text-muted-foreground">
                {pConfig.subtitle}
              </div>
              <div className="text-base md:text-base font-bold text-white mb-2">
                {pConfig.title.split("：")[0]}
              </div>
              <Progress value={pScore} className="h-1.5 w-full bg-black/40" indicatorClassName={pConfig.color} />
              <div className="text-base mt-1 font-mono">{pScore}%</div>
            </button>
          );
        })}
      </div>

      {/* Main Dashboard Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Score & Evaluation */}
        <Card className="lg:col-span-1 bg-[#151e32] border-white/10 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Current Status
            </CardTitle>
            <CardDescription>現在の到達レベル判定</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center py-6">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              {/* Circular Progress Placeholder - using SVG for custom look */}
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
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-4xl font-bold font-mono", evaluation.color)}>{score}</span>
                <span className="text-base text-muted-foreground">POINTS</span>
              </div>
            </div>
            
            <Badge variant="outline" className={cn("mb-3 px-3 py-1 text-base font-bold border-2", evaluation.color, evaluation.bg)}>
              {evaluation.rank}
            </Badge>
            <h3 className="text-lg font-bold text-white mb-1">{evaluation.label}</h3>
            <p className="text-base text-muted-foreground mb-6">{evaluation.message}</p>
            
            <div className="w-full bg-white/5 rounded-lg p-4 border border-white/10 text-left">
              <div className="flex items-center gap-2 mb-2 text-base font-bold text-primary uppercase tracking-wider">
                <Info className="w-3 h-3" />
                Recommended Action
              </div>
              <div className="font-bold text-white mb-1">{evaluation.cta}</div>
              <p className="text-base text-muted-foreground">{evaluation.ctaDesc}</p>
            </div>
          </CardContent>
        </Card>

        {/* Right: Checklist */}
        <Card className="lg:col-span-2 bg-[#151e32] border-white/10 flex flex-col h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{config.title}</CardTitle>
                <CardDescription className="mt-1">{config.description}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                {config.items.filter(i => checkedItems[`${currentPhase}-${i.id}`]).length} / {config.items.length} 完了
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3">
              {config.items.map((item) => {
                const isChecked = checkedItems[`${currentPhase}-${item.id}`] || false;
                const key = `${currentPhase}-${item.id}`;
                
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
          <CardFooter className="border-t border-white/5 pt-4">
            <Button className="w-full gap-2" disabled={score < 100}>
              次のステージへ進む <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
