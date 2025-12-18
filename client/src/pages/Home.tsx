import { useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import { PremiumModal } from "@/components/PremiumModal";
import { Sidebar } from "@/components/Sidebar";
import { contentItems, type ContentItem } from "@/lib/mock-data";
import { Bell, Menu, Search, ShoppingBag, Sparkles, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleCardClick = (item: ContentItem) => {
    setSelectedItem(item);
    if (item.isPremium) {
      setIsModalOpen(true);
    } else {
      // Navigate to detail page (mock)
      console.log("Navigate to detail:", item.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      <Sidebar />

      <main className="md:pl-64 relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0B1026]/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border border-white/20">
                <span className="font-serif text-white font-bold text-xs">RH</span>
              </div>
              <span className="font-serif font-bold text-sm">The Global Resilience Hub</span>
            </div>
            <div className="hidden md:block">
              {/* Desktop Header Content if needed */}
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-foreground hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Hero Section (Compact) */}
          <div className="bg-[#151e32] border-b border-white/5">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-2xl">
                <img src="/images/bg-stars.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">The Global Resilience Hub</h1>
                <p className="text-sm text-muted-foreground mb-2">
                  レジハブ（The Global Resilience Hub）は、日本と世界の"防災とレジリエンスの知を繋ぐ"<br/>
                  〜みんなで育てるコミュニティ型プラットフォーム〜
                </p>

                {/* Solution Intelligence Settings Area */}
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md max-w-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#d4a574]">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-bold text-sm">Solution Intelligence</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground hover:text-white px-2">
                      <Settings2 className="w-3 h-3 mr-1" />
                      設定を変更
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 text-left">
                    AIがあなたの関心に合わせてタイムラインを最適化します
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {["防災DX", "気候変動適応", "スマートシティ", "サステナブルファイナンス"].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-white/10 text-xs text-white/90 border border-white/5 hover:bg-white/20 cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-md border border-dashed border-white/20 text-xs text-muted-foreground hover:text-white cursor-pointer transition-colors">
                      + 追加
                    </span>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="container mx-auto px-4 mt-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-6 text-sm font-medium min-w-max pb-3">
                <button className="text-white border-b-2 border-white pb-1">タイムライン</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">防災テクノロジー</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">気候変動レジリエンス</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">社会インフラ</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">その他</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 pb-24">
          {/* Timeline View */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold">最新の投稿</h2>
              <div className="text-xs text-muted-foreground">全 {contentItems.length} 件</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sort by date descending (mock implementation assumes already sorted or just map) */}
              {contentItems.map(item => (
                <ContentCard key={item.id} item={item} onClick={handleCardClick} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <PremiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
