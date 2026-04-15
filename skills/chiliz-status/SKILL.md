---
name: chiliz-status
description: |
  Reads all active Chiliz subproject states in parallel and renders a consolidated dashboard.
  Spawns one agent per subproject — mechanical reads, no conversation context needed.
---

# Chiliz Status Dashboard

Spawn parallel agents — one per active subproject — to read their GSD-T state. Aggregate into a single dashboard. Do not read files yourself; delegate everything to agents.

## Subprojects to check

```
WORKSPACE_ROOT=/Users/oscar.mejia/Desktop/Chiliz
SUBPROJECTS=(
  token-hunt
  token-page
  passkey-login
  fantoken-fantasy
  staking-hub
  locker-room
  limit-orders
  socios-design-mcp-1.2
)
```

## Step 1 — Spawn agents in parallel

Launch all agents in a single message (one tool call block with multiple Agent invocations). Each agent gets this prompt:

```
Read the GSD-T state for subproject "{name}" at /Users/oscar.mejia/Desktop/Chiliz/{name}/.

Read these files if they exist (skip gracefully if missing):
1. .gsd-t/progress.md — extract: current Milestone, Phase, Version, and the last 2 decision log entries (lines matching `- YYYY-MM-DD`)
2. .gsd-t/backlog.md — count items with status `[ ]` (pending) vs `[x]` (done)

Return ONLY a JSON object, no prose:
{
  "project": "{name}",
  "milestone": "string or null",
  "phase": "string or null",
  "version": "string or null",
  "last_activity": "YYYY-MM-DD or null",
  "last_log": "one-line summary of most recent decision log entry, or null",
  "backlog_pending": number,
  "backlog_done": number,
  "has_gsd": true/false
}
```

Use `model: haiku` for all agents — this is pure mechanical file reading.

## Step 2 — Aggregate results

Once all agents return, render this table:

```
## Chiliz Workspace — Status Dashboard
_As of {date} {time}_

| Project | Version | Milestone | Phase | Last Activity | Backlog |
|---------|---------|-----------|-------|---------------|---------|
| token-hunt | v0.1.10 | Auth | Execute | 2026-04-06 | 3 pending |
...

### Recent Activity
For projects with `last_log` entries, list them:
- **token-hunt** — "2026-04-06: implemented wallet connect flow"
- ...

### No GSD-T
Projects without `.gsd-t/` structure (list separately):
- socios-design-mcp-1.2
```

## Rules

- Spawn ALL agents in parallel — never sequentially
- If a subproject dir doesn't exist, mark it as `"has_gsd": false` and skip
- Do not read any files yourself — agents handle all I/O
- Total execution should feel near-instant (all parallel reads finish together)
- After rendering the dashboard, do NOT add commentary unless the user asks
