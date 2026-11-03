import React, { useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { SearchFilterContent } from './SearchFilterContent';

/**
 * Mobile Filter Drawer / Bottom Sheet for Search Results.
 * Slides up smoothly on mobile viewports (< 768px).
 */
export function SearchFilterDrawer({
  isOpen,
  onClose,
  activeType = 'all',
  availableFilters = {},
  selectedFilters = {},
  onToggleFilter,
  onClearAll,
  totalResults = 0
}) {
  // Calculate total active secondary filters
  const totalActiveCount = Object.values(selectedFilters).reduce((acc, list) => {
    return acc + (Array.isArray(list) ? list.length : list ? 1 : 0);
  }, 0);

  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="search-filter-drawer-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="search-filter-drawer-container"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Search Results"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Drag / Handle Indicator */}
        <div className="search-filter-drawer-handle" aria-hidden="true" />

        {/* Header */}
        <div className="search-filter-drawer-header">
          <div className="search-filter-drawer-title-row">
            <SlidersHorizontal size={18} className="search-filter-drawer-icon" />
            <h2 className="search-filter-drawer-title">Filters</h2>
            {totalActiveCount > 0 && (
              <span className="search-filter-drawer-badge">
                {totalActiveCount} applied
              </span>
            )}
          </div>

          <div className="search-filter-drawer-header-actions">
            {totalActiveCount > 0 && (
              <button
                type="button"
                className="search-filter-drawer-reset-btn"
                onClick={onClearAll}
                aria-label="Reset all selected filters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              className="search-filter-drawer-close-btn"
              onClick={onClose}
              aria-label="Close filters panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="search-filter-drawer-body">
          <SearchFilterContent
            activeType={activeType}
            availableFilters={availableFilters}
            selectedFilters={selectedFilters}
            onToggleFilter={onToggleFilter}
          />
        </div>

        {/* Sticky Footer Actions */}
        <div className="search-filter-drawer-footer">
          <button
            type="button"
            className="search-filter-drawer-btn-clear"
            onClick={onClearAll}
            disabled={totalActiveCount === 0}
            aria-disabled={totalActiveCount === 0}
          >
            Clear All
          </button>

          <button
            type="button"
            className="search-filter-drawer-btn-apply"
            onClick={onClose}
          >
            <Check size={16} />
            <span>
              {totalResults > 0
                ? `Show ${totalResults} Result${totalResults === 1 ? '' : 's'}`
                : 'Apply Filters'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

