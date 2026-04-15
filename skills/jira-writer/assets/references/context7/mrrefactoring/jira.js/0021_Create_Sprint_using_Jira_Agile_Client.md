# Create Sprint using Jira Agile Client

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Creates a new sprint for an agile project. Requires AgileClient initialization with host and authentication. Inputs include sprint name, origin board ID, start and end dates, and a goal. Outputs the created sprint's name and ID.

```typescript
import { AgileClient } from 'jira.js';

const client = new AgileClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function createSprint() {
  const sprint = await client.sprint.createSprint({
    name: 'Sprint 15 - Q4 Features',
    originBoardId: 1, // Board ID where sprint will be created
    startDate: '2024-01-15T09:00:00.000Z',
    endDate: '2024-01-29T17:00:00.000Z',
    goal: 'Complete user authentication module and dashboard redesign',
  });

  console.log(`Sprint created: ${sprint.name} (ID: ${sprint.id})`);
  console.log(`State: ${sprint.state}`);
  // Output:
  // Sprint created: Sprint 15 - Q4 Features (ID: 23)
  // State: future
  return sprint;
}

createSprint();
```

--------------------------------