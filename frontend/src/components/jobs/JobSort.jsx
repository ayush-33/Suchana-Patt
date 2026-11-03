import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function JobSort({ value, onChange }) {
  return (
    <div className="results-toolbar-right">
      <label htmlFor="job-sort-select" className="sort-control-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <ArrowUpDown size={14} />
        <span>Sort By:</span>
      </label>
      <select
        id="job-sort-select"
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort jobs by"
      >
        <option value="latest">Latest First</option>
        <option value="oldest">Oldest First</option>
        <option value="lastDateAsc">Application Deadline: Soonest</option>
        <option value="lastDateDesc">Application Deadline: Latest</option>
        <option value="titleAsc">Job Title: A–Z</option>
        <option value="vacanciesDesc">Vacancies: Highest First</option>
      </select>
    </div>
  );
}

