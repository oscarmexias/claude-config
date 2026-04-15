# Convention: screenshots and analysis files belong inside projects

## The Rule

Screenshots, JSON analysis exports, audit snapshots, and any agent-generated output files NEVER go at the workspace root. They go inside the project they belong to:

```
{project}/context/design/screenshots/   ← screenshots, PNGs, design captures
{project}/context/research/             ← analysis JSON, audit reports, snapshots
{project}/context/prd/                  ← product docs, decisions
```

## Why this matters

Agent sessions frequently generate analysis files (Playwright screenshots, competitive audit JSONs, accessibility snapshots, design-info exports). Without a convention, these pile up at the workspace root within a few sessions.

## How workspace-cleanup enforces this

During triage, if a file at root matches a project prefix (e.g., `quinielazo-*`, `sbs-*`, `madame-flihan-*`):
- If it's a screenshot (*.png, *.jpg) → MOVE to `{project}/context/design/screenshots/`
- If it's an analysis file (*-snapshot.md, *-info.json, *-analysis.json) → DELETE (agent output, not source of truth)
- If uncertain → FLAG for user

## Known project prefixes

| Prefix | Project folder |
|--------|---------------|
| `el-ojo-*`, `resonant-*` | `Resonant Migration/` |
| `sbs-*` | `SBS/` |
| `madame-*`, `flihan-*` | `Madame Flihan/` |
| `kinez-*` | `Kinez/` |
| `quinielazo-*` | `quinielazo-clone/` |
| `valentin-*`, `st-valentin-*` | `St. Valentin/` |

## Proactive reminder

When executing any agent task that generates output files (Playwright scraping, design analysis, accessibility audit), remind the user to save outputs to `{project}/context/` — not to $PWD if $PWD is the workspace root.
