# Search Projects with Filtering and Pagination (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Searches for Jira projects with support for filtering and pagination. It configures the Jira client and then calls the searchProjects method with parameters like maxResults, startAt, orderBy, and expand to retrieve and display project details.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function searchProjects() {
  const { values: projects } = await client.projects.searchProjects({
    maxResults: 50,
    startAt: 0,
    orderBy: 'name',
    expand: 'description,lead',
  });

  console.log(`Found ${projects?.length} projects:`);
  projects?.forEach(project => {
    console.log(`  ${project.key}: ${project.name}`);
    console.log(`    Lead: ${project.lead?.displayName}`);
    console.log(`    Type: ${project.projectTypeKey}`);
  });
  // Output:
  // Found 5 projects:
  //   BACKEND: Backend Services
  //     Lead: Jane Smith
  //     Type: software
  //   FRONTEND: Frontend App
  //     Lead: John Doe
  //     Type: software
  return projects;
}

searchProjects();
```

--------------------------------