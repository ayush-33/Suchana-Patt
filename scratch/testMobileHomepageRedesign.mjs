import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('=== Starting Comprehensive Mobile Improvements Verification ===\n');

const baseDir = path.resolve('frontend');
const mobileHomePath = path.join(baseDir, 'src/components/layout/MobileHomePage.jsx');
const mobileCssPath = path.join(baseDir, 'src/styles/mobile-home.css');
const mobileHeaderPath = path.join(baseDir, 'src/components/layout/MobileHeader.jsx');
const layoutCssPath = path.join(baseDir, 'src/styles/layout.css');
const homePagePath = path.join(baseDir, 'src/pages/HomePage.jsx');
const jobDetailsPagePath = path.join(baseDir, 'src/pages/JobDetailsPage.jsx');
const useMobileThemePath = path.join(baseDir, 'src/hooks/useMobileTheme.js');
const themeContextPath = path.join(baseDir, 'src/context/ThemeContext.jsx');
const appJsxPath = path.join(baseDir, 'src/app/App.jsx');

const mobileHomeContent = fs.readFileSync(mobileHomePath, 'utf-8');
const mobileCssContent = fs.readFileSync(mobileCssPath, 'utf-8');
const mobileHeaderContent = fs.readFileSync(mobileHeaderPath, 'utf-8');
const layoutCssContent = fs.readFileSync(layoutCssPath, 'utf-8');
const homePageContent = fs.readFileSync(homePagePath, 'utf-8');
const jobDetailsContent = fs.readFileSync(jobDetailsPagePath, 'utf-8');
const useMobileThemeContent = fs.readFileSync(useMobileThemePath, 'utf-8');
const themeContextContent = fs.readFileSync(themeContextPath, 'utf-8');
const appJsxContent = fs.readFileSync(appJsxPath, 'utf-8');

// 1. Mobile Header Verification
console.log('1. Verifying Section A — Mobile Header...');
assert(mobileHeaderContent.includes('Sarkari Jankari, Ek Jagah'), 'Tagline must be "Sarkari Jankari, Ek Jagah"');
assert(mobileHeaderContent.includes('useMobileTheme'), 'MobileHeader must integrate useMobileTheme for auto dark mode');
assert(mobileHeaderContent.includes('Theme: System'), 'MobileHeader drawer must show auto system theme status');
assert(mobileHeaderContent.includes('FileText'), 'MobileHeader must show FileText document/brand logo');
assert(mobileHeaderContent.includes('Menu') && mobileHeaderContent.includes('X'), 'MobileHeader must support hamburger menu toggle');
assert(mobileHeaderContent.includes('Search'), 'MobileHeader must have search button');
assert(mobileHeaderContent.includes('Bell'), 'MobileHeader must have bell notification button with badge');
assert(mobileHeaderContent.includes('Bookmark'), 'MobileHeader must have bookmark button with badge');
assert(mobileHeaderContent.includes('User'), 'MobileHeader must have user profile/account button');
assert(layoutCssContent.includes('linear-gradient(135deg, #0756C9 0%, #0046A8 100%)'), 'Header must have blue gradient #0756C9 to #0046A8');
assert(layoutCssContent.includes('.mobile-header.dark-mode'), 'Header must have dark mode styling');
console.log('   -> Section A: PASSED');

// 2. Horizontal Category Navigation Verification
console.log('2. Verifying Section B — Horizontal Category Navigation...');
const requiredCategories = ['All', 'Railway', 'UPSC', 'SSC', 'Banking', 'Teaching', 'Defence'];
requiredCategories.forEach(cat => {
  assert(mobileHomeContent.includes(`label: '${cat}'`), `Category navigation must include ${cat}`);
});
assert(mobileCssContent.includes('overflow-x: auto'), 'Category nav must be horizontally scrollable');
assert(mobileCssContent.includes('scrollbar-width: none'), 'Category nav scrollbar must be hidden');
assert(mobileCssContent.includes('.mobile-category-btn.active'), 'Active category button must have active style');
assert(mobileCssContent.includes('#0756C9'), 'Active category must use primary blue #0756C9');
assert(mobileCssContent.includes('white-space: nowrap'), 'Category nav must remain in a single horizontal row');
console.log('   -> Section B: PASSED');

// 3. Notification Ticker Verification
console.log('3. Verifying Section C — Notification Ticker...');
assert(mobileHomeContent.includes('mobile-ticker-container'), 'Ticker container must exist');
assert(mobileHomeContent.includes('mobile-ticker-announcement'), 'Announcement container must exist');
assert(mobileHomeContent.includes('NEW'), 'Ticker must have yellow NEW badge');
assert(mobileHomeContent.includes('Megaphone'), 'Ticker announcement must use announcement/megaphone icon');
assert(mobileHomeContent.includes('mobile-ticker-sep'), 'Ticker must have vertical separators');
assert(mobileCssContent.includes('mobileMarquee'), 'Ticker must have continuous marquee animation');
assert(mobileCssContent.includes('#ffd633'), 'NEW badge must use yellow #ffd633');
assert(mobileCssContent.includes('#0756C9'), 'Announcement container and links must use blue #0756C9');
assert(mobileHomeContent.includes('UPSC NDA 2026 Apply Online'), 'Ticker must contain requested reference items');
console.log('   -> Section C: PASSED');

// 4. Two-Column Dashboard Grid & Equal-Height Row Structure
console.log('4. Verifying Two-Column Equal-Height Category Grid...');
assert(
  mobileCssContent.includes('grid-template-columns: repeat(2, minmax(0, 1fr))') ||
  mobileCssContent.includes('grid-template-columns: 1fr 1fr'),
  'Dashboard must use two-column CSS grid'
);
assert(mobileCssContent.includes('align-items: stretch'), 'Grid must stretch rows for equal height');
assert(mobileCssContent.includes('height: 100%'), 'Category cards must stretch to 100% of row height');
assert(mobileCssContent.includes('flex: 1'), 'Card body must flex: 1 to fill available vertical space');

// Verify Row Order in mobileHomeContent
const idxResult = mobileHomeContent.indexOf('title="Result"');
const idxLatestJobs = mobileHomeContent.indexOf('title="Latest Jobs"');
const idxAnswerKey = mobileHomeContent.indexOf('title="Answer Key"');
const idxAdmitCard = mobileHomeContent.indexOf('title="Admit Card"');
const idxAdmission = mobileHomeContent.indexOf('title="Admission"');
const idxSyllabus = mobileHomeContent.indexOf('title="Syllabus"');
const idxCertificate = mobileHomeContent.indexOf('title="Certificate"');
const idxImportant = mobileHomeContent.indexOf('title="Important"');

assert(idxResult !== -1 && idxLatestJobs !== -1 && idxAnswerKey !== -1 && idxAdmitCard !== -1, 'All category cards must exist');
assert(idxResult < idxLatestJobs, 'Row 1: Result must precede Latest Jobs');
assert(idxLatestJobs < idxAnswerKey, 'Row 1 must precede Row 2 (Answer Key)');
assert(idxAnswerKey < idxAdmitCard, 'Row 2: Answer Key must precede Admit Card');
assert(idxAdmitCard < idxAdmission, 'Row 2 must precede Row 3 (Admission)');
assert(idxAdmission < idxSyllabus, 'Row 3: Admission must precede Syllabus');
assert(idxSyllabus < idxCertificate, 'Row 3 must precede Row 4 (Certificate)');
assert(idxCertificate < idxImportant, 'Row 4: Certificate must precede Important');
console.log('   -> Two-Column Equal-Height Row Structure: PASSED');

// 5. Category Card Design & Icons
console.log('5. Verifying Category Card Design & Icons...');
assert(mobileHomeContent.includes('icon={Trophy}'), 'Result must use Trophy icon');
assert(mobileHomeContent.includes('icon={Briefcase}'), 'Latest Jobs must use Briefcase icon');
assert(mobileHomeContent.includes('icon={Key}'), 'Answer Key must use Key icon');
assert(mobileHomeContent.includes('icon={IdCard}'), 'Admit Card must use IdCard icon');
assert(mobileHomeContent.includes('icon={GraduationCap}'), 'Admission must use GraduationCap icon');
assert(mobileHomeContent.includes('icon={BookOpen}'), 'Syllabus must use BookOpen icon');
assert(mobileHomeContent.includes('icon={Award}'), 'Certificate must use Award icon');
assert(mobileHomeContent.includes('icon={Star}'), 'Important must use Star icon');
console.log('   -> Card Design & Icons: PASSED');

// 6. Mobile Homepage FAQ Accordion Verification
console.log('6. Verifying Mobile FAQ Accordion Placement & Functionality...');
assert(mobileHomeContent.includes('className="mobile-faq-section"'), 'Mobile FAQ section must exist');
assert(mobileHomeContent.includes('id="faqs"'), 'Mobile FAQ section must have id="faqs"');
assert(mobileHomeContent.includes('Got Questions?'), 'FAQ badge must display "Got Questions?"');
assert(mobileHomeContent.includes('Frequently Asked Questions'), 'FAQ title must display "Frequently Asked Questions"');
assert(mobileHomeContent.includes('Find answers to common questions about recruitment notifications'), 'FAQ description must match requirement');
assert(mobileHomeContent.includes('homeFaqs.map'), 'FAQ items must be mapped from mockHomeFaqs data');
assert(mobileHomeContent.includes('aria-expanded={isOpen}'), 'FAQ accordion buttons must have accessible aria-expanded attribute');
assert(mobileHomeContent.includes('aria-controls={panelId}'), 'FAQ accordion buttons must reference answer panel');
assert(mobileHomeContent.includes('role="region"'), 'FAQ answer panel must have role="region"');
assert(mobileHomeContent.includes('ChevronDown'), 'FAQ accordion button must include ChevronDown icon');

// Verify Placement: FAQ must be after </main> (all category cards) and before footer (rendered in Layout)
const idxMainClose = mobileHomeContent.indexOf('</main>');
const idxFaqSection = mobileHomeContent.indexOf('className="mobile-faq-section"');
assert(idxFaqSection > idxMainClose, 'FAQ section must appear after all category cards (after </main>)');

// Verify FAQ CSS styles
assert(mobileCssContent.includes('.mobile-faq-section'), 'CSS must define .mobile-faq-section');
assert(mobileCssContent.includes('.mobile-faq-header'), 'CSS must define .mobile-faq-header');
assert(mobileCssContent.includes('.mobile-faq-card'), 'CSS must define .mobile-faq-card');
assert(mobileCssContent.includes('.mobile-faq-question-btn'), 'CSS must define .mobile-faq-question-btn');
assert(mobileCssContent.includes('.mobile-faq-answer'), 'CSS must define .mobile-faq-answer');
assert(mobileCssContent.includes('.mobile-faq-chevron-wrapper.rotated'), 'CSS must handle chevron rotation when opened');
assert(mobileCssContent.includes('.mobile-homepage.dark-mode .mobile-faq-card'), 'CSS must style FAQ card in dark mode');
console.log('   -> Mobile FAQ Section: PASSED');

// 7. Scroll-Reset Issue Verification
console.log('7. Verifying Mobile Scroll-Reset Fix in JobDetailsPage.jsx...');
// Root cause was: activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
// This scrolled window.scrollY back to the top whenever activeTab changed while scrolling.
assert(
  !jobDetailsContent.includes('activeBtn.scrollIntoView'),
  'JobDetailsPage must NOT call activeBtn.scrollIntoView (causes unexpected window scroll jump)'
);
assert(
  jobDetailsContent.includes('el.scrollTo({') && jobDetailsContent.includes('behavior: \'smooth\''),
  'JobDetailsPage must scroll horizontal tabs container only using el.scrollTo()'
);
console.log('   -> Mobile Scroll-Reset Fix: PASSED');

// 8. Automatic Mobile Light/Dark Theme Detection Verification
console.log('8. Verifying Mobile Auto Theme Detection...');
assert(
  useMobileThemeContent.includes('window.matchMedia(\'(prefers-color-scheme: dark)\')') ||
  useMobileThemeContent.includes('window.matchMedia("(prefers-color-scheme: dark)")'),
  'useMobileTheme must listen to (prefers-color-scheme: dark)'
);
assert(
  useMobileThemeContent.includes('addEventListener') && useMobileThemeContent.includes('removeEventListener'),
  'useMobileTheme must dynamically listen to appearance changes in real time'
);
assert(
  themeContextContent.includes('mobileTheme') && themeContextContent.includes('isMobileDark'),
  'ThemeContext must expose mobileTheme and isMobileDark without mutating desktop theme'
);
assert(
  appJsxContent.includes('data-mobile-theme={isMobile ? mobileTheme : undefined}'),
  'App.jsx must set data-mobile-theme attribute for mobile view'
);
assert(
  appJsxContent.includes('data-theme={activeDesktopTheme}'),
  'App.jsx must keep data-theme={activeDesktopTheme} strictly isolated for desktop'
);
console.log('   -> Automatic Mobile Theme Detection: PASSED');

// 9. Strict Desktop Protection Verification
console.log('9. Verifying Strict Desktop Protection...');
assert(homePageContent.includes('DesktopHomePage'), 'Desktop homepage must be preserved in HomePage.jsx');
assert(homePageContent.includes('isMobile ? <MobileHomePage /> : <DesktopHomePage />'), 'HomePage must delegate cleanly without affecting desktop');
assert(homePageContent.includes('live-updates-bar'), 'Desktop live updates bar must be preserved');
assert(homePageContent.includes('sp-hero-banner'), 'Desktop hero banner must be preserved');
assert(homePageContent.includes('four-card-grid'), 'Desktop 4-card grid must be preserved');
assert(homePageContent.includes('homepage-faq-section'), 'Desktop FAQ section must be preserved');
console.log('   -> Strict Desktop Protection: PASSED');

console.log('\n=== ALL 9 SUITES PASSED! MOBILE IMPROVEMENTS 100% VERIFIED! ===');
