import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BookmarkProvider } from '../context/BookmarkContext';
import { NotificationProvider } from '../context/NotificationContext';
import { ReminderProvider } from '../context/ReminderContext';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme, useMobileTheme } from '../hooks/useTheme';
import { useViewport } from '../hooks/useViewport';
import { Header } from '../components/layout/Header';
import { SecondaryNavigation } from '../components/layout/SecondaryNavigation';
import { MobileHeader } from '../components/layout/MobileHeader';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/common/Toast';
import { AppRoutes } from './router';

function AppLayout() {
  const { isMobile } = useViewport(768);
  const { theme } = useTheme();
  const { theme: mobileTheme } = useMobileTheme();

  const activeDesktopTheme = !isMobile && theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!isMobile) {
      document.body.classList.remove('sp-mobile-dark-theme');
      document.documentElement.removeAttribute('data-mobile-theme');
      if (theme === 'dark') {
        document.body.classList.add('sp-dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.body.classList.remove('sp-dark-theme');
        document.documentElement.removeAttribute('data-theme');
      }
    } else {
      document.body.classList.remove('sp-dark-theme');
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.setAttribute('data-mobile-theme', mobileTheme);
      if (mobileTheme === 'dark') {
        document.body.classList.add('sp-mobile-dark-theme');
      } else {
        document.body.classList.remove('sp-mobile-dark-theme');
      }
    }
  }, [isMobile, theme, mobileTheme]);

  return (
    <div
      className={`app-container ${isMobile ? 'layout-mobile' : 'layout-desktop'}`}
      data-theme={activeDesktopTheme}
      data-mobile-theme={isMobile ? mobileTheme : undefined}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}
    >
      {isMobile ? (
        /* Mobile Layout Header (Compact bar, expandable search, drawer menu, touch-friendly alerts) */
        <MobileHeader />
      ) : (
        /* Desktop Layout Header (Full brand, wide search, desktop actions & horizontal secondary navigation) */
        <>
          <Header />
          <SecondaryNavigation />
        </>
      )}

      {/* Main Content Area: Preserves active route, query, and page state across layout switches */}
      <main
        className={`app-main-content ${isMobile ? 'mobile-main-wrapper' : 'desktop-main-wrapper'}`}
        data-mobile-theme={isMobile ? mobileTheme : undefined}
        style={{ flex: 1, width: '100%', overflowX: isMobile ? 'hidden' : 'visible' }}
      >
        <AppRoutes />
      </main>

      <Footer />
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <BookmarkProvider>
          <ReminderProvider>
            <ThemeProvider>
              <AppLayout />
            </ThemeProvider>
          </ReminderProvider>
        </BookmarkProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
