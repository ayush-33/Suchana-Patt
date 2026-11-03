import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { SearchFilterContent } from './SearchFilterContent';

/**
 * Category-aware Search Filter Sidebar for Desktop.
 * Renders on screens >= 768px in the left column.
 */
export function SearchFilterSidebar({
  activeType = 'all',
  availableFilters = {},
  selectedFilters = {},
  onToggleFilter,
  onClearAll
}) {
  // Calculate total active secondary filters
  const totalActiveCount = Object.values(selectedFilters).reduce((acc, list) => {
    return acc + (Array.isArray(list) ? list.length : list ? 1 : 0);
  }, 0);

  return (
    <aside className="search-filter-sidebar" aria-label="Search filters">
      <div className="search-filter-sidebar-header">
        <h2 className="search-filter-sidebar-title">
          <Filter size={16} />
          <span>Filters</span>
        </h2>
        {totalActiveCount > 0 && (
          <button
            type="button"
            className="search-clear-filters-btn"
            onClick={onClearAll}
            title="Reset all applied filters"
          >
            <RotateCcw size={12} style={{ display: 'inline', marginRight: 4 }} />
            <span>Reset ({totalActiveCount})</span>
          </button>
        )}
      </div>

      <SearchFilterContent
        activeType={activeType}
        availableFilters={availableFilters}
        selectedFilters={selectedFilters}
        onToggleFilter={onToggleFilter}
      />
    </aside>
  );
}
