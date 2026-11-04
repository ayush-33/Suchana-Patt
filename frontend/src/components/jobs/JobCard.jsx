import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Calendar, Users, GraduationCap, Clock, Award, Building2, ArrowRight, Bell, BellRing } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useReminders } from '../../hooks/useReminders';
import { Badge } from '../common/Badge';
import { formatDate, formatVacancies } from '../../utils/formatters';
import { getRecruitmentStatusInfo } from '../../utils/recruitmentStatusHelper';

export function JobCard({ job }) {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { hasReminder, toggleReminder } = useReminders();

  if (!job) return null;

  const bookmarked = isBookmarked(job.id);
  const reminded = hasReminder(job.id);
  const detailUrl = `/jobs/${job.id}`;

  // Normalized values with neutral fallbacks
  const qualDisplay = Array.isArray(job.qualification) && job.qualification.length > 0
    ? job.qualification.join(', ')
    : job.qualification || 'As per notification';

  const ageDisplay = job.ageText || (job.minAge && job.maxAge ? `${job.minAge}–${job.maxAge} Years` : 'As per notice');
  const expDisplay = job.experience || job.experienceRange || 'Not Required';

  const isPrivate = (job.jobType || '').toLowerCase() === 'private';
  const jobTypeBadgeType = isPrivate ? 'private' : 'gov';
  const jobTypeText = isPrivate ? 'Private Job' : 'Government Job';

  // Centralized recruitment status and action resolution
  const statusInfo = getRecruitmentStatusInfo(job);
  const statusBadgeType = statusInfo.badgeType;
  const statusBadgeText = statusInfo.statusText;

  // Handle clicking anywhere on the card surface
  const handleCardClick = (e) => {
    // If the click originated from the bookmark button or interactive element, ignore
    if (e.target.closest('[data-prevent-card-nav="true"]') || e.target.closest('button')) {
      return;
    }
    navigate(detailUrl);
  };

  return (
    <div
      className="sp-job-card"
      data-job-id={job.id}
      onClick={handleCardClick}
      role="article"
      aria-labelledby={`job-title-${job.id}`}
    >
      {/* Invisible stretched link for genuine anchor navigation and keyboard access */}
      <Link
        to={detailUrl}
        className="job-card-stretched-link"
        aria-label={`View recruitment details for ${job.title} at ${job.organization}`}
        tabIndex={0}
      />

      <div className="job-card-top-content">
        {/* A. Card Header: Badges & Actions */}
        <div className="job-card-top-row">
          <div className="job-card-badges">
            <Badge type={jobTypeBadgeType} text={jobTypeText} />
            <Badge type={statusBadgeType} text={statusBadgeText} />
          </div>

          <div className="job-card-actions-group">
            {statusInfo.isReminderRelevant && (
              <button
                type="button"
                className={`reminder-btn ${reminded ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleReminder(job);
                }}
                data-prevent-card-nav="true"
                title={reminded ? 'Saved to your reminders (click to remove)' : 'Save to your reminders'}
                aria-label={reminded ? `Remove reminder for ${job.title}` : `Save reminder for ${job.title}`}
              >
                {reminded ? (
                  <BellRing size={14} className="reminder-icon active" />
                ) : (
                  <Bell size={14} className="reminder-icon" />
                )}
                <span className="reminder-btn-text">{reminded ? 'Reminder Set' : 'Remind Me'}</span>
              </button>
            )}

            <button
              type="button"
              className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(job);
              }}
              data-prevent-card-nav="true"
              title={bookmarked ? 'Remove from Saved Jobs' : 'Save this Job'}
              aria-label={bookmarked ? `Remove ${job.title} from Saved Jobs` : `Save ${job.title} to Bookmarks`}
            >
              <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* B. Job Information: Title & Organization */}
        <div className="job-card-main">
          <h3 id={`job-title-${job.id}`} className="job-card-title" title={job.title}>
            {job.title}
          </h3>
          <div className="job-card-org" title={job.organization}>
            <Building2 size={14} className="job-card-org-icon" />
            <span>{job.organization}</span>
          </div>
        </div>

        {/* C. Eligibility Summary: Uniform 3-Column Panel */}
        <div className="card-eligibility-panel">
          {/* Column 1: Qualification */}
          <div className="eligibility-col">
            <div className="eligibility-label">
              <GraduationCap size={12} className="eligibility-icon" />
              <span>Qualification</span>
            </div>
            <div className="eligibility-val" title={qualDisplay}>
              {qualDisplay}
            </div>
          </div>

          {/* Column 2: Age Limit */}
          <div className="eligibility-col">
            <div className="eligibility-label">
              <Clock size={12} className="eligibility-icon" />
              <span>Age Limit</span>
            </div>
            <div className="eligibility-val" title={ageDisplay}>
              {ageDisplay}
            </div>
          </div>

          {/* Column 3: Experience */}
          <div className="eligibility-col">
            <div className="eligibility-label">
              <Award size={12} className="eligibility-icon" />
              <span>Experience</span>
            </div>
            <div className="eligibility-val" title={expDisplay}>
              {expDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* D. Card Footer: Deadline, Vacancies & Details CTA */}
      <div className="job-card-footer">
        <div className="job-card-meta-left">
          <div className="job-card-date">
            <Calendar size={13} className="footer-icon-deadline" />
            <span>
              {statusInfo.isUpcoming && statusInfo.startDateFormatted ? (
                <>Opens: <strong>{statusInfo.startDateFormatted}</strong></>
              ) : (
                <>Last Date: <strong>{formatDate(job.lastDate, 'To be announced')}</strong></>
              )}
            </span>
          </div>

          <div className="job-card-vacancies">
            <Users size={13} className="footer-icon-vacancies" />
            <span>
              Vacancies: <strong>{formatVacancies(job.vacancies, 'Refer Notice')}</strong>
            </span>
          </div>
        </div>

        <div className="job-card-details-cta" aria-hidden="true">
          <span>Details</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
}
