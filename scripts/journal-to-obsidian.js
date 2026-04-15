#!/usr/bin/env node
/**
 * journal-to-obsidian.js
 * Nightly cron safety net: reads PROJECT-JOURNAL.md, finds session entries
 * not yet in Obsidian daily notes, writes them.
 * Healthcheck: errors → /tmp/journal-to-obsidian.err
 * Logs: /tmp/journal-to-obsidian.log
 */

const fs = require('fs');
const path = require('path');

const JOURNAL_PATH = '/Users/oscar.mejia/Desktop/Proyectos/PROJECT-JOURNAL.md';
const DAILY_NOTES_DIR = '/Users/oscar.mejia/Documents/Obsidian-Personal/60-Daily-Notes';
const LOG_FILE = '/tmp/journal-to-obsidian.log';
const ERR_FILE = '/tmp/journal-to-obsidian.err';

function log(msg) {
  const ts = new Date().toISOString();
  const line = `${ts} ${msg}\n`;
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}

function logError(msg) {
  const ts = new Date().toISOString();
  const line = `${ts} ERROR: ${msg}\n`;
  fs.appendFileSync(ERR_FILE, line, 'utf8');
}

function parseJournalEntries(content) {
  const entries = new Map();
  // Matches both "## YYYY-MM-DD" and "### YYYY-MM-DD" headings
  const dateRegex = /^#{2,3} (\d{4}-\d{2}-\d{2})/;
  const lines = content.split('\n');
  let currentDate = null;
  let currentBlock = [];

  for (const line of lines) {
    const match = line.match(dateRegex);
    if (match) {
      if (currentDate && currentBlock.length > 0) {
        const existing = entries.get(currentDate) || [];
        existing.push(currentBlock.join('\n'));
        entries.set(currentDate, existing);
      }
      currentDate = match[1];
      currentBlock = [line];
    } else if (currentDate) {
      currentBlock.push(line);
    }
  }

  if (currentDate && currentBlock.length > 0) {
    const existing = entries.get(currentDate) || [];
    existing.push(currentBlock.join('\n'));
    entries.set(currentDate, existing);
  }

  return entries;
}

function ensureDailyNote(filePath, date) {
  if (!fs.existsSync(filePath)) {
    const header = `---\ndate: ${date}\ntype: daily-note\ntags: [daily]\n---\n\n# ${date}\n\n`;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, header, 'utf8');
    return true;
  }
  return false;
}

function main() {
  try {
    if (!fs.existsSync(JOURNAL_PATH)) {
      log('PROJECT-JOURNAL.md not found — nothing to sync');
      return;
    }

    const journalContent = fs.readFileSync(JOURNAL_PATH, 'utf8');
    const entries = parseJournalEntries(journalContent);

    if (entries.size === 0) {
      log('No date-stamped entries found in PROJECT-JOURNAL.md');
      return;
    }

    let synced = 0;
    let skipped = 0;

    for (const [date, blocks] of entries) {
      const dailyNotePath = path.join(DAILY_NOTES_DIR, `${date}.md`);
      ensureDailyNote(dailyNotePath, date);

      const existingContent = fs.readFileSync(dailyNotePath, 'utf8');
      const BEGIN = '\n## From PROJECT-JOURNAL\n';
      const END = '\n<!-- /PROJECT-JOURNAL -->';
      const journalSection = `${BEGIN}\n${blocks.join('\n\n')}\n${END}`;

      if (existingContent.includes(BEGIN)) {
        // Replace only between BEGIN and END markers — never eats content outside the section
        const startIdx = existingContent.indexOf(BEGIN);
        const endIdx = existingContent.indexOf(END);
        const before = existingContent.substring(0, startIdx);
        // If no END marker (old format), section goes to EOF — safe greedy cut
        const after = endIdx !== -1 ? existingContent.substring(endIdx + END.length) : '';
        const updated = before + journalSection + after;
        if (updated === existingContent) { skipped++; continue; }
        fs.writeFileSync(dailyNotePath, updated, 'utf8');
        synced++;
      } else {
        // Insert before session log entries so they stay after the journal section
        const sessionIdx = existingContent.indexOf('\n### Claude Code —');
        if (sessionIdx !== -1) {
          const updated = existingContent.substring(0, sessionIdx) + journalSection + existingContent.substring(sessionIdx);
          fs.writeFileSync(dailyNotePath, updated, 'utf8');
        } else {
          fs.appendFileSync(dailyNotePath, journalSection, 'utf8');
        }
        synced++;
      }
    }

    log(`Synced ${synced} dates, skipped ${skipped} (already present). Total entries: ${entries.size}`);
  } catch (err) {
    logError(err.message);
    console.error(`[journal-to-obsidian] Error: ${err.message}`);
  }
}

main();
