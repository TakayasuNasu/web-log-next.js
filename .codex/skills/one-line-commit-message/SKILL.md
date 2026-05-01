---
name: one-line-commit-message
description: Generate a single-line git commit message suggestion from the current diff after file edits.
---

# One-Line Commit Message

When the user asks for a commit message, or when code changes have just been made, inspect the relevant git diff and output one short commit message line only.

## Workflow

1. Check the diff for the current work, preferring `git diff` and `git diff --cached` when files are staged.
2. Summarize the main intent of the change, not the implementation details.
3. Return a single-line message with no bullets, no explanation, and no extra text.

## Style

- Prefer imperative mood.
- Prefer Conventional Commits prefixes when they fit: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.
- Keep it concise and specific.
- If the diff is empty or unrelated, say that there is no meaningful commit message.

## Output

- Exactly one line.
- No markdown.
- No code block.
