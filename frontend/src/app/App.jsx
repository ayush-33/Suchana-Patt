import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BookmarkProvider } from '../context/BookmarkContext';
import { NotificationProvider } from '../context/NotificationContext';
import { useViewport } from '../hooks/useViewport';
import { Header } from '../components/layout/Header';
import { SecondaryNavigation } from '../components/layout/SecondaryNavigation';
import { MobileHeader } from '../components/layout/MobileHeader';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/common/Toast';
import { AppRoutes } from './router';

function AppLayout() {
  const { isMobile } = useViewport(768);

  return (
    <div
      className={`app-container ${isMobile ? 'layout-mobile' : 'layout-desktop'}`}
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
          <AppLayout />
        </BookmarkProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
