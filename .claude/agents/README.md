# Claude Code SDK Subagents

This directory contains specialized subagents for the Claude Code SDK development environment.

## Available Agents (21 total)

### Core Agents (8)

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **planner** | Feature implementation planning | Complex features, refactoring |
| **architect** | System design decisions | New features, architectural changes |
| **tdd-guide** | TDD methodology (RED/GREEN/REFACTOR) | Writing features, fixing bugs |
| **code-reviewer** | Quality and security review | After writing or modifying code |
| **build-error-resolver** | Build/TypeScript error fixing | Build failures, type errors |
| **e2e-runner** | Playwright E2E testing | Critical user flow testing |
| **refactor-cleaner** | Dead code elimination | Code cleanup, unused exports |
| **doc-updater** | Documentation synchronization | Codemap/README updates |

### Enhanced Agents (13)

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **deep-reflector** | Session analysis and learning capture | `/learn` command, pattern extraction |
| **deployment-specialist** | Docker/Kubernetes deployment | Production deployments, CI/CD setup |
| **documentation-validator** | Documentation validation | Testing code examples, doc accuracy |
| **flutter-specialist** | Flutter mobile/desktop apps | Cross-platform mobile development |
| **framework-advisor** | Framework selection guidance | Technology stack decisions |
| **gh-manager** | GitHub project management | Issue tracking, project boards, PRs |
| **gold-standards-validator** | Compliance checking | Code validation, standards enforcement |
| **intermediate-reviewer** | Checkpoint reviews | Progress validation, milestone critiques |
| **requirements-analyst** | Requirements breakdown | ADRs, systematic analysis |
| **security-auditor** | Security analysis | Vulnerability scanning, OWASP Top 10 |
| **todo-manager** | Task management | Todo lists, project tracking |
| **ui-engineer** | UI/UX specialist | React, accessibility, design systems |
| **ultrathink-analyst** | Deep failure analysis | Complex features, risk analysis |

---

## Workflow Phases

### Phase 1: Analysis & Planning
```
1. Run /design to create implementation plan
2. > Use planner for detailed step breakdown
3. > Use architect for system design decisions
4. > Use ultrathink-analyst for complex requirement analysis
5. > Use requirements-analyst for systematic breakdown
6. > Use framework-advisor for technology decisions
7. > Use todo-manager to create task breakdown
```

### Phase 2: Implementation
```
1. Run /run to execute the plan (uses TDD when recommended)
2. > Use tdd-guide for test-first methodology
3. > Use ui-engineer for frontend components
4. > Use flutter-specialist for mobile components
5. > Use gold-standards-validator to ensure compliance
6. > Use intermediate-reviewer to review progress
```

### Phase 3: Testing & Quality
```
1. Run /tdd to run all tests
2. Run /tdd e2e for end-to-end tests
3. Run /tdd coverage to check coverage gaps
4. > Use e2e-runner for Playwright test creation
5. > Use code-reviewer for quality review
6. > Use documentation-validator to verify docs
7. > Use todo-manager to update task status
```

### Phase 4: Deployment
```
1. Run /deploy for Docker/Kubernetes setup
2. > Use deployment-specialist for production config
```

### Phase 5: Release
```
1. Run /code-review for final quality check
2. > Use security-auditor for security scan
3. > Use intermediate-reviewer for final critique
4. > Use gh-manager to sync with GitHub Projects
5. > Use doc-updater to sync documentation
```

---

## Quick Debugging

```
When facing issues:
1. > Use ultrathink-analyst for deep analysis
2. > Use build-error-resolver for build/type errors
3. > Use ui-engineer for frontend issues
4. > Use flutter-specialist for mobile issues
5. > Use deployment-specialist for infrastructure issues
```

---

## Agent Files

All agent files are in `.claude/agents/`:

### Core Agents
| File | Agent |
|------|-------|
| `planner.md` | Feature implementation planning |
| `architect.md` | System design decisions |
| `tdd-guide.md` | TDD methodology |
| `code-reviewer.md` | Quality and security review |
| `build-error-resolver.md` | Build/TypeScript error fixing |
| `e2e-runner.md` | Playwright E2E testing |
| `refactor-cleaner.md` | Dead code elimination |
| `doc-updater.md` | Documentation synchronization |

### Enhanced Agents
| File | Agent |
|------|-------|
| `deep-reflector.md` | Session analysis and learning capture |
| `deployment-specialist.md` | Docker/Kubernetes deployment |
| `documentation-validator.md` | Documentation validation |
| `flutter-specialist.md` | Flutter mobile/desktop apps |
| `framework-advisor.md` | Framework selection guidance |
| `gh-manager.md` | GitHub project management |
| `gold-standards-validator.md` | Compliance checking |
| `intermediate-reviewer.md` | Checkpoint reviews |
| `requirements-analyst.md` | Requirements breakdown |
| `security-auditor.md` | Security analysis |
| `todo-manager.md` | Task management |
| `ui-engineer.md` | UI/UX specialist |
| `ultrathink-analyst.md` | Deep failure analysis |
