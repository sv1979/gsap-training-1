import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hookPath = path.join(root, '.cursor', 'hooks', 'git-pre-commit.mjs');
const hooksDir = path.join(root, '.git', 'hooks');
const preCommit = path.join(hooksDir, 'pre-commit');

if (!existsSync(path.join(root, '.git'))) {
  console.error('No .git at repo root.');
  process.exit(1);
}

mkdirSync(hooksDir, { recursive: true });
const hookScript = `#!/bin/sh
exec node "${hookPath.replace(/\\/g, '/')}"
`;
writeFileSync(preCommit, hookScript, { encoding: 'utf8' });
console.log('Installed', preCommit);