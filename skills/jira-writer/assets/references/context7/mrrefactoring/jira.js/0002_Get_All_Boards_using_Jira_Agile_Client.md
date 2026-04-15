# Get All Boards using Jira Agile Client

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Retrieves all agile boards accessible by the authenticated user. Allows filtering by board type and name, and limiting results. Outputs the total number of boards found and details for each board.

```typescript
import { AgileClient } from 'jira.js';

const client = new AgileClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function getAllBoards() {
  const boards = await client.board.getAllBoards({
    type: 'scrum', // or 'kanban'
    name: 'Backend', // Filter by name
    maxResults: 50,
  });

  console.log(`Found ${boards.total} boards:`);
  boards.values?.forEach(board => {
    console.log(`  ${board.id}: ${board.name} (${board.type})`);
    console.log(`    Project: ${board.location?.projectKey}`);
  });
  // Output:
  // Found 3 boards:
  //   1: Backend Team Board (scrum)
  //     Project: BACKEND
  //   2: Backend Kanban (kanban)
  //     Project: BACKEND
  return boards;
}

getAllBoards();
```

--------------------------------