#!/bin/bash
# semgrep-scan.sh — Conditional Semgrep post-tool scan
#
# Runs semgrep mcp -k post-tool-cli-scan ONLY when authenticated.
# Exits silently if no token is found — no errors, no noise.
#
# Auth sources (checked in order):
#   1. SEMGREP_APP_TOKEN env var (set in ~/.secrets)
#   2. ~/.semgrep/settings.yml (set after `semgrep login`)

SEMGREP_BIN="/opt/homebrew/bin/semgrep"

# --- Find token ---

# Source ~/.secrets if it exists (picks up SEMGREP_APP_TOKEN)
if [[ -f "$HOME/.secrets" ]]; then
  source "$HOME/.secrets" 2>/dev/null
fi

# If still no env token, try reading from ~/.semgrep/settings.yml
if [[ -z "$SEMGREP_APP_TOKEN" ]]; then
  SETTINGS_FILE="$HOME/.semgrep/settings.yml"
  if [[ -f "$SETTINGS_FILE" ]]; then
    TOKEN=$(grep -E "^api_token:" "$SETTINGS_FILE" | awk '{print $2}' | tr -d '"')
    if [[ -n "$TOKEN" && "$TOKEN" != "null" ]]; then
      export SEMGREP_APP_TOKEN="$TOKEN"
    fi
  fi
fi

# --- Exit silently if not authenticated ---
if [[ -z "$SEMGREP_APP_TOKEN" ]]; then
  exit 0
fi

# --- Run scan ---
if [[ ! -x "$SEMGREP_BIN" ]]; then
  SEMGREP_BIN=$(which semgrep 2>/dev/null)
fi

if [[ -z "$SEMGREP_BIN" ]]; then
  exit 0
fi

exec "$SEMGREP_BIN" mcp -k post-tool-cli-scan
