import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Briefcase,
  CreditCard,
  Award,
  GraduationCap,
  CheckCircle2,
  FileText,
  KeyRound,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SearchJobCard } from '../components/search/SearchJobCard';
import { Pagination } from '../components/jobs/Pagination';
import { SearchFilterSidebar } from '../components/search/SearchFilterSidebar';
import { SearchFilterDrawer } from '../components/search/SearchFilterDrawer';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { SearchSort } from '../components/search/SearchSort';
import { SearchActiveFilterChips } from '../components/search/SearchActiveFilterChips';
import { searchAll } from '../services/searchService';
import { useViewport } from '../hooks/useViewport';

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isMobile } = useViewport(768);

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Primary URL state
  const query = searchParams.get('q') || '';
  const activeType = searchParams.get('type') || 'all';
  const currentSort = searchParams.get('sort') || 'relevance';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Secondary faceted filters parsed from URL
  const selectedFilters = useMemo(() => {
    return {
      org: searchParams.getAll('org'),
      status: searchParams.getAll('status'),
      jobType: searchParams.getAll('jobType'),
      qualification: searchParams.getAll('qualification'),
      category: searchParams.getAll('category'),
      level: searchParams.getAll('level')
    };
  }, [searchParams]);

  // Total count of active secondary filters
  const totalActiveFilterCount = useMemo(() => {
    return Object.values(selectedFilters).reduce((acc, list) => {
      return acc + (Array.isArray(list) ? list.length : list ? 1 : 0);
    }, 0);
  }, [selectedFilters]);

  // Search results state
  const [searchData, setSearchData] = useState({
    query: '',
    tokens: [],
    counts: {
      all: 0,
      jobs: 0,
      'admit-cards': 0,
      results: 0,
      admissions: 0,
      scholarships: 0,
      syllabus: 0,
      'answer-keys': 0
    },
    availableFilters: {
      organizations: [],
      statuses: [],
      jobTypes: [],
      qualifications: [],
      categories: [],
      levels: []
    },
    totalMatchesInType: 0,
    totalFiltered: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    startIndex: 0,
    endIndex: 0,
    results: []
  });
  const [loading, setLoading] = useState(false);

  // Filter keys for easy reset
  const secondaryFilterKeys = useMemo(
    () => ['org', 'status', 'jobType', 'qualification', 'category', 'level'],
    []
  );

  // Perform search whenever query, category tab, sort, page, or filters change in URL
  useEffect(() => {
    let isCancelled = false;

    async function executeSearch() {
      if (!query.trim()) {
        setSearchData({
          query: '',
          tokens: [],
          counts: {
            all: 0,
            jobs: 0,
            'admit-cards': 0,
            results: 0,
            admissions: 0,
            scholarships: 0,
            syllabus: 0,
            'answer-keys': 0
          },
          availableFilters: {
            organizations: [],
            statuses: [],
            jobTypes: [],
            qualifications: [],
            categories: [],
            levels: []
          },
          totalMatchesInType: 0,
          totalFiltered: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
          startIndex: 0,
          endIndex: 0,
          results: []
        });
        return;
      }

      setLoading(true);
      try {
        const data = await searchAll(query, {
          activeType,
          filters: {
            organization: selectedFilters.org,
            status: selectedFilters.status,
            jobType: selectedFilters.jobType,
            qualification: selectedFilters.qualification,
            category: selectedFilters.category,
            level: selectedFilters.level
          },
          sort: currentSort,
          page: currentPage,
          limit: 10
        });

        if (!isCancelled) {
          setSearchData(data);
        }
      } catch (err) {
        console.error('Search execution failed', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    executeSearch();

    return () => {
      isCancelled = true;
    };
  }, [query, activeType, currentSort, currentPage, selectedFilters]);

  // Update query params helper
  const updateParams = useCallback(
    (newParams, resetPage = true) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(newParams).forEach(([key, value]) => {
          next.delete(key);
          if (Array.isArray(value)) {
            value.forEach((v) => next.append(key, v));
          } else if (value !== undefined && value !== null && value !== '') {
            next.set(key, value);
          }
        });

        if (resetPage && !('page' in newParams)) {
          next.delete('page');
        }

        return next;
      });
    },
    [setSearchParams]
  );

  // Switch category tab
  const handleTypeChange = (newType) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newType === 'all') {
        next.delete('type');
      } else {
        next.set('type', newType);
      }
      // Reset secondary filters and pagination when switching category tabs
      secondaryFilterKeys.forEach((k) => next.delete(k));
      next.delete('page');
      return next;
    });
  };

  // Toggle single filter value (checkbox in sidebar or drawer)
  const handleToggleFilter = (groupKey, value) => {
    const currentList = selectedFilters[groupKey] || [];
    const exists = currentList.some((item) => item.toLowerCase() === String(value).toLowerCase());
    const updated = exists
      ? currentList.filter((item) => item.toLowerCase() !== String(value).toLowerCase())
      : [...currentList, value];

    updateParams({ [groupKey]: updated });
  };

  // Remove single active filter chip
  const handleRemoveFilter = (groupKey, value) => {
    const currentList = selectedFilters[groupKey] || [];
    const updated = currentList.filter(
      (item) => item.toLowerCase() !== String(value).toLowerCase()
    );
    updateParams({ [groupKey]: updated });
  };

  // Clear all secondary filters (keeps query and category tab)
  const handleClearAllFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      secondaryFilterKeys.forEach((k) => next.delete(k));
      next.delete('page');
      return next;
    });
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    updateParams({ sort: newSort });
  };

  // Handle pagination page change
  const handlePageChange = (newPage) => {
    updateParams({ page: newPage === 1 ? undefined : newPage }, false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Handle suggestion chip click
  const handleSuggestionClick = (keyword) => {
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const breadcrumbs = [
    { label: 'Search', to: '/search' },
    ...(query ? [{ label: `"${query}"` }] : [])
  ];

  const popularKeywords = [
    'SSC CGL',
    'Railway NTPC',
    'UP Police',
    'IBPS PO',
    'UP Scholarship',
    'JEE Main',
    'Admit Card',
    'Result'
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Results', count: searchData.counts.all, icon: Search },
    { id: 'jobs', label: 'Jobs', count: searchData.counts.jobs, icon: Briefcase },
    { id: 'admit-cards', label: 'Admit Cards', count: searchData.counts['admit-cards'], icon: CreditCard },
    { id: 'results', label: 'Results', count: searchData.counts.results, icon: Award },
    { id: 'admissions', label: 'Admissions', count: searchData.counts.admissions, icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships', count: searchData.counts.scholarships, icon: CheckCircle2 },
    { id: 'syllabus', label: 'Syllabus', count: searchData.counts.syllabus, icon: FileText },
    { id: 'answer-keys', label: 'Answer Keys', count: searchData.counts['answer-keys'], icon: KeyRound }
  ];

  const activeCategoryLabel = categoryTabs.find((t) => t.id === activeType)?.label || 'All Results';

  // Mobile drawer open state respects isMobile
  const isDrawerOpen = isMobile && isMobileFilterOpen;

  return (
    <div className="page-container main-content search-results-page-container" style={{ paddingTop: 16 }}>
      <Breadcrumbs items={breadcrumbs} />

      {/* Search Header Panel */}
      <div className="search-header-panel">
        <div className="search-header-meta">
          <span className="search-header-badge">
            <Sparkles size={13} />
            <span>Search Results</span>
          </span>
          {query ? (
            <h1 className="search-header-title">
              Results for <span className="search-query-highlight">"{query}"</span>
            </h1>
          ) : (
            <h1 className="search-header-title">Search Recruitment & Examinations</h1>
          )}
          <p className="search-header-subtitle">
            {query
              ? `Found ${searchData.counts.all} total item${searchData.counts.all === 1 ? '' : 's'} matching your search query across jobs, admit cards, results, and syllabus.`
              : 'Enter keywords in the search bar above to look up government jobs, admit cards, examination results, admissions, and scholarships.'}
          </p>
        </div>

        {/* Suggestion Chips */}
        <div className="search-suggestions-row">
          <span className="search-suggestions-label">Popular searches:</span>
          <div className="search-chips-list">
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                className="search-chip-btn"
                onClick={() => handleSuggestionClick(kw)}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {query ? (
        <>
          {/* Category Filter Tabs Bar */}
          <div className="search-category-tabs-bar" role="tablist" aria-label="Search result categories">
            <div className="search-category-tabs-scroll">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`search-category-tab ${isActive ? 'active' : ''}`}
                    onClick={() => handleTypeChange(tab.id)}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    <span className="search-tab-count">{tab.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results State Handling */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              Searching across portal data...
            </div>
          ) : searchData.counts.all === 0 ? (
            /* Empty State A: Query itself matched 0 items */
            <div className="search-empty-panel">
              <div className="search-empty-icon">
                <Search size={32} />
              </div>
              <h2 className="search-empty-title">
                No Results Found for "{query}"
              </h2>
              <p className="search-empty-desc">
                We couldn't find any recruitment records matching your search query.
                Try checking for typos or searching with broader keywords like <strong>SSC</strong>, <strong>Railway</strong>, <strong>Police</strong>, or <strong>UPSC</strong>.
              </p>
              <div className="search-empty-actions">
                <Link to="/latest-jobs" className="search-empty-btn-primary">
                  <span>Browse Latest Jobs</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            /* Two-Column Balanced Marketplace Layout (Desktop side-by-side, Mobile full-width with drawer) */
            <div className="search-marketplace-layout">
              {/* Left Column: Category-Aware Filter Sidebar (Desktop >= 768px) */}
              <SearchFilterSidebar
                activeType={activeType}
                availableFilters={searchData.availableFilters}
                selectedFilters={selectedFilters}
                onToggleFilter={handleToggleFilter}
                onClearAll={handleClearAllFilters}
              />

              {/* Right Column: Search Results Main Area */}
              <main className="search-results-main" aria-label="Search results content">
                {/* Active Filter Chips */}
                <SearchActiveFilterChips
                  selectedFilters={selectedFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                />

                {/* Results Toolbar: Count summary, Mobile Filter trigger, and Sorting */}
                <div className="search-results-toolbar">
                  <div className="search-results-toolbar-left">
                    <span className="search-results-count-text">
                      Showing <strong>{searchData.startIndex}–{searchData.endIndex}</strong> of{' '}
                      <strong>{searchData.totalFiltered}</strong> results in{' '}
                      <strong className="search-active-cat-label">{activeCategoryLabel}</strong>
                    </span>
                  </div>

                  <div className="search-results-toolbar-controls">
                    {/* Mobile Filters Trigger Button */}
                    <button
                      type="button"
                      className="mobile-search-filter-btn"
                      onClick={() => setIsMobileFilterOpen(true)}
                      aria-label={`Open filters panel. ${totalActiveFilterCount} filters applied.`}
                    >
                      <SlidersHorizontal size={15} />
                      <span>Filters</span>
                      {totalActiveFilterCount > 0 && (
                        <span className="mobile-search-filter-badge">{totalActiveFilterCount}</span>
                      )}
                    </button>

                    <SearchSort value={currentSort} onChange={handleSortChange} />
                  </div>
                </div>

                {/* Empty State B: Query matched items in portal, but active filters eliminated all results */}
                {searchData.totalFiltered === 0 ? (
                  <div className="search-empty-filters">
                    <div className="search-empty-icon">
                      <SlidersHorizontal size={28} />
                    </div>
                    <h2 className="search-empty-title">No Matches for Selected Filters</h2>
                    <p className="search-empty-desc">
                      We found <strong>{searchData.totalMatchesInType}</strong> notification{searchData.totalMatchesInType === 1 ? '' : 's'} for "{query}" in {activeCategoryLabel}, but none match your selected filter combination.
                    </p>
                    <div className="search-empty-actions">
                      <button
                        type="button"
                        className="search-empty-btn-primary"
                        onClick={handleClearAllFilters}
                      >
                        <RotateCcw size={14} />
                        <span>Clear Active Filters</span>
                      </button>
                      {activeType !== 'all' && (
                        <button
                          type="button"
                          className="search-empty-btn-secondary"
                          onClick={() => handleTypeChange('all')}
                        >
                          <span>Switch to All Categories ({searchData.counts.all})</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Single Vertical Column of Compact Horizontal Cards */}
                    <div className="search-results-list">
                      {searchData.results.map((item) => {
                        if (item.contentType === 'jobs') {
                          return <SearchJobCard key={item.id} job={item.raw} />;
                        }
                        return <SearchResultCard key={item.id} item={item} />;
                      })}
                    </div>

                    {/* Pagination Controls */}
                    <div className="search-pagination-wrapper">
                      <Pagination
                        currentPage={searchData.page}
                        totalPages={searchData.totalPages}
                        totalItems={searchData.totalFiltered}
                        pageSize={searchData.limit}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                )}
              </main>

              {/* Mobile Filter Drawer / Bottom Sheet */}
              <SearchFilterDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                activeType={activeType}
                availableFilters={searchData.availableFilters}
                selectedFilters={selectedFilters}
                onToggleFilter={handleToggleFilter}
                onClearAll={handleClearAllFilters}
                totalResults={searchData.totalFiltered}
              />
            </div>
          )}
        </>
      ) : (
        /* Empty Query Guide Panel */
        <div className="search-guide-panel">
          <div className="search-guide-icon">
            <Search size={36} />
          </div>
          <h2 className="search-guide-title">What are you looking for?</h2>
          <p className="search-guide-desc">
            Type any job role, recruiting body, or keyword in the top search bar. You can search across <strong>Government & Private Jobs</strong>, <strong>Admit Cards</strong>, <strong>Results</strong>, <strong>Admissions</strong>, <strong>Scholarships</strong>, and <strong>Syllabus</strong>.
          </p>
          <div className="search-guide-chips">
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                className="search-chip-btn large"
                onClick={() => handleSuggestionClick(kw)}
              >
                <span>{kw}</span>
                <ArrowRight size={13} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
