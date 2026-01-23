// FSRS (Free Spaced Repetition Scheduler) Implementation
// Based on the open-source FSRS algorithm

import { FSRSParameters, Rating, ReviewCard } from '@/types';

// Default FSRS parameters (v4)
export const DEFAULT_PARAMS: FSRSParameters = {
  requestRetention: 0.9, // Target 90% retention
  maximumInterval: 36500, // 100 years in days
  w: [
    0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05,
    0.34, 1.26, 0.29, 2.61,
  ],
};

interface SchedulingInfo {
  card: ReviewCard;
  interval: number;
}

// Calculate initial difficulty based on first rating
function initDifficulty(rating: Rating): number {
  return Math.max(1, Math.min(10, 5 - (rating - 3)));
}

// Calculate initial stability based on first rating
function initStability(rating: Rating, w: number[]): number {
  return Math.max(0.1, w[rating - 1]);
}

// Calculate new stability after review
function nextStability(
  d: number,
  s: number,
  r: number,
  rating: Rating,
  w: number[]
): number {
  const hardPenalty = rating === 2 ? w[15] : 1;
  const easyBonus = rating === 4 ? w[16] : 1;

  return (
    s *
    (1 +
      Math.exp(w[8]) *
        (11 - d) *
        Math.pow(s, -w[9]) *
        (Math.exp((1 - r) * w[10]) - 1) *
        hardPenalty *
        easyBonus)
  );
}

// Calculate new difficulty after review
function nextDifficulty(d: number, rating: Rating, w: number[]): number {
  const delta = rating - 3;
  const newD = d - w[6] * delta;
  // Mean reversion towards initial difficulty
  return Math.max(1, Math.min(10, w[7] * 5 + (1 - w[7]) * newD));
}

// Calculate retrievability (probability of recall)
function retrievability(elapsedDays: number, stability: number): number {
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

// Calculate interval from stability and target retention
function nextInterval(stability: number, requestRetention: number): number {
  return Math.round(
    (9 * stability * (1 / requestRetention - 1))
  );
}

// Main scheduling function
export function scheduleCard(
  card: ReviewCard,
  rating: Rating,
  params: FSRSParameters = DEFAULT_PARAMS
): SchedulingInfo {
  const now = new Date().toISOString();
  const lastReview = card.lastReview ? new Date(card.lastReview) : new Date();
  const elapsedDays = Math.max(
    0,
    (Date.now() - lastReview.getTime()) / (1000 * 60 * 60 * 24)
  );

  let newCard: ReviewCard = { ...card };

  if (card.state === 'new') {
    // First review
    newCard.difficulty = initDifficulty(rating);
    newCard.stability = initStability(rating, params.w);
    newCard.reps = 1;
    newCard.lapses = rating === 1 ? 1 : 0;
    newCard.state = rating === 1 ? 'relearning' : 'learning';
  } else {
    // Subsequent reviews
    const r = retrievability(elapsedDays, card.stability);

    if (rating === 1) {
      // Again - forgot the card
      newCard.lapses = card.lapses + 1;
      newCard.stability = Math.max(0.1, card.stability * 0.2);
      newCard.difficulty = nextDifficulty(card.difficulty, rating, params.w);
      newCard.state = 'relearning';
    } else {
      newCard.stability = nextStability(
        card.difficulty,
        card.stability,
        r,
        rating,
        params.w
      );
      newCard.difficulty = nextDifficulty(card.difficulty, rating, params.w);
      newCard.reps = card.reps + 1;
      newCard.state = 'review';
    }
  }

  // Calculate next interval
  let interval: number;
  if (newCard.state === 'relearning') {
    interval = 1; // Review tomorrow if forgotten
  } else if (newCard.state === 'learning') {
    interval = rating === 2 ? 1 : rating === 3 ? 3 : 7; // Graduated intervals
  } else {
    interval = Math.min(
      nextInterval(newCard.stability, params.requestRetention),
      params.maximumInterval
    );
  }

  // Set next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  newCard.lastReview = now;
  newCard.nextReview = nextReviewDate.toISOString();

  return { card: newCard, interval };
}

// Create a new card for a question
export function createCard(questionId: string, topicId: string): ReviewCard {
  return {
    questionId,
    topicId,
    stability: 0,
    difficulty: 0,
    reps: 0,
    lapses: 0,
    state: 'new',
    lastReview: '',
    nextReview: new Date().toISOString(),
  };
}

// Check if a card is due for review
export function isDue(card: ReviewCard): boolean {
  if (card.state === 'new') return true;
  return new Date(card.nextReview) <= new Date();
}

// Get cards due for review
export function getDueCards(cards: ReviewCard[]): ReviewCard[] {
  return cards.filter(isDue).sort((a, b) => {
    // New cards first, then by due date
    if (a.state === 'new' && b.state !== 'new') return -1;
    if (a.state !== 'new' && b.state === 'new') return 1;
    return new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime();
  });
}

// Calculate mastery level for a topic based on cards
export function calculateMastery(cards: ReviewCard[]): number {
  if (cards.length === 0) return 0;

  const totalScore = cards.reduce((sum, card) => {
    if (card.state === 'new') return sum;

    // Score based on stability and lapses
    const stabilityScore = Math.min(card.stability / 30, 1); // Max out at 30 days stability
    const lapsesPenalty = Math.max(0, 1 - card.lapses * 0.1);
    return sum + stabilityScore * lapsesPenalty;
  }, 0);

  const reviewedCards = cards.filter((c) => c.state !== 'new').length;
  if (reviewedCards === 0) return 0;

  return Math.round((totalScore / cards.length) * 100);
}
