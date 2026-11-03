import React, { useState, useEffect } from 'react';
import { BookmarkContext } from './bookmarkContextInstance';

const STORAGE_KEY = 'suchanapatt_saved_jobs';

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load bookmarks from localStorage', e);
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to persist bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const isBookmarked = (jobId) => {
    return bookmarks.some((item) => item.id === jobId);
  };

  const toggleBookmark = (job) => {
    if (!job || !job.id) return;

    if (isBookmarked(job.id)) {
      setBookmarks((prev) => prev.filter((item) => item.id !== job.id));
      showToast(`Removed "${job.title}" from Saved Jobs`, 'warning');
    } else {
      setBookmarks((prev) => [job, ...prev]);
      showToast(`Saved "${job.title}" to Saved Jobs`, 'success');
    }
  };

  const removeBookmark = (jobId) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== jobId));
    showToast('Removed from Saved Jobs', 'info');
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    showToast('Cleared all saved jobs', 'info');
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        savedJobsCount: bookmarks.length,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearBookmarks,
        toast,
        showToast
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
