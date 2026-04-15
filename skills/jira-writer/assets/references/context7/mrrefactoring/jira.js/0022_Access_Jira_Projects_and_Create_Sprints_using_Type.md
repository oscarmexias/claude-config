# Access Jira Projects and Create Sprints using TypeScript

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

Demonstrates how to fetch all projects and create a new sprint using the Jira client library. This requires an authenticated client instance. The `searchProjects` method returns project data, while `createSprint` takes sprint details as an argument.

```typescript
const projects = await client.projects.searchProjects();
const sprint = await client.sprint.createSprint({ name: 'Q4 Sprint' });
```

--------------------------------