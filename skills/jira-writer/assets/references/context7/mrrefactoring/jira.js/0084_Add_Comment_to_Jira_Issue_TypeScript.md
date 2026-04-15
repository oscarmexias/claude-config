# Add Comment to Jira Issue (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Adds a comment to a specified Jira issue. This function supports adding regular comments and threaded replies by referencing a parent comment's ID. It requires an initialized Version3Client.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function addComment() {
  const comment = await client.issueComments.addComment({
    issueIdOrKey: 'MYPROJECT-123',
    body: 'This issue has been investigated. Root cause identified in the authentication service.',
  });

  console.log(`Comment added with ID: ${comment.id}`);

  // Add a threaded reply to an existing comment
  const reply = await client.issueComments.addComment({
    issueIdOrKey: 'MYPROJECT-123',
    parentId: comment.id, // Reply to the previous comment
    body: 'Thanks for investigating. Can you provide more details on the fix?',
  });

  console.log(`Reply added with ID: ${reply.id}`);
  return comment;
}

addComment();
```

--------------------------------