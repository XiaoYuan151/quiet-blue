const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
for (const file of ['main.js', 'preload.js', 'theme-init.js', 'renderer.js', 'scripts/preview.js', 'scripts/check.js']) {
  execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'inherit' });
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (!fs.existsSync(path.join(root, match[1]))) throw new Error(`Missing asset: ${match[1]}`);
}
const css = fs.readFileSync(path.join(root, 'theme.css'), 'utf8') + fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const defined = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(match => match[1]));
for (const match of css.matchAll(/var\((--[\w-]+)/g)) {
  if (!defined.has(match[1])) throw new Error(`Undefined theme token: ${match[1]}`);
}
console.log('Syntax, local assets, and theme token references passed.');
