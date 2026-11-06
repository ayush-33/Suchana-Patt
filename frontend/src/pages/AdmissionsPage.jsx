import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Building } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getAdmissions } from '../services/admissionsService';
import { formatDate } from '../utils/formatters';
import { useViewport } from '../hooks/useViewport';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';

export function AdmissionsPage() {
  const { isMobile } = useViewport(768);
  const [admissions, setAdmissions] = useState([]);
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
        const res = await getAdmissions({
          search,
          status: statusFilter,
          page: currentPage,
          limit: 6
        });
        setAdmissions(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load admissions', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, statusFilter, currentPage]);

  const breadcrumbs = [{ label: 'Admissions', to: '/admissions' }];

  if (isMobile) {
    return <MobileCategoryListingPage categorySlug="admissions" />;
  }

  return (
    <div className="page-container main-content admissions-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          College & University Admissions 2026–27
        </h1>
        <p className="listing-page-subtitle">
          National & State level entrance examinations, counseling schedules, and eligibility criteria for Higher Education.
        </p>
      </div>

      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search admission or course..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search admissions by course or institution"
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
            aria-label="Filter admissions by status"
          >
            <option value="all">All Application Statuses</option>
            <option value="Open">Application Open</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading admissions...</div>
      ) : admissions.length === 0 ? (
        <EmptyState
          title="No Admission Circulars Found"
          description="Try modifying search keywords or clearing status filters."
          actionText="Clear Search"
          onActionClick={() => setSearch('')}
        />
      ) : (
        <>
          <div className="two-card-listing-grid">
            {admissions.map((adm) => (
              <div key={adm.id} className="details-panel admission-card-item">
                <div className="admission-card-header">
                  <Badge type={adm.status === 'Open' ? 'open' : 'upcoming'} text={adm.status} />
                  <span className="admission-category-tag">
                    {adm.programCategory}
                  </span>
                </div>

                <h3 className="admission-card-title">
                  {adm.title}
                </h3>

                <div className="admission-card-org">
                  <Building size={14} className="admission-org-icon" />
                  <span>{adm.institution}</span>
                </div>

                <p className="admission-card-desc">
                  {adm.description}
                </p>

                <div className="admission-meta-box">
                  <div className="admission-meta-row">
                    <strong>Required Qualification:</strong> <span>{adm.qualification || 'Refer to official admission brochure'}</span>
                  </div>
                  <div className="admission-meta-row">
                    <strong>Exam Schedule:</strong> <span>{adm.examDateText || 'To be announced'}</span>
                  </div>
                  <div className="admission-meta-row">
                    <strong>Application Fee:</strong> <span>{adm.applicationFee || 'Refer to notification brochure'}</span>
                  </div>
                </div>

                <div className="card-flex-spacer" />

                <div className="admission-card-footer">
                  <span className="admission-last-date">
                    Last Date: <strong className="admission-deadline-highlight">{formatDate(adm.lastDate)}</strong>
                  </span>

                  {adm.officialUrl ? (
                    <a
                      href={adm.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view-details admission-action-btn"
                    >
                      <span>Official Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="admission-action-unavailable">Portal Link Awaited</span>
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
