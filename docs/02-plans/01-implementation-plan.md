# NTU Semester 2 Summary - Implementation Plan

## Executive Summary

This document outlines the implementation strategy for the NTU Semester 2 Learning Platform, covering technical architecture, development phases, and deployment approach.

---

## 1. Technical Architecture

### 1.1 Recommended Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14+ (React) | SSR for SEO, App Router, excellent DX |
| **Styling** | Tailwind CSS | Rapid prototyping, consistent design |
| **State** | Zustand or React Context | Lightweight, sufficient for MVP |
| **Backend** | Next.js API Routes | Co-located with frontend, serverless-ready |
| **Database** | SQLite (dev) / PostgreSQL (prod) | Simple start, scale when needed |
| **ORM** | Prisma | Type-safe queries, easy migrations |
| **Auth** | NextAuth.js (optional) | If accounts needed in Phase 2 |
| **Spaced Repetition** | Custom FSRS implementation | Open-source algorithm |
| **Hosting** | Vercel | Zero-config Next.js deployment |

### 1.2 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Summary   │  │    Quiz     │  │   Progress  │             │
│  │   Viewer    │  │   Engine    │  │  Dashboard  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Adaptive Learning Controller                    ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────────┐         ││
│  │  │ FSRS    │  │ Skip    │  │ Knowledge Gap       │         ││
│  │  │ Engine  │  │ Logic   │  │ Analyzer            │         ││
│  │  └─────────┘  └─────────┘  └─────────────────────┘         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Layer (Next.js Routes)                   │
├─────────────────────────────────────────────────────────────────┤
│  /api/courses     /api/quizzes    /api/progress    /api/review  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Data Layer (Prisma + DB)                     │
├─────────────────────────────────────────────────────────────────┤
│  Courses  │  Topics  │  Questions  │  UserProgress  │  Reviews  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Content Layer (Markdown/MDX)                 │
├─────────────────────────────────────────────────────────────────┤
│  /content/sc1007/summaries/    /content/sc1007/quizzes/         │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Data Models

```typescript
// Core Entities

interface Course {
  id: string;
  code: string;          // e.g., "SC1007"
  name: string;
  description: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  courseId: string;
  name: string;
  order: number;
  prerequisites: string[];  // Topic IDs
  summaryPath: string;      // Path to MDX file
  questions: Question[];
}

interface Question {
  id: string;
  topicId: string;
  type: 'mcq' | 'code_trace' | 'code_write' | 'conceptual';
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: string;
  options?: string[];       // For MCQ
  correctAnswer: string;
  explanation: string;
  codeSnippet?: string;
}

interface UserProgress {
  id: string;
  topicId: string;
  masteryLevel: number;     // 0-100
  questionsAttempted: number;
  questionsCorrect: number;
  lastReviewedAt: Date;
  nextReviewAt: Date;       // FSRS scheduled
}

interface ReviewCard {
  id: string;
  questionId: string;
  userId: string;
  stability: number;        // FSRS parameter
  difficulty: number;       // FSRS parameter
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
}
```

---

## 2. Development Phases

### 2.1 Phase 1: MVP (Core Learning Experience)

**Goal:** Functional learning platform for SC1007 with basic adaptive features

**Duration:** 2-3 development sprints

#### Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| Course/Topic navigation | P0 | Low |
| Summary viewer (MDX) | P0 | Medium |
| Basic quiz engine | P0 | Medium |
| Answer feedback | P0 | Low |
| Progress tracking (local storage) | P0 | Low |
| FSRS-based review scheduling | P1 | High |
| Mastery-based skip logic | P1 | Medium |
| Progress dashboard | P1 | Medium |

#### Deliverables

1. **Content**
   - SC1007 summaries for all 9 topics
   - 50+ quiz questions across topics
   - 10+ code challenges

2. **Application**
   - Responsive web app
   - Topic-based navigation
   - Quiz system with immediate feedback
   - Local progress persistence

3. **Infrastructure**
   - Deployed to Vercel
   - Basic analytics (Vercel Analytics)

### 2.2 Phase 2: Enhanced Personalization

**Goal:** Advanced adaptive features and multi-course support

#### Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| Diagnostic assessment | P0 | Medium |
| Knowledge gap visualization | P0 | Medium |
| Study session recommendations | P1 | Medium |
| Time-based study tracking | P1 | Low |
| Additional courses (SC1006, SC1008, SC2002) | P0 | High (content) |
| Cross-course prerequisite mapping | P2 | Medium |

### 2.3 Phase 3: Community & Gamification

**Goal:** Enable user-generated content and social features

#### Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| User accounts | P0 | Medium |
| User-submitted questions | P1 | Medium |
| Leaderboards | P2 | Low |
| Study streaks & badges | P2 | Low |
| Discussion threads | P2 | Medium |
| Peer explanations | P3 | Medium |

---

## 3. Content Pipeline

### 3.1 Summary Generation Process

```
Source Material (PDF/Notes)
         │
         ▼
    ┌─────────────┐
    │  Extract    │
    │  Key Points │
    └─────────────┘
         │
         ▼
    ┌─────────────┐
    │  Structure  │
    │  by Topic   │
    └─────────────┘
         │
         ▼
    ┌─────────────┐
    │  Write MDX  │
    │  Summaries  │
    └─────────────┘
         │
         ▼
    ┌─────────────┐
    │  Add Code   │
    │  Examples   │
    └─────────────┘
         │
         ▼
    ┌─────────────┐
    │  Review &   │
    │  Validate   │
    └─────────────┘
```

### 3.2 Quiz Generation Process

```
Topic Summary
     │
     ▼
┌─────────────────┐
│ Identify Key    │
│ Learning Points │
└─────────────────┘
     │
     ▼
┌─────────────────┐
│ Create Question │
│ Types:          │
│ - MCQ           │
│ - Code Trace    │
│ - Conceptual    │
└─────────────────┘
     │
     ▼
┌─────────────────┐
│ Assign          │
│ Difficulty      │
│ (1-5 scale)     │
└─────────────────┘
     │
     ▼
┌─────────────────┐
│ Write           │
│ Explanations    │
└─────────────────┘
     │
     ▼
┌─────────────────┐
│ Validate &      │
│ Test            │
└─────────────────┘
```

### 3.3 Content Format Specifications

#### Summary Format (MDX)

```mdx
---
topic: "linked-lists"
course: "SC1007"
order: 3
prerequisites: ["oop-foundations"]
estimatedReadTime: 10
---

# Linked Lists

## Learning Objectives
- Understand node-based data structures
- Implement singly and doubly linked lists
- Analyze time complexity of operations

## Key Concepts

### What is a Linked List?
A linked list is a linear data structure where elements are stored in nodes...

<CodeExample language="python">
{`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`}
</CodeExample>

## Summary Table
| Operation | Singly Linked | Doubly Linked |
|-----------|---------------|---------------|
| Insert Front | O(1) | O(1) |
| Insert End | O(n) | O(1)* |
| Delete | O(n) | O(1)* |

<Callout type="tip">
Remember: Linked lists excel at insertions/deletions but have O(n) access time.
</Callout>
```

#### Quiz Format (JSON)

```json
{
  "id": "sc1007-ll-001",
  "topicId": "linked-lists",
  "type": "mcq",
  "difficulty": 2,
  "content": "What is the time complexity of inserting a node at the front of a singly linked list?",
  "options": [
    "O(1)",
    "O(n)",
    "O(log n)",
    "O(n²)"
  ],
  "correctAnswer": 0,
  "explanation": "Inserting at the front of a singly linked list is O(1) because we only need to update the head pointer and the new node's next pointer, regardless of list size."
}
```

---

## 4. FSRS Implementation

### 4.1 Algorithm Overview

FSRS (Free Spaced Repetition Scheduler) is an open-source algorithm that outperforms SM-2 (Anki's default) by:
- Better predicting memory retention
- Personalizing to individual memory patterns
- Using machine learning-derived parameters

### 4.2 Core Parameters

```typescript
interface FSRSParameters {
  w: number[];  // Weight parameters (17 values)
  requestRetention: number;  // Target retention rate (0.9 = 90%)
  maximumInterval: number;   // Max days between reviews
}

// Default FSRS parameters
const DEFAULT_PARAMS: FSRSParameters = {
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
  requestRetention: 0.9,
  maximumInterval: 36500
};
```

### 4.3 Scheduling Logic

```typescript
function scheduleReview(card: ReviewCard, rating: Rating): ReviewCard {
  // Rating: 1=Again, 2=Hard, 3=Good, 4=Easy

  const newCard = { ...card };

  // Calculate new stability based on rating
  newCard.stability = calculateNewStability(card, rating);

  // Calculate interval from stability
  const interval = calculateInterval(newCard.stability, requestRetention);

  newCard.scheduledDays = interval;
  newCard.nextReviewAt = addDays(new Date(), interval);

  return newCard;
}
```

### 4.4 Skip Logic Integration

```typescript
function canSkipTopic(topicProgress: UserProgress): boolean {
  const SKIP_THRESHOLD = 80;  // 80% mastery
  const MIN_QUESTIONS = 5;     // Minimum questions attempted

  return (
    topicProgress.masteryLevel >= SKIP_THRESHOLD &&
    topicProgress.questionsAttempted >= MIN_QUESTIONS
  );
}

function calculateMasteryLevel(progress: UserProgress): number {
  const accuracyWeight = 0.6;
  const recencyWeight = 0.2;
  const consistencyWeight = 0.2;

  const accuracy = progress.questionsCorrect / progress.questionsAttempted;
  const recency = calculateRecencyScore(progress.lastReviewedAt);
  const consistency = calculateConsistencyScore(progress.reviewHistory);

  return (
    accuracy * accuracyWeight +
    recency * recencyWeight +
    consistency * consistencyWeight
  ) * 100;
}
```

---

## 5. Project Structure

```
ntu-sem-2-summary/
├── docs/
│   ├── 01-analysis/
│   │   ├── 01-value-proposition-analysis.md
│   │   └── 02-course-content-analysis.md
│   └── 02-plans/
│       └── 01-implementation-plan.md
│
├── content/
│   ├── sc1007/
│   │   ├── summaries/
│   │   │   ├── 01-memory-management.mdx
│   │   │   ├── 02-oop-foundations.mdx
│   │   │   ├── 03-linked-lists.mdx
│   │   │   └── ...
│   │   └── quizzes/
│   │       ├── memory-management.json
│   │       ├── linked-lists.json
│   │       └── ...
│   └── (sc1006, sc1008, sc2002 - future)
│
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home/Dashboard
│   │   ├── courses/
│   │   │   ├── page.tsx             # Course list
│   │   │   └── [courseId]/
│   │   │       ├── page.tsx         # Course overview
│   │   │       └── [topicId]/
│   │   │           ├── page.tsx     # Summary view
│   │   │           └── quiz/
│   │   │               └── page.tsx # Quiz view
│   │   ├── review/
│   │   │   └── page.tsx             # Spaced repetition review
│   │   └── api/
│   │       ├── progress/
│   │       ├── quiz/
│   │       └── review/
│   │
│   ├── components/
│   │   ├── ui/                      # Base UI components
│   │   ├── quiz/
│   │   │   ├── QuizCard.tsx
│   │   │   ├── MCQOption.tsx
│   │   │   └── CodeEditor.tsx
│   │   ├── summary/
│   │   │   ├── MDXRenderer.tsx
│   │   │   └── CodeExample.tsx
│   │   └── progress/
│   │       ├── MasteryBar.tsx
│   │       └── TopicProgress.tsx
│   │
│   ├── lib/
│   │   ├── fsrs/
│   │   │   ├── algorithm.ts
│   │   │   └── scheduler.ts
│   │   ├── content/
│   │   │   ├── loader.ts
│   │   │   └── parser.ts
│   │   └── progress/
│   │       ├── storage.ts
│   │       └── mastery.ts
│   │
│   └── types/
│       └── index.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── images/
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 6. Development Milestones

### Milestone 1: Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up Prisma with SQLite
- [ ] Create base component library
- [ ] Implement content loading system

### Milestone 2: Content Creation (SC1007)
- [ ] Write summaries for all 9 topics
- [ ] Create 50+ quiz questions
- [ ] Design 10+ code challenges
- [ ] Implement MDX rendering

### Milestone 3: Core Features
- [ ] Build topic navigation
- [ ] Implement quiz engine
- [ ] Add answer feedback system
- [ ] Create progress tracking (localStorage)

### Milestone 4: Adaptive Learning
- [ ] Implement FSRS algorithm
- [ ] Build review scheduling system
- [ ] Create mastery calculation
- [ ] Add skip logic

### Milestone 5: Polish & Deploy
- [ ] Responsive design testing
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] User testing & feedback

---

## 7. Success Criteria

### MVP Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Content coverage | 100% SC1007 topics | Manual verification |
| Quiz completion rate | > 70% | Analytics |
| Return user rate (7-day) | > 40% | Analytics |
| Avg session duration | > 5 minutes | Analytics |
| User satisfaction | > 4/5 stars | Survey |

### Technical Quality

| Aspect | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Core Web Vitals | All "Good" |
| Test coverage | > 60% |

---

## 8. Risk Mitigation

| Risk | Mitigation Strategy |
|------|---------------------|
| Content accuracy | Expert review before launch |
| Low initial traffic | Seed in NTU student communities |
| Feature creep | Strict MVP scope, defer to Phase 2 |
| Technical debt | Regular refactoring sprints |
| Algorithm complexity | Start with simplified FSRS, iterate |

---

## 9. Next Actions

1. **Immediate:**
   - Set up development environment
   - Initialize Next.js project
   - Begin SC1007 summary content creation

2. **This Week:**
   - Complete 3 topic summaries
   - Create 20 quiz questions
   - Build basic navigation UI

3. **Blocking:**
   - Request materials for SC1006, SC1008, SC2002 from user
   - Clarify design preferences (UI mockups?)
