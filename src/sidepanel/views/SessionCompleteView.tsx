import { SessionResult, QuestionCategory, CATEGORY_LABELS } from '../../types';
import { clsx } from 'clsx';
import { Trophy } from 'lucide-react';

interface Props {
  result: SessionResult;
  onNewSession: () => void;
  onViewStats: () => void;
}

const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  verbal: 'bg-blue-500',
  math_logic: 'bg-purple-500',
  spatial: 'bg-orange-500',
};

function getPercentile(correct: number): { label: string; color: string } {
  if (correct >= 32) return { label: 'Top Tier (32+)', color: 'text-green-400' };
  if (correct >= 25) return { label: 'Above Average (25–31)', color: 'text-blue-400' };
  if (correct >= 17) return { label: 'Average (17–24)', color: 'text-yellow-400' };
  return { label: 'Below Average (<17)', color: 'text-red-400' };
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec}s`;
}

export default function SessionCompleteView({ result, onNewSession, onViewStats }: Props) {
  const pct = Math.round((result.totalCorrect / result.totalQuestions) * 100);
  const percentile = getPercentile(result.totalCorrect);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col p-4">
      <div className="flex flex-col items-center py-6">
        <Trophy className="w-10 h-10 text-yellow-400 mb-3" />
        <div className="text-4xl font-bold">{result.totalCorrect}/{result.totalQuestions}</div>
        <div className="text-xl text-gray-400">{pct}%</div>
        <div className="text-xs text-gray-500 mt-1">Time: {formatTime(result.timeTakenSeconds)}</div>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 mb-4 space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">By Category</p>
        {(['verbal', 'math_logic', 'spatial'] as QuestionCategory[]).map(cat => {
          const bd = result.categoryBreakdown[cat];
          if (bd.total === 0) return null;
          const catPct = Math.round((bd.correct / bd.total) * 100);
          return (
            <div key={cat} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">{CATEGORY_LABELS[cat]}</span>
                <span>{bd.correct}/{bd.total} ({catPct}%)</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className={clsx('h-full rounded-full', CATEGORY_COLORS[cat])} style={{ width: `${catPct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {result.config.mode === 'full' && (
        <div className="bg-gray-900 rounded-xl p-4 mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estimated CCAT Tier (approximate)</p>
          <p className={clsx('text-sm font-semibold', percentile.color)}>{percentile.label}</p>
          <p className="text-xs text-gray-600 mt-1">Based on raw score mapping — not an official assessment.</p>
        </div>
      )}

      <div className="space-y-2 mt-auto">
        <button onClick={onNewSession} className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-sm font-semibold transition-colors">
          Start New Session
        </button>
        <button onClick={onViewStats} className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl py-3 text-sm transition-colors">
          View All Stats
        </button>
      </div>
    </div>
  );
}
