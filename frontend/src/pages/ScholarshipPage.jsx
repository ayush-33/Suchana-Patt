import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Building } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getScholarships } from '../services/scholarshipService';
import { formatDate } from '../utils/formatters';
import { useViewport } from '../hooks/useViewport';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';

export function ScholarshipPage() {
  const { isMobile } = useViewport(768);
  const [scholarships, setScholarships] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getScholarships({
          search,
          status: statusFilter,
          page: currentPage,
          limit: 6
        });
        setScholarships(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load scholarships', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, statusFilter, currentPage]);

  const breadcrumbs = [{ label: 'Scholarships', to: '/up-scholarship' }];

  if (isMobile) {
    return <MobileCategoryListingPage categorySlug="scholarships" />;
  }

  return (
    <div className="page-container main-content scholarship-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          UP Scholarship & National Scholarships 2026–27
        </h1>
        <p className="listing-page-subtitle">
          Pre-Matric, Post-Matric, and Dashmottar fee reimbursement schemes for students in Uttar Pradesh and National Scholarship Portal (NSP).
        </p>
      </div>

      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search scholarship or level..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search scholarships"
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
            aria-label="Filter scholarships by status"
          >
            <option value="all">All Statuses</option>
            <option value="Open">Application Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading scholarships...</div>
      ) : scholarships.length === 0 ? (
        <EmptyState
          title="No Scholarship Schemes Found"
          description="Adjust your search criteria to find available financial aid programs."
          actionText="Clear Filters"
          onActionClick={() => {
            setSearch('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <>
          <div className="two-card-listing-grid">
            {scholarships.map((sch) => (
              <div key={sch.id} className="details-panel scholarship-card-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Badge type={sch.status === 'Open' ? 'open' : 'closed'} text={sch.status} />
                  <span className="scholarship-amount-text">
                    {sch.amountText}
                  </span>
                </div>

                <h3 className="scholarship-card-title">
                  {sch.title}
                </h3>

                <div className="scholarship-card-org">
                  <Building size={14} />
                  <span>{sch.department}</span>
                </div>

                <p className="scholarship-card-desc">
                  {sch.description}
                </p>

                <div className="scholarship-meta-box">
                  <div><strong>Student Level:</strong> {sch.studentLevel}</div>
                  <div style={{ marginTop: 4 }}><strong>Income & Eligibility:</strong> {sch.eligibilityCriteria}</div>
                </div>

                <div className="card-flex-spacer" />

                <div className="scholarship-card-footer listing-card-footer">
                  <span className="scholarship-last-date">
                    Last Date: <strong className="scholarship-last-date-val">{formatDate(sch.lastDate)}</strong>
                  </span>

                  {sch.officialPortalUrl && (
                    <a
                      href={sch.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view-details scholarship-action-btn"
                    >
                      <span>Scholarship Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={total}
            pageSize={6}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </>
      )}
    </div>
  );
}
