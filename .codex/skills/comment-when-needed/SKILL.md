---
name: comment-when-needed
description: Add concise code comments only when intent is non-obvious, especially for long functions, nested conditions, default fallbacks, magic values, and edge cases.
---

# Comment When Needed

Use this skill when deciding whether a code comment should be added or updated in JavaScript, TypeScript, or TSX code.

## Add a comment when intent is not obvious

- A function is long enough that the reader needs help understanding the flow.
  - Treat React components that mainly return JSX as an exception.
  - For GraphQL-heavy functions, ignore the query block when judging length.
- `if` / `for` nesting makes the condition hard to read without explanation.
- A fallback such as `?? []` or `|| undefined` exists for a specific reason.
- A magic number, magic string, or hard-coded branch drives behavior.
- An exception path or edge-case branch exists to preserve correctness.

## Comment style

- Explain the "why", not the obvious "what".
- Keep comments short and local to the block they describe.
- Prefer one comment before the tricky block instead of repeated inline narration.
- Do not add comments that restate the code.

## Skip comments when

- The code is already self-explanatory.
- The comment would be redundant with the function or variable name.
- The same intent is already clear from nearby code or types.

## Output guidance

- If you are reviewing code, point out where a comment would help and why.
- If you are editing code, add only the minimum comments needed to clarify intent.
- If no comment is necessary, say that the code is already clear.

