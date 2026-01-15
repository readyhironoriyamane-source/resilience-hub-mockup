import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Link as LinkIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DirectoryPage() {
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
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Member Directory
          </h1>
          <p className="text-muted-foreground mt-2">
            レジリエンス向上に取り組む先進企業・パートナー一覧
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Building2 className="h-4 w-4" />
          自社情報を登録・更新
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="企業名、業種、技術タグで検索..." 
          className="pl-10 bg-card/50 border-border/50"
        />
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0">
                  {company.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
                        {company.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" /> {company.industry}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {company.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {company.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {company.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{company.employees} employees</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs hover:text-primary">
                  <LinkIcon className="h-3 w-3" />
                  詳細を見る
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
