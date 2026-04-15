# Move Issues to Sprint using Jira Agile Client

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Moves specified issues into a target sprint and optionally ranks them relative to another issue. After moving, it retrieves and lists the issues currently in the sprint. Requires sprint ID and a list of issue keys.

```typescript
import { AgileClient } from 'jira.js';

const client = new AgileClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function moveIssuesToSprint() {
  await client.sprint.moveIssuesToSprintAndRank({
    sprintId: 23,
    issues: ['MYPROJECT-101', 'MYPROJECT-102', 'MYPROJECT-103'],
    rankAfterIssue: 'MYPROJECT-100', // Position after this issue
  });

  console.log('Issues moved to sprint successfully');

  // Get issues in the sprint
  const sprintIssues = await client.sprint.getIssuesForSprint({
    sprintId: 23,
    maxResults: 50,
    fields: ['summary', 'status', 'assignee'],
  });

  console.log(`Sprint has ${sprintIssues.total} issues`);
  sprintIssues.issues?.forEach(issue => {
    console.log(`  ${issue.key}: ${issue.fields.summary}`);
  });
}

moveIssuesToSprint();
```

--------------------------------