import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { ResilienceDashboard } from "@/components/ResilienceDashboard";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1026] text-white font-sans selection:bg-primary/30 flex">
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

      {/* Main Content */}
      <div className="flex-1 md:pl-64 relative z-10">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-2">防災ダッシュボード</h1>
            <p className="text-muted-foreground">
              組織のレジリエンスレベルを診断し、次のアクションを明確にします。
            </p>
          </header>

          <ResilienceDashboard />
        </div>
      </div>
    </div>
  );
}
