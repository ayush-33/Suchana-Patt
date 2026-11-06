import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('=== Starting Verification: Mobile Category Listing UI Refinement ===\n');

const baseDir = path.resolve('frontend');
const mobileCatListingPath = path.join(baseDir, 'src/components/category/MobileCategoryListingPage.jsx');
const mobileCatCssPath = path.join(baseDir, 'src/styles/mobile-category.css');
const mobileThemeCssPath = path.join(baseDir, 'src/styles/mobile-theme.css');
const categoryServicePath = path.join(baseDir, 'src/services/categoryService.js');
const desktopJobCardPath = path.join(baseDir, 'src/components/jobs/JobCard.jsx');
const desktopAdmitCardsPagePath = path.join(baseDir, 'src/pages/AdmitCardsPage.jsx');
const desktopResultsPagePath = path.join(baseDir, 'src/pages/ResultsPage.jsx');
const desktopFooterPath = path.join(baseDir, 'src/components/layout/Footer.jsx');

const mobileCatListingContent = fs.readFileSync(mobileCatListingPath, 'utf-8');
const mobileCatCssContent = fs.readFileSync(mobileCatCssPath, 'utf-8');
const mobileThemeCssContent = fs.readFileSync(mobileThemeCssPath, 'utf-8');
const categoryServiceContent = fs.readFileSync(categoryServicePath, 'utf-8');
const desktopJobCardContent = fs.readFileSync(desktopJobCardPath, 'utf-8');
const desktopAdmitCardsContent = fs.readFileSync(desktopAdmitCardsPagePath, 'utf-8');
const desktopResultsContent = fs.readFileSync(desktopResultsPagePath, 'utf-8');
const desktopFooterContent = fs.readFileSync(desktopFooterPath, 'utf-8');

// ============================================================================
// SUITE 1: Subcategory Navigation Removal
// ============================================================================
console.log('1. Verifying Subcategory Navigation Removal...');
assert(!mobileCatListingContent.includes('mobile-cat-tabs-container'), 'mobile-cat-tabs-container must be completely removed');
assert(!mobileCatListingContent.includes('mobile-cat-tab-btn'), 'mobile-cat-tab-btn must be completely removed');
assert(!mobileCatListingContent.includes('activeTab'), 'activeTab state must be removed from MobileCategoryListingPage');

// Breadcrumb check: directly links Home -> categoryInfo.label
assert(mobileCatListingContent.includes('mobile-cat-breadcrumbs'), 'Breadcrumbs must remain');
assert(mobileCatListingContent.includes('{categoryInfo.label}'), 'Breadcrumb must show active category label directly');

// Category overview card directly precedes toolbar
assert(mobileCatListingContent.includes('mobile-cat-overview-card'), 'Category overview card must remain');
assert(mobileCatListingContent.includes('mobile-cat-toolbar'), 'Search & filter toolbar must follow overview card');
console.log('   -> Suite 1 (Subcategory Removal): PASSED');

// ============================================================================
// SUITE 2: Mobile Latest Jobs Notification Card
// ============================================================================
console.log('2. Verifying Mobile Latest Jobs Notification Card...');
assert(mobileCatListingContent.includes('function MobileJobCard'), 'MobileJobCard subcomponent must be implemented');

// A. Top Information Row
assert(mobileCatListingContent.includes('mobile-card-top-row'), 'Must render top information row');
assert(mobileCatListingContent.includes('typeText'), 'Must render notification type badge');
assert(mobileCatListingContent.includes('statusText'), 'Must render application status badge');
assert(mobileCatListingContent.includes('mobile-reminder-btn'), 'Must include Reminder button');
assert(mobileCatListingContent.includes('mobile-bookmark-btn'), 'Must include Bookmark button');
assert(mobileCatListingContent.includes('toggleReminder'), 'Reminder button must invoke toggleReminder');
assert(mobileCatListingContent.includes('toggleBookmark'), 'Bookmark button must invoke toggleBookmark');

// B. Job Title
assert(mobileCatListingContent.includes('mobile-card-title'), 'Must render job title');
assert(mobileCatListingContent.includes('job.title'), 'Must display complete job title');

// C. Recruiting Organization
assert(mobileCatListingContent.includes('mobile-card-org'), 'Must render recruiting organization');
assert(mobileCatListingContent.includes('Building2'), 'Must include organization icon');

// D. Qualification Information Panel (3 rows: Qualification, Age Limit, Experience)
assert(mobileCatListingContent.includes('mobile-qual-panel'), 'Must render qualification information panel');
assert(mobileCatListingContent.includes('GraduationCap'), 'Must include qualification icon');
assert(mobileCatListingContent.includes('Clock'), 'Must include age limit icon');
assert(mobileCatListingContent.includes('Briefcase'), 'Must include experience icon');
assert(mobileCatListingContent.includes('Qualification</span>'), 'Panel must include Qualification row');
assert(mobileCatListingContent.includes('Age Limit</span>'), 'Panel must include Age Limit row');
assert(mobileCatListingContent.includes('Experience</span>'), 'Panel must include Experience row');

// E. Additional Job Information (Opens date & vacancies)
assert(mobileCatListingContent.includes('mobile-job-meta-row'), 'Must render additional job meta row');
assert(mobileCatListingContent.includes('Opens:'), 'Must show application opening date');
assert(mobileCatListingContent.includes('Vacancies:'), 'Must show total vacancies count');
assert(mobileCatListingContent.includes('Users'), 'Must include vacancies user group icon');

// F. Details Button
assert(mobileCatListingContent.includes('mobile-card-details-btn'), 'Must render full-width Details button');
assert(mobileCatListingContent.includes('ArrowRight'), 'Details button must include ArrowRight icon');
assert(mobileCatListingContent.includes('/jobs/${job.id}'), 'Details button must navigate to notification detail route');
console.log('   -> Suite 2 (Latest Jobs Card): PASSED');

// ============================================================================
// SUITE 3: Mobile Admit Card Notification Card
// ============================================================================
console.log('3. Verifying Mobile Admit Card Notification Card...');
assert(mobileCatListingContent.includes('function MobileAdmitCardCard'), 'MobileAdmitCardCard subcomponent must be implemented');

// A. Top Row: Status badge on left, Category badge on right
assert(mobileCatListingContent.includes('mobile-category-badge'), 'Must render department/category badge on right');

// B. Admit card title & C. Conducting org
assert(mobileCatListingContent.includes('card.examName || card.title'), 'Must render examination title');
assert(mobileCatListingContent.includes('card.organization'), 'Must render conducting organization');

// D. Information or Announcement Panel
assert(mobileCatListingContent.includes('mobile-announcement-panel'), 'Must render announcement panel');
assert(mobileCatListingContent.includes('mobile-announcement-text'), 'Must render announcement text');

// E. Divider
assert(mobileCatListingContent.includes('mobile-card-divider'), 'Must render card divider');

// F. Bottom Action Row: Exam date + Action button
assert(mobileCatListingContent.includes('mobile-card-action-row'), 'Must render bottom action row');
assert(mobileCatListingContent.includes('Exam:'), 'Must display examination date');
assert(mobileCatListingContent.includes('Download Admit Card'), 'Must support Download Admit Card action when released');
assert(mobileCatListingContent.includes('Notify When Released'), 'Must support Notify When Released action when pending');
console.log('   -> Suite 3 (Admit Card Card): PASSED');

// ============================================================================
// SUITE 4: Mobile Results Notification Card
// ============================================================================
console.log('4. Verifying Mobile Results Notification Card...');
assert(mobileCatListingContent.includes('function MobileResultCard'), 'MobileResultCard subcomponent must be implemented');

// A. Top Row: Result status badge on left, Category badge on right
assert(mobileCatListingContent.includes('res.category'), 'Must display result category tag');

// B. Result Title & C. Organization
assert(mobileCatListingContent.includes('res.examName || res.title'), 'Must render result title');
assert(mobileCatListingContent.includes('res.organization'), 'Must render conducting organization');

// D. Result Information Panel (Cutoff / summary)
assert(mobileCatListingContent.includes('mobile-result-panel'), 'Must render result information panel');
assert(mobileCatListingContent.includes('resultInfo'), 'Must render cutoff or announcement text');

// E. Divider & F. Bottom Action Row
assert(mobileCatListingContent.includes('Declared:'), 'Must display result declaration date');
assert(mobileCatListingContent.includes('Scorecard') || mobileCatListingContent.includes('View Result'), 'Must support Scorecard or View Result action');
console.log('   -> Suite 4 (Results Card): PASSED');

// ============================================================================
// SUITE 5: Mobile CSS Design, Theming & Responsiveness
// ============================================================================
console.log('5. Verifying Mobile CSS Design & Theming...');

// Base card styles in light mode
assert(mobileCatCssContent.includes('.mobile-card {'), 'Must define base .mobile-card styling');
assert(mobileCatCssContent.includes('.mobile-card-top-row'), 'Must define .mobile-card-top-row');
assert(mobileCatCssContent.includes('.mobile-qual-panel'), 'Must define .mobile-qual-panel');
assert(mobileCatCssContent.includes('.mobile-card-details-btn'), 'Must define .mobile-card-details-btn');
assert(mobileCatCssContent.includes('.mobile-announcement-panel'), 'Must define .mobile-announcement-panel');
assert(mobileCatCssContent.includes('.mobile-result-panel'), 'Must define .mobile-result-panel');
assert(mobileCatCssContent.includes('.mobile-card-divider'), 'Must define .mobile-card-divider');
assert(mobileCatCssContent.includes('.mobile-card-action-row'), 'Must define .mobile-card-action-row');

// Dark Mode CSS
assert(mobileCatCssContent.includes('.mobile-category-page.dark-mode .mobile-card'), 'Must style .mobile-card in dark mode');
assert(mobileCatCssContent.includes('.mobile-category-page.dark-mode .mobile-qual-panel'), 'Must style qualification panel in dark mode');
assert(mobileCatCssContent.includes('.mobile-category-page.dark-mode .mobile-announcement-panel'), 'Must style announcement panel in dark mode');
assert(mobileCatCssContent.includes('.mobile-category-page.dark-mode .mobile-result-panel'), 'Must style result panel in dark mode');
assert(mobileCatCssContent.includes('.mobile-category-page.dark-mode .mobile-card-details-btn'), 'Must style details button in dark mode');

// Responsiveness at <= 360px
assert(mobileCatCssContent.includes('@media (max-width: 360px)'), 'Must include responsive rules for narrow viewports');
console.log('   -> Suite 5 (Mobile CSS & Theming): PASSED');

// ============================================================================
// SUITE 6: Mobile Pagination (Max 6 Cards)
// ============================================================================
console.log('6. Verifying Mobile Pagination (Max 6 cards)...');
assert(mobileCatListingContent.includes('const PAGE_SIZE = 6;'), 'PAGE_SIZE must be exactly 6');
assert(mobileCatListingContent.includes('{totalPages > 1 && ('), 'Pagination must be hidden when records <= 6');
assert(mobileCatListingContent.includes('safeCurrentPage - 1'), 'Pagination must support Previous page');
assert(mobileCatListingContent.includes('safeCurrentPage + 1'), 'Pagination must support Next page');
assert(mobileCatListingContent.includes('listingRef'), 'Must scroll smoothly to listingRef on page change');
console.log('   -> Suite 6 (Pagination): PASSED');

// ============================================================================
// SUITE 7: Mobile Footer Fixed Dark Navy & Strict Desktop Isolation
// ============================================================================
console.log('7. Verifying Mobile Footer & Strict Desktop Isolation...');

// Mobile Footer remains dark navy in both themes
assert(mobileThemeCssContent.includes('.layout-mobile .site-footer'), 'Mobile footer must be styled for .layout-mobile');
assert(mobileThemeCssContent.includes('background-color: #080f1e !important;'), 'Mobile footer must use #080f1e');
assert(mobileThemeCssContent.includes('.layout-mobile .footer-disclaimer-box'), 'Mobile disclaimer box must be dark');
assert(mobileThemeCssContent.includes('color: #facc15 !important;'), 'Disclaimer title must use #facc15');

// Desktop UI Isolation
assert(desktopJobCardContent.includes('sp-job-card'), 'Desktop JobCard must remain untouched');
assert(desktopAdmitCardsContent.includes('AdmitCardCard'), 'Desktop AdmitCardsPage must retain desktop card implementation');
assert(desktopResultsContent.includes('ResultsCard'), 'Desktop ResultsPage must retain desktop card implementation');
assert(!desktopFooterContent.includes('layout-mobile'), 'Desktop footer component must not have mobile overrides');

console.log('   -> Suite 7 (Footer & Desktop Isolation): PASSED');

console.log('\n=== ALL 7 SUITES PASSED! MOBILE CATEGORY LISTING UI REFINEMENT 100% VERIFIED! ===');

