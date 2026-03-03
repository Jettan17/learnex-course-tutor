---
description: Create or verify a checkpoint in your workflow
ecc_base_version: "5230892"
last_synced: "2026-01-28"
customizations: "Agent escalation, --push flag, docs/checkpoints/ directory"
---

# Checkpoint Command

Create or verify a checkpoint in your workflow.

## Usage

`/checkpoint [create|verify|list] [name] [--push]`

## Create Checkpoint

When creating a checkpoint:

1. Run `/verify quick` to ensure current state is clean

2. Create `docs/checkpoints/` directory if it doesn't exist:
```bash
mkdir -p docs/checkpoints
```

3. Prompt user for checkpoint name/description

4. Create a git commit with checkpoint name

5. Save detailed checkpoint file to `docs/checkpoints/YYYY-MM-DD-<name>.md`:
```markdown
# Checkpoint: <name>

Created: YYYY-MM-DD HH:MM
Git SHA: <short-sha>
Branch: <branch-name>

## Summary
<user-provided description or auto-generated summary>

## Files Changed (since last checkpoint)
- file1.ts (added)
- file2.ts (modified)

## Test Status
- Unit: X passed
- Integration: Y passed
- E2E: Z passed
- Coverage: XX%

## Notes
<any relevant notes>
```

6. Log checkpoint to `.claude/checkpoints.log` (quick reference index):
```bash
echo "$(date +%Y-%m-%d-%H:%M) | $CHECKPOINT_NAME | $(git rev-parse --short HEAD) | docs/checkpoints/YYYY-MM-DD-<name>.md" >> .claude/checkpoints.log
```

7. If `--push` flag is provided, push to remote:
```bash
git push origin $(git branch --show-current)
```

8. Report checkpoint created (and pushed if applicable)

## Verify Checkpoint

When verifying against a checkpoint:

1. Read checkpoint from `docs/checkpoints/` or log
2. Compare current state to checkpoint:
   - Files added since checkpoint
   - Files modified since checkpoint
   - Test pass rate now vs then
   - Coverage now vs then

3. Report:
```
CHECKPOINT COMPARISON: $NAME
============================
Files changed: X
Tests: +Y passed / -Z failed
Coverage: +X% / -Y%
Build: [PASS/FAIL]
```

## List Checkpoints

Show all checkpoints from `docs/checkpoints/` with:
- Name
- Timestamp
- Git SHA
- File path
- Status (current, behind, ahead)

## Workflow

Typical checkpoint flow:

```
[Start] --> /checkpoint create "feature-start"
   |
[Implement] --> /checkpoint create "core-done"
   |
[Test] --> /checkpoint verify "core-done"
   |
[Refactor] --> /checkpoint create "refactor-done" --push
   |
[PR] --> /checkpoint verify "feature-start"
```

## Examples

```bash
# Create local checkpoint only
/checkpoint create "api-complete"
# Creates: docs/checkpoints/2026-01-28-api-complete.md

# Create checkpoint and push to remote
/checkpoint create "v1-ready" --push
# Creates: docs/checkpoints/2026-01-28-v1-ready.md + pushes

# Verify against a previous checkpoint
/checkpoint verify "api-complete"

# List all checkpoints
/checkpoint list

# Clean up old checkpoints
/checkpoint clear
```

## Directory Structure

```
project/
├── docs/
│   └── checkpoints/
│       ├── 2026-01-25-feature-start.md
│       ├── 2026-01-26-core-done.md
│       └── 2026-01-28-v1-ready.md
└── .claude/
    └── checkpoints.log    # Quick reference index
```

## Arguments

$ARGUMENTS:
- `create <name>` - Create named checkpoint (commit only)
- `create <name> --push` - Create checkpoint and push to remote
- `verify <name>` - Verify against named checkpoint
- `list` - Show all checkpoints
- `clear` - Remove old checkpoints (keeps last 5)

## Flags

| Flag | Description |
|------|-------------|
| `--push` | Push to remote after creating checkpoint |

## Agent Escalation

This command automatically escalates to specialized agents when:

| Condition | Agent | Purpose |
|-----------|-------|---------|
| Checkpoint verification | **intermediate-reviewer** | Progress review at milestones |
| Quality validation | **code-reviewer** | Review code quality at checkpoint |
| Coverage check | **testing-specialist** | Validate test coverage at checkpoint |

### Escalation Triggers
- **intermediate-reviewer**: Use for milestone reviews and progress validation
- **code-reviewer**: Use to ensure quality before creating checkpoint
- **testing-specialist**: Use to verify test coverage meets standards

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /deploy - Deploy the application
 Or: /run - Continue development with next feature
---
```
