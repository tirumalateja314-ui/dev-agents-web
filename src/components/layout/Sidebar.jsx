import { Link, useLocation } from 'react-router-dom';
import { CaretDown, CaretRight } from '@phosphor-icons/react';
import { useState } from 'react';
import { navigation } from '../../data/navigation';

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] overflow-y-auto
                     bg-[var(--color-layer-0)] border-r border-[var(--color-border)]
                     transition-transform duration-200 ease-out
                     w-[260px] pb-8
                     lg:translate-x-0 lg:sticky lg:top-16
                     ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="px-4 pt-6">
          {navigation.map((section) => (
            <SidebarSection
              key={section.path}
              section={section}
              currentPath={location.pathname}
              onLinkClick={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

function SidebarSection({ section, currentPath, onLinkClick }) {
  const isActive = currentPath === section.path || currentPath.startsWith(section.path + '/');
  const [expanded, setExpanded] = useState(isActive);

  return (
    <div className="mb-5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-2 py-1.5
                   text-left text-sm font-semibold cursor-pointer
                   rounded-md hover:bg-[var(--color-layer-2)]
                   transition-colors duration-150"
        style={{
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.01em',
          color: isActive ? 'var(--color-primary)' : 'var(--color-secondary)',
        }}
      >
        {section.title}
        {expanded ? (
          <CaretDown size={14} weight="bold" className="text-[var(--color-tertiary)]" />
        ) : (
          <CaretRight size={14} weight="bold" className="text-[var(--color-tertiary)]" />
        )}
      </button>

      {expanded && section.children && (
        <ul className="mt-1 ml-2 pl-0 list-none space-y-0.5">
          {section.children.map((child) => {
            const isChildActive = currentPath === child.path;
            return (
              <li key={child.path}>
                <Link
                  to={child.path}
                  onClick={onLinkClick}
                  className={`block px-3 py-1.5 text-sm no-underline rounded-md
                    transition-colors duration-150
                    ${isChildActive
                      ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10 font-medium'
                      : 'text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-layer-2)]'
                    }`}
                >
                  {child.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
