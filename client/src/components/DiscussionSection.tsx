import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, MessageSquare, Send, User, Heart, Reply } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    content: "非常に興味深い視点です。特にAIによる予兆検知の精度向上については、今後の防災計画において中心的な役割を果たすと考えられます。",
    date: "2026/01/30 10:00",
    likes: 12,
    replies: []
  },
  {
    id: "2",
    content: "現場レベルでの導入障壁について、もう少し具体的な議論が必要です。特に高齢者への対応が課題になるでしょう。",
    date: "2026/01/29 15:30",
    likes: 5,
    replies: []
  }
];

interface DiscussionSectionProps {
  isLocked: boolean;
  onUpgrade: () => void;
}

export function DiscussionSection({ isLocked, onUpgrade }: DiscussionSectionProps) {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      date: new Date().toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      date: new Date().toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      likes: 0
    };

    setComments(comments.map(c => {
      if (c.id === commentId) {
        return { ...c, replies: [...(c.replies || []), reply] };
      }
      return c;
    }));
    
    setReplyingTo(null);
    setReplyContent("");
  };

  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(c => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies?.map(r => 
              r.id === commentId ? { ...r, likes: r.likes + 1 } : r
            )
          };
        }
        return c;
      }));
    } else {
      setComments(comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));
    }
  };

  return (
    <section className="mt-16 pt-10 border-t border-white/10" id="discussion-section">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold font-sans text-white">Community Discussion</h2>
        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs text-primary border border-primary/20">
          Beta
        </span>
      </div>

      {/* Comment Form */}
      <div className="mb-10 bg-white/5 rounded-xl p-6 border border-white/10">
        <form onSubmit={handleSubmit}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="記事についての感想や意見を投稿する（匿名）..."
            className="bg-black/20 border-white/10 text-white min-h-[100px] mb-4 focus:border-primary/50"
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!newComment.trim()}
              className="bg-primary hover:bg-primary/90 text-white font-bold"
            >
              <Send className="w-4 h-4 mr-2" />
              コメントを投稿
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Anonymous</span>
              </div>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            
            <p className="text-white/90 leading-relaxed mb-4 whitespace-pre-wrap">
              {comment.content}
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleLike(comment.id)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>{comment.likes}</span>
              </button>
              <button 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>返信</span>
              </button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4 pl-4 border-l-2 border-white/10">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="返信を入力..."
                  className="bg-black/20 border-white/10 text-white min-h-[80px] mb-2 text-sm"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent("");
                    }}
                    className="text-muted-foreground hover:text-white"
                  >
                    キャンセル
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    返信を投稿
                  </Button>
                </div>
              </div>
            )}

            {/* Replies List */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-6 space-y-4 pl-4 border-l-2 border-white/10">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                          <User className="w-3 h-3 text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">Anonymous</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{reply.date}</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-3">
                      {reply.content}
                    </p>
                    <button 
                      onClick={() => toggleLike(reply.id, true, comment.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-pink-500 transition-colors"
                    >
                      <Heart className="w-3 h-3" />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
