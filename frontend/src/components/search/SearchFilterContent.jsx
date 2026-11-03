import React from 'react';

/**
 * Reusable Filter Groups Renderer for Search Results.
 * Shared between desktop SearchFilterSidebar and mobile SearchFilterDrawer.
 */
export function SearchFilterContent({
  activeType = 'all',
  availableFilters = {},
  selectedFilters = {},
  onToggleFilter
}) {
  const {
    organizations = [],
    statuses = [],
    jobTypes = [],
    qualifications = [],
    categories = [],
    levels = []
  } = availableFilters;

  // Helper to check if a specific filter value is selected
  const isSelected = (groupKey, val) => {
    const list = selectedFilters[groupKey] || [];
    return list.some((item) => item.toLowerCase() === String(val).toLowerCase());
  };

  // Render a single filter group with checkboxes and counts
  const renderFilterGroup = (title, groupKey, options, displayFormatter) => {
    if (!options || options.length === 0) return null;

    return (
      <div className="search-filter-group" key={groupKey}>
        <div className="search-filter-group-title">
          <span>{title}</span>
          {(selectedFilters[groupKey]?.length || 0) > 0 && (
            <span className="search-filter-active-indicator">
              {selectedFilters[groupKey].length} selected
            </span>
          )}
        </div>
        <div className="search-filter-options-list">
          {options.map((opt) => {
            const checked = isSelected(groupKey, opt.value);
            const label = displayFormatter
              ? displayFormatter(opt.label || opt.value)
              : opt.label || opt.value;

            return (
              <label
                key={`${groupKey}-${opt.value}`}
                className={`search-filter-checkbox-item ${checked ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleFilter(groupKey, opt.value)}
                  aria-label={`${title}: ${label}`}
                />
                <span className="search-filter-checkbox-label" title={label}>
                  {label}
                </span>
                <span className="search-filter-count-pill">{opt.count}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  // Formatters for human-readable labels
  const formatJobType = (val) => {
    if (val.toLowerCase() === 'government') return 'Government Job';
    if (val.toLowerCase() === 'private') return 'Private Job';
    return val;
  };

  const formatStatus = (val) => {
    if (val.toLowerCase() === 'open') return 'Apply Open';
    if (val.toLowerCase() === 'upcoming') return 'Upcoming Notice';
    if (val.toLowerCase() === 'closed') return 'Application Closed';
    return val;
  };

  return (
    <div className="search-filter-groups-container">
      {/* Category-aware Filter Groups */}
      {activeType === 'jobs' && (
        <>
          {renderFilterGroup('Job Type', 'jobType', jobTypes, formatJobType)}
          {renderFilterGroup('Application Status', 'status', statuses, formatStatus)}
          {renderFilterGroup('Qualification', 'qualification', qualifications)}
          {renderFilterGroup('Recruiting Organization', 'org', organizations)}
        </>
      )}

      {activeType === 'admit-cards' && (
        <>
          {renderFilterGroup('Admit Card Status', 'status', statuses)}
          {renderFilterGroup('Exam Body / Org', 'org', organizations)}
          {renderFilterGroup('Category', 'category', categories)}
        </>
      )}

      {activeType === 'results' && (
        <>
          {renderFilterGroup('Result Status', 'status', statuses)}
          {renderFilterGroup('Exam Board / Org', 'org', organizations)}
          {renderFilterGroup('Category', 'category', categories)}
        </>
      )}

      {activeType === 'admissions' && (
        <>
          {renderFilterGroup('Admission Status', 'status', statuses)}
          {renderFilterGroup('Institution / Agency', 'org', organizations)}
          {renderFilterGroup('Program Category', 'level', levels)}
        </>
      )}

      {activeType === 'scholarships' && (
        <>
          {renderFilterGroup('Application Status', 'status', statuses)}
          {renderFilterGroup('Student Level', 'level', levels)}
          {renderFilterGroup('Welfare Department', 'org', organizations)}
        </>
      )}

      {activeType === 'syllabus' && (
        <>
          {renderFilterGroup('Exam Level', 'level', levels)}
          {renderFilterGroup('Exam Body / Org', 'org', organizations)}
          {renderFilterGroup('Category', 'category', categories)}
        </>
      )}

      {activeType === 'answer-keys' && (
        <>
          {renderFilterGroup('Answer Key Status', 'status', statuses)}
          {renderFilterGroup('Exam Body / Org', 'org', organizations)}
          {renderFilterGroup('Category', 'category', categories)}
        </>
      )}

      {activeType === 'all' && (
        <>
          {renderFilterGroup('Category / Domain', 'category', categories)}
          {renderFilterGroup('Organization / Body', 'org', organizations)}
          {renderFilterGroup('Status', 'status', statuses, formatStatus)}
          {jobTypes.length > 0 &&
            renderFilterGroup('Job Sector', 'jobType', jobTypes, formatJobType)}
        </>
      )}
    </div>
  );
}

