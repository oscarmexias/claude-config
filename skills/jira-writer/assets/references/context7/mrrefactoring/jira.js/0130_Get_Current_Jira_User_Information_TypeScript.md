# Get Current Jira User Information (TypeScript)

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Retrieves information about the currently authenticated Jira user. It initializes the Jira client and then calls the getCurrentUser method to fetch details such as display name, account ID, email, timezone, and active status, logging these details to the console.

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function getCurrentUser() {
  const user = await client.myself.getCurrentUser();

  console.log(`Display Name: ${user.displayName}`);
  console.log(`Account ID: ${user.accountId}`);
  console.log(`Email: ${user.emailAddress}`);
  console.log(`Timezone: ${user.timeZone}`);
  console.log(`Active: ${user.active}`);
  // Output:
  // Display Name: John Doe
  // Account ID: 5b10ac8d82e05b22cc7d4ef5
  // Email: john.doe@example.com
  // Timezone: America/New_York
  // Active: true
  return user;
}

getCurrentUser();
```

--------------------------------