import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Bookmark, Bell, User, FileText, CheckCheck, Trash2, X, BellOff, RotateCcw } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useNotifications } from '../../hooks/useNotifications';

export function Header() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Synchronize input when URL query changes (direct URL navigation, back/forward)
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearchQuery(urlQuery);
  }

  const { savedJobsCount } = useBookmarks();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAllNotifications,
    resetNotifications
  } = useNotifications();

  const navigate = useNavigate();

  // Close notifications on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNotifications]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      searchInputRef.current?.focus();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    setShowNotifications(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <header className="top-header">
      <div className="page-container top-header-inner">
        {/* Left: Brand Identity */}
        <Link to="/" className="header-brand" title="Suchana Patt - Sarkari Jankari, Ek Jagah">
          <div className="brand-icon-wrapper">
            <FileText size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Suchana Patt</span>
            <span className="brand-tagline">Sarkari Jankari, Ek Jagah</span>
          </div>
        </Link>

        {/* Center: Wide Scalable Search Input */}
        <form className="header-search-form" onSubmit={handleSearchSubmit} role="search">
          <input
            ref={searchInputRef}
            type="text"
            className="header-search-input"
            placeholder="Search jobs, results, admit cards, admissions, scholarships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search jobs, results, admit cards, admissions, scholarships"
          />
          {searchQuery && (
            <button
              type="button"
              className="header-search-clear-btn"
              onClick={handleClearSearch}
              title="Clear search text"
              aria-label="Clear search input"
            >
              <X size={14} />
            </button>
          )}
          <button type="submit" className="header-search-btn" title="Search" aria-label="Submit search">
            <Search size={19} strokeWidth={2.4} />
          </button>
        </form>

        {/* Right: Actions */}
        <div className="header-actions">
          {/* Notifications Dropdown */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              type="button"
              className="header-action-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications and Updates"
              aria-expanded={showNotifications}
              aria-haspopup="true"
            >
              <Bell size={17} />
              <span>Alerts</span>
              {unreadCount > 0 && (
                <span className="header-badge-count">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div
                className="notifications-dropdown-menu"
                role="dialog"
                aria-label="Notifications"
              >
                <div className="notifications-dropdown-header">
                  <div className="notifications-dropdown-title">
                    <Bell size={16} color="#0755d9" />
                    <span>Live Alerts</span>
                    {unreadCount > 0 && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          backgroundColor: '#eaf2ff',
                          color: '#0755d9',
                          padding: '1px 6px',
                          borderRadius: 9999
                        }}
                      >
                        {unreadCount} unread
                      </span>
                    )}
                  </div>

                  <div className="notifications-header-actions">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        className="notif-action-text-btn"
                        onClick={markAllAsRead}
                        title="Mark all notifications as read"
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <CheckCheck size={13} />
                          <span>Mark read</span>
                        </span>
                      </button>
                    )}

                    {notifications.length > 0 && (
                      <button
                        type="button"
                        className="notif-action-text-btn"
                        style={{ color: '#dc2626' }}
                        onClick={clearAllNotifications}
                        title="Clear all notifications"
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <Trash2 size={13} />
                          <span>Clear all</span>
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div className="notif-empty-state">
                      <BellOff size={28} />
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#13213a' }}>
                        No Active Alerts
                      </div>
                      <p style={{ fontSize: 12, maxWidth: 220, lineHeight: 1.4 }}>
                        You're all caught up! New recruitment notices will appear here.
                      </p>
                      <button
                        type="button"
                        className="notif-action-text-btn"
                        style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}
                        onClick={resetNotifications}
                      >
                        <RotateCcw size={12} />
                        <span>Restore Demo Alerts</span>
                      </button>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notif)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleNotificationClick(notif);
                        }}
                      >
                        <div
                          className="notif-unread-dot"
                          style={{ visibility: notif.read ? 'hidden' : 'visible' }}
                        />

                        <div className="notif-content-col">
                          <div className="notif-top-meta">
                            <span className="notif-badge-tag">{notif.category || notif.type}</span>
                            <span className="notif-time">{notif.time}</span>
                          </div>

                          <div className="notif-title">{notif.title}</div>
                          <div className="notif-message">{notif.message}</div>

                          <div className="notif-item-actions" onClick={(e) => e.stopPropagation()}>
                            {!notif.read && (
                              <button
                                type="button"
                                className="notif-action-text-btn"
                                style={{ fontSize: 11 }}
                                onClick={() => markAsRead(notif.id)}
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              type="button"
                              className="notif-btn-icon"
                              style={{ marginLeft: 'auto' }}
                              onClick={() => dismissNotification(notif.id)}
                              title="Dismiss this notification"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bookmarks */}
          <Link to="/saved-jobs" className="header-action-btn" title="Saved Jobs">
            <Bookmark size={17} />
            <span>Saved</span>
            {savedJobsCount > 0 && (
              <span className="header-badge-count">{savedJobsCount}</span>
            )}
          </Link>

          {/* My Account */}
          <Link to="/login" className="header-action-btn" title="My Account">
            <User size={17} />
            <span>Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
