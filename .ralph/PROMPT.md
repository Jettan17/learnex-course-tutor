# NTU Semester 2 Summary - Development Instructions

## Project Overview
Build a comprehensive learning platform for NTU Year 1 Semester 2 courses that provides summaries and adaptive quizzes/games for reinforcement learning.

## Source Courses
Reference materials from: `C:\Users\Jethro\Documents\NTU\Y1S2`
- **SC1006** - Computer Organization & Architecture (ARM assembly, cache, virtual memory, data transfer)
- **SC1007** - Data Structures and Algorithms (linked lists, stacks, queues, binary trees, BST, hash tables)
- **SC1008** - C/C++ Programming (basic C, control flow, functions, pointers, arrays, structures, recursion, OOP)
- **SC2002** - Object-Oriented Design and Programming (Java OOP, UML modeling, inheritance, polymorphism)

## Core Features
1. **Content Summaries** - Distilled, readable summaries of course content
2. **Adaptive Quizzes** - Quizzes with progress tracking that adapt to user proficiency
3. **Reinforcement Games** - Interactive games to reinforce learning concepts
4. **Progress Tracking** - Allow users to skip content they're already proficient in

## Development Principles
1. Setup environments to isolate dependencies before installing any dependencies
2. Execute every prompt and action in a parsimonious manner
3. For any research or logic implementation, do a deep dive and find state-of-the-art solutions

## Platform Model
- **Producers**: Content creators (initially course materials, later student contributors)
- **Consumers**: Students studying for these courses
- **Partners**: The platform itself facilitating learning transactions

## Success Criteria
- Evaluate using AAA framework:
  - **Automate**: Reduce operational costs
  - **Augment**: Reduce decision-making costs
  - **Amplify**: Reduce expertise costs (for scaling)

- Features must cover network behaviors:
  - **Accessibility**: Easy for users to complete transactions
  - **Engagement**: Useful information for completing transactions
  - **Personalization**: Curated information for intended use
  - **Connection**: Connected information sources
  - **Collaboration**: Seamless producer-consumer interaction

## Ralph Exit Conditions
Signal completion with:
```
RALPH_STATUS:
EXIT_SIGNAL: true
REASON: [reason for completion]
```

When continuing work:
```
RALPH_STATUS:
EXIT_SIGNAL: false
NEXT_TASK: [what you're working on next]
```
