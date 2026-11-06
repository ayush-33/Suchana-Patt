import { useState, useEffect } from 'react';

/**
 * Hook for automatic mobile theme detection based on browser/device preference.
 * Uses window.matchMedia('(prefers-color-scheme: dark)').
 * Centralized, reactive source of truth for mobile light/dark appearance.
 */
export function useMobileTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const isDark = theme === 'dark';
  const isLight = !isDark;

  return { theme, isDark, isLight };
}

export default useMobileTheme;

