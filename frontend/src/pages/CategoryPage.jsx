import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useViewport } from '../hooks/useViewport';
import { MobileCategoryListingPage } from '../components/category/MobileCategoryListingPage';
import { LatestJobsPage } from './LatestJobsPage';

/**
 * Dedicated Category Page Component
 * Serves the mobile category listing experience when on mobile viewports (< 768px).
 * On desktop (>= 768px), seamlessly forwards or delegates to the full desktop marketplace
 * view with the category filter applied, preserving desktop layout and styling.
 */
export function CategoryPage() {
  const { categorySlug } = useParams();
  const { isMobile } = useViewport(768);

  const normalizedSlug = (categorySlug || 'railway').toLowerCase().trim();

  // On Mobile: Render dedicated full-width single-column category listing architecture
  if (isMobile) {
    return <MobileCategoryListingPage key={normalizedSlug} categorySlug={normalizedSlug} />;
  }

  // On Desktop: Delegate to desktop view or forward cleanly to latest-jobs with category filter
  // For special datasets like results or admit-cards:
  if (normalizedSlug === 'results') {
    return <Navigate to="/results" replace />;
  }
  if (normalizedSlug === 'admit-cards') {
    return <Navigate to="/admit-cards" replace />;
  }
  if (normalizedSlug === 'answer-keys') {
    return <Navigate to="/answer-keys" replace />;
  }
  if (normalizedSlug === 'admissions') {
    return <Navigate to="/admissions" replace />;
  }
  if (normalizedSlug === 'syllabus') {
    return <Navigate to="/syllabus" replace />;
  }
  if (normalizedSlug === 'scholarships' || normalizedSlug === 'certificate') {
    return <Navigate to="/up-scholarship" replace />;
  }
  if (normalizedSlug === 'current-affairs') {
    return <Navigate to="/current-affairs" replace />;
  }

  // Map category slug to desktop category name for query
  const categoryMap = {
    railway: 'Railway',
    upsc: 'UPSC',
    ssc: 'SSC',
    banking: 'Banking',
    teaching: 'Teaching',
    defence: 'Defence',
    'state-gov': 'State Government',
    'latest-jobs': ''
  };

  const desktopCategory = categoryMap[normalizedSlug] || normalizedSlug;

  if (desktopCategory) {
    return <Navigate to={`/latest-jobs?category=${encodeURIComponent(desktopCategory)}`} replace />;
  }

  return <LatestJobsPage />;
}

export default CategoryPage;
