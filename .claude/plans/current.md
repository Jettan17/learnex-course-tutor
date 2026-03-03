# Implementation Plan: Sync Quiz Content + AI Chat/Hints + UI Polish

Created: 2026-01-30
Updated: 2026-03-03 (Simplified: removed Phase 7 question gen, removed Phases 10-13 user courses, added Phase 10 UI fix)
Status: pending

## Requirements

The quiz questions in `questions.ts` must be synchronized with the study content in `courses.ts`. Currently:
- All topic IDs are correctly linked (no orphaned topics)
- However, many quiz questions test concepts NOT explained in the study material summaries
- Students may encounter quiz questions on material they haven't been taught

**Goal:** Ensure every concept tested in quiz questions is covered in the corresponding topic's study content (summary, keyPoints, codeExamples).

## Analysis Summary

### Current State
- **Study Content:** 37 topics across 4 courses (SC1006, SC1007, SC1008, SC2002)
- **Quiz Content:** 601+ questions linked via `topicId`
- **Topic IDs:** All match correctly - no orphaned questions

### Identified Sync Gaps (Concepts in Quiz Not in Study)

After detailed analysis, the following gaps were found:

#### SC1007 - Data Structures & Algorithms

| Topic | Quiz Concepts Missing from Study |
|-------|----------------------------------|
| **memory-management** | Interning vs Memory Pooling distinction (quiz asks about interning specifically) |
| **linked-lists** | Circular linked list infinite traversal issue, Floyd's cycle detection |
| **stacks** | Postfix/RPN notation conversion, postfix expression evaluation |
| **queues** | Priority queue with min-heap, deque operations (appendleft/popleft) |
| **binary-trees** | Tree reconstruction from inorder+preorder, nodes at level k formula (2^k) |
| **binary-search-trees** | Inorder predecessor/successor, BST height from insertion sequence |
| **avl-trees** | Minimum nodes for height h formula, specific rotation sequence examples |
| **algorithm-analysis** | O(n³) triple nested loops, specific memoization speedup examples |
| **heaps** | Heap sort algorithm, K-th largest element use case |
| **hash-tables** | Quadratic probing formula, double hashing concept |
| **tries** | Autocomplete implementation details, memory vs hash table comparison |

#### SC1006 - Computer Organization & Architecture

| Topic | Quiz Concepts Missing from Study |
|-------|----------------------------------|
| **arm-programmers-model** | PC offset (+8 in ARM mode) detailed explanation |
| **addressing-modes** | LSL #2 shift in addressing, scaled index addressing |
| **arm-instruction-set** | Unsigned comparison conditions (HI, LS), barrel shifter operations |
| **cache-memory** | Write-through vs write-back policies, L1/L2/L3 latency comparison |
| **virtual-memory** | Page replacement algorithms (LRU, FIFO, Optimal, Clock) comparison |

#### SC1008 - C/C++ Programming

| Topic | Quiz Concepts Missing from Study |
|-------|----------------------------------|
| **c-basics** | Variable size specifics, initialization warnings |
| **control-flow** | Switch fallthrough behavior, nested loop break scope |
| **functions** | Function prototype declaration syntax |
| **pointers** | Double pointers, pointer arithmetic with arrays |
| **arrays** | 2D array memory layout, array decay to pointer |
| **structures** | Structure padding, sizeof struct |
| **recursion** | Tail recursion optimization, recursive sum patterns |

#### SC2002 - OOP

| Topic | Quiz Concepts Missing from Study |
|-------|----------------------------------|
| **oop-introduction** | SOLID principles brief mention |
| **classes-objects** | Copy constructors, object lifecycle |
| **encapsulation** | Protected vs private access comparison |
| **inheritance** | Diamond problem, multiple inheritance issues |
| **polymorphism** | Virtual table (vtable) mechanism |
| **abstract-classes** | Interface vs abstract class comparison |
| **exception-handling** | Multiple catch blocks, exception chaining |

## Implementation Phases

### Phase 1: SC1007 - Data Structures Updates (Highest Priority)
- [ ] Update `memory-management` topic: Add interning vs pooling section
- [ ] Update `linked-lists` topic: Add circular list traversal warning, cycle detection
- [ ] Update `stacks` topic: Add postfix notation section with examples
- [ ] Update `queues` topic: Add priority queue section, deque details
- [ ] Update `binary-trees` topic: Add tree reconstruction, level formula
- [ ] Update `binary-search-trees` topic: Add predecessor/successor explanation
- [ ] Update `avl-trees` topic: Add minimum nodes formula
- [ ] Update `algorithm-analysis` topic: Add O(n³) example, memoization comparison
- [ ] Update `heaps` topic: Add heap sort, k-th element applications
- [ ] Update `hash-tables` topic: Add quadratic probing, double hashing
- [ ] Update `tries` topic: Add autocomplete details, memory comparison

### Phase 2: SC1006 - Computer Architecture Updates
- [ ] Update `arm-programmers-model` topic: Add PC offset explanation
- [ ] Update `addressing-modes` topic: Add LSL shifts, scaled addressing
- [ ] Update `arm-instruction-set` topic: Add unsigned comparisons, barrel shifter
- [ ] Update `cache-memory` topic: Add write policies comparison, latency table
- [ ] Update `virtual-memory` topic: Add page replacement algorithm comparison table

### Phase 3: SC1008 - C Programming Updates
- [ ] Update `c-basics` topic: Add variable sizes, initialization rules
- [ ] Update `control-flow` topic: Add switch fallthrough, break scope
- [ ] Update `functions` topic: Add prototype syntax detail
- [ ] Update `pointers` topic: Add double pointers, pointer arithmetic
- [ ] Update `arrays` topic: Add 2D layout, array decay explanation
- [ ] Update `structures` topic: Add padding, sizeof details
- [ ] Update `recursion` topic: Add tail recursion, recursive patterns

### Phase 4: SC2002 - OOP Updates
- [ ] Update `oop-introduction` topic: Add SOLID principles
- [ ] Update `classes-objects` topic: Add copy constructors, lifecycle
- [ ] Update `encapsulation` topic: Add protected vs private comparison
- [ ] Update `inheritance` topic: Add diamond problem explanation
- [ ] Update `polymorphism` topic: Add vtable concept
- [ ] Update `abstract-classes` topic: Add interface comparison
- [ ] Update `exception-handling` topic: Add multiple catch, chaining

### Phase 5: Validation
- [ ] Cross-reference each quiz question's concepts against study content
- [ ] Verify all quiz explanations align with study material
- [ ] Run application to test quiz/study flow

## Dependencies
- Read access to both `courses.ts` and `questions.ts`
- Understanding of current content structure
- No external dependencies

## Risks
- **MEDIUM:** File is large (4000+ lines) - careful editing needed
- **LOW:** Content changes may introduce inconsistencies - verify after each topic
- **LOW:** Quiz questions may need updates if explanations contradict study material

## TDD Recommended: No
**Reason:** This is a content synchronization task involving text updates to TypeScript data files. There is no algorithmic code to test - only content accuracy which will be validated through manual review and application testing.

## Files to Modify
1. `app/src/data/courses.ts` - Primary file for study content updates

## Estimated Changes
- ~50-80 additions/modifications to topic summaries
- ~20-30 new keyPoints entries
- ~10-15 new or updated code examples

---

## AI Features (Phases 6, 8–9)

### Context

**Question generation is handled locally via Claude Code** — feed notes/topics directly in this chat, questions written to `questions.ts`, committed, Vercel auto-deploys (~60 seconds). Higher quality (Sonnet), zero production cost, pre-reviewed before going live. The 4 existing courses are proof of concept.

**User-created courses feature: not needed** — course creation via Claude Code locally is simpler and higher quality. No IndexedDB, no upload UI, no generation API routes required.

**What remains in production AI:** Only real-time interactive features that cannot be pre-generated:
- Topic Q&A Chat (Phase 8) — conversational, context-dependent per session
- Quiz Hints (Phase 9) — real-time scaffolding during a quiz

**Provider:** Vercel AI SDK + Google Gemini 2.0 Flash
- Free tier: 1M tokens/day — personal use will never hit the limit
- Setup: get key at aistudio.google.com (free, Google account only, no credit card), add `GEMINI_API_KEY` to Vercel env vars — that's the entire "provisioning"
- Upgrade path: swap `@ai-sdk/google` → `@ai-sdk/anthropic` + one line in `ai.ts`, no other code changes

---

### Phase 6: AI Infrastructure Setup

Minimal — only what's needed for streaming chat and non-streaming hints.

- [ ] Add `GEMINI_API_KEY` to `.env.local`; create `.env.local.example` with setup instructions and upgrade path comment
- [ ] Install Vercel AI SDK: `npm install ai @ai-sdk/google` in `app/`
- [ ] Create `app/src/lib/ai.ts`:
  ```ts
  import { google } from '@ai-sdk/google'
  // To upgrade to Claude: npm install @ai-sdk/anthropic, swap import + model string below
  export const chatModel = google('gemini-2.0-flash')
  export const hintModel = google('gemini-2.0-flash')
  ```
- [ ] Create `app/src/types/ai.ts` — `ChatMessage`, `HintResponse` types
- [ ] Verify `.gitignore` already excludes `.env.local`

**Files:**
- `app/src/lib/ai.ts` (new)
- `app/src/types/ai.ts` (new)
- `.env.local.example` (new)
- `app/package.json` (add `ai`, `@ai-sdk/google`)

---

### Phase 7: ~~AI Question Generator~~ — REMOVED

**Decision:** Question generation handled locally via Claude Code → `questions.ts` → git push → auto-deploy. Higher model quality (Sonnet vs Flash), zero API cost, pre-reviewed. No production API route needed.

---

### Phase 8: Topic Q&A Chat Widget

Real-time Q&A on any topic page. Topic context (~2–4KB) injected directly into the prompt — no RAG or vector store needed at this scale.

**How it works:**
1. User opens chat widget on a topic page (collapsible, bottom-right)
2. Question + full topic context (summary, keyPoints, codeExamples) sent to streaming API route
3. Gemini streams an answer back, citing which section of the study material it's drawing from
4. Conversation state lives in component memory (session-only — no persistence needed)

**API Route:**
- [ ] Create `app/src/app/api/topic-chat/route.ts` (POST, streaming)
  - Input: `{ messages: ChatMessage[], topicContext: { summary, keyPoints, codeExamples } }`
  - Uses `streamText()` from Vercel AI SDK — returns `ReadableStream` via `result.toDataStreamResponse()`
  - System prompt injects full topic content + instructs model to cite source sections by name

**UI:**
- [ ] Create `app/src/components/TopicChat.tsx`
  - Collapsible chat drawer, bottom-right of topic page, toggles open/closed
  - Streaming message display with Markdown + code block rendering
  - Citation chips beneath AI answers: "Based on: [Key Point name]"
  - 3–4 suggested starter questions pre-populated ("Explain X", "What's the difference between A and B?", "Give me an example of...")
  - Clear conversation button
- [ ] Add `<TopicChat topic={topic} />` to `app/src/app/courses/[courseId]/[topicId]/page.tsx`

**Files:**
- `app/src/app/api/topic-chat/route.ts` (new)
- `app/src/components/TopicChat.tsx` (new)
- `app/src/app/courses/[courseId]/[topicId]/page.tsx` (add component)

---

### Phase 9: Quiz Hint System

Socratic hints during a quiz — surfaces the concept being tested without revealing the answer. Two progressive levels.

**API Route:**
- [ ] Create `app/src/app/api/hint/route.ts` (POST, non-streaming)
  - Input: `{ question: Question, topicSummary: string, hintLevel: 1 | 2 }`
  - Hint level 1: orients toward the relevant concept area ("Think about how memory allocation works...")
  - Hint level 2: more direct nudge toward the reasoning path
  - Correct answer explicitly **excluded** from the prompt
  - Uses `generateText()` (hints are short, streaming not needed)

**UI:**
- [ ] Create `app/src/components/questions/QuestionHint.tsx`
  - "Hint" button visible on first attempt only (hidden after answer is revealed)
  - Loading spinner while fetching
  - Level 1 hint shown in a callout box → "One more hint?" button → level 2
  - 0.8× mastery credit applied when hints used (update FSRS scoring)
- [ ] Add `<QuestionHint>` to all question type components' shared layout
- [ ] Update scoring in `app/src/app/courses/[courseId]/[topicId]/quiz/page.tsx`

**Files:**
- `app/src/app/api/hint/route.ts` (new)
- `app/src/components/questions/QuestionHint.tsx` (new)
- All question type components (add hint slot to shared layout)
- `app/src/app/courses/[courseId]/[topicId]/quiz/page.tsx` (scoring update)

---

### Phase 10: UI — Course Page Color Consistency

**Problem:** `/courses/[courseId]` uses a completely different design system from the rest of the app.

| Element | Homepage + `/courses` listing | `/courses/[courseId]` (current, broken) |
|---|---|---|
| Card background | `glass-card` (glassmorphism) | `bg-white dark:bg-gray-800` |
| Border radius | `rounded-2xl` | `rounded-lg` |
| Shadow / border | `gradient-border` | plain `shadow` |
| Color theming | Per-course `courseColors` gradients | None — plain indigo everywhere |
| Study button | `btn-primary` | `bg-indigo-600 hover:bg-indigo-700` |
| Quiz button | `btn-secondary` | plain bordered white/gray |
| Progress bar | Course gradient color | Fixed `bg-indigo-600 / bg-yellow-500 / bg-green-500` |
| Course code badge | `${colors.bg} ${colors.text}` pill | `bg-indigo-100 dark:bg-indigo-900` |

**Fix — `app/src/app/courses/[courseId]/page.tsx`:**

- [ ] Add `courseColors` constant at top of file (same record as `page.tsx` and `courses/page.tsx` — duplication is acceptable for now; extracting to `lib/courseColors.ts` is a future cleanup)
- [ ] Derive `const colors = courseColors[course.id] || courseColors.sc1007` after `getCourse()`
- [ ] **Course header:** Replace `bg-white dark:bg-gray-800 rounded-lg shadow p-6` → `glass-card rounded-2xl p-6 gradient-border`; add course-colored icon (matching homepage: `w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient}`)
- [ ] **Course code badge:** Replace `bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200` → `${colors.bg} ${colors.text}` (per-course color)
- [ ] **Topic cells:** Replace `bg-white dark:bg-gray-800 rounded-lg shadow` → `glass-card rounded-2xl gradient-border`
- [ ] **Progress bar:** Replace three-color conditional (`bg-green-500 / bg-yellow-500 / bg-indigo-600`) → `bg-gradient-to-r ${colors.gradient}` (matches homepage course cards)
- [ ] **Study button:** Replace raw `bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg` → `btn-primary`
- [ ] **Quiz button:** Replace raw border/background inline styles → `btn-secondary`

**Files:**
- `app/src/app/courses/[courseId]/page.tsx` (visual class updates only)

---

## Dependencies

```
New packages (app/):
- ai              (Vercel AI SDK core)
- @ai-sdk/google  (Gemini 2.0 Flash provider — free tier)

Environment variables:
- GEMINI_API_KEY  (free at aistudio.google.com — add to Vercel env vars)

Optional upgrade (one-line change in ai.ts):
- @ai-sdk/anthropic + ANTHROPIC_API_KEY  →  Claude quality
```

## Risks

- **MEDIUM:** Streaming edge cases — SSE connection drops during topic chat; handle with try/catch + "Connection interrupted, try again" fallback message
- **LOW:** Gemini context length — each topic context is ~2–4KB, well within 1M token context window; no issue
- **LOW:** Hint system gaming — track hint usage per card; factor into FSRS stability penalty on next review
- **LOW:** `.env.local` exposure — verify `.gitignore` exclusion before first AI commit; already excluded, just confirm

## TDD Recommended for Phases 6, 8–10: Partial
**Reason:** API routes (topic-chat, hint) — unit test request validation and error handling. Skip LLM output tests (non-deterministic). UI components (TopicChat, QuestionHint) — skip TDD (visual). Phase 10 UI fix — no tests needed (CSS class changes only, validated by visual inspection).

---

Plan saved. Run `/run` to execute this plan.
