import { useRoute, Link, useLocation } from "wouter";
import { contentItems } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Lock, Share2, Bookmark, Clock, User, Zap, ThumbsUp, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { PremiumModal } from "@/components/PremiumModal";

import { useBookmark } from "@/hooks/useBookmark";
import { DiscussionSection } from "@/components/DiscussionSection";
import { ContentCard } from "@/components/ContentCard";

export default function ArticleDetail() {
  const [, params] = useRoute("/article/:id");
  const [, setLocation] = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmark();


  const [isLiked, setIsLiked] = useState(false);
  
  const item = contentItems.find(i => i.id === params?.id);

  // Get related articles (same category, excluding current item)
  const relatedArticles = contentItems
    .filter(i => i.category === item?.category && i.id !== item?.id)
    .slice(0, 3);



  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0B1026] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
          <Link href="/">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isLocked = item.isPremium;

  const handleCardClick = (id: number) => {
    setLocation(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 pb-32">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-white pl-0 gap-2">
              <ArrowLeft className="w-4 h-4" />
              一覧に戻る
            </Button>
          </Link>
        </div>



        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {item.date}
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-6">
            {item.title}
          </h1>

          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold">{item.author}</div>
              <div className="text-xs text-muted-foreground">Contributor</div>
            </div>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-10">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
        </header>

        {/* Resilience Hub Insights (Key Takeaways) */}
        {item.keyTakeaways && (
          <section className={`mb-12 bg-[#0F172A]/80 border border-primary/20 rounded-xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-lg ${isLocked ? 'select-none' : ''}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <SparklesIcon className="w-24 h-24 text-primary" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#d4a574] flex items-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                Resilience Hub Insights
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-muted-foreground font-mono">
                  AI Generated
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {item.date} 更新
                </span>
              </div>
            </div>
            <ul className={`space-y-3 ${isLocked ? 'blur-sm' : ''}`}>
              {item.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm md:text-base text-white/90">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-[2px]">
                <div className="text-center p-4">
                  <Lock className="w-8 h-8 text-[#d4a574] mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">Insightsは有料会員限定です</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none bg-[#0B1026]/60 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/5 mb-8">
          <div className="text-lg leading-relaxed text-white/80 mb-8">
            {item.description}
          </div>
          
          {/* Full Content or Locked Content */}
          <div className="relative">
            {/* Show full content if not premium */}
            {!isLocked ? (
              <div dangerouslySetInnerHTML={{ __html: item.fullContent || "" }} />
            ) : (
              <>
                <div className="h-32 overflow-hidden relative select-none">
                  <div className="blur-sm" dangerouslySetInnerHTML={{ __html: item.fullContent || "" }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1026]/80 to-[#0B1026]" />
                </div>
                
                {/* Premium Lock Overlay */}
                <div className="relative -mt-12 z-10 p-8 rounded-xl bg-[#0F172A] border border-[#d4a574]/30 text-center shadow-2xl shadow-black/50">
                  <Lock className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">プレミアム会員限定記事</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    この記事はプレミアム会員限定です。
                    Resilience Hub Insightsの全文、専門家による詳細な分析、
                    そしてコミュニティでの議論に参加するには、プレミアムプランへの登録が必要です。
                  </p>
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-[#d4a574] to-[#b8865c] hover:from-[#c49260] hover:to-[#a6754b] text-white font-bold px-8 py-6 h-auto text-lg shadow-lg shadow-orange-900/20"
                  >
                    プレミアムプランを見る
                  </Button>
                </div>
              </>
            )}
          </div>
        </article>

        {/* Source Link - Only show if unlocked */}
        {item.sourceUrl && !isLocked && (
          <div className="mb-8 bg-[#0F172A]/80 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <ExternalLink className="w-4 h-4" />
              <span className="font-bold text-white">一次情報ソース</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a 
                href={item.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline truncate flex-1 text-sm"
              >
                {item.sourceUrl}
              </a>
              <span className="text-xs text-muted-foreground whitespace-nowrap bg-white/5 px-2 py-1 rounded">
                信頼性確認済み
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ※ AI要約は情報の正確性を期していますが、重要な意思決定の際は必ず一次情報をご確認ください。
            </p>
          </div>
        )}

        {/* Discussion Section */}
        <DiscussionSection 
          isLocked={isLocked} 
          onUpgrade={() => setIsModalOpen(true)} 
        />

        {/* Related Articles Recommendation */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              おすすめの関連記事
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedItem) => (
                <ContentCard 
                  key={relatedItem.id} 
                  item={relatedItem} 
                  onClick={() => handleCardClick(Number(relatedItem.id))} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full hover:bg-white/10 ${isLiked ? "text-pink-500" : "text-muted-foreground"}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </Button>
        <div className="w-px h-6 bg-white/10" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-white/10 text-muted-foreground opacity-50"
          onClick={() => {
            document.getElementById('discussion-section')?.scrollIntoView({ behavior: 'smooth' });
            toast.info("コミュニティ機能は2026年4月リリース予定です");
          }}
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
        <div className="w-px h-6 bg-white/10" />
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full hover:bg-white/10 ${isBookmarked(item.id) ? "text-[#d4a574]" : "text-muted-foreground"}`}
          onClick={() => toggleBookmark(item.id)}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked(item.id) ? "fill-current" : ""}`} />
        </Button>
        <div className="w-px h-6 bg-white/10" />
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-muted-foreground">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <PremiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 5h4" />
      <path d="M19 17v4" />
      <path d="M15 19h4" />
    </svg>
  );
}
