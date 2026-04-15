# Assign Jira Issue (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Assigns a Jira issue to a specific user or sets it to unassigned. The function demonstrates assigning an issue to a user by their account ID, setting it to unassigned by passing null, and assigning it to the default assignee using '-1'.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function assignIssue() {
  // Assign to a specific user by account ID
  await client.issues.assignIssue({
    issueIdOrKey: 'MYPROJECT-123',
    accountId: '5b10ac8d82e05b22cc7d4ef5',
  });

  console.log('Issue assigned successfully');

  // Set to unassigned
  await client.issues.assignIssue({
    issueIdOrKey: 'MYPROJECT-124',
    accountId: null, // null = unassigned
  });

  console.log('Issue set to unassigned');

  // Assign to default assignee
  await client.issues.assignIssue({
    issueIdOrKey: 'MYPROJECT-125',
    accountId: '-1', // -1 = default assignee
  });

  console.log('Issue assigned to default assignee');
}

assignIssue();
```

--------------------------------