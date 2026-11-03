import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export function JobFilters({
  selectedFilters,
  onFilterChange,
  onClearAll,
  filterCounts = {}
}) {
  // Collapsible state for each section
  const [openSections, setOpenSections] = useState({
    jobType: true,
    qualification: true,
    experience: true,
    ageRange: true,
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

  return (
    <aside className="filter-sidebar" aria-label="Job filters">
      <div className="filter-sidebar-header">
        <div className="filter-sidebar-title">
          <Filter size={16} color="#0755d9" />
          <span>Filters</span>
          {totalSelectedCount > 0 && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: '#eaf2ff',
                color: '#0755d9',
                padding: '2px 6px',
                borderRadius: 9999
              }}
            >
              {totalSelectedCount}
            </span>
          )}
        </div>

        {totalSelectedCount > 0 && (
          <button
            type="button"
            className="filter-clear-all-btn"
            onClick={onClearAll}
            title="Clear all active filters"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <RotateCcw size={11} />
              <span>Clear All</span>
            </span>
          </button>
        )}
      </div>

      {filterGroups.map((group) => {
        const isOpen = openSections[group.key];
        const groupCounts = filterCounts[group.key] || {};
        const selectedInGroup = selectedFilters[group.key] || [];

        return (
          <div key={group.key} className="filter-group">
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
              aria-expanded={isOpen}
            >
              <span>{group.title}</span>
              {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>

            {isOpen && (
              <div className="filter-options-list">
                {group.options.map((opt) => {
                  const isChecked = selectedInGroup.includes(opt.value);
                  const count = groupCounts[opt.countKey] !== undefined ? groupCounts[opt.countKey] : 0;

                  return (
                    <label key={opt.value} className="filter-checkbox-label">
                      <div className="filter-checkbox-left">
                        <input
                          type="checkbox"
                          className="filter-checkbox-input"
                          checked={isChecked}
                          onChange={() => handleCheckboxToggle(group.key, opt.value)}
                        />
                        <span>{opt.label}</span>
                      </div>
                      <span className="filter-count-badge">{count}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

