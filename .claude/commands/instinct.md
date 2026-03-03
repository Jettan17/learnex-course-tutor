---
description: Manage learned instincts - view status, export, and import
ecc_base_version: "5230892"
last_synced: "2026-01-30"
customizations: "Consolidated instinct management"
---

# /instinct - Instinct Management

Manage learned instincts from the continuous learning system.

## Workflow

```
/learn → /instinct → /evolve
   ↓         ↓          ↓
Extract   Manage    Generate
patterns  instincts  commands/skills/agents
```

## Usage

```bash
/instinct                      # Show status (default)
/instinct status               # Show all learned instincts
/instinct export               # Export instincts for sharing
/instinct import <file>        # Import instincts from file/URL
```

---

## Subcommand: status (default)

Shows all learned instincts with their confidence scores, grouped by domain.

```bash
/instinct                      # Same as /instinct status
/instinct status
/instinct status --domain code-style
/instinct status --high-confidence
/instinct status --json
```

### Output Format

```
Instinct Status
==================

## Code Style (4 instincts)

### prefer-functional-style
Trigger: when writing new functions
Action: Use functional patterns over classes
Confidence: ######## 80%
Source: session-observation | Last updated: 2026-01-30

### use-path-aliases
Trigger: when importing modules
Action: Use @/ path aliases instead of relative imports
Confidence: ###### 60%
Source: repo-analysis

## Testing (2 instincts)

### test-first-workflow
Trigger: when adding new functionality
Action: Write test first, then implementation
Confidence: ######### 90%
Source: session-observation

---
Total: 9 instincts (4 personal, 5 inherited)
```

### Status Flags

| Flag | Description |
|------|-------------|
| `--domain <name>` | Filter by domain (code-style, testing, git, etc.) |
| `--low-confidence` | Show only instincts with confidence < 0.5 |
| `--high-confidence` | Show only instincts with confidence >= 0.7 |
| `--source <type>` | Filter by source (session-observation, repo-analysis, inherited) |
| `--json` | Output as JSON for programmatic use |

---

## Subcommand: export

Exports instincts to a shareable format for teammates or other projects.

```bash
/instinct export                           # Export all personal instincts
/instinct export --domain testing          # Export only testing instincts
/instinct export --min-confidence 0.7      # Only export high-confidence
/instinct export --output team-instincts.yaml
```

### Export Output

Creates a YAML file:

```yaml
# Instincts Export
# Generated: 2026-01-30
# Count: 12 instincts

version: "2.0"
exported_by: "continuous-learning-v2"
export_date: "2026-01-30T10:30:00Z"

instincts:
  - id: prefer-functional-style
    trigger: "when writing new functions"
    action: "Use functional patterns over classes"
    confidence: 0.8
    domain: code-style
    observations: 8

  - id: test-first-workflow
    trigger: "when adding new functionality"
    action: "Write test first, then implementation"
    confidence: 0.9
    domain: testing
    observations: 12
```

### Privacy

Exports include: triggers, actions, confidence, domains, observation counts.
Exports do NOT include: code snippets, file paths, session transcripts.

### Export Flags

| Flag | Description |
|------|-------------|
| `--domain <name>` | Export only specified domain |
| `--min-confidence <n>` | Minimum confidence threshold (default: 0.3) |
| `--output <file>` | Output file path (default: instincts-export-YYYYMMDD.yaml) |
| `--format <yaml\|json\|md>` | Output format (default: yaml) |

---

## Subcommand: import

Import instincts from teammates, Skill Creator, or community collections.

```bash
/instinct import team-instincts.yaml
/instinct import https://github.com/org/repo/instincts.yaml
/instinct import --from-skill-creator acme/webapp
/instinct import --dry-run team-instincts.yaml
```

### Import Process

```
Importing instincts from: team-instincts.yaml
================================================

Found 12 instincts to import.

## New Instincts (8)
  + use-zod-validation (confidence: 0.7)
  + prefer-named-exports (confidence: 0.65)
  + test-async-functions (confidence: 0.8)

## Duplicate Instincts (3)
  ~ prefer-functional-style
     Local: 0.8 confidence | Import: 0.7 confidence
     -> Keep local (higher confidence)

## Conflicting Instincts (1)
  ! use-classes-for-services
     Conflicts with: avoid-classes
     -> Skip (requires manual resolution)

---
Import 8 new, update 1, skip 3?
```

### Merge Strategies

- **Duplicates**: Higher confidence wins, merge observation counts
- **Conflicts**: Skip by default, flag for manual review

### Import Flags

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview without importing |
| `--force` | Import even if conflicts exist |
| `--merge-strategy <higher\|local\|import>` | How to handle duplicates |
| `--from-skill-creator <owner/repo>` | Import from Skill Creator analysis |
| `--min-confidence <n>` | Only import instincts above threshold |

---

## Storage Locations

| Type | Path |
|------|------|
| Personal instincts | `~/.claude/homunculus/instincts/personal/` |
| Inherited instincts | `~/.claude/homunculus/instincts/inherited/` |
| Evolved commands | `~/.claude/homunculus/evolved/commands/` |
| Evolved skills | `~/.claude/homunculus/evolved/skills/` |
| Evolved agents | `~/.claude/homunculus/evolved/agents/` |

## Related Commands

- `/learn` - Extract patterns from session (creates instincts)
- `/evolve` - Cluster instincts into commands/skills/agents

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /evolve - Cluster mature instincts into commands, skills, or agents
 Or: /learn - Extract more patterns from the current session
---
```
