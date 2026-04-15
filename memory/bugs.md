# Bug & Correction Memory

Cross-project log of errors encountered, corrections made, and non-obvious solutions found.
Updated automatically by `/user:log-bug` skill.

**How to use**: Before attempting something that previously caused issues, search this file by tag, tool, or keyword.

---

## Index by Tag

| Tag | Count |
|-----|-------|
| #atlassian | 4 |
| #mcp | 4 |
| #parameter-name | 1 |
| #design-system | 1 |
| #socios-mcp | 1 |
| #process | 2 |
| #jira | 3 |
| #custom-field | 3 |
| #two-step-workflow | 1 |
| #array-type | 1 |

---

## Entries

### BUG-001 — 2026-03-11

**Project**: Chiliz workspace (Jira research)
**Error**: Called `mcp__atlassian__getJiraIssue` with parameter `issueKey` — tool rejected with validation error
**Root cause**: Parameter name is `issueIdOrKey`, not `issueKey`. Assumption based on naming convention was wrong.
**Fix**: Always check the loaded tool schema before calling Atlassian MCP tools. Parameter names are non-obvious (`issueIdOrKey`, `cloudId` required on every call).
**Pattern**: Atlassian MCP tools require `cloudId` on every single call — it is never inferred from context.
**Tags**: #atlassian #mcp #parameter-name

### BUG-002 — 2026-03-19

**Project**: Chiliz workspace (limit-orders)
**Error**: Reimplemented all UI components from scratch using MCP 1.2 specs (get_component_spec output) instead of copying the actual production-ready code from socios-design-mcp-1.2/src/ui/*.tsx and src/templates/*.tsx
**Root cause**: Treated "MCP 1.2 as source of truth" as "use specs for reference" instead of "use the actual code". Did not check src/ui/ or src/templates/ before writing components. The MCP has complete React implementations (TradePage, ReviewPage, SwapArea, ValueSelector, TopupCard, etc.) ready to copy-paste.
**Fix**: Before writing ANY UI component for a Socios project, ALWAYS run: `ls socios-design-mcp-1.2/src/ui/` and `ls socios-design-mcp-1.2/src/templates/` first. If the component or template exists, copy it and adapt to the target framework (e.g. React Router to Next.js App Router). Never rewrite from specs.
**Pattern**: "Source of truth" means USE THE CODE, not just read the spec. The MCP 1.2 contains: 60+ UI components in src/ui/, 15+ page templates in src/templates/, hooks in src/hooks/, data in src/data/. All use `soc-*` Tailwind utility classes from the DS theme.
**Tags**: #design-system #socios-mcp #process

### BUG-003 — 2026-03-30 (updated 2026-04-01)

**Project**: Chiliz workspace (Jira / SCS board)
**Error**: SCS bugs created via `createJiraIssue` appear with empty body in the board UI. `customfield_10885` passed as a string causes a 400 error.
**Root cause**: SCS bugs use THREE custom fields for their visible content — none of which are the standard `description` field. `customfield_10885` requires an array of option objects, not a string.
**Fix — MANDATORY TWO-STEP WORKFLOW**:

Step 1: `createJiraIssue` with only summary, issueTypeName, projectKey, priority, versions.

Step 2: Immediately call `editJiraIssue` with:
- `customfield_10039` — ADF doc with the full bug template (Notes / Fixed on Restart / Expected Behaviour / Actual Behaviour / Repro rate / Device / Build/Version / Environment / Repro Steps as **bold** labels)
- `customfield_10787` — ADF doc for Additional Context / Root Cause
- SKIP `customfield_10885` unless you've verified its allowed option IDs first

**SCS custom field IDs**:
| Field ID | Name | Type | Issue types |
|---|---|---|---|
| `customfield_10039` | [Bug] Description | ADF — PRIMARY | Bug |
| `customfield_10040` | [Story] Description | ADF — PRIMARY | Story, Task, Spike |
| `customfield_10787` | Additional Context/Root Cause | ADF | Bug |
| `customfield_10885` | [Bug,Spike] Environment | Array — SKIP unless verified | Bug, Spike |
| `customfield_10041` | [Bug] Environment affected | text | Bug |

**Reference ticket**: SCS-8486 — fetch this to see a correctly populated SCS bug.
**Full protocol in skill**: `~/.claude/skills/jira-writer/SKILL.md` → "SCS Bug Publication Protocol"
**Tags**: #atlassian #mcp #jira #custom-field #two-step-workflow #array-type #process
