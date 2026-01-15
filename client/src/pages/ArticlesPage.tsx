import React, { useState } from "react";
import { useLocation } from "wouter";
import { mockArticles } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, User } from "lucide-react";

export default function ArticlesPage() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter articles based on search query and category
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockArticles.map(a => a.category)));

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Articles</h1>
          <p className="text-muted-foreground mt-2">
            レジリエンス向上のための専門記事・事例集
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card/30 p-4 rounded-lg border border-border/50">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="キーワードで検索..." 
            className="pl-10 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 no-scrollbar">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            すべて
          </Button>
          {categories.map(category => (
            <Button 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card 
            key={article.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
            onClick={() => setLocation(`/article/${article.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-foreground border-none">
                  {article.category}
                </Badge>
              </div>
              {article.isPremium && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-500/90 text-white border-none">Premium</Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="p-5 pb-2">
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </CardHeader>
            
            <CardContent className="p-5 pt-2 pb-4">
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{article.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p>該当する記事が見つかりませんでした。</p>
          <Button variant="link" onClick={() => {setSearchQuery(""); setSelectedCategory(null);}}>
            検索条件をクリア
          </Button>
        </div>
      )}
    </div>
  );
}
