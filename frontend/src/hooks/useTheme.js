import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextInstance';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useMobileTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useMobileTheme must be used within a ThemeProvider');
  }
  const isDark = context.mobileTheme === 'dark';
  return {
    theme: context.mobileTheme || 'light',
    isDark,
    isLight: !isDark
  };
}


