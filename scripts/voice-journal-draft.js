#!/usr/bin/env node
/**
 * voice-journal-draft.js
 * Auto-drafts a Voice Journal entry in Obsidian after each session.
 *
 * Strategy: fill what the machine CAN know (project, what happened technically),
 * leave FILL IN placeholders for what only Oscar can write (tension, decision, clip).
 * The goal is zero-friction capture — Oscar edits, not creates from scratch.
 *
 * Runs from Stop / SessionEnd hook (async, non-blocking).
 * Guard: skips if Voice Journal already has an entry for today.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const OBSIDIAN_VAULT = '/Users/oscar.mejia/Documents/Obsidian-Personal';
const VOICE_JOURNAL_PATH = path.join(OBSIDIAN_VAULT, '20-Areas/Brand/Voice Journal.md');
const STAMP_FILE = path.join(os.tmpdir(), 'voice-journal-draft.stamp');

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

function getProjectName(safeCwd) {
  const parts = safeCwd.split('/');
  for (const marker of ['Proyectos', 'Chiliz', 'Desktop', 'Documents']) {
    const idx = parts.indexOf(marker);
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
  }
  return path.basename(safeCwd);
}

function readTodayProgressEntries(safeCwd) {
  // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  const progressFile = path.join(safeCwd, '.gsd-t', 'progress.md');
  if (!fs.existsSync(progressFile)) return null;
  try {
    const today = getToday();
    const lines = fs.readFileSync(progressFile, 'utf8').split('\n');
    const entries = lines
      .filter(l => l.match(/^- \d{4}-\d{2}-\d{2}/) && l.startsWith(`- ${today}`))
      .slice(-6);
    return entries.length > 0 ? entries : null;
  } catch { return null; }
}

function fetchClaudeMemObservations() {
  const DB_PATH = path.join(os.homedir(), '.claude-mem', 'claude-mem.db');
  if (!fs.existsSync(DB_PATH)) return null;
  try {
    const { spawnSync } = require('child_process');
    const cutoff = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();
    const sql = `SELECT title FROM observations WHERE created_at > '${cutoff}' ORDER BY id DESC LIMIT 4;`;
    const result = spawnSync('sqlite3', [DB_PATH, sql], { timeout: 4000 });
    if (result.status !== 0 || result.error) return null;
    const rows = result.stdout.toString().trim().split('\n').filter(Boolean);
    return rows.length > 0 ? rows.map(r => `- ${r.trim()}`).join('\n') : null;
  } catch { return null; }
}

// Returns true if today already has a COMPLETED (non-draft) entry OR a draft in the Voice Journal.
// A draft has [borrador] in the header. A completed entry does not.
// Rule: skip if there's already a completed entry today.
//       skip if there's already a draft today (stamp-based, to avoid N drafts per day).
function alreadyDraftedToday() {
  const today = getToday();

  // Stamp: already wrote a draft today
  try {
    const stamp = JSON.parse(fs.readFileSync(STAMP_FILE, 'utf8'));
    if (stamp.date === today) return true;
  } catch {}

  // Scan journal: if today's entry exists but has NO [borrador] tag → human wrote it → skip
  try {
    if (!fs.existsSync(VOICE_JOURNAL_PATH)) return false;
    const content = fs.readFileSync(VOICE_JOURNAL_PATH, 'utf8');
    const headerRegex = new RegExp(`^## ${today}`, 'm');
    if (!headerRegex.test(content)) return false; // no entry today → don't skip
    // Entry exists — only skip if it's a non-draft (human-written)
    const draftRegex = new RegExp(`^## ${today}.*\\[borrador\\]`, 'm');
    return !draftRegex.test(content); // skip if it's a human entry; allow if only draft exists (stamp already handles that case above)
  } catch { return false; }
}

function writeStamp(date) {
  try { fs.writeFileSync(STAMP_FILE, JSON.stringify({ date }), 'utf8'); } catch {}
}

function buildDraft(projectName, progressEntries, memObs) {
  const today = getToday();

  // Build "what happened" from available sources
  const happenedLines = [];
  if (progressEntries && progressEntries.length > 0) {
    progressEntries.forEach(e => happenedLines.push(e.replace(/^- \d{4}-\d{2}-\d{2} \d{2}:\d{2}: /, '- ')));
  } else if (memObs) {
    memObs.split('\n').forEach(l => happenedLines.push(l));
  }

  const happenedStr = happenedLines.length > 0
    ? happenedLines.join('\n')
    : '_(sesión conversacional — sin actividad en GSD-T)_';

  return `
## ${today} — ${projectName} [borrador]

**La tensión:** [FILL IN — qué había en juego hoy, qué no era obvio desde afuera]

**El momento:**
${happenedStr}

**La decisión que me costó:** [FILL IN — qué cambiaste de idea, qué trade-off hiciste, qué descartaste]

**Pregunta sin resolver:** [FILL IN — opcional, si algo quedó abierto]

**Clip:** [FILL IN — una línea para compartir en redes o Substack]

---
`;
}

function main() {
  try {
    const rawCwd = process.env.PWD || process.cwd();
    const safeCwd = sanitizeCwd(rawCwd);
    if (!safeCwd) {
      console.log('[voice-journal-draft] Skipped — path outside allowed dirs');
      return;
    }

    if (alreadyDraftedToday()) {
      console.log('[voice-journal-draft] Skipped — already drafted today');
      return;
    }

    const projectName = getProjectName(safeCwd);
    const progressEntries = readTodayProgressEntries(safeCwd);
    const memObs = fetchClaudeMemObservations();

    // Skip if purely idle session (no GSD-T activity AND no claude-mem context)
    if (!progressEntries && !memObs) {
      console.log('[voice-journal-draft] Skipped — no meaningful activity to draft from');
      return;
    }

    const draft = buildDraft(projectName, progressEntries, memObs);

    // Ensure Voice Journal exists
    if (!fs.existsSync(VOICE_JOURNAL_PATH)) {
      fs.mkdirSync(path.dirname(VOICE_JOURNAL_PATH), { recursive: true });
      const header = '# Voice Journal\n\nFuente de contenido para Substack/blog.\nFormato: tensión · momento · decisión · clip\n\n---\n';
      fs.writeFileSync(VOICE_JOURNAL_PATH, header, 'utf8');
    }

    fs.appendFileSync(VOICE_JOURNAL_PATH, draft, 'utf8');
    writeStamp(getToday());

    console.log(`[voice-journal-draft] Drafted entry for "${projectName}" → Voice Journal`);
  } catch (err) {
    console.error(`[voice-journal-draft] Error: ${err.message}`);
  }
}

main();
