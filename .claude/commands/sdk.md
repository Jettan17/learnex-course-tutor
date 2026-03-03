---
description: Initialize a new project with JetFlux SDK (full setup)
origin: "jetflux-original"
created: "2026-01-26"
---

# /sdk - Initialize or Update Project

Create a new project with JetFlux SDK, or update an existing project's SDK files.

## Usage

```bash
/sdk                           # Interactive setup in current directory
/sdk my-project                # Create new project in ./my-project
/sdk ../projects/my-app        # Create at specific path
/sdk --update                  # Update SDK files in current project
/sdk my-project --update       # Update SDK files in existing project
```

## Mode Detection

The command automatically detects whether to run in **new project** or **update** mode:

| Condition | Mode | Behavior |
|-----------|------|----------|
| Directory doesn't exist | New | Full initialization |
| Directory exists but no `.claude/` folder | New | Initialize in existing directory |
| Directory has `.claude/` folder | Update | Refresh SDK files only |
| `--update` flag provided | Update | Force update mode |

## What This Does

### For NEW Projects

#### Step 1: Gather Project Settings

Use AskUserQuestion to collect (max 4 questions per call):

**Batch 1:**
| Setting | Options |
|---------|---------|
| **Scope** | Small / Medium / Large |
| **Product Type** | Web / Mobile / Desktop |
| **Usage** | Commercial / Personal |
| **Connection Type** | Local / Public |

**Batch 2:**
| Setting | Options |
|---------|---------|
| **Tech Stack** | Next.js / Astro / React / Vue / Plain HTML / Python / Flutter |
| **Package Manager** | pnpm (Recommended) / npm / yarn / bun |
| **Visual Style** | Minimal / Dark / Colorful / Professional |

Then ask free-text questions (as regular questions, not AskUserQuestion):
- Objective/Use-case
- Data sources (optional)
- External integrations (optional)

### Step 2: Create Project Structure

If path specified, create the directory:
```bash
mkdir [project-path]
```

### Step 3: Copy SDK Files

Copy from JetFlux SDK to new project:
- `.claude/` folder (commands, agents, mcp-configs)
- `CLAUDE.md` (master directives)
- `project-settings.md` (template)

```bash
# PowerShell (Windows)
Copy-Item -Path "[sdk]/.claude" -Destination "[project]/.claude" -Recurse
Copy-Item "[sdk]/CLAUDE.md" "[project]/CLAUDE.md"
Copy-Item "[sdk]/project-settings.md" "[project]/project-settings.md"
```

### Step 4: Initialize Framework

Based on tech stack selection:

| Stack | Command |
|-------|---------|
| **Next.js** | `npx create-next-app@latest . --typescript --tailwind --eslint --app` |
| **Astro** | `npm create astro@latest . -- --template minimal` |
| **React (Vite)** | `npm create vite@latest . -- --template react-ts` |
| **Vue** | `npm create vue@latest .` |
| **Plain HTML** | Create basic `index.html`, `styles.css`, `script.js` |
| **Python** | `python -m venv venv && pip install -r requirements.txt` |
| **Flutter** | `flutter create .` |

**Note:** Some commands require user interaction. Inform user and run command.

### Step 4b: Configure Package Manager

Based on package manager selection, save preference:

```bash
# Create .claude/package-manager.json
echo '{"packageManager": "[selected]"}' > .claude/package-manager.json
```

**Detection Priority** (when determining which package manager to use):
1. Environment variable: `CLAUDE_PACKAGE_MANAGER`
2. Project config: `.claude/package-manager.json`
3. `package.json`: `packageManager` field
4. Lock file presence (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb)
5. Global config: `~/.claude/package-manager.json`
6. Fallback: pnpm > bun > yarn > npm

### Step 5: Update project-settings.md

Replace the Project Settings section with gathered values:

```markdown
# Project Settings

## Scope
[Selected scope]

## Final Product
[Selected product type] - [Selected tech stack]

## Commercial or Personal Use
[Selected usage]

## Local or Public Connection
[Selected connection type]

## Package Manager
[Selected package manager]

## Objective/Use-Case
[User's objective]

## Visual Style
[Selected style]

## Data Sources
[User's data sources or "None specified"]

## External Tool Integration
[User's integrations or "None initially"]
```

### Step 6: Generate README.md

Run `/update-docs --readme` logic to create project-specific README.

#### Step 7: Initialize Git (Optional)

Ask user if they want to initialize git:
```bash
git init
git add .
git commit -m "Initial commit: Project setup with JetFlux SDK"
```

---

### For EXISTING Projects (Update Mode)

When updating an existing project's SDK files:

#### Step 1: Detect SDK Location

Find the JetFlux SDK source directory. Check in order:
1. Environment variable `JETFLUX_SDK_PATH`
2. `~/.jetflux-sdk/` (default installation)
3. Sibling directory `../jetflux-cc-sdk/`
4. Ask user for SDK location if not found

#### Step 2: Backup Current SDK Files (Optional)

Ask user if they want to backup before updating:
```bash
# Create timestamped backup
Copy-Item -Path ".claude" -Destination ".claude.backup.YYYYMMDD" -Recurse
```

#### Step 3: Update SDK Files (Existing Files Only)

**IMPORTANT:** The target project's directory structure is the source of truth. Only update files that already exist in the target project - do NOT add new files from the SDK.

This ensures that files intentionally removed from a project (e.g., language-specific commands, e2e, no-stubs) are not re-added during updates.

**Update Algorithm:**

```bash
# PowerShell (Windows)

# 1. Get list of existing files in target project's .claude folder
$existingFiles = Get-ChildItem -Path ".claude" -Recurse -File |
    ForEach-Object { $_.FullName.Replace((Get-Location).Path + "\.claude\", "") }

# 2. For each existing file, update it from SDK source (if SDK has it)
foreach ($file in $existingFiles) {
    $sdkFile = Join-Path "[sdk]/.claude" $file
    $targetFile = Join-Path ".claude" $file

    if (Test-Path $sdkFile) {
        Copy-Item $sdkFile $targetFile -Force
    }
}

# 3. Update CLAUDE.md (always update, it's the master directives)
Copy-Item "[sdk]/CLAUDE.md" "CLAUDE.md" -Force

# PRESERVE project-settings.md - don't overwrite (contains project settings)
```

**Bash/Unix equivalent:**
```bash
# Find existing files and update only those
find .claude -type f | while read target_file; do
    relative_path="${target_file#.claude/}"
    sdk_file="[sdk]/.claude/$relative_path"

    if [ -f "$sdk_file" ]; then
        cp "$sdk_file" "$target_file"
    fi
done

# Update CLAUDE.md
cp "[sdk]/CLAUDE.md" "CLAUDE.md"
```

**What this means:**
- ✅ Files that exist in target AND SDK → Updated
- ✅ Files that exist only in target (custom) → Preserved unchanged
- ❌ Files that exist only in SDK (new) → NOT added
- ✅ `project-settings.md` → Always preserved (never overwritten)

**Important:** `project-settings.md` is NOT overwritten during updates to preserve project settings.

#### Step 4: Show Update Summary

Display what was updated:
```
SDK files updated successfully!

Updated (existing files only):
- .claude/commands/ (X files updated)
- .claude/agents/ (X files updated)
- .claude/mcp-configs/ (X files updated)
- CLAUDE.md

Preserved (project-specific):
- project-settings.md
- Any custom files not in SDK

Skipped (not in target project):
- [List any SDK files not present in target]

SDK Version: [commit hash or date]
```

---

## Output

After completion, display:

```
Project initialized successfully!

Location: [full path]
Tech Stack: [stack]
Scope: [scope]

Next steps:
1. cd [project-path]
2. npm install (or appropriate command)
3. npm run dev

Available commands:
- /design   - Plan features
- /tdd      - Test-driven development
- /verify   - Run checks
```

## Arguments

- `[path]` - Optional. Project directory path. Defaults to current directory.
- `--update` - Force update mode (refresh SDK files in existing project)
- `--no-git` - Skip git initialization (new projects only)
- `--no-framework` - Skip framework scaffolding (new projects only)
- `--no-backup` - Skip backup prompt during updates
- `--pm <manager>` - Set package manager directly (pnpm/npm/yarn/bun)
- `--pm detect` - Auto-detect package manager from lockfiles

## Agent Escalation

| Condition | Agent | Purpose |
|-----------|-------|---------|
| Tech stack selection | **framework-advisor** | Help choose appropriate stack |
| Complex requirements | **requirements-analyst** | Break down project scope |

## Examples

```bash
# NEW PROJECT: Interactive setup in new folder
/sdk my-portfolio

# NEW PROJECT: Setup in current empty directory
/sdk

# NEW PROJECT: Skip framework init (just add SDK files)
/sdk --no-framework

# UPDATE: Refresh SDK files in current project
/sdk --update

# UPDATE: Refresh SDK files in specific project
/sdk ../my-project --update

# UPDATE: Quick update without backup prompt
/sdk --update --no-backup

# NEW PROJECT: Specify package manager directly
/sdk my-project --pm pnpm

# NEW PROJECT: Auto-detect package manager from existing lockfiles
/sdk --pm detect
```

## Notes

- Command auto-detects new vs existing projects based on `.claude/` folder presence
- For new projects: gathers settings, initializes framework, copies SDK files
- For existing projects: updates SDK files only, preserves `project-settings.md`
- Framework initialization may require user interaction (prompts)
- Always verify `project-settings.md` after initialization

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /design - Plan your first feature
 Or: /wordlist - Build domain vocabulary for precise prompting
---
```
