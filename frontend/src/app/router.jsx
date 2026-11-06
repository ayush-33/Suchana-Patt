import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LatestJobsPage } from '../pages/LatestJobsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { AdmitCardsPage } from '../pages/AdmitCardsPage';
import { ResultsPage } from '../pages/ResultsPage';
import { AdmissionsPage } from '../pages/AdmissionsPage';
import { ScholarshipPage } from '../pages/ScholarshipPage';
import { SyllabusPage } from '../pages/SyllabusPage';
import { AnswerKeysPage } from '../pages/AnswerKeysPage';
import { CurrentAffairsPage } from '../pages/CurrentAffairsPage';
import { SavedJobsPage } from '../pages/SavedJobsPage';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { CategoryPage } from '../pages/CategoryPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/category/:categorySlug" element={<CategoryPage />} />
      <Route path="/latest-jobs" element={<LatestJobsPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
      <Route path="/admit-cards" element={<AdmitCardsPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/admissions" element={<AdmissionsPage />} />
      <Route path="/up-scholarship" element={<ScholarshipPage />} />
      <Route path="/scholarships" element={<ScholarshipPage />} />
      <Route path="/syllabus" element={<SyllabusPage />} />
      <Route path="/answer-keys" element={<AnswerKeysPage />} />
      <Route path="/current-affairs" element={<CurrentAffairsPage />} />
      <Route path="/saved-jobs" element={<SavedJobsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

