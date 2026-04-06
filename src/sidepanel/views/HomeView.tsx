import { useState } from 'react';
import { Brain, BarChart2 } from 'lucide-react';
import { LifetimeStats, QuestionCategory, SessionConfig, CATEGORY_LABELS } from '../../types';
import { clsx } from 'clsx';

interface Props {
  stats: LifetimeStats | null;
  onStartSession: (config: SessionConfig) => void;
  onViewStats: () => void;
}

const CATEGORY_COLORS: Record<QuestionCategory, string> = {
  verbal: 'bg-blue-500',
  math_logic: 'bg-purple-500',
  spatial: 'bg-orange-500',
};

export default function HomeView({ stats, onStartSession, onViewStats }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('verbal');
  const overallPct = stats && stats.allTimeTotal > 0
    ? Math.round((stats.allTimeCorrect / stats.allTimeTotal) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 space-y-5">
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-lg font-bold leading-tight">CCAT Practice</h1>
            <p className="text-xs text-gray-400">Aptitude test trainer</p>
          </div>
        </div>
        <button onClick={onViewStats} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          <BarChart2 className="w-4 h-4" />
          Stats
        </button>
      </div>

      {overallPct !== null && (
        <div className="bg-gray-900 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Lifetime Accuracy</span>
            <span className="text-2xl font-bold text-white">{overallPct}%</span>
          </div>
          {(['verbal', 'math_logic', 'spatial'] as QuestionCategory[]).map(cat => {
            const s = stats?.categoryStats[cat];
            const pct = s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">{CATEGORY_LABELS[cat]}</span>
                  <span>{s?.total ? `${pct}%` : '—'}</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className={clsx('h-full rounded-full transition-all', CATEGORY_COLORS[cat])} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Choose a mode</p>
        <button
          onClick={() => onStartSession({ mode: 'full', questionCount: 50, timeLimitSeconds: 900 })}
          className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 text-left transition-colors"
        >
          <div className="font-semibold">Full Test</div>
          <div className="text-xs text-gray-400 mt-0.5">50 questions · 15 minutes</div>
        </button>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
          <div>
            <div className="font-semibold">Category Sprint</div>
            <div className="text-xs text-gray-400 mt-0.5">20 questions · 6 minutes</div>
          </div>
          <div className="flex gap-2">
            {(['verbal', 'math_logic', 'spatial'] as QuestionCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  'flex-1 text-xs py-1.5 rounded-lg border transition-colors',
                  selectedCategory === cat
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                )}
              >
                {CATEGORY_LABELS[cat].split(' ')[0]}
              </button>
            ))}
          </div>
          <button
            onClick={() => onStartSession({ mode: 'category', category: selectedCategory, questionCount: 20, timeLimitSeconds: 360 })}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm font-semibold transition-colors"
          >
            Start Sprint →
          </button>
        </div>

        <button
          onClick={() => onStartSession({ mode: 'quick10', questionCount: 10, timeLimitSeconds: 180 })}
          className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl p-4 text-left transition-colors"
        >
          <div className="font-semibold">Quick 10</div>
          <div className="text-xs text-gray-400 mt-0.5">10 questions · 3 minutes</div>
        </button>
      </div>
    </div>
  );
}
