# Response Example

```json
[
  {
    "id": "10000",
    "name": "Default Configuration"
  }
]
```
```

--------------------------------

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Partially updates an existing sprint's properties. Can be used to start a sprint by setting its state to 'active' with current dates, close a sprint by setting state to 'closed', or update the sprint's goal. Requires the sprint ID.

```typescript
import { AgileClient } from 'jira.js';

const client = new AgileClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function manageSprint() {
  // Start a sprint (requires future state with dates set)
  await client.sprint.partiallyUpdateSprint({
    sprintId: 23,
    state: 'active',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks
  });
  console.log('Sprint started');

  // Complete a sprint (requires active state)
  await client.sprint.partiallyUpdateSprint({
    sprintId: 23,
    state: 'closed',
  });
  console.log('Sprint completed');

  // Update sprint goal
  await client.sprint.partiallyUpdateSprint({
    sprintId: 24,
    goal: 'Updated sprint goal: Focus on performance improvements',
  });
  console.log('Sprint goal updated');
}

manageSprint();
```

--------------------------------