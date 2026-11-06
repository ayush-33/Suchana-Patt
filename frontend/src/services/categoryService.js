import { mockJobs } from '../data/mockJobs.js';
import { mockAdmitCards } from '../data/mockAdmitCards.js';
import { mockResults } from '../data/mockResults.js';
import { mockAnswerKeys } from '../data/mockAnswerKeys.js';
import { mockAdmissions } from '../data/mockAdmissions.js';
import { mockSyllabus } from '../data/mockSyllabus.js';
import { mockScholarships } from '../data/mockScholarships.js';
import { mockCurrentAffairs } from '../data/mockCurrentAffairs.js';

/**
 * Category Metadata Configuration
 */
export const CATEGORY_CONFIGS = {
  railway: {
    id: 'railway',
    label: 'Railway',
    title: 'Railway Recruitment 2026',
    description: 'Latest Railway jobs, notifications, admit cards, results and other updates across RRB and RRC divisions.',
    iconName: 'Train',
    keywords: ['railway', 'rrb', 'rrc', 'rail']
  },
  upsc: {
    id: 'upsc',
    label: 'UPSC',
    title: 'UPSC Civil Services & Recruitment 2026',
    description: 'Latest Union Public Service Commission notifications, exams, admit cards, results and syllabus.',
    iconName: 'GraduationCap',
    keywords: ['upsc', 'union public service', 'nda', 'cds', 'civil services']
  },
  ssc: {
    id: 'ssc',
    label: 'SSC',
    title: 'SSC Recruitment & Examinations 2026',
    description: 'Staff Selection Commission CGL, CHSL, MTS, GD Constable, CPO, Stenographer circulars and dates.',
    iconName: 'Briefcase',
    keywords: ['ssc', 'staff selection', 'cgl', 'chsl', 'mts', 'stenographer', 'cpo']
  },
  banking: {
    id: 'banking',
    label: 'Banking',
    title: 'Banking & Financial Sector Recruitment 2026',
    description: 'IBPS, SBI, RBI, NABARD and public sector bank PO, Clerk, Specialist Officer and Assistant vacancies.',
    iconName: 'Landmark',
    keywords: ['banking', 'bank', 'ibps', 'sbi', 'rbi', 'nabard', 'po', 'clerk']
  },
  teaching: {
    id: 'teaching',
    label: 'Teaching',
    title: 'Teaching & Faculty Recruitment 2026',
    description: 'CTET, State TET, KVS, NVS, Assistant Professor, PGT, TGT, PRT and University faculty circulars.',
    iconName: 'BookOpen',
    keywords: ['teaching', 'teacher', 'tet', 'ctet', 'kvs', 'nvs', 'faculty', 'professor']
  },
  defence: {
    id: 'defence',
    label: 'Defence & Police',
    title: 'Defence, Police & Paramilitary Recruitment 2026',
    description: 'NDA, CDS, AFCAT, Indian Army, Navy, Air Force, CAPF, CISF, CRPF and State Police recruitment notices.',
    iconName: 'Shield',
    keywords: ['defence', 'police', 'army', 'navy', 'air force', 'capf', 'crpf', 'cisf', 'nda', 'cds', 'constable', 'si']
  },
  'state-gov': {
    id: 'state-gov',
    label: 'State Government',
    title: 'State Government Recruitment 2026',
    description: 'State Public Service Commissions (UPPSC, BPSC, MPPSC, Rajasthan PSC, etc.) and departmental drives.',
    iconName: 'Building',
    keywords: ['state government', 'state', 'uppsc', 'bpsc', 'mppsc', 'ukpsc', 'rpsc']
  },
  'latest-jobs': {
    id: 'latest-jobs',
    label: 'Latest Jobs',
    title: 'Latest Government Jobs 2026',
    description: 'All active Central and State Government recruitment notifications, eligibility criteria and application deadlines.',
    iconName: 'Briefcase',
    keywords: []
  },
  results: {
    id: 'results',
    label: 'Results',
    title: 'Sarkari Exam Results 2026',
    description: 'Official recruitment examination results, merit lists, normalized scorecards, and cutoff marks.',
    iconName: 'Trophy',
    keywords: []
  },
  'admit-cards': {
    id: 'admit-cards',
    label: 'Admit Cards',
    title: 'Admit Cards & Hall Tickets 2026',
    description: 'Download official examination hall tickets, exam city slips and call letters for upcoming exams.',
    iconName: 'IdCard',
    keywords: []
  },
  'answer-keys': {
    id: 'answer-keys',
    label: 'Answer Keys',
    title: 'Official Answer Keys & Objections 2026',
    description: 'Check official provisional answer keys, question papers and submit candidate objections.',
    iconName: 'Key',
    keywords: []
  },
  admissions: {
    id: 'admissions',
    label: 'Admissions',
    title: 'National & State Admissions 2026',
    description: 'Entrance exam notifications, admission counselling schedules and university application forms.',
    iconName: 'GraduationCap',
    keywords: []
  },
  syllabus: {
    id: 'syllabus',
    label: 'Syllabus',
    title: 'Examination Syllabus & Scheme 2026',
    description: 'Download comprehensive syllabus PDFs, exam pattern breakdowns and topic-wise marking schemes.',
    iconName: 'BookOpen',
    keywords: []
  },
  scholarships: {
    id: 'scholarships',
    label: 'Scholarships',
    title: 'Government Scholarships & Schemes 2026',
    description: 'Pre-matric, post-matric, merit-cum-means scholarships, state scholarship portal updates and guidelines.',
    iconName: 'Award',
    keywords: []
  },
  'current-affairs': {
    id: 'current-affairs',
    label: 'Current Affairs',
    title: 'Daily & Monthly Current Affairs 2026',
    description: 'Curated competitive examination current affairs, national and international news summaries.',
    iconName: 'Star',
    keywords: []
  },
  important: {
    id: 'important',
    label: 'Important Updates',
    title: 'Important Notifications & Advisory 2026',
    description: 'Critical candidate advisories, examination postponement notices, document verification schedules.',
    iconName: 'Star',
    keywords: []
  }
};

/**
 * Format date text safely
 */
function formatDisplayDate(dateStr) {
  if (!dateStr) return 'Active';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  }
  return dateStr;
}

/**
 * Normalize an item into a standardized Category Notification Record
 */
function normalizeJobItem(job) {
  const isExpired = job.lastDate && new Date(job.lastDate) < new Date('2026-10-01');
  const rawStatus = (job.status || 'open').toLowerCase();
  let status = rawStatus;
  let statusLabel = 'Active';
  let statusType = 'open';

  if (rawStatus === 'upcoming') {
    status = 'upcoming';
    statusLabel = 'Upcoming';
    statusType = 'upcoming';
  } else if (rawStatus === 'closed' || isExpired) {
    status = 'closed';
    statusLabel = 'Closed';
    statusType = 'danger';
  } else {
    status = 'open';
    statusLabel = 'Active';
    statusType = 'open';
  }

  const qualArray = Array.isArray(job.qualification)
    ? job.qualification
    : [job.qualification].filter(Boolean);

  const qualDisplay = qualArray.length > 0 ? qualArray.join(', ') : 'As per notification';
  const ageDisplay = job.ageText || (job.minAge && job.maxAge ? `${job.minAge}–${job.maxAge} Years` : 'As per notice');
  const expDisplay = job.experience || job.experienceRange || 'Not Required';

  return {
    id: job.id,
    slug: job.slug || job.id,
    title: job.title,
    organization: job.organization || 'Government Department',
    type: 'job',
    typeLabel: 'Job',
    jobType: job.jobType || 'government',
    category: job.category || 'General',
    status,
    statusLabel,
    statusType,
    dateLabel: 'Opens',
    dateValue: formatDisplayDate(job.applicationStartDate || job.publishedAt),
    applicationStartDate: job.applicationStartDate || job.publishedAt,
    lastDateValue: formatDisplayDate(job.lastDate),
    link: `/jobs/${job.id}`,
    qualification: qualArray,
    qualificationDisplay: qualDisplay,
    ageDisplay,
    expDisplay,
    vacancies: job.vacancies,
    rawItem: job
  };
}

function normalizeAdmitCardItem(card) {
  const rawStatus = (card.status || '').toLowerCase();
  const isReleased = rawStatus === 'released' || rawStatus === 'available';
  const isComingSoon = rawStatus === 'coming soon';
  const statusLabel = isReleased ? 'Released' : isComingSoon ? 'Coming Soon' : (card.status || 'Awaiting Update');
  const statusType = isReleased ? 'open' : isComingSoon ? 'upcoming' : 'warning';

  return {
    id: card.id,
    slug: card.id,
    title: card.examName || card.title,
    examName: card.examName || card.title,
    organization: card.organization || 'Commission',
    type: 'admit-card',
    typeLabel: 'Admit Card',
    category: card.category || 'General',
    status: isReleased ? 'open' : 'upcoming',
    statusLabel,
    statusType,
    dateLabel: isReleased ? 'Exam Date' : 'Expected',
    dateValue: card.examDateText || card.examDate || card.downloadStartDateText || 'Announced Shortly',
    examDateText: card.examDateText || card.examDate || 'Announced Shortly',
    instructions: card.instructions || 'E-Admit cards and instructions will be available on the official portal prior to the examination.',
    downloadUrl: card.downloadUrl,
    link: card.relatedJobId ? `/jobs/${card.relatedJobId}` : '/admit-cards',
    rawItem: card
  };
}

function normalizeResultItem(res) {
  const isDeclared = (res.status || '').toLowerCase() === 'declared';
  const statusLabel = isDeclared ? 'Declared' : (res.status || 'Under Evaluation');
  const statusType = isDeclared ? 'open' : 'warning';

  return {
    id: res.id,
    slug: res.id,
    title: res.examName || res.title,
    examName: res.examName || res.title,
    organization: res.organization || 'Commission',
    type: 'result',
    typeLabel: 'Result',
    category: res.category || 'General',
    status: isDeclared ? 'open' : 'upcoming',
    statusLabel,
    statusType,
    dateLabel: 'Declared',
    dateValue: res.declarationDateText || res.declarationDate || 'Recently Announced',
    declarationDateText: res.declarationDateText || res.declarationDate || 'Recently Announced',
    cutOffMarks: res.cutOffMarks,
    summary: res.summary || 'Official result and merit list announced on official portal.',
    resultUrl: res.resultUrl,
    link: res.relatedJobId ? `/jobs/${res.relatedJobId}` : '/results',
    rawItem: res
  };
}

function normalizeAnswerKeyItem(key) {
  return {
    id: key.id,
    slug: key.id,
    title: key.examName,
    organization: key.organization || 'Commission',
    type: 'other',
    subType: 'answer-key',
    typeLabel: 'Answer Key',
    category: key.category || 'General',
    status: (key.status || '').toLowerCase() === 'active' ? 'open' : 'closed',
    statusLabel: (key.status || '').toLowerCase() === 'active' ? 'Key Active' : 'Closed',
    statusType: (key.status || '').toLowerCase() === 'active' ? 'open' : 'danger',
    dateLabel: 'Objection End',
    dateValue: key.objectionEndDateText || 'Active',
    link: key.relatedJobId ? `/jobs/${key.relatedJobId}` : '/answer-keys',
    rawItem: key
  };
}

function normalizeSyllabusItem(syl) {
  return {
    id: syl.id,
    slug: syl.id,
    title: syl.examName,
    organization: syl.organization || 'Commission',
    type: 'other',
    subType: 'syllabus',
    typeLabel: 'Syllabus',
    category: syl.category || 'General',
    status: 'open',
    statusLabel: 'PDF Scheme',
    statusType: 'open',
    dateLabel: 'Pattern',
    dateValue: syl.examPattern || 'Complete Syllabus',
    link: syl.relatedJobId ? `/jobs/${syl.relatedJobId}` : '/syllabus',
    rawItem: syl
  };
}

function normalizeAdmissionItem(adm) {
  return {
    id: adm.id,
    slug: adm.id,
    title: adm.title,
    organization: adm.university || 'University / Board',
    type: 'other',
    subType: 'admission',
    typeLabel: 'Admission',
    category: adm.category || 'Admission',
    status: (adm.status || '').toLowerCase() === 'open' ? 'open' : 'closed',
    statusLabel: (adm.status || '').toLowerCase() === 'open' ? 'Apply Open' : 'Closed',
    statusType: (adm.status || '').toLowerCase() === 'open' ? 'open' : 'danger',
    dateLabel: 'Last Date',
    dateValue: adm.lastDateText || 'Active',
    link: adm.relatedJobId ? `/jobs/${adm.relatedJobId}` : '/admissions',
    rawItem: adm
  };
}

function normalizeScholarshipItem(sch) {
  return {
    id: sch.id,
    slug: sch.id,
    title: sch.title,
    organization: sch.department || 'Government Portal',
    type: 'other',
    subType: 'scholarship',
    typeLabel: 'Scholarship',
    category: 'Scholarship',
    status: (sch.status || '').toLowerCase() === 'active' ? 'open' : 'upcoming',
    statusLabel: (sch.status || '').toLowerCase() === 'active' ? 'Portal Live' : 'Upcoming',
    statusType: (sch.status || '').toLowerCase() === 'active' ? 'open' : 'upcoming',
    dateLabel: 'Deadline',
    dateValue: sch.deadlineText || '31 Dec 2026',
    link: '/up-scholarship',
    rawItem: sch
  };
}

function normalizeCurrentAffairsItem(ca) {
  return {
    id: ca.id,
    slug: ca.id,
    title: ca.title,
    organization: ca.category || 'National News',
    type: 'other',
    subType: 'current-affairs',
    typeLabel: 'Current Affairs',
    category: 'Current Affairs',
    status: 'open',
    statusLabel: 'Digest',
    statusType: 'upcoming',
    dateLabel: 'Published',
    dateValue: ca.date || 'Recent',
    link: '/current-affairs',
    rawItem: ca
  };
}

/**
 * Main Service Function: Retrieves normalized records for a category slug
 */
export function getCategoryDetails(categorySlug) {
  const slug = (categorySlug || 'railway').toLowerCase().trim();
  const config = CATEGORY_CONFIGS[slug] || {
    id: slug,
    label: slug.charAt(0).toUpperCase() + slug.slice(1),
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Notifications 2026`,
    description: `All recruitment notifications, admit cards, results, and updates for ${slug}.`,
    iconName: 'Layers',
    keywords: [slug]
  };

  const matchesCategory = (item, catName, keywords = []) => {
    const text = `${item.category || ''} ${item.organization || ''} ${item.title || ''} ${item.examName || ''}`.toLowerCase();
    if (text.includes(catName.toLowerCase())) return true;
    return keywords.some((kw) => text.includes(kw.toLowerCase()));
  };

  let allItems = [];

  // Special full-dataset categories
  if (slug === 'latest-jobs' || slug === 'jobs') {
    allItems = mockJobs.map(normalizeJobItem);
  } else if (slug === 'results') {
    allItems = mockResults.map(normalizeResultItem);
  } else if (slug === 'admit-cards') {
    allItems = mockAdmitCards.map(normalizeAdmitCardItem);
  } else if (slug === 'answer-keys') {
    allItems = mockAnswerKeys.map(normalizeAnswerKeyItem);
  } else if (slug === 'admissions') {
    allItems = mockAdmissions.map(normalizeAdmissionItem);
  } else if (slug === 'syllabus') {
    allItems = mockSyllabus.map(normalizeSyllabusItem);
  } else if (slug === 'scholarships' || slug === 'certificate') {
    allItems = mockScholarships.map(normalizeScholarshipItem);
  } else if (slug === 'current-affairs') {
    allItems = mockCurrentAffairs.map(normalizeCurrentAffairsItem);
  } else {
    // Standard organization/domain categories (Railway, UPSC, SSC, Banking, Teaching, Defence, State Government)
    const keywords = config.keywords || [];

    const matchedJobs = mockJobs
      .filter((j) => matchesCategory(j, config.label, keywords))
      .map(normalizeJobItem);

    const matchedAdmitCards = mockAdmitCards
      .filter((a) => matchesCategory(a, config.label, keywords))
      .map(normalizeAdmitCardItem);

    const matchedResults = mockResults
      .filter((r) => matchesCategory(r, config.label, keywords))
      .map(normalizeResultItem);

    const matchedAnswerKeys = mockAnswerKeys
      .filter((k) => matchesCategory(k, config.label, keywords))
      .map(normalizeAnswerKeyItem);

    const matchedSyllabus = mockSyllabus
      .filter((s) => matchesCategory(s, config.label, keywords))
      .map(normalizeSyllabusItem);

    allItems = [
      ...matchedJobs,
      ...matchedAdmitCards,
      ...matchedResults,
      ...matchedAnswerKeys,
      ...matchedSyllabus
    ];
  }

  // Calculate dynamic type counts for tabs
  const counts = {
    all: allItems.length,
    jobs: allItems.filter((i) => i.type === 'job').length,
    admitCard: allItems.filter((i) => i.type === 'admit-card').length,
    result: allItems.filter((i) => i.type === 'result').length,
    other: allItems.filter((i) => i.type === 'other').length
  };

  return {
    categoryInfo: config,
    allItems,
    counts
  };
}
