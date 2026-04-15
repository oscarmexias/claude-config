# Update Jira Issue Fields

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

This code example illustrates how to modify an existing Jira issue. It covers updating fields like summary, priority, and labels, and also demonstrates how to notify users about the changes.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function editIssue() {
  await client.issues.editIssue({
    issueIdOrKey: 'MYPROJECT-123',
    fields: {
      summary: 'Bug: Login button not working on iOS Safari',
      priority: { name: 'Critical' },
      labels: ['mobile', 'authentication', 'ios'],
    },
    notifyUsers: true, // Notify watchers of changes
  });

  console.log('Issue updated successfully');
}

editIssue();
```

--------------------------------