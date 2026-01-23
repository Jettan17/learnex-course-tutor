// Local Storage utilities for progress tracking

import { UserProgress, ReviewCard, QuizSession } from '@/types';

const STORAGE_KEYS = {
  PROGRESS: 'ntu_learning_progress',
  CARDS: 'ntu_learning_cards',
  SESSIONS: 'ntu_learning_sessions',
};

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Progress Management
export function getProgress(): Record<string, UserProgress> {
  if (!isBrowser) return {};
  const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return data ? JSON.parse(data) : {};
}

export function saveProgress(progress: Record<string, UserProgress>): void {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function getTopicProgress(topicId: string): UserProgress | null {
  const progress = getProgress();
  return progress[topicId] || null;
}

export function updateTopicProgress(
  topicId: string,
  update: Partial<UserProgress>
): UserProgress {
  const progress = getProgress();
  const existing = progress[topicId] || {
    topicId,
    masteryLevel: 0,
    questionsAttempted: 0,
    questionsCorrect: 0,
    lastReviewedAt: '',
    nextReviewAt: '',
  };

  const updated = { ...existing, ...update };
  progress[topicId] = updated;
  saveProgress(progress);
  return updated;
}

// Review Cards Management
export function getCards(): ReviewCard[] {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.CARDS);
  return data ? JSON.parse(data) : [];
}

export function saveCards(cards: ReviewCard[]): void {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
}

export function getCard(questionId: string): ReviewCard | null {
  const cards = getCards();
  return cards.find((c) => c.questionId === questionId) || null;
}

export function updateCard(card: ReviewCard): void {
  const cards = getCards();
  const index = cards.findIndex((c) => c.questionId === card.questionId);
  if (index >= 0) {
    cards[index] = card;
  } else {
    cards.push(card);
  }
  saveCards(cards);
}

export function getCardsForTopic(topicId: string): ReviewCard[] {
  return getCards().filter((c) => c.topicId === topicId);
}

// Quiz Session Management
export function getCurrentSession(): QuizSession | null {
  if (!isBrowser) return null;
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return data ? JSON.parse(data) : null;
}

export function saveSession(session: QuizSession | null): void {
  if (!isBrowser) return;
  if (session) {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  }
}

// Statistics
export function getOverallStats(): {
  totalQuestions: number;
  totalCorrect: number;
  topicsStudied: number;
  averageMastery: number;
} {
  const progress = getProgress();
  const topics = Object.values(progress);

  if (topics.length === 0) {
    return {
      totalQuestions: 0,
      totalCorrect: 0,
      topicsStudied: 0,
      averageMastery: 0,
    };
  }

  const totalQuestions = topics.reduce((sum, t) => sum + t.questionsAttempted, 0);
  const totalCorrect = topics.reduce((sum, t) => sum + t.questionsCorrect, 0);
  const averageMastery =
    topics.reduce((sum, t) => sum + t.masteryLevel, 0) / topics.length;

  return {
    totalQuestions,
    totalCorrect,
    topicsStudied: topics.length,
    averageMastery: Math.round(averageMastery),
  };
}

// Clear all data
export function clearAllData(): void {
  if (!isBrowser) return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.CARDS);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
}
