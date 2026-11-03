import React from 'react';
import { X, RotateCcw } from 'lucide-react';

export function ActiveFilterChips({
  selectedFilters,
  searchQuery,
  onRemoveFilter,
  onClearSearch,
  onClearAll
}) {
  const chips = [];

  // Search chip
  if (searchQuery) {
    chips.push({
      type: 'search',
      label: `Search: "${searchQuery}"`,
      remove: onClearSearch
    });
  }

  // Iterate over selectedFilters
  Object.entries(selectedFilters).forEach(([groupKey, values]) => {
    if (Array.isArray(values)) {
      values.forEach((val) => {
        let displayVal = val;
        if (val === 'government') displayVal = 'Government Job';
        if (val === 'private') displayVal = 'Private Job';
        if (val === 'open') displayVal = 'Apply Open';

        chips.push({
          type: groupKey,
          value: val,
          label: displayVal,
          remove: () => onRemoveFilter(groupKey, val)
        });
      });
    } else if (values) {
      chips.push({
        type: groupKey,
        value: values,
        label: values,
        remove: () => onRemoveFilter(groupKey, values)
      });
    }
  });

  if (chips.length === 0) return null;

  return (
    <div className="active-chips-bar" aria-label="Active filters">
      <span className="active-chips-label">Active Filters:</span>

      {chips.map((chip, idx) => (
        <span key={`${chip.type}-${chip.value || idx}`} className="filter-chip">
          <span>{chip.label}</span>
          <button
            type="button"
            className="filter-chip-remove"
            onClick={chip.remove}
            title={`Remove ${chip.label}`}
            aria-label={`Remove filter ${chip.label}`}
          >
            <X size={13} />
          </button>
        </span>
      ))}

      <button
        type="button"
        className="filter-clear-all-btn"
        onClick={onClearAll}
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}
      >
        <RotateCcw size={12} />
        <span>Clear All</span>
      </button>
    </div>
  );
}

