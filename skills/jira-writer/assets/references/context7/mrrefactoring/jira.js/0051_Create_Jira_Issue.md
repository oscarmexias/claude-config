# Create Jira Issue

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

An example of creating a new issue in Jira using the `Version3Client`. It shows how to specify fields like summary, description, issue type, project, priority, and labels. The description is automatically converted to Atlassian Document Format.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function createIssue() {
  const newIssue = await client.issues.createIssue({
    fields: {
      summary: 'Bug: Login button not working',
      description: 'Users cannot log in when clicking the login button on mobile devices.',
      issuetype: { name: 'Bug' },
      project: { key: 'MYPROJECT' },
      priority: { name: 'High' },
      labels: ['mobile', 'authentication'],
    },
  });

  console.log(`Issue created: ${newIssue.key} (ID: ${newIssue.id})`);
  // Output: Issue created: MYPROJECT-123 (ID: 10001)
  return newIssue;
}

createIssue();
```

--------------------------------