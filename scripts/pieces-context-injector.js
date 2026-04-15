#!/usr/bin/env node
/**
 * pieces-context-injector.js
 * SessionStart hook — checks if Pieces OS is alive and injects a directive
 * for Claude to query Pieces LTM at the start of the session.
 *
 * Why not call Pieces REST directly: the QGPT endpoint requires application
 * registration that standalone scripts can't do. Claude Code's MCP connection
 * handles auth. So we inject an instruction instead.
 *
 * Cooldown: 20 min (avoids repeat injection in rapid session restarts).
 */

const http = require('http');
const fs = require('fs');

const PIECES_PORT = 39300;
const STAMP_FILE = '/tmp/pieces-context-injector.stamp';
const COOLDOWN_MS = 20 * 60 * 1000;

function shouldSkip() {
  try {
    const stamp = JSON.parse(fs.readFileSync(STAMP_FILE, 'utf8'));
    return (Date.now() - stamp.ts) < COOLDOWN_MS;
  } catch { return false; }
}

function writeStamp() {
  try { fs.writeFileSync(STAMP_FILE, JSON.stringify({ ts: Date.now() })); } catch {}
}

function isPiecesAlive() {
  return new Promise((resolve) => {
    const req = http.request( // nosemgrep: problem-based-packs.insecure-transport.js-node.http-request.http-request,problem-based-packs.insecure-transport.js-node.using-http-server.using-http-server
      { hostname: 'localhost', port: PIECES_PORT, path: '/', method: 'GET', timeout: 2000 }, // localhost-only — no external traffic
      (res) => resolve(true)
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

async function main() {
  if (shouldSkip()) return;

  const alive = await isPiecesAlive();
  if (!alive) return; // Pieces not running — silent exit

  // Pieces is alive. Inject directive for Claude to query it via MCP.
  process.stdout.write(
    `[PIECES CONTEXT] Pieces OS is running with passive activity capture.\n` +
    `MANDATORY: Before responding to the user's first message, call ask_pieces_ltm with:\n` +
    `  question: "What was Oscar working on today and recently? Include all apps, projects, and decisions captured."\n` +
    `  application_sources: ["antigravity", "claude", "obsidian", "google chrome"]\n` +
    `Display a compact 5-line digest from the result. This is step 0 — before reading progress.md or anything else.\n` +
    `If the user's first message is already work — still query first, then respond.`
  );

  writeStamp();
}

main().catch(() => process.exit(0));
