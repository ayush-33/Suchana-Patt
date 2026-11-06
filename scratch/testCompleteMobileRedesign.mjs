import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('=== Starting Verification: Complete Mobile UI Redesign, Category Listing & Global Dark Mode ===\n');

const baseDir = path.resolve('frontend');
const mobileHomePath = path.join(baseDir, 'src/components/layout/MobileHomePage.jsx');
const mobileCatListingPath = path.join(baseDir, 'src/components/category/MobileCategoryListingPage.jsx');
const mobileCatCssPath = path.join(baseDir, 'src/styles/mobile-category.css');
const mobileThemeCssPath = path.join(baseDir, 'src/styles/mobile-theme.css');
const tokensCssPath = path.join(baseDir, 'src/styles/tokens.css');
const globalCssPath = path.join(baseDir, 'src/styles/global.css');
const appJsxPath = path.join(baseDir, 'src/app/App.jsx');
const routerJsxPath = path.join(baseDir, 'src/app/router.jsx');
const categoryServicePath = path.join(baseDir, 'src/services/categoryService.js');
const categoryPagePath = path.join(baseDir, 'src/pages/CategoryPage.jsx');
const latestJobsPagePath = path.join(baseDir, 'src/pages/LatestJobsPage.jsx');
const resultsPagePath = path.join(baseDir, 'src/pages/ResultsPage.jsx');
const admitCardsPagePath = path.join(baseDir, 'src/pages/AdmitCardsPage.jsx');
const jobDetailsPagePath = path.join(baseDir, 'src/pages/JobDetailsPage.jsx');

const mobileHomeContent = fs.readFileSync(mobileHomePath, 'utf-8');
const mobileCatListingContent = fs.readFileSync(mobileCatListingPath, 'utf-8');
const mobileCatCssContent = fs.readFileSync(mobileCatCssPath, 'utf-8');
const mobileThemeCssContent = fs.readFileSync(mobileThemeCssPath, 'utf-8');
const tokensCssContent = fs.readFileSync(tokensCssPath, 'utf-8');
const globalCssContent = fs.readFileSync(globalCssPath, 'utf-8');
const appJsxContent = fs.readFileSync(appJsxPath, 'utf-8');
const routerJsxContent = fs.readFileSync(routerJsxPath, 'utf-8');
const categoryServiceContent = fs.readFileSync(categoryServicePath, 'utf-8');
const categoryPageContent = fs.readFileSync(categoryPagePath, 'utf-8');
const latestJobsContent = fs.readFileSync(latestJobsPagePath, 'utf-8');
const resultsContent = fs.readFileSync(resultsPagePath, 'utf-8');
const admitCardsContent = fs.readFileSync(admitCardsPagePath, 'utf-8');
const jobDetailsContent = fs.readFileSync(jobDetailsPagePath, 'utf-8');

// 1. PART 1: Mobile Homepage Preservation & Category Navigation
console.log('1. Verifying Part 1: Mobile Homepage Preservation & Category Navigation...');
assert(mobileHomeContent.includes('mobile-home-category-grid'), 'Mobile homepage must keep two-column grid');
assert(mobileHomeContent.includes('title="Result"'), 'Homepage must keep Result card');
assert(mobileHomeContent.includes('title="Latest Jobs"'), 'Homepage must keep Latest Jobs card');
assert(mobileHomeContent.includes('title="Answer Key"'), 'Homepage must keep Answer Key card');
assert(mobileHomeContent.includes('title="Admit Card"'), 'Homepage must keep Admit Card card');
assert(mobileHomeContent.includes('mobile-faq-section'), 'Homepage must keep FAQ section');
// Check navigation to dedicated category page
assert(mobileHomeContent.includes('navigate(`/category/${cat.id}`)'), 'Tapping category button must navigate to /category/:id');
console.log('   -> Part 1 PASSED');

// 2. PART 2: Dedicated Mobile Category Listing Pages
console.log('2. Verifying Part 2: Dedicated Mobile Category Listing Page Component...');
assert(fs.existsSync(mobileCatListingPath), 'MobileCategoryListingPage.jsx must exist');
assert(fs.existsSync(mobileCatCssPath), 'mobile-category.css must exist');

// 2.1 - 2.3: Breadcrumbs
assert(mobileCatListingContent.includes('mobile-cat-breadcrumbs'), 'Must include breadcrumb navigation');
assert(mobileCatListingContent.includes('Home'), 'Breadcrumbs must link to Home');

// 2.4: Category Overview Card
assert(mobileCatListingContent.includes('mobile-cat-overview-card'), 'Must render category overview card');
assert(mobileCatListingContent.includes('mobile-cat-title'), 'Overview card must have title');
assert(mobileCatListingContent.includes('mobile-cat-description'), 'Overview card must have description');
assert(mobileCatListingContent.includes('Notifications'), 'Overview card must display dynamic notification count');

// 2.5: Subcategory Tabs Removal
assert(!mobileCatListingContent.includes('mobile-cat-tabs-container'), 'Must have subcategory navigation removed per specification');

// 2.6: Search and Filter Controls
assert(mobileCatListingContent.includes('mobile-cat-search-input'), 'Must have search field');
assert(mobileCatListingContent.includes('mobile-cat-filter-btn'), 'Must have filter button');
assert(mobileCatListingContent.includes('mobile-cat-modal-sheet'), 'Must have filter modal/drawer');

// 2.7 & 2.8: Mobile Notification Cards (Jobs, Admit Cards, Results, Others)
assert(mobileCatListingContent.includes('mobile-cat-cards-list'), 'Must render single-column notification list');
assert(mobileCatListingContent.includes('MobileJobCard'), 'Must support specialized MobileJobCard');
assert(mobileCatListingContent.includes('MobileAdmitCardCard'), 'Must support specialized MobileAdmitCardCard');
assert(mobileCatListingContent.includes('MobileResultCard'), 'Must support specialized MobileResultCard');
assert(mobileCatListingContent.includes('MobileOtherCard'), 'Must support MobileOtherCard');

// 2.9: Pagination
assert(mobileCatListingContent.includes('mobile-cat-pagination'), 'Must render pagination controls');
assert(mobileCatListingContent.includes('mobile-cat-pag-btn'), 'Must have prev/next pagination buttons');
console.log('   -> Part 2 PASSED');

// 3. PART 3: Reusable Category Experience Throughout the Portal
console.log('3. Verifying Part 3: Reusable Category Architecture Across Routes...');
assert(routerJsxContent.includes('/category/:categorySlug'), 'Router must define /category/:categorySlug route');
assert(categoryPageContent.includes('MobileCategoryListingPage'), 'CategoryPage must use MobileCategoryListingPage for mobile');
assert(latestJobsContent.includes('MobileCategoryListingPage'), 'LatestJobsPage must use MobileCategoryListingPage for mobile');
assert(resultsContent.includes('MobileCategoryListingPage'), 'ResultsPage must use MobileCategoryListingPage for mobile');
assert(admitCardsContent.includes('MobileCategoryListingPage'), 'AdmitCardsPage must use MobileCategoryListingPage for mobile');
console.log('   -> Part 3 PASSED');

// 4. PART 4: Global Mobile Dark Mode Across Entire Website
console.log('4. Verifying Part 4: Global Mobile Theme Detection & Styling...');
// App.jsx synchronization
assert(appJsxContent.includes("setAttribute('data-mobile-theme', mobileTheme)"), 'App.jsx must set data-mobile-theme on documentElement');
assert(appJsxContent.includes('sp-mobile-dark-theme'), 'App.jsx must toggle sp-mobile-dark-theme on document.body');
assert(globalCssContent.includes('mobile-theme.css'), 'global.css must import mobile-theme.css');

// tokens.css variables
assert(tokensCssContent.includes('.layout-mobile[data-mobile-theme="dark"]'), 'tokens.css must define mobile dark theme variables');
assert(tokensCssContent.includes('--color-background: #080f1e'), 'tokens.css must define dark background #080f1e');
assert(tokensCssContent.includes('--color-surface: #152238'), 'tokens.css must define dark surface #152238');
assert(tokensCssContent.includes('--color-primary: #2563eb'), 'tokens.css must define dark primary blue #2563eb');
assert(tokensCssContent.includes('--color-text: #f1f5f9'), 'tokens.css must define dark text #f1f5f9');
assert(tokensCssContent.includes('--color-border: #263a56'), 'tokens.css must define dark border #263a56');

// mobile-theme.css page coverage
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .details-panel'), 'Post detail panels covered in dark mode');
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .sp-details-table'), 'Tables covered in dark mode');
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .age-card-item'), 'Age limit cards covered in dark mode');
assert(mobileThemeCssContent.includes('.layout-mobile .site-footer'), 'Mobile footer covered in both themes');
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .login-card'), 'Login page covered in dark mode');
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .saved-jobs-page-container'), 'Saved jobs covered in dark mode');
assert(mobileThemeCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .search-results-page-container'), 'Search results covered in dark mode');
console.log('   -> Part 4 PASSED');

// 5. PART 6: Strict Desktop Isolation
console.log('5. Verifying Part 6: Strict Desktop Isolation...');
assert(appJsxContent.includes('data-theme={activeDesktopTheme}'), 'Desktop must keep data-theme={activeDesktopTheme}');
assert(!tokensCssContent.includes('.layout-mobile[data-theme="dark"]'), 'layout-mobile must NEVER use desktop data-theme="dark"');
assert(latestJobsContent.includes('isDesktop && ('), 'LatestJobsPage must keep desktop filter sidebar for desktop');
assert(categoryPageContent.includes('!isMobile') || categoryPageContent.includes('Navigate'), 'CategoryPage must provide desktop delegation');
console.log('   -> Part 6 PASSED');

// 6. Test Category Data Service Integration
console.log('6. Verifying Category Data Aggregation...');
const { getCategoryDetails } = await import('../frontend/src/services/categoryService.js');
['railway', 'upsc', 'ssc', 'banking', 'teaching', 'defence', 'latest-jobs', 'results'].forEach((slug) => {
  const data = getCategoryDetails(slug);
  assert(data.categoryInfo && data.categoryInfo.title, `${slug} must have category title`);
  assert(data.allItems && data.allItems.length > 0, `${slug} must return real notification items`);
  assert(data.counts && typeof data.counts.all === 'number', `${slug} must have dynamic counts`);
});
console.log('   -> Category Data Service PASSED');

console.log('\n=== ALL VERIFICATION CHECKS PASSED (100%)! ===');
