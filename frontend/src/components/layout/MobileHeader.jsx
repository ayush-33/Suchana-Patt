import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  Bookmark,
  User,
  FileText,
  Home,
  Briefcase,
  CreditCard,
  Award,
  GraduationCap,
  CheckCircle2,
  KeyRound,
  Flame,
  CheckCheck,
  Trash2,
  BellOff,
  RotateCcw,
  Building,
  Landmark,
  ShieldAlert,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useNotifications } from '../../hooks/useNotifications';
import { useMobileTheme } from '../../hooks/useTheme';

/**
 * Compact Mobile Header designed specifically for viewports < 768px.
 * Features an accessible top bar, expandable search input, slide-in navigation drawer,
 * and touch-friendly alerts & saved jobs access.
 */
export function MobileHeader() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(() => Boolean(urlQuery) || location.pathname === '/search');
  const [showAlerts, setShowAlerts] = useState(false);

  const searchInputRef = useRef(null);
  const drawerRef = useRef(null);

  const [prevPath, setPrevPath] = useState(location.pathname);

  // Synchronize input when URL query changes
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setSearchQuery(urlQuery);
  }

  // Close menus when route changes (React 19 render-time check)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setIsMenuOpen(false);
    setShowAlerts(false);
  }

  // Handle ESC key and scroll-lock when drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowAlerts(false);
      }
    };

    if (isMenuOpen || showAlerts) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, showAlerts]);

  const { savedJobsCount } = useBookmarks();
  const { theme, isDark } = useMobileTheme();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    clearAllNotifications,
    resetNotifications
  } = useNotifications();

  // Search submission
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
    setShowAlerts(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const navLinks = [
    { label: 'Home', to: '/', icon: Home, end: true },
    { label: 'Latest Jobs', to: '/latest-jobs', icon: Briefcase },
    { label: 'Admit Cards', to: '/admit-cards', icon: CreditCard },
    { label: 'Results', to: '/results', icon: Award },
    { label: 'Admissions', to: '/admissions', icon: GraduationCap },
    { label: 'UP Scholarship', to: '/up-scholarship', icon: CheckCircle2 },
    { label: 'Syllabus', to: '/syllabus', icon: FileText },
    { label: 'Answer Keys', to: '/answer-keys', icon: KeyRound },
    { label: 'Current Affairs', to: '/current-affairs', icon: Flame }
  ];

  const quickCategories = [
    { label: 'Government Jobs', to: '/latest-jobs?jobType=government', icon: Building },
    { label: 'Private Jobs', to: '/latest-jobs?jobType=private', icon: Briefcase },
    { label: 'Railway Jobs', to: '/latest-jobs?category=Railway', icon: Landmark },
    { label: 'Banking Jobs', to: '/latest-jobs?category=Banking', icon: Landmark },
    { label: 'Police Jobs', to: '/latest-jobs?category=Police', icon: ShieldAlert }
  ];

  return (
    <header className={`mobile-header ${isDark ? 'dark-mode' : ''}`} data-theme={theme}>
      {/* Top Mobile Bar */}
      <div className="mobile-header-bar">
        {/* Left: Hamburger menu toggle + Logo */}
        <div className="mobile-header-left">
          <button
            type="button"
            className="mobile-header-icon-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/"
            className="mobile-header-brand"
            title="Suchana Patt - Sarkari Jankari, Ek Jagah"
            onClick={() => {
              setIsMenuOpen(false);
              setShowAlerts(false);
            }}
          >
            <div className="mobile-brand-icon-box">
              <FileText size={18} strokeWidth={2.4} />
            </div>
            <div className="mobile-brand-text">
              <span className="mobile-brand-title">Suchana Patt</span>
              <span className="mobile-brand-tagline">Sarkari Jankari, Ek Jagah</span>
            </div>
          </Link>
        </div>

        {/* Right: Search Toggle, Alerts, Saved, Account */}
        <div className="mobile-header-actions">
          {/* Search Toggle Button */}
          <button
            type="button"
            className={`mobile-header-action-btn ${isSearchOpen ? 'active' : ''}`}
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              if (!isSearchOpen) {
                setTimeout(() => searchInputRef.current?.focus(), 150);
              }
            }}
            title="Toggle Search Bar"
            aria-label="Toggle search input"
          >
            <Search size={18} />
          </button>

          {/* Alerts / Notifications Button */}
          <button
            type="button"
            className={`mobile-header-action-btn ${showAlerts ? 'active' : ''}`}
            onClick={() => setShowAlerts(!showAlerts)}
            title="Recruitment Alerts"
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="mobile-badge-pill">{unreadCount}</span>
            )}
          </button>

          {/* Bookmarks Link */}
          <Link
            to="/saved-jobs"
            className="mobile-header-action-btn"
            title="Saved Jobs"
            aria-label={`Saved Jobs (${savedJobsCount})`}
          >
            <Bookmark size={18} />
            {savedJobsCount > 0 && (
              <span className="mobile-badge-pill">{savedJobsCount}</span>
            )}
          </Link>

          {/* Account Link */}
          <Link
            to="/login"
            className="mobile-header-action-btn"
            title="User Account"
            aria-label="Login or Account"
          >
            <User size={18} />
          </Link>
        </div>
      </div>

      {/* Expandable Mobile Search Row */}
      {isSearchOpen && (
        <div className="mobile-search-row">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit} role="search">
            <input
              ref={searchInputRef}
              type="text"
              className="mobile-search-input"
              placeholder="Search jobs, results, admit cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search jobs, results, admit cards"
            />
            {searchQuery && (
              <button
                type="button"
                className="mobile-search-clear-btn"
                onClick={handleClearSearch}
                title="Clear search text"
                aria-label="Clear search input"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              className="mobile-search-submit-btn"
              title="Submit Search"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={2.4} />
            </button>
          </form>
        </div>
      )}

      {/* Slide-in Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setIsMenuOpen(false)}>
          <div
            ref={drawerRef}
            className="mobile-drawer-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <div className="mobile-brand-icon-box">
                  <FileText size={18} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="mobile-brand-title">Suchana Patt</div>
                  <div className="mobile-brand-tagline">Sarkari Jankari, Ek Jagah</div>
                </div>
              </div>
              <button
                type="button"
                className="mobile-drawer-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="mobile-drawer-body">
              {/* Primary Portal Navigation */}
              <div className="mobile-drawer-section">
                <div className="mobile-drawer-section-title">PORTAL NAVIGATION</div>
                <nav className="mobile-drawer-links" aria-label="Portal Categories">
                  {navLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.end
                      ? location.pathname === item.to
                      : location.pathname.startsWith(item.to);

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="mobile-drawer-link-left">
                          <Icon size={17} className="mobile-drawer-icon" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight size={14} className="mobile-drawer-arrow" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Recruitment Shortcuts */}
              <div className="mobile-drawer-section">
                <div className="mobile-drawer-section-title">QUICK JOB SECTORS</div>
                <div className="mobile-drawer-tags">
                  {quickCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.to}
                        to={cat.to}
                        className="mobile-drawer-tag"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon size={13} />
                        <span>{cat.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* User Account / Saved Section */}
              <div className="mobile-drawer-section">
                <div className="mobile-drawer-section-title">USER DASHBOARD</div>
                <nav className="mobile-drawer-links" aria-label="User Account">
                  <Link
                    to="/saved-jobs"
                    className="mobile-drawer-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="mobile-drawer-link-left">
                      <Bookmark size={17} className="mobile-drawer-icon" />
                      <span>Saved Jobs</span>
                    </div>
                    {savedJobsCount > 0 && (
                      <span className="mobile-badge-pill static">{savedJobsCount}</span>
                    )}
                  </Link>

                  <Link
                    to="/login"
                    className="mobile-drawer-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="mobile-drawer-link-left">
                      <User size={17} className="mobile-drawer-icon" />
                      <span>My Account / Login</span>
                    </div>
                    <ChevronRight size={14} className="mobile-drawer-arrow" />
                  </Link>

                  <div
                    className="mobile-drawer-link"
                    style={{ cursor: 'default' }}
                  >
                    <div className="mobile-drawer-link-left">
                      {isDark ? <Moon size={17} className="mobile-drawer-icon" /> : <Sun size={17} className="mobile-drawer-icon" />}
                      <span>Theme: System ({isDark ? 'Dark' : 'Light'})</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: isDark ? '#1e293b' : '#e2e8f0', color: isDark ? '#93c5fd' : '#475569' }}>
                      Auto
                    </span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Alerts Sheet / Modal */}
      {showAlerts && (
        <div className="mobile-alerts-backdrop" onClick={() => setShowAlerts(false)}>
          <div
            className="mobile-alerts-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Recruitment Alerts"
          >
            {/* Sheet Header */}
            <div className="mobile-alerts-header">
              <div className="mobile-alerts-title">
                <Bell size={18} color="#0755d9" />
                <span>Live Alerts</span>
                {unreadCount > 0 && (
                  <span className="mobile-alerts-unread-badge">{unreadCount} new</span>
                )}
              </div>

              <div className="mobile-alerts-header-actions">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="mobile-alerts-text-btn"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck size={13} />
                    <span>Read all</span>
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    className="mobile-alerts-text-btn danger"
                    onClick={clearAllNotifications}
                  >
                    <Trash2 size={13} />
                    <span>Clear</span>
                  </button>
                )}
                <button
                  type="button"
                  className="mobile-alerts-close-btn"
                  onClick={() => setShowAlerts(false)}
                  aria-label="Close alerts"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Sheet Content */}
            <div className="mobile-alerts-list">
              {notifications.length === 0 ? (
                <div className="mobile-alerts-empty">
                  <BellOff size={32} />
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#13213a', marginTop: 8 }}>
                    No Active Alerts
                  </div>
                  <p style={{ fontSize: 12.5, color: '#64748b', margin: '4px 0 12px 0' }}>
                    You're all caught up! New recruitment notices will appear here.
                  </p>
                  <button
                    type="button"
                    className="mobile-alerts-btn-secondary"
                    onClick={resetNotifications}
                  >
                    <RotateCcw size={13} />
                    <span>Restore Demo Alerts</span>
                  </button>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`mobile-alert-item ${!notif.read ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    <div
                      className="mobile-alert-dot"
                      style={{ visibility: notif.read ? 'hidden' : 'visible' }}
                    />
                    <div className="mobile-alert-content">
                      <div className="mobile-alert-meta">
                        <span className="mobile-alert-tag">{notif.category || notif.type}</span>
                        <span className="mobile-alert-time">{notif.time}</span>
                      </div>
                      <div className="mobile-alert-item-title">{notif.title}</div>
                      <div className="mobile-alert-item-message">{notif.message}</div>

                      <div
                        className="mobile-alert-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!notif.read && (
                          <button
                            type="button"
                            className="mobile-alerts-text-btn"
                            onClick={() => markAsRead(notif.id)}
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          type="button"
                          className="mobile-alert-dismiss"
                          onClick={() => dismissNotification(notif.id)}
                          title="Dismiss"
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
        </div>
      )}
    </header>
  );
}
