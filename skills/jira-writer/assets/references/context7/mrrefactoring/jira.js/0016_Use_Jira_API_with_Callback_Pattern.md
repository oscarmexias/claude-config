# Use Jira API with Callback Pattern

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Shows how to interact with the Jira API using a traditional callback pattern instead of Promises. This provides flexibility for developers who prefer or require asynchronous operations handled via callbacks. An equivalent promise-based approach is also shown for comparison.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

// Using callbacks instead of promises
client.issues.getIssue(
  { issueIdOrKey: 'MYPROJECT-123' },
  (error, issue) => {
    if (error) {
      console.error('Error fetching issue:', error.message);
      return;
    }

    console.log(`Issue: ${issue?.key} - ${issue?.fields.summary}`);
  }
);

// Equivalent promise-based approach
async function getIssueAsync() {
  const issue = await client.issues.getIssue({ issueIdOrKey: 'MYPROJECT-123' });
  console.log(`Issue: ${issue.key} - ${issue.fields.summary}`);
}
```

--------------------------------