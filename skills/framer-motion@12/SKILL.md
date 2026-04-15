---
name: |
  ui-arsenal
description: |
  Proactive UI/UX design advisor that audits what you're building and recommends which design skill to activate — animation quality, component discovery, Stitch workflow, canvas output, or production aesthetics.
---

# ui-arsenal

Proactive UI/UX design advisor that audits what you're building and recommends which design skill to activate — animation quality, component discovery, Stitch workflow, canvas output, or production aesthetics.

## CLI Commands

```bash
# Add user content
skill-creator add-skill --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12" [--title "Title" --content "Content"]|[--file=*.md]

# Search documentation
skill-creator search-skill --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12" "query" [--mode=auto|chroma|fuzzy]

# Download Context7 docs
skill-creator download-context7 --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12" <context7_library_id>

# Update Context7 docs
skill-creator download-context7 --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12" --force [<context7_library_id>]

# List all Context7 projects
skill-creator list-context7 --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12"

# Remove Context7 project
skill-creator remove-context7 --pwd "/Users/oscar.mejia/.claude/skills/framer-motion@12" <context7_library_id>
```

## User Skills

<user-skills baseDir="assets/references/user">
</user-skills>

## Context7 Documentation

<!-- Context7 projects will be listed here automatically -->
