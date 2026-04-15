# Request Example

```bash
curl --request GET \
  --url 'https://your-domain.atlassian.net/rest/api/3/project?query=MyProject&expand=lead'
```

- **id** (string) - The unique identifier for the project.
- **key** (string) - The project key.
- **name** (string) - The name of the project.
- **projectTypeKey** (string) - The type of the project (e.g., 'software', 'service_desk', 'business').
- **lead** (object) - Details of the project lead.
  - **accountId** (string) - The account ID of the user.
  - **displayName** (string) - The display name of the user.
  - **avatarUrls** (object) - URLs for the user's avatars.
  - **active** (boolean) - Whether the user is active.