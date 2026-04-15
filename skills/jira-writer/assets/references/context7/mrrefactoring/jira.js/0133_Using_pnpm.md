# Using pnpm

pnpm add jira.js
```

--------------------------------

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

Configures the Jira.js client using an OAuth 2.0 access token. This method is typically used for applications requiring user authorization. The library supports authorization code grants, and you are responsible for implementing the token acquisition flow.

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: { accessToken: 'YOUR_ACCESS_TOKEN' },
  },
});
```

--------------------------------