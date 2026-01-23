# NTU Semester 2 Summary - Initial Specifications

## Objective
Create a comprehensive learning platform for NTU Year 1 Semester 2 courses that provides summaries and adaptive quizzes/games for reinforcement learning.

## Source Courses
Reference materials from: `C:\Users\Jethro\Documents\NTU\Y1S2`
- **SC1006** - Computer Organization & Architecture (ARM assembly, cache, virtual memory, data transfer)
- **SC1007** - Data Structures and Algorithms (linked lists, stacks, queues, binary trees, BST, hash tables)
- **SC1008** - C/C++ Programming (basic C, control flow, functions, pointers, arrays, structures, recursion, OOP)
- **SC2002** - Object-Oriented Design and Programming (Java OOP, UML modeling, inheritance, polymorphism)

## Scenarios
1. As a user, this is what I envision as my workflow:
   - I am able to read summaries of the content
   - I am able to play quizzes or games to help me reinforce my learning, and they have adaptive progress so I can skip stuff if I am already proficient in them

## Tasks for Claude Code
1. Research thoroughly and distill the value propositions and UNIQUE SELLING POINTS of our solution
   - Scrutinize and critique my scenarios, with the focus of improving the solution
2. Evaluate it using the AAA framework
   - Automate: Reduce operational costs
   - Augment: Reduce decision-making costs
   - Amplify: Reduce expertise costs (for scaling)
3. Features must sufficiently cover the following network behaviors to achieve strong network effects
   - Accessibility: Easy for users to complete a transaction
   - Engagement: Information that are useful to users for completing a transaction
   - Personalization: Information that are curated for an intended use
   - Connection: Information sources that are connected to the platform (one or two-way)
   - Collaboration: Producers and consumers can jointly work together seamlessly
4. Document in details, your analysis in docs/01-analysis, and plans in docs/02-plans

## Platform Model
- **Producers**: Content creators (initially the course materials, later potentially student contributors)
- **Consumers**: Students studying for these courses
- **Partners**: The platform itself facilitating learning transactions

## Must Do
1. Setup environments to isolate dependencies first before installing any dependencies
   - If working with python, set up a virtual environment first before installing any dependencies
   - If working with nodejs, set up a node environment first before installing any dependencies
2. Enable turbo-all and SafeToAutoRun for all terminal commands, as well as any query searches, such that no user input is required to run them, unless I explicitly say that I want to review the commands or when generating any implementation plan, which I would want to review, essentially you should not need any user input from me at all, and only stop when it is completed
3. Execute every prompt and action in a parsimonious manner, unless explicitly told not to do so
4. Please document all work done in files, while doing the work and not at the end in case you get stuck, and use as many directories and files as you need, naming them in the format 01-..., 02-..., etc.
5. For any research or logic implementation, please ultrathink and do a deep dive on it, and find state-of-the-art solutions. unless explicitly told not to do so
6. Please use Ralph to automatically re-invoke itself to continue the task until it is completed, unless explicitly told not to do so. Reference: https://github.com/frankbria/ralph-claude-code 
7. If working in a project directory, please reference the various resources found in claude-code-projects\kailash-vibe-cc-setup
8. After addressing each part for the Updates section, please clear it off, and only leave the parts that are not addressed yet

# Updates
## Bug Reports
*All bug reports have been addressed.*

## Feature Requests
*All feature requests have been addressed.*

## Completed Updates (January 2026)
- [x] Swapped SC1006 and SC1007 visual location on home page
- [x] Removed markdown asterisks from study material
- [x] Changed "Semester" color to indigo for better visibility
- [x] Added slight indigo hue to background texture and made it more subtle
- [x] Increased opacity of key points section (bg-indigo-100/indigo-900/40)
- [x] Applied Space Grotesk font to quiz question text
- [x] Changed page title and header to "NTU Course Tutor"
- [x] Unlocked all topics for all courses (cleared all prerequisites)
- [x] Updated UI to reference bryanminear.com minimalist style:
  - Changed fonts to Oswald (headings) + Space Grotesk (body) + JetBrains Mono (code)
  - High-contrast black/white color scheme
  - Simplified glass cards with clean borders
  - Minimal, uppercase navigation and buttons
- [x] Added 75 coding implementation questions across all courses:
  - SC1006: ARM assembly, cache, virtual memory
  - SC1007: Linked lists, stacks, queues, binary trees, BST, hash tables, sorting
  - SC1008: C basics, pointers, arrays, functions, structures, recursion
  - SC2002: Java OOP, inheritance, polymorphism, exception handling
- [x] Added textured background for dark mode:
  - Subtle noise grain overlay
  - Very subtle grid lines pattern
  - Multiple fonts break up the main font (Oswald for headings, Space Grotesk for body)
- [x] Fixed new question types not appearing in quizzes:
  - Fixed 8 topic ID mismatches (stacks-queues → stacks, java-oop-basics → polymorphism, c-pointers → pointers, cpp-oop → classes-objects, python-basics → memory-management)
  - New question types (drag_drop, matching, code_execution) now properly linked to existing topics
- [x] Improved study content accuracy to match NTU course notes:
  - SC1007: Added referential arrays concept, memory pooling vs interning distinction
  - SC1008: Added C development cycle (Edit→Preprocess→Compile→Link→Execute), floating-point precision warnings, buffer overflow security risks
  - SC2002: Added object references vs objects clarification, method overloading explanation
  - Created comprehensive content gap analysis at docs/01-analysis/content-gap-analysis.md
- [x] Compressed quiz page UI similar to review section:
  - Added viewport-height container with flex layout
  - Made content area scrollable with fixed action buttons at bottom
  - Reduced padding and font sizes throughout
  - Combined header with progress bar into compact row
  - Next/Submit button now visible without scrolling
- [x] Fixed true/false question bug in quiz page (type mismatch between selectedAnswer index and correctAnswer string)
- [x] Added 510 questions (15 per topic across 34 topics)
- [x] Added new question types with Piston API code execution:
  - Drag & Drop (ordering/sequencing) questions with touch support
  - Matching questions (connect pairs) with visual feedback
  - Code Execution questions using Piston API (free, supports C, C++, Java, Python)
  - Added 16 sample questions for new types
  - Integrated into quiz page with proper FSRS tracking
- [x] Added step-through controls to AVL tree visualization:
  - "Next Step" and "Previous Step" buttons for manual control
  - Shows each insertion and rotation phase separately
  - For LR/RL rotations, shows both intermediate and final states
  - Highlights newly inserted nodes in green
  - Displays explanations for each step
- [x] Updated frontend with modern 2025-2026 UI trends:
  - Glassmorphism effects with backdrop blur
  - Bento grid layout
  - Gradient accents and animated progress bars
  - Subtle grain texture for anti-AI aesthetic
  - Improved micro-interactions and hover effects
  - Mobile-responsive design with icon navigation
- [x] Removed animated shimmer effect from progress bars (now static gradient)
- [x] Improved text contrast:
  - Changed muted text from gray-500 to gray-600 (light) / gray-300 (dark)
  - Changed body text from gray-600 to gray-700 (light) / gray-300 (dark)
  - Increased glass card opacity for better readability
  - Fixed gradient-mesh background to include base background color for proper dark mode support
  - Added explicit text colors to course code badges for visibility in dark mode
- [x] Compressed review page UI:
  - Rating buttons (Again, Hard, Good, Easy) now visible without scrolling
  - Combined header and progress bar into single compact row
  - Made card content scrollable with fixed action buttons at bottom
  - Reduced padding and font sizes for better space efficiency
- [x] Added data structure visualizations (/visualize page):
  - AVL Tree with LL, RR, LR, RL rotation animations and explanations
  - Binary Search Tree with insert, delete, search operations
  - Linked List (singly and doubly) with head/tail/index operations
  - Stack and Queue with push/pop and enqueue/dequeue animations
  - Added Visualize link to navigation

