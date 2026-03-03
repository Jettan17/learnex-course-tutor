export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface HintResponse {
  hint: string
  level: 1 | 2
}
