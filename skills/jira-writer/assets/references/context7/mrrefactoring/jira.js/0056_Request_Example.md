# Request Example

```javascript
// Example usage within jira.js client

// Assign to a specific user
await client.issues.assignIssue({
  issueIdOrKey: 'MYPROJECT-123',
  accountId: '5b10ac8d82e05b22cc7d4ef5',
});

// Set to unassigned
await client.issues.assignIssue({
  issueIdOrKey: 'MYPROJECT-124',
  accountId: null,
});

// Assign to default assignee
await client.issues.assignIssue({
  issueIdOrKey: 'MYPROJECT-125',
  accountId: '-1',
});
```