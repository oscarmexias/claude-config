#!/usr/bin/env bash
# bootstrap.sh — Restore Oscar's Claude Code environment on a new machine
#
# USAGE ON A NEW MACHINE:
#   Step 1: git clone git@github.com:oscarmexias/claude-config.git ~/.claude
#   Step 2: bash ~/.claude/bootstrap.sh
#
# This script handles everything after the initial claude-config clone.

set -euo pipefail

PERSONAL_ACCOUNT="oscarmexias"
WORK_ACCOUNT="oscar-mejia_chilizgr"

echo "=== Claude Code Bootstrap ==="
echo ""

# ── Prereqs ────────────────────────────────────────────────────────────────
command -v git  >/dev/null 2>&1 || { echo "ERROR: git not found"; exit 1; }

# ── Step 1: claude-agents → ~/.agents ─────────────────────────────────────
echo "[1/4] Cloning claude-agents → ~/.agents ..."
if [ -d ~/.agents/.git ]; then
  echo "  ~/.agents already a git repo — pulling latest"
  git -C ~/.agents pull
else
  git clone "git@github.com:${PERSONAL_ACCOUNT}/claude-agents.git" ~/.agents
fi
echo "  ✓ ~/.agents restored"

# ── Step 2: proyectos-workspace → ~/Desktop/Proyectos ─────────────────────
echo "[2/4] Cloning proyectos-workspace → ~/Desktop/Proyectos ..."
mkdir -p ~/Desktop/Proyectos
if [ -d ~/Desktop/Proyectos/.git ]; then
  echo "  Already a git repo — pulling latest"
  git -C ~/Desktop/Proyectos pull
else
  git clone "git@github.com:${PERSONAL_ACCOUNT}/proyectos-workspace.git" /tmp/proyectos-stage-$$
  rsync -a --exclude='.git' /tmp/proyectos-stage-$$/ ~/Desktop/Proyectos/
  rm -rf /tmp/proyectos-stage-$$
fi
echo "  ✓ ~/Desktop/Proyectos config restored"

# ── Step 3: chiliz-workspace → ~/Desktop/Chiliz ───────────────────────────
echo "[3/4] Cloning chiliz-workspace (work account)..."
mkdir -p ~/Desktop/Chiliz
if [ -d ~/Desktop/Chiliz/.git ]; then
  echo "  Already a git repo — pulling latest"
  git -C ~/Desktop/Chiliz pull
else
  if gh auth switch --user "$WORK_ACCOUNT" 2>/dev/null; then
    git clone "git@github.com:${WORK_ACCOUNT}/chiliz-workspace.git" /tmp/chiliz-stage-$$
    rsync -a --exclude='.git' /tmp/chiliz-stage-$$/ ~/Desktop/Chiliz/
    rm -rf /tmp/chiliz-stage-$$
    gh auth switch --user "$PERSONAL_ACCOUNT" 2>/dev/null || true
    echo "  ✓ ~/Desktop/Chiliz config restored"
  else
    echo "  ⚠ Could not switch to $WORK_ACCOUNT. Restore Chiliz manually:"
    echo "    gh auth switch --user $WORK_ACCOUNT"
    echo "    git clone git@github.com:${WORK_ACCOUNT}/chiliz-workspace.git /tmp/chiliz-stage"
    echo "    rsync -a --exclude='.git' /tmp/chiliz-stage/ ~/Desktop/Chiliz/"
  fi
fi

# ── Step 4: Permissions ────────────────────────────────────────────────────
echo "[4/4] Fixing executable permissions..."
chmod +x ~/.claude/bootstrap.sh \
         ~/.claude/statusline-command.sh \
         ~/.claude/statusline-debug.sh 2>/dev/null || true
find ~/.claude/hooks ~/.claude/scripts -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true
echo "  ✓ Permissions set"

# ── Verify symlinks ────────────────────────────────────────────────────────
echo ""
echo "Verifying skill symlinks..."
SYMLINK_COUNT=$(ls -la ~/.claude/skills/ 2>/dev/null | grep -c '^l' || echo 0)
echo "  Found $SYMLINK_COUNT symlinks in ~/.claude/skills/ (expect ~48)"

echo ""
echo "=== Bootstrap complete ==="
echo ""
echo "Manual steps remaining:"
echo "  1. Create ~/.secrets from your password manager (template: ~/.secrets.example)"
echo "     chmod 600 ~/.secrets"
echo "     Add to ~/.zshrc: source ~/.secrets"
echo ""
echo "  2. Restore .env.local files for individual projects (fantoken-fantasy, etc.)"
echo ""
echo "  3. Clone individual projects into their workspaces:"
echo "     ~/Desktop/Proyectos/{Resonant Migration,SBS,Kinez,...}"
echo "     ~/Desktop/Chiliz/{token-hunt,passkey-login,fantoken-fantasy,...}"
echo ""
echo "  4. Reinstall Claude Code plugins:"
echo "     cat ~/.claude/plugins/installed_plugins.json"
echo ""
echo "  5. Restart terminal or: source ~/.zshrc"
