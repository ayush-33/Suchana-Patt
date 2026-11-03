import React, { useState, useEffect } from 'react';
import { Search, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Pagination } from '../components/jobs/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { getCurrentAffairs } from '../services/currentAffairsService';

export function CurrentAffairsPage() {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getCurrentAffairs({
          search,
          category: categoryFilter,
          page: currentPage,
          limit: 6
        });
        setArticles(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (e) {
        console.error('Failed to load current affairs', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, categoryFilter, currentPage]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const breadcrumbs = [{ label: 'Current Affairs', to: '/current-affairs' }];

  return (
    <div className="page-container main-content current-affairs-page-container">
      <Breadcrumbs items={breadcrumbs} />

      <div className="listing-page-header">
        <h1 className="listing-page-title">
          Monthly & Daily Current Affairs Digest
        </h1>
        <p className="listing-page-subtitle">
          Exam-oriented national events, government schemes, economic indicators, science milestones, and appointments.
        </p>
      </div>

      <div className="listing-toolbar">
        <div className="listing-search-box">
          <Search size={16} className="listing-search-icon" />
          <input
            type="text"
            placeholder="Search current affairs topics..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="listing-search-input"
            aria-label="Search current affairs"
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
            aria-label="Filter current affairs by category"
          >
            <option value="all">All Topic Categories</option>
            <option value="Science & Technology">Science & Technology</option>
            <option value="Banking & Economy">Banking & Economy</option>
            <option value="Defence & Space">Defence & Space</option>
            <option value="State Affairs">State Affairs</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Loading articles...</div>
      ) : articles.length === 0 ? (
        <EmptyState
          title="No Articles Found"
          description="Try modifying search keywords or clearing topic filters."
          actionText="Clear Search"
          onActionClick={() => {
            setSearch('');
            setCategoryFilter('all');
          }}
        />
      ) : (
        <>
          <div className="two-card-listing-grid">
            {articles.map((art) => {
              const isExpanded = expandedId === art.id;
              return (
                <article key={art.id} className="details-panel current-affairs-card-item">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0755d9', backgroundColor: '#eaf2ff', padding: '3px 8px', borderRadius: 4 }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} />
                      <span>{art.dateText}</span>
                    </span>
                  </div>

                  <h3 className="current-affairs-card-title">
                    {art.title}
                  </h3>

                  <p className="current-affairs-card-desc">
                    {art.summary}
                  </p>

                  {isExpanded && (
                    <div className="current-affairs-expanded-box">
                      {art.fullText}
                    </div>
                  )}

                  <div className="current-affairs-card-footer">
                    <div className="current-affairs-tags-list">
                      {(art.tags || []).map((t) => (
                        <span key={t} className="current-affairs-tag-pill">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(art.id)}
                      className="current-affairs-expand-btn"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? 'Read Less' : 'Read Full Analysis'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </article>
              );
            })}
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
