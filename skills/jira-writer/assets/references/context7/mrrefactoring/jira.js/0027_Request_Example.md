# Request Example

```json
{
  "jql": "project = \"TEST\" AND status = \"Open\"",
  "maxResults": 50,
  "fields": ["summary", "assignee", "reporter"]
}
```

- **total** (integer) - The total number of issues found.
- **issues** (array) - A list of issues matching the search criteria.
  - **id** (string) - The ID of the issue.
  - **key** (string) - The key of the issue.
  - **fields** (object) - The fields of the issue.