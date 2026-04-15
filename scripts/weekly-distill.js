#!/usr/bin/env node
/**
 * weekly-distill.js
 * Weekly cron (Fridays 19:00): reads the week's daily notes,
 * synthesizes a MOC-Week-{YYYY-WNN}.md file.
 * Healthcheck: errors → /tmp/weekly-distill.err
 */

const fs = require('fs');
const path = require('path');

const DAILY_NOTES_DIR = '/Users/oscar.mejia/Documents/Obsidian-Personal/60-Daily-Notes';
const ERR_FILE = '/tmp/weekly-distill.err';

function logError(msg) {
  const ts = new Date().toISOString();
  fs.appendFileSync(ERR_FILE, `${ts} ERROR: ${msg}\n`, 'utf8');
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week: String(weekNo).padStart(2, '0') };
}

function getWeekDates(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    dates.push(current.toISOString().split('T')[0]);
  }
  return dates;
}

function extractProjects(content) {
  const projects = new Set();
  const regex = /\*\*Proyecto:\*\*\s*(.+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    projects.add(match[1].trim());
  }
  return [...projects];
}

function extractDecisions(content) {
  const decisions = [];
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.match(/^- \d{4}-\d{2}-\d{2} \d{2}:\d{2}:/)) {
      decisions.push(line.trim());
    }
  }
  return decisions;
}

function extractMilestones(content) {
  const milestones = new Set();
  const regex = /\*\*Milestone:\*\*\s*(.+?)(?:\s*·|$)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    milestones.add(match[1].trim());
  }
  return [...milestones];
}

function extractOpenLoops(content) {
  const loops = [];
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('- [ ]')) {
      loops.push(line.trim());
    }
  }
  return loops;
}

function main() {
  try {
    const now = new Date();
    const { year, week } = getISOWeek(now);
    const weekLabel = `${year}-W${week}`;
    const weekDates = getWeekDates(now);

    let allContent = '';
    let notesFound = 0;

    for (const date of weekDates) {
      const notePath = path.join(DAILY_NOTES_DIR, `${date}.md`);
      if (fs.existsSync(notePath)) {
        const content = fs.readFileSync(notePath, 'utf8');
        allContent += `\n--- ${date} ---\n${content}`;
        notesFound++;
      }
    }

    if (notesFound === 0) {
      console.log(`[weekly-distill] No daily notes found for week ${weekLabel}`);
      return;
    }

    const projects = extractProjects(allContent);
    const decisions = extractDecisions(allContent);
    const milestones = extractMilestones(allContent);
    const openLoops = extractOpenLoops(allContent);

    const mostActive = projects.length > 0 ? projects[0] : 'N/A';

    let moc = `---\ntype: weekly-moc\nweek: ${weekLabel}\ncreated: ${now.toISOString().split('T')[0]}\ntags: [weekly, moc]\n---\n\n`;
    moc += `# Week ${weekLabel} — Summary\n\n`;

    moc += `## Projects Active\n`;
    if (projects.length > 0) {
      projects.forEach(p => { moc += `- ${p}\n`; });
    } else {
      moc += `- _(no projects detected)_\n`;
    }
    moc += '\n';

    if (milestones.length > 0) {
      moc += `## Milestones\n`;
      milestones.forEach(m => { moc += `- ${m}\n`; });
      moc += '\n';
    }

    moc += `## Key Decisions\n`;
    if (decisions.length > 0) {
      decisions.slice(0, 15).forEach(d => { moc += `${d}\n`; });
    } else {
      moc += `- _(no decision log entries this week)_\n`;
    }
    moc += '\n';

    moc += `## Open Loops\n`;
    if (openLoops.length > 0) {
      openLoops.forEach(l => { moc += `${l}\n`; });
    } else {
      moc += `- _(no open todos found)_\n`;
    }
    moc += '\n';

    moc += `## Patterns\n`;
    moc += `- Most active project: ${mostActive}\n`;
    moc += `- Daily notes this week: ${notesFound}/7\n`;
    // nosemgrep: javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal
    moc += `- Dates with notes: ${weekDates.filter(d => fs.existsSync(path.join(DAILY_NOTES_DIR, `${d}.md`))).join(', ')}\n`;

    const mocPath = path.join(DAILY_NOTES_DIR, `MOC-Week-${weekLabel}.md`);
    fs.writeFileSync(mocPath, moc, 'utf8');
    console.log(`[weekly-distill] Created ${path.basename(mocPath)} — ${notesFound} notes processed`);
  } catch (err) {
    logError(err.message);
    console.error(`[weekly-distill] Error: ${err.message}`);
  }
}

main();
