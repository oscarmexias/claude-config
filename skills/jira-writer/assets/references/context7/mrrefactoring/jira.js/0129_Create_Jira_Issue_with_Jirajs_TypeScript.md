# Create Jira Issue with Jira.js (TypeScript)

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

A quick example demonstrating how to create a Jira issue using the Jira.js TypeScript client. It shows client initialization with authentication and making a call to the createIssue endpoint.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your@email.com',
      apiToken: 'YOUR_API_TOKEN', // Create one: https://id.atlassian.net/manage-profile/security/api-tokens
    },
  },
});

async function createIssue() {
  const project = await client.projects.getProject({ projectIdOrKey: 'Your project id or key' });

  const newIssue = await client.issues.createIssue({
    fields: {
      summary: 'Hello Jira.js!',
      issuetype: { name: 'Task' },
      project: { key: project.key },
    },
  });

  console.log(`Issue created: ${newIssue.id}`);
}

createIssue();
```

--------------------------------