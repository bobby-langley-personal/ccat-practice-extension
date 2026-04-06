# Claude Development Guide — CCAT Practice Extension

## Definition of Done
1. Code works and `npx tsc --noEmit` passes
2. CLAUDE.md updated
3. README.md updated
4. TYPES.md updated if types changed
5. GitHub issue comment posted
6. Issue closed

## Key Rules

### API Key Storage
The Anthropic API key is stored in `chrome.storage.local` under `ccat_anthropic_key`.
Never hardcode it. Never log it. Never send it anywhere except `api.anthropic.com`.

### Question Integrity
Never expose `correctIndex` or `explanation` in the UI before the user has selected an answer.
The answer review transition must be gated on the user's selection firing first.

### Model
Always use `claude-haiku-4-5-20251001` — this extension is latency-sensitive.
Never use Sonnet here; the added quality does not justify the added latency for single-question explanations.

### Temperature
- `0.2` — answer explanations (consistent reasoning)
- `0.7` — question generation (varied output)

### Storage Keys
All `chrome.storage.local` keys are prefixed `ccat_` to avoid collisions.
Never use `localStorage` — it is not accessible from the service worker.

### TypeScript
Strict mode is on. Run `npx tsc --noEmit` before every commit.
All types live in `src/types/index.ts`. Read it before touching any data shape.

## Branch Naming
`claude/issue-{number}-{YYYYMMDD}-{HHMM}`
