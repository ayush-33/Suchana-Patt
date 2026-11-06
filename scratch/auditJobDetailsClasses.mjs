import fs from 'fs';

const content = fs.readFileSync('./frontend/src/pages/JobDetailsPage.jsx', 'utf8');
const classes = new Set();
const matches = content.match(/className=(?:\{`([^`]+)`\}|"([^"]+)"|'([^']+)')/g) || [];
matches.forEach(m => {
  const clean = m.replace(/^className=[{"'`]/, '').replace(/[}"'`]$/, '');
  clean.split(/\s+/).forEach(c => {
    if (c && !c.includes('$') && !c.includes('{')) {
      classes.add(c);
    }
  });
});

console.log('--- JobDetailsPage Classes ---');
console.log([...classes].sort().join('\n'));

const jobCardContent = fs.readFileSync('./frontend/src/components/jobs/JobCard.jsx', 'utf8');
const jobCardClasses = new Set();
const jcMatches = jobCardContent.match(/className=(?:\{`([^`]+)`\}|"([^"]+)"|'([^']+)')/g) || [];
jcMatches.forEach(m => {
  const clean = m.replace(/^className=[{"'`]/, '').replace(/[}"'`]$/, '');
  clean.split(/\s+/).forEach(c => {
    if (c && !c.includes('$') && !c.includes('{')) {
      jobCardClasses.add(c);
    }
  });
});

console.log('\n--- JobCard Classes (used in Similar Recruitment Recommendations) ---');
console.log([...jobCardClasses].sort().join('\n'));

