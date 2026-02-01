#!/usr/bin/env node
/*
  Simple guard to ensure required build tools are available before attempting a build.
  Exits with non-zero code if Vite (or node_modules/.bin) isn't present.
*/
const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error('\n\x1b[31mERROR:\x1b[0m ' + msg + '\n');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const binDir = path.join(root, 'node_modules', '.bin');

// If node_modules/.bin doesn't exist, likely dev dependencies aren't installed.
if (!fs.existsSync(binDir)) {
  fail("Missing 'node_modules/.bin' — it looks like dependencies (including devDependencies) aren't installed.\nRun 'npm ci' (or 'npm ci --include=dev' in CI), or ensure your environment doesn't omit devDependencies.");
}

// Check for vite binary
const vitePath = path.join(binDir, process.platform === 'win32' ? 'vite.cmd' : 'vite');
if (!fs.existsSync(vitePath)) {
  fail("'vite' not found in 'node_modules/.bin'. Ensure devDependencies were installed (e.g., 'npm ci' without NODE_ENV=production), or install Vite in your environment.");
}

console.log("Build tools verified: 'vite' found.");
process.exit(0);
