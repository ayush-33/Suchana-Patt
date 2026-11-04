import { formatDate } from './formatters.js';

/**
 * Maps recruitment status and available links to consistent, context-aware UI states.
 * Centralizes recruitment lifecycle handling across job cards and detail pages.
 *
 * @param {Object} job - The job notification record
 * @param {number} [currentTimestamp=Date.now()] - Timestamp for deadline comparisons
 * @returns {Object} Normalized status, badge style, actions, and messaging
 */
export function getRecruitmentStatusInfo(job, currentTimestamp = Date.now()) {
  if (!job) {
    return {
      rawStatus: 'unknown',
      badgeType: 'open',
      statusText: 'Active',
      isClosed: false,
      isUpcoming: false,
      isOpen: true,
      hasApplyUrl: false,
      applyUrl: null,
      hasNotificationUrl: false,
      notificationUrl: null,
      hasOfficialWebsite: false,
      officialWebsiteUrl: null,
      startDate: null,
      startDateFormatted: null,
      lastDateFormatted: null,
      statusExplanation: null,
      primaryAction: {
        type: 'none',
        label: 'View Details',
        enabled: true,
        isExternal: false
      },
      isReminderRelevant: false
    };
  }

  const rawStatus = (job.status || 'open').toLowerCase();
  const applyLinkStr = job.links?.apply || job.applyUrl;
  const hasApplyUrl = Boolean(applyLinkStr && typeof applyLinkStr === 'string' && applyLinkStr.trim() !== '');
  const applyUrl = hasApplyUrl ? applyLinkStr.trim() : null;

  const notifLinkStr = job.links?.notification || job.notificationUrl;
  const hasNotificationUrl = Boolean(notifLinkStr && typeof notifLinkStr === 'string' && notifLinkStr.trim() !== '');
  const notificationUrl = hasNotificationUrl ? notifLinkStr.trim() : null;

  const webLinkStr = job.links?.officialWebsite || job.officialWebsiteUrl;
  const hasOfficialWebsite = Boolean(webLinkStr && typeof webLinkStr === 'string' && webLinkStr.trim() !== '');
  const officialWebsiteUrl = hasOfficialWebsite ? webLinkStr.trim() : null;

  // Deadline expiration check
  let isDeadlinePassed = false;
  if (job.lastDate) {
    const deadline = new Date(job.lastDate);
    if (!isNaN(deadline.getTime())) {
      deadline.setHours(23, 59, 59, 999);
      if (deadline.getTime() < currentTimestamp) {
        isDeadlinePassed = true;
      }
    }
  }

  const isClosed = rawStatus === 'closed' || isDeadlinePassed;
  const isUpcoming = rawStatus === 'upcoming' && !isClosed;
  const isOpen = !isClosed && !isUpcoming;

  let badgeType = 'open';
  let statusText = 'Apply Open';

  if (isClosed) {
    badgeType = 'closed';
    statusText = 'Application Closed';
  } else if (isUpcoming) {
    badgeType = 'upcoming';
    statusText = 'Upcoming';
  } else {
    badgeType = 'open';
    statusText = job.status === 'open' ? 'Apply Open' : job.status;
  }

  const startDate = job.applicationStartDate || null;
  const startDateFormatted = startDate ? formatDate(startDate) : null;
  const lastDateFormatted = job.lastDate ? formatDate(job.lastDate) : null;

  // Primary Action Logic
  let primaryAction = {
    type: 'apply',
    label: 'Apply Online Now',
    destination: applyUrl,
    enabled: true,
    isExternal: true
  };

  let statusExplanation = null;

  if (isClosed) {
    primaryAction = {
      type: 'closed',
      label: 'Application Closed',
      destination: null,
      enabled: false,
      isExternal: false
    };
    statusExplanation = lastDateFormatted
      ? `Registration closed on ${lastDateFormatted}`
      : 'Application window is now closed.';
  } else if (isUpcoming) {
    primaryAction = {
      type: 'reminder',
      label: startDateFormatted ? `Application Opens ${startDateFormatted}` : 'Application Form Coming Soon',
      destination: null,
      enabled: false,
      isExternal: false
    };
    statusExplanation = startDateFormatted
      ? `Online application begins on ${startDateFormatted}. Official link will be activated by the conducting body.`
      : 'Recruitment announced. Official registration portal will open soon.';
  } else if (!hasApplyUrl) {
    primaryAction = {
      type: 'pending_link',
      label: 'Official Link Not Released Yet',
      destination: null,
      enabled: false,
      isExternal: false
    };
    statusExplanation = 'Official application link not yet released by the recruiting organization. Save this notice or check the official brochure.';
  }

  return {
    rawStatus,
    badgeType,
    statusText,
    isClosed,
    isUpcoming,
    isOpen,
    hasApplyUrl,
    applyUrl,
    hasNotificationUrl,
    notificationUrl,
    hasOfficialWebsite,
    officialWebsiteUrl,
    startDate,
    startDateFormatted,
    lastDateFormatted,
    statusExplanation,
    primaryAction,
    isReminderRelevant: isUpcoming || (!hasApplyUrl && !isClosed)
  };
}
