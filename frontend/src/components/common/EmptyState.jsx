import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';

export function EmptyState({
  icon: Icon = SearchX,
  title = 'No records found',
  description = 'We could not find any matches for your current criteria. Try resetting filters or adjusting search terms.',
  actionText,
  actionLink,
  onActionClick
}) {
  return (
    <div className="sp-empty-state">
      <div className="empty-state-icon">
        <Icon size={32} strokeWidth={1.8} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>

      {actionText && actionLink && (
        <Link to={actionLink} className="empty-state-btn">
          {actionText}
        </Link>
      )}

      {actionText && !actionLink && onActionClick && (
        <button type="button" onClick={onActionClick} className="empty-state-btn">
          {actionText}
        </button>
      )}
    </div>
  );
}

