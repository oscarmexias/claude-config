# Handle Jira API Errors

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Demonstrates robust error handling for Jira API interactions. It distinguishes between server-side errors (HttpException) and network/configuration issues (AxiosError), logging relevant details for each. This pattern helps in debugging and providing user-friendly error messages.

```typescript
import { Version3Client, HttpException } from 'jira.js';
import { AxiosError } from 'axios';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function handleErrors() {
  try {
    await client.issues.getIssue({ issueIdOrKey: 'INVALID-999' });
  } catch (error) {
    if (error instanceof HttpException) {
      // Server responded with an error
      console.error('Server Error:', error.message);
      console.error('Status Code:', error.status);
      console.error('Error Data:', error.data);
      // Output:
      // Server Error: Issue Does Not Exist
      // Status Code: 404
      // Error Data: { errorMessages: ['Issue Does Not Exist'], errors: {} }
    } else if (error instanceof AxiosError) {
      // Network or configuration error
      console.error('Network Error:', error.code);
      console.error('Message:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
}

handleErrors();
```

--------------------------------