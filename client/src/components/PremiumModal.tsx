import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Crown } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorporate?: boolean; // Optional prop to force corporate view or recommendation
}

export function PremiumModal({ isOpen, onClose, isCorporate = false }: PremiumModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-[#1a2a4a] border-white/10 text-white p-0 overflow-hidden gap-0 max-h-[85vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>有料会員登録のご案内</DialogTitle>
        </VisuallyHidden>
        <div className="relative h-48 w-full">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png" 
            alt="Premium" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2a4a]" />
          <div className="absolute bottom-4 left-6 right-6 text-center">
            <h2 className="font-sans text-xl font-bold mb-1 text-white drop-shadow-md">The Global Resilience Hub</h2>
            <p className="text-sm text-white/90 font-bold">全国の防災担当者が、知識と経験でつながる場所</p>
          </div>
        </div>
        
        <div className="p-6 bg-white text-slate-900">
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-4 text-slate-600">
              トライアル期間中に使った機能を、<br/>
              そのまま続けられます。
            </p>

            <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">有料会員プラン</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <span className="block text-base font-bold text-slate-700 flex items-center gap-1">
                    個人会員
                  </span>
                    <span className="text-base text-slate-500">すべての記事・機能を利用可能</span>
                  </div>
                  <span className="font-bold text-slate-900">¥10,000<span className="text-base font-normal text-slate-500">/年</span></span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 bg-blue-50 -mx-4 px-4 py-2 border-l-4 border-l-blue-500">
                  <div>
                    <span className="block text-base font-bold text-blue-800">
                      法人会員 
                      {isCorporate && (
                        <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full ml-1">推奨</span>
                      )}
                    </span>
                    <span className="text-xs text-blue-600">組織での利用・請求書払い対応</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-blue-700 text-sm">月額5万円</span>
                    <span className="text-xs text-blue-600">(年間600,000円)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-right">
                <a href="/about" className="text-base text-blue-600 hover:underline font-medium">料金プランの詳細・比較はこちら &rarr;</a>
              </div>
            </div>
            
            <Button 
              className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold py-6 text-lg transition-all duration-300 shadow-lg shadow-blue-500/30"
              onClick={() => alert("決済ページへ移動します")}
            >
              このまま続ける
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
              <div className="w-6 h-6 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Crown className="w-3 h-3 text-yellow-400" />
              </div>
              <div className="text-sm font-bold text-[#1a2a4a]">プレミアム機能の継続利用</div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
              <div className="w-6 h-6 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <div className="text-sm font-bold text-[#1a2a4a]">過去記事アーカイブ閲覧</div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
              <div className="w-6 h-6 rounded-full bg-[#1a2a4a] flex items-center justify-center text-white shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <div className="text-sm font-bold text-[#1a2a4a]">コミュニティ全機能</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
