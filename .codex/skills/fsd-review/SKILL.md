---
name: fsd-review
description: Review JavaScript, TypeScript, and TSX changes for Feature-Sliced Design compliance.
---

# FSD Review

Use this skill when reviewing JavaScript, TypeScript, or TSX changes for Feature-Sliced Design compliance.

## Review goals

- Check whether each file belongs to the right FSD layer: `shared`, `entities`, `features`, `widgets`, `pages`, or `app`.
- Check whether imports follow FSD direction rules.
- Check whether public APIs are respected and deep imports are avoided.
- Check whether a slice or widget mixes UI, model, and data-fetching responsibilities too aggressively.
- Check whether names and paths communicate the slice boundary clearly.

## What to inspect

- New or edited `*.js`, `*.ts`, and `*.tsx` files.
- Imports that cross layers or bypass `index.ts`.
- UI files that fetch data directly when a feature or entity layer should own the data access.
- Model files that contain presentation logic.
- Shared code that depends on higher layers.

## FSD heuristics

- `shared` should not depend on `entities`, `features`, `widgets`, or `pages`.
- `entities` should not depend on `features`, `widgets`, or `pages`.
- `features` should not depend on `widgets` or `pages`.
- `widgets` should not depend on `pages`.
- Prefer public API imports from each slice instead of deep imports.
- Prefer moving reusable logic into `model` or `lib` when UI files become too large.
- Prefer `widgets` for composed UI blocks and `pages` for page assembly.

## Output format

- Start with the most important findings.
- For each finding, state the file and the specific FSD concern.
- Keep the response concise and actionable.
- If there are no findings, say that the change looks FSD-compliant and mention any residual risks.
