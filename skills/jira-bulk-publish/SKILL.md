---
name: jira-bulk-publish
description: |
  Takes an array of pre-written Jira ticket definitions (already formatted by jira-writer skill)
  and publishes them all in parallel via mcp__atlassian__createJiraIssue.
  Separation of concerns: jira-writer writes, jira-bulk-publish publishes.
---

# Jira Bulk Publisher

You receive an array of pre-written ticket definitions. Your job is mechanical: publish every ticket to Jira in parallel and return their IDs and URLs. You do not write, edit, or judge ticket content — that is the jira-writer skill's job.

## Input format

The user passes tickets as a JSON array or as a numbered list. Each ticket must have:

```json
[
  {
    "summary": "string",
    "description": "string (ADF or markdown)",
    "issuetype": "Story | Epic | Bug | Spike",
    "project": "GPS | SCS",
    "priority": "Must Have | Patch",
    "parent": "EPIC-KEY (optional, for Stories under an Epic)",
    "labels": ["label1", "label2"],
    "storyPoints": number
  }
]
```

If the user passes plain text tickets (written by jira-writer), extract the fields before publishing.

## MCP config

```
cloudId: 6a29b572-8ca1-440b-a58d-5210ba52e21a  (mediarex.atlassian.net)
Issue type IDs: Epic=10000, Story=10001, Bug=10004, Spike=10032
Priority IDs: Must Have=10001, Patch=10004
Tool: mcp__atlassian__createJiraIssue
```

## Step 1 — Confirm before publishing

Before spawning any agents, display a confirmation table:

```
## Ready to publish {N} tickets to Jira

| # | Type | Project | Summary |
|---|------|---------|---------|
| 1 | Story | GPS | [GPS] Description here |
| 2 | Story | GPS | [GPS] Another one |
...

Type **go** to publish all, or edit any ticket first.
```

Wait for explicit user confirmation ("go", "yes", "publish", "adelante").

## Step 2 — Spawn parallel agents

After confirmation, spawn one agent per ticket in a single message. Each agent gets:

```
Publish this Jira ticket using mcp__atlassian__createJiraIssue:

cloudId: 6a29b572-8ca1-440b-a58d-5210ba52e21a
project: {project key}
issuetype: {type ID}
summary: {summary}
description: {description}
priority: {priority ID}
{parent: {parent key} — only if provided}

Return ONLY:
{ "key": "GPS-123", "url": "https://mediarex.atlassian.net/browse/GPS-123", "summary": "{summary}" }
```

Use `model: haiku` for all agents — this is pure API calls.

## Step 3 — Results

Render a completion table:

```
## Published — {N}/{N} tickets created

| Ticket | Summary | Link |
|--------|---------|------|
| GPS-123 | [GPS] Description | https://... |
| GPS-124 | [GPS] Another one | https://... |

All tickets published successfully.
```

If any agent fails, list failures separately with the error message. Do not retry automatically — report and let the user decide.

## Rules

- NEVER publish without explicit user confirmation (step 1 gate is mandatory)
- Spawn ALL agents in parallel after confirmation — never sequentially
- Never modify ticket content — that is jira-writer's job
- If a ticket is missing required fields, flag it in the confirmation table before spawning any agents
- Always use haiku for agent model — these are pure API calls, no reasoning needed
