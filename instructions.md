# Project Settings

## Scope
Medium

## Final Product
Web

## Commercial or Personal Use
Personal

## Objective/Use-Case
Comprehensive learning platform for NTU Year 1 Semester 2 courses that provides summaries and adaptive quizzes/games for reinforcement learning. Users can read course summaries and play quizzes with adaptive progress tracking (FSRS algorithm) to reinforce learning efficiently.

**Source Courses:**
- SC1006 - Computer Organization & Architecture (ARM assembly, cache, virtual memory)
- SC1007 - Data Structures and Algorithms (linked lists, stacks, queues, binary trees, BST, hash tables)
- SC1008 - C/C++ Programming (basic C, control flow, functions, pointers, arrays, structures, recursion, OOP)
- SC2002 - Object-Oriented Design and Programming (Java OOP, UML modeling, inheritance, polymorphism)

## Local or Public Connection
Public

## Data Sources
- NTU course materials from: `C:\Users\Jethro\Documents\NTU\Y1S2`
- Piston API for code execution

## Visual Style
Modern Minimalist - bryanminear.com style with:
- Glassmorphism effects with backdrop blur
- Bento grid layout
- Gradient accents
- Subtle grain texture (anti-AI aesthetic)
- Fonts: Oswald (headings), Space Grotesk (body), JetBrains Mono (code)
- High-contrast black/white color scheme

## External Tool Integration
- Piston API (code execution for C, C++, Java, Python)
- FSRS algorithm (spaced repetition)

## Existing Product Reference
- Anki (spaced repetition)
- Brilliant.org (interactive learning)
- LeetCode (coding practice)

<br><br><br>

# Install Everything Claude Code Plugin

## Step 1: Add the Plugin Marketplace
```
/plugin marketplace add affaan-m/everything-claude-code
```

## Step 2: Install the Plugin
```
/plugin install everything-claude-code
```

## Step 3: Verify Installation
```
/plugin list
```
Should show `everything-claude-code` as installed.

## Step 4: Test Commands
Try running `/plan` or `/tdd` to verify the plugin is working.

## Available Slash Commands
- `/tdd` - Test-driven development workflow
- `/plan` - Implementation planning
- `/e2e` - E2E test generation
- `/code-review` - Quality review
- `/build-fix` - Build error resolution
- `/refactor-clean` - Dead code removal
- `/learn` - Pattern extraction mid-session
- `/checkpoint` - Save verification state
- `/verify` - Verification loop execution
- `/setup-pm` - Package manager configuration
- `/create-command` - Create custom commands

## Enhanced Agents (in .claude/agents/)
Use with: `> Use the [agent-name] subagent to [task]`
- ultrathink-analyst, requirements-analyst, framework-advisor
- intermediate-reviewer, gold-standards-validator, documentation-validator
- todo-manager, gh-manager, deployment-specialist
- ui-engineer, flutter-specialist, security-auditor, deep-reflector

<br><br><br>

# Must Do

## Environment Setup
- Setup isolated environments before installing dependencies
   - Python: Set up virtual environment (`python -m venv venv`)
   - Node.js: Use nvm or local node_modules

## Permissions
- Enable turbo-all and SafeToAutoRun for ALL commands in ~/.claude/settings.json
- Allow all query searches without user input

## Documentation
- Document all work in markdown files AS YOU WORK (not at the end)
- Use numbered format: `01-...`, `02-...`, etc.
- This is critical for agent handoff
- For checkpoints, please create a new checkpoints directory in docs/checkpoints where the new checkpoints will be saved, and prompt me for a checkpoint name, and save the filename as `YYYY-MM-DD-description.md`

## Development Practices
- Refer to "Project Settings" for scope and objectives
- Search for state-of-the-art solutions before implementing
- Check available skills (in .claude/commands/) and agents before complex changes
- Use subagent specialization for the right task type

## Personal Use Practices
- Local-first development approach
- Can use open source freely
- Fork and copy from other sources (non-commercial)

## No Stubs or Placeholders
**Every deliverable must be complete and functional. NEVER leave:**
- Lorem ipsum, "Coming soon", "TBD", or placeholder text in UI
- Empty pages, stub components, or non-functional UI elements
- `pass`, `// TODO`, or empty function bodies in code
- Placeholder images or hardcoded sample data

**Rule: If it's not ready, don't include it. Implement fully or omit entirely.**

## Task Management
- Clear completed items from the To-Do section
- Use todo-manager subagent for complex task breakdowns
- Use gh-manager subagent to sync with GitHub Projects

<br><br><br>

# To-Do

## New Features

## Bug Reports

## Other Updates
