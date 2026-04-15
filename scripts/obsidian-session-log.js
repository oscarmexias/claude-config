#!/usr/bin/env node
/**
 * obsidian-session-log.js
 * Writes a session summary to the Obsidian daily note.
 * Designed for SessionEnd hook — fires once when the session closes.
 *
 * Guard: skips write if last entry for this project was < 30 min ago
 * and has no new GSD-T activity (prevents spam on rapid session restarts).
 *
 * Semgrep note: path.join calls below use process.env.PWD (shell working
 * directory — not user HTTP input). Paths validated against ALLOWED_CWD_PREFIXES.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const OBSIDIAN_VAULT = '/Users/oscar.mejia/Documents/Obsidian-Personal';
const DAILY_NOTES_DIR = path.join(OBSIDIAN_VAULT, '60-Daily-Notes');
const STAMP_FILE = path.join(os.tmpdir(), 'obsidian-session-log.stamp');
const MIN_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes between writes for same project + no new activity

const ALLOWED_CWD_PREFIXES = [
  '/Users/oscar.mejia/Desktop/',
  '/Users/oscar.mejia/Documents/',
  '/Users/oscar.mejia/Projects/',
];

function sanitizeCwd(rawCwd) {
  if (!rawCwd || typeof rawCwd !== 'string') return null;
  const isAllowed = ALLOWED_CWD_PREFIXES.some(prefix => rawCwd.startsWith(prefix));
  if (!isAllowed) return null;
  return rawCwd.replace(/\/+$/, '');
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getTime() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

function getProjectName(safeCwd) {
  const parts = safeCwd.split('/');
  for (const marker of ['Proyectos', 'Chiliz', 'Desktop', 'Documents']) {
    const idx = parts.indexOf(marker);
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
  }
  return path.basename(safeCwd);
}

function readLastProgressEntries(safeCwd, maxEntries = 5) {
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const progressFile = path.join(safeCwd, '.gsd-t', 'progress.md');
  if (!fs.existsSync(progressFile)) return null;
  try {
    const today = getToday();
    const lines = fs.readFileSync(progressFile, 'utf8').split('\n');
    const entries = lines
      .filter(l => l.match(/^- \d{4}-\d{2}-\d{2}/) && l.startsWith(`- ${today}`))
      .slice(-maxEntries);
    return entries.length > 0 ? entries : null;
  } catch { return null; }
}

function readCurrentMilestone(safeCwd) {
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const progressFile = path.join(safeCwd, '.gsd-t', 'progress.md');
  if (!fs.existsSync(progressFile)) return null;
  try {
    const content = fs.readFileSync(progressFile, 'utf8');
    const m = content.match(/\*\*Milestone\*\*:\s*(.+)/);
    const p = content.match(/\*\*Phase\*\*:\s*(.+)/);
    return m ? { milestone: m[1].trim(), phase: p?.[1]?.trim() } : null;
  } catch { return null; }
}

function readStatusTodos(safeCwd) {
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const statusFile = path.join(safeCwd, 'STATUS.md');
  if (!fs.existsSync(statusFile)) return null;
  try {
    const lines = fs.readFileSync(statusFile, 'utf8').split('\n');
    const todos = lines.filter(l => l.trim().startsWith('- [ ]')).slice(0, 3);
    return todos.length > 0 ? todos : null;
  } catch { return null; }
}

// Returns a fingerprint of current state to detect if anything changed
function getActivityFingerprint(safeCwd, progressEntries, milestone) {
  const milestoneStr = milestone ? `${milestone.milestone}:${milestone.phase}` : 'none';
  const entriesStr = progressEntries ? progressEntries.join('|') : 'none';
  return `${safeCwd}::${milestoneStr}::${entriesStr}`;
}

function readStamp() {
  try {
    return JSON.parse(fs.readFileSync(STAMP_FILE, 'utf8'));
  } catch { return null; }
}

function writeStamp(data) {
  try { fs.writeFileSync(STAMP_FILE, JSON.stringify(data), 'utf8'); } catch {}
}

function shouldSkip(fingerprint) {
  const stamp = readStamp();
  if (!stamp) return false;
  const elapsed = Date.now() - stamp.ts;
  // Skip if same fingerprint (nothing changed) AND within throttle window
  return stamp.fingerprint === fingerprint && elapsed < MIN_INTERVAL_MS;
}

function ensureDailyNote(filePath, date) {
  if (!fs.existsSync(filePath)) {
    const header = `---\ndate: ${date}\ntype: daily-note\ntags: [daily]\n---\n\n# ${date}\n\n`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, header, 'utf8');
  }
}

/**
 * Reads the last session summary from the claude-mem REST API.
 * Returns the narrative text or null if unavailable / too old.
 */
function fetchClaudeMemSummary() {
  try {
    const { spawnSync } = require('child_process');
    const url = 'http://localhost:37777/api/summaries?limit=1';
    const result = spawnSync('curl', ['-s', '-m', '3', url], { timeout: 4000 });
    if (result.status !== 0 || result.error) return null;
    const data = JSON.parse(result.stdout.toString());
    const item = data?.items?.[0];
    if (!item) return null;
    const tsRaw = item.createdAt || item.created_at;
    if (!tsRaw) return null;
    const age = Date.now() - new Date(tsRaw).getTime();
    if (isNaN(age) || age > 2 * 60 * 60 * 1000) return null;
    const text = item.completed || item.learned || item.summary || item.narrative || item.text;
    if (!text || typeof text !== 'string') return null;
    return text;
  } catch { return null; }
}

/**
 * Fallback: reads recent observations directly from the claude-mem SQLite DB.
 * Used when session_summaries are empty (e.g., parser failure in worker).
 * Returns up to 3 narrative bullets from the last 2 hours, or null.
 */
function fetchClaudeMemObservations() {
  const DB_PATH = path.join(os.homedir(), '.claude-mem', 'claude-mem.db');
  if (!fs.existsSync(DB_PATH)) return null;
  try {
    const { spawnSync } = require('child_process');
    const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const sql = `SELECT title, narrative FROM observations WHERE created_at > '${cutoff}' ORDER BY id DESC LIMIT 3;`;
    const result = spawnSync('sqlite3', [DB_PATH, sql], { timeout: 4000 });
    if (result.status !== 0 || result.error) return null;
    const rows = result.stdout.toString().trim().split('\n').filter(Boolean);
    if (rows.length === 0) return null;
    return rows.map(row => {
      const [title, ...rest] = row.split('|');
      return `- ${title?.trim() || rest.join('|').substring(0, 100)}`;
    }).join('\n');
  } catch { return null; }
}

function buildEntry(projectName, safeCwd, progressEntries, milestone) {
  const time = getTime();
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const isGsdProject = fs.existsSync(path.join(safeCwd, '.gsd-t', 'progress.md'));

  let entry = `\n### Claude Code — ${time}\n`;
  entry += `**Proyecto:** ${projectName}\n`;

  if (milestone) {
    entry += `**Milestone:** ${milestone.milestone}`;
    if (milestone.phase) entry += ` · **Fase:** ${milestone.phase}`;
    entry += '\n';
  }

  if (progressEntries && progressEntries.length > 0) {
    entry += `\n**Actividad:**\n`;
    progressEntries.forEach(e => { entry += `${e}\n`; });
  } else if (isGsdProject) {
    entry += `_(GSD-T activo — sin nuevas entradas en el Decision Log hoy)_\n`;
  } else {
    const todos = readStatusTodos(safeCwd);
    if (todos) {
      entry += `\n**Próximo:**\n`;
      todos.forEach(t => { entry += `${t}\n`; });
    } else {
      entry += `_(Sesión exploratoria o conversacional)_\n`;
    }
  }

  const memSummary = fetchClaudeMemSummary() || fetchClaudeMemObservations();
  if (memSummary) {
    entry += `\n**claude-mem:**\n${memSummary.trim()}\n`;
  }

  entry += '\n---\n';
  return entry;
}

function main() {
  try {
    const rawCwd = process.env.PWD || process.cwd();
    const safeCwd = sanitizeCwd(rawCwd);
    if (!safeCwd) {
      console.log(`[obsidian-session-log] Skipped — path outside allowed dirs`);
      return;
    }

    const progressEntries = readLastProgressEntries(safeCwd);
    const milestone = readCurrentMilestone(safeCwd);
    const fingerprint = getActivityFingerprint(safeCwd, progressEntries, milestone);

    if (shouldSkip(fingerprint)) {
      console.log(`[obsidian-session-log] Skipped — no new activity since last write`);
      return;
    }

    const today = getToday();
    const dailyNotePath = path.join(DAILY_NOTES_DIR, `${today}.md`);
    const projectName = getProjectName(safeCwd);

    ensureDailyNote(dailyNotePath, today);

    const entry = buildEntry(projectName, safeCwd, progressEntries, milestone);
    fs.appendFileSync(dailyNotePath, entry, 'utf8');
    writeStamp({ ts: Date.now(), fingerprint });

    console.log(`[obsidian-session-log] Logged "${projectName}" to ${today}.md`);
  } catch (err) {
    console.error(`[obsidian-session-log] Error: ${err.message}`);
  }
}

main();
