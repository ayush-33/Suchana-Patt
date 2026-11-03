import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function SectionHeading({
  title,
  icon: Icon,
  count,
  viewAllLink,
  viewAllText = 'View All'
}) {
  return (
    <div className="section-heading-row">
      <div className="section-heading-left">
        {Icon && (
          <span className="section-heading-icon">
            <Icon size={20} strokeWidth={2.2} />
          </span>
        )}
        <h2 className="section-heading-title">{title}</h2>
        {count !== undefined && count !== null && (
          <span className="section-heading-count">{count}</span>
        )}
      </div>

      {viewAllLink && (
        <Link to={viewAllLink} className="section-view-all-link">
          <span>{viewAllText}</span>
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

