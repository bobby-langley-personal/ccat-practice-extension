import { useCallback, useEffect, useRef, useState } from 'react';
import { CCATQuestion, LifetimeStats, SessionConfig, SessionResult, AnswerRecord, BgMessage, BgResponse } from '../types';
import { SEED_QUESTIONS } from '../data/questions';
import SetupView from './views/SetupView';
import HomeView from './views/HomeView';
import SessionView from './views/SessionView';
import AnswerReviewView from './views/AnswerReviewView';
import SessionCompleteView from './views/SessionCompleteView';
import StatsView from './views/StatsView';

export type AppView = 'setup' | 'home' | 'session' | 'answer_review' | 'session_complete' | 'stats';

export interface SessionState {
  config: SessionConfig;
  questions: CCATQuestion[];
  currentIndex: number;
  answers: AnswerRecord[];
  startedAt: number;
  questionStartedAt: number;
}

function sendBgMessage<T>(message: BgMessage): Promise<BgResponse<T>> {
  return chrome.runtime.sendMessage(message);
}

export default function App() {
  const [view, setView] = useState<AppView>('setup');
  const [stats, setStats] = useState<LifetimeStats | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const timerRef = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Check for API key on mount
  useEffect(() => {
    chrome.storage.local.get('ccat_anthropic_key').then((result: Record<string, unknown>) => {
      if (result['ccat_anthropic_key']) {
        setView('home');
        loadStats();
      }
    });
  }, []);

  const loadStats = useCallback(async () => {
    const resp = await sendBgMessage<LifetimeStats>({ type: 'GET_STATS' });
    if (resp.success && resp.data) setStats(resp.data);
  }, []);

  const startSession = useCallback((config: SessionConfig) => {
    let pool = [...SEED_QUESTIONS];
    if (config.category) {
      pool = pool.filter(q => q.category === config.category);
    }
    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const questions = pool.slice(0, config.questionCount);

    const now = Date.now();
    setSession({
      config,
      questions,
      currentIndex: 0,
      answers: [],
      startedAt: now,
      questionStartedAt: now,
    });
    setTimeLeft(config.timeLimitSeconds);
    setView('session');

    // Start countdown
    clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Auto-complete session on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleAnswer = useCallback(async (selectedIndex: number) => {
    if (!session) return;
    clearInterval(timerRef.current);

    const question = session.questions[session.currentIndex];
    const timeSpent = Math.round((Date.now() - session.questionStartedAt) / 1000);
    const correct = selectedIndex === question.correctIndex;

    const record: AnswerRecord = {
      questionId: question.id,
      selectedIndex,
      correct,
      timeSpentSeconds: timeSpent,
    };

    const updatedAnswers = [...session.answers, record];
    setSession(prev => prev ? { ...prev, answers: updatedAnswers } : null);

    // Get explanation
    setExplanation('');
    setExplanationLoading(true);
    setView('answer_review');

    const resp = await sendBgMessage<string>({
      type: 'EXPLAIN_ANSWER',
      question,
      selectedIndex,
    });
    setExplanationLoading(false);
    setExplanation(resp.success && resp.data ? resp.data : (question.explanation));

    // Restart timer
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [session]);

  const handleNextQuestion = useCallback(() => {
    if (!session) return;
    const nextIndex = session.currentIndex + 1;

    if (nextIndex >= session.questions.length || timeLeft <= 0) {
      finishSession(session);
      return;
    }

    setSession(prev => prev ? {
      ...prev,
      currentIndex: nextIndex,
      questionStartedAt: Date.now(),
    } : null);
    setView('session');
  }, [session, timeLeft]);

  const finishSession = useCallback(async (sess: SessionState) => {
    clearInterval(timerRef.current);
    const timeTaken = Math.round((Date.now() - sess.startedAt) / 1000);

    const breakdown: SessionResult['categoryBreakdown'] = {
      verbal: { correct: 0, total: 0 },
      math_logic: { correct: 0, total: 0 },
      spatial: { correct: 0, total: 0 },
    };

    for (const ans of sess.answers) {
      const q = sess.questions.find(q => q.id === ans.questionId);
      if (q) {
        breakdown[q.category].total += 1;
        if (ans.correct) breakdown[q.category].correct += 1;
      }
    }

    const totalCorrect = sess.answers.filter(a => a.correct).length;
    const result: SessionResult = {
      id: `session_${Date.now()}`,
      config: sess.config,
      completedAt: new Date().toISOString(),
      answers: sess.answers,
      totalCorrect,
      totalQuestions: sess.answers.length,
      timeTakenSeconds: timeTaken,
      categoryBreakdown: breakdown,
    };

    await sendBgMessage({ type: 'SAVE_SESSION', result });
    setSessionResult(result);
    await loadStats();
    setView('session_complete');
  }, [loadStats]);

  const handleSkip = useCallback(() => {
    handleAnswer(-1);
  }, [handleAnswer]);

  switch (view) {
    case 'setup':
      return <SetupView onComplete={() => { setView('home'); loadStats(); }} />;
    case 'home':
      return <HomeView stats={stats} onStartSession={startSession} onViewStats={() => setView('stats')} />;
    case 'session':
      if (!session) return null;
      return (
        <SessionView
          session={session}
          timeLeft={timeLeft}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
        />
      );
    case 'answer_review':
      if (!session) return null;
      return (
        <AnswerReviewView
          question={session.questions[session.currentIndex]}
          selectedIndex={session.answers[session.answers.length - 1]?.selectedIndex ?? -1}
          explanation={explanation}
          explanationLoading={explanationLoading}
          isLast={session.currentIndex >= session.questions.length - 1 || timeLeft <= 0}
          onNext={handleNextQuestion}
        />
      );
    case 'session_complete':
      return (
        <SessionCompleteView
          result={sessionResult!}
          onNewSession={() => setView('home')}
          onViewStats={() => setView('stats')}
        />
      );
    case 'stats':
      return <StatsView stats={stats} onBack={() => setView('home')} onStatsCleared={loadStats} />;
  }
}
