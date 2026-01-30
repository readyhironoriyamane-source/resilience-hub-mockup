import React from "react";
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border/40 bg-[#0B1026]/80 backdrop-blur-md sticky top-0 z-40">
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-sans text-white font-bold text-base">RH</span>
          </div>
          <span className="font-sans text-lg font-bold tracking-tight text-white">
            Resilience Hub
          </span>
        </div>
      </Link>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
