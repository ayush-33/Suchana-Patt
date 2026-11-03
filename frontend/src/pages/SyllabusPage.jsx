import React, { useState, useEffect } from 'react';
import { Search, Download, Building, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getSyllabus } from '../services/syllabusService';

export function SyllabusPage() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getSyllabus({
          search,
          category: categoryFilter,
          page: currentPage,
          limit: 6
        });
        setSyllabusList(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load syllabus', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, categoryFilter, currentPage]);

  const breadcrumbs = [{ label: 'Syllabus', to: '/syllabus' }];

  return (
    <div className="page-container main-content syllabus-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          Official Exam Syllabus & Test Patterns 2026
        </h1>
        <p className="listing-page-subtitle">
          Download authentic PDF syllabus, marking scheme, chapter distributions, and selection schemes for all competitive exams.
        </p>
      </div>

      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search exam syllabus..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search exam syllabus"
          />
        </div>

        <div className="listing-controls-row">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="sort-select listing-select"
            aria-label="Filter syllabus by category"
          >
            <option value="all">All Categories</option>
            <option value="SSC">SSC</option>
            <option value="Railway">Railway</option>
            <option value="Police">Police</option>
            <option value="Teaching">Teaching</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading syllabus...</div>
      ) : syllabusList.length === 0 ? (
        <EmptyState
          title="No Syllabus Records Found"
          description="Try modifying search keywords or clearing category filters."
          actionText="Clear Search"
          onActionClick={() => {
            setSearch('');
            setCategoryFilter('all');
          }}
        />
      ) : (
        <>
          <div className="two-card-listing-grid">
            {syllabusList.map((syl) => (
              <div key={syl.id} className="details-panel syllabus-card-item">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0755d9', backgroundColor: '#eaf2ff', padding: '3px 8px', borderRadius: 4 }}>
                    {syl.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{syl.fileSize}</span>
                </div>

                <h3 className="syllabus-card-title">
                  {syl.examName}
                </h3>

                <div className="syllabus-card-org">
                  <Building size={14} />
                  <span>{syl.organization} • {syl.examLevel}</span>
                </div>

                <p className="syllabus-card-desc">
                  {syl.summary}
                </p>

                {syl.sections && syl.sections.length > 0 && (
                  <div className="syllabus-meta-box">
                    <div style={{ fontWeight: 700, fontSize: 12, color: '#073b82', marginBottom: 6, textTransform: 'uppercase' }}>
                      Key Modules Covered:
                    </div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {syl.sections.map((sec, idx) => (
                        <li key={idx} style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                          <CheckCircle2 size={13} color="#0755d9" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="syllabus-card-footer listing-card-footer">
                  {syl.syllabusUrl && (
                    <a
                      href={syl.syllabusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view-details syllabus-action-btn"
                    >
                      <Download size={13} />
                      <span>Download Official Syllabus PDF</span>
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
