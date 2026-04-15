#!/bin/sh
# statusline-command.sh — Claude Code status bar
# Shows: path | [project · status] | git branch | ctx% | $cost | model [thinking] | duration

input=$(cat)

cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // ""')
model=$(echo "$input" | jq -r '.model.display_name // ""')
model_id=$(echo "$input" | jq -r '.model.id // ""')
used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
total_in=$(echo "$input" | jq -r '.context_window.total_input_tokens // empty')
total_out=$(echo "$input" | jq -r '.context_window.total_output_tokens // empty')
duration_ms=$(echo "$input" | jq -r '.duration_ms // empty')

# ── Path (shorten $HOME to ~) ──────────────────────────────────────────────────
home="$HOME"
short_cwd="${cwd#$home}"
[ "$short_cwd" != "$cwd" ] && short_cwd="~$short_cwd"

# ── Model (normalize to sonnet / opus / haiku or truncated id) ────────────────
model_part=""
if [ -n "$model" ] && [ "$model" != "null" ]; then
  model_lower=$(echo "$model" | tr '[:upper:]' '[:lower:]')
  case "$model_lower" in
    *sonnet*) model_short="sonnet" ;;
    *opus*)   model_short="opus"   ;;
    *haiku*)  model_short="haiku"  ;;
    *)        model_short=$(echo "$model" | cut -c1-10) ;;
  esac

  # ── Thinking effort — from JSON fields (future-proof) + model id fallback ──
  # Claude Code may expose thinking budget as: .thinking_budget_tokens (int),
  # .extended_thinking (bool/obj), or .thinking.budget_tokens.
  # None are confirmed in the current spec, so we read them gracefully and fall
  # back to model-id heuristic. If all signals absent → no segment (clean).
  thinking_part=""
  thinking_budget=$(echo "$input" | jq -r '
    .thinking_budget_tokens //
    .thinking.budget_tokens //
    (.extended_thinking | if type == "object" then .budget_tokens else null end) //
    empty' 2>/dev/null)
  thinking_active=$(echo "$input" | jq -r '
    .extended_thinking |
    if type == "boolean" then (if . then "true" else "false" end)
    elif type == "object" then "true"
    else "false"
    end' 2>/dev/null)

  if [ -n "$thinking_budget" ] && [ "$thinking_budget" != "null" ]; then
    # Numeric budget present — bucket by size
    if   [ "$thinking_budget" -ge 10000 ]; then thinking_part=" 🧠 max"
    elif [ "$thinking_budget" -ge 4000  ]; then thinking_part=" 🧠 mid"
    else                                        thinking_part=" 🧠 low"
    fi
  elif [ "$thinking_active" = "true" ]; then
    thinking_part=" 🧠 mid"
  else
    # Last resort: model id contains "thinking" keyword
    model_id_lower=$(echo "$model_id" | tr '[:upper:]' '[:lower:]')
    case "$model_id_lower" in
      *thinking*max*)  thinking_part=" 🧠 max" ;;
      *thinking*high*) thinking_part=" 🧠 max" ;;
      *thinking*mid*)  thinking_part=" 🧠 mid" ;;
      *thinking*low*)  thinking_part=" 🧠 low" ;;
      *thinking*)      thinking_part=" 🧠 mid" ;;
    esac
  fi

  model_part="  |  ⚡ ${model_short}${thinking_part}"
fi

# ── Context indicator ──────────────────────────────────────────────────────────
if [ -n "$used" ]; then
  used_int=$(printf "%.0f" "$used")
  if   [ "$used_int" -ge 80 ]; then ctx_icon="🔴"
  elif [ "$used_int" -ge 60 ]; then ctx_icon="⚠️ "
  else                               ctx_icon="✅ "
  fi
  ctx_part="ctx ${ctx_icon}${used_int}%"
else
  ctx_part="ctx [--]"
fi

# ── Cost (session total from native field, fallback to token estimate) ─────────
cost_part=""
session_cost=$(echo "$input" | jq -r '.cost.total_cost_usd // empty' 2>/dev/null)
if [ -n "$session_cost" ] && [ "$session_cost" != "null" ] && [ "$session_cost" != "0" ]; then
  formatted=$(awk "BEGIN{printf \"%.2f\", $session_cost}" 2>/dev/null)
  [ -n "$formatted" ] && cost_part="  |  💰 \$${formatted}"
elif [ -n "$total_in" ] && [ -n "$total_out" ] && \
     [ "$total_in" != "null" ] && [ "$total_out" != "null" ]; then
  model_id_lc=$(echo "$model_id" | tr '[:upper:]' '[:lower:]')
  case "$model_id_lc" in
    *opus*)  price_in="15"; price_out="75" ;;
    *haiku*) price_in="0.80"; price_out="4" ;;
    *)       price_in="3"; price_out="15" ;;
  esac
  estimated=$(awk "BEGIN{
    cost = ($total_in / 1000000 * $price_in) + ($total_out / 1000000 * $price_out)
    if (cost > 0) printf \"%.2f\", cost
  }" 2>/dev/null)
  [ -n "$estimated" ] && cost_part="  |  💰 ~\$${estimated}"
fi

# ── Duration ───────────────────────────────────────────────────────────────────
dur_part=""
if [ -n "$duration_ms" ] && [ "$duration_ms" != "null" ] && [ "$duration_ms" != "0" ]; then
  dur_sec=$(awk "BEGIN{printf \"%d\", $duration_ms/1000}")
  dur_min=$(awk "BEGIN{printf \"%d\", $dur_sec/60}")
  dur_rem=$(awk "BEGIN{printf \"%d\", $dur_sec - $dur_min*60}")
  if [ "$dur_min" -ge 60 ]; then
    dur_hr=$(awk "BEGIN{printf \"%d\", $dur_min/60}")
    dur_min_rem=$(awk "BEGIN{printf \"%d\", $dur_min - $dur_hr*60}")
    dur_fmt="${dur_hr}h ${dur_min_rem}m"
  elif [ "$dur_min" -gt 0 ]; then
    dur_fmt="${dur_min}m ${dur_rem}s"
  else
    dur_fmt="${dur_sec}s"
  fi
  dur_part="  |  ${dur_fmt}"
fi

# ── Git branch ────────────────────────────────────────────────────────────────
git_part=""
if [ -n "$cwd" ]; then
  branch=$(git -C "$cwd" branch --show-current 2>/dev/null)
  [ -n "$branch" ] && git_part="  |  ${branch}"
fi

# ── GSD-T project + status ────────────────────────────────────────────────────
gsd_part=""
progress_file="${cwd}/.gsd-t/progress.md"
if [ -f "$progress_file" ]; then
  project=$(grep -m1 '^## Project:' "$progress_file" | sed 's/^## Project: *//')
  status=$(grep -m1 '^## Status:' "$progress_file" | sed 's/^## Status: *//')
  if [ -n "$project" ]; then
    if [ -n "$status" ] && [ "$status" != "READY" ]; then
      gsd_part="  |  [${project} · ${status}]"
    else
      gsd_part="  |  [${project}]"
    fi
  fi
fi

printf "%s%s%s  |  %s%s%s%s" \
  "$short_cwd" "$gsd_part" "$git_part" \
  "$ctx_part" \
  "$cost_part" "$dur_part" "$model_part"
