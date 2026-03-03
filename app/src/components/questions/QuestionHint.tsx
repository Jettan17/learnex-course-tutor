'use client'

import { useState } from 'react'
import { Question } from '@/types'

interface Props {
  question: Question
  topicSummary: string
  onHintUsed: () => void
}

export default function QuestionHint({ question, topicSummary, onHintUsed }: Props) {
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0)
  const [hints, setHints] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchHint = async (level: 1 | 2) => {
    setLoading(true)
    try {
      const res = await fetch('/api/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, topicSummary, hintLevel: level }),
      })
      const data = await res.json()
      setHints((prev) => {
        const next = [...prev]
        next[level - 1] = data.hint
        return next
      })
      setHintLevel(level)
      if (level === 1) onHintUsed()
    } catch (err) {
      const msg = err instanceof Error && (err.message.includes('429') || err.message.toLowerCase().includes('rate'))
        ? 'Rate limit reached — wait a moment and try again.'
        : 'Could not load hint. Check your connection and try again.'
      setHints((prev) => {
        const next = [...prev]
        next[level - 1] = msg
        return next
      })
      setHintLevel(level)
    } finally {
      setLoading(false)
    }
  }

  if (hintLevel === 0) {
    return (
      <button
        onClick={() => fetchHint(1)}
        disabled={loading}
        className="mt-3 text-xs text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1.5 disabled:opacity-50"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {loading ? 'Getting hint...' : 'Need a hint?'}
      </button>
    )
  }

  return (
    <div className="mt-3 space-y-2">
      {hints[0] && (
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1 uppercase tracking-wider">
            Hint {hintLevel >= 2 ? '1' : ''}
          </p>
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">{hints[0]}</p>
        </div>
      )}

      {hints[1] && (
        <div className="p-3 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
          <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-1 uppercase tracking-wider">Hint 2</p>
          <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed">{hints[1]}</p>
        </div>
      )}

      {hintLevel === 1 && !hints[1] && (
        <button
          onClick={() => fetchHint(2)}
          disabled={loading}
          className="text-xs text-neutral-500 hover:text-foreground transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          {loading ? 'Getting hint...' : 'One more hint?'}
        </button>
      )}
    </div>
  )
}
