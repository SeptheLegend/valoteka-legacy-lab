#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');
const dest = path.join(dist, '404.html');

try {
  if (!fs.existsSync(index)) {
    console.error("dist/index.html not found, skipping 404 copy.");
    process.exit(0);
  }
  const html = fs.readFileSync(index, 'utf8');
  fs.writeFileSync(dest, html, 'utf8');
  console.log('Wrote dist/404.html for SPA fallback.');
} catch (err) {
  console.error('Failed to write 404.html:', err);
  process.exit(1);
}
