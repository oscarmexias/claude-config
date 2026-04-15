# Search Jira Issues using JQL (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Searches for Jira issues using Jira Query Language (JQL). This function returns paginated results and allows configuration of fields to retrieve and expansion options. It requires an initialized Version3Client.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function searchIssues() {
  const results = await client.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
    jql: 'project = MYPROJECT AND status = "In Progress" ORDER BY created DESC',
    maxResults: 50,
    startAt: 0,
    fields: ['summary', 'status', 'assignee', 'created'],
  });

  console.log(`Found ${results.total} issues`);
  results.issues?.forEach(issue => {
    console.log(`${issue.key}: ${issue.fields.summary} [${issue.fields.status?.name}]`);
  });
  // Output:
  // Found 15 issues
  // MYPROJECT-456: Implement dark mode [In Progress]
  // MYPROJECT-455: Fix navigation bug [In Progress]
  return results;
}

searchIssues();
```

--------------------------------