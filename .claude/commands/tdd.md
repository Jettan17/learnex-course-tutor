---
description: Test utilities - run tests, analyze coverage, execute E2E tests. Does NOT implement code.
ecc_base_version: "5230892"
last_synced: "2026-01-28"
customizations: "Test utilities only, implementation moved to /run"
---

# /tdd - Test Utilities

Run and analyze tests. **Does NOT implement code** - use `/run` for implementation.

## Usage

```bash
/tdd                    # Run all tests
/tdd unit               # Run unit tests only
/tdd integration        # Run integration tests (NO MOCKING enforced)
/tdd e2e                # Run E2E tests with Playwright
/tdd coverage           # Analyze coverage, show gaps
/tdd --full             # All tests + coverage report
/tdd --from-plan        # Run tests based on plan's Test Strategy
```

## What This Command Does

| Mode | Action |
|------|--------|
| Default | Run all tests in the project |
| `unit` | Run unit tests only |
| `integration` | Run integration tests (validates NO MOCKING policy) |
| `e2e` | Run Playwright E2E tests |
| `coverage` | Analyze coverage and show uncovered files |
| `--full` | All test types + coverage + no-stubs check |
| `--from-plan` | Read Test Strategy from `.claude/plans/current.md` and run appropriate tests |

## Mode: Default (Run All Tests)

Runs the project's test suite:

```
/tdd

Agent:
Running all tests...

 PASS  tests/unit/utils.test.ts (8 tests)
 PASS  tests/unit/api.test.ts (12 tests)
 PASS  tests/integration/db.test.ts (5 tests)

Test Suites: 3 passed, 3 total
Tests:       25 passed, 25 total
Time:        4.2s
```

## Mode: `unit`

Focus on unit tests only:

```
/tdd unit

Agent:
Running unit tests...

 PASS  tests/unit/utils.test.ts
   ✓ formatCurrency formats correctly (3ms)
   ✓ parseDate handles ISO format (2ms)
   ✓ validateInput rejects empty (1ms)

Tests: 8 passed
Time:  1.2s
```

## Mode: `integration`

Integration tests with **NO MOCKING** policy enforcement:

```
/tdd integration

Agent:
Checking NO MOCKING policy...
 ✓ No jest.mock found
 ✓ No vi.mock found
 ✓ No @patch decorators found

Running integration tests...

 PASS  tests/integration/api.test.ts
   ✓ POST /api/users creates user (120ms)
   ✓ GET /api/users returns list (45ms)

Tests: 5 passed
Time:  8.4s
```

### NO MOCKING Policy

| Test Tier | Mocking Allowed? | Infrastructure |
|-----------|------------------|----------------|
| Unit | Yes | In-memory, mocked |
| Integration | **NO** | Real Docker services |
| E2E | **NO** | Real infrastructure |

**Why NO MOCKING?**
1. Mocks hide real integration issues
2. Real infrastructure catches actual bugs
3. Production-like testing prevents surprises

**Forbidden patterns in integration/E2E:**
```bash
jest.mock()      # ❌
vi.mock()        # ❌
@patch()         # ❌ (Python)
sinon.stub()     # ❌
```

## Mode: `e2e`

End-to-end tests with Playwright:

```
/tdd e2e

Agent:
Running E2E tests with Playwright...

Running 12 tests using 3 workers

  ✓ user-flow.spec.ts:5 - login flow (4.2s)
  ✓ user-flow.spec.ts:15 - signup flow (5.1s)
  ✓ market.spec.ts:8 - search markets (3.8s)

12 passed (45.2s)

Artifacts:
- Screenshots: test-results/screenshots/
- Videos: test-results/videos/
- HTML Report: playwright-report/index.html

View report: npx playwright show-report
```

### E2E Best Practices

**DO:**
- Use Page Object Model pattern
- Use `data-testid` attributes for selectors
- Run tests in CI with retries
- Capture artifacts on failure

**DON'T:**
- Use brittle CSS selectors
- Mock API calls
- Ignore flaky tests
- Skip cross-browser testing

## Mode: `coverage`

Analyze test coverage and identify gaps:

```
/tdd coverage

Agent:
Running tests with coverage...

File                    | Stmts | Branch | Funcs | Lines |
------------------------|-------|--------|-------|-------|
lib/utils.ts            |  92%  |  88%   |  95%  |  92%  | ✓
lib/api.ts              |  85%  |  80%   |  90%  |  85%  | ✓
lib/notifications.ts    |  45%  |  30%   |  50%  |  45%  | ✗
lib/auth.ts             |  78%  |  70%   |  85%  |  78%  | ✗

Overall Coverage: 75%

## Files Below 80% Threshold

### lib/notifications.ts (45%)
Uncovered lines: 23-45, 67-89
Missing tests for:
- sendNotification()
- retryFailedNotifications()

### lib/auth.ts (78%)
Uncovered lines: 112-118
Missing tests for:
- refreshToken() error path
```

## Flag: `--full`

Complete test suite with all checks:

```
/tdd --full

Agent:
## Running Full Test Suite

### 1. Unit Tests
25 passed ✓

### 2. Integration Tests (NO MOCKING enforced)
 ✓ Policy check passed
12 passed ✓

### 3. E2E Tests
8 passed ✓

### 4. Coverage Analysis
Overall: 87% ✓

### 5. No-Stubs Validation
 ✓ No lorem ipsum found
 ✓ No "Coming soon" placeholders
 ✓ No empty function bodies
 ✓ No TODO comments in tests

All checks passed ✓
```

## No-Stubs Validation

Checked with `--full` flag:

| Category | Forbidden Patterns |
|----------|-------------------|
| UI | Lorem ipsum, "Coming soon", "TBD", empty pages |
| Code | `pass` without impl, `// TODO:`, empty functions |
| Errors | `throw new Error("Not implemented")` |
| Tests | Skipped tests without reason, placeholder assertions |

**The Rule:** If a feature isn't ready, don't include it at all.

## Coverage Requirements

- **80% minimum** for all code
- **100% required** for:
  - Financial calculations
  - Authentication logic
  - Security-critical code
  - Core business logic

## Quick Commands Reference

```bash
# Unit tests
npm test
npm test -- --coverage
npm test -- --watch

# E2E tests
npx playwright test
npx playwright test --headed
npx playwright test --debug
npx playwright show-report

# Specific file
npm test -- path/to/file.test.ts

# Coverage
npm test -- --coverage --coverageReporters=text
```

## Agent Escalation

| Condition | Agent | Purpose |
|-----------|-------|---------|
| React/Next.js testing | **ui-engineer** | React 19 testing patterns |
| Flutter testing | **flutter-specialist** | Widget/integration tests |
| NO MOCKING violations | **gold-standards-validator** | Policy enforcement |
| Test infrastructure | **deployment-specialist** | Docker test environment |
| Flaky tests | **intermediate-reviewer** | Diagnose instability |

## Related Commands

- `/design` - Plan what to build
- `/run` - Execute plan with TDD workflow
- `/verify` - Full verification including tests
- `/code-review` - Review test quality
- `/build-fix` - Fix build errors

## Flag: `--from-plan`

Run tests based on the Test Strategy in the current plan:

```
/tdd --from-plan

Agent:
Reading Test Strategy from .claude/plans/current.md...

## Test Strategy Loaded

| Phase | Code Type | Tests to Run |
|-------|-----------|--------------|
| 1 | API Endpoint | Integration (NO MOCK) |
| 2 | UI Component | Unit + E2E |
| 3 | Utility | Unit |

Running tests by code type...

### API Endpoints (Integration)
  + tests/integration/users.test.ts - 5 passed
  + tests/integration/auth.test.ts - 3 passed
NO MOCKING policy: VERIFIED

### UI Components (Unit + E2E)
  + tests/unit/Button.test.tsx - 8 passed
  + tests/e2e/user-profile.spec.ts - 2 passed

### Utilities (Unit)
  + tests/unit/formatters.test.ts - 12 passed

All tests passed
```

This is useful after `/design` to validate tests exist before running `/run`.

## Workflow

```
/design "Add feature"  →  Creates plan with TDD recommendation
/run                   →  Implements with TDD if recommended
/tdd                   →  Run tests to verify (you are here)
/tdd coverage          →  Check coverage gaps
/verify                →  Full verification
```

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /verify - Run full verification (build, types, lint, tests)
 Or: /tdd coverage - Analyze test coverage gaps
 Or: /code-review - Review code quality and security
---
```
