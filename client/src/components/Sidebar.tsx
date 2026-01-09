import { cn } from "@/lib/utils";
import { Bell, Home, Settings, ShoppingBag, User, LayoutDashboard, Sparkles, Globe, Activity, ShieldAlert, Building2, Briefcase, Database, Bot, Satellite, Map } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export function Sidebar() {
  const [location] = useLocation();
  const [activeItem, setActiveItem] = useState("タイムライン");

  const mainNavItems = [
    { 
      name: "パーソナル・ダッシュボード", 
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: "自社課題を見える化",
      href: "/dashboard"
    },
    { 
      name: "AIマッチング & コミュニティ", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "世界中の有識者とつながる (Coming Soon)",
      href: "/community"
    },
  ];

  const needsNavItems = [
    { name: "予測・予兆検知", icon: <Activity className="w-4 h-4" />, href: "/needs/prediction" },
    { name: "避難所・物資管理", icon: <ShieldAlert className="w-4 h-4" />, href: "/needs/shelter" },
    { name: "インフラ点検・監視", icon: <Building2 className="w-4 h-4" />, href: "/needs/infrastructure" },
    { name: "BCP・事業継続", icon: <Briefcase className="w-4 h-4" />, href: "/needs/bcp" },
  ];

  const techNavItems = [
    { name: "AI・ビッグデータ", icon: <Database className="w-4 h-4" />, href: "/seeds/ai-bigdata" },
    { name: "ドローン・ロボティクス", icon: <Bot className="w-4 h-4" />, href: "/seeds/drone" },
    { name: "衛星・地理情報", icon: <Satellite className="w-4 h-4" />, href: "/seeds/satellite" },
    { name: "ハザードマップ・可視化", icon: <Map className="w-4 h-4" />, href: "/seeds/hazard-map" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0B1026] border-r border-white/10 flex flex-col h-full overflow-hidden">
      <Link href="/">
        <div className="p-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20">
            <span className="font-serif text-white font-bold">RH</span>
          </div>
          <span className="font-serif font-bold text-lg tracking-tight">The Global Resilience Hub</span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6">
          <Link href="/">
            <div className={`flex items-center justify-between px-4 py-2 rounded-lg mb-2 cursor-pointer transition-colors ${
              location === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-primary/20 hover:text-primary"
            }`}>
              <span className="font-bold text-sm">タイムライン</span>
              <Settings className="w-4 h-4 opacity-70" />
            </div>
          </Link>
          
          {mainNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div 
                className={`px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors flex items-start gap-3 mb-1 ${
                  location === item.href 
                    ? "text-white bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.icon && <span className={`mt-0.5 ${location === item.href ? "text-[#d4a574]" : "text-muted-foreground group-hover:text-white"}`}>{item.icon}</span>}
                <div className="flex flex-col">
                  <span className="leading-tight">{item.name}</span>
                  {item.description && (
                    <span className="text-[10px] text-muted-foreground/70 mt-0.5 font-normal">{item.description}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 mb-6">
          <h3 className="px-4 text-xs font-bold text-muted-foreground/50 uppercase tracking-wider mb-2">課題・目的から探す</h3>
          {needsNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div 
                className={`px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors flex items-center gap-3 mb-1 ${
                  location === item.href 
                    ? "text-white bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span className={`${location === item.href ? "text-[#d4a574]" : "text-muted-foreground"}`}>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 mb-6">
          <h3 className="px-4 text-xs font-bold text-muted-foreground/50 uppercase tracking-wider mb-2">技術・分野から探す</h3>
          {techNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div 
                className={`px-4 py-2 text-sm rounded-lg cursor-pointer transition-colors flex items-center gap-3 mb-1 ${
                  location === item.href 
                    ? "text-white bg-white/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span className={`${location === item.href ? "text-[#d4a574]" : "text-muted-foreground"}`}>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 px-4 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer">
            <span className="font-bold text-sm">メンバー</span>
            <Settings className="w-4 h-4 opacity-70" />
          </div>
          <Link href="/about">
            <div className="flex items-center justify-between px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer mt-1">
              <span className="font-bold text-sm">サービス紹介</span>
              <Globe className="w-4 h-4 opacity-70" />
            </div>
          </Link>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">Hironori</div>
          </div>
          <ShoppingBag className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
          <div className="relative cursor-pointer group">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
              10
            </span>
          </div>
        </div>
        <div className="mt-4 px-2 opacity-90">
          <a 
            href="https://www.metaearth.co.jp/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/meta-earth-heroes-logo.png" 
              alt="META EARTH HEROES" 
              className="h-12 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
