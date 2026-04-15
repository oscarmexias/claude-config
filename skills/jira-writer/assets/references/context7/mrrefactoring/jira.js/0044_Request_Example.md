# Request Example

```javascript
// Example usage within jira.js client
await client.projects.searchProjects({
  maxResults: 50,
  startAt: 0,
  orderBy: 'name',
  expand: 'description,lead',
});
```

- **values** (array) - An array of project objects.
  - **key** (string) - The project key.
  - **name** (string) - The project name.
  - **projectTypeKey** (string) - The type of the project (e.g., 'software').
  - **lead** (object) - Information about the project lead.
    - **displayName** (string) - The display name of the lead.
  - **description** (string) - The project description.