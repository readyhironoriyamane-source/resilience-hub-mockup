import { ContentCard } from "@/components/ContentCard";
import { PremiumModal } from "@/components/PremiumModal";
import { Sidebar } from "@/components/Sidebar";
import { ContentItem, contentItems } from "@/lib/mock-data";
import { Search } from "lucide-react";
import { useState } from "react";

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
              <span className="font-serif font-bold text-sm">Resilience Hub</span>
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
                <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Resilience Hub</h1>
                <p className="text-sm text-muted-foreground mb-2">
                  レジリエンスハブ (Resilience Hub) は、防災・減災、気候変動対応、社会インフラ強化といった「...
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
                  <span>By @Yama</span>
                  <span>対応言語 🇯🇵 🇺🇸</span>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="container mx-auto px-4 mt-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-6 text-sm font-medium min-w-max pb-3">
                <button className="text-white border-b-2 border-white pb-1">トップページ</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">インパクトファンド</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">ファンド</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">環境改善</button>
                <button className="text-muted-foreground hover:text-white transition-colors pb-1">一次産業</button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 space-y-12 pb-24">
          {/* Section: Impact Fund */}
          <section>
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <h2 className="font-serif text-xl font-bold">インパクトファンド</h2>
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">›</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {contentItems.filter(i => i.category === "インパクトファンド").map(item => (
                <ContentCard key={item.id} item={item} onClick={handleCardClick} />
              ))}
            </div>
          </section>

          {/* Section: Fund */}
          <section>
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <h2 className="font-serif text-xl font-bold">ファンド</h2>
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">›</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {contentItems.filter(i => i.category === "ファンド").map(item => (
                <ContentCard key={item.id} item={item} onClick={handleCardClick} />
              ))}
            </div>
          </section>
          
           {/* Section: Primary Industry */}
           <section>
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <h2 className="font-serif text-xl font-bold">一次産業</h2>
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">›</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {contentItems.filter(i => i.category === "一次産業").map(item => (
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
