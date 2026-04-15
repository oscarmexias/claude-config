# Request Example

```json
{
  "fieldsToRedact": ["description", "summary"],
  "commentsToRedact": ["10001"]
}
```

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Adds a worklog entry to a Jira issue to track time spent. This function allows specifying time spent in seconds or a formatted string, along with a comment and the start time. It requires an initialized Version3Client.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function addWorklog() {
  const worklog = await client.issueWorklogs.addWorklog({
    issueIdOrKey: 'MYPROJECT-123',
    timeSpentSeconds: 3600, // 1 hour
    comment: 'Investigated and identified root cause of the bug',
    started: new Date().toISOString(),
  });

  console.log(`Worklog added for Issue ID: ${worklog.issueId}`);
  console.log(`Time logged: ${worklog.timeSpent}`);
  // Output:
  // Worklog added for Issue ID: 10001
  // Time logged: 1h
  return worklog;
}

addWorklog();
```

--------------------------------