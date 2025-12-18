import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a2a4a] border-white/10 text-white p-0 overflow-hidden gap-0">
        <div className="relative h-48 w-full">
          <img 
            src="/images/bg-stars.png" 
            alt="Premium" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2a4a]" />
          <div className="absolute bottom-4 left-6 right-6 text-center">
            <h2 className="font-serif text-2xl font-bold mb-1 text-white drop-shadow-md">The Global Resilience Hub</h2>
            <p className="text-xs text-white/80">レジハブ（The Global Resilience Hub）は、日本と世界の"防災とレジリエンスの知を繋ぐ"</p>
            <p className="text-xs text-white/80">〜みんなで育てるコミュニティ型プラットフォーム〜</p>
          </div>
        </div>
        
        <div className="p-6 bg-white text-slate-900">
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-4 text-slate-600">
              会員限定情報の閲覧や自治体・企業・研究機関をつなぐ<br/>
              コミュニティへぜひご参加ください
            </p>

            <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">有料会員プラン</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">個人会員</span>
                <span className="font-bold text-slate-900">¥30,000 / 月</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-600">法人会員</span>
                <span className="font-bold text-slate-900">¥40,000 / 月</span>
              </div>
              <a href="#" className="text-xs text-primary hover:underline block text-right">
                料金プランの詳細はこちら &gt;
              </a>
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
              <div className="text-sm font-bold text-[#1a2a4a]">無料登録 / ログイン</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-[#1a2a4a]">サービス紹介</div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-[#1a2a4a]">友だち招待（シェア）</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
