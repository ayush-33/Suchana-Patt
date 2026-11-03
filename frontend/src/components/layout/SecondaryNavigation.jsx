import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Briefcase, Building, Landmark, GraduationCap, Shield, ShieldAlert, Cpu } from 'lucide-react';

export function SecondaryNavigation() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const location = useLocation();

  const currentPathWithSearch = `${location.pathname}${location.search}`;

  const moreCategories = [
    { label: 'Government Jobs', to: '/latest-jobs?jobType=government', icon: Building },
    { label: 'Private Jobs', to: '/latest-jobs?jobType=private', icon: Briefcase },
    { label: 'Railway Jobs', to: '/latest-jobs?category=Railway', icon: Landmark },
    { label: 'Banking Jobs', to: '/latest-jobs?category=Banking', icon: Landmark },
    { label: 'Teaching Jobs', to: '/latest-jobs?category=Teaching', icon: GraduationCap },
    { label: 'Defence Jobs', to: '/latest-jobs?category=Defence', icon: Shield },
    { label: 'Police Jobs', to: '/latest-jobs?category=Police', icon: ShieldAlert },
    { label: 'IT Jobs', to: '/latest-jobs?category=IT%20%2F%20Private%20Sector', icon: Cpu }
  ];

  const isMoreActive = moreCategories.some((cat) => currentPathWithSearch === cat.to);

  // Handle outside click & Escape key for accessibility
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && isMoreOpen) {
        setIsMoreOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreOpen]);

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsMoreOpen((prev) => !prev);
    }
  };

  return (
    <nav className="secondary-nav-bar" aria-label="Main Navigation">
      <div className="page-container secondary-nav-inner">
        <ul className="nav-links-list">
          <li className="nav-link-item">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/latest-jobs"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Latest Jobs
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/admit-cards"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Admit Cards
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/results"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Results
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/admissions"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Admissions
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/up-scholarship"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              UP Scholarship
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/syllabus"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Syllabus
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/answer-keys"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Answer Keys
            </NavLink>
          </li>
          <li className="nav-link-item">
            <NavLink
              to="/current-affairs"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Current Affairs
            </NavLink>
          </li>
        </ul>

        {/* More Categories Dropdown */}
        <div className="nav-dropdown-wrapper" ref={dropdownRef}>
          <button
            ref={triggerRef}
            type="button"
            className={`nav-dropdown-trigger ${isMoreOpen ? 'open' : ''} ${isMoreActive ? 'active' : ''}`}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            onKeyDown={handleTriggerKeyDown}
            aria-expanded={isMoreOpen}
            aria-haspopup="true"
            aria-label="More category recruitment filters"
          >
            <span>More Categories</span>
            <ChevronDown
              size={14}
              style={{
                transform: isMoreOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.15s ease'
              }}
            />
          </button>

          {isMoreOpen && (
            <div className="nav-dropdown-menu" role="menu" aria-label="Additional recruitment categories">
              {moreCategories.map((cat) => {
                const Icon = cat.icon;
                const isItemActive = currentPathWithSearch === cat.to;
                return (
                  <Link
                    key={cat.label}
                    to={cat.to}
                    className={`nav-dropdown-item ${isItemActive ? 'active' : ''}`}
                    role="menuitem"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon size={14} color="#0755d9" />
                      <span>{cat.label}</span>
                    </span>
                    <span style={{ fontSize: 11, color: isItemActive ? '#0755d9' : '#94a3b8' }}>→</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
