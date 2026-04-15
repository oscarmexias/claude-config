# Add Attachment to Jira Issue

Source: https://context7.com/mrrefactoring/jira.js/llms.txt

Uploads a file as an attachment to a specified Jira issue. This function requires a Version3Client instance and uses Node.js's 'fs' module to read the file content. The 'noCheckAtlassianToken' option is necessary for attachment uploads. It returns an array of attachment details upon success.

```typescript
import { Version3Client } from 'jira.js';
import * as fs from 'fs';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'your@email.com', apiToken: 'YOUR_API_TOKEN' },
  },
  noCheckAtlassianToken: true, // Required for attachment uploads
});

async function addAttachment() {
  const attachments = await client.issueAttachments.addAttachment({
    issueIdOrKey: 'MYPROJECT-123',
    attachment: {
      filename: 'error-screenshot.png',
      file: fs.readFileSync('./screenshots/error.png'),
      mimeType: 'image/png',
    },
  });

  console.log('Attachment added:');
  attachments.forEach(att => {
    console.log(`  ${att.filename} (${att.size} bytes)`);
    console.log(`  URL: ${att.content}`);
  });
  return attachments;
}

addAttachment();
```

--------------------------------