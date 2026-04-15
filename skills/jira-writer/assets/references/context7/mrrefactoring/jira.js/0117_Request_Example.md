# Request Example

```javascript
// Example usage within jira.js client
await client.myself.getCurrentUser();
```

- **displayName** (string) - The display name of the user.
- **accountId** (string) - The unique account ID of the user.
- **emailAddress** (string) - The email address of the user.
- **timeZone** (string) - The timezone of the user.
- **active** (boolean) - Indicates if the user account is active.