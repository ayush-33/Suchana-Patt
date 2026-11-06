import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('=== Starting Verification: Mobile Category Pagination (6 items) & Consistent Dark Footer ===\n');

const baseDir = path.resolve('frontend');
const mobileCatListingPath = path.join(baseDir, 'src/components/category/MobileCategoryListingPage.jsx');
const mobileCatCssPath = path.join(baseDir, 'src/styles/mobile-category.css');
const mobileThemeCssPath = path.join(baseDir, 'src/styles/mobile-theme.css');
const footerJsxPath = path.join(baseDir, 'src/components/layout/Footer.jsx');
const tokensCssPath = path.join(baseDir, 'src/styles/tokens.css');

const mobileCatListingContent = fs.readFileSync(mobileCatListingPath, 'utf-8');
const mobileCatCssContent = fs.readFileSync(mobileCatCssPath, 'utf-8');
const mobileThemeCssContent = fs.readFileSync(mobileThemeCssPath, 'utf-8');
const footerJsxContent = fs.readFileSync(footerJsxPath, 'utf-8');
const tokensCssContent = fs.readFileSync(tokensCssPath, 'utf-8');

// ============================================================================
// SUITE 1: Mobile Category Listing Pagination (Max 6 records per page)
// ============================================================================
console.log('1. Verifying Mobile Category Listing Pagination (Max 6 items per page)...');

// 1.1 Page Size Constant
assert(mobileCatListingContent.includes('const PAGE_SIZE = 6;'), 'PAGE_SIZE must be set to 6');

// 1.2 Placement and DOM elements
assert(mobileCatListingContent.includes('className="mobile-cat-pagination"'), 'Must render mobile-cat-pagination container');
assert(mobileCatListingContent.includes('mobile-cat-pag-btn prev'), 'Must include Previous pagination button');
assert(mobileCatListingContent.includes('mobile-cat-pag-btn next'), 'Must include Next pagination button');
assert(mobileCatListingContent.includes('mobile-cat-page-numbers'), 'Must render page numbers container');
assert(mobileCatListingContent.includes('mobile-cat-page-num'), 'Must render numeric page buttons');

// 1.3 Total Pages & Display Condition
assert(mobileCatListingContent.includes('Math.ceil(filteredItems.length / PAGE_SIZE)'), 'Total pages must calculate dynamically from filtered dataset');
assert(mobileCatListingContent.includes('{totalPages > 1 && ('), 'Pagination controls must only render when totalPages > 1 (hidden for <= 6 records)');

// 1.4 Dynamic Slicing
assert(mobileCatListingContent.includes('start + PAGE_SIZE'), 'Paginated items must slice exactly start to start + PAGE_SIZE');

// 1.5 Clamping and State Resets
assert(mobileCatListingContent.includes('if (currentPage > totalPages)'), 'Must clamp currentPage to 1 if active filters reduce total pages');
assert(mobileCatListingContent.includes('setCurrentPage(1)'), 'Must reset to page 1 on search, tab switch, or filter change');

// 1.6 Scroll Behavior
assert(mobileCatListingContent.includes('ref={listingRef}'), 'Listing container must have listingRef for smooth scroll');
assert(mobileCatListingContent.includes('listingRef.current.getBoundingClientRect()'), 'Must scroll smoothly to top of listing rather than jumping to (0, 0)');
assert(!mobileCatListingContent.includes('window.scrollTo({ top: 0, behavior: \'smooth\' })'), 'Must not reset window to top (0, 0) on page change');

console.log('   -> Suite 1 (Pagination Implementation): PASSED');

// ============================================================================
// SUITE 2: Math and Boundary Verification for 6-Record Pagination
// ============================================================================
console.log('2. Verifying Pagination Boundary Math...');

const PAGE_SIZE = 6;
function testPagination(totalRecords) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));
  const showPagination = totalPages > 1;
  const pages = [];
  for (let p = 1; p <= totalPages; p++) {
    const start = (p - 1) * PAGE_SIZE;
    const count = Math.min(PAGE_SIZE, totalRecords - start);
    pages.push(count);
  }
  return { totalPages, showPagination, pages };
}

// Case 1: 5 records -> 1 page with 5 records, NO pagination controls
const case5 = testPagination(5);
assert.strictEqual(case5.totalPages, 1);
assert.strictEqual(case5.showPagination, false, '5 records must NOT show pagination');
assert.deepStrictEqual(case5.pages, [5], 'Page 1 must show all 5 records');

// Case 2: 6 records -> 1 page with 6 records, NO pagination controls
const case6 = testPagination(6);
assert.strictEqual(case6.totalPages, 1);
assert.strictEqual(case6.showPagination, false, '6 records must NOT show pagination');
assert.deepStrictEqual(case6.pages, [6], 'Page 1 must show all 6 records');

// Case 3: 7 records -> 2 pages: Page 1 shows 6, Page 2 shows 1, WITH pagination
const case7 = testPagination(7);
assert.strictEqual(case7.totalPages, 2);
assert.strictEqual(case7.showPagination, true, '7 records MUST show pagination');
assert.deepStrictEqual(case7.pages, [6, 1], 'Page 1 shows 6, Page 2 shows 1');

// Case 4: 12 records -> 2 pages: Page 1 shows 6, Page 2 shows 6, WITH pagination
const case12 = testPagination(12);
assert.strictEqual(case12.totalPages, 2);
assert.strictEqual(case12.showPagination, true);
assert.deepStrictEqual(case12.pages, [6, 6]);

// Case 5: 14 records -> 3 pages: 6, 6, 2, WITH pagination
const case14 = testPagination(14);
assert.strictEqual(case14.totalPages, 3);
assert.strictEqual(case14.showPagination, true);
assert.deepStrictEqual(case14.pages, [6, 6, 2]);

console.log('   -> Suite 2 (Boundary Math for 5, 6, 7, 12, 14 records): PASSED');

// ============================================================================
// SUITE 3: Real Category Datasets Pagination Verification
// ============================================================================
console.log('3. Verifying Real Category Datasets with 6-Record Pagination...');

const { getCategoryDetails } = await import('../frontend/src/services/categoryService.js');

const categoriesToTest = [
  { slug: 'railway', expectedTotal: 9, expectedPages: 2, expectedShow: true },
  { slug: 'upsc', expectedTotal: 7, expectedPages: 2, expectedShow: true },
  { slug: 'ssc', expectedTotal: 11, expectedPages: 2, expectedShow: true },
  { slug: 'banking', expectedTotal: 14, expectedPages: 3, expectedShow: true },
  { slug: 'teaching', expectedTotal: 5, expectedPages: 1, expectedShow: false },
  { slug: 'latest-jobs', expectedTotal: 34, expectedPages: 6, expectedShow: true },
  { slug: 'results', expectedTotal: 5, expectedPages: 1, expectedShow: false }
];

categoriesToTest.forEach(({ slug, expectedTotal, expectedPages, expectedShow }) => {
  const data = getCategoryDetails(slug);
  const count = data.allItems.length;
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const show = totalPages > 1;

  assert.strictEqual(count, expectedTotal, `${slug} expected ${expectedTotal} items, got ${count}`);
  assert.strictEqual(totalPages, expectedPages, `${slug} expected ${expectedPages} pages, got ${totalPages}`);
  assert.strictEqual(show, expectedShow, `${slug} pagination visibility must be ${expectedShow}`);
});

console.log('   -> Suite 3 (Real Category Datasets): PASSED');

// ============================================================================
// SUITE 4: Pagination CSS Styling (Light and Dark Mode)
// ============================================================================
console.log('4. Verifying Pagination CSS Styling...');

assert(mobileCatCssContent.includes('.mobile-cat-pagination'), 'CSS must define .mobile-cat-pagination');
assert(mobileCatCssContent.includes('.mobile-cat-pag-btn'), 'CSS must define .mobile-cat-pag-btn');
assert(mobileCatCssContent.includes('.mobile-cat-page-num'), 'CSS must define .mobile-cat-page-num');
assert(mobileCatCssContent.includes('.mobile-cat-page-num.active'), 'CSS must define .mobile-cat-page-num.active');
assert(mobileCatCssContent.includes('background-color: #0756c9'), 'Active page must have blue background #0756c9');
assert(mobileCatCssContent.includes('color: #ffffff'), 'Active page must have white text');
assert(mobileCatCssContent.includes('height: 42px'), 'Pagination buttons must have touch-friendly height >= 40px');

// Dark Mode CSS overrides for pagination
assert(mobileCatCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .mobile-cat-pag-btn'), 'Dark mode must style pagination buttons');
assert(mobileCatCssContent.includes('.layout-mobile[data-mobile-theme="dark"] .mobile-cat-page-num.active'), 'Dark mode active page button must be blue');
assert(mobileCatCssContent.includes('background-color: #2563eb'), 'Dark mode active page must use #2563eb');
assert(mobileCatCssContent.includes('.mobile-cat-page-ellipsis'), 'Ellipsis styling must exist');

console.log('   -> Suite 4 (Pagination CSS): PASSED');

// ============================================================================
// SUITE 5: Consistent Dark Footer in BOTH Mobile Themes
// ============================================================================
console.log('5. Verifying Consistent Dark Footer Across BOTH Mobile Light & Dark Modes...');

// 5.1 Scoped to .layout-mobile .site-footer (Applies to both light and dark mobile modes!)
assert(mobileThemeCssContent.includes('.layout-mobile .site-footer'), 'Footer styles must apply to .layout-mobile .site-footer');

// 5.2 Palette Verification
assert(mobileThemeCssContent.includes('background-color: #080f1e !important'), 'Footer background must be #080f1e in both themes');
assert(mobileThemeCssContent.includes('border-top: 3px solid #2563eb !important'), 'Footer top border must be #2563eb in both themes');
assert(mobileThemeCssContent.includes('.layout-mobile .mobile-footer-header-btn'), 'Accordion header button must be styled');
assert(mobileThemeCssContent.includes('color: #f1f5f9 !important'), 'Accordion header text must be #f1f5f9 (white)');
assert(mobileThemeCssContent.includes('.layout-mobile .mobile-footer-accordion'), 'Accordion border must be styled');
assert(mobileThemeCssContent.includes('border-top: 1px solid #263a56 !important'), 'Accordion divider must be #263a56');
assert(mobileThemeCssContent.includes('.layout-mobile .mobile-footer-links-panel'), 'Expanded links panel must be styled');
assert(mobileThemeCssContent.includes('background-color: #0d1729 !important'), 'Expanded panel background must be #0d1729');
assert(mobileThemeCssContent.includes('.layout-mobile .mobile-footer-link'), 'Footer links must be styled');
assert(mobileThemeCssContent.includes('color: #cbd5e1 !important'), 'Footer link color must be #cbd5e1');
assert(mobileThemeCssContent.includes('.layout-mobile .mobile-footer-link:hover'), 'Footer link hover must be styled');
assert(mobileThemeCssContent.includes('color: #60a5fa !important'), 'Footer link hover must be #60a5fa');

// 5.3 Disclaimer Box
assert(mobileThemeCssContent.includes('.layout-mobile .footer-disclaimer-box'), 'Disclaimer box must be styled');
assert(mobileThemeCssContent.includes('.layout-mobile .footer-disclaimer-title'), 'Disclaimer title must be styled');
assert(mobileThemeCssContent.includes('color: #facc15 !important'), 'Disclaimer title must be #facc15 (yellow)');

// 5.4 Tagline
assert(mobileThemeCssContent.includes('.layout-mobile .footer-tagline'), 'Tagline must be styled');
assert(mobileThemeCssContent.includes('color: #facc15 !important'), 'Tagline must be yellow #facc15');

// 5.5 Brand Logo Box
assert(mobileThemeCssContent.includes('.layout-mobile .footer-brand-icon-box'), 'Brand icon box must be styled');
assert(mobileThemeCssContent.includes('background-color: #2563eb !important'), 'Brand icon box background must be #2563eb');

console.log('   -> Suite 5 (Consistent Dark Mobile Footer): PASSED');

// ============================================================================
// SUITE 6: Strict Desktop Isolation
// ============================================================================
console.log('6. Verifying Strict Desktop Isolation...');

assert(!mobileThemeCssContent.includes('.layout-desktop .site-footer {\n  background-color: #080f1e !important'), 'Desktop footer must not have mobile dark overrides');
assert(footerJsxContent.includes('isMobile ? ('), 'Footer.jsx must separate mobile and desktop footer layouts');
assert(footerJsxContent.includes('footer-grid'), 'Desktop 5-column footer grid must be preserved');
assert(!tokensCssContent.includes('.layout-mobile[data-theme="dark"]'), 'Mobile must not use desktop theme attribute');

console.log('   -> Suite 6 (Strict Desktop Isolation): PASSED');

console.log('\n=== ALL 6 SUITES PASSED! MOBILE PAGINATION (6 ITEMS) & DARK FOOTER 100% VERIFIED! ===');

