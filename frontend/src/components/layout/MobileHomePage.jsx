import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Train,
  GraduationCap,
  Briefcase,
  Landmark,
  BookOpen,
  Shield,
  Megaphone,
  Trophy,
  Key,
  IdCard,
  Award,
  Star,
  FileText,
  ChevronRight,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { useMobileTheme } from '../../hooks/useTheme';
import { mockResults } from '../../data/mockResults';
import { mockJobs } from '../../data/mockJobs';
import { mockAnswerKeys } from '../../data/mockAnswerKeys';
import { mockAdmitCards } from '../../data/mockAdmitCards';
import { mockAdmissions } from '../../data/mockAdmissions';
import { mockSyllabus } from '../../data/mockSyllabus';
import { mockScholarships } from '../../data/mockScholarships';
import { mockLiveUpdates } from '../../data/mockLiveUpdates';
import { homeFaqs } from '../../data/mockHomeFaqs';
import '../../styles/mobile-home.css';

// Section B: 7 Standard Category Shortcuts
const CATEGORIES = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'railway', label: 'Railway', icon: Train },
  { id: 'upsc', label: 'UPSC', icon: GraduationCap },
  { id: 'ssc', label: 'SSC', icon: Briefcase },
  { id: 'banking', label: 'Banking', icon: Landmark },
  { id: 'teaching', label: 'Teaching', icon: BookOpen },
  { id: 'defence', label: 'Defence', icon: Shield }
];

// Section C: Ticker Notifications directly referencing actual jobs and notices
const TICKER_ITEMS = [
  { id: 'tick-1', title: 'UPSC NDA 2026 Apply Online', link: '/jobs/upsc-nda-2026' },
  { id: 'tick-2', title: 'SSC CHSL 2026 Notification', link: '/jobs/ssc-chsl-2026' },
  { id: 'tick-3', title: 'RRB ALP 2026 Application Live', link: '/jobs/rrb-alp-2026' },
  { id: 'tick-4', title: 'SSC CGL 2026 Tier-I Window Active', link: '/jobs/ssc-cgl-2026' },
  { id: 'tick-5', title: 'RRB NTPC CEN 05/2026 Form Submission Live', link: '/jobs/rrb-ntpc-2026' },
  { id: 'tick-6', title: 'UP Police 32,600 Constable Vacancies Live', link: '/jobs/up-police-constable-2026' },
  { id: 'tick-7', title: 'CTET December 2026 Online Registration Open', link: '/jobs/ctet-dec-2026' }
];

/**
 * Filter helper matching category across title, category, and org fields
 */
function filterCategory(items, catId) {
  if (catId === 'all') return items;
  const target = catId.toLowerCase();
  return items.filter((item) => {
    const cat = (item.category || item.programCategory || item.studentLevel || item.department || '').toLowerCase();
    const title = (item.title || item.examName || '').toLowerCase();
    const org = (item.organization || item.institution || '').toLowerCase();
    return cat.includes(target) || title.includes(target) || org.includes(target);
  });
}

/**
 * Single Category Dashboard Card Component
 * Uses height: 100% and flex: 1 body to participate in equal-height CSS Grid rows.
 */
function CategoryCard({ title, icon: Icon, items, getItemTitle, getItemLink }) {
  return (
    <div className="mobile-category-card" role="region" aria-label={title}>
      {/* Blue Gradient Header */}
      <div className="mobile-card-header">
        <div className="mobile-card-header-left">
          <div className="mobile-card-header-icon">
            <Icon size={15} strokeWidth={2.2} />
          </div>
          <span className="mobile-card-header-title">{title}</span>
        </div>
        <span className="mobile-card-header-badge" aria-label={`${items.length} items`}>
          ({items.length})
        </span>
      </div>

      {/* Card Body - Stretches with flex: 1, leaving clean empty space at bottom for shorter lists */}
      <div className="mobile-card-body">
        {items.length === 0 ? (
          <div className="mobile-card-empty">No updates available</div>
        ) : (
          items.map((item) => {
            const link = getItemLink(item);
            const rowTitle = getItemTitle(item);
            return (
              <Link
                key={item.id}
                to={link}
                className="mobile-notif-row"
                title={rowTitle}
              >
                <div className="mobile-notif-icon">
                  <FileText size={13} strokeWidth={2.2} />
                </div>
                <span className="mobile-notif-title">{rowTitle}</span>
                <div className="mobile-notif-chevron">
                  <ChevronRight size={13} strokeWidth={2.4} />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

/**
 * Mobile Homepage Component
 * Implements the Sarkari Result two-column equal-height layout:
 * - Header (rendered by layout)
 * - Section B: Horizontal Category Navigation
 * - Section C: Notification Ticker
 * - Section 3: Two-Column Equal-Height Category Grid:
 *     Row 1: Result (Left), Latest Jobs (Right)
 *     Row 2: Answer Key (Left), Admit Card (Right)
 *     Row 3: Admission (Left), Syllabus (Right)
 *     Row 4: Certificate (Left), Important (Right)
 */
export function MobileHomePage() {
  const navigate = useNavigate();
  const { theme, isDark } = useMobileTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(null);

  // Filter datasets dynamically according to active category shortcut
  const filteredResults = useMemo(
    () => filterCategory(mockResults, selectedCategory),
    [selectedCategory]
  );
  const filteredJobs = useMemo(
    () => filterCategory(mockJobs, selectedCategory),
    [selectedCategory]
  );
  const filteredAnswerKeys = useMemo(
    () => filterCategory(mockAnswerKeys, selectedCategory),
    [selectedCategory]
  );
  const filteredAdmitCards = useMemo(
    () => filterCategory(mockAdmitCards, selectedCategory),
    [selectedCategory]
  );
  const filteredAdmissions = useMemo(
    () => filterCategory(mockAdmissions, selectedCategory),
    [selectedCategory]
  );
  const filteredSyllabus = useMemo(
    () => filterCategory(mockSyllabus, selectedCategory),
    [selectedCategory]
  );
  const filteredCertificates = useMemo(
    () => filterCategory(mockScholarships, selectedCategory),
    [selectedCategory]
  );
  const filteredImportant = useMemo(
    () => filterCategory(mockLiveUpdates, selectedCategory),
    [selectedCategory]
  );

  return (
    <div className={`mobile-homepage ${isDark ? 'dark-mode' : ''}`} data-theme={theme}>
      {/* ====================================================================
          Section B: Horizontal Category Navigation Bar
          ==================================================================== */}
      <nav className="mobile-category-nav" aria-label="Portal Categories">
        <div className="mobile-category-track">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`mobile-category-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (cat.id === 'all') {
                    setSelectedCategory('all');
                  } else {
                    navigate(`/category/${cat.id}`);
                  }
                }}
                aria-pressed={isActive}
              >
                <span className="mobile-category-btn-icon">
                  <Icon size={14} strokeWidth={2.2} />
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ====================================================================
          Section C: Notification Ticker
          ==================================================================== */}
      <section className="mobile-ticker-container" aria-label="Latest Notification Ticker">
        <div className="mobile-ticker-announcement">
          <Megaphone size={14} strokeWidth={2.4} />
          <span className="mobile-ticker-badge">NEW</span>
        </div>
        <div className="mobile-ticker-track-wrapper">
          <div className="mobile-ticker-marquee">
            {/* Duplicated list for seamless infinite marquee loop */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="mobile-ticker-item">
                <Link to={item.link} className="mobile-ticker-link">
                  {item.title}
                </Link>
                <span className="mobile-ticker-sep">|</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 3: Main Homepage Content — Two-Column Equal-Height Category Grid
          Horizontal Pair Rows:
            Row 1: [Result]       [Latest Jobs]
            Row 2: [Answer Key]   [Admit Card]
            Row 3: [Admission]    [Syllabus]
            Row 4: [Certificate]  [Important]
          Both cards in each row stretch to equal height via CSS Grid.
          ==================================================================== */}
      <main className="mobile-dashboard-section" aria-label="Category Dashboard">
        <div className="mobile-home-category-grid">
          {/* Row 1 — Left: Result | Right: Latest Jobs */}
          <CategoryCard
            title="Result"
            icon={Trophy}
            items={filteredResults}
            getItemTitle={(item) => item.examName}
            getItemLink={(item) => (item.relatedJobId ? `/jobs/${item.relatedJobId}` : `/results`)}
          />
          <CategoryCard
            title="Latest Jobs"
            icon={Briefcase}
            items={filteredJobs}
            getItemTitle={(item) => item.title}
            getItemLink={(item) => `/jobs/${item.id}`}
          />

          {/* Row 2 — Left: Answer Key | Right: Admit Card */}
          <CategoryCard
            title="Answer Key"
            icon={Key}
            items={filteredAnswerKeys}
            getItemTitle={(item) => item.examName}
            getItemLink={() => `/answer-keys`}
          />
          <CategoryCard
            title="Admit Card"
            icon={IdCard}
            items={filteredAdmitCards}
            getItemTitle={(item) => item.examName}
            getItemLink={(item) => (item.relatedJobId ? `/jobs/${item.relatedJobId}` : `/admit-cards`)}
          />

          {/* Row 3 — Left: Admission | Right: Syllabus */}
          <CategoryCard
            title="Admission"
            icon={GraduationCap}
            items={filteredAdmissions}
            getItemTitle={(item) => item.title}
            getItemLink={() => `/admissions`}
          />
          <CategoryCard
            title="Syllabus"
            icon={BookOpen}
            items={filteredSyllabus}
            getItemTitle={(item) => item.examName}
            getItemLink={() => `/syllabus`}
          />

          {/* Row 4 — Left: Certificate | Right: Important */}
          <CategoryCard
            title="Certificate"
            icon={Award}
            items={filteredCertificates}
            getItemTitle={(item) => item.title}
            getItemLink={() => `/up-scholarship`}
          />
          <CategoryCard
            title="Important"
            icon={Star}
            items={filteredImportant}
            getItemTitle={(item) => item.title}
            getItemLink={(item) => item.link || `/latest-jobs`}
          />
        </div>
      </main>

      {/* ====================================================================
          Section 5: Frequently Asked Questions (FAQ) Section
          ==================================================================== */}
      <section className="mobile-faq-section" id="faqs" aria-label="Frequently Asked Questions">
        <div className="mobile-faq-header">
          <div className="mobile-faq-badge">
            <HelpCircle size={13} strokeWidth={2.4} />
            <span>Got Questions?</span>
          </div>
          <h2 className="mobile-faq-title">Frequently Asked Questions</h2>
          <p className="mobile-faq-subtitle">
            Find answers to common questions about recruitment notifications, eligibility, application dates and examination updates on Suchana Patt.
          </p>
        </div>

        <div className="mobile-faq-list" role="region" aria-label="Frequently Asked Questions List">
          {homeFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const headerId = `mobile-faq-btn-${faq.id}`;
            const panelId = `mobile-faq-ans-${faq.id}`;

            return (
              <div key={faq.id} className={`mobile-faq-card ${isOpen ? 'open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    className="mobile-faq-question-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  >
                    <span className="mobile-faq-question-text">{faq.question}</span>
                    <span className={`mobile-faq-chevron-wrapper ${isOpen ? 'rotated' : ''}`} aria-hidden="true">
                      <ChevronDown size={16} strokeWidth={2.4} />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={headerId} className="mobile-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default MobileHomePage;
