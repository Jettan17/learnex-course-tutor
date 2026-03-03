---
description: Restate requirements, assess risks, and create step-by-step implementation plan. Saves plan to file for /run execution.
ecc_base_version: "5230892"
last_synced: "2026-01-28"
customizations: "Plan-only mode, saves to .claude/plans/current.md, includes TDD recommendation"
---

# /design - Implementation Planning

This command creates a comprehensive implementation plan and saves it for later execution with `/run`. **Does NOT implement code.**

---

## ⚠️ CRITICAL BEHAVIOR RULES (MUST FOLLOW)

### 1. NEVER Enter Plan Mode
- **DO NOT** use `EnterPlanMode` tool
- **DO NOT** switch to Claude's built-in plan mode
- Work directly in the current conversation

### 2. NEVER Execute Anything
- **DO NOT** write code, create files (except the plan), or make changes
- **DO NOT** run tests, builds, or any commands
- **ONLY** write to `.claude/plans/current.md`
- Execution is **exclusively** handled by `/run`

### 3. Add vs. Overwrite Logic
Before writing the plan, **CHECK** `.claude/plans/current.md`:

| Plan File State | Action |
|-----------------|--------|
| File doesn't exist | CREATE new plan |
| `Status: pending` | **ADD** new phases to existing plan |
| `Status: in_progress` | **ADD** new phases to existing plan |
| `Status: completed` | **OVERWRITE** with new plan |

**How to ADD to an existing plan:**
1. Read the existing plan from `.claude/plans/current.md`
2. Keep all existing phases and content
3. Add new phases after the existing ones (increment phase numbers)
4. Update the title if needed to reflect combined scope
5. Preserve original creation timestamp, add "Updated: [timestamp]"

**How to OVERWRITE:**
1. Replace entire plan file with new content
2. Set new "Created: [timestamp]"
3. Set `Status: pending`

---

## What This Command Does

1. **Check Current Plan** - Read `.claude/plans/current.md` to determine add vs. overwrite
2. **Restate Requirements** - Clarify what needs to be built
3. **Identify Risks** - Surface potential issues and blockers
4. **Create Step Plan** - Break down implementation into phases
5. **Recommend TDD** - Determine if test-driven development is appropriate
6. **Save Plan** - Write/update `.claude/plans/current.md`
7. **Stop** - Wait for user to run `/run` to execute

## When to Use

Use `/design` when:
- Starting a new feature
- Making significant architectural changes
- Working on complex refactoring
- Multiple files/components will be affected
- Requirements are unclear or ambiguous

## How It Works

The planner agent will:

1. **Analyze the request** and restate requirements in clear terms
2. **Break down into phases** with specific, actionable steps
3. **Identify dependencies** between components
4. **Assess risks** and potential blockers
5. **Determine TDD recommendation** based on task type
6. **Save plan** to `.claude/plans/current.md`
7. **Display summary** and prompt user to run `/run`

## Plan File Format

Plans are saved to `.claude/plans/current.md` with this structure:

```markdown
# Implementation Plan: [Title]

Created: [timestamp]
Updated: [timestamp] (only if plan was added to)
Status: pending | in_progress | completed

## Requirements
[restated requirements in clear terms]

## Implementation Phases

### Phase 1: [Name]
- [ ] Step 1
- [ ] Step 2

### Phase 2: [Name]
- [ ] Step 1
- [ ] Step 2

## Dependencies
- [list of dependencies]

## Risks
- HIGH: [description]
- MEDIUM: [description]
- LOW: [description]

## TDD Recommended: Yes/No
**Reason:** [explanation of why TDD is or isn't recommended]

## Test Strategy

### Detected Code Types
| Phase | Files | Code Type | Primary Tests | Secondary Tests |
|-------|-------|-----------|---------------|-----------------|
| 1 | lib/utils.ts | Utility | Unit | - |
| 2 | components/Button.tsx | UI Component | Unit | E2E |
| 3 | api/users.ts | API Endpoint | Integration (NO MOCK) | - |

### Test Execution Plan
1. Unit Tests (run first, fastest feedback)
2. Integration Tests (NO MOCKING - real Docker services)
3. E2E Tests (run last, verify user journeys)
```

## Plan Status Values

| Status | Meaning | Set By | /design Behavior |
|--------|---------|--------|------------------|
| `pending` | Plan created, not yet executed | `/design` | **ADD** new phases |
| `in_progress` | Plan is being executed by `/run` | `/run` | **ADD** new phases |
| `completed` | Plan fully executed | `/run` | **OVERWRITE** with new plan |

**Important:** Only `/run` should change status from `pending` → `in_progress` → `completed`. The `/design` command NEVER changes the status except when creating a brand new plan (sets to `pending`).

---

## Code Type Detection Heuristics

The planner automatically detects code types based on file paths:

| Path Pattern | Code Type | Primary Tests | Secondary Tests |
|--------------|-----------|---------------|-----------------|
| `components/`, `ui/` | UI Component | Unit | E2E |
| `api/`, `handlers/`, `routes/` | API Endpoint | Integration (NO MOCK) | Unit |
| `utils/`, `lib/`, `helpers/` | Utility | Unit | - |
| `services/` | Service | Integration | Unit |
| `models/`, `db/`, `prisma/` | Data Layer | Integration | - |
| `pages/`, `app/` | Page/Route | E2E | Unit |
| `hooks/` | React Hook | Unit | - |
| `middleware/` | Middleware | Integration | Unit |

### Test Type Definitions

| Test Type | Purpose | Mocking Policy |
|-----------|---------|----------------|
| **Unit** | Test isolated functions/components | Mocking ALLOWED |
| **Integration** | Test service interactions | NO MOCKING - real services |
| **E2E** | Test user journeys | NO MOCKING - real infrastructure |

## TDD Recommendation Logic

| Scenario | TDD Recommended | Reason |
|----------|-----------------|--------|
| New feature with code | **Yes** | Tests define expected behavior |
| Bug fix | **Yes** | Test reproduces bug first |
| Code refactoring | **Yes** | Tests ensure behavior preserved |
| Documentation only | No | No code to test |
| Architecture decisions | No | Planning phase, no implementation |
| Config changes | No | Usually validated by running |
| UI styling only | No | Visual changes, hard to test |
| Database migrations | No | Usually tested by running migration |

## Example Usage

```
User: /design I need to add real-time notifications when markets resolve

Agent (planner):
# Implementation Plan: Real-Time Market Resolution Notifications

## Requirements Restatement
- Send notifications to users when markets they're watching resolve
- Support multiple notification channels (in-app, email, webhook)
- Ensure notifications are delivered reliably
- Include market outcome and user's position result

## Implementation Phases

### Phase 1: Database Schema
- [ ] Add notifications table
- [ ] Add user_notification_preferences table
- [ ] Create indexes for performance

### Phase 2: Notification Service
- [ ] Create notification service in lib/notifications.ts
- [ ] Implement notification queue
- [ ] Add retry logic
- [ ] Create notification templates

### Phase 3: Integration Points
- [ ] Hook into market resolution logic
- [ ] Query affected users
- [ ] Enqueue notifications

### Phase 4: Frontend Components
- [ ] Create NotificationBell component
- [ ] Add NotificationList modal
- [ ] Implement real-time updates
- [ ] Add preferences page

## Dependencies
- Redis (for queue)
- Email service (SendGrid/Resend)
- Supabase real-time subscriptions

## Risks
- HIGH: Email deliverability (SPF/DKIM required)
- MEDIUM: Performance with 1000+ users per market
- MEDIUM: Notification spam if markets resolve frequently

## TDD Recommended: Yes
**Reason:** This is a new feature with significant code changes across multiple files. Tests will ensure notification logic works correctly before deployment.

---

Plan saved to `.claude/plans/current.md`

Run `/run` to execute this plan.
```

## Modifying Plans

Before running `/run`, you can:
- Edit `.claude/plans/current.md` directly
- Run `/design` again to **add more phases** (since status is still `pending`)
- Ask for clarification: "What about handling rate limits?"

After running `/run` (status becomes `completed`):
- Running `/design` will **overwrite** with a completely new plan
- Edit manually if you want to preserve and extend the old plan

## Integration with Other Commands

```
/design "Add feature"  →  Creates plan, saves to file
/run                   →  Executes plan (with TDD if recommended)
/tdd                   →  Run tests only (after implementation)
/verify                →  Full verification
```

## Agent Escalation

This command automatically escalates to specialized agents when:

| Condition | Agent | Purpose |
|-----------|-------|---------|
| Complex requirements, systemic issues | **ultrathink-analyst** | Deep failure analysis, comprehensive requirement breakdown |
| Architecture decisions needed | **requirements-analyst** | ADR creation, systematic requirements breakdown |
| Technology selection required | **framework-advisor** | Tech stack decisions, framework recommendations |

### Escalation Triggers
- **ultrathink-analyst**: Use when task touches 3+ components, has unclear failure modes, or needs risk analysis
- **requirements-analyst**: Use when creating new architecture, making significant design decisions, or need formal ADRs
- **framework-advisor**: Use when choosing between frameworks, libraries, or implementation approaches

## Related Commands

- `/run` - Execute the saved plan
- `/tdd` - Run tests (after implementation)
- `/verify` - Full verification after implementation
- `/code-review` - Review completed implementation

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /run - Execute this plan
 Or: /design "add phase" - Extend plan with additional phases
 Or: /wordlist - Build domain vocabulary before implementation
---
```
