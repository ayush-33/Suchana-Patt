import fs from 'fs';

const content = fs.readFileSync('./frontend/src/styles/components.css', 'utf8');
const lines = content.split('\n');

const desktopDarkRules = [];
lines.forEach((line, idx) => {
  if (line.includes('layout-desktop[data-theme="dark"]')) {
    desktopDarkRules.push({ line: idx + 1, text: line.trim() });
  }
});

console.log(`Found ${desktopDarkRules.length} desktop dark rules in components.css:`);
desktopDarkRules.forEach(r => console.log(`${r.line}: ${r.text}`));

