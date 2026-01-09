import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
  likes: number;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Dr. Tanaka",
    role: "防災研究者",
    content: "非常に興味深い視点です。特にAIによる予兆検知の精度向上については、今後の防災計画において中心的な役割を果たすと考えられます。",
    date: "2時間前",
    likes: 12
  },
  {
    id: "2",
    author: "Sarah Jenkins",
    role: "Urban Planner",
    content: "This approach to resilient infrastructure aligns perfectly with the new UN guidelines. Would love to see more data on the cost-benefit analysis.",
    date: "5時間前",
    likes: 8
  },
  {
    id: "3",
    author: "K. Sato",
    role: "自治体職員",
    content: "現場レベルでの導入障壁について、もう少し具体的な議論が必要です。特に高齢者への対応が課題になるでしょう。",
    date: "1日前",
    likes: 5
  }
];

interface DiscussionSectionProps {
  isLocked: boolean;
  onUpgrade: () => void;
}

export function DiscussionSection({ isLocked, onUpgrade }: DiscussionSectionProps) {
  // 竹プラン対応: コミュニティ機能はPhase 2へ先送り
  // 現在はComing Soon表示のみを行う

  return (
    <section className="mt-16 pt-10 border-t border-white/10" id="discussion-section">
      <div className="flex items-center gap-3 mb-8 opacity-50">
        <MessageSquare className="w-6 h-6 text-muted-foreground" />
        <h2 className="text-xl font-bold font-serif text-muted-foreground">Community Discussion</h2>
        <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-muted-foreground">
          Coming Soon
        </span>
      </div>

      <div className="relative p-8 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-white/80">コミュニティ機能は準備中です</h3>
          <p className="text-sm text-muted-foreground mb-6">
            専門家や他のメンバーとのディスカッション機能は、
            2026年4月のリリースを予定しています。
            現在は情報の閲覧・収集に特化した体験をお楽しみください。
          </p>
        </div>
      </div>
    </section>
  );
}
