import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ContentItem } from "@/lib/mock-data";
import { Lock } from "lucide-react";

interface ContentCardProps {
  item: ContentItem;
  onClick: (item: ContentItem) => void;
}

export function ContentCard({ item, onClick }: ContentCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border-white/10 bg-card/40 backdrop-blur-md"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {item.isPremium && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-primary border border-primary/30">
            <Lock className="w-3 h-3" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
            {item.author.charAt(0)}
          </div>
          <span className="text-xs text-muted-foreground truncate">By {item.author}</span>
        </div>
        <h3 className="font-serif font-bold text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {item.date}
        </p>
      </CardContent>
    </Card>
  );
}
