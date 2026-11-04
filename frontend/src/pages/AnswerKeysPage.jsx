import React, { useState, useEffect } from 'react';
import { Search, Download, Building } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Badge } from '../components/common/Badge';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getAnswerKeys } from '../services/answerKeysService';

export function AnswerKeysPage() {
  const [answerKeys, setAnswerKeys] = useState([]);
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
        const res = await getAnswerKeys({
          search,
          status: statusFilter,
          page: currentPage,
          limit: 6
        });
        setAnswerKeys(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load answer keys', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, statusFilter, currentPage]);

  const breadcrumbs = [{ label: 'Answer Keys', to: '/answer-keys' }];

  return (
    <div className="page-container main-content answer-keys-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          Provisional & Final Answer Keys 2026
        </h1>
        <p className="listing-page-subtitle">
          Review candidate response sheets, provisional keys, objection submission windows, and master key sets.
        </p>
      </div>

      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search answer key or commission..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search answer keys"
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
            aria-label="Filter answer keys by status"
          >
            <option value="all">All Release Statuses</option>
            <option value="Objection Open">Objection Window Open</option>
            <option value="Final Key">Final Key Released</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading answer keys...</div>
      ) : answerKeys.length === 0 ? (
        <EmptyState
          title="No Answer Keys Found"
          description="Try modifying search keywords or clearing filters."
          actionText="Clear Search"
          onActionClick={() => {
            setSearch('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <>
          <div className="two-card-listing-grid">
            {answerKeys.map((ak) => (
              <div key={ak.id} className="details-panel answer-key-card-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Badge
                    type={ak.status.includes('Open') ? 'upcoming' : 'open'}
                    text={ak.status}
                  />
                  <span className="answer-key-category-tag">{ak.category}</span>
                </div>

                <h3 className="answer-key-card-title">
                  {ak.examName}
                </h3>

                <div className="answer-key-card-org">
                  <Building size={14} />
                  <span>{ak.organization}</span>
                </div>

                <p className="answer-key-card-desc">
                  {ak.summary}
                </p>

                <div className="answer-key-meta-box">
                  <div><strong>Released On:</strong> {ak.releaseDateText}</div>
                  <div style={{ marginTop: 4 }}>
                    <strong>Objection Window:</strong>{' '}
                    <span className={`objection-window-val ${ak.objectionLastDate === 'Closed' ? 'closed' : 'open'}`}>
                      {ak.objectionLastDate}
                    </span>
                  </div>
                  {ak.feePerQuestion && (
                    <div style={{ marginTop: 4 }}><strong>Objection Fee:</strong> {ak.feePerQuestion}</div>
                  )}
                </div>

                <div className="card-flex-spacer" />

                <div className="answer-key-card-footer listing-card-footer">
                  {ak.downloadUrl && (
                    <a
                      href={ak.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view-details answer-key-action-btn"
                    >
                      <Download size={13} />
                      <span>Download Key & Response Sheet</span>
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
