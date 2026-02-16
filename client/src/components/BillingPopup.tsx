import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface BillingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BillingPopup({ isOpen, onClose }: BillingPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-[#0B1026] border-amber-500/30 text-white">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-3xl font-bold text-amber-500">
            無料トライアル期間が終了しました
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-lg">
            引き続きすべての機能をご利用いただくには、プランのアップグレードが必要です。<br />
            あなたの組織に最適なプランをお選びください。
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {/* Personal Plan */}
          <Card className="bg-card/30 border-border/50 hover:border-primary/50 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white">個人プラン</CardTitle>
              <CardDescription className="text-gray-400">
                個人事業主・専門家向け
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">¥10,000</span>
                <span className="text-gray-400">/年</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>ニュース記事の閲覧（無制限）</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>コミュニティへの参加</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>基本的な自己診断機能</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                個人プランを選択
              </Button>
            </CardFooter>
          </Card>

          {/* Corporate Plan */}
          <Card className="bg-card/30 border-amber-500/50 hover:border-amber-500 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
            <div className="absolute top-3 right-3">
              <span className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                おすすめ
              </span>
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <CardTitle className="text-2xl text-white">法人プラン</CardTitle>
              <CardDescription className="text-gray-400">
                企業・自治体・団体向け
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">¥600,000</span>
                <span className="text-gray-400">/年</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>全機能へのアクセス権限</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>組織内メンバー管理（無制限）</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>高度な分析レポート・API連携</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>専任サポート担当のアサイン</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                法人プランを選択
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            今はスキップして制限付きで利用する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
