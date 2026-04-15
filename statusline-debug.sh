#!/bin/sh
# Debug wrapper — captures raw JSON to /tmp/statusline-raw.json then outputs normally
input=$(cat)
echo "$input" > /tmp/statusline-raw.json
cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // ""')
model=$(echo "$input" | jq -r '.model.display_name // ""')
used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
printf "%s | %s | ctx %s%%" "$cwd" "$model" "$used"
