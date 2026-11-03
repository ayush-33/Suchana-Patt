import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, FileQuestion } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export function NotFoundPage() {
  const breadcrumbs = [{ label: 'Page Not Found', to: '/404' }];

  return (
    <div className="page-container main-content not-found-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="details-panel not-found-card">
        <div className="not-found-icon-circle">
          <FileQuestion size={36} />
        </div>

        <h1 className="not-found-title">
          404 — Notification Page Not Found
        </h1>

        <p className="not-found-description">
          The page or recruitment circular you are looking for may have been archived, moved, or the link may be incorrect.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-view-details not-found-btn not-found-btn-primary">
            <Home size={15} />
            <span>Go to Homepage</span>
          </Link>

          <Link to="/latest-jobs" className="btn-view-details not-found-btn not-found-btn-secondary">
            <Briefcase size={15} />
            <span>Browse Latest Jobs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
