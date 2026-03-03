---
description: Cluster mature instincts into commands, skills, or agents
ecc_base_version: "5230892"
last_synced: "2026-01-30"
customizations: "SDK adaptation"
---

# /evolve - Instinct Evolution

Analyzes learned instincts and clusters related ones into higher-level structures.

## Workflow

```
/learn → /instinct → /evolve
   ↓         ↓          ↓
Extract   Manage    Generate
patterns  instincts  commands/skills/agents
```

## Usage

```bash
/evolve                    # Analyze and suggest evolutions
/evolve --domain testing   # Only evolve testing instincts
/evolve --dry-run          # Preview without creating
/evolve --execute          # Create the structures
/evolve --threshold 5      # Require 5+ related instincts
```

## Evolution Types

| Type | When to Create | Example |
|------|----------------|---------|
| **Command** | User-invoked actions | `/new-table` from migration instincts |
| **Skill** | Auto-triggered behaviors | `functional-patterns` from code style instincts |
| **Agent** | Complex multi-step processes | `debugger` from debugging workflow instincts |

## Evolution Rules

### → Command (User-Invoked)
When instincts describe actions a user would explicitly request:
- Multiple instincts about "when user asks to..."
- Instincts with triggers like "when creating a new X"
- Instincts that follow a repeatable sequence

Example cluster:
- `new-table-step1`: "when adding a database table, create migration"
- `new-table-step2`: "when adding a database table, update schema"
- `new-table-step3`: "when adding a database table, regenerate types"

→ Creates: `/new-table` command

### → Skill (Auto-Triggered)
When instincts describe behaviors that should happen automatically:
- Pattern-matching triggers
- Error handling responses
- Code style enforcement

Example cluster:
- `prefer-functional`: "when writing functions, prefer functional style"
- `use-immutable`: "when modifying state, use immutable patterns"
- `avoid-classes`: "when designing modules, avoid class-based design"

→ Creates: `functional-patterns` skill

### → Agent (Needs Depth/Isolation)
When instincts describe complex, multi-step processes:
- Debugging workflows
- Refactoring sequences
- Research tasks

Example cluster:
- `debug-step1`: "when debugging, first check logs"
- `debug-step2`: "when debugging, isolate the failing component"
- `debug-step3`: "when debugging, create minimal reproduction"
- `debug-step4`: "when debugging, verify fix with test"

→ Creates: `debugger` agent

## Output Format

```
Evolve Analysis
==================

Found 2 clusters ready for evolution:

## Cluster 1: Database Migration Workflow
Instincts: new-table-migration, update-schema, regenerate-types
Type: Command
Confidence: 85% (based on 12 observations)

Would create: /new-table command
Location: ~/.claude/homunculus/evolved/commands/new-table.md

## Cluster 2: Functional Code Style
Instincts: prefer-functional, use-immutable, avoid-classes
Type: Skill
Confidence: 78% (based on 8 observations)

Would create: functional-patterns skill
Location: ~/.claude/homunculus/evolved/skills/functional-patterns.md

---
Run `/evolve --execute` to create these files.
```

## Flags

| Flag | Description |
|------|-------------|
| `--execute` | Create the evolved structures (default is preview) |
| `--dry-run` | Preview without creating |
| `--domain <name>` | Only evolve instincts in specified domain |
| `--threshold <n>` | Minimum instincts to form cluster (default: 3) |
| `--type <command\|skill\|agent>` | Only create specified type |

## Storage Locations

| Type | Path |
|------|------|
| Evolved commands | `~/.claude/homunculus/evolved/commands/` |
| Evolved skills | `~/.claude/homunculus/evolved/skills/` |
| Evolved agents | `~/.claude/homunculus/evolved/agents/` |

## Related Commands

- `/learn` - Extract patterns from session (creates instincts)
- `/instinct` - View and manage instincts

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /create-command - Create a new custom command from evolved patterns
---
```
