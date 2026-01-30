# LearnEx Course Tutor

<p align="center">
  <img src="app/public/brand/logo-full.svg" alt="LearnEx Logo" width="200">
</p>

**Live Demo:** https://uni-course-tutor.vercel.app/

## Overview

Comprehensive learning platform for NTU Year 1 Semester 2 courses that provides summaries and adaptive quizzes using the FSRS spaced repetition algorithm for efficient reinforcement learning.

## Features

- **Adaptive Spaced Repetition** - FSRS algorithm with 90% retention target
- **Multiple Question Types** - MCQ, true/false, code trace, fill-in-blank, drag-drop, matching, code execution
- **Data Structure Visualizers** - Interactive visualizations for AVL trees, BST, linked lists, stacks, and queues
- **Progress Tracking** - Mastery levels and performance analytics per topic
- **Supplementary Resources** - Curated external learning links for each topic
- **Dark/Light Mode** - Full theme support

## Courses

| Code | Course | Topics |
|------|--------|--------|
| SC1006 | Computer Organization & Architecture | ARM, Cache, Virtual Memory, Pipelining |
| SC1007 | Data Structures and Algorithms | Trees, Graphs, Sorting, Algorithm Analysis |
| SC1008 | C/C++ Programming | Pointers, Arrays, Structs, Memory Management |
| SC2002 | Object-Oriented Design and Programming | OOP, Inheritance, Polymorphism, SOLID |

## Content Highlights

The platform includes comprehensive study material with:
- **36 topics** across 4 courses
- **Code examples** with explanations (C, C++, Java, Python, ARM)
- **Key points** for quick revision
- **External resources** from W3Schools, GeeksforGeeks, Oracle, etc.

### Enhanced Topics
- **Pointers**: Function pointers, double pointers, void pointers
- **AVL Trees**: Detailed rotation explanations (LL, RR, LR, RL)
- **Virtual Memory**: Page replacement algorithms (FIFO, LRU, Optimal, Clock)
- **Cache Memory**: L1/L2/L3 hierarchy, MESI cache coherence
- **Algorithm Analysis**: Amortized complexity, space-time tradeoffs
- **OOP**: SOLID principles, composition vs inheritance

## Tech Stack

- **Framework**: Next.js 15 / React 19 / TypeScript 5
- **Styling**: Tailwind CSS 4
- **Algorithm**: FSRS (Free Spaced Repetition Scheduler)
- **Deployment**: Vercel

## Getting Started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Brand Assets

Logo files available in `/app/public/brand/`:

| File | Use Case |
|------|----------|
| `logo.svg` | Icon only (48x48) |
| `logo-full.svg` | Horizontal lockup |
| `logo-full-dark.svg` | For dark backgrounds |
| `logo-stacked.svg` | Square format (120x120) |

See [Brand README](app/public/brand/README.md) for usage guidelines.
