# Create Jira Project (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Creates a new Jira project with specified configuration details. This function first retrieves the current user's account ID to set as the project lead, then uses the createProject method with parameters like key, name, description, leadAccountId, projectTypeKey, and projectTemplateKey.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function createProject() {
  // Get current user's account ID for project lead
  const myself = await client.myself.getCurrentUser();

  const project = await client.projects.createProject({
    key: 'NEWPROJ',
    name: 'New Project',
    description: 'A new software development project',
    leadAccountId: myself.accountId,
    projectTypeKey: 'software',
    projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-scrum-template',
  });

  console.log(`Project created: ${project.key} (ID: ${project.id})`);
  return project;
}

createProject();
```

--------------------------------