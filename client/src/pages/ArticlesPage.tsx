import React, { useState } from "react";
import { useLocation } from "wouter";
import { mockArticles } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, User, Menu, BookOpen } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Link } from "wouter";

export default function ArticlesPage() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter articles based on search query and category
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockArticles.map(a => a.category)));

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/bg-stars.png')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/80 via-transparent to-[#0B1026]" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      <main className="md:pl-64 relative z-10 min-h-screen flex flex-col">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="container mx-auto px-4 py-8 pb-24">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              {/* Mobile menu trigger removed as it is handled by MobileHeader */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-[#d4a574]" />
                  Articles
                </h1>
                <p className="text-muted-foreground">
                  防災・BCP・レジリエンスに関する最新記事ライブラリ
                </p>
              </div>
            </div>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-card/30 p-4 rounded-lg border border-border/50 mb-8">
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
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 text-white">
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
      </main>
    </div>
  );
}
