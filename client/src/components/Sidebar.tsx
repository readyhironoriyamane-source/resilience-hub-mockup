import { cn } from "@/lib/utils";
import { Bell, Home, Settings, ShoppingBag, User, LayoutDashboard, Sparkles, Globe } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("フィード");

  const navItems = [
    { name: "タイムライン", icon: null },
    { 
      name: "パーソナル・ダッシュボード", 
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: "自社課題を見える化"
    },
    { 
      name: "AIサマリー & コミュニティ", 
      icon: <Sparkles className="w-4 h-4" />,
      description: "世界中の有識者とつながる"
    },
    { name: "防災テクノロジー", icon: null },
    { name: "気候変動レジリエンス", icon: null },
    { name: "社会インフラ", icon: null },
    { name: "その他", icon: null },
  ];

  return (
    <div className="w-64 h-screen bg-[#0B1026] border-r border-white/10 flex flex-col h-full overflow-hidden">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-white/20">
          <span className="font-serif text-white font-bold">RH</span>
        </div>
        <span className="font-serif font-bold text-lg tracking-tight">The Global Resilience Hub</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-primary/10 text-primary mb-1">
            <span className="font-bold text-sm">タイムライン</span>
            <Settings className="w-4 h-4 opacity-70" />
          </div>
          {navItems.slice(1).map((item) => (
            <div 
              key={item.name}
              className={`px-4 py-3 text-sm rounded-lg cursor-pointer transition-colors flex items-start gap-3 ${
                activeItem === item.name 
                  ? "text-white bg-white/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              {item.icon && <span className={`mt-0.5 ${activeItem === item.name ? "text-[#d4a574]" : "text-muted-foreground group-hover:text-white"}`}>{item.icon}</span>}
              <div className="flex flex-col">
                <span className="leading-tight">{item.name}</span>
                {item.description && (
                  <span className="text-[10px] text-muted-foreground/70 mt-0.5 font-normal">{item.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 px-4">
          <div className="flex items-center justify-between px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer">
            <span className="font-bold text-sm">メンバー</span>
            <Settings className="w-4 h-4 opacity-70" />
          </div>
          <a href="/about" className="flex items-center justify-between px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer mt-2">
            <span className="font-bold text-sm">サービス紹介</span>
            <Globe className="w-4 h-4 opacity-70" />
          </a>
        </div>

        <div className="mt-4 px-4">
          <div className="px-4 py-2 text-muted-foreground hover:text-foreground cursor-pointer">
            <span className="font-bold text-sm">キャンペーン</span>
          </div>
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
        <div className="mt-4 flex items-center gap-2 px-2 opacity-70">
          <div className="w-4 h-4 rounded-full bg-primary"></div>
          <span className="font-serif font-bold text-lg">Scalably</span>
        </div>
      </div>
    </div>
  );
}
