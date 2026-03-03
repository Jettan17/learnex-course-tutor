---
description: Execute the current design plan with smart TDD integration
ecc_base_version: "5230892"
last_synced: "2026-01-28"
customizations: "New command for plan execution"
---

# /run - Execute Plan

Executes the implementation plan saved by `/design`. Automatically applies TDD workflow when recommended.

## What This Command Does

1. **Read Plan** - Load plan from `.claude/plans/current.md`
2. **Validate Plan** - Check plan exists and is well-formed
3. **Check TDD Recommendation** - Read the TDD recommendation from the plan
4. **Read Test Strategy** - Load test types for each phase from the plan
5. **Execute Implementation:**
   - If TDD Recommended = Yes: Full TDD cycle (RED → GREEN → REFACTOR)
   - If TDD Recommended = No: Direct implementation
6. **Run Appropriate Tests** - Based on detected code types:
   - UI Components → Unit + E2E
   - API Endpoints → Integration (NO MOCK)
   - Utilities → Unit only
   - Services → Integration + Unit
7. **Update Plan Status** - Mark phases as completed
8. **Verify** - Ensure implementation matches plan requirements

## Usage

```bash
/run                    # Execute current plan (respects TDD recommendation)
/run --force-tdd        # Force TDD even if plan says No
/run --no-tdd           # Skip TDD even if plan says Yes
/run --phase 2          # Start from specific phase
/run --dry-run          # Show what would be done without executing
/run --test-type unit   # Run only unit tests for each phase
/run --test-type integration  # Run only integration tests
/run --test-type e2e    # Run only E2E tests
/run --test-type all    # Run all test types (default when TDD=Yes)
```

## How It Works

### With TDD (Recommended = Yes)

For each implementation phase:

```
1. Write failing tests (RED)
   - Create test files for the phase
   - Define expected behavior
   - Run tests → verify they FAIL

2. Implement minimal code (GREEN)
   - Write just enough code to pass tests
   - Run tests → verify they PASS

3. Refactor (REFACTOR)
   - Improve code quality
   - Keep tests passing
   - Check coverage

4. Mark phase complete
   - Update plan status
   - Move to next phase
```

### Without TDD (Recommended = No)

For each implementation phase:

```
1. Implement changes directly
   - Follow plan steps
   - Verify build succeeds

2. Manual verification
   - Check changes work as expected
   - Run any existing tests

3. Mark phase complete
   - Update plan status
   - Move to next phase
```

## Error Handling

| Condition | Behavior |
|-----------|----------|
| No plan exists | Error: "No plan found. Run `/design` first." |
| Plan is stale (>24h) | Warning: "Plan is X hours old. Continue? (y/n)" |
| Tests fail | Stop and report: "Tests failing. Fix before continuing." |
| Build fails | Stop and suggest: "Build error. Run `/build-fix`." |
| Phase incomplete | Allow retry: "Phase X incomplete. Retry? (y/n)" |

## Example: TDD Execution

```
User: /run

Agent:
Reading plan from .claude/plans/current.md...

# Executing: Real-Time Market Resolution Notifications
TDD Recommended: Yes

## Phase 1: Database Schema (TDD)

### RED: Writing failing tests...
- tests/db/notifications.test.ts
  - should create notifications table
  - should create user_notification_preferences table
  - should have required indexes

Running tests... 3 failing ✗

### GREEN: Implementing schema...
- migrations/001_notifications.sql
- lib/db/notifications.ts

Running tests... 3 passing ✓

### REFACTOR: Cleanup...
- Added TypeScript types
- Extracted constants

Running tests... 3 passing ✓

Phase 1 complete ✓

## Phase 2: Notification Service (TDD)

### RED: Writing failing tests...
[continues...]
```

## Example: Non-TDD Execution

```
User: /run

Agent:
Reading plan from .claude/plans/current.md...

# Executing: Update README Documentation
TDD Recommended: No (documentation only)

## Phase 1: Update Feature List

Implementing...
- Updated README.md with new features
- Added usage examples
- Fixed outdated links

Build check... ✓

Phase 1 complete ✓

## Phase 2: Add API Documentation

Implementing...
- Created docs/api.md
- Added endpoint documentation
- Included request/response examples

Build check... ✓

Phase 2 complete ✓

All phases complete. Run `/verify` to validate.
```

## Plan Status Updates

The `/run` command is **the ONLY command** that modifies plan status. Status transitions:

| Transition | When |
|------------|------|
| `pending` → `in_progress` | When `/run` starts execution |
| `in_progress` → `completed` | When ALL phases are done |
| `in_progress` → `in_progress` | When stopped mid-execution (phases remain) |

**Important:** After setting `Status: completed`, subsequent `/design` calls will **overwrite** the plan entirely.

The `/run` command updates `.claude/plans/current.md` as it executes:

```markdown
# Implementation Plan: [Title]

Created: 2026-01-28T10:00:00Z
Status: in_progress
Started: 2026-01-28T10:30:00Z

## Implementation Phases

### Phase 1: Database Schema ✓
Completed: 2026-01-28T10:45:00Z
- [x] Add notifications table
- [x] Add user_notification_preferences table
- [x] Create indexes for performance

### Phase 2: Notification Service (in progress)
Started: 2026-01-28T10:46:00Z
- [x] Create notification service
- [ ] Implement notification queue
- [ ] Add retry logic
```

**When all phases complete:**

```markdown
# Implementation Plan: [Title]

Created: 2026-01-28T10:00:00Z
Status: completed
Started: 2026-01-28T10:30:00Z
Completed: 2026-01-28T11:15:00Z

## Implementation Phases

### Phase 1: Database Schema ✓
Completed: 2026-01-28T10:45:00Z
- [x] Add notifications table
- [x] Add user_notification_preferences table

### Phase 2: Notification Service ✓
Completed: 2026-01-28T11:15:00Z
- [x] Create notification service
- [x] Implement notification queue
- [x] Add retry logic
```

## Flags

| Flag | Description |
|------|-------------|
| `--force-tdd` | Apply TDD workflow even if plan recommends No |
| `--no-tdd` | Skip TDD workflow even if plan recommends Yes |
| `--phase N` | Start execution from phase N |
| `--dry-run` | Preview execution plan without making changes |
| `--continue` | Resume from last incomplete phase |
| `--test-type <type>` | Override test types: `unit`, `integration`, `e2e`, or `all` |

## Intelligent Test Selection

When the plan includes a Test Strategy section, `/run` automatically selects appropriate tests:

```
Reading Test Strategy from plan...

## Phase 1: Add User API
Code Type: API Endpoint
Primary Tests: Integration (NO MOCK)
Secondary Tests: Unit

Running tests for Phase 1...
  + Unit tests: 5 passed
  + Integration tests: 3 passed (real database)

## Phase 2: Add User Profile Component
Code Type: UI Component
Primary Tests: Unit
Secondary Tests: E2E

Running tests for Phase 2...
  + Unit tests: 8 passed
  + E2E tests: 2 passed (Playwright)
```

### Test Selection Matrix

| Code Type | Primary | Secondary | NO MOCK |
|-----------|---------|-----------|---------|
| UI Component | Unit | E2E | E2E only |
| API Endpoint | Integration | Unit | Integration |
| Utility | Unit | - | N/A |
| Service | Integration | Unit | Integration |
| Data Layer | Integration | - | Integration |
| Page/Route | E2E | Unit | E2E |

## Integration with Other Commands

```
/design "Add feature"  →  Creates plan, saves to file
/run                   →  Executes plan (you are here)
/tdd                   →  Run tests (verification)
/verify                →  Full verification
/code-review           →  Quality review
```

## Agent Escalation

| Condition | Agent | Purpose |
|-----------|-------|---------|
| React/Next.js implementation | **ui-engineer** | React 19, Next.js 15 patterns |
| Flutter implementation | **flutter-specialist** | Mobile patterns |
| Test failures | **intermediate-reviewer** | Diagnose issues |
| Build errors | **build-error-resolver** | Fix compilation |
| Security concerns | **security-auditor** | Security review |

## Related Commands

- `/design` - Create a plan (prerequisite)
- `/tdd` - Run tests after implementation
- `/build-fix` - Fix build errors if they occur
- `/verify` - Full verification after completion
- `/checkpoint` - Save progress state

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /tdd - Run full test suite to verify implementation
 Or: /build-fix - Fix any build errors encountered
 Or: /checkpoint - Save current progress
---
```
