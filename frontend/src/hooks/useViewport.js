import { useState, useEffect } from 'react';

export const MOBILE_BREAKPOINT = 768;

/**
 * Reusable viewport detection hook.
 * Returns { isMobile, isDesktop, width } and automatically updates when viewport resizes.
 * Default breakpoint is 768px:
 * - width < 768px: isMobile = true, isDesktop = false
 * - width >= 768px: isMobile = false, isDesktop = true
 */
export function useViewport(breakpoint = MOBILE_BREAKPOINT) {
  // Use state initializer to read window.innerWidth on mount safely
  const [width, setWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleResize = () => {
      // Throttle resize events with requestAnimationFrame for smooth performance
      if (timeoutId) return;
      timeoutId = window.requestAnimationFrame(() => {
        setWidth(window.innerWidth);
        timeoutId = null;
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  const isMobile = width < breakpoint;
  const isDesktop = !isMobile;

  return { isMobile, isDesktop, width, breakpoint };
}
