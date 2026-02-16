import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumModal } from "@/components/PremiumModal";
import { usePaywall } from "@/hooks/usePaywall";

export function TrialReminderBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const { isTrialExpired } = usePaywall();

  // Simulate trial status check - in real app this would come from user context
  useEffect(() => {
    // For demo purposes, we'll randomly show either 3 days or 1 day remaining
    // In a real app, this would be calculated from the user's trial start date
    const random = Math.random();
    if (random > 0.5) {
      setDaysRemaining(3);
    } else {
      setDaysRemaining(1);
    }
  }, []);

  // Do not show banner if trial is already expired
  if (isTrialExpired || !isVisible || daysRemaining === null) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-2 shadow-md flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm md:text-base font-medium">
          <span>
            {daysRemaining === 3 
              ? "トライアル終了まであと3日です。このまま続けますか？" 
              : "明日でトライアルが終了します。継続登録はこちら。"}
          </span>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold h-8"
            onClick={() => setIsModalOpen(true)}
          >
            詳細を見る
          </Button>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-blue-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Add padding to body to prevent content from being hidden behind banner */}
      <style>{`
        body { padding-top: 56px; }
      `}</style>

      <PremiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
