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
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Guest User",
      role: "Member",
      content: newComment,
      date: "たった今",
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <section className="mt-16 pt-10 border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-[#d4a574]" />
        <h2 className="text-xl font-bold font-serif">Community Discussion</h2>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-muted-foreground">
          {comments.length}
        </span>
      </div>

      <div className="relative">
        {/* Comment List */}
        <div className={`space-y-6 ${isLocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                  <User className="w-5 h-5 text-white/70" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold text-sm mr-2">{comment.author}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground border border-white/5">
                      {comment.role}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-primary transition-colors">
                    いいね ({comment.likes})
                  </button>
                  <button className="hover:text-primary transition-colors">
                    返信
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-[#0B1026]/60 to-[#0B1026]/90 rounded-xl">
            <div className="p-8 rounded-xl bg-[#0F172A] border border-[#d4a574]/30 text-center shadow-2xl max-w-md mx-4">
              <Lock className="w-10 h-10 text-[#d4a574] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">議論に参加するには</h3>
              <p className="text-sm text-muted-foreground mb-6">
                専門家や他のメンバーとのディスカッションを閲覧・投稿するには、
                プレミアムプランへの登録が必要です。
              </p>
              <Button 
                onClick={onUpgrade}
                className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8865c] hover:from-[#c49260] hover:to-[#a6754b] text-white font-bold"
              >
                プレミアムプランを見る
              </Button>
            </div>
          </div>
        )}

        {/* Comment Form (Only visible if unlocked) */}
        {!isLocked && (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="議論に参加する..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none"
              />
              <div className="flex justify-end mt-2">
                <Button type="submit" disabled={!newComment.trim()} size="sm" className="gap-2">
                  <Send className="w-4 h-4" />
                  投稿する
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
