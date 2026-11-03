import React from 'react';

export function Badge({ type = 'gov', text, icon: Icon, className = '' }) {
  let badgeClass = 'sp-badge-gov';

  if (type === 'private' || type === 'pvt') {
    badgeClass = 'sp-badge-pvt';
  } else if (type === 'open') {
    badgeClass = 'sp-badge-open';
  } else if (type === 'upcoming') {
    badgeClass = 'sp-badge-upcoming';
  } else if (type === 'closed') {
    badgeClass = 'sp-badge-closed';
  } else if (type === 'released') {
    badgeClass = 'sp-badge-released';
  }

  return (
    <span className={`sp-badge ${badgeClass} ${className}`}>
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      <span>{text}</span>
    </span>
  );
}

