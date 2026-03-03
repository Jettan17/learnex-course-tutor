# Learned Patterns and Insights

This directory contains patterns, techniques, and insights extracted from debugging sessions and development work using the `/learn` command.

## Directory Structure

```
learned/
├── patterns/      # Reusable techniques and approaches
├── insights/      # Breakthrough discoveries (eureka moments)
└── README.md      # This index
```

## Patterns

| Pattern | Description |
|---------|-------------|
| [vscode-extension-state-persistence](patterns/vscode-extension-state-persistence.md) | VS Code extension state must persist to settings, not just memory or flag files |

## Insights

| Date | Insight | Summary |
|------|---------|---------|
| 2025-01-31 | [VS Code Fork Extension Paths](insights/insight-2025-01-31-vscode-fork-extension-paths.md) | VS Code forks store extensions in different directories |

## Usage

These patterns are automatically available as slash commands:
- `/learned:patterns:vscode-extension-state-persistence` - Reference the state persistence pattern

Use `/learn` to capture new patterns from your debugging sessions.
