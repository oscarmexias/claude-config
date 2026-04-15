# Sprint API

Source: https://github.com/mrrefactoring/jira.js/blob/master/README.md

Endpoints for managing sprints within Jira.

```APIDOC

- **name** (string) - Required - The name of the sprint.
- **originBoardId** (integer) - Required - The ID of the board for which to create the sprint.
- **startDate** (string) - Optional - The start date of the sprint in ISO 8601 format (YYYY-MM-DD).
- **endDate** (string) - Optional - The end date of the sprint in ISO 8601 format (YYYY-MM-DD).
- **goal** (string) - Optional - The goal of the sprint.