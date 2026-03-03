---
description: Create a new version release with proper versioning and documentation updates
origin: "jetflux-learned"
created: "2026-01-30"
---

# /release - Version Release

Create a new version release with all necessary updates.

## Usage

```bash
/release                    # Interactive - prompts for version
/release patch              # Bump patch version (1.0.0 → 1.0.1)
/release minor              # Bump minor version (1.0.0 → 1.1.0)
/release major              # Bump major version (1.0.0 → 2.0.0)
/release v2.5.0             # Explicit version
```

## Release Checklist

This command ensures ALL release steps are completed:

### 1. Version Updates
- [ ] **README.md** - Update version in title header
- [ ] **package.json** - Update version field (if applicable)
- [ ] **CHANGELOG.md** - Add release notes (if exists)

### 2. Verification
- [ ] Run `/verify` to ensure clean state
- [ ] All tests passing
- [ ] No uncommitted changes (except version bumps)

### 3. Git Operations
- [ ] Stage version-related file changes
- [ ] Commit with message: `release: vX.X.X - [summary]`
- [ ] Push to remote
- [ ] Create GitHub release with tag

## Process

When you run `/release`:

1. **Detect current version** from README.md or package.json
2. **Calculate new version** based on argument (patch/minor/major)
3. **Update all version references:**
   - README.md title (`# Project Name vX.X`)
   - package.json version field
   - Any other version constants
4. **Run verification** (`/verify quick`)
5. **Prompt for release notes** (or extract from recent commits)
6. **Commit changes** with standardized message
7. **Push to remote**
8. **Create GitHub release** with tag and notes

## Version Detection

Searches for version in this order:
1. `package.json` → `version` field
2. `README.md` → Title pattern `# ... vX.X.X`
3. `pyproject.toml` → `version` field
4. `Cargo.toml` → `version` field

## Examples

```bash
# Bug fix release
/release patch
# v5.2.0 → v5.2.1

# New feature release
/release minor
# v5.2.0 → v5.3.0

# Breaking change release
/release major
# v5.2.0 → v6.0.0

# Explicit version
/release v5.2.1
```

## Output

```
RELEASE: v5.2.1
===============

Version Updates:
✓ README.md (v5.2.0 → v5.2.1)
✓ package.json (v5.2.0 → v5.2.1)

Verification:
✓ Build passing
✓ Tests passing
✓ No lint errors

Git Operations:
✓ Committed: release: v5.2.1 - Bug fixes
✓ Pushed to origin/main
✓ Created GitHub release

Release URL: https://github.com/user/repo/releases/tag/v5.2.1
```

## Flags

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview changes without executing |
| `--no-verify` | Skip verification step |
| `--no-push` | Commit locally but don't push |
| `--no-gh-release` | Skip GitHub release creation |

## Notes

- Always updates README version header (learned from forgetting this!)
- Follows semver conventions
- Creates annotated git tags
- Generates release notes from commit history if not provided

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /learn - Extract patterns from this development cycle
 Or: /update-docs - Ensure all documentation is current
---
```
