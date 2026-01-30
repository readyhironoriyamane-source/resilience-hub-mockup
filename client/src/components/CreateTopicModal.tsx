import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, ChevronLeft, HelpCircle, Image as ImageIcon, MapPin } from "lucide-react";
import { toast } from "sonner";

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTopicModal({ isOpen, onClose }: CreateTopicModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    region: "",
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit
      toast.success("投稿が完了しました！", {
        description: "あなたの投稿がコミュニティに公開されました。",
      });
      onClose();
      setStep(1);
      setFormData({ category: "", title: "", content: "", region: "" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return !!formData.category;
      case 2: return formData.title.length > 5;
      case 3: return formData.content.length > 10;
      case 4: return true; // Optional steps
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white text-slate-900 p-0 overflow-hidden gap-0">
        {/* Header with Progress */}
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
              <span>質問・話題を載せる</span>
              <span className="text-sm font-normal text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                ステップ {step} / {totalSteps}
              </span>
            </DialogTitle>
          </DialogHeader>
          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6 min-h-[300px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h3 className="text-lg font-bold mb-2">どのような話題ですか？</h3>
                <p className="text-slate-500">最も近いカテゴリーを1つ選んでください</p>
              </div>
              
              <RadioGroup 
                value={formData.category} 
                onValueChange={(val) => setFormData({...formData, category: val})}
                className="grid grid-cols-1 gap-4"
              >
                <Label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.category === "consultation" ? "border-primary bg-primary/5" : "border-slate-200"}`}>
                  <RadioGroupItem value="consultation" className="sr-only" />
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">なんでも相談・雑談</div>
                    <div className="text-slate-500">業務の悩み、ニュースの感想、自己紹介など</div>
                  </div>
                  {formData.category === "consultation" && <Check className="text-primary w-6 h-6" />}
                </Label>

                <Label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.category === "bcp" ? "border-primary bg-primary/5" : "border-slate-200"}`}>
                  <RadioGroupItem value="bcp" className="sr-only" />
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">BCP・リスク管理の悩み</div>
                    <div className="text-slate-500">計画策定、訓練、リスク評価などの専門的な相談</div>
                  </div>
                  {formData.category === "bcp" && <Check className="text-primary w-6 h-6" />}
                </Label>

                <Label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-slate-50 ${formData.category === "tools" ? "border-primary bg-primary/5" : "border-slate-200"}`}>
                  <RadioGroupItem value="tools" className="sr-only" />
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">製品・ツールの情報交換</div>
                    <div className="text-slate-500">備蓄品、システム、アプリなどの使用感や評判</div>
                  </div>
                  {formData.category === "tools" && <Check className="text-primary w-6 h-6" />}
                </Label>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-bold mb-2">タイトルを決めましょう</h3>
                <p className="text-slate-500 mb-6">一目で内容がわかる見出しをつけると、回答が集まりやすくなります</p>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-bold text-blue-800 mb-1">良いタイトルの例</div>
                      <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>避難所でのペット対応について教えてください</li>
                        <li>【相談】備蓄食料の入れ替え時期の判断基準</li>
                        <li>○○システムの導入を検討中の方はいませんか？</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-bold">タイトル <span className="text-red-500 text-xs ml-1">必須</span></Label>
                  <Input 
                    id="title" 
                    placeholder="例：避難所でのペット対応について教えてください" 
                    className="text-lg p-6"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <p className="text-right text-xs text-slate-400">{formData.title.length} / 50文字</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-bold mb-2">詳しい内容を書きましょう</h3>
                <p className="text-slate-500 mb-6">背景や現状を少し詳しく書くと、より的確なアドバイスがもらえます</p>
                
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base font-bold">本文 <span className="text-red-500 text-xs ml-1">必須</span></Label>
                  <Textarea 
                    id="content" 
                    placeholder="例：現在、○○市の担当をしています。避難所でのアレルギー対応食の備蓄量について、他市の事例を伺いたいです。現在は全体の3%程度を確保していますが、これで十分か不安があります..." 
                    className="min-h-[200px] text-base p-4 leading-relaxed resize-none"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                  <p className="text-right text-xs text-slate-400">{formData.content.length}文字</p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-lg font-bold mb-2">補足情報はありますか？</h3>
                <p className="text-slate-500 mb-6">写真や地域情報を追加すると、より具体的な回答が得られます（任意）</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-base font-bold flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      写真・資料
                    </Label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">クリックしてアップロード</p>
                      <p className="text-xs text-slate-400 mt-1">JPG, PNG, PDF (最大10MB)</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      関連地域タグ
                    </Label>
                    <Select value={formData.region} onValueChange={(val) => setFormData({...formData, region: val})}>
                      <SelectTrigger className="w-full p-4 h-auto">
                        <SelectValue placeholder="地域を選択（任意）" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hokkaido">北海道・東北</SelectItem>
                        <SelectItem value="kanto">関東</SelectItem>
                        <SelectItem value="chubu">中部・北陸</SelectItem>
                        <SelectItem value="kansai">関西</SelectItem>
                        <SelectItem value="chugoku">中国・四国</SelectItem>
                        <SelectItem value="kyushu">九州・沖縄</SelectItem>
                        <SelectItem value="snow">豪雪地帯</SelectItem>
                        <SelectItem value="coast">沿岸部</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">
                      ※ 特定の地域（例：豪雪地帯など）に関する話題の場合、タグを付けると「クイックアクセス」で同じ地域の人に見つかりやすくなります。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className="text-slate-500 hover:text-slate-800"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 h-auto text-lg font-bold shadow-lg shadow-primary/20"
          >
            {step === totalSteps ? "投稿する" : "次へ"}
            {step !== totalSteps && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
