import { getCategoryDetails } from '../frontend/src/services/categoryService.js';

function matchOption(item, key, val) {
  if (key === 'jobType') {
    const rawType = (item.jobType || item.rawItem?.jobType || 'government').toLowerCase();
    return rawType === val.toLowerCase();
  }
  if (key === 'qualification') {
    const rawQ = item.qualification || item.rawItem?.qualification || [];
    const list = Array.isArray(rawQ) ? rawQ : [rawQ];
    const qStr = list.join(' ').toLowerCase();
    if (val === '10th Pass') return qStr.includes('10th') || qStr.includes('matric');
    if (val === '12th Pass') return qStr.includes('12th') || qStr.includes('inter');
    if (val === 'Diploma') return qStr.includes('diploma') || qStr.includes('polytechnic');
    if (val === 'Graduate') return qStr.includes('graduate') || qStr.includes('degree') || qStr.includes('bachelor');
    if (val === 'Postgraduate') return qStr.includes('postgraduate') || qStr.includes('pg') || qStr.includes('master');
    return qStr.includes(val.toLowerCase());
  }
  if (key === 'experience') {
    const exp = (item.rawItem?.experienceRange || item.rawItem?.experience || item.expDisplay || '').trim();
    if (val === 'Fresher') return exp.toLowerCase().includes('fresher') || exp === 'Fresher';
    if (val === '0–1 Years') return exp.includes('0–1') || exp.includes('0-1');
    if (val === '1–3 Years') return exp.includes('1–3') || exp.includes('1-3');
    if (val === '3+ Years') return exp.includes('3+') || exp.includes('4+') || exp.includes('5+');
    if (val === 'Not Required') return exp.toLowerCase().includes('not required') || exp === 'Not Required';
    return exp === val;
  }
  if (key === 'ageRange') {
    const age = (item.rawItem?.ageRange || '').trim();
    if (age === val) return true;
    if (val === '18-25 Years' && (age.includes('18-25') || age.includes('18–25'))) return true;
    if (val === '26-35 Years' && (age.includes('26-35') || age.includes('26–35'))) return true;
    if (val === '36+ Years' && age.includes('36+')) return true;
    return false;
  }
  if (key === 'category') {
    const cat = (item.category || item.rawItem?.category || '').toLowerCase();
    return cat === val.toLowerCase();
  }
  if (key === 'status') {
    const st = (item.status || item.rawItem?.status || item.statusLabel || '').toLowerCase();
    return st === val.toLowerCase() || (val === 'open' && st === 'active') || (val === 'active' && st === 'open');
  }
  if (key === 'organization') {
    const org = (item.organization || item.rawItem?.organization || '').toLowerCase();
    return org === val.toLowerCase();
  }
  if (key === 'type') {
    return item.type === val;
  }
  return false;
}

const { allItems: jobs } = getCategoryDetails('latest-jobs');
console.log('Gov count:', jobs.filter(i => matchOption(i, 'jobType', 'government')).length);
console.log('Private count:', jobs.filter(i => matchOption(i, 'jobType', 'private')).length);
console.log('10th count:', jobs.filter(i => matchOption(i, 'qualification', '10th Pass')).length);
console.log('12th count:', jobs.filter(i => matchOption(i, 'qualification', '12th Pass')).length);
console.log('Diploma count:', jobs.filter(i => matchOption(i, 'qualification', 'Diploma')).length);
console.log('Graduate count:', jobs.filter(i => matchOption(i, 'qualification', 'Graduate')).length);
console.log('Postgrad count:', jobs.filter(i => matchOption(i, 'qualification', 'Postgraduate')).length);
console.log('Fresher count:', jobs.filter(i => matchOption(i, 'experience', 'Fresher')).length);
console.log('0-1 Years count:', jobs.filter(i => matchOption(i, 'experience', '0–1 Years')).length);
console.log('Not Required count:', jobs.filter(i => matchOption(i, 'experience', 'Not Required')).length);
console.log('18-25 Years count:', jobs.filter(i => matchOption(i, 'ageRange', '18-25 Years')).length);
console.log('26-35 Years count:', jobs.filter(i => matchOption(i, 'ageRange', '26-35 Years')).length);
console.log('36+ Years count:', jobs.filter(i => matchOption(i, 'ageRange', '36+ Years')).length);
console.log('Railway cat:', jobs.filter(i => matchOption(i, 'category', 'Railway')).length);
console.log('Open status:', jobs.filter(i => matchOption(i, 'status', 'open')).length);
console.log('Upcoming status:', jobs.filter(i => matchOption(i, 'status', 'upcoming')).length);
console.log('Closed status:', jobs.filter(i => matchOption(i, 'status', 'closed')).length);

console.log('\n--- Admit Cards Filter Tests ---');
const { allItems: admits } = getCategoryDetails('admit-cards');
console.log('Total admits:', admits.length);
['Released', 'Coming Soon', 'Not Available'].forEach(s => {
  console.log(`Admit status "${s}":`, admits.filter(i => (i.rawItem?.status || i.statusLabel) === s).length);
});
const admitCats = [...new Set(admits.map(i => i.category))];
admitCats.forEach(c => {
  console.log(`Admit cat "${c}":`, admits.filter(i => i.category === c).length);
});

console.log('\n--- Results Filter Tests ---');
const { allItems: results } = getCategoryDetails('results');
console.log('Total results:', results.length);
['Declared', 'Under Evaluation'].forEach(s => {
  console.log(`Result status "${s}":`, results.filter(i => (i.rawItem?.status || i.statusLabel) === s).length);
});
const resultCats = [...new Set(results.map(i => i.category))];
resultCats.forEach(c => {
  console.log(`Result cat "${c}":`, results.filter(i => i.category === c).length);
});

console.log('\n--- Test getFilterGroups ---');
function getFilterGroups(categorySlug, allItems) {
  const slug = (categorySlug || '').toLowerCase();
  if (slug === 'latest-jobs' || slug === 'jobs') {
    return [
      {
        key: 'jobType',
        title: 'Job Type',
        options: [
          { label: 'Government Job', value: 'government' },
          { label: 'Private Job', value: 'private' }
        ]
      },
      {
        key: 'qualification',
        title: 'Educational Qualification',
        options: [
          { label: '10th Pass', value: '10th Pass' },
          { label: '12th Pass', value: '12th Pass' },
          { label: 'Diploma', value: 'Diploma' },
          { label: 'Graduate', value: 'Graduate' },
          { label: 'Postgraduate', value: 'Postgraduate' }
        ]
      },
      {
        key: 'experience',
        title: 'Experience',
        options: [
          { label: 'Fresher', value: 'Fresher' },
          { label: '0–1 Years', value: '0–1 Years' },
          { label: '1–3 Years', value: '1–3 Years' },
          { label: '3+ Years', value: '3+ Years' },
          { label: 'Not Required', value: 'Not Required' }
        ]
      },
      {
        key: 'ageRange',
        title: 'Age Range',
        options: [
          { label: '18–25 Years', value: '18-25 Years' },
          { label: '26–35 Years', value: '26-35 Years' },
          { label: '36+ Years', value: '36+ Years' }
        ]
      },
      {
        key: 'category',
        title: 'Category / Sector',
        options: [
          { label: 'Railway', value: 'Railway' },
          { label: 'Banking', value: 'Banking' },
          { label: 'Teaching', value: 'Teaching' },
          { label: 'Defence', value: 'Defence' },
          { label: 'Police', value: 'Police' },
          { label: 'SSC', value: 'SSC' },
          { label: 'State Government', value: 'State Government' },
          { label: 'IT / Private Sector', value: 'IT / Private Sector' }
        ]
      },
      {
        key: 'status',
        title: 'Application Status',
        options: [
          { label: 'Application Open', value: 'open' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Closed', value: 'closed' }
        ]
      }
    ];
  }
  return [];
}

const groups = getFilterGroups('latest-jobs', jobs);
groups.forEach(g => {
  console.log(`Group ${g.title}:`);
  g.options.forEach(opt => {
    const c = jobs.filter(i => matchOption(i, g.key, opt.value)).length;
    console.log(`  ${opt.label} (${opt.value}): ${c}`);
  });
});
