# Response Example

```json
{
  "status": "success"
}
```
```

--------------------------------

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Demonstrates how to create a new issue in Jira using the Jira.js library. This involves initializing a client with authentication and then calling the `createIssue` method.

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

async function createJiraIssue() {
  try {
    const issue = await client.issues.createIssue({
      fields: {
        project: {
          key: 'PROJ'
        },
        summary: 'New bug in login page',
        description: 'Detailed description of the bug.',
        issuetype: {
          name: 'Bug'
        }
      }
    });
    console.log('Issue created:', issue);
  } catch (error) {
    console.error('Error creating issue:', error);
  }
}

createJiraIssue();
```

--------------------------------