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
2. Execute every prompt and action in a parsimonious manner
3. For any research or logic implementation, do a deep dive and find state-of-the-art solutions
