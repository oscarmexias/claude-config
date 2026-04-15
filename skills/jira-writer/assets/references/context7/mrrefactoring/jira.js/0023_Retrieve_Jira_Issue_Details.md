# Retrieve Jira Issue Details

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

This snippet demonstrates how to fetch the details of a Jira issue using its ID or key. It also shows how to expand related data such as changelog, comments, and transitions, and specify which fields to retrieve.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function getIssue() {
  const issue = await client.issues.getIssue({
    issueIdOrKey: 'MYPROJECT-123',
    fields: ['summary', 'status', 'assignee', 'priority', 'description'],
    expand: 'changelog,transitions',
  });

  console.log(`Summary: ${issue.fields.summary}`);
  console.log(`Status: ${issue.fields.status?.name}`);
  console.log(`Assignee: ${issue.fields.assignee?.displayName || 'Unassigned'}`);
  console.log(`Priority: ${issue.fields.priority?.name}`);
  // Output:
  // Summary: Bug: Login button not working
  // Status: To Do
  // Assignee: John Doe
  // Priority: High
  return issue;
}

getIssue();
```

--------------------------------