# workspace-cleanup

Scan the current working directory for accumulated temporary/deliverable files at the root level and remove them after confirmation.

## What it targets

Files at the **workspace root only** (not inside subdirectories) matching:

- Screenshots and image dumps: `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`
- Named deliverable patterns: `clone-*.png`, `auth-*.png`, `quinielazo-*.png`, `screenshot-*`, `capture-*`, `test-*.(png|jpg)`
- Temp files: `*.tmp`, `*.temp`, `*.log` (root-level only)
- Build artifacts dumped at root: `*.zip`, `*.tar.gz` files not part of the project

## What it never touches

- Anything inside `src/`, `public/`, `assets/`, `dist/`, `node_modules/`, `.git/`, `docs/`, `.gsd-t/`
- `.md`, `.json`, `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.html` files
- Named project files (package.json, README, CLAUDE.md, etc.)
- Any file inside a subdirectory

## Execution steps

1. Run bash to find matching files at the CWD root (depth 1, not recursive into project dirs)
2. Display the full list to the user with file sizes
3. If nothing found, report clean workspace
4. If files found, show total count and size, then delete them
5. Report final count of cleaned files

## Bash implementation

```bash
# Step 1: Find candidate files at root only (maxdepth 1, files only)
find . -maxdepth 1 -type f \( \
  -name "*.png" -o \
  -name "*.jpg" -o \
  -name "*.jpeg" -o \
  -name "*.gif" -o \
  -name "*.webp" -o \
  -name "*.tmp" -o \
  -name "*.temp" \
\) | sort
```

## Invocation

`/user:workspace-cleanup`

No arguments needed. Always runs in the current working directory.

## Skill reference

`~/.claude/skills/workspace-cleanup/SKILL.md`
