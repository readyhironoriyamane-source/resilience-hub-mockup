import { cn } from "@/lib/utils";
import { Bell, Home, Settings, ShoppingBag, User, LayoutDashboard, Sparkles, Globe, Activity, ShieldAlert, Building2, Briefcase, Database, Bot, Satellite, Map, HelpCircle, FileText, Lock, Wifi } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export function Sidebar() {
  const [location] = useLocation();
  const [activeItem, setActiveItem] = useState("タイムライン");

  const mainNavItems = [
    { 
      name: "防災ダッシュボード", 
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: "課題と対策の進捗を見える化",
      href: "/dashboard"
    },
    { 
      name: "防災相談窓口", 
      icon: <HelpCircle className="w-4 h-4" />,
      description: "補助金・取材・対策の相談",
      href: "/desk"
    },
    { 
      name: "防災コミュニティ", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "組織を超えた知見の共有",
      href: "/community"
    },
    { 
      name: "海外防災の最新動向", 
      icon: <Globe className="w-4 h-4" />,
      description: "世界の災害事例と対策を収集",
      href: "/intel"
    },
    { 
      name: "レジハブパートナー", 
      icon: <Building2 className="w-4 h-4" />,
      description: "連携パートナーを一覧から探す",
      href: "/directory"
    },
    { 
      name: "防災レポート作成", 
      icon: <FileText className="w-4 h-4" />,
      description: "企業別レポートを即座に生成",
      href: "/reports",
      locked: true,
      release: "2026.04"
    },
  ];

  const needsNavItems = [
    { name: "被害を予測する", icon: <Activity className="w-4 h-4" />, href: "/needs/risk-visualization" },
    { name: "安全と備えを管理する", icon: <ShieldAlert className="w-4 h-4" />, href: "/needs/safety-stockpile" },
    { name: "防災拠点の安全を守る", icon: <Building2 className="w-4 h-4" />, href: "/needs/facility-management" },
    { name: "災害時の物資調達・輸送を確認する", icon: <Briefcase className="w-4 h-4" />, href: "/needs/supply-chain" },
    { name: "使える支援制度と義務化への対応", icon: <FileText className="w-4 h-4" />, href: "/needs/regulations" },
  ];

  const techNavItems = [
    { name: "AI・ビッグデータ解析", icon: <Database className="w-4 h-4" />, href: "/seeds/ai-bigdata", description: "被害予測・画像診断" },
    { name: "ドローン・ロボティクス", icon: <Bot className="w-4 h-4" />, href: "/seeds/drone", description: "状況調査・物資運搬" },
    { name: "衛星データ・地理情報", icon: <Globe className="w-4 h-4" />, href: "/seeds/satellite", description: "広域の被害把握" },
    { name: "IoT・センサー観測", icon: <Wifi className="w-4 h-4" />, href: "/seeds/iot", description: "水位・土砂の遠隔監視" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0B1026] border-r border-white/10 flex flex-col h-full overflow-hidden">
      <Link href="/">
        <div className="p-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20">
            <span className="font-sans text-white font-bold">RH</span>
          </div>
          <span className="font-sans font-bold text-lg tracking-tight">The Global Resilience Hub</span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6">
          <Link href="/">
            <div className={`flex items-start gap-3 px-4 py-3 rounded-lg mb-1 cursor-pointer transition-colors ${
              location === "/" ? "bg-white/10 text-white" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}>
              <span className={`mt-0.5 ${location === "/" ? "text-[#d4a574]" : "text-muted-foreground"}`}>
                <Activity className="w-4 h-4" />
              </span>
              <div className="flex flex-col">
                <span className="leading-tight text-sm">最新の防災ニュース</span>
              </div>
            </div>
          </Link>
          
          {mainNavItems.map((item) => {
            // ロックされた機能（Roadmap）
            if (item.locked) {
              return (
                <div 
                  key={item.name}
                  onClick={() => toast.info(`${item.name}機能は${item.release}リリース予定です`)}
                  className="px-4 py-3 min-h-[44px] text-sm rounded-lg cursor-pointer transition-colors flex items-start gap-3 mb-1 text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-50 group relative" /* UD: タッチターゲット44px以上確保 */
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
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={`px-4 py-3 min-h-[44px] text-sm rounded-lg cursor-pointer transition-colors flex items-start gap-3 mb-1 ${ /* UD: タッチターゲット44px以上確保 */
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
                className={`px-4 py-3 min-h-[44px] text-sm rounded-lg cursor-pointer transition-colors flex items-center gap-3 mb-1 ${ /* UD: タッチターゲット44px以上確保 */
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
                className={`px-4 py-3 min-h-[44px] text-sm rounded-lg cursor-pointer transition-colors flex items-center gap-3 mb-1 ${ /* UD: タッチターゲット44px以上確保 */
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
        <Link href="/settings">
          <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Hironori</div>
              <div className="text-xs text-muted-foreground">Settings</div>
            </div>
            <div className="relative cursor-pointer group">
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                10
              </span>
            </div>
          </div>
        </Link>
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
