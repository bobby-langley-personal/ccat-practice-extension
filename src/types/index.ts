// ─── Question Categories ───────────────────────────────────────────────────
export type QuestionCategory = 'verbal' | 'math_logic' | 'spatial';

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  verbal: 'Verbal',
  math_logic: 'Math & Logic',
  spatial: 'Spatial Reasoning',
};

// ─── Difficulty ────────────────────────────────────────────────────────────
export type Difficulty = 'easy' | 'medium' | 'hard';

// ─── Question ─────────────────────────────────────────────────────────────
export interface CCATQuestion {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  imageDescription?: string;
}

// ─── Session ──────────────────────────────────────────────────────────────
export type SessionMode = 'full' | 'category' | 'quick10';

export interface SessionConfig {
  mode: SessionMode;
  category?: QuestionCategory;
  questionCount: number;
  timeLimitSeconds: number;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  timeSpentSeconds: number;
}

export interface SessionResult {
  id: string;
  config: SessionConfig;
  completedAt: string;
  answers: AnswerRecord[];
  totalCorrect: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  categoryBreakdown: Record<QuestionCategory, { correct: number; total: number }>;
}

// ─── Stats ────────────────────────────────────────────────────────────────
export interface LifetimeStats {
  totalSessionsCompleted: number;
  allTimeCorrect: number;
  allTimeTotal: number;
  categoryStats: Record<QuestionCategory, { correct: number; total: number }>;
  recentSessions: SessionResult[];
}

// ─── Background messages ──────────────────────────────────────────────────
export type BgMessageType =
  | 'EXPLAIN_ANSWER'
  | 'GENERATE_QUESTIONS'
  | 'GET_STATS'
  | 'SAVE_SESSION';

export interface ExplainAnswerRequest {
  type: 'EXPLAIN_ANSWER';
  question: CCATQuestion;
  selectedIndex: number;
}

export interface GenerateQuestionsRequest {
  type: 'GENERATE_QUESTIONS';
  category: QuestionCategory;
  count: number;
  difficulty: Difficulty;
}

export interface SaveSessionRequest {
  type: 'SAVE_SESSION';
  result: SessionResult;
}

export type BgMessage =
  | ExplainAnswerRequest
  | GenerateQuestionsRequest
  | SaveSessionRequest
  | { type: 'GET_STATS' };

export interface BgResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
