import { BgMessage, BgResponse, CCATQuestion, LifetimeStats, SessionResult } from '../types';

const LABELS = ['A', 'B', 'C', 'D'];

const DEFAULT_STATS: LifetimeStats = {
  totalSessionsCompleted: 0,
  allTimeCorrect: 0,
  allTimeTotal: 0,
  categoryStats: {
    verbal: { correct: 0, total: 0 },
    math_logic: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
  },
  recentSessions: [],
};

async function getApiKey(): Promise<string> {
  const result = await chrome.storage.local.get('ccat_anthropic_key');
  const key = result['ccat_anthropic_key'] as string | undefined;
  if (!key) throw new Error('No API key configured');
  return key;
}

async function callHaiku(apiKey: string, prompt: string, maxTokens: number, temperature: number): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Haiku API error: ${err}`);
  }

  const data = await response.json() as { content: Array<{ type: string; text: string }> };
  return data.content[0]?.text ?? '';
}

async function handleExplainAnswer(request: Extract<BgMessage, { type: 'EXPLAIN_ANSWER' }>): Promise<BgResponse<string>> {
  try {
    const apiKey = await getApiKey();
    const { question, selectedIndex } = request;
    const opts = question.options;
    const prompt = `You are a tutor helping someone practice for a cognitive aptitude test.

Question: ${question.prompt}
Options:
A) ${opts[0]}
B) ${opts[1]}
C) ${opts[2]}
D) ${opts[3]}

Correct answer: ${LABELS[question.correctIndex]}) ${opts[question.correctIndex]}
User selected: ${LABELS[selectedIndex]}) ${opts[selectedIndex]}

In 2-3 sentences, explain why the correct answer is right and (if the user was wrong) why their choice was incorrect. Be direct and educational. Do not use markdown.`;

    const text = await callHaiku(apiKey, prompt, 1024, 0.2);
    return { success: true, data: text };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

async function handleGenerateQuestions(request: Extract<BgMessage, { type: 'GENERATE_QUESTIONS' }>): Promise<BgResponse<CCATQuestion[]>> {
  try {
    const apiKey = await getApiKey();
    const { category, count, difficulty } = request;
    const ts = Date.now();
    const prompt = `Generate ${count} CCAT-style ${category} aptitude questions at ${difficulty} difficulty.

Return ONLY a JSON array with no markdown fences, no preamble. Each object must match this exact shape:
{
  "id": "gen_${category}_${ts}_INDEX",
  "category": "${category}",
  "difficulty": "${difficulty}",
  "prompt": "...",
  "options": ["A text", "B text", "C text", "D text"],
  "correctIndex": 0,
  "explanation": "2-3 sentence explanation of why this answer is correct."
}

Rules:
- options array has exactly 4 strings
- correctIndex is 0, 1, 2, or 3
- Questions must be original and match real CCAT difficulty
- No trick questions based on ambiguity`;

    const text = await callHaiku(apiKey, prompt, 4096, 0.7);
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned) as CCATQuestion[];

    if (!Array.isArray(parsed)) throw new Error('Response is not an array');
    parsed.forEach((q, i) => {
      if (!q.id || !q.category || !q.difficulty || !q.prompt ||
          !Array.isArray(q.options) || q.options.length !== 4 ||
          typeof q.correctIndex !== 'number' || !q.explanation) {
        throw new Error(`Question ${i} has invalid shape`);
      }
    });

    // Cache generated questions
    const existing = await chrome.storage.local.get('ccat_generated_questions');
    const prev = (existing['ccat_generated_questions'] as CCATQuestion[] | undefined) ?? [];
    await chrome.storage.local.set({ ccat_generated_questions: [...prev, ...parsed] });

    return { success: true, data: parsed };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

async function handleSaveSession(request: Extract<BgMessage, { type: 'SAVE_SESSION' }>): Promise<BgResponse<void>> {
  try {
    const existing = await chrome.storage.local.get('ccat_lifetime_stats');
    const stats: LifetimeStats = (existing['ccat_lifetime_stats'] as LifetimeStats | undefined) ?? DEFAULT_STATS;
    const result: SessionResult = request.result;

    stats.totalSessionsCompleted += 1;
    stats.allTimeCorrect += result.totalCorrect;
    stats.allTimeTotal += result.totalQuestions;

    for (const cat of ['verbal', 'math_logic', 'spatial'] as const) {
      const bd = result.categoryBreakdown[cat];
      stats.categoryStats[cat].correct += bd.correct;
      stats.categoryStats[cat].total += bd.total;
    }

    stats.recentSessions = [result, ...stats.recentSessions].slice(0, 10);
    await chrome.storage.local.set({ ccat_lifetime_stats: stats });
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

async function handleGetStats(): Promise<BgResponse<LifetimeStats>> {
  try {
    const existing = await chrome.storage.local.get('ccat_lifetime_stats');
    const stats = (existing['ccat_lifetime_stats'] as LifetimeStats | undefined) ?? DEFAULT_STATS;
    return { success: true, data: stats };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  if (tab.windowId) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message: BgMessage, _sender: chrome.runtime.MessageSender, sendResponse: (response: unknown) => void) => {
  const handle = async () => {
    switch (message.type) {
      case 'EXPLAIN_ANSWER':
        return handleExplainAnswer(message);
      case 'GENERATE_QUESTIONS':
        return handleGenerateQuestions(message);
      case 'SAVE_SESSION':
        return handleSaveSession(message);
      case 'GET_STATS':
        return handleGetStats();
      default:
        return { success: false, error: 'Unknown message type' };
    }
  };
  handle().then(sendResponse);
  return true; // keep channel open for async response
});
