# CCAT Practice Extension

A Chrome Extension (Manifest V3) for practicing CCAT-style cognitive aptitude test questions, with AI-powered explanations from Claude Haiku after each answer.

## Features

- **3 question categories**: Verbal, Math & Logic, Spatial Reasoning
- **3 session modes**: Full Test (50q/15min), Category Sprint (20q/6min), Quick 10 (10q/3min)
- **Instant explanations**: Claude Haiku explains correct reasoning after every answer
- **Session stats**: Track performance by category across sessions
- **Hybrid question source**: 30+ bundled seed questions + Haiku-generated questions cached locally

## Local Development

```bash
npm install
npm run dev        # build in watch mode
```

Then load `dist/` as an unpacked extension in Chrome (`chrome://extensions` → Developer mode → Load unpacked).

## Setup

On first launch, enter your Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com)). The key is stored locally in `chrome.storage.local` and never leaves your browser except in requests to `api.anthropic.com`.

## Tech Stack

- Vite 5 + vite-plugin-web-extension
- React 18 + TypeScript
- Tailwind CSS
- lucide-react
- Claude Haiku (claude-haiku-4-5-20251001)
