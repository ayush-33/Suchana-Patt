import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Calendar,
  Users,
  GraduationCap,
  Clock,
  Award,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { Badge } from '../common/Badge';
import { formatDate, formatVacancies } from '../../utils/formatters';

/**
 * Compact horizontal Job Card designed specifically for the Search Results Page.
 * Prioritizes high scanning density, horizontal eligibility alignment, and fast comparison.
 */
export function SearchJobCard({ job }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!job) return null;

  const bookmarked = isBookmarked(job.id);
  const detailUrl = `/jobs/${job.id}`;

  // Normalized values with neutral fallbacks
  const qualDisplay =
    Array.isArray(job.qualification) && job.qualification.length > 0
      ? job.qualification.join(', ')
      : job.qualification || 'As per notification';

  const ageDisplay =
    job.ageText ||
    (job.minAge && job.maxAge ? `${job.minAge}–${job.maxAge} Years` : 'As per notice');

  const expDisplay = job.experience || job.experienceRange || 'Not required';

  const isPrivate = (job.jobType || '').toLowerCase() === 'private';
  const jobTypeBadgeType = isPrivate ? 'private' : 'gov';
  const jobTypeText = isPrivate ? 'Private Job' : 'Government Job';

  // Derived application status
  const rawStatus = (job.status || 'open').toLowerCase();
  let statusBadgeType = 'open';
  let statusBadgeText = 'Apply Open';

  if (rawStatus === 'upcoming') {
    statusBadgeType = 'upcoming';
    statusBadgeText = 'Upcoming';
  } else if (rawStatus === 'closed') {
    statusBadgeType = 'closed';
    statusBadgeText = 'Closed';
  } else if (rawStatus === 'open') {
    statusBadgeType = 'open';
    statusBadgeText = 'Apply Open';
  } else {
    statusBadgeType = 'open';
    statusBadgeText = job.status;
  }

  // Handle clicking anywhere on the card surface
  const handleCardClick = (e) => {
    // If the click originated from the bookmark button or interactive element, ignore
    if (e.target.closest('[data-prevent-card-nav="true"]') || e.target.closest('button')) {
      return;
    }
    navigate(detailUrl);
  };

  return (
    <article
      className="search-job-card"
      data-job-id={job.id}
      onClick={handleCardClick}
      role="article"
      aria-labelledby={`search-job-title-${job.id}`}
    >
      {/* Invisible stretched link for accessibility and keyboard tab order */}
      <Link
        to={detailUrl}
        className="search-job-card-stretched-link"
        aria-label={`View recruitment details for ${job.title} at ${job.organization}`}
        tabIndex={0}
      />

      {/* A. Top Row: Badges and Bookmark Action */}
      <div className="search-job-top-row">
        <div className="search-job-badges">
          <Badge type={jobTypeBadgeType} text={jobTypeText} />
          <Badge type={statusBadgeType} text={statusBadgeText} />
        </div>

        <button
          type="button"
          className={`search-job-bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(job);
          }}
          data-prevent-card-nav="true"
          title={bookmarked ? 'Remove from Saved Jobs' : 'Save this Job'}
          aria-label={
            bookmarked
              ? `Remove ${job.title} from Saved Jobs`
              : `Save ${job.title} to Bookmarks`
          }
        >
          <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* B. Job Title and Organization */}
      <div className="search-job-header">
        <h3 id={`search-job-title-${job.id}`} className="search-job-title" title={job.title}>
          <Link to={detailUrl} data-prevent-card-nav="true">
            {job.title}
          </Link>
        </h3>
        <div className="search-job-org" title={job.organization}>
          <Building2 size={14} className="search-job-org-icon" />
          <span>{job.organization}</span>
        </div>
      </div>

      {/* C. Compact 3-Column Eligibility Row */}
      <div className="search-job-eligibility-row">
        <div className="search-eligibility-col">
          <span className="search-eligibility-label">
            <GraduationCap size={12} className="search-eligibility-icon" />
            <span>Qualification</span>
          </span>
          <span className="search-eligibility-val" title={qualDisplay}>
            {qualDisplay}
          </span>
        </div>

        <div className="search-eligibility-divider" aria-hidden="true" />

        <div className="search-eligibility-col">
          <span className="search-eligibility-label">
            <Clock size={12} className="search-eligibility-icon" />
            <span>Age Limit</span>
          </span>
          <span className="search-eligibility-val" title={ageDisplay}>
            {ageDisplay}
          </span>
        </div>

        <div className="search-eligibility-divider" aria-hidden="true" />

        <div className="search-eligibility-col">
          <span className="search-eligibility-label">
            <Award size={12} className="search-eligibility-icon" />
            <span>Experience</span>
          </span>
          <span className="search-eligibility-val" title={expDisplay}>
            {expDisplay}
          </span>
        </div>
      </div>

      {/* D. Bottom Row: Last Application Date, Vacancies, and Details CTA */}
      <div className="search-job-bottom-row">
        <div className="search-job-meta-left">
          <div className="search-job-deadline" title={`Last application date: ${formatDate(job.lastDate)}`}>
            <Calendar size={13} className="search-meta-icon deadline" />
            <span>
              Last Date: <strong>{formatDate(job.lastDate, 'To be announced')}</strong>
            </span>
          </div>

          <div className="search-job-vacancies" title={`Total vacancies: ${formatVacancies(job.vacancies)}`}>
            <Users size={13} className="search-meta-icon vacancies" />
            <span>
              Vacancies: <strong>{formatVacancies(job.vacancies, 'Refer Notice')}</strong>
            </span>
          </div>
        </div>

        <div className="search-job-details-cta" aria-hidden="true">
          <span>Details</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </article>
  );
}

