import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Users, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

export default function DirectoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const companies = [
    {
      id: 1,
      benefit: "【強み】災害時の物流を止まらせない",
      name: "レジリエンス・テック株式会社",
      industry: "IT・システム",
      location: "東京都",
      stats: "全国35自治体で導入",
      description: "AIが物資の不足を予測し、自動で発注・配送手配を行うシステムです。",
      analogy: "例えるなら『熟練の物流担当者が、24時間365日監視してくれる』ような安心感があります。",
      tags: [
        { label: "物資の流通", type: "logistics" },
        { label: "リスク管理", type: "management" }
      ],
      logo: "RT"
    },
    {
      id: 2,
      benefit: "【強み】海外からの支援物資をスムーズに受け入れる",
      name: "グローバル・ロジスティクス・パートナーズ",
      industry: "物流・運送",
      location: "シンガポール（日本支社あり）",
      stats: "支援物資受入実績 500トン超",
      description: "アジア全域の物流網を活かし、国内が被災した際に海外から物資を調達・輸送します。",
      analogy: "例えるなら『海外に親戚がいて、困った時にすぐ救援物資を送ってくれる』ような存在です。",
      tags: [
        { label: "物資の流通", type: "logistics" },
        { label: "海外連携", type: "global" }
      ],
      logo: "GL"
    },
    {
      id: 3,
      benefit: "【強み】避難所の建物を地震から守る",
      name: "セキュア・インフラ建設",
      industry: "建設・土木",
      location: "大阪府",
      stats: "避難所改修実績 120件",
      description: "古い公民館や学校の耐震補強を、短期間・低コストで行う独自技術を持っています。",
      analogy: "例えるなら『建物の骨組みにギプスをして、折れないように補強する』イメージです。",
      tags: [
        { label: "施設強化", type: "infrastructure" },
        { label: "安全対策", type: "safety" }
      ],
      logo: "SI"
    },
    {
      id: 4,
      benefit: "【強み】停電しても電気が使えるようにする",
      name: "フューチャー・エナジー・システムズ",
      industry: "エネルギー",
      location: "福岡県",
      stats: "非常用電源導入 80施設",
      description: "太陽光と蓄電池を組み合わせ、災害時でもスマホ充電や照明を維持できるシステムです。",
      analogy: "例えるなら『巨大なモバイルバッテリーを、施設全体に備え付ける』ようなものです。",
      tags: [
        { label: "電力確保", type: "energy" },
        { label: "BCP対策", type: "management" }
      ],
      logo: "FE"
    }
  ];

  const getTagColor = (type: string) => {
    switch(type) {
      case 'logistics': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'management': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'infrastructure': return "bg-orange-100 text-orange-800 border-orange-200";
      case 'energy': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'safety': return "bg-green-100 text-green-800 border-green-200";
      case 'global': return "bg-teal-100 text-teal-800 border-teal-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

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
        
        <div className="container mx-auto px-4 py-8 pb-24 max-w-5xl">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              レジハブパートナー
            </h1>
            <p className="text-gray-300 text-base md:text-lg">
              地域の課題を一緒に解決する、先進的な企業をご紹介します。
            </p>
          </header>

          {/* Company Grid */}
          <div className="grid grid-cols-1 gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="bg-white border-0 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Main Content */}
                    <div className="p-6 md:p-8 flex-1">
                      {/* Benefit (Top Priority) */}
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-[#0B1026] leading-snug group-hover:text-blue-700 transition-colors">
                          {company.benefit}
                        </h3>
                      </div>

                      {/* Company Info & Stats */}
                      <div className="flex flex-wrap items-center gap-4 mb-5 text-sm md:text-base">
                        <div className="flex items-center gap-2 text-slate-600 font-bold">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200">
                            {company.logo}
                          </div>
                          {company.name}
                        </div>
                        <div className="hidden md:block w-px h-4 bg-slate-300"></div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {company.location}
                        </div>
                        <div className="hidden md:block w-px h-4 bg-slate-300"></div>
                        <div className="flex items-center gap-1.5 text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded">
                          <Users className="h-4 w-4" />
                          {company.stats}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-4 mb-6">
                        <p className="text-base text-slate-700 leading-relaxed">
                          {company.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Area (Desktop) / Bottom (Mobile) */}
                    <div className="bg-slate-50 p-6 md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-3">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md h-12 text-base font-bold gap-2">
                        <LinkIcon className="h-5 w-5" />
                        会社HPを見る
                      </Button>
                      <p className="text-xs text-center text-slate-400 mt-2">
                        ※外部サイトへ遷移します
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Footer Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">お探しの企業が見つからない場合は？</p>
            <Button variant="link" className="text-[#d4a574] hover:text-[#e5b685] text-lg p-0 h-auto font-bold">
              事務局に無料で相談する &rarr;
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
