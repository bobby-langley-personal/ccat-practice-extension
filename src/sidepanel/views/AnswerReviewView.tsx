import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { CCATQuestion } from '../../types';
import { Loader2 } from 'lucide-react';

interface Props {
  question: CCATQuestion;
  selectedIndex: number;
  explanation: string;
  explanationLoading: boolean;
  isLast: boolean;
  onNext: () => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function AnswerReviewView({ question, selectedIndex, explanation, explanationLoading, isLast, onNext }: Props) {
  const [autoAdvance, setAutoAdvance] = useState(8);
  const [cancelled, setCancelled] = useState(false);
  const wasCorrect = selectedIndex === question.correctIndex;

  useEffect(() => {
    if (explanationLoading || cancelled) return;
    const interval = setInterval(() => {
      setAutoAdvance(prev => {
        if (prev <= 1) { clearInterval(interval); onNext(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [explanationLoading, cancelled, onNext]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col p-4">
      <div className="mb-3">
        <span className={clsx('text-xs font-bold px-2 py-1 rounded-full', wasCorrect ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400')}>
          {wasCorrect ? '✓ Correct' : '✗ Incorrect'}
        </span>
      </div>

      <p className="text-sm font-medium mb-4 leading-relaxed">{question.prompt}</p>

      <div className="space-y-2 mb-5">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selectedIndex;
          return (
            <div
              key={i}
              className={clsx(
                'flex items-start gap-3 rounded-xl px-4 py-3 border text-sm',
                isCorrect ? 'bg-green-900/40 border-green-700 text-green-300' :
                isSelected && !isCorrect ? 'bg-red-900/40 border-red-700 text-red-300' :
                'bg-gray-900 border-gray-800 text-gray-500'
              )}
            >
              <span className="text-xs font-bold w-4 shrink-0 mt-0.5">{OPTION_LABELS[i]}</span>
              <span>{opt}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 flex-1 min-h-[80px]">
        {explanationLoading ? (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Getting explanation…
          </div>
        ) : (
          <p className="text-sm text-gray-300 leading-relaxed">{explanation}</p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-sm font-semibold transition-colors"
        >
          {isLast ? 'See Results' : `Next Question →`}
          {!cancelled && !explanationLoading && !isLast && (
            <span className="ml-2 text-blue-300 text-xs">({autoAdvance}s)</span>
          )}
        </button>
        {!cancelled && !explanationLoading && (
          <button onClick={() => { setCancelled(true); setAutoAdvance(0); }} className="w-full text-xs text-gray-500 hover:text-gray-300 py-1 transition-colors">
            Cancel auto-advance
          </button>
        )}
      </div>
    </div>
  );
}
