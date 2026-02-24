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
      icon: <LayoutDashboard className="w-5 h-5" />,
      description: "月1回チェック推奨",
      href: "/dashboard"
    },
    { 
      name: "防災相談窓口", 
      icon: <HelpCircle className="w-5 h-5" />,
      description: "課題があればいつでも",
      href: "/desk"
    },
    { 
      name: "防災コミュニティ", 
      icon: <Sparkles className="w-5 h-5" />,
      description: "事例・知見を交換する",
      href: "/community"
    },
    { 
      name: "海外防災の最新動向", 
      icon: <Globe className="w-5 h-5" />,
      description: "グローバルトレンドを把握",
      href: "/intel"
    },
    { 
      name: "レジハブパートナー", 
      icon: <Building2 className="w-5 h-5" />,
      description: "ソリューションを探す",
      href: "/directory"
    },
  ];

  return (
    <div className="w-72 h-screen bg-[#0B1026] border-r border-white/10 flex flex-col overflow-hidden shrink-0 sticky top-0">
      <Link href="/">
        <div className="p-6 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20 shrink-0">
            <span className="font-sans text-white font-bold">RH</span>
          </div>
          <span className="font-sans font-bold text-lg tracking-tight text-white">The Global Resilience Hub</span>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto py-4 px-4">
        <div className="mb-6 space-y-1">
          <Link href="/">
            <div className={`group flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              location === "/" ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}>
              <span className={`mt-1 shrink-0 ${location === "/" ? "text-[#d4a574]" : "text-slate-500 group-hover:text-[#d4a574]"}`}>
                <Activity className="w-5 h-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight mb-0.5">最新の防災ニュース</span>
                <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">今日の情報をチェック</span>
              </div>
            </div>
          </Link>
          
          {mainNavItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div 
                className={`group flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  location === item.href 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`mt-1 shrink-0 ${location === item.href ? "text-[#d4a574]" : "text-slate-500 group-hover:text-[#d4a574]"}`}>
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight mb-0.5">{item.name}</span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{item.description}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 space-y-1">
          <Link href="/about">
            <div className={`group flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              location === "/about" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}>
              <span className={`mt-1 shrink-0 ${location === "/about" ? "text-[#d4a574]" : "text-slate-500 group-hover:text-[#d4a574]"}`}>
                <HelpCircle className="w-5 h-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight mb-0.5">サービス紹介</span>
                <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">レジハブの使い方</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0B1026]">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/20 transition-colors">
              <User className="w-5 h-5 text-slate-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Hironori</div>
              <div className="text-xs text-slate-500">設定</div>
            </div>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border-2 border-[#0B1026]">
                10
              </span>
            </div>
          </div>
        </Link>
        
        <Link href="/auth">
          <div className="flex items-center gap-3 px-3 py-2 mt-1 cursor-pointer hover:bg-white/5 rounded-xl transition-colors text-slate-500 hover:text-red-400 group">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-sm font-bold">ログアウト</div>
          </div>
        </Link>

        <div className="mt-4 px-3 opacity-60 hover:opacity-100 transition-opacity">
          <a 
            href="https://www.metaearth.co.jp/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/92549119/APwdhsHRGLOnpVQd.png" 
              alt="META EARTH HEROES" 
              className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
