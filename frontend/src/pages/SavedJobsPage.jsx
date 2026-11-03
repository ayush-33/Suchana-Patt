import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { JobCard } from '../components/jobs/JobCard';
import { EmptyState } from '../components/common/EmptyState';
import { useBookmarks } from '../hooks/useBookmarks';

export function SavedJobsPage() {
  const { bookmarks, clearBookmarks, savedJobsCount } = useBookmarks();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showConfirmModal) {
        setShowConfirmModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmModal]);

  const handleConfirmClear = () => {
    clearBookmarks();
    setShowConfirmModal(false);
  };

  const breadcrumbs = [{ label: 'Saved Jobs', to: '/saved-jobs' }];

  return (
    <div className="page-container main-content saved-jobs-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="saved-jobs-topbar">
        <div className="listing-page-header" style={{ marginBottom: 0 }}>
          <h1 className="listing-page-title">
            Saved Recruitment Notifications
          </h1>
          <p className="listing-page-subtitle">
            Bookmarked job openings stored locally for quick tracking and application deadline management.
          </p>
        </div>

        {savedJobsCount > 0 && (
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="filter-clear-all-btn saved-jobs-clear-btn"
            aria-label={`Clear all ${savedJobsCount} saved notifications`}
          >
            <Trash2 size={14} />
            <span>Clear All Saved Jobs ({savedJobsCount})</span>
          </button>
        )}
      </div>

      {savedJobsCount === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No Saved Notifications"
          description="You haven't bookmarked any jobs yet. Browse the latest government and private sector vacancies and click the bookmark icon to save them for easy access."
          actionText="Browse Latest Jobs"
          actionLink="/latest-jobs"
        />
      ) : (
        <div className="four-card-grid">
          {bookmarks.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="confirmation-modal-backdrop"
          onClick={() => setShowConfirmModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-modal-title"
        >
          <div
            className="confirmation-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirmation-modal-header">
              <div className="confirmation-modal-icon">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 id="clear-modal-title" className="confirmation-modal-title">
                  Clear All Saved Jobs?
                </h3>
                <p className="confirmation-modal-text">
                  Are you sure you want to remove all <strong>{savedJobsCount}</strong> saved notifications from your list? This local data will be reset.
                </p>
              </div>
            </div>

            <div className="confirmation-modal-actions">
              <button
                type="button"
                className="confirmation-btn-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirmation-btn-danger"
                onClick={handleConfirmClear}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
