# Get Issue Worklogs with Pagination (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Retrieves all worklogs for a given Jira issue, supporting pagination to handle large numbers of worklogs. It initializes a Jira client, then iteratively fetches worklogs until all are retrieved, logging the total count and details of each worklog.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function getAllWorklogs() {
  const worklogs: any[] = [];
  let offset = 0;
  let total = 0;

  do {
    const response = await client.issueWorklogs.getIssueWorklog({
      issueIdOrKey: 'MYPROJECT-123',
      startAt: offset,
      maxResults: 100,
    });

    offset += response.worklogs?.length || 0;
    total = response.total || 0;
    worklogs.push(...(response.worklogs || []));
  } while (offset < total);

  console.log(`Total worklogs: ${worklogs.length}`);
  worklogs.forEach(w => {
    console.log(`  ${w.author?.displayName}: ${w.timeSpent} - ${w.comment}`);
  });
  return worklogs;
}

getAllWorklogs();
```

--------------------------------