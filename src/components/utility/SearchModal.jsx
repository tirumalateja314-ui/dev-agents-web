import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, X, ArrowElbowDownLeft } from '@phosphor-icons/react';
import { navigation } from '../../data/navigation';

// Flatten all nav items into a searchable list
const ALL_ITEMS = navigation.flatMap((section) => [
  { title: section.title, path: section.path, section: section.title, isSection: true },
  ...(section.children || []).map((child) => ({
    title: child.title,
    path: child.path,
    section: section.title,
    isSection: false,
  })),
]);

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[var(--color-accent)]/25 text-[var(--color-accent)] rounded-sm px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? ALL_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.section.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS.slice(0, 8);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIdx]) go(results[activeIdx].path);
    } else if (e.key === 'Escape') {
      onClose();
    }
  }

  function go(path) {
    navigate(path);
    onClose();
  }

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal */}
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--color-layer-1)', border: '1px solid var(--color-border)' }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <MagnifyingGlass size={18} weight="bold" style={{ color: 'var(--color-tertiary)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, guides, agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="cursor-pointer" style={{ color: 'var(--color-tertiary)' }}>
              <X size={15} weight="bold" />
            </button>
          )}
          <kbd
            className="hidden sm:flex items-center text-[10px] px-1.5 py-0.5 rounded font-mono select-none"
            style={{ background: 'var(--color-layer-3)', color: 'var(--color-tertiary)', border: '1px solid var(--color-border)' }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul ref={listRef} className="max-h-[50vh] overflow-y-auto py-2 list-none m-0 p-0">
          {results.length === 0 ? (
            <li className="px-4 py-8 text-sm text-center" style={{ color: 'var(--color-tertiary)' }}>
              No results for &ldquo;{query}&rdquo;
            </li>
          ) : (
            results.map((item, i) => (
              <li key={item.path}>
                <button
                  data-active={i === activeIdx ? 'true' : 'false'}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => go(item.path)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left cursor-pointer transition-colors duration-100"
                  style={{
                    background: i === activeIdx ? 'var(--color-layer-2)' : 'transparent',
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--color-primary)' }}>
                      {highlight(item.title, query)}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-tertiary)' }}>
                      {item.section}
                    </p>
                  </div>
                  {i === activeIdx && (
                    <ArrowElbowDownLeft size={13} weight="bold" style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  )}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer hint */}
        <div
          className="flex items-center gap-4 px-4 py-2.5 text-[11px]"
          style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-tertiary)', fontFamily: 'var(--font-mono)' }}
        >
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> open</span>
          <span><kbd className="font-mono">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
