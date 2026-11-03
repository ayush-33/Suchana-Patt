import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, Calendar, Building } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getAdmitCards } from '../services/admitCardsService';

export function AdmitCardsPage() {
  const [admitCards, setAdmitCards] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getAdmitCards({
          search,
          status: statusFilter,
          category: categoryFilter,
          sort,
          page: currentPage,
          limit: 8
        });
        setAdmitCards(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load admit cards', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, statusFilter, categoryFilter, sort, currentPage]);

  const breadcrumbs = [{ label: 'Admit Cards', to: '/admit-cards' }];

  return (
    <div className="page-container main-content admit-cards-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          Admit Cards & Hall Tickets 2026–27
        </h1>
        <p className="listing-page-subtitle">
          Download official hall tickets, call letters, and city intimation slips for Central and State government examinations.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search by exam or commission..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search admit cards by exam name or organization"
          />
        </div>

        <div className="listing-controls-row">
          {/* Status select */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-select filter-select-status"
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="Released">Released</option>
            <option value="Coming Soon">Coming Soon</option>
            <option value="Not Available">Not Available</option>
          </select>

          {/* Category select */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-select filter-select-category"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="SSC">SSC</option>
            <option value="Railway">Railway</option>
            <option value="Banking">Banking</option>
            <option value="Police">Police</option>
            <option value="Teaching">Teaching</option>
            <option value="Defence">Defence</option>
          </select>

          {/* Sort select */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-select sort-select filter-select-sort"
            aria-label="Sort admit cards"
          >
            <option value="latest">Latest Released</option>
            <option value="examDateAsc">Exam Date: Soonest</option>
          </select>
        </div>
      </div>

      {/* Grid of Admit Cards */}
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading admit cards...</div>
      ) : admitCards.length === 0 ? (
        <EmptyState
          title="No Admit Cards Found"
          description="There are currently no admit cards matching your filter parameters."
          actionText="Reset Filters"
          onActionClick={() => {
            setSearch('');
            setStatusFilter('all');
            setCategoryFilter('all');
          }}
        />
      ) : (
        <>
          <div className="four-card-grid admit-cards-grid">
            {admitCards.map((ac) => (
              <div key={ac.id} className="mini-listing-card admit-card-item">
                <div className="mini-card-top">
                  <div className="mini-card-header">
                    <Badge
                      type={ac.status === 'Released' ? 'released' : ac.status === 'Coming Soon' ? 'upcoming' : 'closed'}
                      text={ac.status}
                    />
                    <span className="mini-card-category-tag">{ac.category}</span>
                  </div>

                  <h3 className="mini-card-title">
                    {ac.relatedJobId ? (
                      <Link to={`/jobs/${ac.relatedJobId}`}>{ac.examName}</Link>
                    ) : (
                      ac.examName
                    )}
                  </h3>

                  <div className="mini-card-org">
                    <Building size={14} className="mini-card-org-icon" />
                    <span>{ac.organization}</span>
                  </div>

                  {ac.instructions && (
                    <div className="admit-card-notice">
                      {ac.instructions}
                    </div>
                  )}
                </div>

                <div className="mini-card-footer">
                  <div className="mini-card-details-row">
                    <div className="admit-card-date-meta">
                      <Calendar size={13} className="admit-card-date-icon" />
                      <span>Exam: <strong>{ac.examDateText}</strong></span>
                    </div>

                    {ac.downloadUrl ? (
                      <a
                        href={ac.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mini-card-action-btn"
                        title="Download official hall ticket"
                      >
                        <Download size={13} />
                        <span>Download</span>
                      </a>
                    ) : (
                      <span className="admit-card-status-label">{ac.status}</span>
                    )}
                  </div>
                </div>
              </div>
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
