import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SearchModal from '../utility/SearchModal';

export default function PageLayout({ children, theme, toggleTheme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change; scroll to section or top
  useEffect(() => {
    setSidebarOpen(false);
    const timer = setTimeout(() => {
      const segments = location.pathname.split('/').filter(Boolean);
      const sectionId = segments[segments.length - 1];
      const el = sectionId ? document.getElementById(sectionId) : null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Keyboard shortcut: Ctrl+K for search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSidebarOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-layer-0)]">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
      />

      {isHome ? (
        /* Home page: full width, no sidebar */
        <main className="flex-1">
          {children}
        </main>
      ) : (
        /* Inner pages: sidebar + content */
        <div className="flex flex-1">
          <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
          <main className="flex-1 min-w-0 px-6 lg:px-10 py-10 max-w-[48rem] mx-auto">
            {children}
          </main>
        </div>
      )}

      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
