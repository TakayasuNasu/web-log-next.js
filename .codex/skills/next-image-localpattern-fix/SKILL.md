---
name: next-image-localpattern-fix
description: Fix Next.js Image errors caused by local src query strings or missing localPatterns by making image sources path-based or updating image config.
---

# Next Image Local Pattern Fix

Use this skill when Next.js `Image` fails because a local `src` contains a query string or is otherwise rejected by `images.localPatterns`.

## What to check

- Does the `Image` `src` point to a local route with a query string?
- Can the source be changed to a path parameter instead of `?url=...`?
- If a query string is unavoidable, should `next.config.ts` add a matching `images.localPatterns` entry?

## Preferred fix order

1. Make the local image source path-based.
2. Add or adjust a route handler so the encoded remote URL lives in the path, not the query string.
3. Only if the query string is intentional and stable, update `images.localPatterns`.

## Workflow

1. Find every `next/image` usage that points at a local proxy route.
2. If the `src` contains `?`, replace it with a path segment or route param.
3. Update the route handler to read the path param and fetch the remote asset.
4. Re-run lint and type checking.

## Output guidance

- State the root cause clearly.
- Show the exact `Image` `src` that was rejected.
- Explain whether the fix was done in component code, route code, or `next.config.ts`.
- If the same error could reoccur, recommend the safer path-based route pattern.
