import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Bookmark,
  Share2,
  Building2,
  Clock,
  CreditCard,
  GraduationCap,
  FileText,
  ExternalLink,
  Users,
  CheckCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Bell,
  BellRing
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { JobCard } from '../components/jobs/JobCard';
import { useBookmarks } from '../hooks/useBookmarks';
import { useReminders } from '../hooks/useReminders';
import { useViewport } from '../hooks/useViewport';
import { getJobById, getRelatedJobs } from '../services/jobsService';
import { formatDate, formatVacancies, formatFee } from '../utils/formatters';
import { shareNotification } from '../utils/shareHelper';
import { getRecruitmentStatusInfo } from '../utils/recruitmentStatusHelper';

export function JobDetailsPage() {
  const { jobId } = useParams();
  const { isBookmarked, toggleBookmark, showToast } = useBookmarks();
  const { hasReminder, toggleReminder } = useReminders();
  const { isMobile } = useViewport(768);

  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [currentTimestamp] = useState(() => Date.now());

  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollBounds = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const handleScrollTabs = (direction) => {
    const el = tabsRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -220 : 220;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollBounds, 320);
  };

  useEffect(() => {
    let isCancelled = false;
    async function loadJobDetails() {
      setLoading(true);
      try {
        const foundJob = await getJobById(jobId);
        if (!isCancelled) {
          setJob(foundJob);
          if (foundJob) {
            const related = await getRelatedJobs(foundJob.id, 4);
            if (!isCancelled) setRelatedJobs(related);
          }
        }
      } catch (e) {
        console.error('Failed to load job details', e);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadJobDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isCancelled = true;
    };
  }, [jobId]);

  // Dynamically compute available sections based on actual job data
  const availableSections = useMemo(() => {
    if (!job) return [];
    const list = [
      { id: 'overview', label: 'Overview', icon: Info },
      { id: 'important-dates', label: 'Important Dates', icon: Calendar },
      { id: 'application-fee', label: 'Application Fee', icon: CreditCard },
      { id: 'age-limit', label: 'Age Limit', icon: Clock },
      { id: 'vacancy-details', label: 'Vacancy Details', icon: Users },
      { id: 'eligibility', label: 'Eligibility', icon: GraduationCap },
      { id: 'how-to-apply', label: 'How to Apply', icon: CheckCircle },
      { id: 'official-links', label: 'Important Links', icon: FileText }
    ];

    list.push({ id: 'faqs', label: 'FAQs', icon: HelpCircle });
    list.push({ id: 'similar-jobs', label: 'Similar Jobs', icon: Sparkles });

    return list;
  }, [job]);

  // Deadline countdown calculation
  const deadlineInfo = useMemo(() => {
    if (!job) return { text: 'Refer to circular', isClosed: false };
    const st = (job.status || 'open').toLowerCase();
    if (st === 'closed') {
      return { text: 'Application Window Closed', isClosed: true };
    }
    if (!job.lastDate) {
      return { text: 'Refer to notice for dates', isClosed: false };
    }
    const deadline = new Date(job.lastDate);
    if (isNaN(deadline.getTime())) {
      return { text: 'Date as per advertisement', isClosed: false };
    }
    deadline.setHours(23, 59, 59, 999);
    const diffTime = deadline.getTime() - currentTimestamp;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Registration Deadline Expired', isClosed: true };
    }
    if (diffDays === 0) {
      return { text: 'Last Day to Apply Today!', isUrgent: true };
    }
    if (diffDays === 1) {
      return { text: '1 day remaining to apply', isUrgent: true };
    }
    return { text: `${diffDays} days remaining to apply`, isUrgent: diffDays <= 7 };
  }, [job, currentTimestamp]);

  // Scrollspy to update active tab based on scroll position
  useEffect(() => {
    if (!job) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + (isMobile ? 100 : 180);
      for (let i = availableSections.length - 1; i >= 0; i--) {
        const sec = availableSections[i];
        const el = document.getElementById(sec.id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveTab(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [job, availableSections, isMobile]);

  // Synchronize horizontal scroll arrows and ensure active tab is in view
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    checkScrollBounds();
    const frameId = requestAnimationFrame(checkScrollBounds);
    const timeoutId = setTimeout(checkScrollBounds, 300);

    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds, availableSections]);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const activeBtn = el.querySelector(`.section-tab-btn[data-tab-id="${activeTab}"]`);
    if (activeBtn) {
      const containerRect = el.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
    setTimeout(checkScrollBounds, 300);
  }, [activeTab, checkScrollBounds]);

  const handleTabClick = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = isMobile ? -70 : -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  if (loading) {
    return (
      <div className="page-container main-content" style={{ padding: '60px 0', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>Loading notification details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="page-container main-content" style={{ padding: '40px 0' }}>
        <EmptyState
          title="Recruitment Notification Not Found"
          description="The requested job vacancy circular or examination notice could not be found or may have expired."
          actionText="Browse Latest Jobs"
          actionLink="/latest-jobs"
        />
      </div>
    );
  }

  const bookmarked = isBookmarked(job.id);
  const reminded = hasReminder(job.id);

  const handleShare = () => {
    shareNotification(job.title, window.location.href, showToast);
  };

  // Breadcrumbs: Home -> Latest Jobs -> Category -> Current Job Title
  const breadcrumbs = [
    { label: 'Latest Jobs', to: '/latest-jobs' },
    { label: job.category || 'Recruitment', to: `/latest-jobs?category=${encodeURIComponent(job.category || '')}` },
    { label: job.title }
  ];

  // Centralized recruitment status and action resolution
  const statusInfo = getRecruitmentStatusInfo(job, currentTimestamp);
  const statusBadgeType = statusInfo.badgeType;
  const statusBadgeText = statusInfo.statusText;
  const isPrivate = (job.jobType || '').toLowerCase() === 'private';

  const qualText = Array.isArray(job.qualification) && job.qualification.length > 0
    ? job.qualification.join(', ')
    : job.qualification || 'Relevant degree from recognized University';

  // FAQs derived from job data
  const faqs = [
    {
      q: `What is the educational qualification required for ${job.title}?`,
      a: job.eligibility?.education || `Candidates must possess ${qualText} or equivalent from a recognized board or university.`
    },
    {
      q: 'What is the prescribed age limit and category relaxation?',
      a: `The prescribed age limit is ${job.minAge || 18} to ${job.maxAge || 32} Years as of ${job.ageLimit?.cutoffDate || 'the cutoff date'}. ${job.ageLimit?.relaxation || 'Age relaxations extra as per Central/State government norms.'}`
    },
    {
      q: 'When does the application window close?',
      a: `The last date to register online is ${formatDate(job.lastDate)}. Candidates are strongly advised to complete registration and fee payment well before the cutoff.`
    },
    {
      q: 'Can final year appearing candidates apply for this vacancy?',
      a: job.eligibility?.notes || 'Final year / appearing students are eligible to apply provisionally provided they satisfy all essential qualifications before the document verification stage.'
    },
    {
      q: 'Where can I access the official brochure and application link?',
      a: job.links?.notification
        ? 'The direct notification PDF download link and online registration portal are provided in the Important Official Links section on this page.'
        : 'Official notification links are updated as soon as released by the recruiting organization.'
    }
  ];

  // ---------------------------------------------------------------------------
  // SECTION RENDER FUNCTIONS (Shared across Desktop & Mobile Layouts)
  // ---------------------------------------------------------------------------

  // 1. Overview Card
  const renderOverviewCard = () => (
    <div id="overview" className="details-panel job-overview-card">
      <div className="job-header-meta-row">
        <div className="job-header-badges">
          <Badge
            type={isPrivate ? 'private' : 'gov'}
            text={isPrivate ? 'Private Sector' : 'Government Job'}
          />
          <Badge type={statusBadgeType} text={statusBadgeText} />
          <span className="job-category-tag">{job.category}</span>
        </div>

        <div className="job-header-actions">
          {statusInfo.isReminderRelevant && (
            <button
              type="button"
              className={`btn-header-action ${reminded ? 'active' : ''}`}
              onClick={() => toggleReminder(job)}
              title={reminded ? 'Saved to your reminders (click to remove)' : 'Save to your reminders'}
              aria-label={reminded ? 'Remove reminder' : 'Save reminder'}
            >
              {reminded ? <BellRing size={15} /> : <Bell size={15} />}
              <span>{reminded ? 'Reminder Set' : 'Remind Me'}</span>
            </button>
          )}

          <button
            type="button"
            className={`btn-header-action ${bookmarked ? 'active' : ''}`}
            onClick={() => toggleBookmark(job)}
            title={bookmarked ? 'Saved to bookmarks' : 'Save this notification'}
            aria-label={bookmarked ? 'Remove from Saved' : 'Save Notification'}
          >
            <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            type="button"
            className="btn-header-action"
            onClick={handleShare}
            title="Share notification"
            aria-label="Share this notification"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <h1 className="job-main-title">{job.title}</h1>

      <div className="job-main-org">
        <Building2 size={18} className="job-org-icon" />
        <span>{job.organization}</span>
      </div>

      <div className="job-header-dates-strip">
        <span>Published: <strong>{formatDate(job.publishedAt)}</strong></span>
        <span>Last Date: <strong className="job-header-deadline-val">{formatDate(job.lastDate)}</strong></span>
        <span>Total Vacancies: <strong className="job-header-vacancies-val">{formatVacancies(job.vacancies)}</strong></span>
      </div>
    </div>
  );

  // 2. Section Navigation Tabs
  const renderSectionNav = () => (
    <nav className="details-section-nav" aria-label="Recruitment detail sections">
      <div className="details-section-nav-wrapper">
        <button
          type="button"
          className={`details-nav-arrow arrow-left ${!canScrollLeft ? 'is-disabled' : ''}`}
          onClick={() => handleScrollTabs('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll section tabs left"
          title="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="details-section-tabs" ref={tabsRef}>
          {availableSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                data-tab-id={sec.id}
                className={`section-tab-btn ${activeTab === sec.id ? 'active' : ''}`}
                onClick={() => handleTabClick(sec.id)}
              >
                <Icon size={14} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`details-nav-arrow arrow-right ${!canScrollRight ? 'is-disabled' : ''}`}
          onClick={() => handleScrollTabs('right')}
          disabled={!canScrollRight}
          aria-label="Scroll section tabs right"
          title="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );

  // 3. Short Information Summary
  const renderShortInfo = () => (
    <div className="details-panel">
      <h2 className="details-section-title">
        <Info size={18} />
        <span>Short Information</span>
      </h2>
      <p className="details-summary-text">
        {job.shortDescription || 'Official recruitment advertisement announced for eligible candidates across India.'}
      </p>
    </div>
  );

  // 4. Important Dates Table
  const renderImportantDates = () => (
    <div id="important-dates" className="details-panel">
      <h2 className="details-section-title">
        <Calendar size={18} />
        <span>Important Dates</span>
      </h2>
      <div className="table-responsive">
        <table className="sp-details-table" aria-label="Important dates table">
          <thead>
            <tr>
              <th className="table-label-col">Event / Schedule Milestone</th>
              <th className="table-val-col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {job.importantDates && job.importantDates.length > 0 ? (
              job.importantDates.map((d, idx) => (
                <tr key={idx}>
                  <td className="table-label-col">{d.label}</td>
                  <td className={`table-val-col ${d.label.toLowerCase().includes('last') ? 'table-val-highlight' : ''}`}>
                    {d.date}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td className="table-label-col">Application Start Date</td>
                  <td className="table-val-col">{formatDate(job.applicationStartDate)}</td>
                </tr>
                <tr>
                  <td className="table-label-col">Last Date for Registration</td>
                  <td className="table-val-col table-val-highlight">{formatDate(job.lastDate)}</td>
                </tr>
                <tr>
                  <td className="table-label-col">Examination Schedule</td>
                  <td className="table-val-col">{job.examDate || 'To be announced'}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 5. Application Fee Table
  const renderApplicationFee = () => (
    <div id="application-fee" className="details-panel">
      <h2 className="details-section-title">
        <CreditCard size={18} />
        <span>Application Fee</span>
      </h2>
      <div className="table-responsive">
        <table className="sp-details-table" aria-label="Application fee table">
          <thead>
            <tr>
              <th className="table-label-col">Candidate Category</th>
              <th className="table-val-col">Prescribed Fee</th>
            </tr>
          </thead>
          <tbody>
            {job.applicationFees && job.applicationFees.length > 0 ? (
              job.applicationFees.map((feeItem, idx) => (
                <tr key={idx}>
                  <td className="table-label-col">{feeItem.category}</td>
                  <td className="table-val-col">
                    <strong>{formatFee(feeItem.fee)}</strong>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="table-label-col">Application Processing Fee</td>
                <td className="table-val-col">Refer to official advertisement document</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12.5, color: '#64748b', marginTop: 10 }}>
        * Application fee can be paid online via Net Banking, Debit Card, Credit Card, or UPI. Refer to notice for offline challan options.
      </p>
    </div>
  );

  // 6. Age Limit and Relaxation
  const renderAgeLimit = () => (
    <div id="age-limit" className="details-panel">
      <h2 className="details-section-title">
        <Clock size={18} />
        <span>Age Limit & Relaxation</span>
      </h2>
      <div className="age-limit-cards-grid">
        <div className="age-card-item">
          <div className="age-card-label">Minimum Age</div>
          <div className="age-card-val">
            {job.minAge ? `${job.minAge} Years` : '18 Years'}
          </div>
        </div>

        <div className="age-card-item">
          <div className="age-card-label">Maximum Age</div>
          <div className="age-card-val">
            {job.maxAge ? `${job.maxAge} Years` : 'As per rules'}
          </div>
        </div>

        <div className="age-card-item">
          <div className="age-card-label">Age Cutoff Date</div>
          <div className="age-card-val text">
            {job.ageLimit?.cutoffDate || 'Refer Notification'}
          </div>
        </div>
      </div>

      <div className="age-relaxation-box">
        <strong>Age Relaxation:</strong> {job.ageLimit?.relaxation || 'Age relaxation extra as per Government of India / State recruitment rules.'}
      </div>
    </div>
  );

  // 7. Vacancy Details Table
  const renderVacancyDetails = () => (
    <div id="vacancy-details" className="details-panel">
      <h2 className="details-section-title">
        <Users size={18} />
        <span>Vacancy Details ({formatVacancies(job.vacancies)})</span>
      </h2>
      <div className="table-responsive">
        <table className="sp-details-table" aria-label="Vacancy details table">
          <thead>
            <tr>
              <th>Post Name</th>
              <th>Category / Wing</th>
              <th>Vacancies</th>
              <th>Post Eligibility</th>
            </tr>
          </thead>
          <tbody>
            {job.vacancyDetails && job.vacancyDetails.length > 0 ? (
              job.vacancyDetails.map((post, idx) => (
                <tr key={idx}>
                  <td className="vacancy-post-name">{post.postName}</td>
                  <td className="vacancy-post-category">{post.category || 'General'}</td>
                  <td className="vacancy-post-vacancies">
                    {typeof post.vacancies === 'number' ? post.vacancies.toLocaleString('en-IN') : post.vacancies}
                  </td>
                  <td className="vacancy-post-eligibility">{post.eligibility}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="vacancy-post-name">{job.title}</td>
                <td className="vacancy-post-category">Regular</td>
                <td className="vacancy-post-vacancies">{formatVacancies(job.vacancies)}</td>
                <td className="vacancy-post-eligibility">{job.eligibility?.education || qualText}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 8. Eligibility and Qualification Criteria
  const renderEligibility = () => (
    <div id="eligibility" className="details-panel">
      <h2 className="details-section-title">
        <GraduationCap size={18} />
        <span>Eligibility & Qualification Criteria</span>
      </h2>
      <div className="eligibility-cards-list">
        <div className="eligibility-card-block">
          <div className="eligibility-block-title">
            Educational Qualification:
          </div>
          <div className="eligibility-block-desc">
            {job.eligibility?.education || qualText}
          </div>
        </div>

        <div className="eligibility-card-block">
          <div className="eligibility-block-title">
            Experience Requirement:
          </div>
          <div className="eligibility-block-desc">
            {job.eligibility?.experience || job.experience || 'Not Required / Freshers eligible to apply.'}
          </div>
        </div>

        {job.eligibility?.skills && (
          <div className="eligibility-card-block">
            <div className="eligibility-block-title">
              Skills & Technical Competency:
            </div>
            <div className="eligibility-block-desc">
              {job.eligibility.skills}
            </div>
          </div>
        )}

        {job.eligibility?.notes && (
          <div className="eligibility-card-block highlight">
            <div className="eligibility-block-title">
              Special Candidate Instructions:
            </div>
            <div className="eligibility-block-desc">
              {job.eligibility.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 9. How to Apply (Numbered Steps)
  const renderHowToApply = () => (
    <div id="how-to-apply" className="details-panel">
      <h2 className="details-section-title">
        <CheckCircle size={18} />
        <span>How to Apply Step-by-Step</span>
      </h2>
      <div className="application-steps-list">
        {job.applicationSteps && job.applicationSteps.length > 0 ? (
          job.applicationSteps.map((step, idx) => (
            <div key={idx} className="application-step-item">
              <span className="step-number-bubble">{idx + 1}</span>
              <span>{step}</span>
            </div>
          ))
        ) : (
          <>
            <div className="application-step-item">
              <span className="step-number-bubble">1</span>
              <span>Read the complete recruitment brochure to verify eligibility parameters.</span>
            </div>
            <div className="application-step-item">
              <span className="step-number-bubble">2</span>
              <span>Visit the official recruitment portal and complete registration.</span>
            </div>
            <div className="application-step-item">
              <span className="step-number-bubble">3</span>
              <span>Upload required documents, photograph, signature and pay the application fee.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // 10. Important Official Links Table
  const renderOfficialLinks = () => (
    <div id="official-links" className="details-panel">
      <h2 className="details-section-title">
        <FileText size={18} />
        <span>Important Official Links</span>
      </h2>
      <div className="table-responsive">
        <table className="links-table" aria-label="Official links table">
          <tbody>
            <tr>
              <td><strong>Apply Online Registration</strong></td>
              <td className="link-action-cell">
                {statusInfo.hasApplyUrl && !statusInfo.isClosed ? (
                  <a
                    href={statusInfo.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn-official"
                  >
                    <span>Click Here</span>
                    <ExternalLink size={12} />
                  </a>
                ) : statusInfo.isClosed ? (
                  <span className="link-unavailable closed">Registration Closed</span>
                ) : statusInfo.isUpcoming ? (
                  <span className="link-unavailable upcoming">
                    {statusInfo.startDateFormatted ? `Opens ${statusInfo.startDateFormatted}` : 'Opening Soon'}
                  </span>
                ) : (
                  <span className="link-unavailable pending">Link Awaited</span>
                )}
              </td>
            </tr>

            <tr>
              <td><strong>Download Official Notification PDF</strong></td>
              <td className="link-action-cell">
                {statusInfo.hasNotificationUrl ? (
                  <a
                    href={statusInfo.notificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn-official"
                  >
                    <span>Download PDF</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="link-unavailable">Brochure Awaited</span>
                )}
              </td>
            </tr>

            <tr>
              <td><strong>Official Website Portal</strong></td>
              <td className="link-action-cell">
                {statusInfo.hasOfficialWebsite ? (
                  <a
                    href={statusInfo.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn-official"
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="link-unavailable">Refer Circular</span>
                )}
              </td>
            </tr>

            {job.links?.syllabus && (
              <tr>
                <td><strong>Official Syllabus & Pattern</strong></td>
                <td className="link-action-cell">
                  <a
                    href={job.links.syllabus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn-official"
                  >
                    <span>View Syllabus</span>
                    <ExternalLink size={12} />
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 11. Frequently Asked Questions (FAQs)
  const renderFaqs = () => (
    <div id="faqs" className="details-panel">
      <h2 className="details-section-title">
        <HelpCircle size={18} />
        <span>Frequently Asked Questions (FAQs)</span>
      </h2>
      <div className="faq-accordion">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question-btn"
              onClick={() => toggleFaq(idx)}
              aria-expanded={openFaqIndex === idx}
            >
              <span>{faq.q}</span>
              {openFaqIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openFaqIndex === idx && (
              <div className="faq-answer">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // 12. Application Deadline Panel (Primary Application Action)
  const renderDeadlinePanel = () => {
    let headerSub = 'Application Deadline';
    let headerDate = formatDate(job.lastDate);
    let countdownBadgeText = deadlineInfo.text;

    if (statusInfo.isClosed) {
      headerSub = 'Application Window';
      headerDate = statusInfo.lastDateFormatted ? `Closed ${statusInfo.lastDateFormatted}` : 'Application Closed';
      countdownBadgeText = 'Registration Closed';
    } else if (statusInfo.isUpcoming) {
      if (statusInfo.startDateFormatted) {
        headerSub = 'Application Opens';
        headerDate = `Opens ${statusInfo.startDateFormatted}`;
        countdownBadgeText = `Opens on ${statusInfo.startDateFormatted}`;
      } else {
        headerSub = 'Application Schedule';
        headerDate = 'Opening Date Not Announced';
        countdownBadgeText = 'Schedule Pending';
      }
    } else if (!statusInfo.hasApplyUrl) {
      headerSub = 'Application Status';
      headerDate = statusInfo.lastDateFormatted ? `Last Date ${statusInfo.lastDateFormatted}` : 'Link Awaited';
      countdownBadgeText = deadlineInfo.text || 'Registration Open';
    }

    return (
      <div className="sidebar-panel sidebar-deadline-panel">
        <div className="sidebar-deadline-header">
          <div className="sidebar-deadline-icon">
            <Calendar size={18} />
          </div>
          <div>
            <span className="sidebar-deadline-sub">{headerSub}</span>
            <div className="sidebar-deadline-date">{headerDate}</div>
          </div>
        </div>

        <div className="sidebar-deadline-meta">
          <Badge type={statusBadgeType} text={statusBadgeText} />
          <span className={`sidebar-countdown-badge ${statusInfo.isClosed ? 'closed' : deadlineInfo.isUrgent ? 'urgent' : ''}`}>
            {countdownBadgeText}
          </span>
        </div>

        {statusInfo.isOpen && statusInfo.hasApplyUrl ? (
          <div className="sidebar-apply-stack">
            <a
              href={statusInfo.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sidebar-apply"
            >
              <span>Apply Online Now</span>
              <ExternalLink size={15} />
            </a>

            {statusInfo.hasNotificationUrl && (
              <a
                href={statusInfo.notificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sidebar-brochure"
              >
                <FileText size={14} />
                <span>Official Notification PDF</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        ) : (
          <div className="sidebar-apply-stack">
            {statusInfo.isClosed ? (
              <>
                <button type="button" disabled className="btn-sidebar-apply disabled" aria-disabled="true">
                  <span>Applications Closed</span>
                </button>
                <div className="sidebar-status-banner closed">
                  <span className="status-banner-title">Application Window Closed</span>
                  <span className="status-banner-desc">
                    {statusInfo.lastDateFormatted
                      ? `Online registration closed on ${statusInfo.lastDateFormatted}. Official notifications and subsequent exam updates remain accessible below.`
                      : 'Application deadline has passed.'}
                  </span>
                </div>
              </>
            ) : statusInfo.isUpcoming ? (
              <div className="sidebar-status-banner upcoming">
                <span className="status-banner-title">
                  {statusInfo.startDateFormatted
                    ? `Application Opens ${statusInfo.startDateFormatted}`
                    : 'Opening Date Not Announced'}
                </span>
                <span className="status-banner-desc">
                  {statusInfo.statusExplanation}
                </span>
              </div>
            ) : (
              <div className="sidebar-status-banner pending">
                <span className="status-banner-title">Official Link Not Released Yet</span>
                <span className="status-banner-desc">
                  Official application link not yet released by the conducting authority. Save this notice or check the brochure.
                </span>
              </div>
            )}

            {statusInfo.isReminderRelevant && (
              <button
                type="button"
                className={`btn-sidebar-reminder ${reminded ? 'active' : ''}`}
                onClick={() => toggleReminder(job)}
                title={reminded ? 'Saved to your reminders. Click to remove.' : 'Save to your reminders'}
                aria-label={reminded ? `Remove reminder for ${job.title}` : `Save reminder for ${job.title}`}
              >
                {reminded ? <BellRing size={16} /> : <Bell size={16} />}
                <span>{reminded ? 'Reminder Set' : statusInfo.isUpcoming ? 'Notify Me When Applications Open' : 'Remind Me When Link Opens'}</span>
              </button>
            )}

            {statusInfo.hasNotificationUrl && (
              <a
                href={statusInfo.notificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sidebar-brochure"
              >
                <FileText size={14} />
                <span>Official Notification PDF</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  // 13. At a Glance Summary Card
  const renderAtAGlance = () => (
    <div className="sidebar-panel">
      <h3 className="sidebar-panel-title">
        <CheckCircle size={16} color="#0755d9" />
        <span>At a Glance</span>
      </h3>
      <div className="at-a-glance-list">
        <div className="at-a-glance-item">
          <span className="glance-label">Recruiting Organization</span>
          <span className="glance-value">{job.organization}</span>
        </div>

        <div className="at-a-glance-item">
          <span className="glance-label">Total Vacancies</span>
          <span className="glance-value glance-value-vacancies">
            {formatVacancies(job.vacancies)}
          </span>
        </div>

        <div className="at-a-glance-item">
          <span className="glance-label">Job Category & Sector</span>
          <span className="glance-value">{job.category} ({isPrivate ? 'Private' : 'Govt'})</span>
        </div>

        <div className="at-a-glance-item">
          <span className="glance-label">Job Location</span>
          <span className="glance-value">{job.location || 'All India'}</span>
        </div>

        <div className="at-a-glance-item">
          <span className="glance-label">Application Mode</span>
          <span className="glance-value">{job.applicationMode || 'Online'}</span>
        </div>

        <div className="at-a-glance-item">
          <span className="glance-label">Minimum Qualification</span>
          <span className="glance-value">{qualText}</span>
        </div>

        {job.links?.officialWebsite && (
          <div className="at-a-glance-item">
            <span className="glance-label">Official Portal</span>
            <span className="glance-value">
              <a href={job.links.officialWebsite} target="_blank" rel="noopener noreferrer">
                Open Website ↗
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // 14. Sidebar Links Card
  const renderSidebarLinks = () => (
    <div className="sidebar-panel">
      <h3 className="sidebar-panel-title">
        <ExternalLink size={16} color="#0755d9" />
        <span>Important Official Links</span>
      </h3>
      <div className="sidebar-links-list">
        {job.links?.apply && (
          <a
            href={job.links.apply}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-btn"
          >
            <span>Apply Online Portal</span>
            <ExternalLink size={14} />
          </a>
        )}

        {job.links?.notification && (
          <a
            href={job.links.notification}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-btn"
          >
            <span>Download Notification PDF</span>
            <ExternalLink size={14} />
          </a>
        )}

        {job.links?.officialWebsite && (
          <a
            href={job.links.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-btn"
          >
            <span>Commission Website</span>
            <ExternalLink size={14} />
          </a>
        )}

        {job.links?.syllabus && (
          <a
            href={job.links.syllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-btn"
          >
            <span>Exam Syllabus PDF</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );

  // 15. Related Notifications Card
  const renderRelatedNotifications = () => (
    <div className="sidebar-panel">
      <div className="related-jobs-header">
        <h3 className="sidebar-panel-title" style={{ margin: 0, padding: 0, border: 'none' }}>
          <FileText size={16} color="#0755d9" />
          <span>Related Notifications</span>
        </h3>
        <Link
          to={`/latest-jobs?category=${encodeURIComponent(job.category || '')}`}
          className="related-jobs-view-all"
        >
          View All →
        </Link>
      </div>

      <div className="related-jobs-list">
        {relatedJobs.slice(0, 3).map((relJob) => (
          <div key={relJob.id} className="related-job-item">
            <h4 className="related-job-title">
              <Link to={`/jobs/${relJob.id}`}>{relJob.title}</Link>
            </h4>
            <div className="related-job-meta">
              <span>{relJob.category}</span>
              <span className="related-job-deadline-val">
                Last: {formatDate(relJob.lastDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 16. Job Updates Tracker Card
  const renderUpdatesTracker = () => (
    <div className="sidebar-panel job-updates-tracker-card">
      <h3 className="sidebar-panel-title updates-tracker-title">
        <Bookmark size={16} className="updates-tracker-icon" />
        <span>Job Updates Tracker</span>
      </h3>
      <p className="updates-tracker-desc">
        Bookmark this notification to your local dashboard to track deadlines, admit card releases, and result updates.
      </p>
      <button
        type="button"
        className={`btn-header-action btn-updates-tracker ${bookmarked ? 'active' : ''}`}
        onClick={() => toggleBookmark(job)}
        aria-label={bookmarked ? 'Saved in Bookmarks' : 'Save to My Bookmarks'}
      >
        <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
        <span>{bookmarked ? 'Saved in Bookmarks' : 'Save to My Bookmarks'}</span>
      </button>
    </div>
  );

  // 17. Similar Job Recommendations Section
  const renderSimilarJobs = () => (
    <section id="similar-jobs" className="similar-jobs-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">Similar Recruitment Recommendations</h2>
          <p className="section-subtitle">
            Explore related job circulars in {job.category} matching your qualification profile
          </p>
        </div>
        <Link to={`/latest-jobs?category=${encodeURIComponent(job.category || '')}`} className="section-view-all">
          <span>View All {job.category} Jobs</span>
          <span>→</span>
        </Link>
      </div>

      {relatedJobs.length > 0 ? (
        <div className="four-card-grid">
          {relatedJobs.map((relJob) => (
            <JobCard key={relJob.id} job={relJob} />
          ))}
        </div>
      ) : (
        <p style={{ color: '#64748b', fontSize: 14 }}>No similar jobs found at this moment.</p>
      )}
    </section>
  );

  return (
    <div className="page-container main-content job-details-page-container">
      <Breadcrumbs items={breadcrumbs} />

      {isMobile ? (
        /* ===================================================================
           MOBILE LAYOUT (< 768px): Single-Column Sequential Information Hierarchy
           =================================================================== */
        <div className="job-details-mobile-layout">
          {/* 1. Job Title & Header Meta */}
          {renderOverviewCard()}

          {/* 2. Primary Application Action & Deadline */}
          {renderDeadlinePanel()}

          {/* 3. Quick Recruitment Summary */}
          {renderAtAGlance()}

          {/* 4. Section Navigation Tabs */}
          {renderSectionNav()}

          {/* 5. Important Dates */}
          {renderImportantDates()}

          {/* 6. Application Fee */}
          {renderApplicationFee()}

          {/* 7. Age Limit & Relaxation */}
          {renderAgeLimit()}

          {/* 8. Vacancy Details */}
          {renderVacancyDetails()}

          {/* 9. Eligibility & Qualification */}
          {renderEligibility()}

          {/* 10. Short Information Summary */}
          {renderShortInfo()}

          {/* 11. How to Apply Step-by-Step */}
          {renderHowToApply()}

          {/* 12. Official Links Table */}
          {renderOfficialLinks()}

          {/* 13. FAQs */}
          {renderFaqs()}

          {/* 14. Related Recruitment Posts */}
          {renderRelatedNotifications()}

          {/* 15. Job Updates Tracker */}
          {renderUpdatesTracker()}
        </div>
      ) : (
        /* ===================================================================
           DESKTOP LAYOUT (>= 768px): Two-Column Layout (~67% / ~33%)
           =================================================================== */
        <div className="job-details-layout">
          {/* Left / Main Content Column */}
          <div className="job-details-main">
            {renderOverviewCard()}
            {renderSectionNav()}
            {renderShortInfo()}
            {renderImportantDates()}
            {renderApplicationFee()}
            {renderAgeLimit()}
            {renderVacancyDetails()}
            {renderEligibility()}
            {renderHowToApply()}
            {renderOfficialLinks()}
            {renderFaqs()}
          </div>

          {/* Right Sidebar Column */}
          <aside className="job-details-sidebar">
            {renderDeadlinePanel()}
            {renderAtAGlance()}
            {renderSidebarLinks()}
            {renderRelatedNotifications()}
            {renderUpdatesTracker()}
          </aside>
        </div>
      )}

      {/* Full-Width Similar Recommendations (Bottom) */}
      {renderSimilarJobs()}
    </div>
  );
}
