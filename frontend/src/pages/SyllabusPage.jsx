import React, { useState, useEffect } from 'react';
import { Search, Download, Building, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getSyllabus } from '../services/syllabusService';
import { useViewport } from '../hooks/useViewport';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';

function SyllabusCard({ syl }) {
  const [expanded, setExpanded] = useState(false);
  const sections = syl.sections || [];
  const maxInitial = 3;
  const hasMore = sections.length > maxInitial;
  const visibleSections = expanded || !hasMore ? sections : sections.slice(0, maxInitial);

  return (
    <div className="details-panel syllabus-card-item">
      <div className="syllabus-card-header">
        <span className="syllabus-category-badge">{syl.category}</span>
        <span className="syllabus-file-size">{syl.fileSize}</span>
      </div>

      <h3 className="syllabus-card-title">{syl.examName}</h3>

      <div className="syllabus-card-org">
        <Building size={14} className="syllabus-org-icon" />
        <span>{syl.organization} • {syl.examLevel}</span>
      </div>

      <p className="syllabus-card-desc">{syl.summary}</p>

      {sections.length > 0 && (
        <div className="syllabus-modules-box syllabus-meta-box">
          <div className="syllabus-modules-heading">
            Key Modules Covered:
          </div>
          <ul className="syllabus-modules-list">
            {visibleSections.map((sec, idx) => (
              <li key={idx} className="syllabus-module-item">
                <CheckCircle2 size={13} className="syllabus-module-icon" />
                <span className="syllabus-module-text">{sec}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="syllabus-expand-btn"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? 'Show Less Modules' : `+ ${sections.length - maxInitial} More Modules`}
            </button>
          )}
        </div>
      )}

      {/* Flexible content spacer ensures equal row height when no sections are present */}
      {sections.length === 0 && <div className="card-flex-spacer" />}

      <div className="syllabus-card-footer listing-card-footer">
        {syl.syllabusUrl ? (
          <a
            href={syl.syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view-details syllabus-action-btn"
          >
            <Download size={13} />
            <span>Download Official Syllabus PDF</span>
          </a>
        ) : (
          <span className="syllabus-unavailable-btn">Official PDF Not Available</span>
        )}
      </div>
    </div>
  );
}

export function SyllabusPage() {
  const { isMobile } = useViewport(768);
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

  if (isMobile) {
    return <MobileCategoryListingPage categorySlug="syllabus" />;
  }

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
              <SyllabusCard key={syl.id} syl={syl} />
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
