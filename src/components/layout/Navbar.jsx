import { Link, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass } from '@phosphor-icons/react';
import { useState } from 'react';
import ThemeToggle from '../utility/ThemeToggle';

export default function Navbar({ theme, toggleTheme, onSearchOpen, onSidebarToggle, sidebarOpen }) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between h-16 px-6
                 bg-[var(--color-layer-0)]/80 backdrop-blur-sm
                 border-b border-[var(--color-border)]"
    >
      {/* Left: Logo + mobile hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md
                     hover:bg-[var(--color-layer-2)] transition-colors duration-150 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X size={20} weight="regular" className="text-[var(--color-secondary)]" />
          ) : (
            <List size={20} weight="regular" className="text-[var(--color-secondary)]" />
          )}
        </button>

        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center
                        bg-[var(--color-accent)] text-white text-sm font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            D
          </div>
          <span
            className="text-[var(--color-primary)] font-semibold text-base hidden sm:block"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            DevAgent
          </span>
        </Link>
      </div>

      {/* Center: Quick nav links (desktop) */}
      <nav className="hidden md:flex items-center gap-6">
        <NavLink to="/getting-started">Get Started</NavLink>
        <NavLink to="/how-it-works">How It Works</NavLink>
        <NavLink to="/agents">Agents</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        <NavLink to="/reference">Reference</NavLink>
      </nav>

      {/* Right: Search + Theme toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 h-9 px-3 rounded-md
                     bg-[var(--color-layer-2)] hover:bg-[var(--color-layer-3)]
                     border border-[var(--color-border)]
                     text-[var(--color-tertiary)] text-sm
                     transition-colors duration-150 cursor-pointer"
          aria-label="Open search"
        >
          <MagnifyingGlass size={16} weight="regular" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline ml-2 px-1.5 py-0.5 text-xs rounded
                          bg-[var(--color-layer-0)] border border-[var(--color-border)]
                          text-[var(--color-tertiary)]">
            Ctrl K
          </kbd>
        </button>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors duration-150 no-underline
        ${isActive
          ? 'text-[var(--color-accent)]'
          : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
        }`}
    >
      {children}
    </Link>
  );
}
