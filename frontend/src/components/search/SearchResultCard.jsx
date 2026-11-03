import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Calendar, Building2, ChevronRight, FileText } from 'lucide-react';
import { Badge } from '../common/Badge';

/**
 * Unified, responsive Search Result Card for examinations, admit cards, results, admissions, scholarships, etc.
 */
export function SearchResultCard({ item }) {
  if (!item) return null;

  const {
    title,
    organization,
    category,
    typeLabel,
    status,
    statusType,
    dateLabel,
    dateValue,
    destinationUrl,
    actionUrl,
    actionText,
    raw = {}
  } = item;

  // Additional context snippet
  const snippet =
    raw.instructions ||
    raw.summary ||
    raw.cutOffMarks ||
    raw.description ||
    (raw.sections && raw.sections[0]) ||
    null;

  return (
    <article className="search-result-card" data-result-id={item.id}>
      <div className="search-card-left">
        {/* Top Badges & Meta */}
        <div className="search-card-meta-top">
          <Badge type={statusType || 'open'} text={status} />
          <span className="search-card-type-tag">{typeLabel}</span>
          {category && <span className="search-card-cat">{category}</span>}
        </div>

        {/* Title */}
        <h3 className="search-card-title">
          <Link to={destinationUrl} title={title}>
            {title}
          </Link>
        </h3>

        {/* Organization */}
        <div className="search-card-org">
          <Building2 size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
          <span>{organization}</span>
        </div>

        {/* Snippet / Context Details if available */}
        {snippet && (
          <p className="search-card-snippet" title={snippet}>
            {snippet}
          </p>
        )}

        {/* Key Date Information Strip */}
        <div className="search-card-date-strip">
          <Calendar size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
          <span>
            {dateLabel}: <strong>{dateValue}</strong>
          </span>
          {raw.fileSize && (
            <span style={{ marginLeft: 12, color: '#64748b' }}>
              <FileText size={12} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
              Size: {raw.fileSize}
            </span>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="search-card-right">
        {actionUrl ? (
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="search-card-action-btn"
          >
            <Download size={13} />
            <span>{actionText || 'Download'}</span>
          </a>
        ) : (
          <Link to={destinationUrl} className="search-card-action-btn secondary">
            <span>View Details</span>
            <ChevronRight size={13} />
          </Link>
        )}
      </div>
    </article>
  );
}
