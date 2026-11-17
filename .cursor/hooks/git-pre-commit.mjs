#!/usr/bin/env node
/** Native git pre-commit hook — same gate as Cursor beforeShellExecution. */
import { evaluateCommitGate } from './run-vite-playwright-gate.mjs';

const gate = evaluateCommitGate();

if (gate.skipped || gate.ok) {
  if (!gate.skipped) {
    process.stdout.write('\n✓ Playwright e2e passed (vite-project)\n');
  }
  process.exit(0);
}

process.stderr.write(
  '\n✗ Commit blocked — Playwright e2e failed (vite-project)\n\n',
);
process.stderr.write(`${gate.output}\n`);
process.stderr.write(
  '\nFix failures or update e2e tests, then commit again.\n',
);
process.exit(1);