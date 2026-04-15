# Response Example

```json
[
  {
    "id": "10001",
    "name": "Bug",
    "description": "A problem with the product.",
    "subtask": false
  }
]
```
```

--------------------------------

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Creates a new service desk request on behalf of a customer. Requires ServiceDeskClient initialization. Inputs include service desk ID, request type ID, and field values for summary and description. Can optionally specify a user to raise the request for.

```typescript
import { ServiceDeskClient } from 'jira.js';

const client = new ServiceDeskClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function createCustomerRequest() {
  const request = await client.request.createCustomerRequest({
    serviceDeskId: '1',
    requestTypeId: '10', // Get from getRequestTypes
    requestFieldValues: {
      summary: 'Cannot access email on mobile device',
      description: 'I am unable to sync my corporate email on my iPhone since yesterday.',
    },
    raiseOnBehalfOf: 'customer-account-id', // Optional: raise for another user
  });

  console.log(`Request created: ${request.issueKey}`);
  console.log(`Status: ${request.currentStatus?.status}`);
  // Output:
  // Request created: SUPPORT-456
  // Status: Waiting for support
  return request;
}

createCustomerRequest();
```

--------------------------------