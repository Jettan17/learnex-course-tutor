---
description: VS Code forks store extensions in different directories than standard VS Code
---

# Insight: VS Code Fork Extension Paths

**Context:** Debugging a VS Code extension for "Antigravity" (a VS Code fork similar to Cursor) where the extension wasn't being found or updated correctly.

**Discovery:** VS Code forks each use their own extension directory, not the standard `~/.vscode/extensions/`:

| Editor | Extension Path |
|--------|---------------|
| VS Code | `~/.vscode/extensions/` |
| Cursor | `~/.cursor/extensions/` |
| Antigravity | `~/.antigravity/extensions/` |
| Windsurf | `~/.windsurf/extensions/` (likely) |

Additionally, some VS Code APIs may not work in forks:
- `onDidWriteTerminalData` - Terminal output capture (broken in some forks)
- Workaround: Use alternative mechanisms like Claude Code hooks (PreToolUse, PostToolUse, UserPromptSubmit) combined with flag files

**Implication:** When developing extensions for VS Code forks:
1. Copy extension files directly to the fork's extension directory (not `.vscode`)
2. Test API availability - don't assume all VS Code APIs work
3. Design with fallback mechanisms for unavailable APIs
4. Use flag files or IPC for cross-process communication when terminal APIs fail

**Captured:** 2025-01-31
