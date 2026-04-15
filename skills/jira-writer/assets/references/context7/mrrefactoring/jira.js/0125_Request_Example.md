# Request Example

```javascript
// Example usage within jira.js client
const myself = await client.myself.getCurrentUser();
await client.projects.createProject({
  key: 'NEWPROJ',
  name: 'New Project',
  description: 'A new software development project',
  leadAccountId: myself.accountId,
  projectTypeKey: 'software',
  projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-scrum-template',
});
```