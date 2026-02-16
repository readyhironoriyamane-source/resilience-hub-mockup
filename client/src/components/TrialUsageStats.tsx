import { FileText, Users, Activity } from "lucide-react";

export function TrialUsageStats() {
  // Mock data - in a real app this would come from user context or API
  const stats = {
    articlesRead: 12,
    communitiesJoined: 3,
    diagnosticScore: 78
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-6 w-full max-w-md mx-auto">
      <div className="bg-[#1a2a4a]/50 border border-blue-500/20 rounded-lg p-3 text-center backdrop-blur-sm">
        <div className="flex justify-center mb-1">
          <FileText className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-xs text-slate-400 mb-0.5">閲覧した記事</div>
        <div className="text-lg font-bold text-white">{stats.articlesRead}<span className="text-xs font-normal text-slate-500 ml-0.5">本</span></div>
      </div>
      
      <div className="bg-[#1a2a4a]/50 border border-blue-500/20 rounded-lg p-3 text-center backdrop-blur-sm">
        <div className="flex justify-center mb-1">
          <Users className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-xs text-slate-400 mb-0.5">参加コミュニティ</div>
        <div className="text-lg font-bold text-white">{stats.communitiesJoined}<span className="text-xs font-normal text-slate-500 ml-0.5">件</span></div>
      </div>
      
      <div className="bg-[#1a2a4a]/50 border border-blue-500/20 rounded-lg p-3 text-center backdrop-blur-sm">
        <div className="flex justify-center mb-1">
          <Activity className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-xs text-slate-400 mb-0.5">診断スコア</div>
        <div className="text-lg font-bold text-white">{stats.diagnosticScore}<span className="text-xs font-normal text-slate-500 ml-0.5">点</span></div>
      </div>
    </div>
  );
}
