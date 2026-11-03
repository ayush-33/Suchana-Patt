import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FaqAccordion({ items = [], allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState([0]); // First item open by default

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="homepage-faq-list" role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headerId = `faq-header-${item.id || index}`;
        const panelId = `faq-panel-${item.id || index}`;

        return (
          <div
            key={item.id || index}
            className={`homepage-faq-item ${isOpen ? 'open' : ''}`}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                className="homepage-faq-question-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon-bubble" aria-hidden="true">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="homepage-faq-answer"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
