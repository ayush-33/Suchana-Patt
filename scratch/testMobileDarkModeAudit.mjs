import fs from 'fs';
import path from 'path';

console.log('=== RUNNING MOBILE DARK MODE AUDIT VERIFICATION ===\n');

const mobileThemeCss = fs.readFileSync('frontend/src/styles/mobile-theme.css', 'utf8');
const mobileHeaderJsx = fs.readFileSync('frontend/src/components/layout/MobileHeader.jsx', 'utf8');
const mobileHomePageJsx = fs.readFileSync('frontend/src/components/layout/MobileHomePage.jsx', 'utf8');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. Mobile Navigation Drawer Check
console.log('--- 1. Mobile Navigation Drawer ---');
assert(
  mobileThemeCss.includes('.layout-mobile[data-mobile-theme="dark"] .mobile-drawer-panel'),
  'mobile-theme.css styles .mobile-drawer-panel under mobile dark mode'
);
assert(
  mobileThemeCss.includes('.mobile-drawer-header') && mobileThemeCss.includes('.mobile-drawer-close-btn'),
  'mobile-theme.css styles drawer header and close button'
);
assert(
  mobileThemeCss.includes('.mobile-drawer-section-title') && mobileThemeCss.includes('.mobile-drawer-link'),
  'mobile-theme.css styles drawer section titles and links'
);
assert(
  mobileThemeCss.includes('.mobile-drawer-tag') && mobileThemeCss.includes('.mobile-drawer-icon'),
  'mobile-theme.css styles drawer tags and icons'
);

// 2. Mobile Header & Search Bar
console.log('\n--- 2. Mobile Header & Search Bar ---');
assert(
  mobileThemeCss.includes('.mobile-search-row') && mobileThemeCss.includes('.mobile-search-input'),
  'mobile-theme.css styles mobile-search-row and mobile-search-input in dark mode'
);
assert(
  mobileThemeCss.includes('.mobile-search-clear-btn'),
  'mobile-theme.css styles mobile-search-clear-btn in dark mode'
);

// 3. Mobile Alerts Sheet & Inline styles fix
console.log('\n--- 3. Mobile Alerts Sheet ---');
assert(
  mobileThemeCss.includes('.mobile-alerts-panel') && mobileThemeCss.includes('.mobile-alerts-header'),
  'mobile-theme.css styles alerts panel and header in dark mode'
);
assert(
  mobileThemeCss.includes('.mobile-alert-item') && mobileThemeCss.includes('.mobile-alert-item.unread'),
  'mobile-theme.css styles alert items and unread states'
);
assert(
  mobileThemeCss.includes('.mobile-alerts-empty-title') && mobileThemeCss.includes('.mobile-alerts-empty-desc'),
  'mobile-theme.css styles empty alerts title and description classes'
);
assert(
  !mobileHeaderJsx.includes("color: '#13213a', marginTop: 8"),
  'MobileHeader.jsx no longer hardcodes dark text #13213a in alerts empty state'
);

// 4. Post Detail & JobCard Qualification Panels
console.log('\n--- 4. Post Detail & JobCard Qualification Panels ---');
assert(
  mobileThemeCss.includes('.card-eligibility-panel') && mobileThemeCss.includes('.eligibility-col'),
  'mobile-theme.css styles .card-eligibility-panel and columns in mobile dark mode'
);
assert(
  mobileThemeCss.includes('.eligibility-label') && mobileThemeCss.includes('.eligibility-val'),
  'mobile-theme.css styles eligibility labels and values in mobile dark mode'
);
assert(
  mobileThemeCss.includes('.job-updates-tracker-card') && mobileThemeCss.includes('.tracker-btn-toggle'),
  'mobile-theme.css styles job-updates-tracker-card and toggle button'
);
assert(
  mobileThemeCss.includes('.sidebar-deadline-panel') && mobileThemeCss.includes('.sidebar-status-banner'),
  'mobile-theme.css styles sidebar deadline and status banners'
);
assert(
  mobileThemeCss.includes('.at-a-glance-item') && mobileThemeCss.includes('.sidebar-related-item'),
  'mobile-theme.css styles at-a-glance and related recruitment cards'
);

// 5. Search Results Page & Search Filter Drawer
console.log('\n--- 5. Search Results Page & Search Filter Drawer ---');
assert(
  mobileThemeCss.includes('.search-filter-drawer-container') && mobileThemeCss.includes('.search-filter-drawer-header'),
  'mobile-theme.css styles search filter drawer container and header'
);
assert(
  mobileThemeCss.includes('.search-filter-drawer-body .search-filter-checkbox-item'),
  'mobile-theme.css styles search filter checkbox items in drawer body'
);
assert(
  mobileThemeCss.includes('.search-filter-count-pill'),
  'mobile-theme.css styles filter count pills'
);
assert(
  mobileThemeCss.includes('.search-job-card') && mobileThemeCss.includes('.search-job-eligibility-row'),
  'mobile-theme.css styles search job cards and eligibility rows'
);
assert(
  mobileThemeCss.includes('.search-header-panel') && mobileThemeCss.includes('.search-category-tab'),
  'mobile-theme.css styles search header panel and category tabs'
);
assert(
  mobileThemeCss.includes('.mobile-search-filter-btn') && mobileThemeCss.includes('.search-results-toolbar'),
  'mobile-theme.css styles mobile search filter trigger button and toolbar'
);

// 6. Confirmation Modals & Toast Dialogs
console.log('\n--- 6. Confirmation Modals & Dialogs ---');
assert(
  mobileThemeCss.includes('.confirmation-modal-box') && mobileThemeCss.includes('.confirmation-modal-title'),
  'mobile-theme.css styles confirmation modal box and title'
);
assert(
  mobileThemeCss.includes('.confirmation-modal-text') && mobileThemeCss.includes('.confirmation-btn-cancel'),
  'mobile-theme.css styles confirmation modal text and cancel button'
);
assert(
  mobileThemeCss.includes('.sp-toast'),
  'mobile-theme.css styles toasts in mobile dark mode'
);

// 7. Status Badges
console.log('\n--- 7. Status Badges & Category Tags ---');
assert(
  mobileThemeCss.includes('.sp-badge-gov') && mobileThemeCss.includes('.sp-badge-open'),
  'mobile-theme.css styles sp-badge-gov and sp-badge-open for mobile dark mode'
);
assert(
  mobileThemeCss.includes('.sp-badge-closed') && mobileThemeCss.includes('.sp-badge-released'),
  'mobile-theme.css styles sp-badge-closed and sp-badge-released for mobile dark mode'
);

// 8. Mobile Homepage data-mobile-theme attribute
console.log('\n--- 8. Mobile Homepage Data Attributes ---');
assert(
  mobileHomePageJsx.includes('data-mobile-theme={theme}'),
  'MobileHomePage.jsx sets data-mobile-theme={theme}'
);

// 9. Mobile Light Mode & Desktop Isolation
console.log('\n--- 9. Mobile Light Mode & Desktop Isolation ---');
assert(
  mobileThemeCss.includes('.layout-mobile[data-mobile-theme="light"]') ||
  mobileThemeCss.includes('.layout-mobile:not([data-mobile-theme="dark"])'),
  'mobile-theme.css retains mobile light mode baseline styles'
);
assert(
  !mobileThemeCss.includes('.layout-desktop[data-mobile-theme='),
  'mobile-theme.css does NOT touch desktop layouts'
);

console.log(`\n========================================`);
console.log(`AUDIT RESULTS: ${passedTests} / ${totalTests} PASSED`);
console.log(`========================================`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}

