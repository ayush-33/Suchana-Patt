import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Train,
  GraduationCap,
  Briefcase,
  Landmark,
  BookOpen,
  Shield,
  Building2,
  Trophy,
  CreditCard,
  Key,
  Award,
  Star,
  Layers,
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Check,
  FileText,
  Calendar,
  X,
  RotateCcw,
  Sparkles,
  Bell,
  BellRing,
  Bookmark,
  Users,
  Clock,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';
import { getCategoryDetails } from '../../services/categoryService.js';
import { useMobileTheme } from '../../hooks/useTheme';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useReminders } from '../../hooks/useReminders';
import { formatDate, formatVacancies } from '../../utils/formatters';
import '../../styles/mobile-category.css';

const ICON_MAP = {
  Train,
  GraduationCap,
  Briefcase,
  Landmark,
  BookOpen,
  Shield,
  Building: Building2,
  Trophy,
  IdCard: CreditCard,
  Key,
  Award,
  Star,
  Layers
};

const PAGE_SIZE = 6;

const INITIAL_FILTERS = {
  jobType: [],
  qualification: [],
  experience: [],
  ageRange: [],
  category: [],
  status: [],
  organization: [],
  type: []
};

// ============================================================================
// Filter Matching Helpers
// ============================================================================
function matchOption(item, key, val) {
  if (key === 'jobType') {
    const rawType = (item.jobType || item.rawItem?.jobType || 'government').toLowerCase();
    return rawType === val.toLowerCase();
  }
  if (key === 'qualification') {
    const rawQ = item.qualification || item.rawItem?.qualification || [];
    const list = Array.isArray(rawQ) ? rawQ : [rawQ];
    const qStr = list.join(' ').toLowerCase();
    if (val === '10th Pass') return qStr.includes('10th') || qStr.includes('matric');
    if (val === '12th Pass') return qStr.includes('12th') || qStr.includes('inter');
    if (val === 'Diploma') return qStr.includes('diploma') || qStr.includes('polytechnic');
    if (val === 'Graduate') return qStr.includes('graduate') || qStr.includes('degree') || qStr.includes('bachelor');
    if (val === 'Postgraduate') return qStr.includes('postgraduate') || qStr.includes('pg') || qStr.includes('master');
    return qStr.includes(val.toLowerCase());
  }
  if (key === 'experience') {
    const exp = (item.rawItem?.experienceRange || item.rawItem?.experience || item.expDisplay || '').trim();
    if (val === 'Fresher') return exp.toLowerCase().includes('fresher') || exp === 'Fresher';
    if (val === '0–1 Years') return exp.includes('0–1') || exp.includes('0-1');
    if (val === '1–3 Years') return exp.includes('1–3') || exp.includes('1-3');
    if (val === '3+ Years') return exp.includes('3+') || exp.includes('4+') || exp.includes('5+');
    if (val === 'Not Required') return exp.toLowerCase().includes('not required') || exp === 'Not Required';
    return exp === val;
  }
  if (key === 'ageRange') {
    const age = (item.rawItem?.ageRange || '').trim();
    if (age === val) return true;
    if (val === '18-25 Years' && (age.includes('18-25') || age.includes('18–25'))) return true;
    if (val === '26-35 Years' && (age.includes('26-35') || age.includes('26–35'))) return true;
    if (val === '36+ Years' && age.includes('36+')) return true;
    return false;
  }
  if (key === 'category') {
    const cat = (item.category || item.rawItem?.category || '').toLowerCase();
    return cat === val.toLowerCase();
  }
  if (key === 'status') {
    const st = (item.status || item.rawItem?.status || item.statusLabel || '').toLowerCase();
    return st === val.toLowerCase() || (val === 'open' && st === 'active') || (val === 'active' && st === 'open');
  }
  if (key === 'organization') {
    const org = (item.organization || item.rawItem?.organization || '').toLowerCase();
    return org === val.toLowerCase();
  }
  if (key === 'type') {
    return item.type === val;
  }
  return false;
}

function itemMatchesFilters(item, filters) {
  for (const [key, values] of Object.entries(filters)) {
    if (values && values.length > 0) {
      const anyMatch = values.some((val) => matchOption(item, key, val));
      if (!anyMatch) return false;
    }
  }
  return true;
}

function getFilterGroups(categorySlug, allItems) {
  const slug = (categorySlug || '').toLowerCase();

  // 1. Latest Jobs
  if (slug === 'latest-jobs' || slug === 'jobs') {
    return [
      {
        key: 'jobType',
        title: 'Job Type',
        options: [
          { label: 'Government Job', value: 'government' },
          { label: 'Private Job', value: 'private' }
        ]
      },
      {
        key: 'qualification',
        title: 'Educational Qualification',
        options: [
          { label: '10th Pass', value: '10th Pass' },
          { label: '12th Pass', value: '12th Pass' },
          { label: 'Diploma', value: 'Diploma' },
          { label: 'Graduate', value: 'Graduate' },
          { label: 'Postgraduate', value: 'Postgraduate' }
        ]
      },
      {
        key: 'experience',
        title: 'Experience',
        options: [
          { label: 'Fresher', value: 'Fresher' },
          { label: '0–1 Years', value: '0–1 Years' },
          { label: '1–3 Years', value: '1–3 Years' },
          { label: '3+ Years', value: '3+ Years' },
          { label: 'Not Required', value: 'Not Required' }
        ]
      },
      {
        key: 'ageRange',
        title: 'Age Range',
        options: [
          { label: '18–25 Years', value: '18-25 Years' },
          { label: '26–35 Years', value: '26-35 Years' },
          { label: '36+ Years', value: '36+ Years' }
        ]
      },
      {
        key: 'category',
        title: 'Category / Sector',
        options: [
          { label: 'Railway', value: 'Railway' },
          { label: 'Banking', value: 'Banking' },
          { label: 'Teaching', value: 'Teaching' },
          { label: 'Defence', value: 'Defence' },
          { label: 'Police', value: 'Police' },
          { label: 'SSC', value: 'SSC' },
          { label: 'State Government', value: 'State Government' },
          { label: 'IT / Private Sector', value: 'IT / Private Sector' }
        ]
      },
      {
        key: 'status',
        title: 'Application Status',
        options: [
          { label: 'Application Open', value: 'open' },
          { label: 'Upcoming', value: 'upcoming' },
          { label: 'Closed', value: 'closed' }
        ]
      }
    ];
  }

  // 2. Admit Cards
  if (slug === 'admit-cards') {
    const orgs = [...new Set(allItems.map((i) => i.organization).filter(Boolean))];
    return [
      {
        key: 'status',
        title: 'Status',
        options: [
          { label: 'Released', value: 'Released' },
          { label: 'Coming Soon', value: 'Coming Soon' },
          { label: 'Not Available', value: 'Not Available' }
        ]
      },
      {
        key: 'category',
        title: 'Category / Sector',
        options: [
          { label: 'SSC', value: 'SSC' },
          { label: 'Police', value: 'Police' },
          { label: 'Banking', value: 'Banking' },
          { label: 'Railway', value: 'Railway' },
          { label: 'Teaching', value: 'Teaching' },
          { label: 'Defence', value: 'Defence' }
        ]
      },
      {
        key: 'organization',
        title: 'Conducting Organization',
        options: orgs.map((org) => ({ label: org, value: org }))
      }
    ];
  }

  // 3. Results
  if (slug === 'results') {
    const orgs = [...new Set(allItems.map((i) => i.organization).filter(Boolean))];
    return [
      {
        key: 'status',
        title: 'Result Status',
        options: [
          { label: 'Declared', value: 'Declared' },
          { label: 'Under Evaluation', value: 'Under Evaluation' }
        ]
      },
      {
        key: 'category',
        title: 'Category / Sector',
        options: [
          { label: 'SSC', value: 'SSC' },
          { label: 'Banking', value: 'Banking' },
          { label: 'State Government', value: 'State Government' },
          { label: 'Railway', value: 'Railway' },
          { label: 'Police', value: 'Police' }
        ]
      },
      {
        key: 'organization',
        title: 'Conducting Organization',
        options: orgs.map((org) => ({ label: org, value: org }))
      }
    ];
  }

  // 4. Domain / General Categories (Railway, UPSC, SSC, Banking, etc.)
  const availableTypes = [...new Set(allItems.map((i) => i.type))];
  const typeOptions = [];
  if (availableTypes.includes('job')) typeOptions.push({ label: 'Latest Jobs', value: 'job' });
  if (availableTypes.includes('admit-card')) typeOptions.push({ label: 'Admit Cards', value: 'admit-card' });
  if (availableTypes.includes('result')) typeOptions.push({ label: 'Results', value: 'result' });
  if (availableTypes.includes('other')) typeOptions.push({ label: 'Answer Keys & Syllabus', value: 'other' });

  return [
    ...(typeOptions.length > 1
      ? [
          {
            key: 'type',
            title: 'Notification Type',
            options: typeOptions
          }
        ]
      : []),
    {
      key: 'status',
      title: 'Status',
      options: [
        { label: 'Active / Open', value: 'open' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Closed', value: 'closed' }
      ]
    },
    {
      key: 'qualification',
      title: 'Educational Qualification',
      options: [
        { label: '10th Pass', value: '10th Pass' },
        { label: '12th Pass', value: '12th Pass' },
        { label: 'Diploma', value: 'Diploma' },
        { label: 'Graduate', value: 'Graduate' },
        { label: 'Postgraduate', value: 'Postgraduate' }
      ]
    }
  ];
}

// ============================================================================
// 1. Mobile Latest Jobs Notification Card
// ============================================================================
function MobileJobCard({ item }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { hasReminder, toggleReminder } = useReminders();
  const job = item.rawItem || item;

  const bookmarked = isBookmarked(job.id);
  const reminded = hasReminder(job.id);

  const isPrivate = (job.jobType || '').toLowerCase() === 'private';
  const typeText = isPrivate ? 'Private Job' : 'Government Job';
  const typeBadgeClass = isPrivate ? 'type-private' : 'type-gov';

  const rawStatus = (item.status || job.status || 'open').toLowerCase();
  const statusText = rawStatus === 'upcoming'
    ? 'Upcoming'
    : rawStatus === 'closed'
    ? 'Closed'
    : 'Active';

  const statusBadgeClass = rawStatus === 'upcoming'
    ? 'status-upcoming'
    : rawStatus === 'closed'
    ? 'status-closed'
    : 'status-active';

  const qualText = item.qualificationDisplay ||
    (Array.isArray(job.qualification) && job.qualification.length > 0
      ? job.qualification.join(', ')
      : job.qualification) || 'As per notification';

  const ageText = item.ageDisplay ||
    job.ageText ||
    (job.minAge && job.maxAge ? `${job.minAge}–${job.maxAge} Years` : 'As per rules');

  const expText = item.expDisplay || job.experience || job.experienceRange || 'Not Required';

  const opensDateValue = job.applicationStartDate || job.publishedAt;
  const opensDateText = opensDateValue ? formatDate(opensDateValue) : (item.dateValue || 'Active');
  const vacanciesText = formatVacancies(job.vacancies, 'As per notice');

  const handleCardClick = (e) => {
    if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
      return;
    }
    navigate(`/jobs/${job.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
        return;
      }
      e.preventDefault();
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <article
      className="mobile-card mobile-job-card"
      data-card-id={job.id}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${job.title}`}
    >
      {/* A. Top Information Row: Badges on left, Remind & Bookmark on right */}
      <div className="mobile-card-top-row">
        <div className="mobile-card-badges-group">
          <span className={`mobile-badge ${typeBadgeClass}`}>{typeText}</span>
          <span className={`mobile-badge ${statusBadgeClass}`}>{statusText}</span>
        </div>
        <div className="mobile-card-actions-group">
          <button
            type="button"
            className={`mobile-reminder-btn ${reminded ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleReminder(job);
            }}
            title={reminded ? 'Reminder set' : 'Remind me'}
            aria-label={reminded ? `Remove reminder for ${job.title}` : `Remind me for ${job.title}`}
          >
            {reminded ? <BellRing size={13} /> : <Bell size={13} />}
            <span>{reminded ? 'Reminder Set' : 'Remind Me'}</span>
          </button>
          <button
            type="button"
            className={`mobile-bookmark-btn ${bookmarked ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark(job);
            }}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark job'}
            aria-label={bookmarked ? `Remove bookmark for ${job.title}` : `Bookmark ${job.title}`}
          >
            <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* B. Job Title */}
      <h3 className="mobile-card-title">
        <Link to={`/jobs/${job.id}`} className="mobile-card-title-link">
          {job.title}
        </Link>
      </h3>

      {/* C. Recruiting Organization */}
      <div className="mobile-card-org">
        <Building2 size={14} className="mobile-card-org-icon" aria-hidden="true" />
        <span>{job.organization}</span>
      </div>

      {/* D. Qualification Information Panel (3 rows) */}
      <div className="mobile-info-panel mobile-qual-panel">
        <div className="mobile-panel-row">
          <div className="mobile-panel-label-cell">
            <GraduationCap size={13} className="mobile-panel-icon" aria-hidden="true" />
            <span className="mobile-panel-label">Qualification</span>
          </div>
          <span className="mobile-panel-value">{qualText}</span>
        </div>
        <div className="mobile-panel-row">
          <div className="mobile-panel-label-cell">
            <Clock size={13} className="mobile-panel-icon" aria-hidden="true" />
            <span className="mobile-panel-label">Age Limit</span>
          </div>
          <span className="mobile-panel-value">{ageText}</span>
        </div>
        <div className="mobile-panel-row">
          <div className="mobile-panel-label-cell">
            <Briefcase size={13} className="mobile-panel-icon" aria-hidden="true" />
            <span className="mobile-panel-label">Experience</span>
          </div>
          <span className="mobile-panel-value">{expText}</span>
        </div>
      </div>

      {/* E. Additional Job Information */}
      <div className="mobile-job-meta-row">
        <div className={`mobile-meta-item opens-date ${statusBadgeClass}`}>
          <Calendar size={13} aria-hidden="true" />
          <span>Opens: <strong>{opensDateText}</strong></span>
        </div>
        <div className="mobile-meta-item vacancies-count">
          <Users size={13} aria-hidden="true" />
          <span>Vacancies: <strong>{vacanciesText}</strong></span>
        </div>
      </div>

      {/* F. Details Button */}
      <Link
        to={`/jobs/${job.id}`}
        className="mobile-card-details-btn"
        aria-label={`View details for ${job.title}`}
      >
        <span>Details</span>
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}

// ============================================================================
// 2. Mobile Admit Card Notification Card
// ============================================================================
function MobileAdmitCardCard({ item }) {
  const navigate = useNavigate();
  const { hasReminder, toggleReminder } = useReminders();
  const card = item.rawItem || item;
  const reminded = hasReminder(card.id);

  const rawStatus = (card.status || item.statusLabel || '').toLowerCase();
  const isReleased = rawStatus === 'released' || rawStatus === 'available';
  const isComingSoon = rawStatus === 'coming soon';
  const statusText = isReleased ? 'Released' : isComingSoon ? 'Coming Soon' : 'Awaiting Update';
  const statusBadgeClass = isReleased ? 'status-active' : isComingSoon ? 'status-upcoming' : 'status-neutral';

  const categoryName = card.category || item.category || 'General';
  const examDate = card.examDateText || item.examDateText || item.dateValue || 'Announced Shortly';
  const announcementText = card.instructions || item.instructions ||
    'E-Admit cards will be available on official portal prior to the examination.';

  const targetUrl = card.relatedJobId ? `/jobs/${card.relatedJobId}` : null;

  const handleCardClick = (e) => {
    if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
      return;
    }
    if (targetUrl) {
      navigate(targetUrl);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
        return;
      }
      if (targetUrl) {
        e.preventDefault();
        navigate(targetUrl);
      }
    }
  };

  return (
    <article
      className="mobile-card mobile-admit-card"
      data-card-id={card.id}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={targetUrl ? 'link' : undefined}
      tabIndex={targetUrl ? 0 : undefined}
      aria-label={`Admit card details for ${card.examName || card.title}`}
    >
      {/* A. Top Row: Status badge on left, Category badge on right */}
      <div className="mobile-card-top-row">
        <span className={`mobile-badge ${statusBadgeClass}`}>{statusText}</span>
        <span className="mobile-badge mobile-category-badge">{categoryName}</span>
      </div>

      {/* B. Admit Card / Examination Title */}
      <h3 className="mobile-card-title">
        {card.relatedJobId ? (
          <Link to={`/jobs/${card.relatedJobId}`} className="mobile-card-title-link">
            {card.examName || card.title}
          </Link>
        ) : (
          <span>{card.examName || card.title}</span>
        )}
      </h3>

      {/* C. Conducting Organization */}
      <div className="mobile-card-org">
        <Building2 size={14} className="mobile-card-org-icon" aria-hidden="true" />
        <span>{card.organization}</span>
      </div>

      {/* D. Information or Announcement Panel */}
      <div className="mobile-info-panel mobile-announcement-panel">
        <p className="mobile-announcement-text">{announcementText}</p>
      </div>

      {/* E. Divider */}
      <div className="mobile-card-divider" />

      {/* F. Bottom Action Row: Examination Date + Action Button */}
      <div className="mobile-card-action-row">
        <div className="mobile-meta-item exam-date">
          <Calendar size={13} aria-hidden="true" />
          <span>Exam: <strong>{examDate}</strong></span>
        </div>

        {isReleased && card.downloadUrl ? (
          <a
            href={card.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-card-action-btn primary"
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={13} />
            <span>Download Admit Card</span>
          </a>
        ) : (
          <button
            type="button"
            className={`mobile-card-action-btn secondary ${reminded ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleReminder({
                id: card.id,
                title: card.examName || card.title
              });
            }}
          >
            {reminded ? <BellRing size={13} /> : <Bell size={13} />}
            <span>{reminded ? 'Alert Active' : 'Notify When Released'}</span>
          </button>
        )}
      </div>
    </article>
  );
}

// ============================================================================
// 3. Mobile Results Notification Card
// ============================================================================
function MobileResultCard({ item }) {
  const navigate = useNavigate();
  const res = item.rawItem || item;

  const rawStatus = (res.status || item.statusLabel || '').toLowerCase();
  const isDeclared = rawStatus === 'declared';
  const isEvaluation = rawStatus.includes('evaluat') || rawStatus === 'under evaluation';
  const statusText = isDeclared ? 'Declared' : isEvaluation ? 'Under Evaluation' : (res.status || 'Awaiting Update');
  const statusBadgeClass = isDeclared ? 'status-active' : isEvaluation ? 'status-warning' : 'status-neutral';

  const categoryName = res.category || item.category || 'General';
  const declarationDate = res.declarationDateText || item.declarationDateText || item.dateValue || 'Recently Announced';

  const resultInfo = res.cutOffMarks
    ? (res.cutOffMarks.toLowerCase().startsWith('cutoff') ? res.cutOffMarks : `Cutoff: ${res.cutOffMarks}`)
    : (res.summary || 'Official merit list and result declared on official portal.');

  const isScorecardAction = (res.resultUrl && res.resultUrl.includes('score')) ||
    (res.examName && res.examName.toLowerCase().includes('scorecard')) ||
    !isDeclared;

  const actionBtnText = isDeclared ? (isScorecardAction ? 'Scorecard' : 'View Result') : 'Scorecard';
  const targetUrl = res.relatedJobId ? `/jobs/${res.relatedJobId}` : null;

  const handleCardClick = (e) => {
    if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
      return;
    }
    if (targetUrl) {
      navigate(targetUrl);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
        return;
      }
      if (targetUrl) {
        e.preventDefault();
        navigate(targetUrl);
      }
    }
  };

  return (
    <article
      className="mobile-card mobile-result-card"
      data-card-id={res.id}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={targetUrl ? 'link' : undefined}
      tabIndex={targetUrl ? 0 : undefined}
      aria-label={`Result details for ${res.examName || res.title}`}
    >
      {/* A. Top Row: Result status badge on left, Category badge on right */}
      <div className="mobile-card-top-row">
        <span className={`mobile-badge ${statusBadgeClass}`}>{statusText}</span>
        <span className="mobile-badge mobile-category-badge">{categoryName}</span>
      </div>

      {/* B. Result Title */}
      <h3 className="mobile-card-title">
        {res.relatedJobId ? (
          <Link to={`/jobs/${res.relatedJobId}`} className="mobile-card-title-link">
            {res.examName || res.title}
          </Link>
        ) : (
          <span>{res.examName || res.title}</span>
        )}
      </h3>

      {/* C. Conducting Organization */}
      <div className="mobile-card-org">
        <Building2 size={14} className="mobile-card-org-icon" aria-hidden="true" />
        <span>{res.organization}</span>
      </div>

      {/* D. Result Information Panel */}
      <div className="mobile-info-panel mobile-result-panel">
        <p className="mobile-result-info-text">{resultInfo}</p>
      </div>

      {/* E. Divider */}
      <div className="mobile-card-divider" />

      {/* F. Bottom Action Row: Declaration Date + Action Button */}
      <div className="mobile-card-action-row">
        <div className="mobile-meta-item declaration-date">
          <Calendar size={13} aria-hidden="true" />
          <span>Declared: <strong>{declarationDate}</strong></span>
        </div>

        {isDeclared && res.resultUrl ? (
          <a
            href={res.resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-card-action-btn primary"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{actionBtnText}</span>
            <ExternalLink size={13} />
          </a>
        ) : isDeclared && res.relatedJobId ? (
          <Link
            to={`/jobs/${res.relatedJobId}`}
            className="mobile-card-action-btn primary"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{actionBtnText}</span>
          </Link>
        ) : (
          <button
            type="button"
            className="mobile-card-action-btn secondary disabled"
            disabled
          >
            <span>{actionBtnText}</span>
          </button>
        )}
      </div>
    </article>
  );
}

// ============================================================================
// 4. Mobile Other Notifications Card (Answer Keys, Syllabus, Admissions, etc.)
// ============================================================================
function MobileOtherCard({ item }) {
  const navigate = useNavigate();
  const statusBadgeClass = item.statusType === 'open' ? 'status-active' : 'status-neutral';
  const targetUrl = item.link && item.link !== '#' ? item.link : null;

  const handleCardClick = (e) => {
    if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
      return;
    }
    if (targetUrl) {
      navigate(targetUrl);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('button, a, input, select, textarea, [data-prevent-card-nav="true"]')) {
        return;
      }
      if (targetUrl) {
        e.preventDefault();
        navigate(targetUrl);
      }
    }
  };

  return (
    <article
      className="mobile-card mobile-other-card"
      data-card-id={item.id}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={targetUrl ? 'link' : undefined}
      tabIndex={targetUrl ? 0 : undefined}
      aria-label={`Details for ${item.title}`}
    >
      <div className="mobile-card-top-row">
        <span className={`mobile-badge ${statusBadgeClass}`}>{item.statusLabel || 'Notification'}</span>
        <span className="mobile-badge mobile-category-badge">{item.typeLabel || item.category || 'General'}</span>
      </div>

      <h3 className="mobile-card-title">
        <Link to={item.link || '#'} className="mobile-card-title-link">
          {item.title}
        </Link>
      </h3>

      <div className="mobile-card-org">
        <Building2 size={14} className="mobile-card-org-icon" aria-hidden="true" />
        <span>{item.organization}</span>
      </div>

      {item.dateValue && (
        <div className="mobile-info-panel mobile-other-panel">
          <p className="mobile-announcement-text">
            {item.dateLabel}: <strong>{item.dateValue}</strong>
          </p>
        </div>
      )}

      <div className="mobile-card-divider" />

      <div className="mobile-card-action-row">
        <span className="mobile-meta-item">
          <Calendar size={13} aria-hidden="true" />
          <span>{item.dateLabel || 'Date'}: <strong>{item.dateValue || 'Active'}</strong></span>
        </span>
        <Link
          to={item.link || '#'}
          className="mobile-card-action-btn primary"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Details</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </article>
  );
}

// ============================================================================
// Main Mobile Category Listing Page
// ============================================================================
export function MobileCategoryListingPage({ categorySlug = 'railway' }) {
  const { theme, isDark } = useMobileTheme();
  const listingRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);

  // Pending filter draft state in the bottom sheet
  const [pendingFilters, setPendingFilters] = useState(INITIAL_FILTERS);

  // Collapsible section states
  const [openSections, setOpenSections] = useState({
    jobType: true,
    qualification: true,
    experience: false,
    ageRange: false,
    category: false,
    status: true,
    organization: false,
    type: true
  });

  // Retrieve base category details and raw items
  const { categoryInfo, allItems } = useMemo(() => {
    return getCategoryDetails(categorySlug);
  }, [categorySlug]);

  // Available filter groups for current category
  const filterGroups = useMemo(() => {
    return getFilterGroups(categorySlug, allItems);
  }, [categorySlug, allItems]);

  // Scroll to top when category slug changes & reset filters
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setAppliedFilters(INITIAL_FILTERS);
    setPendingFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setCurrentPage(1);

    const slug = (categorySlug || '').toLowerCase();
    if (slug === 'latest-jobs' || slug === 'jobs') {
      setOpenSections({
        jobType: true,
        qualification: true,
        experience: false,
        ageRange: false,
        category: false,
        status: false
      });
    } else if (slug === 'admit-cards' || slug === 'results') {
      setOpenSections({
        status: true,
        category: true,
        organization: false
      });
    } else {
      setOpenSections({
        type: true,
        status: true,
        qualification: false
      });
    }
  }, [categorySlug]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterModalOpen]);

  const CategoryIcon = ICON_MAP[categoryInfo.iconName] || Layers;

  // Filter items based on searchQuery & appliedFilters
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || item.examName || '').toLowerCase().includes(query);
        const orgMatch = (item.organization || '').toLowerCase().includes(query);
        const catMatch = (item.category || '').toLowerCase().includes(query);
        if (!titleMatch && !orgMatch && !catMatch) return false;
      }

      // 2. Applied multi-select filters
      return itemMatchesFilters(item, appliedFilters);
    });
  }, [allItems, searchQuery, appliedFilters]);

  // Active filter count for the toolbar button
  const activeFiltersCount = useMemo(() => {
    return Object.values(appliedFilters).reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);
  }, [appliedFilters]);

  // Active count for pending filters in the modal
  const pendingActiveCount = useMemo(() => {
    return Object.values(pendingFilters).reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);
  }, [pendingFilters]);

  // Dynamic matching count based on pending selections
  const pendingMatchingCount = useMemo(() => {
    return allItems.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || item.examName || '').toLowerCase().includes(query);
        const orgMatch = (item.organization || '').toLowerCase().includes(query);
        const catMatch = (item.category || '').toLowerCase().includes(query);
        if (!titleMatch && !orgMatch && !catMatch) return false;
      }
      return itemMatchesFilters(item, pendingFilters);
    }).length;
  }, [allItems, searchQuery, pendingFilters]);

  // Helper to get real option count for each badge
  const getOptionCount = useCallback((groupKey, value) => {
    return allItems.filter((item) => matchOption(item, groupKey, value)).length;
  }, [allItems]);

  // Toggle option selection in pending draft
  const togglePendingOption = (groupKey, value) => {
    setPendingFilters((prev) => {
      const current = prev[groupKey] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [groupKey]: updated };
    });
  };

  // Toggle collapsible section
  const toggleSection = (groupKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  // Clear pending filters in bottom sheet
  const handleClearPendingFilters = () => {
    setPendingFilters(INITIAL_FILTERS);
  };

  // Apply pending filters and close modal
  const handleApplyFilters = () => {
    setAppliedFilters(pendingFilters);
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  // Open modal: copy applied to pending
  const handleOpenFilterModal = () => {
    setPendingFilters(appliedFilters);
    setIsFilterModalOpen(true);
  };

  // Close modal without applying
  const handleCloseFilterModal = () => {
    setPendingFilters(appliedFilters);
    setIsFilterModalOpen(false);
  };

  // Reset all filters from empty state
  const handleClearAllFilters = () => {
    setAppliedFilters(INITIAL_FILTERS);
    setPendingFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  // Category noun for the "Show N [Category]" button
  const categoryNoun = useMemo(() => {
    const slug = (categorySlug || '').toLowerCase();
    if (slug === 'latest-jobs' || slug === 'jobs') return 'Jobs';
    if (slug === 'admit-cards') return 'Admit Cards';
    if (slug === 'results') return 'Results';
    return `${categoryInfo.label} Notifications`;
  }, [categorySlug, categoryInfo.label]);

  // Pagination calculation: Max 6 notification cards per page on mobile
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  let safeCurrentPage = currentPage;
  if (currentPage > totalPages) {
    safeCurrentPage = 1;
  }

  const paginatedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, safeCurrentPage]);

  // Generate responsive page number pills
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (safeCurrentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages];
  }, [totalPages, safeCurrentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === safeCurrentPage) return;
    setCurrentPage(newPage);
    if (listingRef.current) {
      const rect = listingRef.current.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - 68; // 68px header offset
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  const renderCard = (item) => {
    if (item.type === 'job') {
      return <MobileJobCard key={`job-${item.id}`} item={item} />;
    }
    if (item.type === 'admit-card') {
      return <MobileAdmitCardCard key={`admit-${item.id}`} item={item} />;
    }
    if (item.type === 'result') {
      return <MobileResultCard key={`result-${item.id}`} item={item} />;
    }
    return <MobileOtherCard key={`other-${item.type}-${item.id}`} item={item} />;
  };

  return (
    <div className={`mobile-category-page ${isDark ? 'dark-mode' : ''}`} data-mobile-theme={theme}>
      {/* ====================================================================
          1. Breadcrumb Navigation
          ==================================================================== */}
      <nav className="mobile-cat-breadcrumbs" aria-label="Breadcrumb">
        <ol className="mobile-cat-breadcrumb-list">
          <li className="mobile-cat-breadcrumb-item">
            <Link to="/" className="mobile-cat-breadcrumb-link">
              Home
            </Link>
          </li>
          <li className="mobile-cat-breadcrumb-sep" aria-hidden="true">
            /
          </li>
          <li className="mobile-cat-breadcrumb-item active" aria-current="page">
            {categoryInfo.label}
          </li>
        </ol>
      </nav>

      {/* ====================================================================
          2. Category Title and Description (Overview Card)
          ==================================================================== */}
      <header className="mobile-cat-overview-card" aria-label="Category Overview">
        <div className="mobile-cat-overview-top">
          <div className="mobile-cat-icon-container">
            <CategoryIcon size={24} strokeWidth={2.4} />
          </div>
          <div className="mobile-cat-count-badge">
            <Sparkles size={12} strokeWidth={2.4} />
            <span>{filteredItems.length} Notifications</span>
          </div>
        </div>

        <h1 className="mobile-cat-title">{categoryInfo.title}</h1>
        <p className="mobile-cat-description">{categoryInfo.description}</p>
      </header>

      {/* ====================================================================
          3. Search and Filter Controls
          ==================================================================== */}
      <section className="mobile-cat-toolbar" aria-label="Search and Filter">
        <div className="mobile-cat-search-wrapper">
          <Search size={16} className="mobile-cat-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="mobile-cat-search-input"
            placeholder={`Search in ${categoryInfo.label} notifications...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            aria-label={`Search notifications in ${categoryInfo.label}`}
          />
          {searchQuery && (
            <button
              type="button"
              className="mobile-cat-search-clear"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          className={`mobile-cat-filter-btn ${activeFiltersCount > 0 ? 'active' : ''}`}
          onClick={handleOpenFilterModal}
          aria-label={`Filter notifications. ${activeFiltersCount} filters active.`}
        >
          <SlidersHorizontal size={15} />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className="mobile-cat-filter-count-badge">{activeFiltersCount}</span>
          )}
        </button>
      </section>

      {/* ====================================================================
          4. Notification Listing Cards (Latest Jobs / Admit Cards / Results / Others)
          ==================================================================== */}
      <main className="mobile-cat-listing-container" ref={listingRef} aria-label="Notification List">
        {filteredItems.length === 0 ? (
          <div className="mobile-cat-empty-state">
            <div className="mobile-cat-empty-icon">
              <FileText size={32} />
            </div>
            <h3 className="mobile-cat-empty-title">No Notifications Found</h3>
            <p className="mobile-cat-empty-desc">
              We couldn't find any notifications matching your current filters or search query in{' '}
              {categoryInfo.label}.
            </p>
            <button
              type="button"
              className="mobile-cat-empty-btn"
              onClick={handleClearAllFilters}
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="mobile-cat-cards-list">
            {paginatedItems.map((item) => renderCard(item))}
          </div>
        )}

        {/* ====================================================================
            5. Pagination Controls (Max 6 records per page)
            ==================================================================== */}
        {totalPages > 1 && (
          <nav className="mobile-cat-pagination" aria-label="Notification listing pagination">
            <button
              type="button"
              className="mobile-cat-pag-btn prev"
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="mobile-cat-page-numbers" role="group" aria-label="Page numbers">
              {pageNumbers.map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="mobile-cat-page-ellipsis" aria-hidden="true">
                      …
                    </span>
                  );
                }
                const isActive = p === safeCurrentPage;
                return (
                  <button
                    key={p}
                    type="button"
                    className={`mobile-cat-page-num ${isActive ? 'active' : ''}`}
                    onClick={() => handlePageChange(p)}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Page ${p}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mobile-cat-pag-btn next"
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage >= totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </main>

      {/* ====================================================================
          6. Responsive Filter Bottom Sheet Modal
          ==================================================================== */}
      {isFilterModalOpen && (
        <div
          className="mobile-filter-modal-backdrop mobile-cat-modal-backdrop"
          onClick={handleCloseFilterModal}
          role="presentation"
        >
          <div
            className="mobile-filter-bottom-sheet mobile-cat-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Filter ${categoryInfo.label}`}
          >
            {/* Top Drag Handle */}
            <div className="mobile-filter-drag-handle" aria-hidden="true" />

            {/* Fixed Header */}
            <div className="mobile-filter-sheet-header mobile-cat-modal-header">
              <div className="mobile-filter-sheet-title mobile-cat-modal-title">
                <SlidersHorizontal size={18} />
                <span>Filter {categoryInfo.label}</span>
                {pendingActiveCount > 0 && (
                  <span className="mobile-filter-header-count-pill">{pendingActiveCount} active</span>
                )}
              </div>
              <button
                type="button"
                className="mobile-filter-sheet-close mobile-cat-modal-close"
                onClick={handleCloseFilterModal}
                aria-label="Close filter options"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body with Collapsible Sections */}
            <div className="mobile-filter-sheet-scrollable-body mobile-cat-modal-body">
              {filterGroups.map((group) => {
                const isOpen = openSections[group.key] ?? false;
                const selectedInGroup = pendingFilters[group.key] || [];
                const groupSelectedCount = selectedInGroup.length;

                return (
                  <section key={group.key} className="mobile-filter-section-item">
                    <button
                      type="button"
                      className="mobile-filter-section-header-btn"
                      onClick={() => toggleSection(group.key)}
                      aria-expanded={isOpen}
                      aria-controls={`filter-section-${group.key}`}
                    >
                      <div className="mobile-filter-section-title-wrap">
                        <span className="mobile-filter-section-title">{group.title}</span>
                        {groupSelectedCount > 0 && (
                          <span className="mobile-filter-section-pill">
                            {groupSelectedCount} selected
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        size={16}
                        className={`mobile-filter-section-chevron ${isOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div id={`filter-section-${group.key}`} className="mobile-filter-options-list">
                        {group.options.map((option) => {
                          const isSelected = selectedInGroup.includes(option.value);
                          const count = getOptionCount(group.key, option.value);

                          return (
                            <label
                              key={option.value}
                              className={`mobile-filter-option-row ${isSelected ? 'selected' : ''}`}
                            >
                              <div className="mobile-filter-option-left">
                                <input
                                  type="checkbox"
                                  className="mobile-filter-native-checkbox"
                                  checked={isSelected}
                                  onChange={() => togglePendingOption(group.key, option.value)}
                                />
                                <span className="mobile-filter-checkbox-box" aria-hidden="true">
                                  {isSelected && <Check size={12} strokeWidth={3} />}
                                </span>
                                <span className="mobile-filter-option-label">{option.label}</span>
                              </div>
                              <span className="mobile-filter-option-count">{count}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Fixed Sticky Footer */}
            <div className="mobile-filter-sheet-footer mobile-cat-modal-footer">
              <button
                type="button"
                className="mobile-filter-btn-clear mobile-cat-modal-reset-btn"
                onClick={handleClearPendingFilters}
                disabled={pendingActiveCount === 0}
              >
                Clear All
              </button>
              <button
                type="button"
                className="mobile-filter-btn-apply mobile-cat-modal-apply-btn"
                onClick={handleApplyFilters}
              >
                Show {pendingMatchingCount} {pendingMatchingCount === 0 ? 'Results' : categoryNoun}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileCategoryListingPage;
