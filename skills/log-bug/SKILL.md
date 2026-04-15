---
name: |
  log-bug
description: |
  Log bugs, corrections, and non-obvious solutions to a persistent bug memory file
---

# Skill: log-bug

**Invoke**: `/user:log-bug`
**Purpose**: Log a bug, correction, or non-obvious solution to the persistent bug memory.

## When to invoke this skill

Invoke proactively (without waiting for the user to ask) when:
- You corrected a mistake you made in the current session
- A tool, API, or library behaved unexpectedly and you found the fix
- A solution required non-obvious knowledge (wrong parameter names, undocumented behavior, env issues)
- The same class of error could realistically happen again in a future session

## Workflow

1. **Identify the bug/correction** from the current session context
2. **Format the entry** using the template below
3. **Determine the next BUG-NNN number** by reading the last entry in `~/.claude/memory/bugs.md`
4. **Append the entry** to `~/.claude/memory/bugs.md`
5. **Update the Index by Tag** section at the top of the file
6. **If project-specific**: also append a shorter version to the project's `memory/bugs.md` if it exists

## Entry Template

```markdown
### BUG-NNN — YYYY-MM-DD

**Project**: [project name or "global"]
**Error**: [what went wrong — one clear sentence]
**Root cause**: [why it happened]
**Fix**: [what actually works]
**Pattern**: [generalizable lesson — what to watch for next time]
**Tags**: #tag1 #tag2 #tag3
```

## Tag Taxonomy

Use consistent tags for searchability:

| Tag | When to use |
|-----|-------------|
| `#atlassian` | Jira, Confluence MCP tools |
| `#mcp` | Any MCP tool error |
| `#parameter-name` | Wrong parameter name assumption |
| `#figma` | Figma MCP tools |
| `#github` | GitHub MCP tools |
| `#nextjs` | Next.js specific issues |
| `#tailwind` | Tailwind CSS issues |
| `#webauthn` | WebAuthn / passkey flows |
| `#chiliz` | Chiliz Chain / CAP-20 specific |
| `#env` | Environment / config issues |
| `#tool-schema` | Tool called with wrong structure |
| `#rate-limit` | API or tool rate limiting hit |
| `#auth` | Authentication issues |
| `#typescript` | TypeScript type errors |
| `#hook` | Claude Code hook issues |

Add new tags as needed — keep them lowercase with `#`.

## Memory file locations

- **Global** (cross-project): `~/.claude/memory/bugs.md`
- **Chiliz workspace**: `~/.claude/projects/-Users-oscar-mejia-Desktop-Chiliz/memory/bugs.md`
- **Per-project**: `[project]/memory/bugs.md` (if exists)

## Important

- Never log vague entries. Every entry must have a concrete Fix and Pattern.
- If unsure whether something is worth logging: log it. Filtering is easier than re-discovering.
- After logging, confirm to the user: "Logged as BUG-NNN in bugs.md"

## CLI Commands

```bash
# Add user content
skill-creator add-skill --pwd "/Users/oscar.mejia/.claude/skills/log-bug" [--title "Title" --content "Content"]|[--file=*.md]

# Search documentation
skill-creator search-skill --pwd "/Users/oscar.mejia/.claude/skills/log-bug" "query" [--mode=auto|chroma|fuzzy]
```
