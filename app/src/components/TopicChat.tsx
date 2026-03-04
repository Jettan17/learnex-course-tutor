'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, useRef, useEffect, useMemo } from 'react'
import { Topic } from '@/types'

interface Props {
  topic: Topic
}

function MessageContent({ text }: { text: string }) {
  // Render fenced code blocks, then inline code, then plain text
  const fencePattern = /```[\w]*\n([\s\S]*?)```/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = fencePattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<InlineText key={lastIndex} text={text.slice(lastIndex, match.index)} />)
    }
    parts.push(
      <pre key={match.index} className="mt-2 mb-2 text-xs overflow-x-auto bg-neutral-900 text-neutral-100 p-3 rounded-lg">
        <code>{match[1].trimEnd()}</code>
      </pre>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(<InlineText key={lastIndex} text={text.slice(lastIndex)} />)
  }
  return <>{parts}</>
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`\n]+`)/g)
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code key={i} className="px-1 py-0.5 rounded text-xs font-mono bg-neutral-100 dark:bg-neutral-800">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  )
}

export default function TopicChat({ topic }: Props) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const topicContext = useMemo(() => ({
    name: topic.name,
    summary: topic.summary,
    keyPoints: topic.keyPoints,
    codeExamples: topic.codeExamples,
  }), [topic])

  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/topic-chat' }),
  })

  const isStreaming = status === 'streaming' || status === 'submitted'

  const errorMessage = error
    ? error.message?.toLowerCase().includes('429') || error.message?.toLowerCase().includes('rate')
      ? 'Rate limit reached — wait a minute and try again.'
      : 'Something went wrong. Please try again.'
    : null

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const starterQuestions = [
    `Explain ${topic.name} in simple terms`,
    `What are the most important concepts in ${topic.name}?`,
    `Give me a typical exam question about ${topic.name}`,
    `What's a common mistake students make with ${topic.name}?`,
  ]

  const handleSend = (text: string) => {
    if (!text.trim() || isStreaming) return
    sendMessage({ text }, { body: { topicContext } })
    setInput('')
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium leading-none mb-0.5">Ask About</p>
            <p className="text-sm font-semibold leading-none">{topic.name}</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="text-xs text-neutral-500 hover:text-foreground transition-colors uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {/* Messages / Starters */}
      <div className="h-80 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Suggested questions</p>
            {starterQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="w-full text-left text-sm glass-card rounded-xl px-4 py-2.5 hover:border-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map((m) => {
              const textContent = m.parts
                .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                .map(p => p.text)
                .join('')

              return (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.role === 'user'
                        ? 'bg-foreground text-background rounded-br-sm'
                        : 'glass-card rounded-bl-sm'
                    }`}
                  >
                    <MessageContent text={textContent} />
                  </div>
                </div>
              )
            })}
            {isStreaming && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  {errorMessage}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
        className="px-5 py-4 border-t border-neutral-200 dark:border-neutral-800 flex gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this topic..."
          disabled={isStreaming}
          className="flex-1 text-sm bg-transparent border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 outline-none focus:border-foreground transition-colors placeholder:text-neutral-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="btn-primary px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  )
}
