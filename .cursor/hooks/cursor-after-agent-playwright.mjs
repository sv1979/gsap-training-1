#!/usr/bin/env node
/**
 * After agent finishes: nudge to run Playwright when vite-project source changed.
 * ponytail: only checks unstaged/staged diff vs HEAD, not full history.
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

function viteProjectTouched() {
  try {
    const out = execFileSync(
      'git',
      ['diff', 'HEAD', '--name-only', '--', 'vite-project/src', 'vite-project/e2e'],
      { cwd: REPO_ROOT, encoding: 'utf8' },
    );
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

const input = await new Promise((resolve) => {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => {
    raw += c;
  });
  process.stdin.on('end', () => resolve(raw));
  setTimeout(() => resolve(raw), 50);
});

void input;

if (!viteProjectTouched()) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

console.log(
  JSON.stringify({
    followup_message:
      'vite-project code changed. Add or update Playwright specs in vite-project/e2e for new behavior, run `npm run test:e2e` in vite-project, show pass/fail output, fix failures, then commit.',
  }),
);