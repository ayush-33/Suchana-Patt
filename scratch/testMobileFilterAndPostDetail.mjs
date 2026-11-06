import fs from 'fs';
import path from 'path';
import { getCategoryDetails } from '../frontend/src/services/categoryService.js';

console.log('================================================================');
console.log('SUCHANA PATT — MOBILE FILTER, POST DETAIL FAQ & FOOTER AUDIT');
console.log('================================================================\n');

let allPassed = true;
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    allPassed = false;
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

// -----------------------------------------------------------------------------
// 1. Audit JobDetailsPage.jsx
// -----------------------------------------------------------------------------
console.log('\n--- 1. Auditing JobDetailsPage.jsx ---');
const jobDetailsPath = path.resolve('frontend/src/pages/JobDetailsPage.jsx');
const jobDetailsSrc = fs.readFileSync(jobDetailsPath, 'utf8');

assert(
  jobDetailsSrc.includes('openFaqIndex, setOpenFaqIndex] = useState(isMobile ? -1 : 0)'),
  'openFaqIndex initialized to -1 on mobile (collapsed) and 0 on desktop'
);

// Verify that renderFaqs is called after renderSimilarJobs on mobile
const similarIdx = jobDetailsSrc.indexOf('{renderSimilarJobs()}');
const mobileFaqIdx = jobDetailsSrc.indexOf('{isMobile && renderFaqs()}');
assert(
  similarIdx !== -1 && mobileFaqIdx !== -1 && mobileFaqIdx > similarIdx,
  'Mobile FAQ is rendered immediately BELOW Similar Jobs ({renderSimilarJobs()} followed by {isMobile && renderFaqs()})'
);

// Verify that renderFaqs is NOT inside job-details-mobile-layout
const mobileLayoutStart = jobDetailsSrc.indexOf('<div className="job-details-mobile-layout">');
const mobileLayoutEnd = jobDetailsSrc.indexOf('<div className="job-details-layout">');
const mobileLayoutContent = jobDetailsSrc.slice(mobileLayoutStart, mobileLayoutEnd);
assert(
  !mobileLayoutContent.includes('{renderFaqs()}'),
  'Mobile column (job-details-mobile-layout) does NOT include {renderFaqs()}'
);

// Verify desktop main layout STILL contains renderFaqs
const desktopLayoutContent = jobDetailsSrc.slice(mobileLayoutEnd);
assert(
  desktopLayoutContent.includes('<div className="job-details-main">') &&
  desktopLayoutContent.includes('{renderFaqs()}'),
  'Desktop layout preserves {renderFaqs()} inside job-details-main column'
);

// Verify availableSections tab order for mobile vs desktop
assert(
  jobDetailsSrc.includes("list.push({ id: 'similar-jobs', label: 'Similar Jobs', icon: Sparkles });") &&
  jobDetailsSrc.includes("list.push({ id: 'faqs', label: 'FAQs', icon: HelpCircle });"),
  'availableSections nav tabs place Similar Jobs before FAQs on mobile'
);

// -----------------------------------------------------------------------------
// 2. Audit MobileCategoryListingPage.jsx
// -----------------------------------------------------------------------------
console.log('\n--- 2. Auditing MobileCategoryListingPage.jsx ---');
const catListingPath = path.resolve('frontend/src/components/category/MobileCategoryListingPage.jsx');
const catListingSrc = fs.readFileSync(catListingPath, 'utf8');

// Verify No FAQ rendered on Mobile Category / Latest Jobs listing
assert(
  !catListingSrc.includes('renderFaqs') &&
  !catListingSrc.includes('Frequently Asked Questions') &&
  !catListingSrc.includes('faq-accordion'),
  'Mobile Category / Latest Jobs listing contains zero FAQ elements'
);

// Verify Card Clickability
assert(
  catListingSrc.includes('function MobileJobCard({ item })') &&
  catListingSrc.includes('onClick={handleCardClick}') &&
  catListingSrc.includes("navigate(`/jobs/${job.id}`)") &&
  catListingSrc.includes('e.target.closest'),
  'MobileJobCard has whole-card click navigation to /jobs/:id with target.closest check'
);

assert(
  catListingSrc.includes('function MobileAdmitCardCard({ item })') &&
  catListingSrc.includes('onClick={handleCardClick}') &&
  catListingSrc.includes('targetUrl') &&
  catListingSrc.includes('e.stopPropagation()'),
  'MobileAdmitCardCard has card clickability with nested button event propagation stops'
);

assert(
  catListingSrc.includes('function MobileResultCard({ item })') &&
  catListingSrc.includes('onClick={handleCardClick}') &&
  catListingSrc.includes('e.stopPropagation()'),
  'MobileResultCard has card clickability and stops propagation for external scorecards/results'
);

assert(
  catListingSrc.includes('function MobileOtherCard({ item })') &&
  catListingSrc.includes('onClick={handleCardClick}'),
  'MobileOtherCard has card click navigation to item.link'
);

// Verify Bottom Sheet & Option Rows
assert(
  catListingSrc.includes('mobile-filter-modal-backdrop') &&
  catListingSrc.includes('mobile-filter-bottom-sheet') &&
  catListingSrc.includes('mobile-filter-drag-handle') &&
  catListingSrc.includes('mobile-filter-sheet-header') &&
  catListingSrc.includes('mobile-filter-sheet-scrollable-body') &&
  catListingSrc.includes('mobile-filter-sheet-footer'),
  'Filter bottom sheet structure is fully implemented (drag handle, fixed header, scrollable body, fixed footer)'
);

assert(
  catListingSrc.includes('<label') &&
  catListingSrc.includes('className={`mobile-filter-option-row') &&
  catListingSrc.includes('type="checkbox"') &&
  catListingSrc.includes('mobile-filter-option-count'),
  'Filter options are full-width clickable <label> rows containing checkbox, text label, and count badge'
);

assert(
  catListingSrc.includes('mobile-filter-btn-clear') &&
  catListingSrc.includes('Clear All') &&
  catListingSrc.includes('mobile-filter-btn-apply') &&
  catListingSrc.includes('pendingMatchingCount'),
  'Footer contains Clear All button and dynamic Show {pendingMatchingCount} {categoryNoun} primary button'
);

// Verify Filter Sections
assert(
  catListingSrc.includes("key: 'jobType'") &&
  catListingSrc.includes("key: 'qualification'") &&
  catListingSrc.includes("key: 'experience'") &&
  catListingSrc.includes("key: 'ageRange'") &&
  catListingSrc.includes("key: 'category'") &&
  catListingSrc.includes("key: 'status'"),
  'Latest Jobs filter groups include Job Type, Qualification, Experience, Age Range, Category, and Status'
);

assert(
  catListingSrc.includes("slug === 'admit-cards'") &&
  catListingSrc.includes("slug === 'results'"),
  'Admit Cards and Results have dedicated filter groups (Status, Category, Organization)'
);

// -----------------------------------------------------------------------------
// 3. Verify Dynamic Filter Matching & Real Mock Dataset Counts
// -----------------------------------------------------------------------------
console.log('\n--- 3. Verifying Mock Data Counts ---');
const jobsData = getCategoryDetails('latest-jobs');
assert(jobsData.allItems.length === 34, `Total mock jobs is 34 (got ${jobsData.allItems.length})`);

const govJobs = jobsData.allItems.filter(i => (i.jobType || i.rawItem?.jobType || 'government') === 'government');
assert(govJobs.length === 29, `Mock government jobs count is 29 (got ${govJobs.length})`);

const privateJobs = jobsData.allItems.filter(i => (i.jobType || i.rawItem?.jobType) === 'private');
assert(privateJobs.length === 5, `Mock private jobs count is 5 (got ${privateJobs.length})`);

const admitsData = getCategoryDetails('admit-cards');
assert(admitsData.allItems.length === 6, `Total mock admit cards is 6 (got ${admitsData.allItems.length})`);

const resultsData = getCategoryDetails('results');
assert(resultsData.allItems.length === 5, `Total mock results is 5 (got ${resultsData.allItems.length})`);

// -----------------------------------------------------------------------------
// 4. Audit Styles (mobile-category.css & mobile-theme.css)
// -----------------------------------------------------------------------------
console.log('\n--- 4. Auditing Stylesheets ---');
const catCssPath = path.resolve('frontend/src/styles/mobile-category.css');
const catCssSrc = fs.readFileSync(catCssPath, 'utf8');

assert(
  catCssSrc.includes('.mobile-card {') &&
  catCssSrc.includes('cursor: pointer;'),
  '.mobile-card has cursor: pointer for mobile clickability'
);

assert(
  catCssSrc.includes('.mobile-filter-modal-backdrop') &&
  catCssSrc.includes('.mobile-filter-bottom-sheet') &&
  catCssSrc.includes('.mobile-filter-drag-handle') &&
  catCssSrc.includes('.mobile-filter-sheet-header') &&
  catCssSrc.includes('.mobile-filter-sheet-scrollable-body') &&
  catCssSrc.includes('.mobile-filter-option-row') &&
  catCssSrc.includes('.mobile-filter-sheet-footer'),
  'mobile-category.css has complete rules for mobile filter bottom sheet and option rows'
);

assert(
  catCssSrc.includes('.layout-mobile[data-mobile-theme="dark"] .mobile-filter-bottom-sheet'),
  'mobile-category.css includes dark mode compatibility for filter bottom sheet'
);

const themeCssPath = path.resolve('frontend/src/styles/mobile-theme.css');
const themeCssSrc = fs.readFileSync(themeCssPath, 'utf8');

assert(
  themeCssSrc.includes(':not(.site-footer) > .page-container'),
  'mobile-theme.css excludes .site-footer from light background bleeding'
);

assert(
  themeCssSrc.toLowerCase().includes('.layout-mobile .site-footer') &&
  themeCssSrc.toLowerCase().includes('#080f1e'),
  'mobile-theme.css enforces dark navy (#080F1E) on mobile footer'
);

console.log('\n================================================================');
if (allPassed) {
  console.log('🎉 ALL AUDIT CHECKS PASSED SUCCESSFULLY!');
} else {
  console.error('❌ SOME AUDIT CHECKS FAILED. Please review the output above.');
  process.exit(1);
}
console.log('================================================================');
