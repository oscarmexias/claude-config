export PATH="$HOME/.local/bin:$PATH"

# Added by Antigravity
export PATH="/Users/oscar.mejia/.antigravity/antigravity/bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# ═══════════════════════════════════════════════════════════
# 🌃 CYBERPUNK THEME
# ═══════════════════════════════════════════════════════════

# Colors
CYBER_PINK="%F{201}"
CYBER_CYAN="%F{51}"
CYBER_YELLOW="%F{226}"
CYBER_GREEN="%F{46}"
CYBER_PURPLE="%F{93}"
CYBER_RED="%F{196}"
RESET="%f"

# Git branch function
cyber_git_branch() {
    git branch 2>/dev/null | grep '^*' | sed 's/* / /'
}

# Prompt
setopt PROMPT_SUBST
PROMPT='
${CYBER_PURPLE}┌──[${CYBER_CYAN}%n${CYBER_PINK}@${CYBER_CYAN}%m${CYBER_PURPLE}]─[${CYBER_YELLOW}%~${CYBER_PURPLE}]$(cyber_git_branch)
${CYBER_PURPLE}└─${CYBER_GREEN}⚡${RESET} '

RPROMPT='${CYBER_PURPLE}[${CYBER_PINK}%D{%H:%M}${CYBER_PURPLE}]${RESET}'

# ═══════════════════════════════════════════════════════════
eval "$(/opt/homebrew/bin/brew shellenv)"

# Secrets — tokens y API keys (archivo local, nunca en git)
[ -f "$HOME/.secrets" ] && source "$HOME/.secrets"

# ═══════════════════════════════════════════════════════════
# Chiliz Workspace — parallel agent teams con split-panes
# Usar cuando Claude sugiera un caso de uso para agent teams
# ═══════════════════════════════════════════════════════════
parallel-agent() {
  local session="chiliz"
  if [ -z "$TMUX" ]; then
    if tmux has-session -t "$session" 2>/dev/null; then
      tmux attach-session -t "$session"
    else
      tmux new-session -s "$session" -c "$HOME/Desktop/Chiliz" \; \
        send-keys "claude --teammate-mode split-panes" Enter \; \
        attach-session -t "$session"
    fi
  else
    cd "$HOME/Desktop/Chiliz" && claude --teammate-mode split-panes
  fi
}
alias sports-skills="/tmp/sports-env/bin/sports-skills"

# Claude Code agent teams split view
alias claude-team="claude --worktree --tmux"
alias ct="claude --worktree --tmux"

# Added by Antigravity
export PATH="/Users/oscar.mejia/.antigravity/antigravity/bin:$PATH"

# bun completions
[ -s "/Users/oscar.mejia/.bun/_bun" ] && source "/Users/oscar.mejia/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

alias claude-mem='/Users/oscar.mejia/.bun/bin/bun "/Users/oscar.mejia/.claude/plugins/marketplaces/thedotmack/plugin/scripts/worker-service.cjs"'
