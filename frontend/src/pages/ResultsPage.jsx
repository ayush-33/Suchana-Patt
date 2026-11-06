import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Calendar, Building } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getResults } from '../services/resultsService';
import { useViewport } from '../hooks/useViewport';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';

function ResultsCard({ res }) {
  return (
    <div className="mini-listing-card results-card-item">
      <div className="mini-card-top">
        <div className="mini-card-header">
          <Badge
            type={res.status === 'Declared' ? 'open' : 'upcoming'}
            text={res.status}
          />
          <span className="mini-card-category-tag">{res.category}</span>
        </div>

        <h3 className="mini-card-title">
          {res.relatedJobId ? (
            <Link to={`/jobs/${res.relatedJobId}`}>{res.examName}</Link>
          ) : (
            res.examName
          )}
        </h3>

        <div className="mini-card-org">
          <Building size={14} className="mini-card-org-icon" />
          <span>{res.organization}</span>
        </div>

        {res.cutOffMarks && (
          <div className="results-cutoff-box">
            <strong>Cutoff:</strong> {res.cutOffMarks}
          </div>
        )}
      </div>

      <div className="card-flex-spacer" />

      <div className="mini-card-footer">
        <div className="mini-card-details-row">
          <div className="results-date-meta">
            <Calendar size={13} className="results-date-icon" />
            <span>Declared: <strong>{res.declarationDateText}</strong></span>
          </div>

          <div className="results-actions-cell">
            {res.resultUrl ? (
              <a
                href={res.resultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mini-card-action-btn results-action-btn"
                title="View official scorecard"
              >
                <ExternalLink size={12} />
                <span>Scorecard</span>
              </a>
            ) : (
              <span className="results-status-label">{res.status}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultsPage() {
  const { isMobile } = useViewport(768);
  const [resultsList, setResultsList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getResults({
          search,
          status: statusFilter,
          category: categoryFilter,
          page: currentPage,
          limit: 8
        });
        setResultsList(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load results', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, statusFilter, categoryFilter, currentPage]);

  const breadcrumbs = [{ label: 'Results', to: '/results' }];

  if (isMobile) {
    return <MobileCategoryListingPage categorySlug="results" />;
  }

  return (
    <div className="page-container main-content results-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          Sarkari Exam Results & Cut-off Marks 2026
        </h1>
        <p className="listing-page-subtitle">
          Check official recruitment examination results, merit lists, normalized scorecards, and category-wise cutoffs.
        </p>
      </div>

      {/* Toolbar */}
      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search exam name or organization..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search exam results by exam name or organization"
          />
        </div>

        <div className="listing-controls-row">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="sort-select listing-select"
            aria-label="Filter results by status"
          >
            <option value="all">All Statuses</option>
            <option value="Declared">Declared</option>
            <option value="Under Evaluation">Under Evaluation</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="sort-select listing-select"
            aria-label="Filter results by category"
          >
            <option value="all">All Categories</option>
            <option value="SSC">SSC</option>
            <option value="Banking">Banking</option>
            <option value="Railway">Railway</option>
            <option value="State Government">State Government</option>
            <option value="Police">Police</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading results...</div>
      ) : resultsList.length === 0 ? (
        <EmptyState
          title="No Results Found"
          description="We could not find any result notices matching your criteria."
          actionText="Reset Filters"
          onActionClick={() => {
            setSearch('');
            setStatusFilter('all');
            setCategoryFilter('all');
          }}
        />
      ) : (
        <>
          <div className="four-card-grid results-cards-grid">
            {resultsList.map((res) => (
              <ResultsCard key={res.id} res={res} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={8}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </>
      )}
    </div>
  );
}
