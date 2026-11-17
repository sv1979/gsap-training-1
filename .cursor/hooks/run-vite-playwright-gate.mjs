/**
 * Runs Playwright e2e when vite-project has staged changes.
 * ponytail: scans staged paths only; no per-file test mapping yet.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const VITE_ROOT = path.join(REPO_ROOT, 'vite-project');

export function stagedTouchesViteProject() {
  try {
    const out = execFileSync('git', ['diff', '--cached', '--name-only'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });
    return out.split(/\r?\n/).some((line) => line.startsWith('vite-project/'));
  } catch {
    return false;
  }
}

export function runPlaywrightGate() {
  if (!existsSync(path.join(VITE_ROOT, 'playwright.config.js'))) {
    return {
      ok: false,
      skipped: false,
      output:
        'Playwright is not configured in vite-project (missing playwright.config.js).',
    };
  }

  const result = spawnSync('npm run test:e2e', {
    cwd: VITE_ROOT,
    encoding: 'utf8',
    shell: true,
    env: { ...process.env, CI: '1' },
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = [result.stdout, result.stderr].filter(Boolean).join('\n');
  return {
    ok: result.status === 0,
    skipped: false,
    output: output || `playwright exited with code ${result.status ?? 'unknown'}`,
  };
}

export function evaluateCommitGate() {
  if (!stagedTouchesViteProject()) {
    return {
      ok: true,
      skipped: true,
      output: 'No staged changes under vite-project; Playwright gate skipped.',
    };
  }
  return runPlaywrightGate();
}