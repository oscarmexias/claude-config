#!/usr/bin/env node
/**
 * reflection-injector.js
 * UserPromptSubmit hook — scans Obsidian Chiliz notes for decisions that
 * have been sitting >14 days without a "Reflexión" block.
 *
 * Outputs a [SECOND BRAIN] context block so Claude can proactively surface
 * stale decisions if they become relevant during the session.
 *
 * Security: only reads files under ALLOWED_VAULT_PREFIX. No writes.
 * Output is capped at 5 items max to avoid polluting context window.
 */

const fs = require('fs');
const path = require('path');

const VAULT = '/Users/oscar.mejia/Documents/Obsidian-Personal';
const CHILIZ_PROJECTS = path.join(VAULT, '10-Projects/Chiliz');
const STAMP_FILE = '/tmp/reflection-injector.stamp';
const COOLDOWN_MS = 60 * 60 * 1000; // Re-check at most once per hour
const STALE_DAYS = 14;
const ALLOWED_VAULT_PREFIX = '/Users/oscar.mejia/Documents/Obsidian-Personal';

// ── Safety ───────────────────────────────────────────────────────────────────

function safePath(p) {
  // p is always a hardcoded internal constant (CHILIZ_PROJECTS or recursive child), never user input.
  const resolved = path.resolve(p); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
  if (!resolved.startsWith(ALLOWED_VAULT_PREFIX)) return null;
  return resolved;
}

// ── Stamp guard ───────────────────────────────────────────────────────────────

function shouldSkip() {
  try {
    const stamp = JSON.parse(fs.readFileSync(STAMP_FILE, 'utf8'));
    return (Date.now() - stamp.ts) < COOLDOWN_MS;
  } catch { return false; }
}

function writeStamp() {
  try { fs.writeFileSync(STAMP_FILE, JSON.stringify({ ts: Date.now() })); } catch {}
}

// ── File scanner ──────────────────────────────────────────────────────────────

function walkDecisionFiles(dir) {
  const safe = safePath(dir);
  if (!safe || !fs.existsSync(safe)) return [];
  const results = [];
  try {
    const entries = fs.readdirSync(safe, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.includes('/') || entry.name.includes('..')) continue; // reject traversal names
      const full = path.join(safe, entry.name); // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
      if (entry.isDirectory()) {
        results.push(...walkDecisionFiles(full));
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.md') &&
        (entry.name.toLowerCase().includes('decision') || entry.name.toLowerCase().includes('adr'))
      ) {
        results.push(full);
      }
    }
  } catch { /* skip unreadable dirs */ }
  return results;
}

// ── Decision staleness analysis ───────────────────────────────────────────────

/**
 * Finds decision entries (## PDL-XXX, ## DEC-XXX, ## ADR lines) that:
 * 1. Have a date > STALE_DAYS ago
 * 2. Do NOT have a "Reflexión" block below them (before the next ## heading)
 */
function findStaleDecisions(filePath) {
  const safe = safePath(filePath);
  if (!safe) return [];

  let content;
  try { content = fs.readFileSync(safe, 'utf8'); } catch { return [] }

  const lines = content.split('\n');
  const stale = [];
  const today = Date.now();
  const staleThreshold = STALE_DAYS * 24 * 60 * 60 * 1000;

  // Match decision headers: ## PDL-001, ## DEC-001, ## ADR-001, ## Decision:
  const decisionPattern = /^#{1,3}\s+(PDL-\d+|DEC-\d+|ADR-\d+|Decision\s*\d*)/i;
  // Date pattern anywhere in text: YYYY-MM-DD
  const datePattern = /(\d{4}-\d{2}-\d{2})/;
  // Reflexión marker
  const reflexionPattern = /^#{1,4}\s*Reflexi[oó]n/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!decisionPattern.test(line)) continue;

    const decisionId = line.match(decisionPattern)?.[1] || 'Decision';

    // Find date in this line or next 3 lines
    let decisionDate = null;
    for (let j = i; j < Math.min(i + 4, lines.length); j++) {
      const m = lines[j].match(datePattern);
      if (m) { decisionDate = new Date(m[1]); break; }
    }
    if (!decisionDate || isNaN(decisionDate.getTime())) continue;

    const age = today - decisionDate.getTime();
    if (age < staleThreshold) continue; // Too recent, skip

    // Check if there's a Reflexión block before the next ## heading
    let hasReflexion = false;
    for (let j = i + 1; j < lines.length; j++) {
      if (/^#{1,3}\s/.test(lines[j]) && j > i + 1) break; // Next section
      if (reflexionPattern.test(lines[j])) { hasReflexion = true; break; }
    }
    if (hasReflexion) continue;

    // Extract 1-line description (first non-empty, non-header line after heading)
    let description = '';
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
      const candidate = lines[j].trim();
      if (candidate && !candidate.startsWith('#') && !candidate.startsWith('|')) {
        // Strip markdown bold/italic
        description = candidate.replace(/\*\*|__|\*|_/g, '').substring(0, 80);
        break;
      }
    }

    const daysAgo = Math.floor(age / (24 * 60 * 60 * 1000));
    const projectMatch = filePath.match(/10-Projects\/Chiliz\/([^/]+)\//);
    const project = projectMatch?.[1] || 'chiliz';

    stale.push({ id: decisionId, description, daysAgo, project, file: path.basename(filePath) });
  }

  return stale;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  if (shouldSkip()) return; // Silent exit — no output, no injection

  const files = walkDecisionFiles(CHILIZ_PROJECTS);
  const allStale = [];

  for (const file of files) {
    const stale = findStaleDecisions(file);
    allStale.push(...stale);
  }

  if (allStale.length === 0) {
    writeStamp();
    return;
  }

  // Cap at 5, sort by most stale first
  const top = allStale
    .sort((a, b) => b.daysAgo - a.daysAgo)
    .slice(0, 5);

  const items = top.map(d =>
    `  - [${d.project}] ${d.id} (${d.daysAgo}d) — ${d.description || 'sin descripción'}`
  ).join('\n');

  // Output goes into system-reminder context for Claude to read
  console.log(`[SECOND BRAIN] ${top.length} decisión(es) sin reflexión (>${STALE_DAYS} días):`);
  console.log(items);
  console.log(`Si alguna de estas es relevante hoy, invoca /user:second-brain para capturar el aprendizaje.`);

  writeStamp();
}

main();
