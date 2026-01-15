import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Link as LinkIcon, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export default function DirectoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const companies = [
    {
      id: 1,
      name: "Resilience Tech Solutions Inc.",
      industry: "IT / SaaS",
      location: "Tokyo, Japan",
      employees: "50-100",
      description: "AIを活用したサプライチェーンリスク管理プラットフォームを提供。製造業を中心に導入実績多数。",
      tags: ["Risk Management", "AI", "Supply Chain"],
      logo: "RT"
    },
    {
      id: 2,
      name: "Global Logistics Partners",
      industry: "Logistics",
      location: "Singapore",
      employees: "1000+",
      description: "アジア全域をカバーする物流ネットワーク。緊急時の代替輸送ルート確保に強み。",
      tags: ["Logistics", "Transport", "Asia"],
      logo: "GL"
    },
    {
      id: 3,
      name: "Secure Infrastructure Ltd.",
      industry: "Construction",
      location: "London, UK",
      employees: "500-1000",
      description: "重要インフラ施設の耐震補強・セキュリティ強化工事を専門とする建設会社。",
      tags: ["Infrastructure", "Construction", "Security"],
      logo: "SI"
    },
    {
      id: 4,
      name: "Future Energy Systems",
      industry: "Energy",
      location: "Berlin, Germany",
      employees: "100-500",
      description: "再生可能エネルギーを活用した分散型電源システム。災害時の非常用電源として導入が進む。",
      tags: ["Energy", "BCP", "Sustainability"],
      logo: "FE"
    }
  ];

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
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <Building2 className="w-6 h-6 text-[#d4a574]" />
                  <span className="font-serif font-bold text-sm">Member Directory</span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                  Resilience Partners
                </h1>
                <p className="text-muted-foreground">
                  レジリエンス向上に取り組む先進企業・パートナー一覧
                </p>
              </div>
            </div>
            <Button variant="outline" className="gap-2 mt-4 md:mt-0">
              <Building2 className="h-4 w-4" />
              自社情報を登録・更新
            </Button>
          </header>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="企業名、業種、技術タグで検索..." 
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>

          {/* Company Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="bg-white/90 backdrop-blur-md border-white/20 hover:bg-white/95 hover:border-primary/30 transition-all duration-300 group shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0 border border-primary/20 shadow-inner">
                      {company.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors text-[#0B1026]">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" /> {company.industry}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {company.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                        {company.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {company.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Users className="h-3 w-3" />
                      <span>{company.employees} employees</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-slate-500 hover:text-primary hover:bg-slate-100">
                      <LinkIcon className="h-3 w-3" />
                      詳細を見る
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
