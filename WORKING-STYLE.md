# Working Style — Forma de trabajo de Oscar

Documento de referencia para restaurar la forma de trabajar en un equipo nuevo, o para cualquier agente que necesite entender el contexto de trabajo.

---

## Identidad y cuentas

| Contexto | Cuenta GitHub | Email | Repo workspace |
|---------|---------------|-------|----------------|
| Personal | `oscarmexias` | oscarmexias@gmail.com | `~/Desktop/Proyectos/` |
| Trabajo (Chiliz) | `oscar-mejia_chilizgr` | oscar.mejia@chiliz.com | `~/Desktop/Chiliz/` |

**Regla crítica**: nunca hacer cross-push. Si estás en `~/Desktop/Chiliz/`, la cuenta activa debe ser `oscar-mejia_chilizgr`. Si estás en `~/Desktop/Proyectos/`, debe ser `oscarmexias`. El `.gitconfig` usa `includeIf` para aplicar la cuenta correcta automáticamente.

Cambiar cuenta cuando se necesita:
```bash
gh auth switch --user oscar-mejia_chilizgr  # trabajo
gh auth switch --user oscarmexias            # personal
```

---

## Idioma

- **Código, commits, docs, PRs, Jira, Slack laboral**: inglés.
- **Conversaciones en Claude**: español (Spanglish OK).
- Nunca usar: leverage, seamlessly, cutting-edge, pivotal, delve, streamline, ensure, robust, innovative, game-changer. Reemplazar con lenguaje específico.
- No abrir mensajes con: "Hey all 👋", "Great question", "Absolutely", "Happy to help". Empezar con sustancia.

---

## Filosofía de trabajo

- **Action > planning**: si el camino es claro, ejecutar sin esperar confirmación.
- **Parallel agents**: para tareas independientes, lanzar agentes en paralelo (un solo mensaje con múltiples `Agent` tool calls). No ejecutar secuencialmente lo que puede ir en paralelo.
- **Verify before asserting**: antes de afirmar que algo está hecho, verificarlo con herramientas (Read, Bash, Grep). "Actualizado correctamente" no prueba nada — mostrar las líneas modificadas.
- **Simplicity above all**: el cambio mínimo que resuelve el problema. Sin refactors no pedidos, sin abstracciones prematuras.

---

## Frameworks disponibles

Tres frameworks, cada uno con su contexto:

| Framework | Fase | Usar cuando |
|-----------|------|-------------|
| **GSD-T** | Build | Greenfield, milestones, contract-driven dev |
| **BMAD v6** | Build | Roles separados PM/Architect/Dev, spec heavy |
| **Paperclip** | Operate | Producto en vivo, ops autónomas en background |

**Regla de decisión al iniciar un proyecto:**
- Solo dev, iteración rápida → GSD-T
- Equipo, roles separados, PRD elaborado → BMAD
- Ambos pueden coexistir (GSD-T ejecuta, BMAD consulta como persona)
- Producto ya vivo con usuarios → Paperclip

### GSD-T rápido

```bash
/user:gsd        # smart router — describir qué necesitas
/user:gsd-t-wave # ciclo completo automático
```

Estructura: `PROJECT → MILESTONE → PARTITION → PLAN → EXECUTE → VERIFY → COMPLETE`

State en: `.gsd-t/progress.md` | Backlog: `.gsd-t/backlog.md` | Contratos: `.gsd-t/contracts/`

---

## Session START (siempre)

1. Llamar `ask_pieces_ltm` con: *"what was Oscar working on yesterday and today, key decisions and files?"*
2. Mostrar digest de 5 líneas antes de empezar.
3. Leer `STATUS.md` del proyecto activo.
4. Revisar `PROJECT-JOURNAL.md` para tareas pendientes.

## Session END (siempre)

1. Llamar `create_pieces_memory` con resumen de sesión (título: "Session {fecha} {proyecto}").
2. Si hay contenido narrativo (tensión, insight, decisión interesante): append a `~/Documents/Obsidian-Personal/20-Areas/Brand/Voice Journal.md`.
3. Daily note en Obsidian se escribe automáticamente por el hook Stop — no invocar manualmente.

---

## Component Scout (obligatorio antes de UI)

Antes de construir cualquier componente UI, correr `/user:component-scout [tema]` para buscar en:
- 21st.dev / Aceternity / Magic UI / shadcn

Si el componente existe ahí → usar/adaptar (documentar fuente en la tarea). Solo construir desde cero si ninguno aplica o el costo de adaptación supera el de construcción.

Triggers obligatorios:
| Fase GSD-T | Cuándo |
|-----------|--------|
| `gsd-t-brainstorm` | Tema involucra UI o diseño |
| `gsd-t-partition` | Dominio incluye frontend |
| `gsd-t-plan` | Tareas de componentes UI |
| `gsd-t-milestone` | Milestone con scope UI significativo |

---

## Skill creation

Siempre crear skills nuevas vía `/agent:skill-creator`. Nunca escribir archivos de skill manualmente.

Skills viven en `~/.agents/skills/` (fuente) y en `~/.claude/skills/` (symlinks).

```bash
npx skills list           # ver disponibles
npx skills find "<tema>"  # buscar
```

---

## Destructive Action Guard

Antes de CUALQUIERA de estas acciones, DETENER y pedir confirmación explícita:

- DROP TABLE, TRUNCATE, DELETE sin WHERE
- Renombrar/eliminar tablas o columnas de DB
- Reemplazar arquitectura existente
- Eliminar módulos/endpoints que funcionan
- Cualquier cambio que obligue a reescribir otras partes

**Regla**: adaptar código nuevo a estructuras existentes. No al revés.

---

## Pre-Commit Gate

Antes de cada commit, verificar:

```
¿Estoy en el branch correcto?
¿Cambié endpoints de API? → actualizar .gsd-t/contracts/api-contract.md + Swagger
¿Cambié schema de DB? → actualizar .gsd-t/contracts/schema-contract.md
¿Cambié componentes UI? → actualizar .gsd-t/contracts/component-contract.md
¿Agregué archivos? → actualizar scope.md del dominio
¿Implementé o cambié requisitos? → actualizar docs/requirements.md
¿Cambié arquitectura? → actualizar docs/architecture.md
¿Hice cualquier cambio de archivo? → entrada en .gsd-t/progress.md Decision Log
¿Corrí los tests? → verificar que pasan
```

---

## Autonomía

**Level 3 — Full Auto** en todos los workspaces.

Solo pausar para:
1. Errores irrecuperables (después de 2 intentos de fix)
2. Ambigüedad que cambia dirección del proyecto fundamentalmente
3. Milestone completado (checkpoint para revisión)
4. Destructive actions (siempre pausar, sin excepción)

---

## Statusline

La barra de información inferior de Claude Code está configurada en:
- `~/.claude/statusline-command.sh` — script que genera el contenido
- `~/.claude/statusline-debug.sh` — debug del statusline

Ya está respaldado en `claude-config`. El bootstrap restaura permisos ejecutables automáticamente. No requiere reinstalación manual.

---

## Herramientas del arsenal

Ver `~/.claude/inventory/` para snapshots de:
- brew formulae y casks instaladas
- npm globals con versiones
- MCP servers activos

Ver `~/.claude/NEW-MACHINE-SETUP.md` para la guía completa de instalación paso a paso.
