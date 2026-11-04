import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Starting Desktop UI Enhancements Verification ---');

const baseDir = path.resolve('c:/Users/Ayush/Desktop/Suchana Patt/frontend');

// 1. Verify Theme Context & Desktop Theme Toggle
console.log('1. Checking Theme Context & Toggle...');
assert(fs.existsSync(path.join(baseDir, 'src/context/themeContextInstance.js')), 'themeContextInstance.js must exist');
assert(fs.existsSync(path.join(baseDir, 'src/context/ThemeContext.jsx')), 'ThemeContext.jsx must exist');
assert(fs.existsSync(path.join(baseDir, 'src/hooks/useTheme.js')), 'useTheme.js must exist');

const headerContent = fs.readFileSync(path.join(baseDir, 'src/components/layout/Header.jsx'), 'utf-8');
assert(headerContent.includes('useTheme'), 'Header.jsx must import and use useTheme');
assert(headerContent.includes('header-theme-toggle-btn'), 'Header.jsx must render .header-theme-toggle-btn');
assert(headerContent.includes('Sun') && headerContent.includes('Moon'), 'Header.jsx must use Sun and Moon icons');

const appContent = fs.readFileSync(path.join(baseDir, 'src/app/App.jsx'), 'utf-8');
assert(appContent.includes('ThemeProvider'), 'App.jsx must wrap layout in ThemeProvider');
assert(appContent.includes('activeDesktopTheme'), 'App.jsx must compute activeDesktopTheme strictly for desktop');
assert(appContent.includes('data-theme={activeDesktopTheme}'), 'App.jsx must pass data-theme to app-container');

// 2. Verify Upcoming-Job Reminder Context, Card & Details Page
console.log('2. Checking Reminder Context & UI integration...');
assert(fs.existsSync(path.join(baseDir, 'src/context/reminderContextInstance.js')), 'reminderContextInstance.js must exist');
assert(fs.existsSync(path.join(baseDir, 'src/context/ReminderContext.jsx')), 'ReminderContext.jsx must exist');
assert(fs.existsSync(path.join(baseDir, 'src/hooks/useReminders.js')), 'useReminders.js must exist');

const jobCardContent = fs.readFileSync(path.join(baseDir, 'src/components/jobs/JobCard.jsx'), 'utf-8');
assert(jobCardContent.includes('useReminders'), 'JobCard.jsx must import useReminders');
assert(jobCardContent.includes('reminder-btn'), 'JobCard.jsx must render reminder-btn');
assert(jobCardContent.includes('data-prevent-card-nav="true"'), 'Reminder button must isolate card navigation');
assert(jobCardContent.includes('rawStatus === \'upcoming\''), 'Reminder button only shown for upcoming jobs');

const jobDetailsContent = fs.readFileSync(path.join(baseDir, 'src/pages/JobDetailsPage.jsx'), 'utf-8');
assert(jobDetailsContent.includes('useReminders'), 'JobDetailsPage.jsx must import useReminders');
assert(jobDetailsContent.includes('btn-sidebar-reminder'), 'JobDetailsPage.jsx must render btn-sidebar-reminder');
assert(jobDetailsContent.includes('BellRing'), 'JobDetailsPage.jsx must use Bell icons for reminder state');

// 3. Verify Arrow-Controlled Horizontal Navigation on Job Details Page
console.log('3. Checking Horizontal Navigation Arrow Controls on Job Details Page...');
assert(jobDetailsContent.includes('details-section-nav-wrapper'), 'JobDetailsPage.jsx must render details-section-nav-wrapper');
assert(jobDetailsContent.includes('details-nav-arrow arrow-left'), 'JobDetailsPage.jsx must render left navigation arrow');
assert(jobDetailsContent.includes('details-nav-arrow arrow-right'), 'JobDetailsPage.jsx must render right navigation arrow');
assert(jobDetailsContent.includes('canScrollLeft'), 'JobDetailsPage.jsx must calculate canScrollLeft state');
assert(jobDetailsContent.includes('canScrollRight'), 'JobDetailsPage.jsx must calculate canScrollRight state');
assert(jobDetailsContent.includes('handleScrollTabs'), 'JobDetailsPage.jsx must handle smooth tab scrolling');

// 4. Verify Tokens and CSS Architecture
console.log('4. Checking CSS Tokens & Dark Mode Palette...');
const tokensContent = fs.readFileSync(path.join(baseDir, 'src/styles/tokens.css'), 'utf-8');
assert(tokensContent.includes('.layout-desktop[data-theme="dark"]'), 'tokens.css must define dark mode tokens for desktop');
assert(tokensContent.includes('--color-background: #0b1120'), 'tokens.css must include dark background token');
assert(tokensContent.includes('--color-surface: #131c31'), 'tokens.css must include dark surface token');

const compCssContent = fs.readFileSync(path.join(baseDir, 'src/styles/components.css'), 'utf-8');
assert(compCssContent.includes('.header-theme-toggle-btn'), 'components.css must style theme toggle button');
assert(compCssContent.includes('.reminder-btn'), 'components.css must style reminder button');
assert(compCssContent.includes('.btn-sidebar-reminder'), 'components.css must style sidebar reminder button');
assert(compCssContent.includes('.details-section-nav-wrapper'), 'components.css must style details nav wrapper');
assert(compCssContent.includes('scrollbar-width: none'), 'components.css must hide horizontal scrollbar in details tabs');
assert(compCssContent.includes('.details-nav-arrow'), 'components.css must style horizontal arrow controls');
assert(compCssContent.includes('@keyframes spFadeInUp'), 'components.css must define subtle entrance animation');
assert(compCssContent.includes('.layout-desktop[data-theme="dark"] .top-header'), 'components.css must override top-header for dark mode');
assert(compCssContent.includes('.layout-desktop[data-theme="dark"] .sp-job-card'), 'components.css must override job cards for dark mode');
assert(compCssContent.includes('.layout-desktop[data-theme="dark"] .details-panel'), 'components.css must override details panels for dark mode');
assert(compCssContent.includes('prefers-reduced-motion: reduce'), 'components.css must support reduced motion accessibility');

// 5. Verify Mobile Isolation
console.log('5. Checking Mobile Isolation...');
assert(!tokensContent.includes('.layout-mobile[data-theme="dark"]'), 'Dark mode must NOT be applied to layout-mobile');
assert(!compCssContent.includes('.layout-mobile[data-theme="dark"]'), 'Dark mode styles must NOT leak to layout-mobile');

console.log('--- All Desktop Enhancement Verification Checks Passed! (100%) ---');

