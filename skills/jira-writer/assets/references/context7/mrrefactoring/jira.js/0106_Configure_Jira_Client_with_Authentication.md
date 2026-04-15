# Configure Jira Client with Authentication

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Demonstrates how to set up the Jira client using either Basic Authentication with an email and API token or OAuth 2.0. This is essential for authenticating requests to the Jira API.

```typescript
import { Version3Client } from 'jira.js';

// Basic Authentication with email and API token
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your@email.com',
      apiToken: 'YOUR_API_TOKEN', // Create at https://id.atlassian.com/manage-profile/security/api-tokens
    },
  },
});

// OAuth 2.0 Authentication
const oauthClient = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: {
      accessToken: 'YOUR_OAUTH_ACCESS_TOKEN',
    },
  },
});
```

--------------------------------