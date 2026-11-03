import React from 'react';
import { ArrowUpDown } from 'lucide-react';

/**
 * Search sorting dropdown control
 */
export function SearchSort({ value = 'relevance', onChange }) {
  return (
    <div className="search-sort-wrapper">
      <label htmlFor="search-sort-select" className="search-sort-label">
        <ArrowUpDown size={14} />
        <span>Sort By:</span>
      </label>
      <select
        id="search-sort-select"
        className="search-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort search results"
      >
        <option value="relevance">Most Relevant</option>
        <option value="latest">Latest Posted</option>
        <option value="deadline">Application Deadline</option>
        <option value="vacanciesDesc">Most Vacancies</option>
        <option value="titleAsc">Job Title: A–Z</option>
      </select>
    </div>
  );
}

