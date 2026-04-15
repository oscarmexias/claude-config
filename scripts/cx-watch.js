#!/usr/bin/env node
/**
 * CX-Watch — Chiliz/Proyectos Context Expert autonomous trigger.
 *
 * Fires on SessionStart. Checks both workspaces for staleness signals.
 * If something needs attention, injects a [CX-WATCH] system message so
 * Claude knows to surface it without being asked.
 *
 * Receives JSON on stdin: { "cwd": "...", "session_id": "..." }
 * Outputs to stdout: injected as system context at session start.
 */

const fs = require("fs");
const path = require("path");

const WORKSPACES = [
  {
    name: "Chiliz",
    root: "/Users/oscar.mejia/Desktop/Chiliz",
    progressFile: ".gsd-t/progress.md",
    memoryFile: path.join(
      process.env.HOME,
      ".claude/projects/-Users-oscar-mejia-Desktop-Chiliz/memory/MEMORY.md"
    ),
    watchDirs: ["global-config/context", "global-config/docs", ".gsd-t"],
    contextReadme: "global-config/context/README.md",
  },
  {
    name: "Proyectos",
    root: "/Users/oscar.mejia/Desktop/Proyectos",
    progressFile: ".gsd-t/progress.md",
    memoryFile: path.join(
      process.env.HOME,
      ".claude/projects/-Users-oscar-mejia-Desktop-Proyectos/memory/MEMORY.md"
    ),
    watchDirs: ["global-config", "docs"],
    contextReadme: "global-config/PERSONAL-WORKFLOW.md",
  },
];

const NOW = Date.now();
const ONE_DAY = 24 * 60 * 60 * 1000;
const THREE_DAYS = 3 * ONE_DAY;

function mtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return 0;
  }
}

function recentlyModified(filePath, withinMs) {
  const t = mtime(filePath);
  return t > 0 && NOW - t < withinMs;
}

function findRecentlyModifiedDocs(root, dirs, withinMs) {
  const results = [];
  for (const dir of dirs) {
    const fullDir = path.join(root, dir);
    try {
      const files = fs.readdirSync(fullDir);
      for (const f of files) {
        if (!f.endsWith(".md")) continue;
        const fp = path.join(fullDir, f);
        try {
          const stat = fs.statSync(fp);
          if (stat.isFile() && NOW - stat.mtimeMs < withinMs) {
            results.push(path.relative(root, fp));
          }
        } catch {}
      }
    } catch {}
  }
  return results;
}

function checkWorkspace(ws) {
  const alerts = [];

  // Only alert if cwd is inside this workspace (or check both if cwd is elsewhere)
  const progressPath = path.join(ws.root, ws.progressFile);
  const progressExists = fs.existsSync(progressPath);

  // Signal 1: progress.md updated recently but MEMORY.md not updated as recently
  if (progressExists) {
    const progressAge = mtime(progressPath);
    const memoryAge = mtime(ws.memoryFile);
    if (progressAge > memoryAge && NOW - progressAge < ONE_DAY) {
      alerts.push(
        `progress.md updated ${Math.round((NOW - progressAge) / 60000)}min ago but MEMORY.md may be stale`
      );
    }
  }

  // Signal 2: context docs modified recently without README update
  const recentDocs = findRecentlyModifiedDocs(ws.root, ws.watchDirs, THREE_DAYS);
  const readmePath = path.join(ws.root, ws.contextReadme);
  const readmeAge = mtime(readmePath);
  const newDocsSinceReadme = recentDocs.filter(
    (d) => mtime(path.join(ws.root, d)) > readmeAge
  );
  if (newDocsSinceReadme.length > 0) {
    alerts.push(
      `${newDocsSinceReadme.length} doc(s) modified since last README update: ${newDocsSinceReadme.slice(0, 3).join(", ")}`
    );
  }

  return alerts;
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  try {
    // Parse stdin (may be empty for SessionStart)
    let data = {};
    try {
      data = JSON.parse(input);
    } catch {}

    const cwd = typeof data.cwd === "string" ? data.cwd : process.cwd();

    // Determine which workspace(s) to check
    const activeWorkspaces = WORKSPACES.filter(
      (ws) => cwd.startsWith(ws.root) || !WORKSPACES.some((w) => cwd.startsWith(w.root))
    );

    const allAlerts = [];
    for (const ws of activeWorkspaces) {
      if (!fs.existsSync(ws.root)) continue;
      const alerts = checkWorkspace(ws);
      if (alerts.length > 0) {
        allAlerts.push({ workspace: ws.name, alerts });
      }
    }

    if (allAlerts.length === 0) {
      process.exit(0);
    }

    // Inject CX-WATCH signal
    const lines = allAlerts.map((a) =>
      `[${a.workspace}] ${a.alerts.join(" | ")}`
    );

    process.stdout.write(
      `[CX-WATCH] Documentation may need attention:\n${lines.join("\n")}\n` +
      `Surface this to Oscar at a natural moment — no need to interrupt current work. ` +
      `Offer to run /user:chiliz-context-expert update after the session.`
    );
  } catch {
    // Never block the session
  }
  process.exit(0);
});
