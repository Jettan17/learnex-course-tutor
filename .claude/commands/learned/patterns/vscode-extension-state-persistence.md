---
description: VS Code extension state must persist to settings, not just memory or flag files
---

# VS Code Extension State Persistence

When building VS Code extensions that need to maintain state across reloads, configuration changes, or window restarts, state must be persisted to VS Code settings - not just in-memory variables or external files.

## Problem

Extension toggle states (enabled/disabled) or other user preferences that are:
1. Stored only in-memory variables, OR
2. Written to external flag files without syncing to VS Code settings

...will be overwritten when `loadConfiguration()` runs (on startup, settings change, etc.) because the configuration loader reads from VS Code settings and resets everything.

## Solution

Always persist user-modifiable state to VS Code settings using the Configuration API:

```typescript
// When user toggles a setting via command
async function toggleEnabled() {
    enabled = !enabled;

    // CRITICAL: Persist to VS Code settings (not just memory/flag file)
    const config = vscode.workspace.getConfiguration('yourExtension');
    await config.update('enabled', enabled, vscode.ConfigurationTarget.Global);

    // Optional: Also write to flag file for external script communication
    await writeFlagFile(enabled);
}
```

### Configuration Target Options
- `ConfigurationTarget.Global` - User settings (persists across all workspaces)
- `ConfigurationTarget.Workspace` - Workspace settings (`.vscode/settings.json`)
- `ConfigurationTarget.WorkspaceFolder` - Specific folder in multi-root workspace

## Example: Complete Toggle Pattern

```typescript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let enabled: boolean = true;
const FLAG_FILE = path.join(os.homedir(), '.my-extension-enabled');

// Called on activation and when settings change
function loadConfiguration() {
    const config = vscode.workspace.getConfiguration('myExtension');
    enabled = config.get<boolean>('enabled', true);

    // Sync flag file with settings (settings are source of truth)
    writeFlagFile(enabled);
}

// Toggle command - MUST update VS Code settings
async function toggleEnabled() {
    enabled = !enabled;

    // 1. Update VS Code settings (source of truth)
    const config = vscode.workspace.getConfiguration('myExtension');
    await config.update('enabled', enabled, vscode.ConfigurationTarget.Global);

    // 2. Update flag file (for external scripts)
    writeFlagFile(enabled);

    // 3. Update UI
    updateStatusBar();
}

function writeFlagFile(state: boolean) {
    if (state) {
        fs.writeFileSync(FLAG_FILE, 'enabled');
    } else {
        if (fs.existsSync(FLAG_FILE)) {
            fs.unlinkSync(FLAG_FILE);
        }
    }
}
```

## When to Use

- Building VS Code extensions with toggleable features
- Extensions that communicate state to external scripts via flag files
- Any extension setting that users can modify at runtime
- Extensions for VS Code forks (Cursor, Antigravity, etc.)

## VS Code Fork Considerations

VS Code forks store extensions in different locations:
- **VS Code**: `~/.vscode/extensions/`
- **Cursor**: `~/.cursor/extensions/`
- **Antigravity**: `~/.antigravity/extensions/`

When developing for forks:
1. Copy built extension files directly to the fork's extension directory
2. Test that `vscode.workspace.getConfiguration()` works correctly
3. Some APIs (like `onDidWriteTerminalData`) may not work in forks

## Anti-Pattern (What NOT to Do)

```typescript
// BAD: Only updates memory and flag file
function toggleEnabled() {
    enabled = !enabled;
    writeFlagFile(enabled);  // Lost on next loadConfiguration() call!
}

// BAD: loadConfiguration overwrites flag file from settings
function loadConfiguration() {
    const config = vscode.workspace.getConfiguration('myExtension');
    enabled = config.get<boolean>('enabled', true);
    writeFlagFile(enabled);  // Overwrites any flag file changes!
}
```

## Related

- VS Code Extension API: Configuration
- Flag file patterns for external script communication
- Claude Code hooks (PreToolUse, PostToolUse, UserPromptSubmit)
