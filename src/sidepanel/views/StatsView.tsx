import { useState } from 'react';
import { LifetimeStats, QuestionCategory, CATEGORY_LABELS, SessionResult } from '../../types';
import { clsx } from 'clsx';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface Props {
  stats: LifetimeStats | null;
  onBack: () => void;
  onStatsCleared: () => void;
}

const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  verbal: 'bg-blue-500',
  math_logic: 'bg-purple-500',
  spatial: 'bg-orange-500',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

export default function StatsView({ stats, onBack, onStatsCleared }: Props) {
  const [confirming, setConfirming] = useState(false);

  const handleClear = async () => {
    await chrome.storage.local.remove('ccat_lifetime_stats');
    setConfirming(false);
    onStatsCleared();
  };

  const overallPct = stats && stats.allTimeTotal > 0
    ? Math.round((stats.allTimeCorrect / stats.allTimeTotal) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col p-4">
      <div className="flex items-center gap-2 mb-5">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold">Statistics</h2>
      </div>

      {!stats || stats.allTimeTotal === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">No sessions completed yet.</p>
      ) : (
        <>
          <div className="bg-gray-900 rounded-xl p-4 mb-4 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Overall</span>
              <span className="text-2xl font-bold">{overallPct}%</span>
            </div>
            <p className="text-xs text-gray-500">{stats.totalSessionsCompleted} sessions · {stats.allTimeCorrect}/{stats.allTimeTotal} correct</p>
            {(['verbal', 'math_logic', 'spatial'] as QuestionCategory[]).map(cat => {
              const s = stats.categoryStats[cat];
              const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{CATEGORY_LABELS[cat]}</span>
                    <span>{s.total ? `${pct}% (${s.correct}/${s.total})` : '—'}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className={clsx('h-full rounded-full', CATEGORY_COLORS[cat])} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Recent Sessions</p>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {stats.recentSessions.map((s: SessionResult) => (
              <div key={s.id} className="bg-gray-900 rounded-xl p-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{formatDate(s.completedAt)}</span>
                  <span className="font-bold">{s.totalCorrect}/{s.totalQuestions} ({Math.round(s.totalCorrect / s.totalQuestions * 100)}%)</span>
                </div>
                <div className="flex justify-between mt-1 text-gray-500">
                  <span className="capitalize">{s.config.mode === 'quick10' ? 'Quick 10' : s.config.mode === 'category' ? `Sprint: ${s.config.category}` : 'Full Test'}</span>
                  <span>{formatTime(s.timeTakenSeconds)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-4">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-full flex items-center justify-center gap-2 text-xs text-red-500 hover:text-red-400 py-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All Stats
          </button>
        ) : (
          <div className="bg-red-950 border border-red-700 rounded-xl p-3 space-y-2">
            <p className="text-xs text-red-300 text-center">This will delete all session history. Continue?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirming(false)} className="flex-1 bg-gray-800 rounded-lg py-2 text-xs">Cancel</button>
              <button onClick={handleClear} className="flex-1 bg-red-700 rounded-lg py-2 text-xs font-semibold">Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
