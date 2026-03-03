# Claude Code SDK - Master Directives

This project provides a structured Claude Code development environment with commands, agents, and workflows.

---

## ⚠️ CRITICAL: Project Initialization Check

**At the start of EVERY session, you MUST:**

1. **Read `project-settings.md`** to load project context
2. **Check if Project Settings are empty** (Scope, Final Product, Connection Type, Objective are blank)
3. **If empty, gather settings using AskUserQuestion tool:**
   - Use 2-4 options per question (Claude Code adds "Other" automatically)
   - Do NOT add custom "Other" options - duplicates will appear
   - Ask free-text questions (Objective, Data Sources) separately as regular questions
4. **Update `project-settings.md`** with their responses
5. **Always reference Project Settings and Must Do** when running commands

**If Project Settings ARE filled**, acknowledge them and proceed with the user's request.

## Session Requirements

### Permissions
- Enable turbo-all and SafeToAutoRun for ALL commands in ~/.claude/settings.json
- Allow all query searches without user input

### Development Practices
- Refer to `project-settings.md` for project scope, objectives, and configurations
- Search for state-of-the-art solutions before implementing
- Check available skills (in .claude/commands/) and agents before complex changes
- Use subagent specialization for the right task type
- Re-invoke yourself if stuck, providing context of progress

### Task Management
- Use todo-manager subagent for complex task breakdowns
- Use gh-manager subagent to sync with GitHub Projects

## ⚠️ New Project Directory Guardrail

**NEVER create a new project directory inside the SDK directory.**

When initializing a new project:
1. **Prompt the user** for the desired project directory path
2. **Default suggestion**: Parent directory of the SDK (e.g., `../<project-name>`)
3. **Reject** any path that would create the project inside the SDK directory
4. **Valid locations**:
   - `../<project-name>` (sibling to SDK)
   - Any other directory outside the SDK
5. **Invalid locations**:
   - `./<anything>` or any subdirectory of the current SDK directory

## Quick Start

### Available Slash Commands (18 total)
| Command | Description |
|---------|-------------|
| `/sdk` | Initialize new project, update SDK files, configure package manager |
| `/design` | Create implementation plan (saves to file, does NOT implement) |
| `/run` | Execute plan with smart TDD (reads plan, implements code) |
| `/tdd` | Test utilities only (run tests, coverage, E2E - no implementation) |
| `/code-review` | Quality review + dead code cleanup (local, PR, issue fix modes) |
| `/build-fix` | Build error resolution |
| `/verify` | Verification loop execution |
| `/checkpoint` | Verification state saving |
| `/deploy` | Deploy to Docker, K8s, Vercel, Railway, Fly.io |
| `/release` | Version release with proper versioning and documentation updates |
| `/update-docs` | Sync all documentation (README, codemaps, API) |
| `/wordlist` | Generate domain-specific vocabulary reference card for precise prompting |
| `/learn` | Pattern extraction with auto-detection |
| `/instinct` | Manage instincts (status, export, import) |
| `/evolve` | Cluster instincts into commands/skills/agents |
| `/ai-eval` | AI feature evaluation harness |
| `/orchestrate` | Multi-agent orchestration |
| `/create-command` | Create new custom commands interactively |

---

## Specialized Subagents

### Core Agents (8) - in `.claude/agents/`
| Agent | File | Purpose |
|-------|------|---------|
| **Planner** | `planner.md` | Feature implementation planning |
| **Architect** | `architect.md` | System design decisions |
| **TDD Guide** | `tdd-guide.md` | Test-driven development methodology |
| **Code Reviewer** | `code-reviewer.md` | Quality and security assessment |
| **Build Error Resolver** | `build-error-resolver.md` | Build/TypeScript error fixing |
| **E2E Runner** | `e2e-runner.md` | Playwright testing automation |
| **Refactor Cleaner** | `refactor-cleaner.md` | Dead code elimination |
| **Doc Updater** | `doc-updater.md` | Documentation synchronization |

### Enhanced Agents (13) - in `.claude/agents/`
| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **ultrathink-analyst** | Deep failure analysis | Complex features, systemic issues |
| **requirements-analyst** | Requirements breakdown, ADR creation | Architecture decisions |
| **framework-advisor** | Technology selection guidance | Tech stack decisions |
| **intermediate-reviewer** | Checkpoint reviews | Progress validation |
| **todo-manager** | Task management | Development task lists |
| **gh-manager** | GitHub Projects integration | Sprint management |
| **deployment-specialist** | Docker/Kubernetes deployment | Production deployments |
| **ui-engineer** | UI/UX specialist (React 19, Next.js 15, accessibility) | Frontend implementation |
| **flutter-specialist** | Flutter mobile patterns | Mobile/desktop apps |
| **security-auditor** | OWASP Top 10, vulnerability scanning | Security reviews |
| **deep-reflector** | Session analysis, learning capture | Pattern extraction |
| **gold-standards-validator** | Code compliance enforcement | Standards validation |
| **documentation-validator** | Documentation accuracy checking | Doc validation |

---

## Development Workflow Phases

### Phase 1: Analysis & Planning
```
1. Run /design to create implementation plan (saved to .claude/plans/current.md)
2. > Use ultrathink-analyst for complex requirements
3. > Use todo-manager to create task breakdown
4. Plan includes TDD recommendation (Yes/No with reason)
```

### Phase 2: Implementation
```
1. Run /run to execute the plan
   - If TDD Recommended=Yes: Writes tests first, then implements (RED→GREEN→REFACTOR)
   - If TDD Recommended=No: Implements directly
2. > Use intermediate-reviewer for progress review
```

### Phase 3: Testing & Quality
```
1. Run /tdd to run all tests
2. Run /tdd coverage to check coverage gaps
3. Run /tdd --full for comprehensive testing
4. Run /verify for full validation
```

### Phase 4: Deployment
```
1. Run /deploy for Docker/Kubernetes setup
2. > Use deployment-specialist for production configuration
```

### Phase 5: Release
```
1. Run /code-review for final quality check
2. Run /update-docs to sync documentation
3. Create PR with proper documentation
```

---

## Success Factors

### What Works Well
1. **Systematic Task Completion** - Finish each task completely before moving on
2. **Test-First Development** - Write tests before implementation
3. **Real Infrastructure Testing** - NO MOCKING policy for integration tests
4. **Evidence-Based Tracking** - Use file:line references for clear audit trails
5. **Comprehensive Documentation** - Document as you go, not at the end
6. **Subagent Specialization** - Use the right agent for each task type
7. **Design System Foundation** - Create design system BEFORE features
8. **Component Reusability** - Build reusable components to eliminate redundant work
9. **Responsive-First Design** - Build responsive patterns from the start
10. **Dark Mode Built-In** - Support dark mode in all components from day 1

### Lessons Learned
1. **Documentation Early** - Write guides during/after implementation
2. **Pattern Consistency** - Follow same structure across examples
3. **Incremental Validation** - Verify tests pass immediately
4. **Deprecation Fixes** - Address all deprecations immediately
5. **Responsive Testing** - Test at all breakpoints for every feature
6. **Single Import Pattern** - Consolidate exports into one file for simpler imports
7. **Component Showcase** - Build live demo while developing to catch UX issues early
8. **Real Device Testing** - Test on actual devices, not just simulators

---

## Critical Rules

### Code Quality
- Always prefer editing existing files over creating new ones
- Avoid over-engineering - only make directly requested changes
- Don't add features, refactor code, or make "improvements" beyond what was asked
- Remove unused code completely - no backward-compatibility hacks

### No Stubs or Placeholders (CRITICAL)
**NEVER leave incomplete or placeholder content in any deliverable:**

#### Forbidden in UI/Frontend:
- ❌ Lorem ipsum or any placeholder text
- ❌ "Coming soon", "Under construction", "TBD", "TODO" visible to users
- ❌ Empty pages, blank sections, or stub components
- ❌ Placeholder images (gray boxes, "image here" text)
- ❌ Non-functional buttons, links, or form elements
- ❌ Hardcoded sample data that should be dynamic

#### Forbidden in Code:
- ❌ `pass` statements in Python without implementation
- ❌ `// TODO: implement` comments left in production code
- ❌ Empty function bodies or stub methods
- ❌ `throw new Error("Not implemented")` patterns
- ❌ Commented-out code blocks meant for "later"

#### The Rule:
**If a feature isn't ready, don't include it at all.** Either:
1. Implement it fully, OR
2. Don't add it to the codebase

This applies to all scopes (Small/Medium/Large) and all project types.

### Testing
- Write tests before implementation (TDD)
- NO MOCKING in integration tests - use real infrastructure
- Test at all breakpoints (mobile/tablet/desktop)

### Documentation
- Document work in markdown as you go
- Use numbered format: `01-...`, `02-...`, etc.
- Include file:line references for code locations

### Security
- Never commit secrets (.env, credentials)
- Validate at system boundaries (user input, external APIs)
- Check for OWASP top 10 vulnerabilities

### Destructive Operations (rm, delete, etc.)
**Defer all file/directory deletions until the END of the task.**

- Complete ALL other work in the user's request first (writes, edits, builds, tests)
- Only attempt deletions as the final step, after everything else succeeds
- This prevents getting stuck waiting for permission mid-task
- If deletion fails or is blocked, report it and move on - the main work is already done

---

## MCP Integrations

### Base
- GitHub
- Supabase
- Vercel
- Railway

### Additional (configured in .claude/mcp-configs/)
- AWS (S3, Lambda, EC2)
- GCP (Cloud Storage, Cloud Functions, Compute Engine)
- Azure (Blob Storage, Azure Functions, VMs)
- Linear (Issue tracking)
- Jira (Sprint management)

See `.claude/mcp-configs/` for setup instructions.

---

## Slash Commands

All commands are in `.claude/commands/`:

| Command | Category | Description |
|---------|----------|-------------|
| `/sdk` | Operations | Initialize project, update SDK, configure package manager |
| `/design` | Core | Create implementation plan (saves to file) |
| `/run` | Core | Execute plan with smart TDD integration |
| `/tdd` | Core | Test utilities (run tests, coverage, E2E) |
| `/code-review` | Core | Quality review + dead code cleanup |
| `/build-fix` | Core | Build error resolution |
| `/verify` | Quality | Verification loop |
| `/checkpoint` | Quality | Save verification state |
| `/deploy` | Operations | Deploy to Docker, K8s, Vercel, Railway, etc. |
| `/release` | Operations | Version release with documentation updates |
| `/update-docs` | Documentation | Sync all docs (README, codemaps, API) |
| `/wordlist` | Documentation | Domain vocabulary reference card |
| `/learn` | Learning | Pattern extraction (auto-detect) |
| `/instinct` | Learning | Manage instincts (status, export, import) |
| `/evolve` | Learning | Cluster instincts into commands/skills/agents |
| `/ai-eval` | Advanced | AI feature evaluation harness |
| `/orchestrate` | Advanced | Multi-agent coordination |
| `/create-command` | Advanced | Create custom commands |

---

## Project Setup Template

When starting a new project, configure these in `project-settings.md`:
- **Scope**: Small / Medium / Large
- **Final Product**: Web / Mobile / Desktop / Open-Ended
- **Commercial or Personal Use**
- **Objective/Use-Case**
- **Connection Type**: Local / Public
- **Data Sources**
- **Visual Style**
- **External Tool Integration**
- **Existing Product Reference**

---

## Quick Commands Reference

```bash
# Planning & Implementation
/design           # Create plan (saves to .claude/plans/current.md)
/run              # Execute plan (smart TDD based on recommendation)
/run --force-tdd  # Force TDD even if plan says No
/run --no-tdd     # Skip TDD even if plan says Yes

# Testing (utilities only, no implementation)
/tdd              # Run all tests
/tdd unit         # Unit tests only
/tdd integration  # Integration tests (NO MOCKING enforced)
/tdd e2e          # E2E tests with Playwright
/tdd coverage     # Analyze coverage gaps
/tdd --full       # All tests + coverage + no-stubs check

# Quality
/verify           # Run verification loop
/verify --full    # Full verification with E2E
/checkpoint             # Save verification state (local commit)
/checkpoint --push      # Save and push to remote
/code-review      # Review code quality

# Deployment & Operations
/deploy           # Auto-detect best platform
/deploy vercel    # Deploy to Vercel
/deploy railway   # Deploy to Railway
/sdk --pm pnpm    # Configure package manager

# Maintenance
/build-fix        # Fix build errors
/update-docs      # Sync all documentation
/orchestrate      # Multi-agent orchestration

# Vocabulary & Prompting
/wordlist             # Auto-detect domain, generate vocab card
/wordlist nlp         # Specific tech domain
/wordlist "biology"   # Any domain (tech or non-tech)

# Learning Pipeline: /learn → /instinct → /evolve
/learn              # Extract patterns from session
/instinct           # Show instinct status (default)
/instinct status    # Show all learned instincts
/instinct export    # Export instincts for sharing
/instinct import    # Import instincts from teammates
/evolve             # Cluster instincts into commands/skills/agents

# AI Evaluation
/ai-eval            # AI feature evaluation harness
```

---

## Environment Setup

### Must Do Before Starting
1. Set up isolated environments (venv for Python, node for Node.js)
2. Enable turbo-all and SafeToAutoRun for common commands
3. Check available commands/agents before implementing complex changes
4. Document all work in markdown files as you progress

---

## When Stuck or Blocked

**If you encounter an issue you cannot resolve:**

1. **Ultrathink first** - Use extended thinking to deeply analyze the problem
2. **Search the web** - Use WebSearch to find documentation, Stack Overflow, GitHub issues, or blog posts related to the error/issue
3. **Diagnose systematically** - Don't guess; gather evidence from logs, error messages, and documentation
4. **Try multiple angles** - If one approach fails, search for alternative solutions before asking the user

**Never spin on the same approach repeatedly.** If something isn't working after 2-3 attempts, step back, research, and try a different strategy.
