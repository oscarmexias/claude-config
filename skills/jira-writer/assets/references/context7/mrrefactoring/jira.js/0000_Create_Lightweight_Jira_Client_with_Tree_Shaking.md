# Create Lightweight Jira Client with Tree Shaking

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Illustrates how to create a custom, lightweight Jira client by selectively importing only the necessary API modules. This technique, known as tree shaking, significantly reduces the final bundle size for applications that only use a subset of the library's features.

```typescript
import { BaseClient } from 'jira.js';
import { Issues, Projects, IssueSearch } from 'jira.js/version3';
import { Board, Sprint } from 'jira.js/agile';

// Custom client with only the APIs you need
class LightweightClient extends BaseClient {
  issues = new Issues(this);
  projects = new Projects(this);
  issueSearch = new IssueSearch(this);
  board = new Board(this);
  sprint = new Sprint(this);
}

const client = new LightweightClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function useCustomClient() {
  // Use only the imported APIs
  const issue = await client.issues.getIssue({ issueIdOrKey: 'MYPROJECT-123' });
  const boards = await client.board.getAllBoards();

  console.log(`Issue: ${issue.key}`);
  console.log(`Boards: ${boards.total}`);
}

useCustomClient();
```

--------------------------------