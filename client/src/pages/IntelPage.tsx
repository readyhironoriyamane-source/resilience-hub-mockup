import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { Newspaper, Users } from "lucide-react";

export default function IntelPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

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
        
        <div className="container mx-auto px-4 py-8 pb-24 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-sans text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              海外防災の最新動向
            </h1>

          </div>

          {/* Coming Soon Content */}
          <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
              Coming Soon
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
              現在、サービス準備中です
            </h2>
            
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              世界中の防災トレンドやリスク情報をAIが収集・分析する機能を開発中です。<br className="hidden md:block" />
              公開まで今しばらくお待ちください。
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto gap-3 shadow-lg shadow-blue-900/20"
                onClick={() => setLocation('/articles')}
              >
                <Newspaper className="w-5 h-5" />
                最新の防災ニュース
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg h-auto gap-3 bg-transparent"
                onClick={() => setLocation('/community')}
              >
                <Users className="w-5 h-5" />
                防災コミュニティ
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
