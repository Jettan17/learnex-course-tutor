import { google } from '@ai-sdk/google'

// Provider-agnostic setup via Vercel AI SDK.
// To upgrade to Claude: npm install @ai-sdk/anthropic, then swap these two lines:
//   import { anthropic } from '@ai-sdk/anthropic'
//   export const chatModel = anthropic('claude-haiku-4-5-20251001')
export const chatModel = google('gemini-2.0-flash')
export const hintModel = google('gemini-2.0-flash')
