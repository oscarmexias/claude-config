# Get Sprint Information using Jira.js

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Shows how to retrieve sprint information from Jira using the Jira.js library. This requires an authenticated client instance and calling the `getSprint` method.

```javascript
import JiraClient from 'jira.js';

const client = new JiraClient({
  site: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your-email@example.com',
      apiToken: 'YOUR_API_TOKEN'
    }
  }
});

async function getSprintInfo(sprintId) {
  try {
    const sprint = await client.sprint.getSprint(sprintId);
    console.log('Sprint details:', sprint);
  } catch (error) {
    console.error('Error fetching sprint:', error);
  }
}

getSprintInfo('YOUR_SPRINT_ID');
```

--------------------------------