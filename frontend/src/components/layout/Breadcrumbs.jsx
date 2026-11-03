import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs-bar" aria-label="Breadcrumbs">
      <div className="breadcrumb-item">
        <Link to="/" className="breadcrumb-link" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Home size={13} />
          <span>Home</span>
        </Link>
      </div>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label || index} className="breadcrumb-item">
            <span className="breadcrumb-separator">
              <ChevronRight size={13} />
            </span>
            {isLast || !item.to ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="breadcrumb-link">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

