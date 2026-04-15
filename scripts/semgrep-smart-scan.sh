#!/bin/bash
# semgrep-smart-scan.sh
# Wrapper for semgrep post-tool-cli-scan that only runs on code files.
# Skips .md, .json, .yml, memory files, docs, config files, etc.

INPUT=$(cat)

# Extract file_path from Claude Code hook stdin JSON
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    # PostToolUse sends tool_input for Edit/Write
    path = d.get('tool_input', {}).get('file_path', '') or d.get('tool_input', {}).get('new_file_path', '')
    print(path)
except:
    print('')
" 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Code file extensions to scan
CODE_EXTENSIONS='\.(ts|tsx|js|jsx|mjs|cjs|py|go|rs|java|rb|php|cs|cpp|c|h|swift|sol|sh|bash|vue|svelte|astro)$'

if echo "$FILE_PATH" | grep -qE "$CODE_EXTENSIONS"; then
  echo "$INPUT" | semgrep mcp -k post-tool-cli-scan
fi
# Non-code files → silent exit (no scan, no error)
