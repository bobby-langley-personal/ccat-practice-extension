import { clsx } from 'clsx';
import { CCATQuestion, QuestionCategory, CATEGORY_LABELS } from '../../types';
import { SessionState } from '../App';

interface Props {
  session: SessionState;
  timeLeft: number;
  onAnswer: (index: number) => void;
  onSkip: () => void;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const CATEGORY_BADGE: Record<QuestionCategory, string> = {
  verbal: 'bg-blue-900 text-blue-300',
  math_logic: 'bg-purple-900 text-purple-300',
  spatial: 'bg-orange-900 text-orange-300',
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SessionView({ session, timeLeft, onAnswer, onSkip }: Props) {
  const question: CCATQuestion = session.questions[session.currentIndex];
  const answered = session.currentIndex;
  const total = session.questions.length;
  const progress = Math.round((answered / total) * 100);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', CATEGORY_BADGE[question.category])}>
            {CATEGORY_LABELS[question.category]}
          </span>
          <span className="text-xs text-gray-400">{answered + 1} / {total}</span>
        </div>
        <span className={clsx('font-mono text-sm font-bold', timeLeft <= 60 ? 'text-red-400' : 'text-gray-300')}>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded-full mb-5 overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <div className="flex-1 space-y-4">
        <p className="text-base font-medium leading-relaxed">{question.prompt}</p>

        {question.imageDescription && (
          <pre className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
            {question.imageDescription}
          </pre>
        )}

        {/* Options */}
        <div className="space-y-2 mt-4">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 flex items-start gap-3 transition-colors"
            >
              <span className="text-xs font-bold text-gray-400 mt-0.5 w-4 shrink-0">{OPTION_LABELS[i]}</span>
              <span className="text-sm">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSkip}
        className="mt-4 w-full text-center text-xs text-gray-500 hover:text-gray-300 py-2 transition-colors"
      >
        Skip question
      </button>
    </div>
  );
}
