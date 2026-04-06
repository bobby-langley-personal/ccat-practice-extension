# Type Reference — CCAT Practice Extension

All types are defined in `src/types/index.ts`.

## Core Types

### CCATQuestion
The fundamental unit of content. All questions (bundled and generated) conform to this shape.
- `id`: unique string identifier
- `category`: `'verbal' | 'math_logic' | 'spatial'`
- `difficulty`: `'easy' | 'medium' | 'hard'`
- `options`: exactly 4 strings (A, B, C, D)
- `correctIndex`: 0-based index (0=A, 1=B, 2=C, 3=D)
- `imageDescription?`: optional prose/ASCII description for spatial questions

### SessionConfig / SessionResult / AnswerRecord
Describe a practice session from configuration through completion.

### LifetimeStats
Accumulated performance data stored in `chrome.storage.local` under `ccat_lifetime_stats`.

### BgMessage / BgResponse
Message passing contract between the side panel and the background service worker.
