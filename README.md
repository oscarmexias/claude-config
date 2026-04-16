# claude-config

Private repo backing up Oscar's Claude Code global configuration.

## What's in here

```
.claude/          ← Global Claude Code config (~/.claude/)
  CLAUDE.md       ← AI writing rules, GSD-T workflow, prime directives
  RTK.md          ← RTK Rust Token Killer reference
  settings.json   ← Model, tools, global permissions
  skills/         ← 17 custom skills (real files, not symlinks)
  agents/         ← 6 custom agents (cv-tailor, debugger, etc.)
  commands/       ← 50 user commands (gsd-t-*, branch, checkin, etc.)
  hooks/          ← rtk-rewrite.sh, semgrep-scan.sh
  scripts/        ← 18 scripts (gsd-t, journal, pieces, UI arsenal, etc.)
  memory/         ← bugs.md persistent memory
  plugins/        ← installed_plugins.json (plugin list; binaries reinstalled)
  statusline-*.sh ← Shell prompt integration scripts
  .secrets.example← Template for ~/.secrets (no real values)
  bootstrap.sh    ← New-machine setup script

.agents/          ← Shared skill library (~/.agents/) — source of skill symlinks
  skills/         ← 47 shared skills
  .skill-lock.json← Skill version lock
```

## Symlinks note

`~/.claude/skills/` contains ~48 symlinks pointing to `~/.agents/skills/`.
These are relative symlinks: `../../.agents/skills/<name>`.
After bootstrap, they resolve correctly as long as both dirs are at `~` level.

## Key docs

- **[NEW-MACHINE-SETUP.md](NEW-MACHINE-SETUP.md)** — Complete step-by-step guide from a blank machine
- **[WORKING-STYLE.md](WORKING-STYLE.md)** — Work philosophy, frameworks (GSD-T/BMAD/Paperclip), session protocol, conventions
- **[dotfiles/](dotfiles/)** — `.zshrc`, `.gitconfig`, `.gitconfig-chiliz`, `.gitconfig-personal`
- **[inventory/](inventory/)** — Snapshots: brew formulae, npm globals, MCP servers

## Restoring on a new machine

```bash
# Step 1: clone this repo directly to ~/.claude
git clone git@github.com:oscarmexias/claude-config.git ~/.claude

# Step 2: run bootstrap — handles ~/.agents (claude-agents repo), Proyectos, Chiliz
bash ~/.claude/bootstrap.sh

# Step 3: restore ~/.secrets from your password manager
#   Template at: ~/.secrets.example
#   chmod 600 ~/.secrets
#   Add to ~/.zshrc: source ~/.secrets
```

## Keeping it up to date (on current machine)

```bash
# Pull latest from all 3 repos
git -C ~/.claude pull
git -C ~/.agents pull
git -C ~/Desktop/Proyectos pull
git -C ~/Desktop/Chiliz pull
```

## What's NOT in this repo

- `settings.local.json` (machine-specific permissions)
- `plans/`, `todos/`, `shell-snapshots/`, `history.jsonl` (ephemeral)
- `cache/`, `tmp/`, `telemetry/` (runtime junk)
- `~/.secrets` (real credential values — stored in password manager)

## Related repos

- `oscarmexias/proyectos-workspace` — `~/Desktop/Proyectos/` workspace config
- `oscar-mejia_chilizgr/chiliz-workspace` — `~/Desktop/Chiliz/` workspace config
