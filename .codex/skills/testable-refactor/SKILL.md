---
name: testable-refactor
description: Refactor specific JavaScript, TypeScript, or TSX files to make them easier to test with unit tests.
---

# Testable Refactor

Use this skill when a specific file should be refactored so it becomes easier to test with `bun test` or similar unit tests.

## Goals

- Reduce hidden dependencies.
- Isolate pure logic from side effects.
- Make outputs depend on explicit inputs.
- Keep behavior changes minimal unless the user asks for a functional change.

## Refactor targets

- Global state such as `process.env`, `window`, `document`, `localStorage`, or `cookies()`.
- Direct I/O such as `fetch`, filesystem access, timers, random values, or console output.
- Large functions that mix data shaping, branching, and side effects.
- UI files that also fetch data or transform complex response shapes.
- Repeated literals that should become named constants or helper functions.

## Preferred moves

- Extract pure helpers for parsing, formatting, filtering, and mapping.
- Inject dependencies through parameters instead of reading them inline.
- Split data access, transformation, and presentation into separate layers.
- Return data instead of logging it.
- Keep public entry points small and stable.

## Workflow

1. Identify the test pain point in the target file.
2. Choose the smallest refactor that makes the logic testable.
3. Preserve runtime behavior unless the user asked to change it.
4. Add or suggest focused tests for the extracted pure logic.
5. Explain which parts became easier to test and why.

## Output guidance

- Mention the refactor seam you introduced.
- Mention any dependency injection or pure helper extraction.
- If tests should be added next, say exactly what to test.
- If no refactor is needed, say why the file is already testable enough.
