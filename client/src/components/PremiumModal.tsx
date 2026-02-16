import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorporate?: boolean; // Optional prop to force corporate view or recommendation
}

export function PremiumModal({ isOpen, onClose, isCorporate = false }: PremiumModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-[90%] bg-[#1a2a4a] border-white/10 text-white p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>有料会員登録のご案内</DialogTitle>
        </VisuallyHidden>
        
        {/* Header Section */}
        <div className="relative h-48 w-full shrink-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png" 
            alt="Premium" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a2a4a]" />
          <div className="absolute bottom-6 left-8 right-8 text-center z-10">
            <h2 className="font-sans text-2xl font-bold mb-2 text-white drop-shadow-md">The Global Resilience Hub</h2>
            <p className="text-lg text-white/90 font-bold">全国の防災担当者が、知識と経験でつながる場所</p>
          </div>
        </div>
        
        <div className="p-8 bg-white text-slate-900">
          <div className="text-center mb-8">
            <p className="text-lg font-medium text-slate-700">
              トライアル期間中に使った機能を、<br/>
              そのまま続けられます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Personal Plan Card */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow relative">
              <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-3">個人会員</h3>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                  防災ニュース／レベル診断／<br/>
                  コミュニティ相談／<br/>
                  定例会・カンファレンス参加
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="text-2xl font-bold text-blue-900">年間10,000円</div>
                <div className="text-sm text-blue-800/70">(月あたり833円)</div>
              </div>
            </div>

            {/* Corporate Plan Card */}
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200 flex flex-col h-full hover:shadow-md transition-shadow relative">
              <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                おすすめ
              </div>
              <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-blue-900 mb-3">法人会員</h3>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                  防災ニュース／レベル診断／<br/>
                  コミュニティ相談／定例会・カンファレンス参加／組織診断レポート出力
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-blue-200">
                <div className="text-2xl font-bold text-blue-900">月額5万円</div>
                <div className="text-sm text-blue-800/70">(年間60万円)</div>
                <div className="text-xs text-blue-800/60 mt-1">5名まで利用可能 ＝ 1人あたり月1万円</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <a href="/about" className="text-blue-600 hover:text-blue-800 hover:underline font-medium inline-flex items-center justify-center gap-1">
              料金プランの詳細・比較はこちら 
              <span className="text-lg">&rarr;</span>
            </a>
          </div>

          <div className="text-center">
            <Button 
              className="w-full max-w-md mx-auto bg-blue-600 text-white hover:bg-blue-700 font-bold py-6 text-xl rounded-full transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              onClick={() => alert("決済ページへ移動します")}
            >
              このまま続ける
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
