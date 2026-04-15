# Transition Jira Issue Workflow Status (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Transitions a Jira issue to a different status in its workflow. Before transitioning, it's recommended to fetch available transitions using `getTransitions`. This function requires an initialized Version3Client.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function transitionIssue() {
  // First, get available transitions for the issue
  const transitions = await client.issues.getTransitions({
    issueIdOrKey: 'MYPROJECT-123',
  });

  console.log('Available transitions:');
  transitions.transitions?.forEach(t => {
    console.log(`  ${t.id}: ${t.name}`);
  });
  // Output:
  // Available transitions:
  //   21: In Progress
  //   31: Done
  //   41: Blocked

  // Perform the transition
  await client.issues.doTransition({
    issueIdOrKey: 'MYPROJECT-123',
    transition: { id: '21' }, // Move to "In Progress"
  });

  console.log('Issue transitioned to In Progress');
}

transitionIssue();
```

--------------------------------