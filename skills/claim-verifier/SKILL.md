---
name: |
  claim-verifier
description: |
  Verifies every quantitative claim in documents against traceable source documents. Classifies claims as VERIFIED, DERIVED, INFERRED, PROJECTED, or INVENTED.
---

# claim-verifier

Verifies every quantitative claim in documents against traceable source documents. Classifies claims as VERIFIED, DERIVED, INFERRED, PROJECTED, or INVENTED.

## CLI Commands

```bash
# Add user content
skill-creator add-skill --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier" [--title "Title" --content "Content"]|[--file=*.md]

# Search documentation
skill-creator search-skill --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier" "query" [--mode=auto|chroma|fuzzy]

# Download Context7 docs
skill-creator download-context7 --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier" <context7_library_id>

# Update Context7 docs
skill-creator download-context7 --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier" --force [<context7_library_id>]

# List all Context7 projects
skill-creator list-context7 --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier"

# Remove Context7 project
skill-creator remove-context7 --pwd "/Users/oscar.mejia/.claude/skills/claim-verifier" <context7_library_id>
```

## User Skills

<user-skills baseDir="assets/references/user">
</user-skills>

## Context7 Documentation

<!-- Context7 projects will be listed here automatically -->
