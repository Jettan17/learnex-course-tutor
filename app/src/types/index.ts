// Core Types for NTU Learning Platform

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  courseId: string;
  name: string;
  order: number;
  prerequisites: string[];
  summary: string;
  keyPoints: string[];
  codeExamples?: CodeExample[];
  resources?: Resource[];
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'reference' | 'practice';
  source: string;
}

export type QuestionType =
  | 'mcq'
  | 'code_trace'
  | 'true_false'
  | 'fill_blank'
  | 'drag_drop'      // Reorder items in correct sequence
  | 'matching'       // Match items from two columns
  | 'code_execution' // Write and execute code
  ;

export interface Question {
  id: string;
  topicId: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: string;
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  codeSnippet?: string;
  // For drag_drop questions
  dragItems?: string[];
  correctOrder?: number[];
  // For matching questions
  matchingPairs?: { left: string; right: string }[];
  // For code_execution questions
  language?: 'c' | 'cpp' | 'java' | 'python';
  starterCode?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface UserProgress {
  topicId: string;
  masteryLevel: number;
  questionsAttempted: number;
  questionsCorrect: number;
  lastReviewedAt: string;
  nextReviewAt: string;
}

export interface ReviewCard {
  questionId: string;
  topicId: string;
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
  lastReview: string;
  nextReview: string;
}

export interface QuizSession {
  topicId: string;
  questions: Question[];
  currentIndex: number;
  answers: { questionId: string; selectedAnswer: number | string; correct: boolean }[];
  startedAt: string;
  completedAt?: string;
}

// FSRS Types
export interface FSRSParameters {
  requestRetention: number;
  maximumInterval: number;
  w: number[];
}

export type Rating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy
