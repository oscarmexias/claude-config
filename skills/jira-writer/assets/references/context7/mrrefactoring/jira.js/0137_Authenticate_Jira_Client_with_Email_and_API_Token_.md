# Authenticate Jira Client with Email and API Token (TypeScript)

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

Configures the Jira.js client using email and an API token for authentication. This method is suitable for server-side applications or scripts where direct user interaction for OAuth is not feasible. Ensure you replace placeholder values with your actual domain, email, and API token.

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
  },
});
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.