# GSD-T: Resume — Continue From Last State

You are resuming work after an interruption. This handles both same-session pauses (user pressed Esc to interject) and cross-session recovery (new Claude Code session).

## Step 0: Detect Resume Mode

**Same-session** (conversation context still available — you can see prior messages about the active phase/task):
- Skip to Step 2 — you already have the context loaded
- Do NOT re-read all state files

**Cross-session** (first command in a new session, no prior conversation context):
- Run Step 1 to load full state

## Step 1: Load Full State (cross-session only)

Read in this exact order:
1. `CLAUDE.md` — project context and conventions
2. **Check for continue-here files first**: List `.gsd-t/continue-here-*.md` files. If any exist, read the most recent one (highest timestamp). It contains exact position, next action, and open items — use this as the primary resume point.
3. `.gsd-t/progress.md` — current status, decisions, blockers (always read this too)
4. `.gsd-t/contracts/` — all contract files
4. `.gsd-t/domains/*/scope.md` — domain boundaries
5. `.gsd-t/domains/*/tasks.md` — task lists with completion status
6. `.gsd-t/domains/*/constraints.md` — domain rules
7. `.gsd-t/contracts/integration-points.md` — dependency graph
8. `.gsd-t/verify-report.md` (if exists) — verification findings

## Step 2: Determine Current Position

From the continue-here file (if present) OR progress.md (or conversation context if same-session), identify:
- Current milestone and status
- Which phase we're in
- Which tasks are done, in progress, or blocked
- Any pending decisions or user-input-needed items
- Last entry in the Decision Log

**If a continue-here file was found**: Use its "Next Action" field as the primary resume point. The continue-here file is more precise than progress.md alone. After resuming, delete the continue-here file (it has been consumed).

## Step 3: Report and Continue

**Level 3 (Full Auto)**: Log a brief status line and auto-resume from the current task/phase. Do NOT wait for user input.

```
🔄 Resuming: {milestone name} — {phase} — {next task or action}
```

**Level 1–2**: Present fuller context and wait for confirmation:

```
🔄 GSD-T Resuming: {milestone name}
Phase: {current phase}
Last activity: {last Decision Log entry}

Progress:
  {domain-1}: {completed}/{total} tasks
  {domain-2}: {completed}/{total} tasks

Next up: {specific next action}
Blockers: {any pending items} | None

Ready to continue? Or run /user:gsd-t-status for full details.
```

## Step 4: Continue

If $ARGUMENTS specifies what to do next, proceed with that.
Otherwise, pick up from the logical next action based on current state:
- Mid-execution → Continue with next unblocked task
- Between phases → Start next phase
- Blocked → Explain what's needed to unblock
- Verify failed → Show remediation tasks

$ARGUMENTS
