# Request Example

```javascript
// Example usage within jira.js client
await client.issueWorklogs.getIssueWorklog({
  issueIdOrKey: 'MYPROJECT-123',
  startAt: 0,
  maxResults: 100,
});
```

- **total** (integer) - The total number of worklogs for the issue.
- **maxResults** (integer) - The maximum number of worklogs returned in this request.
- **startAt** (integer) - The starting index of the worklogs returned.
- **worklogs** (array) - An array of worklog objects.
  - **author** (object) - Information about the worklog author.
    - **displayName** (string) - The display name of the author.
  - **timeSpent** (string) - The time spent on the worklog.
  - **comment** (string) - The comment for the worklog.