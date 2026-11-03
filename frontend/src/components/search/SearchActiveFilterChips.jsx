import React from 'react';
import { X, RotateCcw } from 'lucide-react';

/**
 * Active filter chips bar for the search results page
 */
export function SearchActiveFilterChips({
  selectedFilters = {},
  onRemoveFilter,
  onClearAll
}) {
  const chips = [];

  // Group label helper
  const getGroupLabel = (groupKey, val) => {
    switch (groupKey) {
      case 'org':
        return `Org: ${val}`;
      case 'status':
        if (val.toLowerCase() === 'open') return 'Status: Apply Open';
        return `Status: ${val}`;
      case 'jobType':
        return val.toLowerCase() === 'government' ? 'Government Job' : 'Private Job';
      case 'qualification':
        return `Qual: ${val}`;
      case 'category':
        return `Category: ${val}`;
      case 'level':
        return `Level: ${val}`;
      default:
        return `${groupKey}: ${val}`;
    }
  };

  Object.entries(selectedFilters).forEach(([groupKey, values]) => {
    if (Array.isArray(values)) {
      values.forEach((val) => {
        chips.push({
          groupKey,
          value: val,
          label: getGroupLabel(groupKey, val)
        });
      });
    } else if (values) {
      chips.push({
        groupKey,
        value: values,
        label: getGroupLabel(groupKey, values)
      });
    }
  });

  if (chips.length === 0) return null;

  return (
    <div className="search-active-chips-bar" aria-label="Active filters">
      <span className="search-active-chips-label">Active Filters:</span>

      <div className="search-active-chips-list">
        {chips.map((chip) => (
          <span key={`${chip.groupKey}-${chip.value}`} className="search-active-chip">
            <span>{chip.label}</span>
            <button
              type="button"
              className="search-active-chip-remove"
              onClick={() => onRemoveFilter(chip.groupKey, chip.value)}
              title={`Remove ${chip.label}`}
              aria-label={`Remove filter ${chip.label}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="search-active-clear-all"
        onClick={onClearAll}
        title="Clear all active filters"
      >
        <RotateCcw size={12} />
        <span>Clear All</span>
      </button>
    </div>
  );
}

