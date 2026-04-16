# New Machine Setup — Guía completa de restauración

> Sigue este orden exacto. Cada paso depende del anterior.

---

## Paso 1 — Instalar herramientas base

```bash
# Homebrew (si no está)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"

# Formulae
brew install gh bun poppler rtk semgrep tmux uv watchman yt-dlp

# Cask
brew install --cask iterm2
```

## Paso 2 — Node vía nvm

```bash
# Instalar nvm (ver versión actual en https://github.com/nvm-sh/nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.zshrc

# Node LTS + globals
nvm install --lts
nvm use --lts
npm i -g @tekyzinc/gsd-t@latest claude-mem mcp-remote skill-creator vercel
```

## Paso 3 — Autenticación GitHub (ambas cuentas)

```bash
# Cuenta personal
gh auth login --hostname github.com
# Seleccionar: oscar mejias / oscarmexias

# Cuenta de trabajo
gh auth login --hostname github.com
# Seleccionar: oscar-mejia_chilizgr

# Verificar ambas activas
gh auth status
```

## Paso 4 — Restaurar Claude Code config (LO MÁS IMPORTANTE)

```bash
# Clonar claude-config directamente a ~/.claude
git clone https://github.com/oscarmexias/claude-config.git ~/.claude

# El bootstrap hace TODO lo demás:
bash ~/.claude/bootstrap.sh
```

Esto instala:
- `~/.agents/` (skills compartidos, 47+)
- `~/Desktop/Proyectos/` (workspace personal)
- `~/Desktop/Chiliz/` (workspace trabajo)
- Symlinks de skills
- Permisos ejecutables en scripts/hooks

## Paso 5 — Restaurar dotfiles

```bash
# Copiar configs de shell (bootstrap.sh hace esto si está actualizado)
cp ~/.claude/dotfiles/.zshrc ~/.zshrc
cp ~/.claude/dotfiles/.gitconfig ~/.gitconfig
cp ~/.claude/dotfiles/.gitconfig-chiliz ~/.gitconfig-chiliz
cp ~/.claude/dotfiles/.gitconfig-personal ~/.gitconfig-personal

# Recargar shell
source ~/.zshrc
```

## Paso 6 — Secretos (desde password manager)

```bash
# Crear ~/.secrets siguiendo el template:
cat ~/.claude/.secrets.example

# Crear el archivo:
nano ~/.secrets
# Pegar valores desde 1Password / Apple Notes

# Permisos correctos:
chmod 600 ~/.secrets

# Verificar que se carga:
source ~/.secrets
echo $FIGMA_PERSONAL_ACCESS_TOKEN
```

## Paso 7 — Obsidian vaults

```bash
# Instalar Obsidian desktop app primero (ver Paso 9)

# Vault personal (ya tiene remote configurado)
git clone https://github.com/oscarmexias/obsidian-personal.git ~/Documents/Obsidian-Personal

# Vault Chiliz (cuenta trabajo)
gh auth switch --user oscar-mejia_chilizgr
git clone https://github.com/oscar-mejia_chilizgr/obsidian-chiliz.git ~/Documents/Obsidian-Chiliz
gh auth switch --user oscarmexias

# Abrir Obsidian → Open folder as vault → seleccionar cada directorio
```

## Paso 8 — MCP Servers

Los servidores MCP se configuran en `~/.claude/settings.json` (ya restaurado por bootstrap). La mayoría son remotos (no necesitan instalación local). Los que requieren acción manual:

Ver lista completa en `~/.claude/inventory/mcp-servers.txt`

Servidores locales que podrían necesitar reinstalación:
- `playwright` — se instala automáticamente cuando se necesita
- `semgrep` — instalado vía `brew install semgrep` (ya hecho en Paso 1)
- `context7` — remoto, no requiere instalación

Para registrar un MCP server manualmente:
```bash
claude mcp add <nombre> <url-o-comando>
```

## Paso 9 — Apps de escritorio

Instalar manualmente desde sus páginas oficiales o App Store:
- **Claude Code** — desktop app (https://claude.ai/download)
- **Obsidian** — https://obsidian.md/download
- **1Password** — App Store
- **Antigravity** — desde tu cuenta (IDE con Gemini/Claude fork)

## Paso 10 — Proyectos individuales

Clonar según necesidad. Lista completa de repos:

### Cuenta personal (oscarmexias)
```bash
cd ~/Desktop/Proyectos
git clone https://github.com/oscarmexias/resonant-migration.git "Resonant Migration/resonant-migration"
git clone https://github.com/oscarmexias/quinielazo-clone.git quinielazo-clone
# SBS, St. Valentin, Madame Flihan, Kinez — verificar repos en github.com/oscarmexias
```

### Cuenta trabajo (oscar-mejia_chilizgr)
```bash
gh auth switch --user oscar-mejia_chilizgr
cd ~/Desktop/Chiliz
git clone https://github.com/oscar-mejia_chilizgr/fantoken-fantasy.git fantoken-fantasy
git clone https://github.com/oscar-mejia_chilizgr/passkey-login.git passkey-login
git clone https://github.com/oscar-mejia_chilizgr/locker-room.git locker-room
git clone https://github.com/oscar-mejia_chilizgr/staking-hub.git staking-hub
git clone https://github.com/oscar-mejia_chilizgr/limit-orders.git limit-orders
git clone https://github.com/oscar-mejia_chilizgr/token-page.git token-page
gh auth switch --user oscarmexias
```

## Paso 11 — Verificación final

```bash
# GSD-T activo
gsd-t --version

# RTK activo
rtk --version

# Skills disponibles en Claude Code (abrir claude y hacer /user:gsd)
# debe sugerir comandos

# Verify symlinks (~48 symlinks)
ls -la ~/.claude/skills/ | grep -c '^l'

# Verify secrets cargados
echo $FIGMA_PERSONAL_ACCESS_TOKEN | head -c 10
```

---

## Reinstalar plugins de Claude Code

```bash
cat ~/.claude/plugins/installed_plugins.json
# Reinstalar cada uno vía: /plugin install <nombre>
```

---

## Inventarios de referencia

Snapshots generados el día del backup:

| Archivo | Contenido |
|---------|-----------|
| `~/.claude/inventory/brew-formulae.txt` | Brew formulae instaladas |
| `~/.claude/inventory/brew-casks.txt` | Brew casks instaladas |
| `~/.claude/inventory/npm-globals.txt` | NPM globals instalados |
| `~/.claude/inventory/mcp-servers.txt` | Lista de MCP servers activos |

Ver también: `~/.claude/WORKING-STYLE.md` para la forma de trabajo y convenciones.
