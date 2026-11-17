#!/usr/bin/env node
import { evaluateCommitGate } from './run-vite-playwright-gate.mjs';

const input = await new Promise((resolve) => {
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    raw += chunk;
  });
  process.stdin.on('end', () => resolve(raw));
  setTimeout(() => resolve(raw), 100);
});

let command = '';
try {
  const parsed = JSON.parse(input || '{}');
  command = parsed.command ?? '';
} catch {
  command = '';
}

const isCommit =
  /\bgit\b/.test(command) &&
  /\bcommit\b/.test(command) &&
  !/\bcommit-msg\b/.test(command);

if (!isCommit) {
  console.log(JSON.stringify({ permission: 'allow' }));
  process.exit(0);
}

const gate = evaluateCommitGate();

if (gate.skipped || gate.ok) {
  const msg = gate.skipped
    ? gate.output
    : `Playwright e2e passed for vite-project.\n\n${gate.output}`;
  console.log(
    JSON.stringify({
      permission: 'allow',
      user_message: gate.skipped ? undefined : 'All Playwright tests passed. Proceeding with commit.',
      agent_message: msg,
    }),
  );
  process.exit(0);
}

const excerpt = gate.output.slice(-6000);
console.log(
  JSON.stringify({
    permission: 'deny',
    user_message:
      'Commit blocked: Playwright e2e failed for vite-project. Fix tests or app code, then retry.',
    agent_message: `Playwright gate failed. Add or update tests under vite-project/e2e for changed UI. Output:\n\n${excerpt}`,
  }),
);
process.exit(2);