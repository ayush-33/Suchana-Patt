import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert, ChevronDown } from 'lucide-react';
import { useViewport } from '../../hooks/useViewport';

const CURRENT_YEAR = 2026;

// Explicit, predefined footer link groups matching existing project definitions
const FOOTER_SECTIONS = [
  {
    id: 'portal-links',
    title: 'Portal Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Latest Jobs', to: '/latest-jobs' },
      { label: 'Admit Cards', to: '/admit-cards' },
      { label: 'Results', to: '/results' },
      { label: 'Admissions', to: '/admissions' },
      { label: 'UP Scholarship', to: '/up-scholarship' }
    ]
  },
  {
    id: 'categories',
    title: 'Categories',
    links: [
      { label: 'Railway Jobs', to: '/latest-jobs?category=Railway' },
      { label: 'Banking Jobs', to: '/latest-jobs?category=Banking' },
      { label: 'SSC Examinations', to: '/latest-jobs?category=SSC' },
      { label: 'Defence & Police', to: '/latest-jobs?category=Defence' },
      { label: 'Teaching Recruitment', to: '/latest-jobs?category=Teaching' },
      { label: 'Private IT Drives', to: '/latest-jobs?category=IT%20%2F%20Private%20Sector' }
    ]
  },
  {
    id: 'exam-tools',
    title: 'Exam Tools',
    links: [
      { label: 'Official Syllabus', to: '/syllabus' },
      { label: 'Answer Keys & Objections', to: '/answer-keys' },
      { label: 'Current Affairs Digest', to: '/current-affairs' },
      { label: 'Saved Notifications', to: '/saved-jobs' },
      { label: 'Candidate Login', to: '/login' }
    ]
  },
  {
    id: 'policy-advisory',
    title: 'Policy & Advisory',
    links: [
      { label: 'Recruitment Disclaimer', href: '#disclaimer' },
      { label: 'Frequently Asked Questions', to: '/#faqs' },
      { label: 'Saved Notifications', to: '/saved-jobs' }
    ],
    note: 'Verify all dates and circulars directly from official government commission portals before applying.'
  }
];

export function Footer() {
  const { isMobile } = useViewport(768);

  // On mobile, keep the first group open by default for immediate discoverability
  const [openSections, setOpenSections] = useState({
    'portal-links': true,
    'categories': false,
    'exam-tools': false,
    'policy-advisory': false
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <footer className="site-footer">
      <div className="page-container">
        {isMobile ? (
          /* ================================================================
             MOBILE FOOTER: Vertical arrangement with accessible accordion
             ================================================================ */
          <div className="mobile-footer-wrapper">
            {/* Brand Intro */}
            <div className="mobile-footer-brand">
              <div className="footer-brand-heading">
                <div className="footer-brand-icon-box" aria-hidden="true">
                  <FileText size={18} />
                </div>
                <span>Suchana Patt</span>
              </div>
              <p className="footer-tagline">
                Sarkari Jankari, Ek Jagah
              </p>
              <p className="footer-brand-desc mobile-brand-desc">
                India's dedicated job notification and recruitment information portal providing structured, verified eligibility criteria, important dates, and official notification alerts.
              </p>
            </div>

            {/* Collapsible Accordion Sections for Link Groups */}
            <div
              className="mobile-footer-accordion"
              role="region"
              aria-label="Footer navigation sections"
            >
              {FOOTER_SECTIONS.map((sec) => {
                const isOpen = Boolean(openSections[sec.id]);
                const headerId = `mobile-footer-header-${sec.id}`;
                const panelId = `mobile-footer-panel-${sec.id}`;

                return (
                  <div key={sec.id} className="mobile-footer-section">
                    <h4>
                      <button
                        type="button"
                        id={headerId}
                        className="mobile-footer-header-btn"
                        onClick={() => toggleSection(sec.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span className="mobile-footer-section-title">{sec.title}</span>
                        <span
                          className={`mobile-footer-chevron ${isOpen ? 'open' : ''}`}
                          aria-hidden="true"
                        >
                          <ChevronDown size={17} />
                        </span>
                      </button>
                    </h4>

                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headerId}
                        className="mobile-footer-links-panel"
                      >
                        {sec.links.map((link) => (
                          link.to ? (
                            <Link
                              key={link.label}
                              to={link.to}
                              className="mobile-footer-link"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              key={link.label}
                              href={link.href}
                              className="mobile-footer-link"
                            >
                              {link.label}
                            </a>
                          )
                        ))}
                        {sec.note && (
                          <div className="mobile-footer-note">
                            {sec.note}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================================================================
             DESKTOP FOOTER: Unchanged 5-column grid layout (>= 768px)
             ================================================================ */
          <div className="footer-grid">
            {/* Col 1: Brand & Tagline */}
            <div className="footer-brand-col">
              <div className="footer-brand-heading">
                <div className="footer-brand-icon-box" aria-hidden="true">
                  <FileText size={18} />
                </div>
                <span>Suchana Patt</span>
              </div>
              <p className="footer-tagline">
                Sarkari Jankari, Ek Jagah
              </p>
              <p className="footer-brand-desc">
                India's dedicated job notification and recruitment information portal providing structured, verified eligibility criteria, important dates, and official notification alerts.
              </p>
            </div>

            {/* Col 2: Portal Links */}
            <div>
              <h4 className="footer-col-title">Portal Links</h4>
              <div className="footer-links-list">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/latest-jobs" className="footer-link">Latest Jobs</Link>
                <Link to="/admit-cards" className="footer-link">Admit Cards</Link>
                <Link to="/results" className="footer-link">Results</Link>
                <Link to="/admissions" className="footer-link">Admissions</Link>
                <Link to="/up-scholarship" className="footer-link">UP Scholarship</Link>
              </div>
            </div>

            {/* Col 3: Categories */}
            <div>
              <h4 className="footer-col-title">Categories</h4>
              <div className="footer-links-list">
                <Link to="/latest-jobs?category=Railway" className="footer-link">Railway Jobs</Link>
                <Link to="/latest-jobs?category=Banking" className="footer-link">Banking Jobs</Link>
                <Link to="/latest-jobs?category=SSC" className="footer-link">SSC Examinations</Link>
                <Link to="/latest-jobs?category=Defence" className="footer-link">Defence & Police</Link>
                <Link to="/latest-jobs?category=Teaching" className="footer-link">Teaching Recruitment</Link>
                <Link to="/latest-jobs?category=IT%20%2F%20Private%20Sector" className="footer-link">Private IT Drives</Link>
              </div>
            </div>

            {/* Col 4: Exam Tools */}
            <div>
              <h4 className="footer-col-title">Exam Tools</h4>
              <div className="footer-links-list">
                <Link to="/syllabus" className="footer-link">Official Syllabus</Link>
                <Link to="/answer-keys" className="footer-link">Answer Keys & Objections</Link>
                <Link to="/current-affairs" className="footer-link">Current Affairs Digest</Link>
                <Link to="/saved-jobs" className="footer-link">Saved Notifications</Link>
                <Link to="/login" className="footer-link">Candidate Login</Link>
              </div>
            </div>

            {/* Col 5: Policy & Advisory */}
            <div>
              <h4 className="footer-col-title">Policy & Advisory</h4>
              <div className="footer-links-list">
                <a href="#disclaimer" className="footer-link">Recruitment Disclaimer</a>
                <Link to="/#faqs" className="footer-link">Frequently Asked Questions</Link>
                <Link to="/saved-jobs" className="footer-link">Saved Notifications</Link>
                <span className="footer-col-note">
                  Verify all dates and circulars directly from official government commission portals before applying.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer Box */}
        <div id="disclaimer" className="footer-disclaimer-box">
          <div className="footer-disclaimer-title">
            <ShieldAlert size={16} />
            <span>Important Recruitment Disclaimer</span>
          </div>
          Suchana Patt is an informational portal designed to aggregate publicly available recruitment circulars, examination notices, admit cards, and results. We are not affiliated with the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), or any State Government entity. Candidates must verify all official notifications directly from the designated recruitment commission portals before applying.
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-copy">
            &copy; {CURRENT_YEAR} Suchana Patt. All rights reserved. Sarkari Jankari, Ek Jagah.
          </div>
          <div className="footer-bottom-links">
            <a href="#disclaimer" className="footer-bottom-link">Disclaimer</a>
            <a href="#faqs" className="footer-bottom-link">FAQs</a>
            <Link to="/login" className="footer-bottom-link">Candidate Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
