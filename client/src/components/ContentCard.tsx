import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ContentItem } from "@/lib/mock-data";
import { Lock, CheckCircle2, Tag, Heart, Bookmark } from "lucide-react";
import { useState } from "react";

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
  isRead?: boolean;
  featured?: boolean;
}

export function ContentCard({ item, onClick, isRead = false, featured = false }: ContentCardProps) {
  const [likes, setLikes] = useState(item.likes || 0);
  const [saves, setSaves] = useState(item.saves || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSaved) {
      setSaves(prev => prev + 1);
      setIsSaved(true);
    } else {
      setSaves(prev => prev - 1);
      setIsSaved(false);
    }
  };
  // Determine badge style based on item type
  const getBadgeStyle = (type?: string) => {
    switch (type) {
      case 'needs':
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case 'seeds':
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-white/10 text-white/70 border-white/10";
    }
  };

  const getBadgeLabel = (type?: string) => {
    switch (type) {
      case 'needs':
        return "Needs";
      case 'seeds':
        return "Seeds";
      default:
        return item.category;
    }
  };

  return (
    <Card 
      className={`overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-white/10 bg-card/40 backdrop-blur-md ${isRead ? 'opacity-70 hover:opacity-100' : ''}`}
      onClick={() => onClick(item)}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ${isRead ? 'grayscale-[30%]' : ''}`}
        />
        
        {/* Type Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold border backdrop-blur-sm flex items-center gap-1 ${getBadgeStyle(item.type)}`}>
          {item.type !== 'general' && <Tag className="w-3 h-3" />}
          {getBadgeLabel(item.type)}
        </div>

        {item.isPremium && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-primary border border-primary/30">
            <Lock className="w-3 h-3" />
          </div>
        )}
        
        {isRead && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-white/80 border border-white/10 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span className="text-[10px] font-medium">既読</span>
          </div>
        )}
      </div>
      <CardContent className={`p-4 ${featured ? 'p-6 md:p-8' : ''}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
            {item.author.charAt(0)}
          </div>
          <span className="text-base text-muted-foreground truncate">By {item.author}</span>
        </div>
        <h3 className={`font-sans font-bold leading-tight mb-2 group-hover:text-primary transition-colors ${isRead ? 'text-muted-foreground' : ''} ${featured ? 'text-2xl md:text-3xl mb-4' : 'text-base line-clamp-2'}`}>
          {item.title}
        </h3>
        {featured && (
          <p className="text-base text-muted-foreground mb-4 line-clamp-3 hidden md:block">
            {item.description || "この記事の概要はまだありません。クリックして詳細をご覧ください。"}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <p className="text-base text-muted-foreground">
            {item.date}
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-pink-500' : 'text-muted-foreground hover:text-pink-500'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            <button 
              onClick={handleSave}
              className={`flex items-center gap-1.5 text-sm transition-colors ${isSaved ? 'text-[#d4a574]' : 'text-muted-foreground hover:text-[#d4a574]'}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{saves}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
