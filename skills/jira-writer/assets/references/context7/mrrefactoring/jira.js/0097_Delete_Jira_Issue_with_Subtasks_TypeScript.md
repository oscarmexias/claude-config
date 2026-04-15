# Delete Jira Issue with Subtasks (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Deletes a Jira issue by its ID or key. This function can optionally delete all associated subtasks along with the parent issue. It requires the jira.js Version3Client to be initialized with host and authentication details.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function deleteIssue() {
  await client.issues.deleteIssue({
    issueIdOrKey: 'MYPROJECT-123',
    deleteSubtasks: true, // Also delete any subtasks
  });

  console.log('Issue and subtasks deleted successfully');
}

deleteIssue();
```

--------------------------------