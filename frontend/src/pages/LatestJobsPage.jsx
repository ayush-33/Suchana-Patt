import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { JobCard } from '../components/jobs/JobCard';
import { JobFilters } from '../components/jobs/JobFilters';
import { JobFilterDrawer } from '../components/jobs/JobFilterDrawer';
import { JobSort } from '../components/jobs/JobSort';
import { ActiveFilterChips } from '../components/jobs/ActiveFilterChips';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';
import { getJobs } from '../services/jobsService';
import { useViewport } from '../hooks/useViewport';

export function LatestJobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile, isDesktop } = useViewport(768);

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Parse filters from URL search params
  const searchQuery = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'latest';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const selectedFilters = useMemo(() => {
    return {
      jobType: searchParams.getAll('jobType'),
      qualification: searchParams.getAll('qualification'),
      experience: searchParams.getAll('experience'),
      ageRange: searchParams.getAll('ageRange'),
      category: searchParams.getAll('category'),
      location: searchParams.getAll('location'),
      status: searchParams.getAll('status')
    };
  }, [searchParams]);

  const totalSelectedCount = useMemo(() => {
    return Object.values(selectedFilters).reduce(
      (acc, arr) => acc + (Array.isArray(arr) ? arr.length : arr ? 1 : 0),
      0
    );
  }, [selectedFilters]);

  const [jobsData, setJobsData] = useState({
    data: [],
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 12,
    filterCounts: {}
  });
  const [loading, setLoading] = useState(true);

  // Load jobs when URL params change
  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      setLoading(true);
      try {
        const response = await getJobs({
          search: searchQuery,
          jobType: selectedFilters.jobType,
          qualification: selectedFilters.qualification,
          experience: selectedFilters.experience,
          ageRange: selectedFilters.ageRange,
          category: selectedFilters.category,
          location: selectedFilters.location,
          status: selectedFilters.status,
          sort: currentSort,
          page: currentPage,
          limit: 12
        });

        if (!isCancelled) {
          setJobsData(response);
        }
      } catch (err) {
        console.error('Failed to load jobs list', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }
    loadData();

    return () => {
      isCancelled = true;
    };
  }, [searchQuery, selectedFilters, currentSort, currentPage]);

  // Update query params helper
  const updateParams = useCallback((newParams) => {
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
      return next;
    });
  }, [setSearchParams]);

  // Handler for filter changes
  const handleFilterChange = (groupKey, updatedList) => {
    updateParams({
      [groupKey]: updatedList,
      page: 1 // Reset pagination on filter change
    });
  };

  // Handler for single chip removal
  const handleRemoveFilter = (groupKey, value) => {
    const currentList = selectedFilters[groupKey] || [];
    const updated = currentList.filter((item) => item !== value);
    handleFilterChange(groupKey, updated);
  };

  // Handler for clearing search query
  const handleClearSearch = () => {
    updateParams({ search: '', page: 1 });
  };

  // Handler for clearing all filters
  const handleClearAll = () => {
    setSearchParams(new URLSearchParams());
  };

  // Handler for sort change
  const handleSortChange = (newSort) => {
    updateParams({ sort: newSort, page: 1 });
  };

  // Handler for page change
  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbs = [
    { label: 'Latest Jobs', to: '/latest-jobs' }
  ];

  if (isMobile) {
    const mobileCat = selectedFilters.category?.[0]?.toLowerCase() || 'latest-jobs';
    return <MobileCategoryListingPage categorySlug={mobileCat} />;
  }

  return (
    <div className="page-container main-content latest-jobs-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="marketplace-layout">
        {/* Left Filter Sidebar (Desktop >= 768px) */}
        {isDesktop && (
          <JobFilters
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            filterCounts={jobsData.filterCounts}
          />
        )}

        {/* Right Results Area */}
        <main className="results-area">
          {/* Active Filter Chips */}
          <ActiveFilterChips
            selectedFilters={selectedFilters}
            searchQuery={searchQuery}
            onRemoveFilter={handleRemoveFilter}
            onClearSearch={handleClearSearch}
            onClearAll={handleClearAll}
          />

          {/* Results Toolbar */}
          <div className="results-toolbar">
            <div className="results-toolbar-left">
              <span className="results-count-text">
                {loading ? (
                  'Updating results...'
                ) : (
                  <>
                    Showing <strong>{jobsData.data.length}</strong> of <strong>{jobsData.total}</strong> notifications
                    {searchQuery && ` for "${searchQuery}"`}
                  </>
                )}
              </span>
            </div>

            <div className="results-toolbar-controls">
              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                className="mobile-job-filter-btn"
                onClick={() => setIsFilterDrawerOpen(true)}
                aria-label={`Open job filters panel. ${totalSelectedCount} active filters.`}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                {totalSelectedCount > 0 && (
                  <span className="mobile-job-filter-badge">{totalSelectedCount}</span>
                )}
              </button>

              <JobSort value={currentSort} onChange={handleSortChange} />
            </div>
          </div>

          {/* Job Cards Grid or Empty State */}
          {loading ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748b' }}>
              Loading job listings...
            </div>
          ) : jobsData.data.length === 0 ? (
            <EmptyState
              title="No Job Notifications Match Your Filters"
              description="We could not find any active vacancies matching your selected filters or search terms. Try clearing some criteria to explore more opportunities."
              actionText="Clear All Filters"
              onActionClick={handleClearAll}
            />
          ) : (
            <>
              <div className="results-job-grid">
                {jobsData.data.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={jobsData.page}
                totalPages={jobsData.totalPages}
                totalItems={jobsData.total}
                pageSize={jobsData.limit}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>

        {/* Mobile Filter Drawer */}
        <JobFilterDrawer
          isOpen={isMobile && isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          filterCounts={jobsData.filterCounts}
          totalResults={jobsData.total}
        />
      </div>
    </div>
  );
}
