import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building,
  CreditCard,
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  FileText,
  KeyRound,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Download,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { JobCard } from '../components/jobs/JobCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { homeFaqs } from '../data/mockHomeFaqs';
import { getFeaturedJobs } from '../services/jobsService';
import { getAdmitCards } from '../services/admitCardsService';
import { getResults } from '../services/resultsService';
import { getAdmissions } from '../services/admissionsService';
import { getScholarships } from '../services/scholarshipService';
import { getSyllabus } from '../services/syllabusService';
import { getAnswerKeys } from '../services/answerKeysService';
import { mockLiveUpdates } from '../data/mockLiveUpdates';
import { formatDate } from '../utils/formatters';

export function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  const [admissionsList, setAdmissionsList] = useState([]);
  const [scholarshipsList, setScholarshipsList] = useState([]);
  const [syllabusList, setSyllabusList] = useState([]);
  const [answerKeysList, setAnswerKeysList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [jobsRes, admitRes, resultsRes, admRes, schRes, sylRes, akRes] = await Promise.all([
          getFeaturedJobs(6),
          getAdmitCards({ limit: 4 }),
          getResults({ limit: 4 }),
          getAdmissions({ limit: 2 }),
          getScholarships({ limit: 2 }),
          getSyllabus({ limit: 2 }),
          getAnswerKeys({ limit: 2 })
        ]);

        setFeaturedJobs(jobsRes);
        setAdmitCards(admitRes.data);
        setResultsList(resultsRes.data);
        setAdmissionsList(admRes.data);
        setScholarshipsList(schRes.data);
        setSyllabusList(sylRes.data);
        setAnswerKeysList(akRes.data);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const categoryShortcuts = [
    { label: 'Latest Jobs', icon: Briefcase, to: '/latest-jobs', color: '#0755d9' },
    { label: 'Government Jobs', icon: Building, to: '/latest-jobs?jobType=government', color: '#15803d' },
    { label: 'Private Jobs', icon: TrendingUp, to: '/latest-jobs?jobType=private', color: '#7e22ce' },
    { label: 'Admit Cards', icon: CreditCard, to: '/admit-cards', color: '#0284c7' },
    { label: 'Results', icon: Award, to: '/results', color: '#b45309' },
    { label: 'Syllabus', icon: BookOpen, to: '/syllabus', color: '#4338ca' },
    { label: 'Saved Jobs', icon: Bookmark, to: '/saved-jobs', color: '#dc2626' }
  ];

  return (
    <div className="page-container main-content homepage-container">
      {/* 1. Live Recruitment Updates Strip */}
      <section className="live-updates-bar" aria-label="Live updates">
        <div className="live-updates-header">
          <div className="live-updates-title">
            <span className="live-indicator-dot"></span>
            <span>Live Recruitment Updates</span>
          </div>
          <Link to="/latest-jobs" className="section-view-all-link" style={{ fontSize: 12.5 }}>
            <span>All Updates</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="live-updates-grid">
          {mockLiveUpdates.map((update) => (
            <Link
              key={update.id}
              to={update.link}
              className={`live-update-tile ${update.tone || 'default'}`}
            >
              <div className="live-update-title-text" title={update.title}>
                {update.title}
              </div>
              <div className="live-update-footer">
                <span className="live-update-type">{update.type}</span>
                <span className="live-update-action">{update.actionText} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Compact Promotional Hero Banner */}
      <section className="sp-hero-banner" aria-label="Promotional banner">
        <div className="hero-banner-content">
          <div className="hero-banner-badge">
            <Sparkles size={13} />
            <span>Direct Notifications & Verification</span>
          </div>
          <h1 className="hero-banner-heading">Latest Government & Private Jobs</h1>
          <p className="hero-banner-text">
            Get the newest job notifications, eligibility details, and important dates in one place.
            Scannable tables, age criteria, and official links for Indian aspirants.
          </p>
          <Link to="/latest-jobs" className="hero-banner-cta">
            <span>Explore Jobs</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="hero-banner-graphic">
          <div className="hero-stat-card">
            <div className="hero-stat-heading hero-stat-number">Central &amp; State</div>
            <div className="hero-stat-label">UPSC, SSC, RRB, State PCS</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-heading hero-stat-number">Official Links</div>
            <div className="hero-stat-label">Direct Notification PDFs</div>
          </div>
        </div>
      </section>

      {/* 3. Category Shortcuts */}
      <section className="homepage-section" aria-label="Quick category shortcuts">
        <div className="category-shortcuts-row">
          {categoryShortcuts.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.label} to={cat.to} className="category-shortcut-tile">
                <div className="category-shortcut-icon">
                  <Icon size={20} />
                </div>
                <span className="category-shortcut-label">{cat.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Latest Job Notifications */}
      <section className="homepage-section">
        <SectionHeading
          title="Latest Job Notifications"
          icon={Briefcase}
          count={featuredJobs.length ? `${featuredJobs.length} New` : null}
          viewAllLink="/latest-jobs"
          viewAllText="View All Jobs"
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            Loading notifications...
          </div>
        ) : (
          <div className="four-card-grid">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Latest Admit Cards */}
      <section className="homepage-section">
        <SectionHeading
          title="Latest Admit Cards"
          icon={CreditCard}
          viewAllLink="/admit-cards"
          viewAllText="View All Admit Cards"
        />

        <div className="four-card-grid">
          {admitCards.map((ac) => (
            <div key={ac.id} className="mini-listing-card">
              <div className="mini-card-top">
                <div className="mini-card-header">
                  <Badge
                    type={ac.status === 'Released' ? 'released' : ac.status === 'Coming Soon' ? 'upcoming' : 'closed'}
                    text={ac.status}
                  />
                  <span className="mini-card-meta-tag">
                    {ac.category}
                  </span>
                </div>
                <h3 className="mini-card-title">
                  <Link to={ac.relatedJobId ? `/jobs/${ac.relatedJobId}` : `/admit-cards`}>
                    {ac.examName}
                  </Link>
                </h3>
                <div className="mini-card-org">{ac.organization}</div>
              </div>

              <div className="mini-card-details-row">
                <span>Exam: <strong>{ac.examDateText}</strong></span>
                {ac.downloadUrl ? (
                  <a
                    href={ac.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mini-card-action-btn"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </a>
                ) : (
                  <span style={{ fontSize: 11.5, color: '#94a3b8', fontStyle: 'italic' }}>
                    {ac.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Latest Results */}
      <section className="homepage-section">
        <SectionHeading
          title="Latest Examination Results"
          icon={Award}
          viewAllLink="/results"
          viewAllText="View All Results"
        />

        <div className="four-card-grid">
          {resultsList.map((res) => (
            <div key={res.id} className="mini-listing-card">
              <div className="mini-card-top">
                <div className="mini-card-header">
                  <Badge
                    type={res.status === 'Declared' ? 'open' : 'upcoming'}
                    text={res.status}
                  />
                  <span className="mini-card-meta-tag">
                    {res.category}
                  </span>
                </div>
                <h3 className="mini-card-title">
                  <Link to={res.relatedJobId ? `/jobs/${res.relatedJobId}` : `/results`}>
                    {res.examName}
                  </Link>
                </h3>
                <div className="mini-card-org">{res.organization}</div>
              </div>

              <div className="mini-card-details-row">
                <span>Declared: <strong>{res.declarationDateText}</strong></span>
                {res.resultUrl ? (
                  <a
                    href={res.resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mini-card-action-btn"
                  >
                    <ExternalLink size={13} />
                    <span>Scorecard</span>
                  </a>
                ) : (
                  <span style={{ fontSize: 11.5, color: '#94a3b8', fontStyle: 'italic' }}>
                    {res.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Admissions & Scholarships (Split Section) */}
      <section className="homepage-section">
        <div className="split-section-grid">
          {/* Admissions column */}
          <div>
            <SectionHeading
              title="Admissions 2026–27"
              icon={GraduationCap}
              viewAllLink="/admissions"
              viewAllText="All Admissions"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {admissionsList.map((adm) => (
                <div key={adm.id} className="mini-listing-card">
                  <div className="mini-card-top">
                    <div className="mini-card-header">
                      <Badge type={adm.status === 'Open' ? 'open' : 'upcoming'} text={adm.status} />
                      <span className="mini-card-meta-tag mini-card-meta-tag-blue">
                        {adm.programCategory}
                      </span>
                    </div>
                    <h3 className="mini-card-title">
                      <Link to="/admissions">{adm.title}</Link>
                    </h3>
                    <div className="mini-card-org">{adm.institution}</div>
                  </div>

                  <div className="mini-card-details-row">
                    <span>Exam: <strong>{adm.examDateText}</strong></span>
                    <Link to="/admissions" className="mini-card-action-btn">
                      <span>Apply / Notice</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships column */}
          <div>
            <SectionHeading
              title="Scholarships & Grants"
              icon={CheckCircle2}
              viewAllLink="/up-scholarship"
              viewAllText="All Scholarships"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {scholarshipsList.map((sch) => (
                <div key={sch.id} className="mini-listing-card">
                  <div className="mini-card-top">
                    <div className="mini-card-header">
                      <Badge type={sch.status === 'Open' ? 'open' : 'closed'} text={sch.status} />
                      <span className="mini-card-meta-tag mini-card-meta-tag-green">
                        {sch.amountText}
                      </span>
                    </div>
                    <h3 className="mini-card-title">
                      <Link to="/up-scholarship">{sch.title}</Link>
                    </h3>
                    <div className="mini-card-org">{sch.department}</div>
                  </div>

                  <div className="mini-card-details-row">
                    <span>Deadline: <strong>{formatDate(sch.lastDate)}</strong></span>
                    <Link to="/up-scholarship" className="mini-card-action-btn">
                      <span>Guidelines</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Official Syllabus & Answer Keys (Split Section) */}
      <section className="homepage-section">
        <div className="split-section-grid">
          {/* Syllabus column */}
          <div>
            <SectionHeading
              title="Official Syllabus"
              icon={FileText}
              viewAllLink="/syllabus"
              viewAllText="All Syllabus"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {syllabusList.map((syl) => (
                <div key={syl.id} className="mini-listing-card">
                  <div className="mini-card-top">
                    <div className="mini-card-header">
                      <span className="mini-card-category-badge">
                        {syl.category}
                      </span>
                      <span className="mini-card-meta-tag">
                        {syl.fileSize}
                      </span>
                    </div>
                    <h3 className="mini-card-title">
                      <Link to="/syllabus">{syl.examName}</Link>
                    </h3>
                    <div className="mini-card-org">{syl.organization} • {syl.examLevel}</div>
                  </div>

                  <div className="mini-card-details-row">
                    <span>Format: <strong>PDF Document</strong></span>
                    {syl.syllabusUrl && (
                      <a
                        href={syl.syllabusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mini-card-action-btn"
                      >
                        <Download size={13} />
                        <span>Download PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Keys column */}
          <div>
            <SectionHeading
              title="Answer Keys & Objections"
              icon={KeyRound}
              viewAllLink="/answer-keys"
              viewAllText="All Answer Keys"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {answerKeysList.map((ak) => (
                <div key={ak.id} className="mini-listing-card">
                  <div className="mini-card-top">
                    <div className="mini-card-header">
                      <Badge
                        type={ak.status.includes('Open') ? 'upcoming' : 'open'}
                        text={ak.status}
                      />
                      <span className="mini-card-meta-tag">
                        {ak.category}
                      </span>
                    </div>
                    <h3 className="mini-card-title">
                      <Link to="/answer-keys">{ak.examName}</Link>
                    </h3>
                    <div className="mini-card-org">{ak.organization}</div>
                  </div>

                  <div className="mini-card-details-row">
                    <span>Released: <strong>{ak.releaseDateText}</strong></span>
                    {ak.downloadUrl && (
                      <a
                        href={ak.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mini-card-action-btn"
                      >
                        <Download size={13} />
                        <span>Key & Sheet</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQ) Section */}
      <section className="homepage-faq-section" id="faqs" aria-label="Frequently Asked Questions">
        <div className="homepage-faq-header">
          <div className="homepage-faq-badge">
            <HelpCircle size={13} />
            <span>Got Questions?</span>
          </div>
          <h2 className="homepage-faq-title">Frequently Asked Questions</h2>
          <p className="homepage-faq-subtitle">
            Find answers to common questions about recruitment notifications, eligibility, application dates and examination updates on Suchana Patt.
          </p>
        </div>

        <FaqAccordion items={homeFaqs} />
      </section>
    </div>
  );
}
