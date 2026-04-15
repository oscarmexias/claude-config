# Retrieve Service Desk Customer Requests with Filtering

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Fetches customer requests from a Service Desk instance, allowing filtering by status and limiting the number of results. It expands details like participant and status for each request. Requires a ServiceDeskClient instance with host and authentication details.

```typescript
import { ServiceDeskClient } from 'jira.js';

const client = new ServiceDeskClient({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
});

async function getCustomerRequests() {
  const requests = await client.request.getCustomerRequests({
    serviceDeskId: 1,
    requestStatus: 'OPEN_REQUESTS',
    limit: 25,
    expand: 'participant,status',
  });

  console.log(`Found ${requests.size} open requests:`);
  requests.values?.forEach(req => {
    console.log(`  ${req.issueKey}: ${req.requestFieldValues?.find(f => f.fieldId === 'summary')?.value}`);
    console.log(`    Status: ${req.currentStatus?.status}`);
    console.log(`    Reporter: ${req.reporter?.displayName}`);
  });
  return requests;
}

getCustomerRequests();
```

--------------------------------