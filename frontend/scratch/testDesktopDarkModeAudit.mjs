import fs from 'fs';
import path from 'path';

console.log('=== Running Comprehensive Desktop Dark Mode, Branding & Expansion Audit ===\n');

const css = fs.readFileSync(path.resolve('frontend/src/styles/components.css'), 'utf8');
const tokens = fs.readFileSync(path.resolve('frontend/src/styles/tokens.css'), 'utf8');
const caPage = fs.readFileSync(path.resolve('frontend/src/pages/CurrentAffairsPage.jsx'), 'utf8');
const jdPage = fs.readFileSync(path.resolve('frontend/src/pages/JobDetailsPage.jsx'), 'utf8');
const pagComponent = fs.readFileSync(path.resolve('frontend/src/components/jobs/Pagination.jsx'), 'utf8');

const tests = [
  {
    name: '1. Current Affairs Independent Expansion & Layout Safeguards',
    checks: [
      // React state is Set-based per-card
      caPage.includes('const [expandedIds, setExpandedIds] = useState(() => new Set());'),
      caPage.includes('const toggleExpand = (id) =>'),
      caPage.includes('const isExpanded = expandedIds.has(art.id);'),
      // No inline background or text colors on badge/date
      !caPage.includes("backgroundColor: '#eaf2ff'"),
      !caPage.includes("color: '#0755d9'"),
      caPage.includes('className="current-affairs-category-badge"'),
      caPage.includes('className="current-affairs-date-meta"'),
      // Accessibility attributes
      caPage.includes('aria-expanded={isExpanded}'),
      caPage.includes('aria-controls={analysisPanelId}'),
      caPage.includes('role="region"'),
      // Grid anti-stretch and card auto-height
      css.includes('.current-affairs-page-container .two-card-listing-grid'),
      css.includes('align-items: start;'),
      css.includes('.current-affairs-card-item .card-flex-spacer'),
      css.includes('flex-grow: 0;')
    ]
  },
  {
    name: '2. Current Affairs Dark Mode Surfaces & Controls',
    checks: [
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-category-badge'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-date-meta'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-expanded-box'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-expanded-header'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-expanded-text'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-tag-pill'),
      css.includes('.layout-desktop[data-theme="dark"] .current-affairs-expand-btn')
    ]
  },
  {
    name: '3. Suchana Patt Blue Branding in Desktop Dark Mode',
    checks: [
      css.includes('.layout-desktop[data-theme="dark"] .brand-title'),
      css.includes('.layout-desktop[data-theme="dark"] .brand-icon-wrapper'),
      css.includes('.layout-desktop[data-theme="dark"] .brand-tagline'),
      // Check blue brand title color
      css.includes('.layout-desktop[data-theme="dark"] .brand-title {\n  color: #60a5fa;\n}'),
      // Check muted tagline color
      css.includes('.layout-desktop[data-theme="dark"] .brand-tagline {\n  color: #94a3b8;\n}')
    ]
  },
  {
    name: '4. Job Details Page & Vacancy Table Dark Mode Contrast',
    checks: [
      // No hardcoded dark inline colors on postName or eligibility
      !jdPage.includes("color: '#13213a'"),
      !jdPage.includes("color: '#475569'"),
      jdPage.includes('className="vacancy-post-name"'),
      jdPage.includes('className="vacancy-post-category"'),
      jdPage.includes('className="vacancy-post-vacancies"'),
      jdPage.includes('className="vacancy-post-eligibility"'),
      jdPage.includes('className="job-header-deadline-val"'),
      jdPage.includes('className="job-header-vacancies-val"'),
      // CSS definitions for vacancy cells
      css.includes('.layout-desktop[data-theme="dark"] .vacancy-post-name'),
      css.includes('.layout-desktop[data-theme="dark"] .vacancy-post-vacancies'),
      css.includes('.layout-desktop[data-theme="dark"] .vacancy-post-eligibility'),
      // Table header and row styles
      css.includes('.layout-desktop[data-theme="dark"] .sp-details-table th'),
      css.includes('.layout-desktop[data-theme="dark"] .sp-details-table tr:nth-child(even) td'),
      css.includes('.layout-desktop[data-theme="dark"] .sp-details-table tr:hover td'),
      // Header and sidebar highlights
      css.includes('.layout-desktop[data-theme="dark"] .job-header-deadline-val'),
      css.includes('.layout-desktop[data-theme="dark"] .job-header-vacancies-val'),
      css.includes('.layout-desktop[data-theme="dark"] .glance-value-vacancies'),
      css.includes('.layout-desktop[data-theme="dark"] .updates-tracker-title'),
      css.includes('.layout-desktop[data-theme="dark"] .btn-updates-tracker')
    ]
  },
  {
    name: '5. Desktop Pagination Theme Styling in Dark Mode',
    checks: [
      pagComponent.includes('className="page-btn'),
      pagComponent.includes('className="pagination-ellipsis"'),
      css.includes('.layout-desktop[data-theme="dark"] .page-btn'),
      css.includes('.layout-desktop[data-theme="dark"] .page-btn.active'),
      css.includes('.layout-desktop[data-theme="dark"] .page-btn:disabled'),
      css.includes('.layout-desktop[data-theme="dark"] .pagination-ellipsis')
    ]
  },
  {
    name: '6. Semantic Tokens and Dark Palette Integrity',
    checks: [
      tokens.includes('--text-primary'),
      tokens.includes('--text-secondary'),
      tokens.includes('--text-muted'),
      tokens.includes('--surface-primary'),
      tokens.includes('--surface-secondary'),
      tokens.includes('--surface-nested'),
      tokens.includes('--border-color'),
      tokens.includes('--accent-color'),
      tokens.includes('--color-background: #0b1220;'),
      tokens.includes('--color-surface: #17243a;'),
      tokens.includes('--color-surface-tint: #111c2f;'),
      tokens.includes('--color-surface-inset: #101b2d;'),
      tokens.includes('--color-border: #2a3b54;')
    ]
  },
  {
    name: '7. Elimination of White Content Panels Across Portal',
    checks: [
      css.includes('.layout-desktop[data-theme="dark"] .search-header-panel'),
      css.includes('.layout-desktop[data-theme="dark"] .search-job-card'),
      css.includes('.layout-desktop[data-theme="dark"] .search-result-card'),
      css.includes('.layout-desktop[data-theme="dark"] .login-card'),
      css.includes('.layout-desktop[data-theme="dark"] .age-card-item'),
      css.includes('.layout-desktop[data-theme="dark"] .age-relaxation-box'),
      css.includes('.layout-desktop[data-theme="dark"] .eligibility-card-block'),
      css.includes('.layout-desktop[data-theme="dark"] .selection-stage-card'),
      css.includes('.layout-desktop[data-theme="dark"] .confirmation-modal-box'),
      css.includes('.layout-desktop[data-theme="dark"] .sp-empty-state'),
      css.includes('.layout-desktop[data-theme="dark"] .scholarship-meta-box'),
      css.includes('.layout-desktop[data-theme="dark"] .scholarship-amount-text')
    ]
  }
];

let allPassed = true;
tests.forEach((t) => {
  const passed = t.checks.every(Boolean);
  if (passed) {
    console.log(`[PASS] ${t.name} (${t.checks.length}/${t.checks.length} assertions)`);
  } else {
    console.error(`[FAIL] ${t.name}: failed one or more assertions`);
    t.checks.forEach((c, idx) => {
      if (!c) console.error(`   -> Check #${idx + 1} failed`);
    });
    allPassed = false;
  }
});

console.log('\nAudit status: ' + (allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'));
process.exit(allPassed ? 0 : 1);
