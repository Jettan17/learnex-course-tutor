import { google, createGoogleGenerativeAI } from '@ai-sdk/google'

// Provider-agnostic setup via Vercel AI SDK.
// To upgrade to Claude: npm install @ai-sdk/anthropic, then swap these two lines:
//   import { anthropic } from '@ai-sdk/anthropic'
//   export const chatModel = anthropic('claude-haiku-4-5-20251001')
const googleAI = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})
export const chatModel = googleAI('gemini-2.5-flash')
export const hintModel = googleAI('gemini-2.5-flash')
