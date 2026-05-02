#!/usr/bin/env bash

set -euo pipefail

input="$(cat)"
file="$(jq -r '.tool_input.file_path // .tool_input.path // empty' <<< "$input")"

case "$file" in
  *.ts|*.tsx|*.js|*.jsx) ;;
  *) exit 0 ;;
esac

bunx biome format --write "$file" >/dev/null 2>&1 || true
bunx oxlint --fix "$file" >/dev/null 2>&1 || true
bunx biome format --write "$file" >/dev/null 2>&1 || true
diag="$(bunx oxlint "$file" 2>&1 | head -20)"

if [ -n "$diag" ]; then
  jq -Rn --arg msg "$diag" '{
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext: $msg
    }
  }'
fi
