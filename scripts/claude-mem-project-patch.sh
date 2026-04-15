#!/bin/bash
# claude-mem-project-patch.sh
# Corrects the claude-mem project name based on $PWD after the plugin hook fires.
#
# Root cause: claude-mem uses a global Claude Code session_id (shared across all
# windows), so the first workspace that creates a session "wins" the project name.
# This script patches the DB after session-init to set the correct project.
#
# Usage: Add as UserPromptSubmit hook in workspace settings.local.json
# Output: {"continue": true, "suppressOutput": true} — never blocks Claude

DB="$HOME/.claude-mem/claude-mem.db"
CWD="${PWD}"

# Derive project name from CWD
# Examples:
#   /Users/.../Desktop/Chiliz/passkey-login/ → Chiliz/passkey-login
#   /Users/.../Desktop/Chiliz/              → Chiliz
#   /Users/.../Desktop/Proyectos/SBS/       → Proyectos/SBS

WORKSPACE=$(echo "$CWD" | sed -n 's|.*/Desktop/\([^/]*\).*|\1|p')
SUBPROJECT=$(echo "$CWD" | sed -n 's|.*/Desktop/[^/]*/\([^/]*\).*|\1|p')

if [[ -z "$WORKSPACE" ]]; then
  # Not under Desktop — skip
  printf '{"continue": true, "suppressOutput": true}'
  exit 0
fi

if [[ -n "$SUBPROJECT" && "$SUBPROJECT" != "$WORKSPACE" ]]; then
  PROJECT="${WORKSPACE}/${SUBPROJECT}"
else
  PROJECT="${WORKSPACE}"
fi

if [[ ! -f "$DB" ]]; then
  printf '{"continue": true, "suppressOutput": true}'
  exit 0
fi

# Update the most recent active session if the project is wrong
CURRENT_PROJECT=$(sqlite3 "$DB" "SELECT project FROM sdk_sessions WHERE status='active' ORDER BY id DESC LIMIT 1;" 2>/dev/null)

# Only patch if the WORKSPACE is wrong — don't flip subprojects within the same workspace.
# A session labeled "Proyectos" when we're in Chiliz → fix.
# A session labeled "Chiliz/passkey-login" when we're in "Chiliz/token-hunt" → leave it.
CURRENT_WORKSPACE=$(echo "$CURRENT_PROJECT" | cut -d'/' -f1)

if [[ -n "$CURRENT_PROJECT" && "$CURRENT_WORKSPACE" != "$WORKSPACE" ]]; then
  sqlite3 "$DB" "UPDATE sdk_sessions SET project='$PROJECT' WHERE status='active' ORDER BY id DESC LIMIT 1;" 2>/dev/null
fi

printf '{"continue": true, "suppressOutput": true}'
exit 0
