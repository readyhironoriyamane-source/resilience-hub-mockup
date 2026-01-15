import { cn } from "@/lib/utils";
import { Bell, Home, Settings, ShoppingBag, User, LayoutDashboard, Sparkles, Globe, Activity, ShieldAlert, Building2, Briefcase, Database, Bot, Satellite, Map, HelpCircle, FileText, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

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
      name: "GRS Desk (相談窓口)", 
      icon: <HelpCircle className="w-4 h-4" />,
      description: "協業・取材・補助金のご相談",
      href: "/desk"
    },
    { 
      name: "Community", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "世界中の有識者とつながる",
      href: "/community"
    },
    { 
      name: "Global Intel", 
      icon: <Globe className="w-4 h-4" />,
      description: "世界のリスク情報をAI収集",
      href: "/intel"
    },
    { 
      name: "Directory", 
      icon: <Building2 className="w-4 h-4" />,
      description: "会員企業・パートナー一覧",
      href: "/directory"
    },
    { 
      name: "Reports", 
      icon: <FileText className="w-4 h-4" />,
      description: "企業別レポート自動生成",
      href: "/reports",
      locked: true,
      release: "2026.04"
    },
  ];

  const needsNavItems = [
    { name: "リスク可視化・被害想定", icon: <Activity className="w-4 h-4" />, href: "/needs/risk-visualization" },
    { name: "安否確認・備蓄・訓練", icon: <ShieldAlert className="w-4 h-4" />, href: "/needs/safety-stockpile" },
    { name: "拠点保全・建物管理", icon: <Building2 className="w-4 h-4" />, href: "/needs/facility-management" },
    { name: "サプライチェーン・調達", icon: <Briefcase className="w-4 h-4" />, href: "/needs/supply-chain" },
    { name: "制度・補助金・法対応", icon: <FileText className="w-4 h-4" />, href: "/needs/regulations" },
  ];

  const techNavItems = [
    { name: "AI・ビッグデータ", icon: <Database className="w-4 h-4" />, href: "/seeds/ai-bigdata" },
    { name: "ドローン・ロボティクス", icon: <Bot className="w-4 h-4" />, href: "/seeds/drone" },
    { name: "衛星・地理情報", icon: <Satellite className="w-4 h-4" />, href: "/seeds/satellite" },
    { name: "IoT・センサー・観測", icon: <Activity className="w-4 h-4" />, href: "/seeds/iot-sensor" },
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
          
          {mainNavItems.map((item) => {
            // ロックされた機能（Roadmap）
            if (item.locked) {
              return (
                <div 
                  key={item.name}
                  onClick={() => toast.info(`${item.name}機能は${item.release}リリース予定です`)}
                  className="px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors flex items-start gap-3 mb-1 text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-50 group relative"
                >
                  <div className="relative">
                    {item.icon && <span className="mt-0.5 text-muted-foreground group-hover:text-white">{item.icon}</span>}
                    <div className="absolute -top-1 -right-1 bg-[#0B1026] rounded-full p-0.5">
                      <Lock className="w-2 h-2 text-slate-500" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="leading-tight">{item.name}</span>
                      <span className="text-[9px] border border-slate-700 rounded px-1 py-0.5 text-slate-500">{item.release}</span>
                    </div>
                    {item.description && (
                      <span className="text-[10px] text-muted-foreground/70 mt-0.5 font-normal">{item.description}</span>
                    )}
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
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
