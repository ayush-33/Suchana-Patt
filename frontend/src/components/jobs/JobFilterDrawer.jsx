import React, { useEffect } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Mobile Filter Drawer for the Latest Jobs Page.
 * Slides up from bottom on viewports < 768px.
 */
export function JobFilterDrawer({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  onClearAll,
  filterCounts = {},
  totalResults = 0
}) {
  const [openSections, setOpenSections] = React.useState({
    jobType: true,
    qualification: true,
    experience: false,
    ageRange: false,
    category: true,
    status: true
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxToggle = (groupKey, value) => {
    const currentList = selectedFilters[groupKey] || [];
    let updatedList;
    if (currentList.includes(value)) {
      updatedList = currentList.filter((item) => item !== value);
    } else {
      updatedList = [...currentList, value];
    }
    onFilterChange(groupKey, updatedList);
  };

  const filterGroups = [
    {
      key: 'jobType',
      title: 'Job Type',
      options: [
        { label: 'Government Job', value: 'government', countKey: 'government' },
        { label: 'Private Job', value: 'private', countKey: 'private' }
      ]
    },
    {
      key: 'qualification',
      title: 'Qualification',
      options: [
        { label: '10th Pass', value: '10th Pass', countKey: '10th Pass' },
        { label: '12th Pass', value: '12th Pass', countKey: '12th Pass' },
        { label: 'Diploma', value: 'Diploma', countKey: 'Diploma' },
        { label: 'Graduate', value: 'Graduate', countKey: 'Graduate' },
        { label: 'Postgraduate', value: 'Postgraduate', countKey: 'Postgraduate' }
      ]
    },
    {
      key: 'experience',
      title: 'Experience',
      options: [
        { label: 'Fresher', value: 'Fresher', countKey: 'Fresher' },
        { label: '0–1 Years', value: '0–1 Years', countKey: '0–1 Years' },
        { label: '1–3 Years', value: '1–3 Years', countKey: '1–3 Years' },
        { label: '3+ Years', value: '3+ Years', countKey: '3+ Years' },
        { label: 'Not Required', value: 'Not Required', countKey: 'Not Required' }
      ]
    },
    {
      key: 'ageRange',
      title: 'Age Range',
      options: [
        { label: '18–25 Years', value: '18-25 Years', countKey: '18-25 Years' },
        { label: '26–35 Years', value: '26-35 Years', countKey: '26-35 Years' },
        { label: '36+ Years', value: '36+ Years', countKey: '36+ Years' }
      ]
    },
    {
      key: 'category',
      title: 'Category / Sector',
      options: [
        { label: 'Railway', value: 'Railway', countKey: 'Railway' },
        { label: 'Banking', value: 'Banking', countKey: 'Banking' },
        { label: 'Teaching', value: 'Teaching', countKey: 'Teaching' },
        { label: 'Defence', value: 'Defence', countKey: 'Defence' },
        { label: 'Police', value: 'Police', countKey: 'Police' },
        { label: 'SSC', value: 'SSC', countKey: 'SSC' },
        { label: 'State Government', value: 'State Government', countKey: 'State Government' },
        { label: 'IT / Private Sector', value: 'IT / Private Sector', countKey: 'IT / Private Sector' }
      ]
    },
    {
      key: 'status',
      title: 'Application Status',
      options: [
        { label: 'Application Open', value: 'open', countKey: 'open' },
        { label: 'Upcoming', value: 'upcoming', countKey: 'upcoming' },
        { label: 'Closed', value: 'closed', countKey: 'closed' }
      ]
    }
  ];

  const totalSelectedCount = Object.values(selectedFilters).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : arr ? 1 : 0),
    0
  );

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
        aria-label="Filter Jobs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag / Handle Indicator */}
        <div className="search-filter-drawer-handle" aria-hidden="true" />

        {/* Header */}
        <div className="search-filter-drawer-header">
          <div className="search-filter-drawer-title-row">
            <SlidersHorizontal size={18} className="search-filter-drawer-icon" />
            <h2 className="search-filter-drawer-title">Filter Jobs</h2>
            {totalSelectedCount > 0 && (
              <span className="search-filter-drawer-badge">
                {totalSelectedCount} active
              </span>
            )}
          </div>

          <div className="search-filter-drawer-header-actions">
            {totalSelectedCount > 0 && (
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
          {filterGroups.map((group) => {
            const isOpenSection = openSections[group.key];
            const groupCounts = filterCounts[group.key] || {};
            const selectedInGroup = selectedFilters[group.key] || [];

            return (
              <div key={group.key} className="filter-group" style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div
                  className="filter-group-header"
                  onClick={() => toggleSection(group.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection(group.key);
                    }
                  }}
                  aria-expanded={isOpenSection}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}
                >
                  <span style={{ color: '#1e293b' }}>{group.title}</span>
                  {isOpenSection ? <ChevronUp size={15} color="#64748b" /> : <ChevronDown size={15} color="#64748b" />}
                </div>

                {isOpenSection && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                    {group.options.map((opt) => {
                      const isChecked = selectedInGroup.includes(opt.value);
                      const count = groupCounts[opt.countKey] !== undefined ? groupCounts[opt.countKey] : 0;

                      return (
                        <label
                          key={opt.value}
                          className={`search-filter-checkbox-item ${isChecked ? 'checked' : ''}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            minHeight: 42,
                            borderRadius: 6,
                            backgroundColor: isChecked ? '#eff6ff' : '#f8fafc',
                            border: `1px solid ${isChecked ? '#bfdbfe' : '#f1f5f9'}`,
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxToggle(group.key, opt.value)}
                              style={{ width: 16, height: 16, accentColor: '#0755d9' }}
                            />
                            <span style={{ fontSize: 13, color: isChecked ? '#073b82' : '#334155', fontWeight: isChecked ? 600 : 400 }}>
                              {opt.label}
                            </span>
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, backgroundColor: isChecked ? '#bfdbfe' : '#e2e8f0', color: isChecked ? '#1e40af' : '#475569', padding: '1px 6px', borderRadius: 9999 }}>
                            {count}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sticky Footer Actions */}
        <div className="search-filter-drawer-footer">
          <button
            type="button"
            className="search-filter-drawer-btn-clear"
            onClick={onClearAll}
            disabled={totalSelectedCount === 0}
            aria-disabled={totalSelectedCount === 0}
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
                ? `Show ${totalResults} Job${totalResults === 1 ? '' : 's'}`
                : 'Apply Filters'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

