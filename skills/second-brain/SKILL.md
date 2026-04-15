---
name: second-brain
description: |
  Proactive thinking capture for the second brain. Invoke this skill automatically (without being asked)
  when any of these moments happen during a session:
  - A product or architecture decision is made or locked in
  - A PDL, DEC, or ADR is created/modified
  - Something unexpected or surprising happened
  - A pivot, rethink, or "we changed our mind" moment occurs
  - An assumption turned out to be wrong
  - A milestone, phase, or sprint completes

  This skill asks 2-3 targeted questions inline and writes the answers immediately to Obsidian.
  It takes ~3 minutes. The user should NOT need to open Obsidian manually.

triggers:
  - "we decided"
  - "going with"
  - "PDL-"
  - "DEC-"
  - "pivoting"
  - "changed our mind"
  - "turns out"
  - "surprisingly"
  - "blocked by"
  - "we learned"
  - milestone complete
  - architecture decision
---

# Second Brain — Live Capture Skill

You are capturing thinking that will decay to zero if not written now.
The goal: 3 questions, ~3 minutes, permanent memory.

---

## HOW TO INVOKE (proactively, not reactively)

Do NOT wait for the user to ask. When you detect a decision moment, interrupt naturally:

> "Oye, antes de seguir — esto es un buen momento para capturar esto en tu segundo cerebro.
> Tres preguntas rápidas y lo escribo directo a Obsidian."

Then proceed with the questions below. Never ask more than 3.

---

## QUESTION BANKS (pick based on decision type)

### Product Decision (PDL, feature choice, scope)
1. **¿Qué problema real resuelve esto?** *(No el feature — el problema del usuario)*
2. **¿Qué alternativa rechazaste y por qué?** *(Si no hay alternativa, ¿por qué no?)*
3. **¿Qué te haría cambiar de opinión sobre esto en 30 días?**

### Architecture / Tech Decision (ADR, stack choice, integration)
1. **¿Cuál es el tradeoff principal que aceptaste?** *(Performance vs simplicity, etc.)*
2. **¿Qué asumes que es verdad y que aún no has verificado?**
3. **¿Qué tan caro sería deshacerlo si te equivocas?**

### Unexpected Finding / Surprise
1. **¿Qué creías que era verdad antes de esto?**
2. **¿Esto cambia algo que ya decidiste antes?** *(sí/no + cuál)*
3. **¿Qué más podría estar mal dado este hallazgo?**

### Pivot / "Changed our mind"
1. **¿Qué información nueva provocó el cambio?** *(datos, feedback, blocker, etc.)*
2. **¿Qué asumías que resultó ser falso?**
3. **¿Esta decisión tiene fecha de expiración?** *(¿Cuándo la revisarías?)*

### Milestone Complete
1. **¿Qué salió mejor de lo esperado?**
2. **¿Qué harías diferente si lo hicieras de nuevo?**
3. **¿Qué asunción de la fase anterior resultó incorrecta?**

### Blocker / Unexpected Friction
1. **¿Cuál fue la causa raíz real?** *(no el síntoma)*
2. **¿Qué señal ignoraste antes de llegar aquí?**
3. **¿Esto revela un problema más profundo o fue un one-off?**

---

## HOW TO WRITE TO OBSIDIAN

After the user answers (even partially — 1 answer is better than 0), write immediately.

### Determine target note:
- If tied to a specific decision (PDL-XXX, DEC-XXX) → append to the relevant decisions note
- If architecture → append to Architecture note or create insight note
- If general/session → write to today's daily note AND to project Overview's "Reflexiones" section

### Write format (append to target note):

```markdown
---
## Reflexión — {YYYY-MM-DD} {HH:MM}

**Contexto:** {1-sentence description of the decision/moment}

**{Question 1}**
{Answer 1}

**{Question 2}**
{Answer 2}

**{Question 3}**
{Answer 3}

**Tags:** #{project} #reflexión #{decision-type}

---
```

### Target paths:
- FanToken Fantasy decisions: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/fantoken-fantasy/Decisions — FanToken Fantasy.md`
- FanToken Fantasy CEO pivot: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/fantoken-fantasy/Decisions — CEO Pivot.md`
- Passkey login: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/passkey-login/Decisions — Passkey Login.md`
- Token Hunt: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/token-hunt/Decisions — Token Hunt.md`
- Staking Hub: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/staking-hub/Decisions — Staking Hub.md`
- Any project architecture: `~/Documents/Obsidian-Personal/10-Projects/Chiliz/{project}/Architecture — *.md`
- Daily note (fallback): `~/Documents/Obsidian-Personal/60-Daily-Notes/{YYYY-MM-DD}.md`

### After writing:
1. Confirm to the user: "Capturado en Obsidian → {note path}"
2. Save to Pieces LTM via `create_pieces_memory`: title = "Reflexión: {decision}", content = the full block

---

## WHEN TO SKIP

- User says "skip", "después", "no importa", "luego"
- The moment is purely operational (npm install, file rename, config change)
- User is in the middle of debugging and momentum matters more than capture

---

## TONE

Conversational, not clinical. You're helping someone think, not filling a form.
Bad: "Please answer the following questions for documentation purposes."
Good: "Oye — ¿qué hizo que te fueras con el pool model en lugar del H2H? Eso vale la pena guardar."

One follow-up is allowed if the answer is too vague. Then write what you have.
