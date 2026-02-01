#!/usr/bin/env node
/*
  CommonJS variant of the prebuild check for projects using "type": "module".
*/
const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error('\n\x1b[31mERROR:\x1b[0m ' + msg + '\n');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const binDir = path.join(root, 'node_modules', '.bin');

if (!fs.existsSync(binDir)) {
  fail("Missing 'node_modules/.bin' — it looks like dependencies (including devDependencies) aren't installed.\nRun 'npm ci' (or 'npm ci --include=dev' in CI), or ensure your environment doesn't omit devDependencies.");
}

const vitePath = path.join(binDir, process.platform === 'win32' ? 'vite.cmd' : 'vite');
if (!fs.existsSync(vitePath)) {
  fail("'vite' not found in 'node_modules/.bin'. Ensure devDependencies were installed (e.g., 'npm ci' without NODE_ENV=production), or install Vite in your environment.");
}

console.log("Build tools verified: 'vite' found.");
process.exit(0);
