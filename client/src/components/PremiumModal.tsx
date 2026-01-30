import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a2a4a] border-white/10 text-white p-0 overflow-hidden gap-0">
        <VisuallyHidden>
          <DialogTitle>有料会員登録のご案内</DialogTitle>
        </VisuallyHidden>
        <div className="relative h-48 w-full">
          <img 
            src="/images/bg-stars.png" 
            alt="Premium" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2a4a]" />
          <div className="absolute bottom-4 left-6 right-6 text-center">
            <h2 className="font-sans text-2xl font-bold mb-1 text-white drop-shadow-md">The Global Resilience Hub</h2>
            <p className="text-base text-white/80">レジハブ（The Global Resilience Hub）は、日本と世界の"防災とレジリエンスの知を繋ぐ"</p>
            <p className="text-base text-white/80">〜みんなで育てるコミュニティ型プラットフォーム〜</p>
          </div>
        </div>
        
        <div className="p-6 bg-white text-slate-900">
          <div className="text-center mb-6">
            <p className="text-base font-medium mb-4 text-slate-600">
              コンテンツの閲覧やコミュニティ参加など<br/>
              素敵な有料会員体験を手に入れましょう
            </p>

            <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">有料会員プラン</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <span className="block text-base font-bold text-slate-700">Standard</span>
                    <span className="text-base text-slate-500">SaaS単体</span>
                  </div>
                  <span className="font-bold text-slate-900">¥40,000<span className="text-base font-normal text-slate-500">/月</span></span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 bg-emerald-50 -mx-4 px-4 py-2 border-l-4 border-l-emerald-500">
                  <div>
                    <span className="block text-base font-bold text-emerald-800">Bundle <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full ml-1">人気</span></span>
                    <span className="text-base text-emerald-600">OSINTech付帯</span>
                  </div>
                  <span className="font-bold text-emerald-700">¥60,000<span className="text-base font-normal text-emerald-600">/月</span></span>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-base font-bold text-slate-700">Premium</span>
                    <span className="text-base text-slate-500">協会特別会員</span>
                  </div>
                  <span className="font-bold text-slate-900">¥100,000<span className="text-base font-normal text-slate-500">/月</span></span>
                </div>
              </div>

              <div className="mt-4 text-right">
                <a href="/about" className="text-base text-blue-600 hover:underline font-medium">料金プランの詳細・比較はこちら &rarr;</a>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[#d4a574] text-white hover:bg-[#c49564] font-bold py-6 text-lg transition-all duration-300 shadow-lg shadow-[#d4a574]/30"
              onClick={() => alert("決済ページへ移動します")}
            >
              有料会員に登録する
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-base font-bold text-[#1a2a4a]">無料登録 / ログイン</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-base font-bold text-[#1a2a4a]">サービス紹介</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-base font-bold text-[#1a2a4a]">友だち招待（シェア）</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
