# Tree Shaking and Bundle Optimization with Jira.js

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

Demonstrates how to import only necessary modules from Jira.js to minimize bundle size, leading to faster load times and better performance. This example shows creating a custom client with specific modules like Issues and Board.

```typescript
// custom-client.ts
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';
import { Board } from 'jira.js/agile';

export class CustomClient extends BaseClient {
  issues = new Issues(this);
  board = new Board(this);
}

// Usage
const client = new CustomClient({ /* config */ });
await client.issues.getIssue({ issueIdOrKey: 'KEY-1' });
```

--------------------------------